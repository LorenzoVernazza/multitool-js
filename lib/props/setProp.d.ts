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
declare function setProp(
	/** Property to set. */prop: string,
	/** Object root. Creates a new object if not set. */root?: object,
	/** Property value. */value?: any,
	/** Sets value as readonly or read/write. Default true. */writable?: boolean
): object;
export = setProp;
