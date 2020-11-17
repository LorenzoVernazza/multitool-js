#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const parseArgs = require('../tools/process/processArgs');

const types = ['env', 'local', 'production', 'development', 'default'];
const typeFiles = {
    'env': 'custom-environment-variables.json',
    'custom-environment-variables': 'custom-environment-variables.json',
    'local': 'local.json',
    'production': 'production.json',
    'development': 'development.json',
    'default': 'default.json'
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
    if (configType === 'all') {
        return enable(types);
    } else if (Array.isArray(configType)) {
        return configType.forEach((type) => enable(type));
    } else if (typeFiles[configType]) {
        return enableFile(typeFiles[configType]);
    } else {
        return console.log(`Unknown config type "${configType}"`);
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

function help() {
console.log(`
        === Multitool.JS Config Manager ===

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

init             | creates "config" folder and files
                        
enable <config>  | creates/enables <config> file

disable <config> | disables <config> file

remove <config>  | removes <config> file

`);
}

function start() {
    const {
        commands,
        flags
    } = parseArgs();
    const command = commands.shift();
    switch (command) {
        case 'init':
            return init({
                replace: (flags.r || flags.replace),
                skipDevelopment: (flags['no-dev'] | flags['no-development']),
                skipProduction: (flags['no-prod'] | flags['no-production']),
                skipEnv: (flags['no-env']),
                skipLocal: (flags['no-local']),
            });
        case 'help':
            return help()
        case 'enable':
            if (!commands.length) {
                return console.log('Missing type');
            } else {
                return enable(commands)
            }
        case 'disable':
            if (!commands.length) {
                return console.log('Missing type');
            } else {
                return disable(commands)
            }
        case 'remove':
            if (!commands.length) {
                return console.log('Missing type');
            } else {
                return remove(commands)
            }
        default:
            if (command) console.log(`Unknown command "${command}"!\n`);
            return help();
    }
}

start()