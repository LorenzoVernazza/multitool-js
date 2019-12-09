/* eslint-disable no-console */
const promiseAny = require('../tools/promises/promiseAny');

const rnd = () => (Math.random() >= 0.5);
const timedPromise = (returnValue, rejectPromise = true, timeout = 1000) => new Promise((resolve, reject) => {
	setTimeout(() => {
		if (rejectPromise) reject(returnValue);
		else resolve(returnValue);
	}, timeout);
});


setTimeout(() => {
	const promiseObj1 = {
		A: timedPromise('A - resolved', false, 100),
		B: timedPromise('B - rejected', true, 300),
		C: timedPromise('A - random', rnd()),
		D: timedPromise('A - random', rnd())
	};
	promiseAny(promiseObj1, {
		// ifEmpty,
		// ignoredReturn,
		// required,
		// timeout
	})
	.then((res) => {
		console.log('RESOLVED', res);
	})
	.catch((err) => {
		console.error('REJECTED', err);
	});
}, 10);

setTimeout(() => {
	const promiseObj = {
		A: timedPromise('A - resolved', false, 100),
		B: timedPromise('B - rejected', true, 300),
		C: timedPromise('A - random', rnd()),
		D: timedPromise('A - random', rnd())
	};
	promiseAny(
		promiseObj,
		{
			// ifEmpty,
			// ignoredReturn,
			// required,
			timeout: 900
		})
	.then((res) => {
		console.log('RESOLVED', res);
	})
	.catch((err) => {
		console.error('REJECTED', err);
	});
}, 1000);
