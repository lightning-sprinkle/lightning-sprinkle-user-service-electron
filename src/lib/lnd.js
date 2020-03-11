fs = require('fs').promises

/**
 * Read macaroon from filesystem and return as hex-bytestring
 * @param {String} path
 * @return {String}
 */
function getMacaroon(path) {
  return fs.readFile(path).then(content => content.toString('hex'))
}

module.exports = { getMacaroon }