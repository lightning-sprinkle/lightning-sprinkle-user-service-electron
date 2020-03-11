const rs = require("jsrsasign");
const sslCertificate = require("get-ssl-certificate");
const dnsPromises = require("dns").promises;

/**
 * Function looks up the SSL certificate for the domain, and checks if
 * it is an OV or EV certificate by reading the CertificatePolicies
 * @param {String} hostname
 * @return {Promise|Boolean}
 */
function isOrganization(hostname) {
  return sslCertificate.get(hostname).then(cert => {
    x509 = new rs.X509();
    x509.readCertPEM(cert.pemEncoded);
    return x509
      .getExtCertificatePolicies()
      .some(isOrganizationPolicy);
  });
}

/**
 * Check if CertificatePolicy belongs to the following policies
 * 2.23.140.1.2.2: Organization Validation
 * 2.23.140.1.1: Extended Validation
 * @param {Object} policy
 * @return {Boolean}
 */
function isOrganizationPolicy(policy) {
  return policy.id === "2.23.140.1.2.2" || policy.id === "2.23.140.1.1"
}

/**
 * Fetch the lnd-pubkey from the DNS TXT record
 * for the given hostname.
 * @param {String} hostname
 * @return {Promise|String} pubkey
 */
function getLndPubkey(hostname) {
  return new Promise((resolve, reject) => {
    dnsPromises
      .resolve(hostname, "TXT")
      .then(result => {
        let records = result.map(answer => answer[0])
        let pubkey = records.find(isValidPubkey);
        return pubkey
          ? resolve(pubkey.substr(11, 66))
          : reject(new Error("No lnd-pubkey found"));
      })
      .catch(reject);
  });
}

/**
 * Check if TXT record is a valid lnd-pubkey.
 * @param {String} record
 * @return {Boolean} valid
 */
function isValidPubkey(record) {
  return (
    record.substr(0, 11) === "lnd-pubkey=" &&
    /^[0-9a-f]{66}$/.test(record.substr(11, 66)) // Must be hex-string with size 66
  );
}

module.exports = { getLndPubkey, isOrganization };

