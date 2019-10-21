const { assert } = require('chai') // eslint-disable-line import/no-extraneous-dependencies
const R = require('ramda')

const BitGoUtils = require('../utils/bitgo.utils')
const BitGoSeedEffects = require('./bitgo-seed.effects')
const SUT = require('./bitgo-keychain.effects')

/* eslint-disable max-len */
describe('BitGo keychain effects', () => {
  describe('createKeychain', () => {
    it('should create a new keychain including a private and public key, but not id', () => {
      // given
      // ... an unauthed BitGo instance
      // ... and a generated seed
      const bitgo = BitGoUtils.initBitGo(false)
      const { seed } = BitGoSeedEffects.generateSeed()

      // when ... we create a keychain
      const result = SUT.createKeychain(seed, bitgo)

      // then
      // ... should return a user keychain with private and public keys
      assert.hasAllKeys(result, ['pub', 'prv'])
      assert.match(result.pub, /^xpub(\w{107})$/)
      assert.match(result.prv, /^xprv(\w{107})$/)
    })

    it('should recreate the same keychain when using the same seed', () => {
      // given ... an existing seed and keychain
      const bitgo = BitGoUtils.initBitGo(false)
      const { seed } = BitGoSeedEffects.generateSeed()
      const originalKeychain = SUT.createKeychain(seed, bitgo)

      // when ... we recreate the same keychain
      const newKeychain = SUT.createKeychain(seed, bitgo)

      // then ... should return the same values
      assert.deepEqual(originalKeychain, newKeychain)
    })
  })

  describe('createBackupKeychain', () => {
    it('should create a new backup keychain including BitGo id, private and public key', async () => {
      // given ... an authed BitGo instance
      const bitgo = BitGoUtils.initBitGo(true)

      // when ... we create a backup keychain
      const result = await SUT.createBackupKeychain(null, bitgo)

      // then
      // ... should return a backup keychain with private and public keys
      assert.hasAllKeys(result, ['id', 'pub', 'prv', 'ethAddress', 'source'])
      assert.match(result.pub, /^xpub(\w{107})$/)
      assert.match(result.prv, /^xprv(\w{107})$/)
      assert.match(result.id, /^(\w{32})$/)
      assert.match(result.ethAddress, /^0x(\w{40})$/)
      assert.equal(result.source, 'backup')
    })

    it.skip('should recreate the same backup keychain when using the same seed', async () => {
      // TODO: createBackup does not take a seed, is there a way to recreate the same backup key?
    })
  })

  describe('createBitGoKeychain', () => {
    it('should create a new BitGo keychain including BitGo id, and public key, but not private key', async () => {
      // given ... an authed BitGo instance
      const bitgo = BitGoUtils.initBitGo(true)

      // when ... we create a BitGo keychain
      const result = await SUT.createBitGoKeychain(bitgo)

      // then
      // ... should return a BitGo keychain with id, private and public keys etc
      assert.hasAllKeys(result, ['id', 'pub', 'ethAddress', 'isBitGo'])
      assert.match(result.pub, /^xpub(\w{107})$/)
      assert.match(result.id, /^(\w{32})$/)
      assert.match(result.ethAddress, /^0x(\w{40})$/)
      assert.isTrue(result.isBitGo)
    })

    it('should recreate the same BitGo keychain when using the same seed', async () => {
      // given ... an existing BitGo keychain
      const bitgo = BitGoUtils.initBitGo(true)
      const originalKeychain = await SUT.createBitGoKeychain(bitgo)

      // when ... we recreate the same BitGo keychain
      const newKeychain = await SUT.createBitGoKeychain(bitgo)

      // then ... should return the same values
      const keys = ['id', 'pub', 'ethAddress', 'isBitGo']
      assert.deepEqual(R.pick(keys, originalKeychain), R.pick(keys, newKeychain))
    })
  })

  describe('createAllWalletKeychains', () => {
    it('should create a new BitGo keychain including BitGo id, and public key, but not private key', async () => {
      // given
      // ... an authed BitGo instance
      // ... and a generated seed
      const bitgo = BitGoUtils.initBitGo(true)
      const { seed } = BitGoSeedEffects.generateSeed()

      // when
      // ... we create all the keychains needed to create a wallet
      const [
        userKeychain,
        backupKeychain,
        bitGoKeychain,
      ] = await SUT.createAllWalletKeychains(seed, bitgo)

      // then
      // ... should return an added (uploaded) user keychain with id, private and public keys etc
      assert.hasAllKeys(userKeychain, ['id', 'pub', 'prv', 'ethAddress'])
      assert.match(userKeychain.pub, /^xpub(\w{107})$/)
      assert.match(userKeychain.prv, /^xprv(\w{107})$/)
      assert.match(backupKeychain.id, /^(\w{32})$/)
      assert.match(backupKeychain.ethAddress, /^0x(\w{40})$/)

      // ... should return a backup keychain with private and public keys
      assert.hasAllKeys(backupKeychain, ['id', 'pub', 'prv', 'ethAddress', 'source'])
      assert.match(backupKeychain.pub, /^xpub(\w{107})$/)
      assert.match(backupKeychain.prv, /^xprv(\w{107})$/)
      assert.match(backupKeychain.id, /^(\w{32})$/)
      assert.match(backupKeychain.ethAddress, /^0x(\w{40})$/)
      assert.equal(backupKeychain.source, 'backup')

      // ... should return a BitGo keychain with id, private and public keys etc
      assert.hasAllKeys(bitGoKeychain, ['id', 'pub', 'ethAddress', 'isBitGo'])
      assert.match(bitGoKeychain.pub, /^xpub(\w{107})$/)
      assert.match(bitGoKeychain.id, /^(\w{32})$/)
      assert.match(bitGoKeychain.ethAddress, /^0x(\w{40})$/)
      assert.isTrue(bitGoKeychain.isBitGo)
    })

    it('should recreate the same user keychain when using the same seed', async () => {
      // given ... an existing seed and keychain that has been added to BitGo
      const bitgo = BitGoUtils.initBitGo(true)
      const { seed } = BitGoSeedEffects.generateSeed()
      const originalKeychain = SUT.createKeychain(seed, bitgo)
      const originalAddedKeychain = await SUT.addKeychainToBitGo(originalKeychain.pub, bitgo)
      const originalMergedKeychain = R.mergeDeepRight(originalKeychain, originalAddedKeychain)

      // when
      // ... we recreate the same keychain
      // ... as part of creation of all the keychains required for a wallet
      const [newKeychain] = await SUT.createAllWalletKeychains(seed, bitgo)

      // then ... should return the same values
      assert.deepEqual(originalMergedKeychain, newKeychain)
    })
  })

  describe('listKeychains', () => {
    it('should list all keychains stored on BitGo', async () => {
      // given
      // ... an authed BitGo instance
      // ... and at least 1 keychain on BitGo
      const bitgo = BitGoUtils.initBitGo(true)
      await SUT.createBitGoKeychain(bitgo)

      // when ... we list all BitGo keychains
      const result = await SUT.listKeychains(123, bitgo)

      // then ... should return a list of keychains with expected properties
      assert.hasAllKeys(result, ['nextBatchPrevId', 'keys', 'limit'])
      assert.equal(result.limit, 123)
      assert.isTrue(result.keys.length > 0)
      assert.hasAllKeys(result.keys[0], ['id', 'pub', 'ethAddress'])
      assert.match(result.keys[0].pub, /^xpub(\w{107})$/)
      assert.match(result.keys[0].id, /^(\w{32})$/)
      assert.match(result.keys[0].ethAddress, /^0x(\w{40})$/)
    })
  })

  describe('getKeychain', () => {
    it('should retrieve target keychains from bitgo', async () => {
      // given
      // ... an authed BitGo instance
      // ... and a keychain on BitGo
      const bitgo = BitGoUtils.initBitGo(true)
      const { id } = await SUT.createBitGoKeychain(bitgo)

      // when ... we get the keychain by id
      const result = await SUT.getKeychain(id, bitgo)

      // then ... should return the expected keychain
      assert.equal(result.id, id)
    })
  })

  describe('addKeychainToBitGo', () => {
    it('should add user keychain to bitgo', async () => {
      // given
      // ... an authed BitGo instance
      // ... and a keychain not on BitGo
      const bitgo = BitGoUtils.initBitGo(true)
      const keychain = await SUT.createKeychain(null, bitgo)

      // when ... we add the keychain to BitGo
      const createResult = await SUT.addKeychainToBitGo(keychain.pub, bitgo)

      // then ... should then be available to get on BitGo
      const getResult = await SUT.getKeychain(createResult.id, bitgo)
      assert.equal(createResult.id, getResult.id)
      assert.equal(keychain.pub, getResult.pub)
    })
  })
})
/* eslint-enable max-len */
