function deepFindKeySimple(root, targetKey) {
	if (root[targetKey]) return root[targetKey];
	else {
		for (const key of Object.keys(root)) {
			if (typeof root[key] === 'object' && (maxDepth !== 0)) {
				let found = deepFindKeySimple(root[key], targetKey);
				if (found !== undefined) return found;
			}
		}
	}
	return undefined;
}
function deepFindKeyLimited(root, targetKey, maxDepth = -1) {
	if (root[targetKey]) return root[targetKey];
	else {
		for (const key of Object.keys(root)) {
			if (typeof root[key] === 'object' && (maxDepth !== 0)) {
				let found = deepFindKeyLimited(root[key], targetKey, maxDepth > 0 ? (maxDepth - 1) : -1);
				if (found !== undefined) return found;
			}
		}
	}
	return undefined;
}
function deepFindKey(root, targetKey, maxDepth = -1) {
	if (maxDepth >= 0) return deepFindKeyLimited(root, targetKey, maxDepth);
	else return deepFindKeySimple(oot, targetKey);
}

module.exports = deepFindKey;

const x = {
	a: {
		b: {
			x: {
				z: ['a', 'b', {
					me: 'You found me!'
				}]
			}
		},
		f: {},
		aaa: ''
	}
}

const y = {
	a: {
		b: {
			x: {
				z: ['a', 'b']
			}
		},
		f: {},
		aaa: ''
	}
}

console.log(deepFindKey(x, 'me', 5));
console.log(deepFindKey(y, 'me'));