const assert = require('assert');
const ellipsis = require('../../tools/strings/ellipsis');

function test(param, length, expected, replacement) {
    const result = ellipsis(param, length, expected, replacement)
    it(`"${param}" with length ${length} ${replacement ? `and replacement ${replacement} ` : ''}should be "${expected}": "${result}"`, () =>{
        assert.strictEqual(result, expected)
    });
}

describe.only('strings/ellipsis', function() {
    const param = "hello from multitool-js!";
    
    test(param, 8, "hello...");
    test(param, 200, param);
    test(param, 0, param);
    test(param, 'hello', param);

    test(param, 8, 'hello f0', '0');
});

