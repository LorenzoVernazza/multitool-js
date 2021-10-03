const assert = require('assert');
const deepClone = require('../../tools/objects/deepClone');

const obj = { pippo: { pluto: 3 }};
console.log('OBJ:', obj);
const clone = deepClone(obj);
console.log('Clone:', clone);

obj.pippo.pluto = 8;
obj.hello = 4;
console.log('OBJ:', obj);
console.log('Clone:', clone);

console.log('---------------');
const obj2 = RegExp('hello');
console.log('OBJ:', obj2);
const clone2 = deepClone(obj2);
console.log('Clone:', clone2);
