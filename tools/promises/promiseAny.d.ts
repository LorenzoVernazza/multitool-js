declare type Options = {
	/** 
	 * Defines when the Promise is resolved (or rejected).
	 * * "all": All promises must resolve.
	 * * 0: Any number of promises can be rejected.
	 * * *n* > 0: At least *n* promises must be resolved.
	 * * *n* < 0: At most *n* promises can be rejected.
	 * 
	 * Default: 1
	 */
	required?: 'all' | number,
	/**
	 * Defines how to handle non-promise inputs:
	 * * "resolve": Treats ignored promises as resolved when counting.
	 * * "reject": Treats ignored promises as reject when counting.
	 * * "ignore": Treats ignored promises as neither resolved nor rejected when counting.
	 * 
	 * Default "ignore"
	 */
	ignoredReturn?: 'resolve'|'reject'|'ignore',
	/**
	 * Defines how to handle an empty input:
	 * * "resolve": Resolves the promise.
	 * * "reject": Rejects the promise.
	 * * "ignore": Follows "required" property, rejects for *n* > 0, resolves otherwise.
	 * 
	 * Default "ignore"
	 */
	ifEmpty?: 'resolve'|'reject'|'ignore',
	/**
	  * Uses a timeout for promise resolution. Any non completed promise at the end is treated as rejected.
	  * 
	  * Note: Timed out promises keep running.
	  */
	 timeout: number
};

/**
 * Returns a promise that is resolved/rejected when all the provided promises are resolved/rejected.
 *
 * All non Promise/Promise-like inputs will be ignored.
 *
 * Input can be an Array or an Object, output will be the same.
 *
 * For each promise returns { res } if resolved, { err } if rejected.
 */
declare function promiseAny(
	/** Promises. */promises: object | Promise<any>[], 
	/** Options. */options: Options
): Promise<object|any[]>;
export = promiseAny;
