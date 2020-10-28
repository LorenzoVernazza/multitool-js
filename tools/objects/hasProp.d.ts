/**
 * Checks if an object contains a property.
 * For nested properties use "dot" notation:
 *
 * const obj = { foo: { bar: 0 } };
 *
 * hasProp('foo.bar', obj) // returns true
 */
function hasProp(
	/** Property to check. */prop: string|string[],
	/** Object root. */root: object,
): any;

export = hasProp;
