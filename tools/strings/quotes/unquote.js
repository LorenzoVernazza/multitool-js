const hasQuotes = require('./hasQuotes');

function unquote(input = '', {
	// all,
	quotationMark
} = {}) {
	/* if (all) {
		return input.replace(`\\${quotationMark}` || '\'\"\`', '')
	} else  */
	if (hasQuotes(input, { quotationMark })) {
		return input.substring(1, -1);
	} else {
		return input
	}
}

module.exports = unquote;
