const yargs = require('yargs')

const CommandEffects = require('./seed-regen.effects')

const commandYargs = () => yargs
  .usage('$0 seed regen [option]')
  .option('phrase', {
    alias: 'p',
    description: 'mnemonic phrase to regenerate seed',
    type: 'string'
  })
  .help()
  .alias('h', 'help')

module.exports = [
  'regen',
  'regen commands',
  commandYargs,
  ({ phrase }) => CommandEffects.regenerateSeedAndLog(phrase)
]
