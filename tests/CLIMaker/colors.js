const colors = require('../../CLIMaker/tools/Colors');

console.log(colors.green('aaa'));
console.log(colors.bgCyan('bbb'));
console.log(colors.codes.bgCyan, colors.codes.bgReset, colors.codes.fgGreen, 'aaa', colors.codes.fgReset, colors.codes.bgCyan, 'bbb', colors.codes.bgReset, 'ccc');
console.log(colors.bgCyan(colors.green('aaa') + 'bbb') + 'ccc');

console.log(colors.codes.dim, 'dim', colors.codes.reset);
console.log(colors.codes.hidden, 'hidden', colors.codes.reset);
// console.log(colors.codes.reverse, 'reverse', colors.codes.reset);
console.log(colors.codes.underscore, 'underscore', colors.codes.reset);

console.log(
	colors.codes.underscore,
	colors.codes.bgCyan, colors.codes.bgReset,
	colors.codes.fgGreen, 'aaa', colors.codes.fgReset,
	colors.codes.bgCyan, 'bbb', colors.codes.bgReset,
	'ccc',
	colors.codes.reset
);
