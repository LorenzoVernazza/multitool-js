const { to0255Range, to01Range } = require('./utils');

function _rgbParams(r = 0, g = 0, b = 0) {
	const cMax = Math.max(r, g, b);
	const cMin = Math.min(r, g, b);
	const delta = cMax - cMin;
	return { cMax, cMin, delta };
}

function _hslHue(delta, cMax, r, g, b, precision = 0) {
	if (delta) {
		let result = 0;
		if (cMax === r) {
			result = (((g - b) / delta) % 6);
		} else if (cMax === g) {
			result = (((b - r) / delta) + 2);
		} else if (cMax === b) {
			result = (((r - g) / delta) + 4);
		}
		if (precision >= 0) return Number((result * 60).toFixed(precision));
		return result;
	}
	return 0;
}

function _hslSaturation(delta, lightness, precision = 2) {
	if (delta) {
		const result = delta / ((1 - Math.abs(2 * lightness - 1)) * 255);
		if (precision >= 0) return Number(result.toFixed(precision));
		return result;
	} else {
		return 0;
	}
}

function _hslLightness(cMax, cMin, precision = 2) {
	const result = (cMax + cMin) / (2 * 255);
	if (precision >= 0) return Number(result.toFixed(precision));
	return result;
}

function _rgbChannel(channel, m, precision = 0) {
	return to0255Range((channel + m) * 255, precision);
}

/* HSL */

function rgbToHue(red = 0, green = 0, blue = 0, precision) {
	const { delta, cMax } = _rgbParams(red, green, blue);
	return _hslHue(delta, cMax, red, green, blue, precision);
}

function rgbToSaturation(red = 0, green = 0, blue = 0, precision) {
	const { delta, cMax, cMin } = _rgbParams(red, green, blue);
	return _hslSaturation(delta, _hslLightness(cMax, cMin), precision);
}

function rgbToLightness(red = 0, green = 0, blue = 0, precision) {
	const { cMax, cMin } = _rgbParams(red, green, blue);
	return _hslLightness(cMax, cMin, precision);
}

function rgbToHsl(red = 0, green = 0, blue = 0, alpha = 1, precision) {
	const { cMax, cMin, delta } = _rgbParams(red, green, blue);
	const l = _hslLightness(cMax, cMin, precision >= 0 ? precision + 2 : precision < 0 ? -1 : undefined);
	const s = _hslSaturation(delta, l, precision >= 0 ? precision + 2 : precision < 0 ? -1 : undefined);
	const h = _hslHue(delta, cMax, red, green, blue, precision);
	return { h, s, l, a: alpha };
}

function hslToRgb(hue = 0, saturation = 0, lightness = 0, alpha = 1, precision = 0) {
	hue %= 360;
	if (hue < 0) hue + 360;
	saturation = to01Range(saturation);
	lightness = to01Range(lightness);

	const _c = ((1 - Math.abs(2 * lightness - 1)) * saturation);
	const _x = _c * (1 - Math.abs((hue / 60) % 2 - 1));
	const _m = lightness - _c / 2;

	let r1 = 0, g1 = 0, b1 = 0;
	if (hue >= 300) {
		r1 = _c;
		b1 = _x;
	} else if (hue >= 240) {
		b1 = _c;
		r1 = _x;
	} else if (hue >= 180) {
		b1 = _c;
		g1 = _x;
	} else if (hue >= 120) {
		g1 = _c;
		b1 = _x;
	} else if (hue >= 60) {
		g1 = _c;
		r1 = _x;
	} else {
		r1 = _c;
		g1 = _x;
	}

	return {
		r: _rgbChannel(r1, _m, precision),
		g: _rgbChannel(g1, _m, precision),
		b: _rgbChannel(b1, _m, precision),
		a: alpha
	};
}

/* CMYK */

function rgbToCmyk(red = 0, green = 0, blue = 0, alpha = 1, precision = 3) {
	const r1 = red / 255;
	const g1 = green / 255;
	const b1 = blue / 255;

	const _k = 1 - Math.max(r1, g1, b1);
	const _c = (1 - r1 - k) / (1 - k);
	const _m = (1 - g1 - k) / (1 - k);
	const _y = (1 - b1 - k) / (1 - k);

	return {
		c: to01Range(_c, precision),
		m: to01Range(_m, precision),
		y: to01Range(_y, precision),
		k: to01Range(_k, precision),
		a: alpha
	};
}

function cmykToRgb(cyan = 0, magenta = 0, yellow = 0, black = 0, alpha = 1, precision = 0) {
	const r = to0255Range(255 * (1 - cyan) * (1 - black), precision);
	const g = to0255Range(255 * (1 - magenta) * (1 - black), precision);
	const b = to0255Range(255 * (1 - yellow) * (1 - black), precision);
	return { r, g, b, a: alpha };
}

module.exports = {
	rgbToHue,
	rgbToSaturation,
	rgbToLightness,
	rgbToHsl,
	hslToRgb,
	rgbToCmyk,
	cmykToRgb
};
