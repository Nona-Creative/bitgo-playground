const Mnemonic = require('bitcore-mnemonic')
const R = require('ramda')

// ----------------------------------------------
// generate seed for use with BitGo keychain create
// https://www.bitgo.com/api/v2/?javascript#create-keychain
// ----------------------------------------------

const generateSeed = R.pipe(
  () => new Mnemonic(),
  code => ({
    seed: code.toSeed(),
    phrase: code.toString('utf8'),
  })
)

module.exports.generateSeed = generateSeed

// ----------------------------------------------
// regenerate seed for use with BitGo keychain create from phrase
// https://www.bitgo.com/api/v2/?javascript#create-keychain
// ----------------------------------------------

const regenerateSeed = R.pipe(
  phrase => new Mnemonic(phrase),
  code => code.toSeed(),
)

module.exports.regenerateSeed = regenerateSeed
