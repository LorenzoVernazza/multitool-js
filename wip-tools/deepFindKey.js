function deepFindKeyOne(root, targetKey, maxDepth = -1) {
	if (root[targetKey]) return root[targetKey];
	else {
		for (const key of Object.keys(root)) {
			if (typeof root[key] === 'object' && (maxDepth !== 0)) {
				let found = deepFindKeyOne(root[key], targetKey, maxDepth > 0 ? (maxDepth - 1) : -1);
				if (found !== undefined) return found;
			}
		}
	}
	return undefined;
}

function deepFindKeyMultiple(root, targetKey, { limit = 1, maxDepth = -1 }) {
	const results = [];
	if (limit !== 0) {
		if (root[targetKey]) results.push(root[targetKey]);
		for (const key of Object.keys(root)) {
			if (typeof root[key] === 'object' && (maxDepth !== 0) && (limit < 0 || limit > results.length)) {
				results.push(...deepFindKeyMultiple(root[key], targetKey, {
					maxDepth: maxDepth > 0 ? (maxDepth - 1) : -1,
					limit: limit > 0 ? (limit - results.length) : -1,
				}));
			}
		}
	}
	return results;
}

function deepFindKeyComplete(root, targetKey, {
	limit = 1,
	maxDepth = -1
}) {
	const results = [];
	if (limit !== 0) {
		if (root[targetKey]) results.push({
			tree: [],
			get depth() { return this.tree.length },
			value: root[targetKey]
		});
		for (const key of Object.keys(root)) {
			if (typeof root[key] === 'object' && (maxDepth !== 0) && (limit < 0 || limit > results.length)) {
				results.push(...deepFindKeyComplete(root[key], targetKey, {
					maxDepth: maxDepth > 0 ? (maxDepth - 1) : -1,
					limit: limit > 0 ? (limit - results.length) : -1,
				}).map((res) => {
					res.tree.unshift(key);
					return res;
				}));
			}
		}
	}
	return results;
}

function deepFindKey(root, targetKey, {
	limit = 1,
	maxDepth = -1
}) {
	if (limit == 1) {
		return deepFindKeyOne(root, targetKey, maxDepth);
	} else {
		return deepFindKeyMultiple(root, targetKey, { limit, maxDepth });
	}
}


function deepFind(root,	compare, {
	limit = 1,
	maxDepth = -1
} = {}) {
	const results = [];
	if (limit !== 0) {
		console.log('LOOKING IN ', root)
		for (const [key, value] of Object.entries(root)) {
			console.log('Comparing', key, value)
			if (compare(key, value)) {
				results.push({
					tree: [],
					key,
					value
				});
			}
			console.log(typeof root[key], maxDepth, limit, results.length)
			if (typeof root[key] === 'object' && (maxDepth !== 0) && (limit < 0 || limit > results.length)) {
				results.push(...deepFind(root[key], compare, {
					maxDepth: maxDepth > 0 ? (maxDepth - 1) : -1,
					limit: limit > 0 ? (limit - results.length) : -1,
				}).map((res) => {
					res.tree.unshift(key);
					return res;
				}));
			}
		}
	}
	return results;
}


module.exports = deepFindKey;

const x = {
	a: {
		b: {
			x: {
				z: ['a', 'b', {
					me: 'You found me!'
				}, {
					me: 'You found me again!'
				}]
			}
		},
		f: {
			me: 2
		},
		aaa: ''
	},
	me: { test: 'Hello!' }
}

const y = {
	a: {
		b: {
			x: {
				z: ['a', 'b']
			}
		},
		f: { me: {} },
		aaa: ''
	}
}

// console.log(deepFindKey(x, 'me', 5));
// console.log(deepFindKey(y, 'me'));

// console.log(deepFindKeyComplete(x, 'me', { limit: -1, maxDepth: 5 }));
// console.log(deepFindValueComplete(x, 2, { limit: -1, maxDepth: 5 }));
console.log(deepFind(x, (key, value) => (console.log(key, value), key == 'me')));
// console.log(deepFindComplete(x, (key, value) => (value == 2)));