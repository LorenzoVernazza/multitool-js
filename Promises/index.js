const { promiseGroup } = require('./tools/promiseGroup');
const { timer } = require('./tools/timer');

Promise.group = promiseGroup;

module.exports = {
	promiseGroup,
	timer
};
