const { deepMerge } = require('../../Objects/tools/deepMerge');

const testObjA = {
	a: {
		b: {
			c: 0
		}
	},
	foo: 'bar',
	undef: undefined
};

const testObjB = {
	a: {
		d: 4
	},
	undef: 'abc'
};

const testObjC = {};

console.log(testObjB, deepMerge(testObjA, testObjB, { skipUndefined: false }));
console.log(testObjB, deepMerge(4, 5, {
	replace: (a = 0, b = 0) => {
		if (isNaN(a)) return b;
		if (isNaN(b)) return a;
		return a + b;
	}
}));
console.log(testObjB, deepMerge([3]));
console.log(testObjB, deepMerge({ a: 3 }));
console.log(deepMerge(testObjA, testObjC, {
	filter: (value, target, {
		key,
		fullKey,
		source,
		destination
	}) => {
		console.log({ value, target, key, fullKey });
		return key != 'foo';
		// return false;
	}
}));
