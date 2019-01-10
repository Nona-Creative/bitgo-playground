const chai = require('chai')
const { spawnSync } = require('child_process')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const { assert } = chai

describe('seed:regen command', () => {
  it('should log some output from result', async () => {
    // when ... we call the seed regen command
    const result = await spawnSync('node', ['src/index.js', 'seed', 'regen', '--phrase', 'spot drop away trial stand lake gaze mosquito dirt elevator media hover'])

    // then ... should log some output from result
    assert.isTrue(result.stdout.toString().length > 0)
  })
})
