const chai = require('chai')
const { spawnSync } = require('child_process')
const chaiAsPromised = require('chai-as-promised')
const SUT = require('../index')

chai.use(chaiAsPromised)

const { assert } = chai

describe('help command', () => {
  it('should log some help output', async () => {
    require.main = SUT

    // when ... we call the help command
    const result = await spawnSync('node', ['src/index.js', '--help'])

    // then ... should log some help output
    assert.isTrue(result.stdout.toString().length > 0)
  })
})
