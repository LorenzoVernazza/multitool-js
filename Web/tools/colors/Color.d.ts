type ParsableColor = string|{ r: number, g: number, b: number, a?: number }|{ h: number, s: number, l: number, a?: number }|{ c: number, m: number, y: number, k: number, a?: number }
type TetradicShift = number|'square'|'rectangular_right'|'tight_rectangular_right'|'tight_rectangular_left'|'rectangular_left';

declare class Color {
	private _r: number;
	private _g: number;
	private _b: number;
	private _a: number;

	/** Returns a random color. */
	static random(): Color;

	/** Returns an array of monochromatic colors based on a starting color hue. */
	static monochromaticColors(startingColor: ParsableColor|Color, n?: number): Color;

	constructor(color?: ParsableColor|Color)

	/** Updates the color */
	apply(color?: ParsableColor|Color): Color;

	/** Color in an hex-formatted string (without alpha channel) */
	hex: string;

	/** Color in an hex-formatted string (with alpha channel) */
	hexa: string;

	/** Red channel (0 - 255) */
	red: number;

	/** Green channel (0 - 255) */
	green: number;

	/** Blue channel (0 - 255) */
	blue: number;

	/** Alpha value (0 - 1) */
	alpha: number;

	/** Color as a RGB object */
	rgb: { r: number, g: number, b: number, a: number };

	/** Color in an rgb-formatted string (without alpha channel) */
	rgbString: string;

	/** Color in an hex-formatted string (with alpha channel) */
	rgbaString: string;

	/** Hue value (0 - 360) */
	hue: number;

	/** Saturation value (0 - 1) */
	saturation: number;

	/** Lightness value (0 - 1) */
	lightness: number;

	/** Color as a HSL object */
	hsl: { h: number, s: number, l: number, a: number };

	/** Color in an hsl-formatted string (without alpha channel) */
	hslString: string;

	/** Color in an hsl-formatted string (with alpha channel) */
	hslaString: string;

	/** Cyan channel (0 - 1) */
	cyan: number;

	/** Magenta channel (0 - 1) */
	magenta: number;

	/** Yellow channel (0 - 1) */
	yellow: number;

	/** Black channel (0 - 1) */
	black: number;

	/** Color as a CMYK object */
	cmyk: { c: number, m: number, y: number, k: number, a: number };

	/** Returns the luma value (0 - 255) */
	get luma(): number;

	/** Returns if the color is bright, true for a luma value > threshold */
	isBright(/** Threshold value */threshold?: number): boolean;

	/** Returns if the color is dark, true for a luma value <= threshold */
	isDark(/** Threshold value */threshold?: number): boolean;

	/** Tints the color. Use *newInstance* to create a new color and keep the current one. */
	tint(/* Tint amount (0 - 100). Default: 10. */step?: number, /** If true returns a new Color instance instead of changing this one. Default: false. */newInstance?: boolean): Color;
	
	/** Shades the color. Use *newInstance* to create a new color and keep the current one. */
	shade(/* Shade amount (0 - 100). Default: 10. */step?: number, /** If true returns a new Color instance instead of changing this one. Default: false. */newInstance?: boolean): Color;
	
	/** Saturates the color. Use *newInstance* to create a new color and keep the current one. */
	saturate(/* Saturation amount (0 - 100). Default: 10. */step?: number, /** If true returns a new Color instance instead of changing this one. Default: false. */newInstance?: boolean): Color;
	
	/** Desaturates the color. Use *newInstance* to create a new color and keep the current one. */
	desaturate(/* Desaturation amount (0 - 100). Default: 10. */step?: number, /** If true returns a new Color instance instead of changing this one. Default: false. */newInstance?: boolean): Color;

	/** Returns complementary color. */
	getComplementary(): Color;

	/** Returns analogous colors. */
	getAnalogousColors(): Color[];

	/** Returns triadic colors. */
	getTriadicColors(): Color[];

	/** Returns tetradic colors. */
	getTetradicColors(/** Determines the shape and orientation of the tetradic (hue shift of the first color). Default: square. */ firstVariation?: TetradicShift): Color[];

	/** Returns an array of monochromatic colors based on this color hue. */
	getMonochromaticColors(/** Number of elements to return. Default: 7. */n?: number, /** If true forces the result to contain this exact color. Default: false. */matchLightness?: boolean): Color[];

	/** Applies a random color. */
	randomize(): void;
}

export { Color };