const yargs = require('yargs')

const CommandEffects = require('./wallet-view.effects')

const commandYargs = () => yargs
  .usage('$0 wallet view [options]')
  .example('... view', 'Returns the BitGo wallet with id that matches BITGO_WALLET_ID (in .env)')
  .positional('id', {
    description: 'Wallet id',
    type: 'string',
    required: false,
  })
  .example('... view <WALLET ID>', 'Returns the wallet with the provided id if it exists')
  .option('verbose', {
    alias: 'v',
    description: 'verbose output',
    type: 'boolean',
    default: false,
  })
  .help()
  .alias('h', 'help')

module.exports = [
  'view',
  'view commands',
  commandYargs,
  ({ _, verbose }) => {
    const id = _[2] ? _[2] : process.env.BITGO_WALLET_ID
    CommandEffects
      .viewWalletsAndLog(id, verbose)
      .then(process.exit)
  },
]
