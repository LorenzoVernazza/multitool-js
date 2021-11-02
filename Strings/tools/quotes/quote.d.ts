/** Applies the selected quote (default ') to a string. */
export function quote(
	/** String to quote */input: string,
	options?: {
		/** Quotation mark to use, default: ' */quotationMark: string,
		/** Only applies quotation if needed, default false */ifNeeded: boolean
	}
) : string;
