// ----------------------------------------------
// pad string on left and right
// ----------------------------------------------

const padLeftAndRight = (str, size, char = ' ') => {
  const spaces = size - str.length
  const padLeft = spaces / 2 + str.length
  return str.padStart(padLeft, char).padEnd(size, char)
}

module.exports.padLeftAndRight = padLeftAndRight
