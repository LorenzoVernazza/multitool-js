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
export default function setProp(
	/** Property to set. */prop: string|string[],
	/** Object root. Creates a new object if not set. */root?: object,
	/** Property value. */value?: any,
	/** Setter options. */
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
): object;
