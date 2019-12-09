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
	for (var index in keys) {
		const key = keys[index];
		if (typeof cursor !== 'object') {
			throw Error('Unable to set, some sub-key was already defined as non-object: "' + keys.slice(0, index).join('.') + '".');
		}
		if (index == (keys.length - 1)) {
			const descriptor = Object.getOwnPropertyDescriptor(cursor, key);
			if (!descriptor.writable) {
				throw Error('Unable to set, key was already defined as non-writable.');
			} else {
				Object.defineProperty(cursor, key, {
					value,
					writable
				});
			}
		} else {
			if (!cursor.hasOwnProperty(key)) {
				cursor[key] = {};
			} else {
				cursor = cursor[key];
			}
		}
	}
	return root;
};
module.exports = setProp;
