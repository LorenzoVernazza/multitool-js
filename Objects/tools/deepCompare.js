function deepCompare(a, b, {
	strict = true
} = {}) {
	if (typeof a == 'object' && typeof b == 'object') {
		if (!a || !b) {
			return strict ? (a === b) : (a == b);
		} else if (Array.isArray(a)) {
			if (Array.isArray(b)) {
				if (a.length != b.length) return false;
				for (let i = 0; i < a.length; i++) {
					if (!deepCompare(a[i], b[i], { strict })) return false;
				}
				return true;
			} else {
				return false;
			}
		} else if (Array.isArray(b)) {
			return false;
		} else {
			const keys = new Set();
			Object.keys(a).forEach((key) => (keys.add(key)));
			Object.keys(b).forEach((key) => (keys.add(key)));
			for (const key of keys) {
				if (!deepCompare(a[key], b[key], { strict })) return false;
			}
			return true;
		}
	} else {
		return strict ? (a === b) : (a == b);
	}
}

module.exports = {
	deepCompare
};
