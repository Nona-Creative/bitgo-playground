const yargs = require('yargs')

const CommandEffects = require('./seed-gen.effects')

const commandYargs = () => yargs
  .usage('$0 seed gen [options]')
  .example('... gen', 'Generates a random mnemonic and seed')
  .option('mnemonic', {
    alias: 'm',
    description: 'mnemonic to regenerate seed',
    type: 'string',
  })
  .example("... gen -m '<VALID MNEMONIC>'", 'Regenerates the same mnemonic and seed')
  .help()
  .alias('h', 'help')

module.exports = [
  'gen',
  'gen commands',
  commandYargs,
  ({ mnemonic }) => {
    CommandEffects.generateSeedAndLog(mnemonic)
    process.exit()
  },
]
