const Mnemonic = require('bitcore-mnemonic')
const R = require('ramda')

// ----------------------------------------------
// generate seed for use with BitGo keychain create
// or regenerate if provided with mnemonic
// https://www.bitgo.com/api/v2/?javascript#create-keychain
// ----------------------------------------------

const generateSeed = R.pipe(
  mnemonic => new Mnemonic(mnemonic),
  code => ({
    seed: code.toSeed(),
    mnemonic: code.toString('utf8'),
  })
)

module.exports.generateSeed = generateSeed
