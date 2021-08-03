const assert = require('assert');
const capitalize = require('../../../tools/strings/cases/capitalize');
const { capitalizeWords, capitalizeSentences, capitalizeOne } = require('../../../tools/strings/cases/capitalize');

describe.only('strings/cases/capitalize', function() {
    const param = "abc xxx d. ghiJkl\nmnopq";
    
    const res1 = `${capitalize(param)}`;
    const exp1 = 'Abc xxx d. ghiJkl\nmnopq';
    it(`capitalize("${param}").toString() should be "${exp1}"`, () => {
        assert.strictEqual(res1, exp1)
    });
    const res1_2 = capitalizeOne(param);
    it(`capitalizeOne("${param}") should be "${exp1}"`, () => {
        assert.strictEqual(res1_2, exp1)
    });

    const res2 = capitalize(param).multi();
    const exp2 = 'Abc Xxx D. GhiJkl\nMnopq';
    it(`capitalize("${param}").multi() should be "${exp2}"`, () => {
        assert.strictEqual(res2, exp2)
    });
    const res2_2 = capitalizeWords(param);
    it(`capitalizeWords("${param}") should be "${exp2}"`, () => {
        assert.strictEqual(res2_2, exp2)
    });

    const res3 = capitalize(param).smart();
    const exp3 = 'Abc xxx d. GhiJkl\nMnopq';
    it(`capitalize("${param}").smart() should be "${exp3}"`, () => {
        assert.strictEqual(res3, exp3)
    });
    const res3_2 = capitalizeSentences(param);
    it(`capitalizeSentences("${param}") should be "${exp3}"`, () => {
        assert.strictEqual(res3_2, exp3)
    });

    const res4 = capitalizeWords(param, { min: 4, enforce: true });
    const exp4 = 'abc xxx d. Ghijkl\nMnopq';
    it(`capitalizeWords("${param}", { min: 4, enforce: true }) should be "${exp4}"`, () => {
        assert.strictEqual(res4, exp4)
    });
});
