/** Removes quotes from a quoted string. */
export declare function unquote(
	/** String to clean */input: string,
	options?: {
		/** Quotation mark to remove, if not provided will use ' " and ` */quotationMark: string|string[],
	}
): string

