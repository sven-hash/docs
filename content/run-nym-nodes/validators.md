---
title: "Validators"
weight: 30
description: "Nym Validators provide privacy-enhanced credentials based on the testimony of a set of decentralized, blockchain-based issuing authorities."
---

Nym validators secure the network with a staking token, defending the network from Sybil attacks.

Validators also provide privacy-enhanced credentials based on the testimony of a set of decentralized, blockchain-based issuing authorities. Nym validators use a [signature scheme](https://en.wikipedia.org/wiki/Digital_signature) called [Coconut](https://arxiv.org/abs/1802.07344) to issue credentials. This allows privacy apps to generate anonymous resource claims through decentralised authorities, then use them with Service Providers.

The validator is built using [Cosmos SDK](https://cosmos.network) and [Tendermint](https://tendermint.com), with a [CosmWasm](https://cosmwasm.com) smart contract controlling the directory service, node bonding, and delegated mixnet staking. 

We are currently running a closed set of validators, we will update this page with validator information when we decide to open things up. 
