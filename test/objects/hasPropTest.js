const assert = require('assert');
const hasProp = require('../../tools/objects/hasProp');

const testObj = {
    a: {
        b: {
            c: 0
        }
    },
    foo: 'bar',
    undef: undefined
}

function test(param, expected) {
    it(`${JSON.stringify(param)} should be ${JSON.stringify(expected)}`, () =>{
        assert.strictEqual(hasProp(param, testObj), expected)
    });
}

describe.only('objects/hasProp', function() {
    describe('Using the following object: ' + JSON.stringify(testObj), {});

    test('a.b', true)
    test(['a', 'b'], true)
    test(['a.b'], false)

    test('foo', true)
    test('foo.bar', false)

    test('undef', false)
});

