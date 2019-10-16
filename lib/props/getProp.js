/**
 * Retrives a property from an object.
 * For nested properties use "dot" notation:
 *
 * const obj = { foo: { bar: 0 } };
 *
 * getProp('foo.bar', obj) // returns 0
 */
const getProp = (
	/** Property to get. */prop,
	/** Object root. */root,
	/** Replacement value when not found. */replacement = undefined
) => {
	if (!root) return replacement;
	if (!prop) return root;
	const keys = prop.split('.');
	let current = root;
	for (var key of keys) {
		if (current[key] === undefined) return replacement;
		else current = current[key];
	}
	return current;
};
module.exports = getProp;