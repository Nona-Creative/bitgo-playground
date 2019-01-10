const yargs = require('yargs')

const { command: seedGenCommand } = require('./seed-gen')

const commandYargs = () => yargs
  .usage('seed')
  .command(...seedGenCommand)
  .help()
  .alias('h', 'help')

module.exports = [
  'seed',
  'seed commands',
  commandYargs,
]
