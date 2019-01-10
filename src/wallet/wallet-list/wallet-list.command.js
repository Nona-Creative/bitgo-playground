const yargs = require('yargs')

const CommandEffects = require('./wallet-list.effects')

const commandYargs = () => yargs
  .usage('$0 wallet list [options]')
  .example('... list', 'List all keychains on BitGo')
  .option('limit', {
    alias: 'l',
    description: 'Limit results',
    type: 'int',
    default: 25,
    required: false,
  })
  .example('... list -l <AMOUNT>', 'Returns up to <AMOUNT> wallets')
  .option('verbose', {
    alias: 'v',
    description: 'verbose output',
    type: 'boolean',
    default: false,
  })
  .help()
  .alias('h', 'help')

module.exports = [
  'list',
  'list commands',
  commandYargs,
  ({ limit, verbose }) => {
    CommandEffects
      .listWalletsAndLog(limit, verbose)
      .then(process.exit)
  },
]
