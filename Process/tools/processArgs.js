const SHORT_FLAG_REGEX = /^-([a-z0-9])$/i;
const SHORT_MULTI_FLAG_REGEX = /^-([a-z0-9]+)$/i;
const SHORT_FLAG_VALUE_REGEX = /^-([a-z0-9])=(.*)$/i;
const FLAG_REGEX = /^--([a-z0-9][a-z0-9_-]*)$/i;
const FLAG_VALUE_REGEX = /^--([a-z0-9][a-z0-9_-]*)=(.*)$/i;

function createTranslator(translations = {}) {
	return (prop) => (translations[prop] || prop);
}

function createParamConsumer(params, input) {
	return (name) => {
		// if false ignore
		// if true return
		if (params[name]) {
			if (!isNaN(params[name])) return input.shift();
			console.log();
			return input.splice(0, params.name);
		}
		return true;
	};
}

function cretateBreakerChecker(breaker) {
	if (!breaker) return (arg) => false;
	if (Array.isArray(breaker)) return (arg) => breaker.includes(arg);
	return (arg) => (breaker === arg);
}

function processArgs(args = process.argv.slice(2), {
	translations = {},
	params = {},
	skipUnknownParams = false,
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
		// console.log('Handling', arg);
		// breaker
		if (isBreaker(arg)) break;

		let match;
		// flags
		match = arg.match(shortFlagRegex) || arg.match(flagRegex);
		if (match) {
			// console.log('IS SINGLE!');
			const name = translate(match[1]);
			if (!params.name && (skipUnknownParams || params.name === false)) {
				if (!flags[name]) flags[name] = [];
				// console.log('flags:', { args, input, match: match[1], name, flag: flags[name], consume: consumeParams(name) });
				flags[name].push(consumeParams(name));
			}
			continue;
		}

		// flags with value
		match = arg.match(shortFlagWithValueRegex) || arg.match(flagWithValueRegex);
		if (match) {
			// console.log('IS VALUE!');
			const name = translate(match[1]);
			if (!params.name && (skipUnknownParams || params.name === false)) {
				// console.log('flags with value:', { args, input, match: match[1], name, flag: flags[name] });
				if (!flags[name]) flags[name] = [];
				flags[name].push(match[2]);
			}
			continue;
		}

		// multi short flags
		match = arg.match(shortMultiFlagRegex);
		if (match) {
			// console.log('IS MULTI!');
			for (const sh of [...match[1]]) {
				if (!params.name && (skipUnknownParams || params.name === false)) {
					flags[translate(sh)] = true;
				}
			}
			continue;
		}

		// default
		// console.log('IS COMMAND!');
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
