/* eslint-disable no-console */
const setProp = require('../tools/props/setProp');

const x = {};
setProp('a.b', x, 33, false);
console.log(x);
try {
	setProp('a.b', x, 34, false);
	console.log('UNEXPECTED RESULT:', x);
} catch (err) {
	console.error('ERROR, AS EXPECTED:', err);
}


