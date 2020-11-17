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

module.exports = hasQuotes;
