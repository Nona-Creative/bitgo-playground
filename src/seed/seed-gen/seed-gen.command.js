const yargs = require('yargs')

const CommandEffects = require('./seed-gen.effects')

const commandYargs = () => yargs
  .usage('$0 seed gen')
  .help()
  .alias('h', 'help')

module.exports = [
  'gen',
  'gen commands',
  commandYargs,
  CommandEffects.generateSeedAndLog,
]
