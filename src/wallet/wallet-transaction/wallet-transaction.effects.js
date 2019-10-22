const retry = require('bluebird-retry')
const Bluebird = require('bluebird')

const BitGoUtils = require('../../common/utils/bitgo.utils')
const BitGoWalletEffects = require('../../common/effects/bitgo-wallet.effects')
const WalletEffects = require('../wallet.effects')

// ----------------------------------------------
// create wallet & log
// ----------------------------------------------

const _transactAndLog = (walletId, prv, toAddress, amount, currency, verbose) => {
  const bitgo = BitGoUtils.initBitGo(true)
  return Bluebird
    .resolve(BitGoWalletEffects.getWallet(walletId, currency, bitgo))
    .then(wallet => BitGoWalletEffects
      .transact(wallet, prv, currency, toAddress, amount)
      .tap(WalletEffects.logTransactionReceipt('Transaction Receipt', true, true, verbose))
      .tap(WalletEffects.logRetrievingTransaction('Retrieving Transaction ...', true))
      .then(txReceipt => retry(
        BitGoWalletEffects.getTransaction(wallet, txReceipt.txid),
        { max_tries: 10, interval: 1000 },
      ))
      .tap(WalletEffects.logTransaction('Transaction', true, true, verbose)))
}

module.exports.transactAndLog = _transactAndLog
