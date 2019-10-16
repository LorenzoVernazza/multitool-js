const promises = require('./lib/promises');
const props = require('./lib/props');
module.exports = {
	promises,
	props,
	all: {
		...promises,
		...props
	}
};