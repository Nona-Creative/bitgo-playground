const R = require('ramda')

const BitGoUtils = require('../../common/utils/bitgo.utils')
const BitGoWalletEffects = require('../../common/effects/bitgo-wallet.effects')
const WalletEffects = require('../wallet.effects')

const createWallet = (label, keys) => R.pipe(
  BitGoUtils.initBitGo,
  BitGoWalletEffects.createWallet(label, keys),
)(true)

// ----------------------------------------------
// create wallet & log
// ----------------------------------------------

const _createWalletAndLog = (label, keys, verbose) => (
  createWallet(label, keys)
    .tap((result) => {
      WalletEffects.logWallet('Wallet', true, true, verbose)(result.wallet._wallet)
    })
)

module.exports.createWalletAndLog = R.curry(_createWalletAndLog)
