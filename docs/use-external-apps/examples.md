---
sidebar_label: Examples
description: Example list for desktop apps to use with socks5 
hide_title: false
title: Examples
---

Any desktop application that can create a socks5 connection can bounce traffic through the mixnet. 

At the moment, there is only one Service Provider that is able to forward traffic from the `nym-socks5-client` binary: the [Network Requester](/docs/next/run-nym-nodes/nodes/requester). 

So long as the domain that the app is pinging is included in the whitelist of the Network Requester service provider your socks5 client is connected to, you'll be able to proxy traffic to and from this domain as normal - just hidden via the mixnet. 

The applications that are whitelisted in the example file located [here](https://github.com/nymtech/nym/blob/develop/service-providers/network-requester/allowed.list.sample) are: 

* blockstream.info
* greenaddress.it
* electrum.org
* qtornado.com
* aranguren.org
* hsmiths.com
* not.fyi
* cluelessperson.com
* bauerj.eu
* keybaseapi.com
* amazonaws.com
 
But **you can always add your own**, or remove any unwanted ones from the `allowed.list`. 

## Examples
### Blockstream Green Wallet 
[Blockstream Green](https://blockstream.com/green/) is a BitCoin and Liquid wallet. Since it supports Socks5, it can use Nym. Set your proxy settings in Green as follows.

First you need to log out.

Next, click on the settings on the right hand side to set proxy URL:

![Blockstream Green settings](/img/docs/wallet-proxy-settings/blockstream-green.gif)

Most wallets and other applications will work basically the same way: find the network proxy settings, enter the proxy url (host: **localhost**, port: **1080**).

In some other applications, this might be written as **localhost:1080** if there's only one proxy entry field.

### Keybase

We have added support for KeyBase (which we use for our own internal chat). Feel free to try that out and say hello!

The socks5 settings in KeyBase are under Settings > Advanced > Proxy Settings.

![Electrum settings](/img/docs/keybase-settings.gif)
