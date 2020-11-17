/** Checks if a string starts and ends with the same quotation mark */
export function hasQuotes(
	/** String to check */input, 
	options?: {
		/** Quotation mark to use, if not provided will use ' " and ` */quotationMark: string|string[],
	}
): boolean;
