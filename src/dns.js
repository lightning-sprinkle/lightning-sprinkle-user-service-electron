const dns = require('dns');

/**
 * Fetch the lnd-pubkey from the DNS TXT record
 * for the given hostname
 * @param {String} hostname 
 */
function getLndPubkey(hostname) {
  return new Promise((resolve, reject) => {
    dns.resolve(hostname, 'TXT', (err, answers) => {
      if (err) return reject(err)
      answers.forEach(answer => {
        if (answer[0].substr(0, 11) === 'lnd-pubkey=') {
          resolve(answer[0].substr(11, 66))
        }
      })
      reject(new Error('No lnd-pubkey found'))
    });
  })
}

module.exports = { getLndPubkey }