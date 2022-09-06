---
sidebar_label: "Introduction"
description: "Nym connect quickstart"
hide_title:  false
---

# Introduction

Presently, there are two ways to use the Nym mixnet for improved privacy on your networks.

### Nym Connect

Nym Connect is a one-button interface that is easy to use. Presently Nym Connect allows you to send traffic for supported applications through the mixnet, shielding your metadata from the wider internet. NymConnect currently offers support for Telegram, Keybase, and the Electrum Bitcoin wallet. More services will be added soon.

**Nym connect is still in experimental stage. If you experience problems or bugs, please send use a feedback [here](https://dyno.gg/form/bbec84eb)**.

### Nym Sock5

Many existing applications are able to use SOCK5 Proxy protocol. With `nym-sock5-client`, applications can bounce their traffic through Nym network. The Nym Sock5 proxy protocol takes a TCP data stream. The stream of data is chopped up into multiple Sphinx packets and numbers are assigned to them.

**For a more detailed explanation, please see [connecting with existing apps](/docs/stable/use-external-apps/).**
