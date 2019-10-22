const yargs = require('yargs')
// const R = require('ramda')

const CommandEffects = require('./wallet-transaction.effects')
// const KeychainCommandEffects = require('../../keychain/keychain-create/keychain-create.effects')

const commandYargs = () => yargs
  .usage('$0 wallet tx [options]')
  .positional('toAddress', {
    description: 'Address to transfer Wei to',
    type: 'string',
    required: true,
  })
  .positional('amount', {
    description: 'Amount to transfer in Wei',
    type: 'string',
    required: true,
  })
  .example('... transact <ADDRESS> <AMOUNT>', 'Sends provided amount to provided address from wallet with id that matches BITGO_WALLET_ID (in .env)')
  .option('verbose', {
    alias: 'v',
    description: 'verbose output',
    type: 'boolean',
    default: false,
  })
  .help()
  .alias('h', 'help')

module.exports = [
  'tx',
  'tx commands',
  commandYargs,
  ({ _, verbose }) => {
    const [toAddress, amount] = _.slice(2)
    const id = process.env.BITGO_WALLET_ID
    const prv = process.env.BITGO_WALLET_PRV
    CommandEffects
      .transactAndLog(id, prv, toAddress, amount, verbose)
      .then(process.exit)
  },
]
