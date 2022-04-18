---
sidebar_label: Network Overview
description: "An overview of the Nym platform architecture"
hide_title: false
title: Network Overview
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

## Nym Network

The [Nym Network](https://github.com/nymtech/nym) includes mixnodes, validators, gateways, and client code used for talking to the network. All of this is run in a decentralized, trustless fashion.

Here's an overview of the entire network.

<ThemedImage
  alt="Overview diagram of the Nym network"
  sources={{
    light: useBaseUrl('/img/docs/nym-platform.png'),
    dark: useBaseUrl('/img/docs/nym-platform-dark.png'),
  }}
/>

*Mix nodes* provide network security for network content _and_ metadata, making it impossible to see who is communicating with who.

*Validators* secure the network with proof-of-stake Sybil defenses, determine which nodes are included within the network, and work together to create Coconut threshold credentials which provide anonymous access to data and resources.

*Gateways* act as message storage for clients which may go offline and come back online again, and defend against denial of service attacks.

You might notice the diagram above also contains the *Nyx Blockchain* - this will be discussed in more detail below. 

But the Nym platform (blue) is just infrastructure. The interesting part are the privacy enhanced apps (yellow) which can be created by privacy developers or hooked into the network for existing applications. We've included some (fictional) examples of things we think people might build or integrate. Read our docs and use your imagination, and you may come up with many more!

Nym-enhanced applications can:

- upgrade the privacy properties of existing applications, such as cryptographic wallets, VPNs, payment systems, chat, medical records, blockchains, exchanges, markets, DAOs or other allocation systems.
- enable completely new types of applications built from the ground up with privacy at their core.

Apps talk to the Nym network by connecting to gateway nodes. Applications may go online and offline; the gateway provides a sort of mailbox where apps can receive their messages.

There are two basic kinds of privacy enhanced applications:

1. user facing apps running on mobile or desktop devices. These will typically expose a user interface (UI) to a human user. These might be existing apps such as crypto wallets that communicate with Nym via our SOCKS5 proxy, or entirely new apps.
2. Service Providers, which will usually run on a server, and take actions on behalf of users without knowing who they are.

Service Providers (SPs) may interact with external systems on behalf of a user. For example, an SP might submit a Bitcoin, Ethereum or Cosmos transaction, proxy a network request, talk to a chat server, or provide anonymous access to a medical system such as a [privacy-friendly coronavirus tracker](https://constructiveproof.com/posts/2020-04-24-coronavirus-tracking-app-privacy/).

There is also a special category of Service Provider, namely SPs that do not visibly interact with any external systems. You might think of these as crypto-utopiapps: they're doing something, but it's not possible from outside to say with any certainty what their function is, or who is interacting with them.

All apps talk with Nym gateway nodes using Sphinx packets and a small set of simple control messages. These messages are sent to gateways over websockets. Each app client has a long-lived relationship with its gateway; Nym defines messages for clients registering and authenticating with gateways, as well as sending encrypted Sphinx packets.

We are currently focused on providing privacy for blockchain systems. But our ambitions are wider. In the medium term, we are actively working to bring together a range of new technologies that can enable strong privacy for the whole internet. There have not been many new widely-adopted privacy technologies to help internet users in the past 15 years. We are working hard to change that.

## Nyx Blockchain 

The Nyx Blockchain - named after the Greek diety of of night - serves a few purposes. Initially, it was used only to house the CosmWasm smart contracts keeping track of Nym's network topology, token vesting contracts, and the NYM token itself. 

In recent months, we've decided to expand the role of Nyx and instead expand its role by making it an open smart contract platform for anyone to upload CosmWasm smart contracts to. 

