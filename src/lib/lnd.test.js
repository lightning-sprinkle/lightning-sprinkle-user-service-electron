const test = require("ava");
const lnd = require("./lnd")

test("Open macaroon", async t => {
  let macaroon = await lnd.getMacaroon("/home/daan/.lnd/data/chain/bitcoin/mainnet/admin.macaroon")
  t.regex(macaroon, /[0-9a-f]/);
});

test("Keysend request", async t => {
  let request = lnd.keysendRequest("027d2456f6d4aaf27873b68b7717c8137aaa8043d687a2113b916a5016e9a880e9", 10);
  t.is(request.dest_string, "027d2456f6d4aaf27873b68b7717c8137aaa8043d687a2113b916a5016e9a880e9")
  t.is(request.amt, 10);
  t.is(request.final_cltv_delta, 40);
  t.regex(request.payment_hash, /[0-9a-f]/);
  t.not(typeof request.dest_custom_records[5482373484], "undefined")
})