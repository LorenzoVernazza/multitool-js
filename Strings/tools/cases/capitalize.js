function capitalize(input = '') {
    return {
        toString() { return _capitalizeOne(input) },
        sentences(opts) { return _capitalizeSentences(input, opts) },
        words(opts) { return _capitalizeWords(input, opts) }
    }
}

function _capitalizeOne(input = '') {
    return `${input}`.charAt(0).toUpperCase() + `${input}`.slice(1);
}
capitalize.capitalizeOne = _capitalizeOne;

function _capitalizeWords(input = '', { 
    min = 1, 
    wordPattern = '[a-zA-Z]',
    beforeCapitalPattern = '^|\\s',
    enforce = false,
    invert = false
} = {}) {
    if (enforce) input = (invert ? input.toUpperCase() : input.toLowerCase());
    const regex = new RegExp(`(${beforeCapitalPattern})([a-z])(${wordPattern}{${Math.max(0, min - 1)},})`, 'gm');
    return input.replace(regex, (m, g1, g2, g3) => `${g1}${(invert ? g2.toLowerCase() : g2.toUpperCase())}${g3}`);
}
capitalize.capitalizeWords = _capitalizeWords;

function _capitalizeSentences(input, {
    min = 1, 
    wordPattern = '[a-zA-Z]',
    enforce = false,
    invert = false
} = {}) {
    return _capitalizeWords(input, {
        min,
        wordPattern,
        enforce,
        invert,
        beforeCapitalPattern: '^|\\.\\s+'
    })
}
capitalize.capitalizeSentences = _capitalizeSentences;

module.exports = capitalize;
