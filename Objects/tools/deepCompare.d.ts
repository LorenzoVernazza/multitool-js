/**
 * Checks if two values are equal.
 * Return *true* for equal values, *false* otherwise.
 * Objects are compared key by key.
 * Arrays are compared element by element.
 */
declare function deepCompare(
	/** First element */
	a: any,
	/** Second element */
	b: any,
	/** Compare options */
	options?: {
		/** *When true* strict comparison (===) is used. Defaults *true* */
		strict?: boolean
	}): any;

export { deepCompare };
