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
	/** Default value when not found. */defaultValue = undefined
) => {
	if (!root) return defaultValue;
	if (!prop || prop.length == 0) return root;
	const keys = typeof prop === 'string' ? prop.split('.') : prop;
	let current = root;
	for (var key of keys) {
		if (current[key] === undefined) return defaultValue;
		else current = current[key];
	}
	return current;
};

module.exports = getProp;
