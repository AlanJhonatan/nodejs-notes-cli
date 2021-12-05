const commands = require('./src/commands');
const yargs = require('yargs');

Object.values(commands).forEach(command => {
  yargs.command(command);
});

yargs.parse();
