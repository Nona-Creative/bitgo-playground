const { assert } = require('chai')

const SUT = require('./object.utils')

describe('object utils', () => {
  describe('missingKeys', () => {
    it('should return a list of missing keys', () => {
      const obj = { a: 'A', b: 'B', d: 'D' }
      const expectedKeys = ['a', 'b', 'c', 'd']
      const expectedMissing = ['c']
      assert.deepEqual(SUT.missingKeys(expectedKeys, obj), expectedMissing)
    })
  })
})
