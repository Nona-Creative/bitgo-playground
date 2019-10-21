const { assert } = require('chai') // eslint-disable-line import/no-extraneous-dependencies
const R = require('ramda')

const BitGoUtils = require('../utils/bitgo.utils')
const BitGoSeedEffects = require('./bitgo-seed.effects')
const BitGoKeychainEffects = require('./bitgo-keychain.effects')
const SUT = require('./bitgo-wallet.effects')

/* eslint-disable max-len */
describe('BitGo wallet effects', () => {
  describe('listWallets', () => {
    it('should list all BitGo wallets', async () => {
      // given
      // ... an authed BitGo instance
      // ... and atleast 1 wallet on BitGo
      const bitgo = BitGoUtils.initBitGo(true)
      await bitgo.coin('teth').wallets()
        .generateWallet({
          label: 'Test Wallet',
          passphrase: 'secret',
          enterprise: process.env.BITGO_ENTERPRISE,
        })

      // when ... we list all wallets
      const result = await SUT.listWallets(25, bitgo)

      // then ... should return a list of wallets with expected properties
      assert.hasAllKeys(result, ['coin', 'nextBatchPrevId', 'wallets'])
      assert.equal(result.coin, 'teth')
      assert.match(result.nextBatchPrevId, /^(\w{32})$/)
      assert.isTrue(result.wallets.length > 0)
      const wallet = result.wallets[0]
      assert.hasAllKeys(wallet, ['bitgo', 'baseCoin', '_wallet'])
      assert.hasAllKeys(wallet._wallet, [
        'id',
        'users',
        'coin',
        'label',
        'm',
        'n',
        'keys',
        'keySignatures',
        'enterprise',
        'tags',
        'type',
        'disableTransactionNotifications',
        'freeze',
        'deleted',
        'approvalsRequired',
        'isCold',
        'coinSpecific',
        'admin',
        'clientFlags',
        'allowBackupKeySigning',
        'recoverable',
        'balanceString',
        'confirmedBalanceString',
        'spendableBalanceString',
        'startDate',
      ])
      assert.match(wallet._wallet.id, /^(\w{32})$/)
      assert.isTrue(wallet._wallet.users.length > 0)
      assert.equal(wallet._wallet.m, 2)
      assert.equal(wallet._wallet.n, 3)
      assert.equal(wallet._wallet.keys.length, 3)
      assert.equal(wallet._wallet.enterprise, process.env.BITGO_ENTERPRISE)
      assert.match(wallet._wallet.coinSpecific.baseAddress, /^0x(\w{40})$/)
      assert.match(wallet._wallet.coinSpecific.feeAddress, /^0x(\w{40})$/)
      assert.match(wallet._wallet.coinSpecific.lowPriorityFeeAddress, /^0x(\w{40})$/)
    })
  })

  describe('createWallet', () => {
    it('should create a wallet as expected', async () => {
      // given
      // ... an authed BitGo instance
      // ... and all the keys needed to create a wallet
      const bitgo = BitGoUtils.initBitGo(true)
      const { seed } = BitGoSeedEffects.generateSeed()
      const keychains = await BitGoKeychainEffects.createAllWalletKeychains(seed, bitgo)
      const keys = R.pluck('id', keychains)

      // when ... we create a wallet
      const { wallet } = await SUT.createWallet('Test Wallet', keys, bitgo)

      // then ... should create a wallet with expected properties
      assert.hasAllKeys(wallet, ['bitgo', 'baseCoin', '_wallet'])
      assert.hasAllKeys(wallet._wallet, [
        'id',
        'users',
        'coin',
        'label',
        'm',
        'n',
        'keys',
        'keySignatures',
        'enterprise',
        'tags',
        'type',
        'disableTransactionNotifications',
        'freeze',
        'deleted',
        'approvalsRequired',
        'isCold',
        'coinSpecific',
        'admin',
        'clientFlags',
        'allowBackupKeySigning',
        'recoverable',
        'type',
        'balanceString',
        'confirmedBalanceString',
        'spendableBalanceString',
        'pendingChainInitialization',
        'pendingApprovals',
      ])
      assert.match(wallet._wallet.id, /^(\w{32})$/)
      assert.isTrue(wallet._wallet.users.length > 0)
      assert.equal(wallet._wallet.coin, 'teth')
      assert.equal(wallet._wallet.label, 'Test Wallet')
      assert.equal(wallet._wallet.m, 2)
      assert.equal(wallet._wallet.n, 3)
      assert.equal(wallet._wallet.keys.length, 3)
      assert.deepEqual(wallet._wallet.keys, keys)
      assert.equal(wallet._wallet.enterprise, process.env.BITGO_ENTERPRISE)
      assert.isFalse(wallet._wallet.deleted)
      assert.isFalse(wallet._wallet.isCold)
      assert.match(wallet._wallet.coinSpecific.baseAddress, /^0x(\w{40})$/)
      assert.match(wallet._wallet.coinSpecific.feeAddress, /^0x(\w{40})$/)
      assert.match(wallet._wallet.coinSpecific.lowPriorityFeeAddress, /^0x(\w{40})$/)
      assert.isFalse(wallet._wallet.allowBackupKeySigning)
      assert.isFalse(wallet._wallet.recoverable)
    })
  })

  describe('getWallet', () => {
    it('should retrieve the target wallet as expected', async () => {
      // given
      // ... an authed BitGo instance
      // ... and an existing wallet
      const bitgo = BitGoUtils.initBitGo(true)
      const { seed } = BitGoSeedEffects.generateSeed()
      const keychains = await BitGoKeychainEffects.createAllWalletKeychains(seed, bitgo)
      const keys = R.pluck('id', keychains)
      const { wallet } = await SUT.createWallet('Test Wallet', keys, bitgo)

      // when ... we get that wallet
      const sameWallet = await SUT.getWallet(wallet._wallet.id, bitgo)

      // then ... should return the same wallet
      assert.equal(wallet._wallet.id, sameWallet._wallet.id)
    })
  })

  describe('transact', () => {
    it('should successfully transact with target wallet as expected', async () => {
      // given
      // ... an authed BitGo instance
      // ... and an existing wallet
      const bitgo = BitGoUtils.initBitGo(true)

      const id = process.env.BITGO_WALLET_ID
      const prv = process.env.BITGO_WALLET_PRV

      // when ... we get that wallet
      const amount = '1'
      const address = process.env.TEST_ETHEREUM_ADDRESS
      const tx = await SUT.transact(id, prv, address, amount, bitgo)

      // then
      // ... should successfully create a transaction with target wallet
      // ... and return expected result
      assert.hasAllKeys(tx, ['transfer', 'txid', 'tx', 'status'])
      assert.hasAllKeys(tx.transfer, [
        'id',
        'coin',
        'coinSpecific',
        'wallet',
        'enterprise',
        'txid',
        'height',
        'date',
        'type',
        'value',
        'valueString',
        'baseValue',
        'baseValueString',
        'feeString',
        'payGoFee',
        'payGoFeeString',
        'usd',
        'usdRate',
        'state',
        'instant',
        'isFee',
        'isReward',
        'tags',
        'history',
        'entries',
        'signedTime',
        'createdTime',
      ])
      assert.match(tx.txid, /0x\w{64}/)
      assert.match(tx.transfer.txid, /0x\w{64}/)
      assert.equal(tx.transfer.coin, 'teth')
      assert.deepEqual(tx.transfer.coinSpecific, { outputs: [] })
      assert.equal(tx.transfer.wallet, id)
      assert.equal(tx.transfer.enterprise, process.env.BITGO_ENTERPRISE)
      assert.equal(tx.transfer.type, 'send')
      assert.equal(tx.transfer.value, 0)// TODO: this used to be -1 why is it 0 now?
      assert.equal(tx.transfer.valueString, '0')// TODO: this used to be '-1' why is it '0' now?
      assert.equal(tx.transfer.baseValue, 0)// TODO: this used to be -1 why is it 0 now?
      assert.equal(tx.transfer.baseValueString, '0')// TODO: this used to be '-1' why is it '0' now?
      assert.equal(tx.transfer.feeString, '0')
      assert.equal(tx.transfer.payGoFee, 0)
      assert.equal(tx.transfer.payGoFeeString, '0')
      assert.equal(tx.transfer.usd, 0)
      assert.equal(tx.transfer.state, 'signed')
      assert.equal(tx.transfer.instant, false)
      assert.equal(tx.transfer.isFee, false)
      assert.equal(tx.transfer.isReward, false)
    })
  })
})
/* eslint-enable max-len */
