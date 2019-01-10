const chai = require('chai')
const { spawnSync } = require('child_process')
const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const { assert } = chai

describe('seed:gen command', () => {
  it('should log some output from result', async () => {
    // when ... we call the seed:gen command
    const result = await spawnSync('node', ['src/index.js', 'seed', 'gen'])

    // then ... should log some output from result
    assert.isTrue(result.stdout.toString().length > 0 )
  })
})
