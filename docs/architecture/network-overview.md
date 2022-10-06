---
sidebar_label: Network Overview
description: "An overview of the Nym platform architecture"
hide_title: false
title: "Network Overview"
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

### Overview

Nym is a privacy platform. It provides strong network-level privacy against sophisticated end-to-end attackers, and anonymous access control using blinded, re-randomizable, decentralized credentials. Our goal is to allow developers to build new applications, or upgrade existing apps, with privacy features unavailable in other systems.

The Nym platform knits together several privacy technologies, integrating them into a system of cooperating networked nodes.

At a high level, our technologies include:

1. a _mixnet_, which encrypts and mixes Sphinx packet traffic so that it cannot be determined who is communicating with whom. Our mixnet is based on a modified version of the _Loopix_ design.
2. a privacy enhancing signature scheme called _Coconut_. Coconut allows a shift in thinking about resource access control, from an identity-based paradigm based on _who you are_ to a privacy-preserving paradigm based on _right to use_.
3. _Sphinx_, a way of transmitting armoured, layer-encrypted information packets which are indistinguishable from each other at a binary level.
4. the _Nyx_ blockchain, a general-purpose CosmWasm-enabled smart contract platform, and the home of the smart contracts which keep track of the mixnet. 

The most important thing to note is that these technologies ensure privacy at two different levels of the stack: **network data transmission**, and **transactions**.

Here's an overview diagram of the different types of nodes making up the network:

<ThemedImage
  alt="Overview diagram of the Nym network"
  sources={{
    light: useBaseUrl('/img/docs/nym-platform.png'),
    dark: useBaseUrl('/img/docs/nym-platform-dark.png'),
  }}
/>

Developers can think of the network as being comprised of **infrastructure nodes** and **clients** for interacting with this infrastructure via Privacy-enhanced applications (PEAPs). 

### Mixnet Infrastructure
There are several types of infrastructure nodes: 

**Mix Nodes** provide network security for network content _and_ metadata, making it impossible to see who is communicating with who.

**Gateways** act as message storage for clients which may go offline and come back online again, and defend against denial of service attacks.

**Validators** secure the network with proof-of-stake Sybil defenses, determine which nodes are included within the network, and work together to create Coconut threshold credentials which provide anonymous access to data and resources. They also produce blocks and secure the Nyx Blockchain. Initially, this chain was used only to house the CosmWasm smart contracts keeping track of Nym's network topology, token vesting contracts, and the `NYM` token itself. In recent months, we've decided to expand the role of Nyx and instead expand its role by making it an open smart contract platform for anyone to upload CosmWasm smart contracts to. 

### Privacy-enhanced applications (PEAPs) 

PEAPs use a Nym client to connect to the network in order to get the available Network Topology for traffic routing, and send/receive packets to other users and services. Clients, in order to send traffic through the mixnet, connect to gateways. Since applications may go online and offline, a client's gateway provides a sort of mailbox where apps can receive their messages.

There are two basic kinds of privacy enhanced applications:

1. **Client apps** running on mobile or desktop devices. These will typically expose a user interface (UI) to a human user. These might be existing apps such as crypto wallets that communicate with Nym via our SOCKS5 proxy, or entirely new apps.
2. **Service Providers**, which will usually run on a server, and take actions on behalf of users without knowing who they are.

Service Providers (SPs) may interact with external systems on behalf of a user. For example, an SP might submit a Bitcoin, Ethereum or Cosmos transaction, proxy a network request, talk to a chat server, or provide anonymous access to a medical system such as a [privacy-friendly coronavirus tracker](https://constructiveproof.com/posts/2020-04-24-coronavirus-tracking-app-privacy/).

There is also a special category of Service Provider, namely SPs that do not visibly interact with any external systems. You might think of these as crypto-utopiapps: they're doing something, but it's not possible from outside to say with any certainty what their function is, or who is interacting with them.

<!-- 
### Traffic Flow
All apps talk with gateways using Sphinx packets and a small set of simple control messages. These messages are sent to gateways over websockets. Each app client has a long-lived relationship with its gateway; Nym defines messages for clients registering and authenticating with gateways, as well as sending encrypted Sphinx packets. -->
