const yargs = require('yargs')

const { command: seedCommand } = require('./seed')
const { command: keychainCommand } = require('./keychain')
const { command: walletCommand } = require('./wallet')
const CLIEffects = require('./index.effects')
const ObjectUtils = require('./common/utils/object.utils')

require('dotenv').config({ path: '.env' }) // eslint-disable-line import/no-extraneous-dependencies

const run = () => {
  const requiredEnvs = [
    'BITGO_ENV',
    'BITGO_ACCESS_TOKEN',
    'BITGO_ENTERPRISE',
    'BITGO_WALLET_ID',
    'BITGO_WALLET_PRV',
  ]
  const missing = ObjectUtils.missingKeys(requiredEnvs, process.env)

  if (missing.length > 0) {
    CLIEffects.logEnvError(missing)
    return null
  }

  return yargs
    .usage('Command line tool')
    .version('0.1.0')
    .command(...seedCommand)
    .command(...keychainCommand)
    .command(...walletCommand)
    .help()
    .alias('h', 'help')
    .argv
}

if (require.main === module) {
  run()
}

module.exports.cli = run
