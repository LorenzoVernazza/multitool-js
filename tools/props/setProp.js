/**
 * Sets a property in an object.
 * For nested properties use "dot" notation:
 *
 * const obj = {};
 *
 * setProp('foo.bar', obj, 0);
 *
 * "obj" is now { foo: { bar: 0 } }
 *
 */
const setProp = (
	/** Property to set. */prop = '',
	/** Object root. */root = {},
	/** Property value. */value = undefined,
	/** Sets value as readonly or read/write. Default true. */writable = true
) => {
	if (!prop) throw Error('Missing param property');
	const keys = (typeof prop === 'string') ? prop.split('.') : prop;
	let cursor = root;
	for (let index = 0; index < keys.length; index++) {
		const key = keys[index];
		if (typeof cursor !== 'object') {
			throw Error('Unable to set, some sub-key was already defined as non-object: "' + keys.slice(0, index).join('.') + '".');
		}
		if (index == (keys.length - 1)) {
			Object.defineProperty(cursor, key, {
				value,
				writable
			});
		} else {
			if (!cursor.hasOwnProperty(key)) {
				cursor[key] = {};
			}
			cursor = cursor[key];
		}
	}
	return root;
};
module.exports = setProp;
