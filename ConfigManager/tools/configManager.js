const fs = require('fs');
const path = require('path');
const getProp = require('@multitool-js/objects/tools/getProp');
const setProp = require('@multitool-js/objects/tools/setProp');

const CONFIG_DIR = (process.env.NODE_CONFIG_DIR || path.resolve(process.cwd(), process.env.NODE_CONFIG_DIR || './config'));
const RUNTIME_FILE = 'runtime.json';
const ENV_FILE = 'custom-environment-variables.json';
const ARGS_FILE = 'custom-arguments.json';

const config = {};

function getPath(fileName) {
	return path.join(CONFIG_DIR, fileName);
}

function getEnv() {
	return (process.env.NODE_ENV || 'development');
}

function setEnv(value = 'production') {
	return process.env.NODE_ENV = value;
}

function mergeConfig(newConfig, oldConfig = config) {
	for (const [key, value] of Object.entries(newConfig)) {
		if (value && typeof value === 'object' && (oldConfig[key] && typeof oldConfig[key] === 'object')) {
			mergeConfig(value, oldConfig[key]);
		} else {
			oldConfig[key] = value;
		}
	}
}

const TRUTHY_VALUES = ['true', '1', 'y'];
const FALSY_VALUES = ['false', '0', 'n'];

function parseValue(value, parser = 'STRING', appendError) {
	const lower = (value || '').toLowerCase();
	switch (parser) {
		case 'BOOLEAN':
			if (TRUTHY_VALUES.includes(lower)) {
				return { value: true };
			} else if (FALSY_VALUES.includes(lower)) {
				return { value: false };
			} else {
				return { value: undefined };
			}
		case 'BOOLEAN_ONLY':
			if (TRUTHY_VALUES.includes(lower)) {
				return { value: true };
			} else if (value) {
				return { value: false };
			} else {
				return { value: undefined };
			}
		case 'MERGE':
			try {
				return {
					value: JSON.parse(value),
					merge: true
				};
			} catch (err) {
				return { value };
			}
		case 'JSON':
			try {
				return { value: JSON.parse(value) };
			} catch (err) {
				return { value };
			}
		case 'JSON_ONLY':
			try {
				return { value: JSON.parse(value) };
			} catch (err) {
				return { value: undefined };
			}
		case 'NUMBER':
			if (value !== undefined && !isNaN(value)) {
				return { value: Number(value) };
			} else {
				return { value };
			}
		case 'NUMBER_NAN':
			if (value !== undefined) {
				return { value: Number(value) };
			} else {
				return { value };
			}
		case 'NUMBER_ONLY':
			if (value !== undefined && !isNaN(value)) {
				return { value: Number(value) };
			} else {
				return { value: undefined };
			}
		case 'STRING':
			return { value };
		default:
			throw Error(`Unknown parser "${parser}" ${appendError}`);
	}
}

function mergeConfigWithEnv(newConfig, oldConfig = config, fullKey = '') {
	for (const [key, value] of Object.entries(newConfig)) {
		if (value && typeof value === 'object') {
			if (!oldConfig[key] || typeof oldConfig[key] !== 'object') oldConfig[key] = {};
			mergeConfigWithEnv(value, oldConfig[key], fullKey ? `${fullKey}.${key}` : key);
		} else if (typeof value == 'string') {
			let parser, _value;
			const split = value.split(':');
			if (split.length > 1) {
				parser = split[0].toUpperCase();
				_value = split[1];
			} else {
				_value = value;
			}
			const {
				merge = false,
				value: envValue
			} = parseValue(process.env[_value], parser, `in "${fullKey}" (${ENV_FILE})`);
			if (envValue !== undefined)	{
				if (merge) {
					mergeConfig({ [key]: envValue }, oldConfig);
				} else {
					oldConfig[key] = envValue;
				}
			}
		}
	}
}

function mergeConfigWithArgs(newConfig, oldConfig = config, fullKey = '') {
	for (const [key, value] of Object.entries(newConfig)) {
		if (value && typeof value === 'object') {
			if (!oldConfig[key] || typeof oldConfig[key] !== 'object') oldConfig[key] = {};
			mergeConfigWithArgs(value, oldConfig[key], fullKey ? `${fullKey}.${key}` : key);
		} else if (typeof value == 'string') {
			let parser, flags;
			const split = value.split(':');
			if (split.length > 1) {
				parser = split[0].toUpperCase();
				if (parser == '=') parser = 'STRING';
				flags = split[1].split(',');
			} else {
				flags = value.split(',');
			}

			const {
				merge = false,
				value: envValue
			} = parseValue(value, parser, `in "${fullKey}" (${ARGS_FILE})`);
			if (envValue !== undefined)	{
				if (merge) {
					mergeConfig({ [key]: envValue }, oldConfig);
				} else {
					oldConfig[key] = envValue;
				}
			}
		}
	}
}

function readConfigFile(fileName) {
	const defaultPath = getPath(fileName);
	if (fs.existsSync(defaultPath)) {
		try {
			return JSON.parse(fs.readFileSync(defaultPath));
		} catch (e) {}
	}
}

function loadConfigFile(fileName) {
	mergeConfig(readConfigFile(fileName) || {});
}

function loadEnvFile(fileName) {
	mergeConfigWithEnv(readConfigFile(fileName) || {});
}

function loadArgsFile(fileName) {
	mergeConfigWithArgs(readConfigFile(fileName) || {});
}

function wipeConfig() {
	for (const key of Object.keys(config)) {
		delete config[key];
	}
}

function load(wipe = true) {
	if (wipe) wipeConfig();
	loadConfigFile('default.json');
	if (getEnv() == 'production') {
		loadConfigFile('production.json');
	} else {
		loadConfigFile('development.json');
	}
	loadConfigFile('local.json');
	loadConfigFile(RUNTIME_FILE);
	loadEnvFile(ENV_FILE);
}

// Export declarations

function createSaveConfig(options = {}) {
	if (options.whitelist) {
		const whitelistedConfig = options.overwrite ? {} : (readConfigFile(RUNTIME_FILE) || {});
		for (const item of options.whitelist) {
			setProp(item, whitelistedConfig, getProp(item, config));
		}
		return JSON.stringify(whitelistedConfig);
	}
	return JSON.stringify(config);
}
function saveConfig(options) {
	return fs.writeFile(getPath(RUNTIME_FILE), createSaveConfig(options));
}
function saveConfigSync(options) {
	fs.writeFileSync(getPath(RUNTIME_FILE), createSaveConfig(options));
}

function removeConfig() {
	return fs.unlink(getPath(RUNTIME_FILE));
}
function removeConfigSync() {
	fs.unlinkSync(getPath(RUNTIME_FILE));
}

function set(key, value, writable = true) {
	return setProp(key, config, value, { writable });
}
function has(key) {
	return getProp(key, config) !== undefined;
}
function get(key, defaultValue) {
	return getProp(key, config, defaultValue);
}

load(false);

module.exports = {
	CONFIG_DIR,
	get env() { return getEnv(); },
	set env(value) { return setEnv(value); },
	set,
	get,
	has,
	save: saveConfig,
	saveSync: saveConfigSync,
	delete: removeConfig,
	remove: removeConfig,
	deleteSync: removeConfigSync,
	removeSync: removeConfigSync,
	reload: load
};
