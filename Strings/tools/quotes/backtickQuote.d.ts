/** Applies single quotes to a string when needed: `example` */
export function backtickQuote(
	/** String to quote */input:string,
	options?: {
		/** Only applies quotation if needed, default true */ifNeeded: boolean
	}
) : string;
