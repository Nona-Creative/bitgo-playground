const BitGoSeedUtils = require('../../common/utils/bitgo-seed.utils')

const generateSeedAndLog = () => {
  const { phrase, seed } = BitGoSeedUtils.generateSeed()
  console.log(`mnemonic: ${phrase}`)
  console.log(`seed: ${Buffer.byteLength(seed)} bytes`)
  console.log(seed)
}

module.exports.generateSeedAndLog = generateSeedAndLog
