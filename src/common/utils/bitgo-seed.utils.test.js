const { assert } = require('chai')
const BitGo = require('bitgo')

const SUT = require('./bitgo-seed.utils')

/* eslint-disable max-len */
describe('BitGo seed utils', () => {
  describe('generateSeed', () => {
    it('should generate a new seed comprising mnemonic phrase and byte array required by BitGo', () => {
      // given ... an unauthed BitGo instance
      const bitgo = new BitGo.BitGo()

      // when ... we generate a seed
      const { phrase, seed } = SUT.generateSeed()

      // then
      // ... should return a 12 word phrase
      assert.equal(phrase.split(' ').length, 12)
      // ... and should return a seed that works with BitGo keychain create
      const keychain = bitgo.coin('teth').keychains().create({ seed })
      assert.hasAllKeys(keychain, ['pub', 'prv'])
    })
  })

  describe('regenerateSeed', () => {
    it('should regenerate expected seed using provided mnemonic phrase', () => {
      // given
      // ... an unauthed BitGo instance
      const bitgo = new BitGo.BitGo()

      // ... and an existing keychain and it's mnemonic phrase
      const { phrase, seed } = SUT.generateSeed()
      const originalKeychain = bitgo.coin('teth').keychains().create({ seed })

      // when
      // ... we regenerate the seed from that mnemonic phrase
      // ... and recreate the BitGo keychain from the regenerated seed
      const regeneratedSeed = SUT.regenerateSeed(phrase)
      const recreatedKeychain = bitgo.coin('teth').keychains().create({ seed: regeneratedSeed })

      // then ... should regenerated / recreated seed and keychain should exactly match original ones
      assert.equal(originalKeychain.pub, recreatedKeychain.pub)
      assert.equal(originalKeychain.prv, recreatedKeychain.prv)
    })
  })
})
/* eslint-enable max-len */
