
const assert = require('assert');
const sinon = require("sinon");
const hostname = require("../../src/lib/hostname");
const sslCertificate = require("get-ssl-certificate");
const fs = require("fs").promises;
const dns = require("dns").promises;

describe('hostname', () => {
  describe('isOrganization', () => {
    it('should return false if DV certificate', async () => {
      let dvCert = await fs.readFile("test/data/dv-cert.pem")
      sinon.stub(sslCertificate, "get").resolves({
        pemEncoded: dvCert.toString()
      });
      assert.equal(await hostname.isOrganization("domain-with-dv-cert.com"), false);
      sslCertificate.get.restore();
    });

    it('should return true if OV certificate', async () => {
      let dvCert = await fs.readFile("test/data/ov-cert.pem")
      sinon.stub(sslCertificate, "get").resolves({
        pemEncoded: dvCert.toString()
      });
      assert.equal(await hostname.isOrganization("domain-with-ov-cert.com"), true);
      sslCertificate.get.restore();
    });

    it('should return true if EV certificate', async () => {
      let dvCert = await fs.readFile("test/data/ev-cert.pem")
      sinon.stub(sslCertificate, "get").resolves({
        pemEncoded: dvCert.toString()
      });
      assert.equal(await hostname.isOrganization("domain-with-ev-cert.com"), true);
      sslCertificate.get.restore();
    });
  });

  describe('getLndPubkey', () => {
    it('should return pubkey if TXT record exists', async () => {
      sinon
        .stub(dns, "resolve")
        .resolves([
          [
            "lnd-pubkey=027d2456f6d4aaf27873b68b7717c8137aaa8043d687a2113b916a5016e9a880e9"
          ]
        ]);
      let pubkey = await hostname.getLndPubkey("publisher.landgenoot.com");
      assert.equal(
        pubkey,
        "027d2456f6d4aaf27873b68b7717c8137aaa8043d687a2113b916a5016e9a880e9"
      );
      dns.resolve.restore();
    });

    it('should throw error if TXT record does not exist', async () => {
      sinon
        .stub(dns, "resolve")
        .resolves([["docusign=1b0a6754-49b1-4db5-8540-d2c12664b289"]]);
      assert.rejects(() => hostname.getLndPubkey("example.com"), Error, "Error thrown");
      dns.resolve.restore();
    });
  })
});
