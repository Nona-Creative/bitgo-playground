const { assert } = require('chai')
const BitGo = require('bitgo')

const SUT = require('./bitgo-seed.effects')

/* eslint-disable max-len */
describe('BitGo seed effects', () => {
  describe('generateSeed', () => {
    it('should generate a new seed comprising mnemonic and byte array required by BitGo', () => {
      // given ... an unauthed BitGo instance
      const bitgo = new BitGo.BitGo()

      // when ... we generate a seed
      const { mnemonic, seed } = SUT.generateSeed()

      // then
      // ... should return a 12 word mnemonic
      assert.equal(mnemonic.split(' ').length, 12)
      // ... and should return a seed that works with BitGo keychain create
      const keychain = bitgo.coin('teth').keychains().create({ seed })
      assert.hasAllKeys(keychain, ['pub', 'prv'])
    })

    it('should regenerate expected seed using provided mnemonic', () => {
      // given
      // ... an unauthed BitGo instance
      const bitgo = new BitGo.BitGo()

      // ... and an existing keychain and it's mnemonic
      const { mnemonic, seed } = SUT.generateSeed()
      const originalKeychain = bitgo.coin('teth').keychains().create({ seed })

      // when
      // ... we regenerate the seed from that mnemonic
      // ... and recreate the BitGo keychain from the regenerated seed
      const { seed: regeneratedSeed } = SUT.generateSeed(mnemonic)
      const recreatedKeychain = bitgo.coin('teth').keychains().create({ seed: regeneratedSeed })

      // then ... should regenerated / recreated seed and keychain should exactly match original ones
      assert.deepEqual(originalKeychain, recreatedKeychain)
    })
  })
})
/* eslint-enable max-len */
