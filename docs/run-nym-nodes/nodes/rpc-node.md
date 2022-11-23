---
sidebar_label: "RPC Nodes / CLI Wallets"
description: "RPC nodes can be used to query the state of the blockchain without having to query active validators"
hide_title: false
title: "RPC Nodes / CLI Wallets"
---

If you have already read our validator setup and maintenance [documentation](/docs/next/run-nym-nodes/nodes/validators) you will have seen that we compile and use the `nyxd` binary primarily for our validators. This binary can however be used for many other tasks, such as creating and using keypairs for wallets, or automated setups that require the signing and broadcasting of transactions. 

### Using `nyxd` binary as an RPC Node
RPC Nodes (which might otherwise be referred to as 'Lite Nodes' or just 'Full Nodes') differ from Validators in that they hold a copy of the Nyx blockchain, but do **not** participate in consensus / block-production. 

You may want to set up an RPC Node for querying the blockchain, or in order to have an endpoint that your app can use to send transactions. 

In order to set up an RPC Node, simply follow the instructions to set up a [Validator](/docs/next/run-nym-nodes/nodes/validators), but **excluding the `nyxd tx staking create-validator` command**. 

### Using `nyxd` binary as a CLI wallet  
You can also use the `nyxd` as a minimal CLI wallet if you want to set up an account (or multiple accounts). Just compile the binary as per the documentation, **stopping after** the [building your validator](/docs/next/run-nym-nodes/nodes/validators#building-your-validator) step is complete. You can then run `nyxd keys --help` to see how you can set up and store different keypairs with which to interact with the Nyx blockchain. 


