const { deepCompare } = require('../../Objects/tools/deepCompare');

function test(a, b, expected, options = {}) {
	const result = deepCompare(a, b, options);
	if (result === expected) {
		console.info('SUCCESS!');
	} else {
		console.error('ERROR:', { a, b, expected, result });
	}
}

test({
	a: 1,
	b: ['foo', { c: 'bar', d: undefined, e: null }]
}, {
	a: 1,
	b: ['foo', { c: 'bar', d: undefined, e: null }]
}, true);
