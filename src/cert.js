const rs = require("jsrsasign");
const sslCertificate = require("get-ssl-certificate");

function isOrganization(hostname) {
  return sslCertificate.get(hostname).then(cert => {
    x509 = new rs.X509();
    x509.readCertPEM(cert.pemEncoded);
    return x509.getExtCertificatePolicies().some(policy => {
      return policy.id === "2.23.140.1.2.2" || policy.id === "2.23.140.1.1";
    });
  });
}

module.exports = { isOrganization };
