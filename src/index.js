const yargs = require('yargs')

const { command: seedCommand } = require('./seed')

const run = () => yargs
  .usage('Command line tool')
  .version('0.1.0')
  .command(...seedCommand)
  .help()
  .alias('h', 'help')
  .argv

if (require.main === module) {
  run()
}
