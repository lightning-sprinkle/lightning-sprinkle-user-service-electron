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
    dnsPromises
      .resolve(hostname, "TXT")
      .then(answers => {
        for (let answer of answers) {
          if (isValidPubkey(answer[0])) {
            return resolve(answer[0].substr(11, 66));
          }
        }
        reject(new Error("No lnd-pubkey found"));
      })
      .catch(reject);
  });
}

/**
 * Check if TXT record is a valid lnd-pubkey
 * @param {String} record 
 * @return {Boolean} valid
 */
function isValidPubkey(record) {
  return (
    record.substr(0, 11) === "lnd-pubkey=" &&
    /^[0-9a-f]+$/.test(record.substr(11, 66))
  );
}

module.exports = { getLndPubkey };
