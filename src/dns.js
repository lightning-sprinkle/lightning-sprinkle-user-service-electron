
class MyError extends Error {}

function getLndPubkey(hostname) {
  if (hostname === 'example.com') {
    throw new MyError() 
  } else {
    return "027d2456f6d4aaf27873b68b7717c8137aaa8043d687a2113b916a5016e9a880e9"
  }
}

module.exports = { getLndPubkey, MyError }