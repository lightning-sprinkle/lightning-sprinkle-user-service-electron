const test = require("ava");
const sinon = require("sinon");
const hostname = require("../../src/lib/hostname");
const dns = require("dns").promises;
const sslCertificate = require("get-ssl-certificate");
const fs = require("fs").promises;

test.serial("isOrganization valid DV cert", async t => {
  let dvCert = await fs.readFile("test/data/dv-cert.pem")
  sinon.stub(sslCertificate, "get").resolves({
    pemEncoded: dvCert.toString()
  });
  t.is(await hostname.isOrganization("domain-with-dv-cert.com"), false);
  sslCertificate.get.restore();
});

test.serial("isOrganization valid OV cert", async t => {
  let dvCert = await fs.readFile("test/data/ov-cert.pem")
  sinon.stub(sslCertificate, "get").resolves({
    pemEncoded: dvCert.toString()
  });
  t.is(await hostname.isOrganization("domain-with-ov-cert.com"), true);
  sslCertificate.get.restore();
});

test.serial("isOrganization valid EV cert", async t => {
  let dvCert = await fs.readFile("test/data/ev-cert.pem")
  sinon.stub(sslCertificate, "get").resolves({
    pemEncoded: dvCert.toString()
  });
  t.is(await hostname.isOrganization("domain-with-ev-cert.com"), true);
  sslCertificate.get.restore();
});

test.serial("lnd-pubkey valid example", async t => {
  sinon
    .stub(dns, "resolve")
    .resolves([
      [
        "lnd-pubkey=027d2456f6d4aaf27873b68b7717c8137aaa8043d687a2113b916a5016e9a880e9"
      ]
    ]);
  let pubkey = await hostname.getLndPubkey("publisher.landgenoot.com");
  t.is(
    pubkey,
    "027d2456f6d4aaf27873b68b7717c8137aaa8043d687a2113b916a5016e9a880e9"
  );
  dns.resolve.restore();
});

test.serial("lnd-pubkey invalid example", async t => {
  sinon
    .stub(dns, "resolve")
    .resolves([["docusign=1b0a6754-49b1-4db5-8540-d2c12664b289"]]);
  const error = await t.throwsAsync(
    async () => {
      await hostname.getLndPubkey("example.com");
    },
    { instanceOf: Error }
  );
  t.is(error.message, "No lnd-pubkey found");
  dns.resolve.restore();
});
