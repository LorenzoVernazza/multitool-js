/**
 * Makes a deep clone of an object.
 */
const deepClone = (/** Object to clone. */obj) => {
    const clone = {};
    if (!obj || typeof obj !== 'object') return obj;
    console.log(Object.getPrototypeOf(obj));

    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object') {
            clone[key] = deepClone(value);

            // Object.assign(Object.create(), orig)

        } else {
            clone[key] = value;
        }
    }
    return clone;
};

module.exports = deepClone;
