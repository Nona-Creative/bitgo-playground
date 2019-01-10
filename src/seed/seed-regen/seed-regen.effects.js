const BitGoSeedUtils = require('../../common/utils/bitgo-seed.utils')

const regenerateSeedAndLog = (phrase) => {
  const seed = BitGoSeedUtils.regenerateSeed(phrase)
  console.log(`mnemonic: ${phrase}`)
  console.log(`seed: ${Buffer.byteLength(seed)} bytes`)
  console.log(seed)
}

module.exports.regenerateSeedAndLog = regenerateSeedAndLog
