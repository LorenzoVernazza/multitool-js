const assert = require('assert');
const hasProp = require('../../tools/objects/getProp');

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

describe.only('objects/getProp', function() {
    describe('Using the following object: ' + JSON.stringify(testObj), {});

    test('a.b', testObj.a.b)
    test(['a', 'b'], testObj.a.b)
    test(['a.b'], undefined)

    test('foo', 'bar')
    test('foo.bar', undefined)

    test('undef', undefined)
});

