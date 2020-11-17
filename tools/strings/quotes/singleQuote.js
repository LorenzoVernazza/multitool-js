const quote = require('./quote');

function singleQuote(input = '', {
	ifNeeded = true
} = {}) {
	return quote(input, { ifNeeded, quotationMark: '\'' })
}

module.exports = singleQuote;
