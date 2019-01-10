const R = require('ramda')
const Bluebird = require('bluebird')

const BitGoUtils = require('../../common/utils/bitgo.utils')
const BitGoKeychainEffects = require('../../common/effects/bitgo-keychain.effects')
const SeedGenCommandEffects = require('../../seed/seed-gen/seed-gen.effects')
const KeychainEffects = require('../keychain.effects')

const createKeychain = seed => R.pipe(
  BitGoUtils.initBitGo,
  BitGoKeychainEffects.createKeychain(seed),
  Bluebird.resolve,
)(false)

const createBitGoKeychain = () => R.pipe(
  BitGoUtils.initBitGo,
  BitGoKeychainEffects.createBitGoKeychain,
  Bluebird.resolve,
)(true)

const createBackupKeychain = seed => R.pipe(
  BitGoUtils.initBitGo,
  BitGoKeychainEffects.createBackupKeychain(seed),
  Bluebird.resolve,
)(true)

const addKeychainToBitGo = pub => R.pipe(
  BitGoUtils.initBitGo,
  BitGoKeychainEffects.addKeychainToBitGo(pub),
  Bluebird.resolve,
)(true)

// ----------------------------------------------
// create keychain & log
// ----------------------------------------------

const createKeychainAndLog = (
  addToBitGo = false,
  seed = null,
  verbose = false,
  label = 'Keychain',
) => (
  createKeychain(seed)
    .tap(KeychainEffects.logKeychain(`CREATE ${label}`, !addToBitGo || verbose))
    .then(keychain => (
      addToBitGo
        ? addKeychainToBitGo(keychain.pub)
          .tap(KeychainEffects.logKeychain(`STORE ${label}`, verbose))
          .then(R.mergeDeepRight(keychain))
          .tap(KeychainEffects.logKeychain(`MERGED ${label} Data`))
        : Bluebird.resolve(keychain)
    ))
)

module.exports.createKeychainAndLog = createKeychainAndLog

// ----------------------------------------------
// create backup keychain & log
// ----------------------------------------------

const createBackupKeychainAndLog = (seed = null) => (
  createBackupKeychain(seed).tap(KeychainEffects.logKeychain('CREATE Backup Keychain'))
)

module.exports.createBackupKeychainAndLog = createBackupKeychainAndLog

// ----------------------------------------------
// create BitGo keychain & log
// ----------------------------------------------

const createBitGoKeychainAndLog = () => (
  createBitGoKeychain().tap(KeychainEffects.logKeychain('CREATE BitGo Keychain'))
)

module.exports.createBitGoKeychainAndLog = createBitGoKeychainAndLog

// ----------------------------------------------
// create all wallet keychains & log
// ----------------------------------------------

const createAllWalletKeychainsAndLog = (
  mnemonic = null,
  verbose = false,
) => (
  Bluebird.join(
    Bluebird
      .resolve(SeedGenCommandEffects.generateSeedAndLog(mnemonic))
      .get('seed')
      .then(seed => createKeychainAndLog(true, seed, verbose, 'User Keychain')),
    createBackupKeychainAndLog(),
    createBitGoKeychainAndLog(),
  )
)

module.exports.createAllWalletKeychainsAndLog = createAllWalletKeychainsAndLog
