const StringUtils = require('../utils/string.utils')

/* eslint-disable no-console */
const logHeading = text => () => {
  console.log(StringUtils.padLeftAndRight(` ${text} `, 50, '-'))
}
/* eslint-enable no-console */

module.exports.logHeading = logHeading
