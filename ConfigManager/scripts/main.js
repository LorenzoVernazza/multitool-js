#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { getProp, setProp } = require('@multitool-js/objects');
const parseArgs = require('@multitool-js/process/tools/processArgs');
const helper = require('./helper.json');

const types = ['env', 'local', 'production', 'development', 'default'];
/* const types = {
    env: { description: 'Fetch config values from env variables' },
    local: { description: 'Overrides config' },
    production: { description: 'Fetch config values from env variables' },
    development: { description: 'Fetch config values from env variables' },
    default: { description: 'Fetch config values from env variables' },
} */

const typeFiles = {
	env: 'custom-environment-variables.json',
	'custom-environment-variables': 'custom-environment-variables.json',
	local: 'local.json',
	production: 'production.json',
	prod: 'production.json',
	development: 'development.json',
	dev: 'development.json',
	default: 'default.json'
};

function isInitialized() {
	if (!fs.existsSync('config')) {
		throw Error('Missing config directory.');
	}
	if (!fs.statSync('config').isDirectory()) {
		throw Error('"config" is not a directory.');
	}
	return true;
}

function checkInitialization() {
	try {
		(isInitialized());
	} catch (err) {
		console.error(err.message);
	}
}

function createFile(target, replace = false) {
	const fpath = path.join('config', target);
	const exists = fs.existsSync(fpath);
	if (!exists || replace) {
		fs.writeFileSync(fpath, '{}');
		console.info(`${exists ? 'Replaced' : 'Created'} config file "${target}"`);
	} else {
		console.info(`Skipped existing config file "${target}"`);
	}
}

function enableFile(target) {
	const enabledPath = path.join('config', target);
	const disabledPath = path.join('config', `_${target}`);
	const exists = fs.existsSync(enabledPath);
	if (exists) {
		console.info(`Config file "${target}" already enabled`);
	} else if (fs.existsSync(disabledPath)) {
		fs.renameSync(disabledPath, enabledPath);
		console.info(`Enabled config file "${target}"`);
	} else {
		createFile(target);
	}
}

function disableFile(target) {
	const enabledPath = path.join('config', target);
	const disabledPath = path.join('config', `_${target}`);
	const exists = fs.existsSync(enabledPath);
	if (exists) {
		if (fs.existsSync(disabledPath)) fs.unlinkSync(disabledPath);
		fs.renameSync(enabledPath, disabledPath);
		console.info(`Disabled config file "${target}"`);
	} else {
		console.info(`Config file "${target}" already disabled`);
	}
}

function removeFile(target) {
	const fpath = path.join('config', target);
	const exists = fs.existsSync(fpath);
	if (exists) {
		fs.unlinkSync(fpath);
		console.info(`Removed config file "${target}"`);
	} else {
		console.info(`Skipped missing config file "${target}"`);
	}
}

function init({
	replace = false,
	skipEnv = false,
	skipLocal = false,
	skipProduction = false,
	skipDevelopment = false
} = {}) {
	if (!fs.existsSync('config')) fs.mkdirSync('config');
	if (!skipEnv) createFile('custom-environment-variables.json', replace);
	if (!skipLocal) createFile('local.json', replace);
	if (!skipProduction) createFile('production.json', replace);
	if (!skipDevelopment) createFile('development.json', replace);
	createFile('default.json', replace);
}

function enable(configType) {
	if (!configType) throw Error('No type specified!');
	if (configType === 'all') {
		return enable(types);
	} else if (Array.isArray(configType)) {
		if (!configType.length) throw Error('No type specified!');
		return configType.forEach((type) => enable(type));
	} else if (typeFiles[configType]) {
		return enableFile(typeFiles[configType]);
	} else {
		throw Error(`Unknown config type "${configType}"`);
	}
}

function disable(configType) {
	if (configType === 'all') {
		return disable(types);
	} else if (Array.isArray(configType)) {
		return configType.forEach((type) => disable(type));
	} else if (typeFiles[configType]) {
		return disableFile(typeFiles[configType]);
	} else {
		return console.error(`Unknown config type "${configType}"`);
	}
}

function remove(configType) {
	if (configType === 'all') {
		return remove(types);
	} else if (Array.isArray(configType)) {
		return configType.forEach((type) => remove(type));
	} else if (typeFiles[configType]) {
		return removeFile(typeFiles[configType]);
	} else {
		return console.error(`Unknown config type "${configType}"`);
	}
}

function fetchProperty(targetFile, property, defaultValue) {
	try {
		const data = JSON.parse(fs.readFileSync(targetFile).toString());
		return getProp(property, data, defaultValue);
	} catch (err) {
		return undefined;
	}
}

function replaceProperty(targetFile, property, value, replace = true) {
	try {
		const data = JSON.parse(fs.readFileSync(targetFile).toString());
		if (replace || (getProp(property, data) === undefined)) {
			setProp(property, data, value);
		} else {
			return false;
		}
		fs.writeFileSync(targetFile, JSON.stringify(data, null, 2));
		return true;
	} catch (err) {
		return false;
	}
}

function setProperty() {
	const {
		commands: properties,
		flags
	} = parseArgs(process.argv.slice(3), {
		params: {
			default: 1,
			production: 1,
			development: 1,
			local: 1,
			env: 1,
			all: 1
		},
		translations: {
			dev: 'development',
			prod: 'production'
		}
	});
	if (!properties.length) {
		console.error('You must select at least one property!');
		process.exit(1);
	}
	// if (flags.ask) ask parameters
	// if (flags.no-replace) skip if present?
	for (const type of ['default', 'production', 'development', 'local', 'env']) {
		const value = type == 'env' ? flags[type] : (flags[type] || flags.all);
		const file = typeFiles[type];
		if (value) {
			for (const property of properties) {
				if (replaceProperty(path.join('config', file), property, value, !flags['no-replace'])) console.info(`Updated "${property}" in "${type}"`);
				if (replaceProperty(path.join('config', `_${file}`), property, value, !flags['no-replace'])) console.info(`Updated "${property}" in "${type}" (disabled)`);
			}
		} else if (flags.remove) {
			for (const property of properties) {
				if (replaceProperty(path.join('config', file), property, undefined, !flags['no-replace'])) console.info(`Removed "${property}" from "${type}"`);
				if (replaceProperty(path.join('config', `_${file}`), property, undefined, !flags['no-replace'])) console.info(`Removed "${property}" from "${type}" (disabled)`);
			}
		}
	}
}

function removeProperty(data) {
	const [property, ...files] = data;
	for (const target of (files.length ? files : types)) {
		const file = typeFiles[target];
		if (!file) {
			console.info(`Ignoring unknown type "${target}"`);
			continue;
		}
		if (replaceProperty(path.join('config', file), property)) console.info(`Removed from "${target}"`);
		if (replaceProperty(path.join('config', `_${file}`), property)) console.info(`Removed from "${target}" (disabled)`);
	}
}

function getProperty() {
	const configManager = require('../tools/configManager');
	const {
		commands: properties,
		flags
	} = parseArgs(process.argv.slice(3), {
		translations: {
			dev: 'development',
			prod: 'production'
		}
	});
	if (!properties.length) {
		console.error('You must select at least one property!');
		process.exit(1);
	}
	if (!flags.default && !flags.production && !flags.development && !flags.local && !flags.env && !flags.all) {
		flags.current = true;
	}

	for (const property of properties) {
		console.info('');
		if (properties.length > 1) console.info(`=== "${property}" ===`);
		if (flags.current) {
			console.info(`(CURRENT VALUE) "${property}": ${JSON.stringify(configManager.get(property))}`);
		}
		for (const type of ['default', 'production', 'development', 'local', 'env']) {
			const retrieve = flags[type] || flags.all;
			if (retrieve) {
				const file = typeFiles[type];
				const value = fetchProperty(path.join('config', file), property);
				if (value !== undefined) console.info(`(${type.toUpperCase()}) "${property}": ${JSON.stringify(value)}`);
			}
		}
	}
}

function help(command) {
	let body = '';
	const commandHelp = command && helper.commands.find((_c) => (command === _c.command || (_c.altNames || []).includes(command)));
	if (commandHelp) {
		body += '\n';
		body += `--- Command: ${commandHelp.name} `;
		if (commandHelp.altNames && commandHelp.altNames.length) {
			body += `(${commandHelp.altNames.join('|')}) `;
		}
		body += '\n';
		if (commandHelp.description) {
			body += `\n\t${commandHelp.description}\n`;
		}
		body += '\n--- Usage:\n';
		for (const name of [commandHelp.name, ...(commandHelp.altNames || [])]) {
			body += `\n\t${name} `;
			for (const arg of (commandHelp.arguments || [])) {
				body += `${arg.required ? '<' : '[<'}${arg.name}${arg.required ? '>' : '>]'} `;
			}
			if (commandHelp.flags && commandHelp.flags.length) body += '{flags} ';
		}
		body += '\n';
		if (commandHelp.arguments && commandHelp.arguments.length) {
			body += '\n--- Arguments:\n';
			for (const arg of commandHelp.arguments) {
				body += `\n\t<${arg.name}> - ${arg.required ? '(REQUIRED) ' : ''}${arg.description}\n`;
			}
		}
		if (commandHelp.flags && commandHelp.flags.length) {
			body += '\n--- Flags:\n';
			for (const flag of commandHelp.flags) {
				body += `\n\t${flag.names.map((name) => (`${name}${flag.value ? ' ' + (new Array(flag.value)).fill('<value>').join(' ') : ''}`)).join(' | ')}`;
				body += `\n\t\t${flag.required ? '(REQUIRED) ' : ''}${flag.description}\n`;
			}
		}
	} else {
		if (command) console.info(`Command "${command}" not found!\n`);
		body = `
--- Info:

Config types (higher has priority): 

type        | file                         | description
--------------------------------------------------
env         | custom-environment-variables | Fetch config values from env variables
local       | local                        | Overrides config
production  | production                   | Only with NODE_ENV = "production"
development | development                  | Only with NODE_ENV = "development"
default     | default                      | Default config


--- Commands:
`;
		for (const command of helper.commands) {
			body += `\n${command.name} `;
			if (command.altNames && command.altNames.length) {
				body += `(${command.altNames.join('|')}) `;
			}
			for (const arg of (command.arguments || [])) {
				body += `${arg.required ? '<' : '[<'}${arg.name}${arg.required ? '>' : '>]'} `;
			}
			if (command.flags && command.flags.length) body += '{flags} ';
			body += `| ${command.description}\n`;
		}
	}

	console.info('\n');
	console.info(`\t\t${helper.header}`);
	console.info(body);
}

function exit(message = '', code = 0) {
	if (code) {
		if (message) console.error(message);
		process.exit(code);
	} else {
		if (message) console.info(message);
		process.exit(0);
	}
}

function start() {
	const {
		commands,
		flags
	} = parseArgs();
	const command = commands.shift();

	try {
		switch (command) {
			case 'init':
				return init({
					replace: (flags.r || flags.replace),
					skipDevelopment: (flags['no-dev'] | flags['no-development']),
					skipProduction: (flags['no-prod'] | flags['no-production']),
					skipEnv: (flags['no-env']),
					skipLocal: (flags['no-local'])
				});
			case 'help':
				return help(commands.shift());
			case 'enable':
				return enable(commands);
			case 'disable':
				return disable(commands);
			case 'remove':
				return remove(commands);
			case 'set-property':
			case 'sp':
				return setProperty();
			case 'remove-property':
			case 'rp':
				return removeProperty(commands, flags);
			case 'get-property':
			case 'gp':
				return getProperty();
			default:
				if (command) console.error(`Unknown command "${command}"!\n`);
				return help();
		}
	} catch (err) {
		exit(err, 1);
	}
}

start();
