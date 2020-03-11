fs = require('fs').promises

/**
 * Read macaroon from filesystem and return as hex-bytestring
 * @param {String} path
 * @return {String}
 */
function readMacaroon(path) {
  return fs.readFile(path).then(content => content.toString('hex'))
}

/**
 * Create a new request with the keysend feature.
 * https://github.com/lightningnetwork/lnd/pull/3795?ref=tokendaily
 * @param {String} dest 
 * @param {Number} amt 
 */
function keysendRequest(dest, amt) {

}

/**
 * Actually send the payment to the lightning network
 * @param {Object} sendRequest 
 */
function sendPayment(sendRequest) {

}

module.exports = { readMacaroon, keysendRequest, sendPayment }