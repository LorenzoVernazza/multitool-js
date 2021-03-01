/**
 * Retrives a property from an object.
 * For nested properties use "dot" notation:
 *
 * const obj = { foo: { bar: 0 } };
 *
 * getProp('foo.bar', obj) // returns 0
 *
 * For properties with "." as literal use ^ before.
 * Any ^ before a . must be escaped as well:
 *
 * const obj = { "fo^.o": { bar: 0 } };
 *
 * getProp('fo^^^.o.bar', obj) // returns 0
 *
 */
export default function getPropAdvanced(
	/** Property to get. */prop: string | string[],
	/** Object root. */root: object,
	/** Replacement value when not found. */replacement?: any
): any;
