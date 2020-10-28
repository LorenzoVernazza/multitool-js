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
	/** Setter options. */
	{
		/** Sets value as readonly (*false*) or read/write (*true*). Default *true*. */
		writable = true,
		/** Creates missing sub-keys:
		 * - *false* throws errors for missing keys
		 * - "ignore" does not throw errors
		 * - "last" creates only the last key
		 * - "last-ignore" as "last" but does not throw errors. 
		 * Default *true*. */ 
		createMissing = true
	} = {}) => {
	if (!prop) throw Error('Missing param property');
	const keys = (typeof prop === 'string') ? prop.split('.') : prop;
	let cursor = root;
	for (let index = 0; index < keys.length; index++) {
		const key = keys[index];
		if (typeof cursor !== 'object') {
			throw Error('Unable to set, some sub-key was already defined as non-object: "' + keys.slice(0, index).join('.') + '".');
		}
		if (index == (keys.length - 1)) {
			if (!cursor.hasOwnProperty(key) && !['last', 'last-ignore'].includes(createMissing)) {
				if (createMissing === 'ignore') {
					return root;
				} else if (!createMissing) {
					throw Error('Unable to set, missing sub-key: "' + keys.slice(0, index).join('.') + '".');
				}
			}
			cursor[key] = value;
			if (!writable) Object.defineProperty(cursor, key, { value, writable: false, configurable: false });
		} else {
			if (!cursor.hasOwnProperty(key)) {
				if (['ignore', 'last-ignore'].includes(createMissing)) {
					return root;
				} else if (createMissing && (createMissing !== 'last')) {
					cursor[key] = {};
				} else {
					throw Error('Unable to set, missing sub-key: "' + keys.slice(0, index).join('.') + '".');
				}
			}
			cursor = cursor[key];
		}
	}
	return root;
};
module.exports = setProp;
