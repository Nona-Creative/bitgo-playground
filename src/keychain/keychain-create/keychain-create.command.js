const yargs = require('yargs')
const Bluebird = require('bluebird')

const CommandEffects = require('./keychain-create.effects')
const SeedGenCommandEffects = require('../../seed/seed-gen/seed-gen.effects')

const commandYargs = () => yargs
  .usage('$0 keychain create [options]')
  .example('... create', 'Creates a new random keychain')
  .option('mnemonic', {
    alias: 'm',
    description: 'mnemonic to regenerate seed',
    type: 'string',
    default: null,
    required: false,
  })
  .example("... create -m '<VALID MNEMONIC>'", 'Creates / recreates a predictable keychain from the provided mnemonic')
  .option('type', {
    alias: 't',
    description: 'type of keychain',
    type: 'string',
    default: 'user',
  })
  .example("... create -t 'user'", 'Create a new backup keychain (default)')
  .example("... create -t 'backup'", 'Create a new backup keychain')
  .example("... create -t 'bitgo'", 'Create a new BitGo keychain')
  .example("... create -t 'all'", 'Create all three types of BitGo keychains')
  .option('add', {
    description: 'Add new keychain to BitGo',
    type: 'boolean',
    default: false,
  })
  .example('... create --add', 'Adds the newly created keychain to BitGo storage')
  .option('verbose', {
    alias: 'v',
    description: 'verbose output',
    type: 'boolean',
    default: false,
  })
  .help()
  .alias('h', 'help')
  .argv

module.exports = [
  'create',
  'create commands',
  commandYargs,
  ({ mnemonic, type, add, verbose }) => {
    ({
      user: () => Bluebird
        .resolve(SeedGenCommandEffects.generateSeedAndLog(mnemonic))
        .get('seed')
        .then(seed => CommandEffects.createKeychainAndLog(add, seed, verbose)),
      backup: () => CommandEffects.createBackupKeychainAndLog(),
      bitgo: () => CommandEffects.createBitGoKeychainAndLog(),
      all: () => CommandEffects.createAllWalletKeychainsAndLog(mnemonic, verbose),
    }[type]())
      .then(process.exit)
  },
]
