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
	return getProp(process.env.NODE_ENV, 'development');
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
			const envValue = process.env[value];
			if (envValue !== undefined)	oldConfig[key] = envValue;
		}
	}
}

function loadConfigFile(fileName) {
	const defaultPath = getPath(fileName);
	if (fs.existsSync(defaultPath)) {
		try {
			mergeConfig(JSON.parse(fs.readFileSync(defaultPath)));
		} catch (e) {}
	}
}

function loadEnvFile(fileName) {
	const defaultPath = getPath(fileName);
	if (fs.existsSync(defaultPath)) {
		try {
			mergeConfigWithEnv(JSON.parse(fs.readFileSync(defaultPath)));
		} catch (e) {}
	}
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

function saveConfig() {
	return fs.writeFile(getPath(RUNTIME_FILE), JSON.stringify(config));
}
function saveConfigSync() {
	fs.writeFileSync(getPath(RUNTIME_FILE), JSON.stringify(config));
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
