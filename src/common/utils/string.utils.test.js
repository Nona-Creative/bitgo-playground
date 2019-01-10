const { assert } = require('chai')

const SUT = require('./string.utils')

describe('string utils', () => {
  describe('padLeftAndRight', () => {
    it('should pad string as expected', () => {
      assert.equal(SUT.padLeftAndRight('FOUR', 10, 'x'), 'xxxFOURxxx')
    })

    it('should pad with spaces by default', () => {
      assert.equal(SUT.padLeftAndRight('FOUR', 10), '   FOUR   ')
    })
  })
})
