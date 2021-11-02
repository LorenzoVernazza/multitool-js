const {
	shorthandHexRegex,
	hexRegex,
	rgbaCommaRegex,
	rgbaRegex,
	hslaCommaRegex,
	hslaRegex
} = require('./constants');

function parseHex(hex = '') {
	hex = hex.replace(shorthandHexRegex, (m, r, g, b, a) => (r + r + g + g + b + b + (a ? (a + a) : '')));
	var result = hexRegex.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16),
		a: result[4] === undefined ? 1 : parseInt(result[4], 16) / 255
	} : null;
}

function parseRGB(rgb = '') {
	let result = rgbaCommaRegex.exec(rgb);
	if (!result) result = rgbaRegex.exec(rgb);
	if (!result) return null;

	let a = 1;
	if (result[8] !== undefined) {
		if (result[8].endsWith('%')) {
			a = result[8].slice(0, -1) / 100;
		} else {
			a = Number(result[8]);
		}
	}

	return {
		r: Number(result[1]),
		g: Number(result[3]),
		b: Number(result[5]),
		a
	};
}

function parseHSL(hsl = '') {
	let result = hslaCommaRegex.exec(hsl);
	if (!result) result = hslaRegex.exec(hsl);
	if (!result) return null;

	let h = 0;
	if (result[1].endsWith('deg')) {
		h = Number(result[1].slice(0, -3));
	} else {
		h = Number(result[1]);
	}

	let s = 0;
	if (result[4].endsWith('%')) {
		s = result[4].slice(0, -1) / 100;
	} else {
		s = Number(result[4]);
	}

	let l = 0;
	if (result[6].endsWith('%')) {
		l = result[6].slice(0, -1) / 100;
	} else {
		l = Number(result[6]);
	}

	let a = 1;
	if (result[9] !== undefined) {
		if (result[9].endsWith('%')) {
			a = result[9].slice(0, -1) / 100;
		} else {
			a = Number(result[9]);
		}
	}

	return { h, s, l, a };
}

module.exports = {
	parseHex,
	parseRGB,
	parseHSL
};
