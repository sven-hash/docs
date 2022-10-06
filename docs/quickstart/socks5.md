---
sidebar_label: "SOCKS5 proxy (CLI)"
description: "Connect via SOCKS5"
hide_title:  false
title: "SOCKS5 proxy (CLI)"
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

## Overview

Many existing applications are able to use the SOCKS5 proxy protocol. If you want to send such an application's traffic through the mixnet, you can use the `nym-socks5-client` to bounce network traffic through the Nym network, like this:

<ThemedImage
  alt="Overview diagram of the Nym network"
  sources={{
    light: useBaseUrl('/img/docs/nym-socks5-architecture.png'),
    dark: useBaseUrl('/img/docs/nym-socks5-architecture-dark.png'),
  }}
/>

There are 2 pieces of software that work together to send SOCKS5 traffic through the mixnet: the `nym-socks5-client`, and the `nym-network-requester`. 

The `nym-socks5-client` allows you to do the following from your local machine:
* Take a TCP data stream from a application that can send traffic via SOCKS5. 
* Chop up the TCP stream into multiple Sphinx packets, assigning sequence numbers to them, while leaving the TCP connection open for more data
* Send the Sphinx packets through the mixnet to a [Nym Network Requester](/docs/next/run-nodes/nodes/requester). Packets are shuffled and mixed as they transit the mixnet.

The `nym-network-requester` then reassembles the original TCP stream using the packets' sequence numbers, and make the intended request. It will then chop up the response into Sphinx packets and send them back through the mixnet to your  `nym-socks5-client`. The application will then receive its data, without even noticing that it wasn't talking to a "normal" SOCKS5 proxy!

## Getting started 

You will need 2 things to get started: 
- a network requester to forward traffic from the mixnet to the endpoint your app wants to hit (e.g. a message server)
- a running socks5 client running on your local machine connected to this network requester 

### Init and run network requester 

* proper documentation can be found here[LINK] but these commands will get you started. **These commands should be run on a VPS**. 

```
block 
command 
for 
setting 
up a 
client 
and a 
NR 
on 
a 
box 
via 
screen or tmux 

``` 

Since the NR has a whitelist of domains it will forward traffic to, for testing purposes we are running it in `--open-proxy` mode so we don't have to edit this whitelist. Don't do this in prod - there's a whitelist for a reason!

### Init and run socks5 client 

* proper documentation can be found here[LINK] but these commands will get you started. **These commands should be run on your local machine**. 

```
block 
command 
for 
setting 
up a 
client 
with NR set up previously as --provider

``` 


## Proxying traffic

After completing the steps above, your socks5client will be listening on `localhost:1080` ready to proxy traffic to your Network Requester. 

You can always try out other apps, such as Signal, Telegram, or desktop crypto wallets. When trying to connect your app, generally the proxy settings are found in `settings->advanced` or `settings->connection`. 

Here is an example of setting the proxy connecting in Blockstream Green:

![Blockstream Green settings](/img/docs/wallet-proxy-settings/blockstream-green.gif)

Most wallets and other applications will work basically the same way: find the network proxy settings, enter the proxy url (host: **localhost**, port: **1080**).

In some other applications, this might be written as **localhost:1080** if there's only one proxy entry field.


