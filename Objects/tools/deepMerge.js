const SKIP = Symbol('skip');

function _deepMerge(value, target, params = {}, settings = {}) {
	const {
		key = '',
		fullKey = '',
		source,
		destination
	} = params;
	const {
		filter,
		arrayMergeMethod = 'merge',
		skipUndefined = true,
		replace = true
	} = settings;

	if (filter && fullKey && !filter(value, target, params)) return value;
	if (Array.isArray(value)) {
		if (!Array.isArray(target)) {
			if (target === undefined) {
				target = [];
			} else if (typeof replace == 'function') {
				const next = replace(value, target, params, SKIP);
				if (next === SKIP) return value;
				if (!Array.isArray(next)) return next;
				target = next;
			} else if (replace) {
				target = [];
			} else {
				return value;
			}
		}
		if (arrayMergeMethod === 'append' || arrayMergeMethod === 'push') {
			target.push(...value);
		} else if (arrayMergeMethod === 'prepend' || arrayMergeMethod === 'unshift') {
			target.unshift(...value);
		} else {
			for (let i = 0; i < value.length; i++) {
				target[i] = _deepMerge(value[i], target[i], {
					key: `${i}`,
					fullKey: `${fullKey}.${i}`,
					source,
					destination
				}, settings);
			}
		}
	} else if (value && typeof value == 'object') {
		if (typeof target != 'object' || !target || Array.isArray(target)) {
			if (target === undefined) {
				target = {};
			} else if (typeof replace == 'function') {
				const next = replace(value, target, params, SKIP);
				if (next === SKIP) return value;
				if (typeof next != 'object' || !next || Array.isArray(next)) return next;
				target = next;
			} else if (target === undefined || replace) {
				target = {};
			} else {
				return value;
			}
		}
		for (const [_key, _value] of Object.entries(value)) {
			target[_key] = _deepMerge(_value, target[_key], {
				key: _key,
				fullKey: `${fullKey}.${_key}`,
				source,
				destination
			}, settings);
		}
	} else if (replace || target === undefined) {
		if (typeof replace == 'function') {
			const next = replace(value, target, params, SKIP);
			if (next === SKIP) return value;
			target = next;
		} else if (value !== undefined || !skipUndefined) {
			target = value;
		}
	} else {
		return value;
	}

	return target;
}

function deepMerge(source, destination, {
	filter,
	arrayMergeMethod = 'merge',
	skipUndefined = true,
	replace = true,
	keepOriginal = false
} = {}) {
	let targetDestination = destination;
	if (destination && keepOriginal) {
		targetDestination = _deepMerge(destination);
	}
	return _deepMerge(source, targetDestination, {
		source,
		targetDestination
	}, {
		filter,
		arrayMergeMethod,
		skipUndefined,
		replace
	});
}

deepMerge.deepMerge = deepMerge;
module.exports = deepMerge;
