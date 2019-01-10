const yargs = require('yargs')

const { command: seedGenCommand } = require('./seed-gen')
const { command: seedRegenCommand } = require('./seed-regen')

const commandYargs = () => yargs
  .usage('seed')
  .command(...seedGenCommand)
  .command(...seedRegenCommand)
  .help()
  .alias('h', 'help')

module.exports = [
  'seed',
  'seed commands',
  commandYargs,
]
