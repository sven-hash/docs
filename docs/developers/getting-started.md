---
sidebar_label: Getting started
description: "Overview of areas of potential development."
hide_title: false
title: "Getting started" 
---

If you are a coder, we invite you to build privacy enhanced applications - **PEAPs** - using Nym.

## Where to start?
Nym's infrastructure is complex, and might be a little overwhelming when you just want to build your 'hello world' app when getting started. In order to assess what to build (and which area to build it on) use the general rule of thumb that:
    * Nym apps focus on anonymising network-level communications via using privacy respecting clients and services to send data through the mixnet, and stop metadata leakage: think anonymous chat applications, or services which proxy a cryptocurrency transaction for you and prevent metadata leaks deanonymising you when broadcasting your tx. 
    * Nyx apps focus more on the _application_ level, involving smart contracts hosted on the Nyx chain, and/or anonymous, reusable Coconut Credentials for anonymous access control. 

The list above isn't exhaustive, nor does it necessarily imagine that apps won't utilise Nym's technologies to provide anonymity at both the network and application levels, but it provides a rough direction in which to start when researching building something atop Nym. 

If you're still looking for that 'hello world' app, check out the [demos](/docs/next/developers/develop-with-nym/demos) page to get an idea of the code examples we currently have in our codebase. 

## Getting involved
Once you've decided which part of the stack interests you the most, you need to decide what to build! 

### Some example Nym (Mixnet) PEAPs
* Chat applications 
* Crypto RPC requesters (think our [Network Requester](/docs/next/run-nym-nodes/nodes/network-requester), but for blockchain transactions)
* Private file storage (see the winner and runners up from the previous Hackatom [here](/docs/next/run-nym-nodes/nodes/file-storage), who built just this)
* Mail server requesters (anonymously access mailboxes)
* Private file backups 

### Some example Nyx (smart contract) PEAPs
* Privacy-preserving Covid Passport (you can find a POC of this in our [Github repo](https://github.com/orgs/nymtech/repositories?type=all))
* Privacy-preserving KYC
* Replacements for DID systems
* Cryptocurrencies 
* Anything that requires access control that you wish to anonymise!

### Hack on Nym infrastructure 
If you're wanting to develop on top of the infrastructure code itself and start adding additional features to existing nodes, check out the [Nym github repository](https://github.com/nymtech/nym). If you want to get to grips with running a node before starting this, check out the [Node Operators](/docs/next/run-nym-nodes/pre-built-binaries) section of these docs for more.  

## Integrations with existing apps 
If you're building an application that you think could benefit from utilising the Nym network, get in touch via [max@nymtech.net](mailto:max@nymtech.net). 
