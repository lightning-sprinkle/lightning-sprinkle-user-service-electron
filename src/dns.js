const dns = require("dns");
const dnsPromises = dns.promises;

/**
 * Fetch the lnd-pubkey from the DNS TXT record
 * for the given hostname
 * @param {String} hostname
 * @return {Promise|String} pubkey
 */
function getLndPubkey(hostname) {
  return new Promise((resolve, reject) => {
    dnsPromises.resolve(hostname, "TXT").then(answers => {
      for (let answer of answers) {
        if (answer[0].substr(0, 11) === "lnd-pubkey=") {
          return resolve(answer[0].substr(11, 66));
        }
      };
      reject(new Error("No lnd-pubkey found"));
    }).catch(reject)
  });
}

module.exports = { getLndPubkey };
