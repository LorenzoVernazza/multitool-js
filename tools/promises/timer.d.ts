/**
 * Returns a promise that is resolved/rejected after a timeout.
 *
 * Promise can resolve/reject custom values passed as arguments.
 */
declare function timer(
		/** Time to wait (in milliseconds). */timeout: number,
		/** If *true* the promise is rejected, if *false* resolved. Default *false* (resolved). */ rejectPromise?: boolean,
		/** Resolve/Reject arguments. */...args
) : Promise<any[]>;
export = timer;