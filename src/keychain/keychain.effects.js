const R = require('ramda')

const LogEffects = require('../common/effects/log.effects')

// ----------------------------------------------
// log keychain
// ----------------------------------------------

/* eslint-disable no-console */
const logKeychain = (
  heading = 'Keychain',
  logBody = true,
  logHeading = true,
  i = '-',
) => (keychain) => {
  if (logHeading) {
    LogEffects.logHeading(heading)()
  }
  if (logBody) {
    console.log(` ${i}\tid:\t\t${R.propOr('N/A', 'id', keychain)}`)
    console.log(`\taddress:\t${R.propOr('N/A', 'ethAddress', keychain)}`)
    console.log(`\tprivate key:\t${R.propOr('N/A', 'prv', keychain)}`)
    console.log(`\tpublic key:\t${R.prop('pub', keychain)}`)
    console.log(`\tis bitgo:\t${R.propOr(false, 'isBitGo', keychain)}`)
  }
}
/* eslint-enable no-console */

module.exports.logKeychain = logKeychain

// ----------------------------------------------
// log keychains
// ----------------------------------------------

const logKeychains = (keychains) => {
  R.addIndex(R.forEach)((x, i) => {
    logKeychain(null, true, false, i)(x)
  }, keychains)
}

module.exports.logKeychains = logKeychains
