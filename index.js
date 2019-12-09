const promises = require('./tools/promises');
const props = require('./tools/props');
module.exports = {
	promises,
	props,
	all: {
		...promises,
		...props
	}
};
