const R = require('ramda')

const BitGoUtils = require('../../common/utils/bitgo.utils')
const BitGoKeychainEffects = require('../../common/effects/bitgo-keychain.effects')
const KeychainEffects = require('../keychain.effects')

const listKeychains = limit => R.pipe(
  BitGoUtils.initBitGo,
  BitGoKeychainEffects.listKeychains(limit),
)(true)

// ----------------------------------------------
// list keychains & log
// ----------------------------------------------

const listKeychainsAndLog = limit => (
  listKeychains(limit)
    .get('keys')
    .tap(KeychainEffects.logKeychains)
)

module.exports.listKeychainsAndLog = listKeychainsAndLog
