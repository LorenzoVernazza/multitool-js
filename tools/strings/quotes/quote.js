const hasQuotes = require('./hasQuotes');

function quote(input = '', {
	quotationMark = '\'',
	ifNeeded = false
} = {}) {
	if (ifNeeded && hasQuotes(input, ifNeeded === 'all' ? undefined : { quotationMark })) {
		return `${input}`;
	} else {
		return `${quotationMark}${input}${quotationMark}`
	}
}

module.exports = quote;
