const fs = require('fs');
const path = require('path');
const getProp = require('../objects/getProp');
const setProp = require('../objects/setProp');

const CONFIG_DIR = (process.env.NODE_CONFIG_DIR || path.resolve(process.cwd(), process.env.NODE_CONFIG_DIR || './config'))
const RUNTIME_FILE = 'runtime.json';

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

function mergeConfigWithEnv(newConfig, oldConfig = config) {
	for (const [key, value] of Object.entries(newConfig)) {
		if (value && typeof value === 'object') {
			if (!oldConfig[key] || typeof oldConfig[key] !== 'object') oldConfig[key] = {};
			mergeConfigWithEnv(value, oldConfig[key]);
		} else if (typeof value == 'string') {
			let envValue;
			let merge = false;
			if (value.startsWith('MERGE:')) {
				let trimmed = value.substr(6);
				try {
					envValue = JSON.parse(process.env[trimmed]);
					merge = true;
				} catch (err) {
					envValue = process.env[trimmed];
				}
			} else if (value.startsWith('BOOL:')) {
				let trimmed = value.substr(5);
				switch (trimmed.toLowerCase()) {
					case 'true': 
						envValue = true; break;
					case 'false': 
						envValue = false; break;
				}
			} else if (value.startsWith('JSON:')) {
				let trimmed = value.substr(5);
				try {
					envValue = JSON.parse(process.env[trimmed]);
				} catch (err) {
					envValue = process.env[trimmed];
				}
			} else if (value.startsWith('JSON_ONLY:')) {
				let trimmed = value.substr(10);
				try {
					envValue = JSON.parse(process.env[trimmed]);
				} catch (err) {
					envValue = undefined;
				}
			} else if (value.startsWith('NUMBER:')) {
				let trimmed = value.substr(7);
				if (process.env[trimmed] !== undefined)	envValue = Number(process.env[trimmed]);
				if (envValue === NaN) envValue = process.env[trimmed];
			} else if (value.startsWith('NUMBER_NAN:')) {
				let trimmed = value.substr(11);
				if (process.env[trimmed] !== undefined)	envValue = Number(process.env[trimmed]);
			} else if (value.startsWith('NUMBER_ONLY:')) {
				let trimmed = value.substr(12);
				envValue = Number(process.env[trimmed]);
				if (envValue === NaN) envValue = undefined;
			} else {
				envValue = process.env[value];
			}
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
	mergeConfigWithEnv(readConfigFile(fileName) || {})
}

function wipeConfig() {
	for (const key of Object.keys(config)) {
		delete config[key]
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
	loadEnvFile('custom-environment-variables.json');
}

// Export declarations

function createSaveConfig(options = {}) {
	if (options.whitelist) {
		let whitelistedConfig = options.overwrite ? {} : (readConfigFile(RUNTIME_FILE) || {});
		for (const item of options.whitelist) {
			let value = getProp(item, config);
			if (value !== undefined) setProp(item, whitelistedConfig, value);
		}
		return JSON.stringify(whitelistedConfig);
	}
	return JSON.stringify(config)
}
function saveConfig(options) {
	return fs.writeFile(getPath(RUNTIME_FILE), createSaveConfig(options));
}
function saveConfigSync(options) {
	fs.writeFileSync(getPath(RUNTIME_FILE), createSaveConfig(options));
}

function deleteConfig() {
	return fs.unlink(getPath(RUNTIME_FILE));
}
function deleteConfigSync() {
	fs.unlinkSync(getPath(RUNTIME_FILE));
}

function set(key, value, writable = true) {
	return setProp(key, config, value, { writable })
};
function has(key) {
	return getProp(key, config) !== undefined
};
function get(key, defaultValue) {
	return getProp(key, config, defaultValue)
};

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
	delete: deleteConfig,
	deleteSync: deleteConfigSync,
	reload: load
};
