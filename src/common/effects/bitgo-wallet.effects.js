const R = require('ramda')

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

const _getWallet = (id, bitgo) => bitgo
  .coin('teth')
  .wallets()
  .get({ id })

module.exports.getWallet = R.curry(_getWallet)

// ----------------------------------------------
// transact from a BitGo wallet
// https://www.bitgo.com/api/v2/#list-wallets
// ----------------------------------------------

const _transact = (walletId, prv, address, amount, bitgo) => (
  bitgo
    .coin('teth')
    .wallets()
    .get({ id: walletId })
    .then(wallet => (
      wallet.prebuildTransaction({
        recipients: [{ amount: amount.toString(), address }],
      })
        .then(txPrebuild => wallet.signTransaction({ txPrebuild, prv }))
        .then(tx => wallet.submitTransaction(tx))
    ))
)

module.exports.transact = R.curry(_transact)
