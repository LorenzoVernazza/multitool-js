const promiseAny = require('./promiseAny');
const timer = require('./timer');

Promise.any = promiseAny;

module.exports = {
	promiseAny,
	timer
};
