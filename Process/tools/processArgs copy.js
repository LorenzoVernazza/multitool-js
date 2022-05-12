const SHORT_FLAG_REGEX = /^-([a-zA-Z])$/;
const SHORT_MULTI_FLAG_REGEX = /^-([a-zA-Z]+)$/;
const SHORT_FLAG_VALUE_REGEX = /^-([a-zA-Z])=(.*)$/;
const FLAG_REGEX = /^--([a-zA-Z][a-zA-Z_-]*)$/;
const FLAG_VALUE_REGEX = /^--([a-zA-Z][a-zA-Z_-]*)=(.*)$/;

function createTranslator(translations = {}) {
	return (prop) => (translations[prop] || prop);
}

function createParamConsumer(params, input) {
	return (name) => {
		if (params[name]) {
			if (params[name] == 1) return input.shift();
			return input.splice(0, params.name);
		}
		return true;
	};
}

function cretateBreakerChecker(breaker) {
	if (!breaker) return (arg) => false;
	if (Array.isArray(breaker)) return (arg) => breaker.includes(arg);
	return (arg) => (breaker == arg);
}

function processArgs(args = process.argv.slice(2), {
	translations = {},
	params = {},
	breaker = '--',
	shortFlagRegex = SHORT_FLAG_REGEX,
	shortMultiFlagRegex = SHORT_MULTI_FLAG_REGEX,
	shortFlagWithValueRegex = SHORT_FLAG_VALUE_REGEX,
	flagRegex = FLAG_REGEX,
	flagWithValueRegex = FLAG_VALUE_REGEX
} = {}) {
	const input = [...args];
	const translate = createTranslator(translations);
	const consumeParams = createParamConsumer(params, input);
	const isBreaker = cretateBreakerChecker(breaker);

	const commands = [];
	const flags = {};

	while (input.length > 0) {
		const arg = input.shift();
		// breaker
		if (isBreaker(arg)) break;

		let match;
		// multi short flags
		match = arg.match(shortMultiFlagRegex);
		if (match) {
			for (const sh of [...match[1]]) {
				flags[translate(sh)] = true;
			}
			continue;
		}

		// flags
		match = arg.match(shortFlagRegex) || arg.match(flagRegex);
		if (match) {
			const name = translate(match[1]);
			if (!flags[name]) flags[name] = [];
			flags[name].push(consumeParams(name));
			continue;
		}

		// flags with value
		match = arg.match(shortFlagWithValueRegex) || arg.match(flagWithValueRegex);
		if (match) {
			const name = translate(match[1]);
			if (!flags[name]) flags[name] = [];
			flags[name].push(match[2]);
			continue;
		}

		// default
		commands.push(arg);
	}

	return {
		args,
		commands,
		flags,
		rest: input
	};
}

processArgs.processArgs = processArgs;
module.exports = processArgs;
