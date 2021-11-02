const BRIGHTNESS_THRESHOLD = 120;

const shorthandHexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;

const rgbaCommaRegex = /^ *rgba? *\( *(\d+(\.\d+)?) *, +(\d+(\.\d+)?) *, +(\d+(\.\d+)?)( *, +(\d+(\.\d+)?%?))? *\) *$/i;
const rgbaRegex = /^ *rgba? *\( *(\d+(\.\d+)?) +(\d+(\.\d+)?) +(\d+(\.\d+)?)( +\/ +(\d+(\.\d+)?%?))? *\) *$/i;

const hslaCommaRegex = /^ *hsla?\( *(\d+(\.\d+)?(deg)?) *, +(\d+(\.\d+)?%?) *, +(\d+(\.\d+)?%?)( *, +(\d+(\.\d+)?%?))? *\) *$/i;
const hslaRegex = /^ *hsla?\( *(\d+(\.\d+)?(deg)?) +(\d+(\.\d+)?%?) +(\d+(\.\d+)?%?)( +\/ +(\d+(\.\d+)?%?))? *\) *$/i;

module.exports = {
	BRIGHTNESS_THRESHOLD,
	shorthandHexRegex,
	hexRegex,
	rgbaCommaRegex,
	rgbaRegex,
	hslaCommaRegex,
	hslaRegex
};
