const test = require("ava");
const hostname = require("./hostname");

test("isOrganization valid DV cert", async t => {
  t.is(await hostname.isOrganization("publisher.landgenoot.com"), false);
});

test("isOrganization valid OV cert", async t => {
  t.is(await hostname.isOrganization("spiegel.de"), true);
});

test("isOrganization valid EV cert", async t => {
  t.is(await hostname.isOrganization("paypal.com"), true);
});

test("isOrganization not existing hostname", async t => {
  const error = await t.throwsAsync(
    async () => {
      await hostname.isOrganization("non.existing.tld");
    },
    { instanceOf: Error }
  );
  t.is(error.code, "ENOTFOUND");
});

test("lnd-pubkey valid example", async t => {
  let pubkey = await hostname.getLndPubkey("publisher.landgenoot.com");
  t.is(
    pubkey,
    "027d2456f6d4aaf27873b68b7717c8137aaa8043d687a2113b916a5016e9a880e9"
  );
});

test("lnd-pubkey invalid example", async t => {
  const error = await t.throwsAsync(
    async () => {
      await hostname.getLndPubkey("example.com");
    },
    { instanceOf: Error }
  );
  t.is(error.message, "No lnd-pubkey found");
});

test("lnd-pubkey not existing hostname ", async t => {
  const error = await t.throwsAsync(
    async () => {
      await hostname.getLndPubkey("non.existing.tld");
    },
    { instanceOf: Error }
  );
  t.is(error.code, "ENOTFOUND");
});

