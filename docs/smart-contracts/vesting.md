--- 
sidebar_label: Vesting Contract 
description: "information on the core functionality and configuration of the vesting smart contract"
hide_title: false
title: Vesting Contract
---

The vesting contract allows for the creation of vesting accounts, allowing `NYM` tokens to vest over time, and for users to minimally interact with the Mixnet using their unvested tokens. You can find the code and build instructions [here](https://github.com/nymtech/nym/tree/release/v1.1.0/contracts/vesting). 

### Functionality 
The Vesting contract has multiple functions:
* Creating and storing vesting `NYM` token vesting accounts.
* Interacting with the Mixnet using vesting (i.e. non-transferable) tokens, allowing users to delegate their unvested tokens. 

The addresses of deployed smart contracts can be found in the [`network-defaults`](https://github.com/nymtech/nym/blob/release/v1.1.0/common/network-defaults/src/mainnet.rs) directory of the codebase alongside other network default values.

### Interacting with the contract 
There are two ways to interact with the deployed smart contract: 
* the `nym-cli` tool
* the `nyxd` binary

#### Nym-cli tool (recommended in most cases) 
The `nym-cli` tool is a binary offering a simple interface for interacting with deployed smart contract (for instance, bonding and unbonding a mix node from the CLI), as well as creating and managing accounts and keypairs, sending tokens, and querying the blockchain. 

Instructions on how to do so can be found on the [`nym-cli` docs page](/docs/next/nym-cli).

#### Nyxd binary 
The `nyxd` binary, although more complex to compile and use, offers the full range of commands availiable to users of CosmosSDK chains. Use this if you are (e.g.) wanting to perform more granular queries about transactions from the CLI. 

Instructions on how to do so can be found on the [`nyxd` docs page](/docs/next/run-nym-nodes/nodes/rpc-node).


