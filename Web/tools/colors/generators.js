function randomColor() {
	const r = Math.round(Math.random() * 255);
	const g = Math.round(Math.random() * 255);
	const b = Math.round(Math.random() * 255);
	return { r, g, b };
}

function monochromaticTable({ h, s, a = 1 }, n = 7) {
	const step = 1 / (n + 1);
	const colors = [];
	let _l = step;
	while (_l < 1) {
		colors.push({ h, s, l: _l, a });
		_l += step;
	}
	return colors;
}

module.exports = {
	randomColor,
	monochromaticTable
};
