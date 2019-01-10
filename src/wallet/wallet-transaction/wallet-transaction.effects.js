const R = require('ramda')

const BitGoUtils = require('../../common/utils/bitgo.utils')
const BitGoWalletEffects = require('../../common/effects/bitgo-wallet.effects')
const WalletEffects = require('../wallet.effects')

const transact = (walletId, prv, toAddress, amount) => R.pipe(
  BitGoUtils.initBitGo,
  BitGoWalletEffects.transact(walletId, prv, toAddress, amount),
)(true)

// ----------------------------------------------
// create wallet & log
// ----------------------------------------------

const _transactAndLog = (walletId, prv, toAddress, amount, verbose) => (
  transact(walletId, prv, toAddress, amount)
    .tap(WalletEffects.logTransaction('Transaction', true, true, verbose))
)

module.exports.transactAndLog = _transactAndLog
