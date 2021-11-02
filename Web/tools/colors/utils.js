function to0255Range(n, precision = -1) {
	const value = Math.max(Math.min(n, 255), 0);
	if (precision >= 0) return Number(value.toFixed(precision));
	return value;
}

function to01Range(n, precision = -1) {
	const value = Math.max(Math.min(n, 1), 0);
	if (precision >= 0) return Number(value.toFixed(precision));
	return value;
}

function toHex(value) {
	return Math.round(value).toString(16).padStart(2, '0');
}

function calculateLuma(r = 0, g = 0, b = 0) {
	return (r * 299 + g * 587 + b * 114) / 1000;
}

module.exports = {
	to0255Range,
	to01Range,
	toHex,
	calculateLuma
};
