/**
 * Sets a property in an object.
 * For nested properties use "dot" notation:
 *
 * const obj = {};
 *
 * await replacePropAsync('foo.bar', obj, async () => (0));
 *
 * "obj" is now { foo: { bar: 0 } }
 *
 * await replacePropAsync('foo.bar', obj, async (i) => (i + 1));
 *
 * "obj" is now { foo: { bar: 1 } }
 */
declare async function replacePropAsync(
	/** Property to set. */
	prop: string,
	/** Object root. */
	root: object,
	/** Replacer function. */
	replacer: (/** Current value*/value: any) => any,
	/** Replacer options. */
	options?: {
		/** Sets value as readonly (*false*) or read/write (*true*). Default *true*. */
		writable: boolean,
		/** Creates missing sub-keys:
		 * - *false* throws errors for missing keys
		 * - "ignore" does not throw errors
		 * - "last" creates only the last key
		 * - "last-ignore" as "last" but does not throw errors. 
		 * Default *true*. */ 
		createMissing: boolean|string
	}
): Promise<object>;
export = replacePropAsync;
