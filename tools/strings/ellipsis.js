function ellipsis(input, length, replacement = '...') {
	if (length > 0 && input.length > length) {
		return input.substr(0, length - replacement.length) + replacement;
	} else {
		return input;
	}
}

module.exports = ellipsis;
