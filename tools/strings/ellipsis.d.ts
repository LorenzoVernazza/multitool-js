/** 
 * Trims a string to a given length and applies ellipsis
 * 
 * E.g. ellipsis("hello from multitool-js!", 8) => "hello..."
 */
export default function ellipsis(
	/** Value to trim */input,
	/** Maximum length of the output string */length,
	/** Replacement string, default ... */replacement = '...'
) {
	if (length > 0 && input.length > length) {
		return input.substr(0, length - replacement.length) + replacement;
	} else {
		return input;
	}
}
