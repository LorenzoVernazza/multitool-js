/**
 * Returns a promise that is resolved/rejected after a timeout.
 *
 * Promise can resolve/reject custom values passed as arguments.
 */
function timer(
		/** Time to wait (in milliseconds). */timeout,
		/** If *true* the promise is rejected, if *false* resolved. Default *false* (resolved). */ rejectPromise = false,
		/** Resolve/Reject arguments. */...args
) {
	return new Promise(function(resolve, reject) {
		setTimeout(rejectPromise ? reject : resolve, timeout, ...args);
	});
}

module.exports = { timer };
