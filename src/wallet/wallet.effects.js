const R = require('ramda')

const LogEffects = require('../common/effects/log.effects')

// ----------------------------------------------
// log wallet
// ----------------------------------------------

/* eslint-disable no-console */
const _logWallet = (
  heading = 'Wallet',
  logBody = true,
  logHeading = true,
  verbose = false,
  i = '-',
) => (wallet) => {
  if (logHeading) {
    LogEffects.logHeading(heading)()
  }
  if (logBody) {
    console.log(` ${i}\tid:\t\t\t${wallet.id}`)
    console.log(`\tlabel:\t\t\t${wallet.label}`)
    console.log(`\tcoin:\t\t\t${wallet.coin}`)
    console.log(`\tbase address:\t\t${wallet.coinSpecific.baseAddress}`)
    console.log(`\tfee address:\t\t${wallet.coinSpecific.feeAddress}`)
    console.log(`\tbalance:\t\t${wallet.balanceString}`)
    console.log(`\tconfirmedBalance:\t${wallet.confirmedBalanceString}`)
    console.log(`\tspendableBalance:\t${wallet.spendableBalanceString}`)
    if (verbose) {
      console.log(`\tm:\t\t\t${wallet.m}`)
      console.log(`\tn:\t\t\t${wallet.n}`)
      console.log(`\tenterprise:\t\t${wallet.enterprise}`)
      console.log(`\ttype:\t\t\t${wallet.type}`)
      console.log(`\trecoverable:\t\t${wallet.recoverable}`)
      console.log('\tkeys (ids):')
      R.addIndex(R.forEach)((x, j) => {
        console.log(`\t\t\t\t${j + 1}. ${x}`)
      }, wallet.keys)
      console.log('\tusers:')
      R.addIndex(R.forEach)((x, j) => {
        console.log(`\t\t\t\t${j + 1}. ${x.user} (permissions: ${x.permissions.join(', ')})`)
      }, wallet.users)
    }
  }
}
/* eslint-enable no-console */

module.exports.logWallet = _logWallet

// ----------------------------------------------
// log transaction
// ----------------------------------------------

/* eslint-disable no-console */
const _logTransaction = (
  heading = 'Transaction',
  logBody = true,
  logHeading = true,
  verbose = false,
  i = '-',
) => (tx) => {
  if (logHeading) {
    LogEffects.logHeading(heading)()
  }
  if (logBody) {
    console.log(` ${i}\ttxid:\t\t${tx.transfer.txid}`)
    console.log(`\tcoin:\t\t${tx.transfer.coin}`)
    console.log(`\twallet:\t\t${tx.transfer.wallet}`)
    console.log(`\tvalueString:\t${tx.transfer.valueString}`)
    console.log(`\tfeeString:\t${tx.transfer.feeString}`)
    console.log(`\tusd:\t\t${tx.transfer.usd}`)
    if (verbose) {
      console.log(`\tenterprise:\t${tx.transfer.enterprise}`)
      console.log(`\ttype:\t\t${tx.transfer.type}`)
      console.log(`\tbaseValueString:${tx.transfer.baseValueString}`)
      console.log(`\tpayGoFeeString:\t${tx.transfer.payGoFeeString}`)
      console.log(`\tstate:\t\t${tx.transfer.state}`)
      console.log(`\tinstant:\t${tx.transfer.instant}`)
    }
  }
}
/* eslint-enable no-console */

module.exports.logTransaction = _logTransaction

// ----------------------------------------------
// log wallets
// ----------------------------------------------

const _logWallets = (verbose, wallets) => {
  R.addIndex(R.forEach)((x, i) => {
    _logWallet(null, true, false, verbose, i)(x._wallet)
  }, wallets)
}

module.exports.logWallets = R.curry(_logWallets)
