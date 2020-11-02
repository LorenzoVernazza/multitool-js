const assert = require('assert');
const { quote, hasQuotes, singleQuote, doubleQuote, backtickQuote } = require('../../tools/strings/quotes');

function compareQuote(param, quotationMark, ifNeeded, expected) {
    const result = quote(param, {
        quotationMark,
        ifNeeded
    })
    it(`${param} quoted with ${quotationMark} (${ifNeeded}) should be ${expected}: ${result}`, () =>{
        assert.strictEqual(result, expected)
    });
}

function checkQuotes(param, quotationMark, expected) {
    const result = hasQuotes(param, { quotationMark })
    it(`quote check of ${param} (${quotationMark}) should be ${expected}: ${result}`, () =>{
        assert.strictEqual(result, expected)
    });
}

function quotes(param) {
    let expected, result;

    result = singleQuote(param)
    expected = `'${param}'`;
    it(`${param} single-quoted should be ${expected}: ${result}`, () =>{
        assert.strictEqual(result, expected)
    });
    
    result = doubleQuote(param)
    expected = `"${param}"`
    it(`${param} double-quoted should be ${expected}: ${result}`, () =>{
        assert.strictEqual(result, expected)
    });
    
    result = backtickQuote(param)
    expected = `\`${param}\``
    it(`${param} backtick-quoted should be ${expected}: ${result}`, () =>{
        assert.strictEqual(result, expected)
    });
}

describe.only('strings/quote', function() {
    compareQuote('hello', '\'', false, "'hello'")
    compareQuote('"hello"', '\"', false, '""hello""')
    compareQuote('"hello"', '\"', true, '"hello"')
    compareQuote('`hello`', '\"', true, '"`hello`"')
    compareQuote('`hello`', '\"', 'all', '`hello`')

    quotes('hello')

    checkQuotes('`hello`', undefined, true)
    checkQuotes('`hello"', undefined, false)
    checkQuotes('`hello`', '\`', true)
    checkQuotes('`hello`', '\'', false)
});

