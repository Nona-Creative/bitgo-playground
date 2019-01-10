const { assert } = require('chai')
const sinon = require('sinon')

const SUT = require('./seed-regen.effects')

describe('seed:regen effects', () => {
  let sandbox = null

  beforeEach(() => {
    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('regenerateSeedAndLog', () => {
    it('should regenerate seed and log', () => {
      const logStub = sandbox.stub(console, 'log')

      // when ... we  regenerate seed and log
      SUT.regenerateSeedAndLog('spot drop away trial stand lake gaze mosquito dirt elevator media hover')

      // then ... should log it as expected
      assert.match(logStub.args[0][0], /^mnemonic\: /)
      assert.equal(logStub.args[0][0].split(' ').length, 13)
      assert.match(logStub.args[1][0], /^seed\: 64 bytes/)
      assert.isTrue(Buffer.isBuffer(logStub.args[2][0]))
    })
  })
})
