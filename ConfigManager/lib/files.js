const fs = require('fs');
const path = require('path');
const { mergeConfig, mergeConfigWithEnv, mergeConfigWithArgs } = require('./config');
const { CONFIG_DIR, IGNORE_INVALID_FILES, SUPPRESS_WARNINGS, CURRENT_INSTANCE, VERBOSE_LOADING } = require('./settings');

let _JSON = JSON;
try { _JSON = require('json5'); } catch (err) {}

const fileExtensions = {
	json: (file) => (_JSON.parse(file)),
	jsonc: (file) => {
		const JSON5 = extensionRequire('json5', 'jsonc');
		return JSON5.parse(file);
	},
	yaml: (file) => {
		const YAML = extensionRequire('yaml', 'yaml');
		return YAML.parse(file);
	},
	yml: (file) => {
		const YAML = extensionRequire('yaml', 'yml');
		return YAML.parse(file);
	}
};

function getPath(fileName, extension = 'json') {
	return path.join(CONFIG_DIR, `${fileName}.${extension}`);
}

function extensionRequire(requiredPackage, extension) {
	try {
		return require(requiredPackage);
	} catch (err) {
		throw Error(`Parsing .${extension} files requires additional module "${requiredPackage}", to install it use "npm i ${requiredPackage}"`);
	}
}

function handleInvalidFile(file, e) {
	if (IGNORE_INVALID_FILES) {
		if (!SUPPRESS_WARNINGS) console.warn(`Ignoring invalid configuration file "${file}": ${e.message || e}`);
	} else {
		console.error(`Invalid configuration file "${file}": ${e.message || e}`);
		process.exit(1);
	}
}

function readFile(file, parse) {
	if (fs.existsSync(file)) {
		if (VERBOSE_LOADING) console.info(`Loading config file "${file}"`);
		try {
			return parse(fs.readFileSync(file));
		} catch (e) {
			handleInvalidFile(file, e);
		}
	}
}

function readConfigFile(fileName) {
	for (const [ext, parser] of Object.entries(fileExtensions)) {
		const value = readFile(getPath(fileName, ext), parser);
		if (value !== undefined) return value;
	}
	// handleMissingFile
}

function loadConfigFile(fileName, allowInstance = false) {
	// loadConfigFile(`default-${NODE_APP_INSTANCE}.json`);
	mergeConfig(readConfigFile(fileName) || {});
	if (allowInstance && (CURRENT_INSTANCE !== undefined)) {
		mergeConfig(readConfigFile(`${fileName}-${CURRENT_INSTANCE}`) || {});
	}
}

function loadEnvFile(fileName) {
	mergeConfigWithEnv(readConfigFile(fileName) || {});
}

function loadArgsFile(fileName) {
	mergeConfigWithArgs(readConfigFile(fileName) || {});
}

function registerFileParser(extension, parser) {
	if (!extension) throw Error('No extension specified!');
	if (typeof parser != 'function') throw Error(`Argument "parser" must be a function, received: ${typeof parser}`);
	fileExtensions[extension] = parser;
}

module.exports = {
	getPath,
	readConfigFile,
	loadConfigFile,
	loadEnvFile,
	loadArgsFile,
	registerFileParser
};
