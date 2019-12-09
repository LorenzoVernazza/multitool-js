/**
 * Returns a promise that is resolved/rejected when all the provided promises are resolved/rejected.
 *
 * All non Promise/Promise-like inputs will be ignored.
 *
 * Input can be an Array or an Object, output will be the same.
 *
 * For each promise returns { res } if resolved, { err } if rejected.
 */
const promiseAny = (/** Promises. */promises = [], /** Options. */options = {}) => new Promise((resolve, reject) => {
	const results = Array.isArray(promises) ? [] : {};
	const length = Array.isArray(promises) ? promises.length : Object.keys(promises).length;
	const treshold = (options.required >= 0) ? options.required : (options.required < 0) ? (length + options.required) : (options.required === 'all') ? length : 1;
	let resolved = 0; let rejected = 0; let ignored = 0; let timeout = false; let completed = false;
	function check() {
		if (((resolved + rejected + ignored) >= length) && !completed) {
			if (timeout) clearTimeout(timeout);
			if (resolved >= treshold) resolve(results); else reject(results);
			completed = true;
		}
	}
	if (!length) {
		if (options.ifEmpty === 'resolve') resolve(results);
		else if (options.ifEmpty === 'reject') reject(results);
		else if (resolved >= treshold) resolve(results);
		else reject(results);
		return;
	}
	for (const index in promises) {
		if (!promises[index] || !promises[index].then || !promises[index].catch) {
			results[index] = {};
			if (options.ignoredReturn === 'reject') rejected++;
			else if (options.ignoredReturn === 'resolve') resolved++;
			else ignored++;
			check();
		} else {
			promises[index]
			.then((res) => {
				results[index] = { res }; resolved++; check(); return res;
			})
			.catch((err) => {
				results[index] = { err }; rejected++; check(); return err;
			});
		}
	}
	if (options.timeout > 0) {
		timeout = setTimeout(() => {
			for (const index in promises) {
				if (!results[index]) {
					results[index] = { err: Error('Promise timed out.') };
					rejected++;
				}
			}
			check();
		}, options.timeout);
	}
});

module.exports = promiseAny;
