const yargs = require('yargs')

const { command: walletCreateCommand } = require('./wallet-create')
const { command: walletListCommand } = require('./wallet-list')
const { command: walletTransactionCommand } = require('./wallet-transaction')
const { command: walletViewCommand } = require('./wallet-view')

const commandYargs = () => yargs
  .usage('wallet')
  .command(...walletCreateCommand)
  .command(...walletListCommand)
  .command(...walletTransactionCommand)
  .command(...walletViewCommand)
  .help()
  .alias('h', 'help')

module.exports = [
  'wallet',
  'wallet commands',
  commandYargs,
]
