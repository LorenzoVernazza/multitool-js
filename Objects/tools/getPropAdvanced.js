const regexA = /(\^\^|\^\.|[^.\r\n])+/g;
const regexB = /\^\./g;
const regexC = /((\^\^)+)(\.|$)/g;

/**
 * Retrives a property from an object.
 * For nested properties use "dot" notation:
 *
 * const obj = { foo: { bar: 0 } };
 *
 * getPropAdvanced('foo.bar', obj) // returns 0
 *
 * For properties with "." as literal use ^ before.
 * Any ^ before a . must be escaped as well:
 *
 * const obj = { "fo^.o": { bar: 0 } };
 *
 * getPropAdvanced('fo^^^.o.bar', obj) // returns 0
 *
 */
function getPropAdvanced(
		/** Property to get. */prop,
		/** Object root. */root,
		/** Replacement value when not found. */replacement = undefined
) {
	if (!root) return replacement;
	if (!prop) return root;
	const keys = Array.isArray(prop) ? prop : (prop.match(regexA) || []).map((piece) => (piece.replace(regexB, '.').replace(regexC, (...groups) => (groups[1].slice(groups[1].length / 2) + groups[3]))));
	let current = root;
	for (var key of keys) {
		if (current[key] === undefined) return replacement;
		else current = current[key];
	}
	return current;
}

module.exports = { getPropAdvanced };
