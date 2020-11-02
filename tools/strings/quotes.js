function hasQuotes(input, {
	quotationMark = ['\'', '\"', '\`']
} = {}) {
	if (Array.isArray(quotationMark)) {
		for (const mark of quotationMark) {
			if (hasQuotes(input, { quotationMark: mark })) return true;
		}
		return false;
	} else {
		return `${input}`.startsWith(quotationMark) && `${input}`.endsWith(quotationMark);
	}
}

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

function singleQuote(input = '', {
	ifNeeded = true
} = {}) {
	return quote(input, { ifNeeded, quotationMark: '\'' })
}

function doubleQuote(input = '', {
	ifNeeded = true
} = {}) {
	return quote(input, { ifNeeded, quotationMark: '\"' })
}

function backtickQuote(input = '', {
	ifNeeded = true
} = {}) {
	return quote(input, { ifNeeded, quotationMark: '\`' })
}

module.exports = {
	hasQuotes,
	quote,
	unquote,
	singleQuote,
	doubleQuote,
	backtickQuote
};
