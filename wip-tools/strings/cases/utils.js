function isValid(mode, text = '', regex, errText = 'Invalid input.') {
    if (!mode) return true;
    const valid = text.match(regex);
    if (valid) return true;
    switch (mode) {
        case 'error':
            throw Error(errText);
        case 'false':
            return false;
        case 'null':
            return null;
        case 'undefined':
            return undefined;
        default:
            return text;
    }
}

module.exports = {
    isValid
}