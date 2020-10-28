function firstToUpperCase(input = '', {
	preserveOthers = true,
	mode = false
} = {}) {
	let regex;
	switch (mode) {
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
		const output = preserveOthers ? input : input.toLowerCase();
		return output.replace(regex, (fullMatch, whiteSpaces, letter) => ('' + whiteSpaces + letter.toUpperCase()));
	}
}
module.exports = firstToUpperCase;
