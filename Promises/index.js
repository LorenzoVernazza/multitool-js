const promiseAny = require('./tools/promiseAny');
const timer = require('./tools/timer');

Promise.any = promiseAny;

module.exports = {
	promiseAny,
	timer
};
