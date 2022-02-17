interface Parameters {
	/** Current key */
	key: string,
	/** Current key path */
	fullKey: string,
	/** Source value */
	source: any,
	/** Destination value */
	destination: any
}

/**
 * Merges two object.
 * By default values from the *source* object are copied to the *destination* object.
 * If no *destination* is provided a new one will be created based on the *source* type.
 */
declare function deepMerge(
	/** Source element */
	source: any,
	/** Destination object. If missing will be created. */
	destination?: any,
	/** Merge options */
	options?: {
		/** Filter function for each key-value pair. Ignores the key-value pair on a *false* value. */
		filter?: (
			/** Next value (from source) */
			value: any,
			/** Current value (from destination) */
			target: any,
			/** Current parameters */
			params: Parameters
		) => boolean,
		/** Avoids copying undefined values from *source*. Default: *true* */
		skipUndefined?: boolean,
		/** Replaces any value in the *destination* object whenever it is not an object or array. Default: *true* */
		replace?: boolean|((
			/** Next value (from source) */
			value: any,
			/** Current value (from destination) */
			target: any,
			/** Current parameters */
			params: Parameters,
			/** Return this value to skip the current replace */
			SKIP: Symbol
		) => any),
		/** Creates a copy of the *destination* object instead of injecting data in the original. Default: *false* */
		keepOriginal?: boolean
	}): any;

export { deepMerge };
