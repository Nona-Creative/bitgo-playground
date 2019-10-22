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
    if (wallet.receiveAddress) {
      console.log(`\treceiveAddress.wallet:\t${wallet.receiveAddress.wallet}`)
    }
    console.log(`\tlabel:\t\t\t${wallet.label}`)
    console.log(`\tcoin:\t\t\t${wallet.coin}`)

    console.log('\taddresses')
    if (wallet.receiveAddress) {
      console.log(`\t - receiveAddress.address:\t${wallet.receiveAddress.address}`)
    }
    console.log(`\t - coinSpecific.base:\t\t${wallet.coinSpecific.baseAddress}`)
    console.log(`\t - coinSpecific.fee:\t\t${wallet.coinSpecific.feeAddress}`)
    if (wallet.receiveAddress) {
      console.log(`\t - receiveAddress.id:\t\t${wallet.receiveAddress.id}`)
    }

    console.log(`\ttransferCount:\t\t${wallet.transferCount}`)
    console.log(`\tpendingApprovals:\t${R.ifElse(R.isEmpty, R.always('none'), R.join(', '))(wallet.pendingApprovals)}`)
    console.log(`\tbalance:\t\t${wallet.balanceString}`)
    console.log(`\tconfirmedBalance:\t${wallet.confirmedBalanceString}`)
    console.log(`\tspendableBalance:\t${wallet.spendableBalanceString}`)

    // ... token balances
    const tokenBalances = R.pipe(
      R.prop('tokens'),
      R.toPairs,
      R.map(([x, y]) => [x, R.prop('balanceString')(y)]),
      R.filter(R.compose(R.gt(R.__, 0), x => parseInt(x, 10), R.last)),
    )(wallet)
    // console.log(Object.keys(wallet.tokens).sort())

    // ... add wallet main coin to token balances
    const balances = [
      [wallet.coin, wallet.balanceString],
      ...tokenBalances,
    ]

    // ... display token balances
    R.forEach(
      R.tap(() => console.log('\ttoken balances:')),
      R.map(R.tap(([x, y]) => {
        console.log(`\t\t - ${x}\t\t${y}`)
      })),
    )(balances)

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
// log transaction receipt
// ----------------------------------------------

/* eslint-disable no-console */
const _logTransactionReceipt = (
  heading = 'Transaction Receipt',
  logBody = true,
  logHeading = true,
  verbose = false,
) => (txReceipt) => {
  if (logHeading) {
    LogEffects.logHeading(heading)()
  }
  if (logBody) {
    console.log(` id:\t\t${txReceipt.transfer.id}`)
    console.log(` txid:\t\t${txReceipt.transfer.txid}`)
    console.log(` status:\t${txReceipt.status}`)
    console.log(` coin:\t\t${txReceipt.transfer.coin}`)
    console.log(` wallet:\t${txReceipt.transfer.wallet}`)
    console.log(` valueString:\t${txReceipt.transfer.valueString}`)
    console.log(` feeString:\t${txReceipt.transfer.feeString}`)
    console.log(` usd:\t\t${txReceipt.transfer.usd}`)
    console.log(` usdRate:\t${txReceipt.transfer.usdRate}`)
    if (verbose) {
      console.log(` enterprise:\t${txReceipt.transfer.enterprise}`)
      console.log(` type:\t\t${txReceipt.transfer.type}`)
      console.log(` baseValueString:${txReceipt.transfer.baseValueString}`)
      console.log(` payGoFeeString:\t${txReceipt.transfer.payGoFeeString}`)
      console.log(` state:\t\t${txReceipt.transfer.state}`)
      console.log(` instant:\t${txReceipt.transfer.instant}`)
    }
  }
}

module.exports.logTransactionReceipt = _logTransactionReceipt

// ----------------------------------------------
// log retrieving transaction
// ----------------------------------------------

/* eslint-disable no-console */
const _logRetrievingTransaction = (
  heading = 'Retrieving Transaction ...',
  logHeading = true,
) => () => {
  if (logHeading) {
    LogEffects.logHeading(heading)()
  }
}

module.exports.logRetrievingTransaction = _logRetrievingTransaction

// ----------------------------------------------
// log transaction
// ----------------------------------------------

/* eslint-disable no-console */
const _logTransaction = (
  heading = 'Transaction',
  logBody = true,
  logHeading = true,
) => (tx) => {
  if (logHeading) {
    LogEffects.logHeading(heading)()
  }
  if (logBody) {
    console.log(` id:\t\t\t${tx.id}`)
    console.log(` date:\t\t\t${tx.date}`)
    console.log(` blockHash:\t\t${tx.blockHash}`)
    console.log(` blockHeight:\t\t${tx.blockHeight}`)
    console.log(` blockPosition:\t\t${tx.blockPosition}`)
    console.log(` confirmations:\t\t${tx.confirmations}`)
    console.log(` feeString:\t\t${tx.feeString}`)

    // ... display entries
    console.log(' entries:')
    R.addIndex(R.forEach)((x, i) => {
      console.log(`\t\t\t${i + 1}. address:\t${x.address}`)
      console.log(`\t\t\t   wallet:\t${x.wallet}`)
      console.log(`\t\t\t   coinName:\t${x.coinName}`)
      console.log(`\t\t\t   valueString:\t${x.valueString}`)
    }, tx.entries)
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
