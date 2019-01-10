const { assert } = require('chai')
const BitGo = require('bitgo')

const SUT = require('./bitgo.utils')

describe('BitGo utils', () => {
  describe('initBitGo', () => {
    it('should return BitGo instance', () => {
      assert.isTrue(SUT.initBitGo() instanceof BitGo.BitGo)
    })

    it('should return authed BitGo instance', () => {
      assert.isTrue(SUT.initBitGo(true) instanceof BitGo.BitGo)
    })
  })
})
