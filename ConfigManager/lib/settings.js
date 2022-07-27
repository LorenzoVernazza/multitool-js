const path = require('path');

const CONFIG_DIR = path.resolve(process.cwd(), process.env.NODE_CONFIG_DIR || './config');
const RUNTIME_FILE = 'runtime';
const ENV_FILE = 'custom-environment-variables';
const ARGS_FILE = 'custom-arguments';

const VERBOSE_LOADING = process.env.CONFIG_VERBOSE_LOADING === 'true';
const SUPPRESS_WARNINGS = process.env.CONFIG_SUPPRESS_WARNINGS === 'true';
const IGNORE_INVALID_FILES = process.env.CONFIG_IGNORE_INVALID_FILES === 'true';
const AUTOLOAD_ENABLED = process.env.CONFIG_AUTOLOAD_ENABLED !== 'false';
const INSTANCE_VARIABLE = process.env.CONFIG_INSTANCE_VARIABLE || 'NODE_APP_INSTANCE';
const CURRENT_INSTANCE = process.env[INSTANCE_VARIABLE];

const TRUTHY_VALUES = ['true', '1', 'y'];
const FALSY_VALUES = ['false', '0', 'n'];

module.exports = {
	CONFIG_DIR,
	RUNTIME_FILE,
	ENV_FILE,
	ARGS_FILE,

	VERBOSE_LOADING,
	SUPPRESS_WARNINGS,
	IGNORE_INVALID_FILES,
	AUTOLOAD_ENABLED,
	INSTANCE_VARIABLE,
	CURRENT_INSTANCE,

	TRUTHY_VALUES,
	FALSY_VALUES
};
