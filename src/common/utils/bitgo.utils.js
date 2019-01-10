const BitGo = require('bitgo')

// ----------------------------------------------
// return a BitGo instance
// ----------------------------------------------

const initBitGo = (auth = false) => (
  new BitGo.BitGo({
    env: process.env.BITGO_ENV,
    accessToken: auth ? process.env.BITGO_ACCESS_TOKEN : null,
  })
)

module.exports.initBitGo = initBitGo
