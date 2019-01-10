const R = require('ramda')

// ----------------------------------------------
// find missing keys in object
// ----------------------------------------------

const missingKeys = expectedKeys => R.compose(
  R.map(R.head),
  R.filter(R.pipe(R.last, R.isNil)),
  R.toPairs,
  R.pickAll(expectedKeys),
)

module.exports.missingKeys = R.uncurryN(2, missingKeys)
