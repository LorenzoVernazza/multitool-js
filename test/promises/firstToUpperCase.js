// const assert = require('assert');
const firstToUpperCase = require('../tools/strings/firstToUpperCase');

// assert(firstToUpperCase('hello') === 'Hello', '"hello" should become "Hello"');

let value = firstToUpperCase('hello');
console.log(value, value === 'Hello');

value = firstToUpperCase(' hello');
console.log(value, value === ' hello');

value = firstToUpperCase(' hello', { mode: 'first-whitespace' });
console.log(value, value === ' Hello');

value = firstToUpperCase('hello world!');
console.log(value, value === 'Hello world!');

value = firstToUpperCase('heLLo WorlD!', { preserveOthers: false });
console.log(value, value === 'Hello world!');

value = firstToUpperCase('hello world!', { preserveOthers: false, mode: 'whitespace' });
console.log(value, value === 'Hello World!');

value = firstToUpperCase('hello world! hello!', { preserveOthers: false, mode: 'smart' });
console.log(value, value === 'Hello world! Hello!');
