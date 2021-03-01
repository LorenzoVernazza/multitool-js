/**
 * Retrives a property from an object.
 * For nested properties use "dot" notation:
 *
 * const obj = { foo: { bar: 0 } };
 *
 * getProp('foo.bar', obj) // returns 0
 */
export default function getProp(
	/** Property to get. */prop: string|string[],
	/** Object root. */root: object,
	/** Default value when not found. */defaultValue?: any
): any;
