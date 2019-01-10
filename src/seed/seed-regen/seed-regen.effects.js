const BitGoSeedUtils = require('../../common/utils/bitgo-seed.utils')

/* eslint-disable no-console */
const regenerateSeedAndLog = (phrase) => {
  const seed = BitGoSeedUtils.regenerateSeed(phrase)
  console.log(`mnemonic: ${phrase}`)
  console.log(`seed: ${Buffer.byteLength(seed)} bytes`)
  console.log(seed)
}
/* eslint-enable no-console */

module.exports.regenerateSeedAndLog = regenerateSeedAndLog
