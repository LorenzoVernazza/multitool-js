const { CLI } = require('@multitool-js/climaker');

// CLI.register('test');

CLI.execute(process.argv.slice(2));
