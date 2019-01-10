const R = require('ramda')

// ----------------------------------------------
// log env error
// ----------------------------------------------

/* eslint-disable no-console */
const logEnvError = (missingKeys) => {
  console.log('ERROR: CLI is not correctly configured.')
  console.log('please populate the following environment variables:')
  R.map(x => console.log(` - ${x}`), missingKeys)
}
/* eslint-enable no-console */

module.exports.logEnvError = logEnvError
