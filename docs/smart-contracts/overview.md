---
sidebar_label: Overview
description: "Overview of the Nym CosmWasm smart contracts"
hide_title: false
title: Overview
---

The Nyx blockchain **TODO add link to explorer** is based on [CosmWasm](https://cosmwasm.com/). It allows users to code smart contracts in a safe subset of the Rust programming language, easily export them to WebAssembly, and upload them to the blockchain. 

There are currently two smart contracts on the Nyx chain: 
* the [Mixnet contract](/docs/next/smart-contracts/mixnet) which manages the network topology of the mixnet, tracking delegations and rewarding. 
* the [Vesting contract](/docs/next/smart-contracts/vesting) which manages `NYM` token vesting functionality.  

:::note
Users will soon be able to create and upload their own CosmWasm smart contracts to Nyx and take advantage of applications such as [Coconut](/docs/next/coconut) - more to be announced regarding this very soon.
:::
