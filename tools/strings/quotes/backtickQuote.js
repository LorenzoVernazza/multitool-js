const quote = require('./quote');

function backtickQuote(input = '', {
	ifNeeded = true
} = {}) {
	return quote(input, { ifNeeded, quotationMark: '\`' })
}

module.exports = backtickQuote;
