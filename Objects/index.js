const { getProp } = require('./tools/getProp');
const { getPropAdvanced } = require('./tools/getPropAdvanced');
const { hasProp } = require('./tools/hasProp');
const { setProp } = require('./tools/setProp');
const { replaceProp } = require('./tools/replaceProp');
const { replacePropAsync } = require('./tools/replacePropAsync');
const { deepMerge } = require('./tools/deepMerge');
const { deepCompare } = require('./tools/deepCompare');

/** Objects group */
module.exports = {
	getProp,
	getPropAdvanced,
	hasProp,
	setProp,
	replaceProp,
	replacePropAsync,
	deepMerge,
	deepCompare
};
