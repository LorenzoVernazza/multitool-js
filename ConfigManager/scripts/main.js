#!/usr/bin/env node
const fs = require('fs')
const path = require('path');
const setProp = require('../tools/objects/setProp');
const parseArgs = require('../tools/process/processArgs');
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
    'env': 'custom-environment-variables.json',
    'custom-environment-variables': 'custom-environment-variables.json',
    'local': 'local.json',
    'production': 'production.json',
    'prod': 'production.json',
    'development': 'development.json',
    'dev': 'development.json',
    'default': 'default.json'
}

function isInitialized() {
    if (!fs.existsSync('config')) {
        throw Error('Missing config directory.')
    }
    if (!fs.statSync("config").isDirectory()) {
        throw Error('"config" is not a directory.')
    }
    return true;
}

function checkInitialization() {
    try {
        (isInitialized()) 
    } catch(err) {
        console.log(err.message);
    }
}

function createFile(target, replace = false) {
    const fpath = path.join('config', target);
    const exists = fs.existsSync(fpath);
    if (!exists || replace) {
        fs.writeFileSync(fpath, '{}');
        console.log(`${exists ? 'Replaced' : 'Created'} config file "${target}"`);
    } else {
        console.log(`Skipped existing config file "${target}"`);
    }
}

function enableFile(target) {
    const enabledPath = path.join('config', target);
    const disabledPath = path.join('config', `_${target}`);
    const exists = fs.existsSync(enabledPath);
    if (exists) {
        console.log(`Config file "${target}" already enabled`);
    } else if (fs.existsSync(disabledPath)) {
        fs.renameSync(disabledPath, enabledPath);
        console.log(`Enabled config file "${target}"`);
    } else {
        createFile(target)
    }
}

function disableFile(target) {
    const enabledPath = path.join('config', target);
    const disabledPath = path.join('config', `_${target}`);
    const exists = fs.existsSync(enabledPath);
    if (exists) {
        if (fs.existsSync(disabledPath)) fs.unlinkSync(disabledPath);
        fs.renameSync(enabledPath, disabledPath);
        console.log(`Disabled config file "${target}"`);
    } else {
        console.log(`Config file "${target}" already disabled`);
    }
}

function removeFile(target) {
    const fpath = path.join('config', target);
    const exists = fs.existsSync(fpath);
    if (exists) {
        fs.unlinkSync(fpath);
        console.log(`Removed config file "${target}"`);
    } else {
        console.log(`Skipped missing config file "${target}"`);
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
        return console.log(`Unknown config type "${configType}"`);
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
        return console.log(`Unknown config type "${configType}"`);
    }
}

function replaceProperty(targetFile, property, value) {
    try {
        const data = JSON.parse(fs.readFileSync(targetFile).toString());
        setProp(property, data, value);
        fs.writeFileSync(targetFile, JSON.stringify(data, null, 2));
        return true;
    } catch(err) {
        return false;
    }
}

function addProperty() {
    console.log('not implemented');
}

function removeProperty(data) {
    const [property, ...files] = data;
    for (const target of (files.length ? files : types)) {
        const file = typeFiles[target];
        if (!file) {
            console.log(`Ignoring unknown type "${target}"`);
            continue;
        }
        if (replaceProperty(path.join('config', file), property)) console.log(`Removed from "${target}"`);
        if (replaceProperty(path.join('config',  `_${file}`), property)) console.log(`Removed from "${target}" (disabled)`);
    }
}

function help(command) {
    let body = '';
    if (command && helper.commands.find((_c) => (command === _c.command || (_c.altNames || []).includes(command)))) {

    } else {
        if (command) console.log(`Command "${command}" not found!\n`);
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
            body += `\n${command.name} `
            if (command.altNames && command.altNames.length) {
                body += `(${command.altNames.join('|')}) `
            }
            if (command.flags && command.flags.length) body += '{flags} ';
            for (const arg of (command.arguments || [])) {
                body += `${arg.mandatory ? '<' : '[<'}${arg.name}${arg.mandatory ? '>' : '>]'} `
            }
            body += `| ${command.description}\n`;
        }
    }

    console.log('\n');
    console.log(`\t\t${helper.header}`);
    console.log(body);
}

function exit(message = '', code = 0) {
    if (code) {
        if (message) console.error(message);
        process.exit(code);
    } else {
        if (message) console.log(message);
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
                return help(commands.shift())
            case 'enable':
                return enable(commands);
            case 'disable':
                return disable(commands);
            case 'remove':
                return remove(commands);
            case 'add-property': 
            case 'ap':
                return addProperty(commands, flags);
            case 'remove-property': 
            case 'rp':
                return removeProperty(commands, flags);
            default:
                if (command) console.log(`Unknown command "${command}"!\n`);
                return help();
        }
    } catch(err) {
        exit(err, 1);
    }
}

start()