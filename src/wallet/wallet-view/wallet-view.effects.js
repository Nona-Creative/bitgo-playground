const R = require('ramda')

const BitGoUtils = require('../../common/utils/bitgo.utils')
const BitGoWalletEffects = require('../../common/effects/bitgo-wallet.effects')
const WalletEffects = require('../wallet.effects')

const viewWallet = walletId => R.pipe(
  BitGoUtils.initBitGo,
  BitGoWalletEffects.getWallet(walletId),
)(true)

// ----------------------------------------------
// list wallets & log
// ----------------------------------------------

const _viewWalletsAndLog = (walletId, verbose) => (
  viewWallet(walletId)
    .tap(R.pipe(
      R.prop('_wallet'),
      WalletEffects.logWallet('Wallet', true, true, verbose),
    ))
)

module.exports.viewWalletsAndLog = R.curry(_viewWalletsAndLog)
