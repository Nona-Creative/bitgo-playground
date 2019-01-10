const yargs = require('yargs')

const { command: keychainCreateCommand } = require('./keychain-create')
const { command: keychainListCommand } = require('./keychain-list')

const commandYargs = () => yargs
  .usage('keychain')
  .command(...keychainCreateCommand)
  .command(...keychainListCommand)
  .help()
  .alias('h', 'help')

module.exports = [
  'keychain',
  'keychain commands',
  commandYargs,
]
