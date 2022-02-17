/**
 * Checks if an object contains a property.
 * For nested properties use "dot" notation:
 *
 * const obj = { foo: { bar: 0 } };
 *
 * hasProp('foo.bar', obj) // returns true
 */
function hasProp(
		/** Property to get. */prop,
		/** Object root. */root
) {
	if (!root) return false;
	if (!prop || prop.length == 0) return root;
	const keys = typeof prop === 'string' ? prop.split('.') : prop;
	let current = root;
	for (var key of keys) {
		if (current[key] === undefined) return false;
		else current = current[key];
	}
	return (current !== undefined);
}

hasProp.hasProp = hasProp;
module.exports = hasProp;
