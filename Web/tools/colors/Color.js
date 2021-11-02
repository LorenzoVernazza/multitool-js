const {
	calculateLuma,
	to0255Range,
	to01Range,
	toHex
} = require('./utils');
const {
	rgbToHsl,
	rgbToHue,
	rgbToSaturation,
	rgbToLightness,
	hslToRgb,
	rgbToCmyk,
	cmykToRgb
} = require('./converters');
const {
	parseRGB,
	parseHex,
	parseHSL
} = require('./parsers');
const {
	randomColor,
	monochromaticTable
} = require('./generators');
const {
	BRIGHTNESS_THRESHOLD
} = require('./constants');

class Color {
	constructor(color, {
		precision = 0
	} = {}) {
		this._r = 0;
		this._g = 0;
		this._b = 0;
		this._a = 1;

		this._precision = precision;

		if (color) this.apply(color);
	}

	/** Updates the color */
	apply(color = null) {
		if (typeof color == 'string') {
			try {
				this.hexa = color;
				return;
			} catch (err) {}
			try {
				this.rgbaString = color;
				return;
			} catch (err) {}
			try {
				this.hslaString = color;
				return;
			} catch (err) {}
		} else if (color instanceof Color) {
			this._r = color._r;
			this._g = color._g;
			this._b = color._b;
			this._a = color._a;
		} else if (typeof color == 'object') {
			if (!isNaN(color.h) && !isNaN(color.s) && !isNaN(color.l)) {
				this.hsl = color;
			} else if (!isNaN(color.c) && !isNaN(color.m) && !isNaN(color.y) && !isNaN(color.k)) {
				this.cmyk = color;
			} else {
				this.rgb = color;
			}
		} else {
			this._r = 0;
			this._g = 0;
			this._b = 0;
			this._a = 1;
		}
		return this;
	}

	/** Color in an hex-formatted string (without alpha channel) */
	get hex() { return `#${toHex(this._r)}${toHex(this._g)}${toHex(this._b)}`; }
	set hex(color) {
		const _hex = parseHex(color);
		if (_hex) {
			this.red = _hex.r;
			this.green = _hex.g;
			this.blue = _hex.b;
			this.alpha = 1;
		} else {
			throw Error('Not a valid HEX String: #<red><green><blue>');
		}
	}

	/** Color in an hex-formatted string (with alpha channel) */
	get hexa() { return `#${toHex(this._r)}${toHex(this._g)}${toHex(this._b)}${toHex(this._a * 255)}`; }
	set hexa(color) {
		const _hex = parseHex(color);
		if (_hex) {
			this.red = _hex.r;
			this.green = _hex.g;
			this.blue = _hex.b;
			this.alpha = _hex.a;
		} else {
			throw Error('Not a valid HEXa String: #<red><green><blue><alpha>');
		}
	}

	/** Red channel (0 - 255) */
	get red() { return this._r; }
	set red(value) { this._r = to0255Range(value, this._precision); }

	/** Green channel (0 - 255) */
	get green() { return this._g; }
	set green(value) { this._g = to0255Range(value, this._precision); }

	/** Blue channel (0 - 255) */
	get blue() { return this._b; }
	set blue(value) { this._b = to0255Range(value, this._precision); }

	/** Alpha value (0 - 1) */
	get alpha() { return this._a; }
	set alpha(value) { this._a = to01Range(value, this._precision); }

	/** Color as a RGB object */
	get rgb() { return { r: this._r, g: this._g, b: this._b, a: this._a }; }
	set rgb({ r, g, b, a }) {
		if (!isNaN(r)) this.red = r;
		if (!isNaN(g)) this.green = g;
		if (!isNaN(b)) this.blue = b;
		if (!isNaN(a)) this.alpha = a;
	}

	/** Color in an rgb-formatted string (without alpha channel) */
	get rgbString() { return `rgb(${this._r}, ${this._g}, ${this._b})`; }
	set rgbString(color) {
		const _rgb = parseRGB(color);
		if (_rgb) {
			this.red = _rgb.r;
			this.green = _rgb.g;
			this.blue = _rgb.b;
			this.alpha = 1;
		} else {
			throw Error('Not a valid RGB String: rgb(<red>, <green>, <blue>)');
		}
	}

	/** Color in an hex-formatted string (with alpha channel) */
	get rgbaString() { return `rgba(${this._r}, ${this._g}, ${this._b}, ${this._a})`; }
	set rgbaString(color) {
		const _rgba = parseRGB(color);
		if (_rgba) {
			this.red = _rgba.r;
			this.green = _rgba.g;
			this.blue = _rgba.b;
			this.alpha = _rgba.a;
		} else {
			throw Error('Not a valid RGBA String: rgba(<red>, <green>, <blue>, <alpha>)');
		}
	}

	/** Hue value (0 - 360) */
	get hue() { return rgbToHue(this._r, this._g, this._b, this._precision); }
	set hue(value) {
		this.hsl = {
			...this.hsl,
			h: value
		};
	}

	/** Saturation value (0 - 1) */
	get saturation() { return rgbToSaturation(this._r, this._g, this._b, this._precision >= 0 ? this._precision + 2 : -1); }
	set saturation(value) {
		this.hsl = {
			...this.hsl,
			s: value
		};
	}

	/** Lightness value (0 - 1) */
	get lightness() { return rgbToLightness(this._r, this._g, this._b, this._precision >= 0 ? this._precision + 2 : -1); }
	set lightness(value) {
		this.hsl = {
			...this.hsl,
			l: value
		};
	}

	/** Color as a HSL object */
	get hsl() { return rgbToHsl(this._r, this._g, this._b, this._a, this._precision); }
	set hsl({ h, s, l, a = this._a }) {
		const { r, g, b } = hslToRgb(h, s, l, a, this._precision);
		this.red = r;
		this.green = g;
		this.blue = b;
		this.alpha = a;
	}

	/** Color in an hsl-formatted string (without alpha channel) */
	get hslString() {
		const { h, s, l } = rgbToHsl(this._r, this._g, this._b, this._a, this._precision);
		return `hsl(${h}, ${s * 100}%, ${l * 100}%)`;
	}
	set hslString(color) {
		const _hsl = parseHSL(color);
		if (_hsl) {
			this.hsl = {
				..._hsl,
				a: 1
			};
		} else {
			throw Error('Not a valid HSL String: hsl(<hue>, <saturation>, <lightness>)');
		}
	}

	/** Color in an hsl-formatted string (with alpha channel) */
	get hslaString() {
		const { h, s, l, a } = rgbToHsl(this._r, this._g, this._b, this._a, this._precision);
		return `hsla(${h}, ${s * 100}%, ${l * 100}%, ${a})`;
	}
	set hslaString(color) {
		const _hsla = parseHSL(color);
		if (_hsla) {
			this.hsl = _hsla;
		} else {
			throw Error('Not a valid HSL String: hsla(<hue>, <saturation>, <lightness>, <alpha>)');
		}
	}

	// get hsv() {} ???

	/** Cyan channel (0 - 1) */
	get cyan() { return this.cmyk.c; }
	set cyan(value) {
		this.cmyk = {
			...this.cmyk,
			c: value
		};
	}

	/** Magenta channel (0 - 1) */
	get magenta() { return this.cmyk.m; }
	set magenta(value) {
		this.cmyk = {
			...this.cmyk,
			m: value
		};
	}

	/** Yellow channel (0 - 1) */
	get yellow() { return this.cmyk.y; }
	set yellow(value) {
		this.cmyk = {
			...this.cmyk,
			y: value
		};
	}

	/** Black channel (0 - 1) */
	get black() { return this.cmyk.k; }
	set black(value) {
		this.cmyk = {
			...this.cmyk,
			k: value
		};
	}

	/** Color as a CMYK object */
	get cmyk() { return rgbToCmyk(this._r, this._g, this._b, this._a, this._precision >= 0 ? Math.max(3, this._precision) : -1); }
	set cmyk({ c, m, y, k, a = this._a }) {
		const { r, g, b } = cmykToRgb(c, m, y, k, a, this._precision);
		this.red = r;
		this.green = g;
		this.blue = b;
		this.alpha = a;
	}

	/** Returns the luma value (0 - 255) */
	get luma() {
		return calculateLuma(this._r, this._g, this._b);
	}

	/** Returns if the color is bright, true for a luma value > threshold */
	isBright(/** Threshold value */threshold = BRIGHTNESS_THRESHOLD) {
		return this.luma > threshold;
	}

	/** Returns if the color is dark, true for a luma value <= threshold */
	isDark(/** Threshold value */threshold = BRIGHTNESS_THRESHOLD) {
		return this.luma <= threshold;
	}

	/** Tints the color. Use *newInstance* to create a new color and keep the current one. */
	tint(/* Tint amount (0 - 100) */step = 10, /** If true returns a new Color instance instead of changing this one. */newInstance = false) {
		if (newInstance) {
			return (new Color(this)).tint(step);
		} else {
			this.lightness += step / 100;
			return this;
		}
	}

	/** Shades the color. Use *newInstance* to create a new color and keep the current one. */
	shade(/* Shade amount (0 - 100) */step = 10, /** If true returns a new Color instance instead of changing this one. */newInstance = false) {
		if (newInstance) {
			return (new Color(this)).shade(step);
		} else {
			this.lightness -= step / 100;
			return this;
		}
	}

	/** Returns complementary color. */
	getComplementary() {
		const complementary = new Color(this);
		complementary.hue = this.hue + 180;
	}

	/** Returns analogous colors. */
	getAnalogousColors() {
		const analogousLeft = new Color(this);
		analogousLeft.hue = this.hue - 30;
		const analogousRight = new Color(this);
		analogousRight.hue = this.hue + 30;
		return [analogousLeft, this, analogousRight];
	}

	/** Returns triadic colors. */
	getTriadicColors() {
		const triadicLeft = new Color(this);
		triadicLeft.hue = this.hue - 120;
		const triadicRight = new Color(this);
		triadicRight.hue = this.hue + 120;
		return [triadicLeft, this, triadicRight];
	}

	/** Returns tetradic colors. */
	getTetradicColors(/** Determines the shape and orientation of the tetradic (hue shift of the first color). Default: square. */ firstVariation = 'square') {
		switch (firstVariation) {
			case 'square': firstVariation = 90; break;
			case 'rectangular_right': firstVariation = 60; break;
			case 'tight_rectangular_right': firstVariation = 30; break;
			case 'tight_rectangular_left': firstVariation = -30; break;
			case 'rectangular_left': firstVariation = -60; break;
		}
		const tetradicRight = new Color(this);
		tetradicRight.hue = this.hue + firstVariation;
		const tetradicComplement = new Color(this);
		tetradicComplement.hue = this.hue + 180;
		const tetradicRightComplement = new Color(this);
		tetradicRightComplement.hue = this.hue + firstVariation + 180;
		return [this, tetradicRight, tetradicComplement, tetradicRightComplement];
	}

	/** Returns an array of monochromatic colors based on this color hue. */
	getMonochromaticColors(/** number of elements to return */n = 7, /** If true forces the result to contain this exact color */matchLightness = false) {
		const table = monochromaticTable({
			h: this.hue,
			s: this.saturation,
			a: this._a
		}, n);

		if (matchLightness) {
			const step = 1 / (n + 1);
			let shift = this.lightness % step;
			if (shift > step / 2) shift -= step;
			return table.map(({ l, ...color }) => (new Color({ l: l + shift, ...color })));
		} else {
			return table.map((color) => (new Color(color)));
		}
	}

	/** Applies a random color. */
	randomize() {
		this.apply(randomColor());
	}
}

/** Returns a random color. */
Color.random = () => (new Color(randomColor()));

/** Returns an array of monochromatic colors based on a starting color hue. */
Color.monochromaticColors = (startingColor, n = 7) => (new Color(startingColor).getMonochromaticColors(n));

module.exports = Color;
