const { isValid, CamelCaseRegex } = require('./utils');
const Uncased = require('./Uncased');

function fromCamelCase(input = '', {
    validate = false
} = {}) {
    const chunks = [];
    let chunk = '';

    const validation = isValid();
    if (validation !== true) return validation;

    for (let char of `${input}`) {
        if (char >= 'A' && char <= 'Z') {
            if (chunk) chunks.push(chunk);
            chunk = `${char.toLowerCase()}`;
        } else if ((char >= 'a' && char <= 'z') || (char >= '0' && char <= '9')) {
            chunk += char;
        }
    }
    if (chunk) chunks.push(chunk);
    return new Uncased(chunks, input);
}

console.log(fromCamelCase('aBcDeFg'))
console.log(fromCamelCase('AbcDef'))
console.log(fromCamelCase('aBCD'))
console.log(fromCamelCase('aaa'))