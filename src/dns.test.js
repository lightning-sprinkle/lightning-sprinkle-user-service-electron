const test = require('ava');
const dns = require('./dns')

test('lnd-pubkey valid example', t => {
  let pubkey = dns.getLndPubkey('publisher.landgenoot.com');
  t.is(pubkey, '027d2456f6d4aaf27873b68b7717c8137aaa8043d687a2113b916a5016e9a880e9');
});

test('lnd-pubkey invalid example', t => {

	const error = t.throws(() => {
    dns.getLndPubkey('example.com');
	}, {instanceOf: dns.MyError});

	t.is(error.message, '');
})
