const R = require('ramda')
const Bluebird = require('bluebird')

// ----------------------------------------------
// create keychain for use with BitGo's add wallet
// https://www.bitgo.com/api/v2/?javascript#create-keychain
// https://www.bitgo.com/api/v2/?javascript#add-wallet-advanced
// ----------------------------------------------

const _createKeychain = (seed, bitgo) => bitgo
  .coin('teth')
  .keychains()
  .create({ seed })

const createKeychain = R.curry(_createKeychain)
module.exports.createKeychain = createKeychain

// ----------------------------------------------
// create backup keychain for use with BitGo's add wallet
// https://www.bitgo.com/api/v2/?javascript#create-keychain
// https://www.bitgo.com/api/v2/?javascript#add-wallet-advanced
// ----------------------------------------------

const _createBackupKeychain = (seed, bitgo) => bitgo
  .coin('teth')
  .keychains()
  .createBackup()

const createBackupKeychain = R.curry(_createBackupKeychain)
module.exports.createBackupKeychain = createBackupKeychain

// ----------------------------------------------
// create BitGo keychain for use with BitGo's add wallet
// https://www.bitgo.com/api/v2/?javascript#create-keychain
// https://www.bitgo.com/api/v2/?javascript#add-wallet-advanced
// ----------------------------------------------

const createBitGoKeychain = bitgo => bitgo
  .coin('teth')
  .keychains()
  .createBitGo({
    source: 'bitgo',
    enterprise: process.env.BITGO_ENTERPRISE,
    // eslint-disable-next-line max-len
    // newFeeAddress: false, // Create a new keychain instead of fetching enterprise key (only for Ethereum)
  })

module.exports.createBitGoKeychain = createBitGoKeychain

// ----------------------------------------------
// list all keychains stored on BitGo
// ----------------------------------------------

const _listKeychains = (limit, bitgo) => bitgo
  .coin('teth')
  .keychains()
  .list({ limit })

module.exports.listKeychains = R.curry(_listKeychains)

// ----------------------------------------------
// get keychain from BitGo
// ----------------------------------------------

const _getKeychain = (id, bitgo) => bitgo
  .coin('teth')
  .keychains()
  .get({ id })

module.exports.getKeychain = R.curry(_getKeychain)

// ----------------------------------------------
// store keychain on BitGo
// ----------------------------------------------

const _addKeychainToBitGo = (pub, bitgo) => bitgo
  .coin('teth')
  .keychains()
  .add({ pub })

const addKeychainToBitGo = R.curry(_addKeychainToBitGo)
module.exports.addKeychainToBitGo = addKeychainToBitGo

// ----------------------------------------------
// create all keychains required to create a
// wallet using BitGo's add wallet
// https://www.bitgo.com/api/v2/?javascript#add-wallet-advanced
// ----------------------------------------------

const _createAllWalletKeychains = (seed, bitgo) => Bluebird
  .join(
    Bluebird.resolve(createKeychain(seed, bitgo))
      .then(keychain => (
        addKeychainToBitGo(keychain.pub, bitgo)
          .then(R.mergeDeepRight(keychain))
      )),
    createBackupKeychain(null, bitgo),
    createBitGoKeychain(bitgo),
  )

module.exports.createAllWalletKeychains = R.curry(_createAllWalletKeychains)
