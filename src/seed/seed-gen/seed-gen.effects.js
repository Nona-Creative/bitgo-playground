const BitGoSeedEffects = require('../../common/effects/bitgo-seed.effects')
const LogEffects = require('../../common/effects/log.effects')

/* eslint-disable no-console */
const generateSeedAndLog = (_mnemonic) => {
  LogEffects.logHeading('GENERATE Seed')()
  const { mnemonic, seed } = BitGoSeedEffects.generateSeed(_mnemonic)
  console.log(`mnemonic: ${mnemonic}`)
  console.log(`seed: ${Buffer.byteLength(seed)} bytes`)
  console.log(seed)
  return { mnemonic, seed }
}
/* eslint-enable no-console */

module.exports.generateSeedAndLog = generateSeedAndLog
