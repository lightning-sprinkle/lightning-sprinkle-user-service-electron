const test = require("ava");
const cert = require("./cert");

test("Valid DV cert", async t => {
  t.is(await cert.isOrganization("publisher.landgenoot.com"), false);
});

test("Valid OV cert", async t => {
  t.is(await cert.isOrganization("spiegel.de"), true);
});

test("Valid EV cert", async t => {
  t.is(await cert.isOrganization("paypal.com"), true);
});

test("Not existing hostname", async t => {
  const error = await t.throwsAsync(
    async () => {
      await cert.isOrganization("non.existing.tld");
    },
    { instanceOf: Error }
  );
  t.is(error.code, "ENOTFOUND");
});
