function quote(input = '', {
	quotationMark = '\'',
	ifNeeded = false
} = {}) {
	if (ifNeeded === 'all') {

	} else if (ifNeeded) {
		
	} else {
		return `${quotationMark}${input}${quotationMark}`
	}
}

function singleQuote(input) {

}

quote.singleQuote = 

module.exports = quote;
