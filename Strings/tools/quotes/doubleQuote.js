const quote = require('./quote');

function doubleQuote(input = '', {
	ifNeeded = true
} = {}) {
	return quote(input, { ifNeeded, quotationMark: '\"' })
}

module.exports = doubleQuote;
