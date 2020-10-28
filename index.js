const promises = require('./tools/promises');
const objects = require('./tools/objects');

module.exports = {
	promises,
	objects,
	all: {
		...promises,
		...objects
	}
};
