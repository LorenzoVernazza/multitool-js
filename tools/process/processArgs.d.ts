
/** Parses arguments and returns an object. */
function processArgs(
	/** Array of arguments, defaults as *process.argv.slice(2)*. */
	args:? string[],
	/** Configuration object. */
	config:? {
		/**
		 * Map of flag replacements.
		 * 
		 * Example:
		 * 
		 * translations: { "h": "help" },
		 * input: ['-h']
		 * 
		 * output.flags: { "help": true }
		 */
		translations: { [flag: string]: string; },
		/**
		 * Defines flags with params.
		 * 
		 * Example:
		 * 
		 * params: { "with-params": "help" },
		 * input: ['-h']
		 * 
		 * output.flags: { "help": true }
		 */
		params: { [flag: string]: number; },
		/** Breaker, the breaker defines when to stop parsing arguments, defaults as -- */
		breaker: string|string[],
		/** Shorthand flag regex override (-a) */
		shortFlagRegex:? RegExp,
		/** Multi-shorthand flag regex override (-abc) */
		shortMultiFlagRegex:? RegExp,
		/** Shorthand flag with value regex override (-a=value) */
		shortFlagWithValueRegex:? RegExp,
		/** Flag regex override (--flag) */
		flagRegex:? RegExp,
		/** Flag with value regex override (--flag=value) */
		flagWithValueRegex:? RegExp
	}
) : {
	/** Starting array of arguments. */
	args: string[],
	/** Array of parsed commands. */
	commands: string[],
	/** Key-value map of parsed flags. */
	flags: { [flag: string]: string|string[]|true },
	/** Array of arguments after the breaker (--). */
	rest: string[]
};

export = processArgs;
