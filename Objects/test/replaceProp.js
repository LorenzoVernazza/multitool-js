/* eslint-disable no-console */
const replaceProp = require('../../tools/objects/replaceProp');

const z = {};
replaceProp('a', z, () => 33);
console.log('Z', z);
replaceProp('a', z, (i) => (i + 1));
console.log('Z', z);
// try {
// 	replaceProp('b', z, 35, false);
// 	console.log('RESULT:', z);
// } catch (err) {
// 	console.error('UNEXPECTED ERROR:', err);
// }


// const x = {};
// replaceProp('a.b', x, 33, false);
// console.log('X', x);
// try {
// 	replaceProp('a.b', x, 34, false);
// 	console.log('UNEXPECTED RESULT:', x);
// } catch (err) {
// 	console.error('ERROR, AS EXPECTED:', err);
// }

