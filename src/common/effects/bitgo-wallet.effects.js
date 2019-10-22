const R = require('ramda')
const Bluebird = require('bluebird')

// ----------------------------------------------
// create BitGo wallet using provided keys
// https://www.bitgo.com/api/v2/#add-wallet-advanced
// ----------------------------------------------

const _createWallet = (label, keys, bitgo) => bitgo
  .coin('teth')
  .wallets()
  .add({
    label,
    keys,
    m: 2,
    n: 3,
    enterprise: process.env.BITGO_ENTERPRISE,
  })

module.exports.createWallet = R.curry(_createWallet)

// ----------------------------------------------
// list BitGo wallets
// https://www.bitgo.com/api/v2/#list-wallets
// ----------------------------------------------

const _listWallets = (limit, bitgo) => bitgo
  .coin('teth')
  .wallets()
  .list({})

module.exports.listWallets = R.curry(_listWallets)

// ----------------------------------------------
// get BitGo wallet
// https://www.bitgo.com/api/v2/#get-wallet
// ----------------------------------------------

const _getWallet = (id, currency, bitgo) => bitgo
  .coin(currency)
  .wallets()
  .get({ id, allTokens: true })

const getWallet = R.curry(_getWallet)
module.exports.getWallet = getWallet

// ----------------------------------------------
// prebuild transaction
// ----------------------------------------------

const _prebuildTransaction = (address, amount, wallet) => Bluebird
  .resolve()
  .then(() => wallet.prebuildTransaction({
    recipients: [{ address, amount: amount.toString() }],
  }))

const prebuildTransaction = R.curry(_prebuildTransaction)
module.exports.prebuildTransaction = prebuildTransaction

// ----------------------------------------------
// sign transaction
// ----------------------------------------------

const _signTransaction = (prv, txPrebuild, wallet) => Bluebird
  .resolve()
  .then(() => wallet.signTransaction({ txPrebuild, prv }))

const signTransaction = R.curry(_signTransaction)
module.exports.signTransaction = signTransaction

// ----------------------------------------------
// submit transaction
// ----------------------------------------------

const _submitTransaction = (wallet, tx) => Bluebird
  .resolve(tx)
  .then(R.ifElse(R.has('halfSigned'), R.identity, R.objOf('halfSigned')))
  .then(R.assocPath(['halfSigned', 'comment'], 'TX COMMENT'))
  .then(R.assocPath(['halfSigned', 'gasPrice'], '1000000000'))
  .then(x => wallet.submitTransaction(x))

const submitTransaction = R.curry(_submitTransaction)
module.exports.submitTransaction = submitTransaction

// ----------------------------------------------
// submit transaction
// ----------------------------------------------

const _getTransaction = (wallet, txHash) => () => Bluebird
  .resolve(wallet.getTransaction({ txHash }))
  .catch((e) => {
    console.error(e.message)
    return Bluebird.reject(null)
  })

const getTransaction = R.curry(_getTransaction)
module.exports.getTransaction = getTransaction

// ----------------------------------------------
// transact from a BitGo wallet
// https://www.bitgo.com/api/v2/#list-wallets
// ----------------------------------------------

const _transact = (wallet, prv, currency, address, amount) => Bluebird
  .resolve(prebuildTransaction(address, amount, wallet)
    .then(tx => signTransaction(prv, tx, wallet))
    .then(tx => Bluebird.resolve(submitTransaction(wallet, tx))))

const transact = R.curry(_transact)
module.exports.transact = transact
