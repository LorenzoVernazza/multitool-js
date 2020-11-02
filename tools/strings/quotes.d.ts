/** Checks if a string starts and ends with the same quotation mark */
declare function hasQuotes(
	/** String to check */input, 
	options?: {
		/** Quotation mark to use, if not provided will use ' " and ` */quotationMark: string|string[],
	}
): boolean;

/** Applies the selected quote (default ') to a string. */
function quote(
	/** String to quote */input: string,
	options?: {
		/** Quotation mark to use, default: ' */quotationMark: string,
		/** Only applies quotation if needed, default false */ifNeeded: boolean
	}
) : string;

/** Removes quotes from a quoted string. */
function unquote(
	/** String to clean */input: string,
	options?: {
		/** Quotation mark to remove, if not provided will use ' " and ` */quotationMark: string|string[],
	}
): string

/** Applies single quotes to a string when needed: 'example' */
function singleQuote(
	/** String to quote */input:string,
	options?: {
		/** Only applies quotation if needed, default true */ifNeeded: boolean
	}
) : string;

/** Applies single quotes to a string when needed: "example" */
function doubleQuote(
	/** String to quote */input:string,
	options?: {
		/** Only applies quotation if needed, default true */ifNeeded: boolean
	}
) : string;

/** Applies single quotes to a string when needed: `example` */
function backtickQuote(
	/** String to quote */input:string,
	options?: {
		/** Only applies quotation if needed, default true */ifNeeded: boolean
	}
) : string;

export = {
	hasQuotes,
	quote,
	unquote,
	singleQuote,
	doubleQuote,
	backtickQuote
};
