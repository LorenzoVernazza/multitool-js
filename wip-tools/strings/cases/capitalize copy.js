function _capitalize(input = '') {
    return `${input}`.charAt(0).toUpperCase() + `${input}`.slice(1);
}

function _capitalizeWords(input = '', { 
    min = 1, 
    wordPattern = '[a-zA-Z]',
    beforeCapitalPattern = '^|\\s',
    enforce = false 
} = {}) {
    if (enforce) input = input.toLowerCase();
    const regex = new RegExp(`(${beforeCapitalPattern})([a-z])(${wordPattern}{${Math.max(0, min - 1)},})`, 'g');
    console.log(regex)
    return input.replace(regex, (m, g1, g2, g3) => `${g1}${g2.toUpperCase()}${g3}`);
}

function _capitalizeSentences(input, {
    min = 1, 
    wordPattern = '[a-zA-Z]',
    enforce = false 
} = {}) {
    return _capitalizeWords(input, {
        min,
        wordPattern,
        enforce,
        beforeCapitalPattern: '^|\\.\\s+'
    })
}

function capitalize(input = '', {
    multi = false,
    afterDot = false
} = {}) {
    return `${input}`.charAt(0).toUpperCase() + `${input}`.slice(1);
}


module.exports = capitalize;

console.log(_capitalizeWords('asdasd asd  dsa d SED as d asd as da sd a sda d', { min: 2, enforce: true }))
console.log(_capitalizeSentences('asdasd asd.  dsa d SED as d asd as da sd a sda d', { min: 2, enforce: true }))