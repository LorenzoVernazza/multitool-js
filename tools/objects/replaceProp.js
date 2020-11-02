/**
 * Replaces a property in an object.
 * For nested properties use "dot" notation:
 *
 * const obj = {};
 *
 * replaceProp('foo.bar', obj, () => (0));
 *
 * "obj" is now { foo: { bar: 0 } }
 *
 * replaceProp('foo.bar', obj, (i) => (i + 1));
 *
 * "obj" is now { foo: { bar: 1 } }
 */
function replaceProp(
	/** Property to set. */prop = '',
	/** Object root. */root = {},
	/** Replacer function. */replacer = () => {},
	/** Replacer options. */
	{
		/** Sets value as readonly (*false*) or read/write (*true*). Default *true*. */
		writable = true,
		/** Creates missing sub-keys:
		 * - *true* creates all missing sub-keys (when possible)
		 * - *false* throws errors for missing keys
		 * - "force" creates all missing sub-keys and replaces existing non-object keys
		 * - "ignore" does not throw errors
		 * - "last" creates only the last key
		 * - "last-ignore" as "last" but does not throw errors. 
		 * Default *false*. */ 
		createMissing = false
	} = {}
) {
	if (!prop) throw Error('Missing param property');
	const keys = (typeof prop === 'string') ? prop.split('.') : prop;
	let cursor = root;
	for (let index = 0; index < keys.length; index++) {
		const key = keys[index];
		if (typeof cursor !== 'object') {
			throw Error('Unable to replace, some sub-key was already defined as non-object: "' + keys.slice(0, index + 1).join('.') + '".');
		}
		if (index == (keys.length - 1)) {
			if (!cursor.hasOwnProperty(key) && !['last', 'last-ignore'].includes(createMissing)) {
				if (createMissing === 'ignore') {
					return root;
				} else if (!createMissing) {
					throw Error('Unable to replace, missing sub-key: "' + keys.join('.') + '".');
				}
			}
			const value = replacer(cursor[key])
			cursor[key] = value;
			if (!writable) Object.defineProperty(cursor, key, { value, writable: false, configurable: false });
		} else {
			if (!cursor.hasOwnProperty(key)) {
				if (['ignore', 'last-ignore'].includes(createMissing)) {
					return root;
				} else if (createMissing && (createMissing !== 'last')) {
					cursor[key] = {};
				} else {
					throw Error('Unable to replace, missing sub-key: "' + keys.slice(0, index + 1).join('.') + '".');
				}
			}
			if (createMissing === 'force' && typeof cursor[key] !== 'object') cursor[key] = {}
			cursor = cursor[key];
		}
	}
	return root;
};
module.exports = replaceProp;
