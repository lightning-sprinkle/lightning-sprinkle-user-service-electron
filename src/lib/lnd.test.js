const test = require("ava");
const lnd = require("./lnd")


test("Open macaroon", async t => {
  let macaroon = await lnd.getMacaroon("/home/daan/.lnd/data/chain/bitcoin/mainnet/admin.macaroon")
  t.is(/[0-9a-f]/.test(macaroon), true);
});
