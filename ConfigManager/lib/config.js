const { TRUTHY_VALUES, FALSY_VALUES, ARGS_FILE, ENV_FILE } = require('./settings');

const config = {};

let _JSON = JSON;
try { _JSON = require('json5'); } catch (err) {}

function mergeConfig(newConfig, oldConfig = config) {
	for (const [key, value] of Object.entries(newConfig)) {
		if (value && typeof value === 'object' && (oldConfig[key] && typeof oldConfig[key] === 'object')) {
			mergeConfig(value, oldConfig[key]);
		} else {
			oldConfig[key] = value;
		}
	}
}

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
					value: _JSON.parse(value),
					merge: true
				};
			} catch (err) {
				return { value };
			}
		case 'MERGE_ONLY':
			try {
				return {
					value: _JSON.parse(value),
					merge: true
				};
			} catch (err) {
				return { value: undefined };
			}
		case 'JSON':
			try {
				return { value: _JSON.parse(value) };
			} catch (err) {
				return { value };
			}
		case 'JSON_ONLY':
			try {
				return { value: _JSON.parse(value) };
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
			const _envValue = process.env[_value];
			const {
				merge = false,
				value: envValue
			} = parseValue(_envValue, parser, `in "${fullKey}" (${ENV_FILE})`);
			if (_envValue && envValue !== undefined)	{
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
				value: argValue
			} = parseValue(value, parser, `in "${fullKey}" (${ARGS_FILE})`);
			if (argValue !== undefined)	{
				if (merge) {
					mergeConfig({ [key]: argValue }, oldConfig);
				} else {
					oldConfig[key] = argValue;
				}
			}
		}
	}
}

function wipeConfig() {
	for (const key of Object.keys(config)) {
		delete config[key];
	}
}

module.exports = {
	config,
	mergeConfig,
	parseValue,
	mergeConfigWithEnv,
	mergeConfigWithArgs,
	wipeConfig
};
