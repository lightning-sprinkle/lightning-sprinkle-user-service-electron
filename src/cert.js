const rs = require("jsrsasign");
const sslCertificate = require("get-ssl-certificate");

/**
 * Function looks up the SSL certificate for the domain, and checks if
 * it is an OV or EV certificate by reading the following CertificatePolicies
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

module.exports = { isOrganization };
