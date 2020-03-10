const test = require('ava');
const dns = require('./dns')

test('lnd-pubkey valid example', async t => {
  let pubkey = await dns.getLndPubkey('publisher.landgenoot.com');
  t.is(pubkey, '027d2456f6d4aaf27873b68b7717c8137aaa8043d687a2113b916a5016e9a880e9');
});

test('lnd-pubkey invalid example', async t => {
	const error = await t.throwsAsync(async () => {
    await dns.getLndPubkey('example.com');
	}, {instanceOf: Error});
	t.is(error.message, 'No lnd-pubkey found');  
})

test('Not existing hostname', async t => {
	const error = await t.throwsAsync(async () => {
    await dns.getLndPubkey('non.existing.tld');
	}, {instanceOf: Error});
	t.is(error.code, 'ENOTFOUND');  
})
