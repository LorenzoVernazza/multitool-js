class Uncased {
    constructor(chunked, original) {
        this._value = chunked;
        this.value = original || chunked.join('');
    }
    toString() {
        return this._value;
    }
    toCamelCase() {
        let result = this._value[0];
        for (const chunk of this._value.slice(1)) {
            result += `${chunk}`.charAt(0).toUpperCase() + `${chunk}`.slice(1);
        }
        return result;
    }
    toPascalCase() {
        let result = '';
        for (const chunk of this._value) {
            result += `${chunk}`.charAt(0).toUpperCase() + `${chunk}`.slice(1);
        }
        return result;
    }
    toKebabCase() {
        return this._value.join('-');
    }
    toUnderscoreCase() {
        return this._value.join('_');
    }
}