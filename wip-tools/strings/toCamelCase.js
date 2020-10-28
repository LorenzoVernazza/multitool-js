function toCamelCase(input = '', {
	preserveOthers = true,
	pascal = false,
	set = [/\W+/, '-', '_']
} = {}) {
	if (pascal) {
		if
	} else {
		const output = (preserveOthers ? input : input.toLowerCase())
		return output.replace(/(\W+|^)(\w)/g, (fullMatch, whiteSpaces, letter) => ('' + whiteSpaces + letter.toUpperCase()));
	}

	let regex;
	switch (pascal) {
		case 'smart':
			regex = /([.!?]\W+|^\W*)(\w)/g; break;
		case 'whitespace':
			regex = /(\W+|^)(\w)/g; break;
		case 'first-whitespace':
			regex = /(^\W*)(\w)/; break;
		default:
			return input.charAt(0).toUpperCase() + (preserveOthers ? input.slice(1) : input.slice(1).toLowerCase());
	}
	if (regex) {

	}
}
module.exports = toCamelCase;
