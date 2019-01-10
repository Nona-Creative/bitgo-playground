const BitGoSeedUtils = require('../../common/utils/bitgo-seed.utils')

/* eslint-disable no-console */
const generateSeedAndLog = () => {
  const { phrase, seed } = BitGoSeedUtils.generateSeed()
  console.log(`mnemonic: ${phrase}`)
  console.log(`seed: ${Buffer.byteLength(seed)} bytes`)
  console.log(seed)
}
/* eslint-enable no-console */

module.exports.generateSeedAndLog = generateSeedAndLog
