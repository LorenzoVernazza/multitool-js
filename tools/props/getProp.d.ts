/**
 * Retrives a property from an object.
 * For nested properties use "dot" notation:
 *
 * const obj = { foo: { bar: 0 } };
 *
 * getProp('foo.bar', obj) // returns 0
 */
declare function getProp(
	/** Property to get. */prop: string,
	/** Object root. */root: object,
	/** Replacement value when not found. */replacement?: any
): any;
export = getProp;
