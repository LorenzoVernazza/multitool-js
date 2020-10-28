/* eslint-disable no-console */
const setProp = require('../../tools/props/setProp');

const z = {};
setProp('a', z, 33);
setProp('b', z, 34, false);
console.log('Z', z);
try {
	setProp('b', z, 35, false);
	console.log('UNEXPECTED RESULT:', z);
} catch (err) {
	console.error('ERROR, AS EXPECTED:', err);
}


const x = {};
setProp('a.b', x, 33, false);
console.log('X', x);
try {
	setProp('a.b', x, 34, false);
	console.log('UNEXPECTED RESULT:', x);
} catch (err) {
	console.error('ERROR, AS EXPECTED:', err);
}

