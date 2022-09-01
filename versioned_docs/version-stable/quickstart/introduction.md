---
sidebar_label: "Introduction"
description: "Nym connect quickstart"
hide_title: false
---

# Introduction

Presently, there are two ways to use the Nym mixnet for improved privacy on your networks.

### Nym Connect

Nym Connect is a one-button interface that is easy to use. With Nym connect, you get 100% privacy on applications you use everyday. Presently, Nym connect has support for telegram, keybase and electrum wallets. This means that you can run sock5 proxy on these applications with Nym connect. More services coming soon.

**Nym connect is still in experimental stage. If buggy please send us a [feedback report](https://dyno.gg/form/bbec84eb)**

### Nym Sock5

Many existing applications are able to use SOCK5 Proxy protocol. With `nym-sock5-client`, applications can bounce their traffic through NYM network. The Nym Sock5 proxy protocol takes a TCP data stream. The stream of data is chopped up into multiple Sphinx packets and numbers are assigned to them.

**For a more detailed explanation, please see [connecting with existing apps](/docs/stable/use-external-apps/).**
