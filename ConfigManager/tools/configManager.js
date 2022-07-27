const fs = require('fs');
const { getProp } = require('@multitool-js/objects/tools/getProp');
const { setProp } = require('@multitool-js/objects/tools/setProp');
const { CONFIG_DIR, ENV_FILE, RUNTIME_FILE, ARGS_FILE, AUTOLOAD_ENABLED, VERBOSE_LOADING } = require('../lib/settings');
const { wipeConfig, config } = require('../lib/config');
const { readConfigFile, loadConfigFile, loadEnvFile, loadArgsFile, getPath, registerFileParser } = require('../lib/files');

function getEnv() {
	return (process.env.NODE_CONFIG_ENV || process.env.NODE_ENV || 'development');
}

function setEnv(value = 'production') {
	return process.env.NODE_CONFIG_ENV = value;
}

function load(wipe = true) {
	if (VERBOSE_LOADING) console.info('Loading configuration files!');
	if (wipe) wipeConfig();
	loadConfigFile('default', true);
	loadConfigFile(getEnv(), true);
	loadConfigFile('local', true);
	loadEnvFile(ENV_FILE);
	// loadArgsFile(ARGS_FILE);
	loadConfigFile(RUNTIME_FILE);
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

if (AUTOLOAD_ENABLED) load(false);

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
	reload: load,
	registerFileParser
};
