# lightning-sprinkle-user-service-electron [![Build Status](https://travis-ci.org/lightning-sprinkle/lightning-sprinkle-user-service-electron.svg?branch=master)](https://travis-ci.org/lightning-sprinkle/lightning-sprinkle-user-service-electron)
Translate python service to nodejs and electron to make the user experience much better


## FAQ

#### This service makes it possible to request money from my wallet and get it immediately. Can a publisher steal my complete balance?

There are a couple of security measures taken in place, depending on the mode the application runs in.
1. **Strict:** Every publisher needs to ask permission once to request money (whitelist)
2. **Organization:** Every publisher with an OV or EV certificate can request money. Which means that the publisher has a government registration somewhere.
3. **Any:** Any publisher can request money, but not the ones on the blacklist.

Payments are throttled to a certain amount per hour, which makes it also for trusted publisher impossible to empty your wallet.

#### Why is it called Lightning Sprinkle?
The system works on the lightning protocol and gives the user the ability to leave small amounts of money in the places they have been. Just like the story of Hansel und Gretel, where they sprinkle crumbs along their path. 

Not to mention, I am dutch, so I like [hagelslag (sprinkles)](https://en.wikipedia.org/wiki/Sprinkles#History).

#### Why is this any different from the BAT-token/Brave browser?
- ICO worth of 24 million USD => We are using plain BTC, no token needed
- Different browser needed => Lightning Sprinkle works with any browser that supports Javascript
- You need to be a "verified content creator", which gives brave all the power =. No verification needed, just set the public key of your LND node as a DNS TXT record
- Tries to serve ads anyway and replaces ads on websites with their own ads, which seems unfair to me. => This project is about reducing ads, not getting more of them.
- You need to connect to your Uphold account to receive contributions from Brave Rewards, which is a commercial exchange => As we are using BTC, you can use any exchange you like or even use an ATM.