const R = require('ramda')

const BitGoUtils = require('../../common/utils/bitgo.utils')
const BitGoWalletEffects = require('../../common/effects/bitgo-wallet.effects')
const WalletEffects = require('../wallet.effects')

const listWallets = limit => R.pipe(
  BitGoUtils.initBitGo,
  BitGoWalletEffects.listWallets(limit),
)(true)

// ----------------------------------------------
// list wallets & log
// ----------------------------------------------

const _listWalletsAndLog = (limit, verbose) => (
  listWallets(limit)
    .get('wallets')
    .tap(WalletEffects.logWallets(verbose))
)

module.exports.listWalletsAndLog = R.curry(_listWalletsAndLog)
