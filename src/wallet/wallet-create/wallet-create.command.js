const yargs = require('yargs')
const R = require('ramda')

const CommandEffects = require('./wallet-create.effects')
const KeychainCommandEffects = require('../../keychain/keychain-create/keychain-create.effects')

const commandYargs = () => yargs
  .usage('$0 wallet create [options]')
  .option('label', {
    alias: 'l',
    description: 'wallet label (name)',
    type: 'string',
    default: 'Custom Wallet',
    required: false,
  })
  .example("... create -l '<WALLET NAME>'", 'Creates a wallet with the provided label (name)')
  .option('mnemonic', {
    alias: 'm',
    description: 'mnemonic to regenerate seed',
    type: 'string',
    default: null,
    required: false,
  })
  .example("... create -m '<VALID MNEMONIC>'", 'Recreates a wallet with a predictable keychain created from the provided mnemonic')
  .option('backupMnemonic', {
    description: 'mnemonic to regenerate backup seed',
    type: 'string',
    default: null,
    required: false,
  })
  .example("... create --backup-mnuemonic '<VALID MNEMONIC>'", 'Recreates a wallet with a predictable backup keychain created from the provided backup mnemonic')
  .option('verbose', {
    alias: 'v',
    description: 'verbose output',
    type: 'boolean',
    default: false,
  })
  .help()
  .alias('h', 'help')

module.exports = [
  'create',
  'create commands',
  commandYargs,
  ({ label, mnemonic, backupMnemonic, verbose }) => {
    KeychainCommandEffects.createAllWalletKeychainsAndLog(mnemonic, backupMnemonic, verbose)
      .then(R.pluck('id'))
      .then(ids => CommandEffects.createWalletAndLog(label, ids, verbose))
      .then(process.exit)
  },
]
