const yargs = require('yargs')

const CommandEffects = require('./keychain-list.effects')

const commandYargs = () => yargs
  .usage('$0 keychain list [options]')
  .example('... list', 'List all keychains on BitGo')
  .option('limit', {
    alias: 'l',
    description: 'Limit results',
    type: 'int',
    default: 100,
    required: false,
  })
  .example('... list -l <AMOUNT>', 'Returns up to <AMOUNT> keychains')
  .help()
  .alias('h', 'help')
  .argv

module.exports = [
  'list',
  'list commands',
  commandYargs,
  ({ limit }) => {
    CommandEffects
      .listKeychainsAndLog(limit)
      .then(process.exit)
  },
]
