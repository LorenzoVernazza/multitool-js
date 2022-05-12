const assert = require('assert');

const { processArgs } = require('../../Process/tools/processArgs');

const args = [
	'arg0',
	'-a',
	'arg1',
	'-a',
	'arg1bis',
	'-b=arg2',
	'-c',
	'arg3',
	'-de',
	'--aaa',
	'arg3',
	'--bbb=arg4',
	'--ccc',
	'arg5',
	'--fff'
];

function test(name, value, expected) {
	it(`"${name}" should correspond to ${JSON.stringify(expected)}`, () => {
		assert.deepStrictEqual(value, expected);
	});
}


describe.only('process/processArgs', function() {
	describe('Using the following arguments: ' + JSON.stringify(args), {});
	const result = processArgs(args, {
		params: {
			aaa: -1, // has unlimited values
			bbb: 1, // has one value
			ccc: false, // ignore
			ddd: true // boolean
		},
		translations: {
			a: 'aaa',
			b: 'bbb',
			c: 'ccc',
			d: 'ddd',
			e: 'eee'
		}
	});

	console.log(result);
	it('"result.args" should correspond to the arguments', () => {
		assert.strictEqual(result.args, args);
	});
	test('result.flags.aaa', result.flags.aaa, ['arg1', 'arg1bis', 'arg3']);
	test('result.flags.bbb', result.flags.bbb, 'arg4');
	test('result.flags.ccc', result.flags.ccc, undefined);
	test('result.flags.ddd', result.flags.ddd, true);
	test('result.flags.eee', result.flags.eee, true);
	test('result.flags.fff', result.flags.fff, true);
});
