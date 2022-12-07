---
sidebar_label: Mixnet Contract
description: "information on the core functionality and configuration of the mixnet smart contract"
hide_title: false
title: Mixnet Contract
---

The Mixnet smart contract is a core piece of the Nym system, functioning as the mixnet directory and keeping track of delegations and rewards: the core functionality required by an incentivised mixnet. You can find the code and build instructions [here](https://github.com/nymtech/nym/tree/release/v1.1.0/contracts/mixnet).

### Functionality 
The Mixnet contract has multiple functions: 
* storing bonded mix node and gateway information (and removing this on unbonding).
* providing the network-topology to the (cached) validator API endpoint used by clients on startup for routing information. 
* storing delegation and bond amounts.
* storing reward amounts. 

The addresses of deployed smart contracts can be found in the [`network-defaults`](https://github.com/nymtech/nym/blob/release/v1.1.0/common/network-defaults/src/mainnet.rs) directory of the codebase alongside other network default values.

### Interacting with the contract 
There are two ways to interact with the deployed smart contract: 
* the `nym-cli` tool
* the `nyxd` binary

#### Nym-cli tool (recommended in most cases) 
The `nym-cli` tool is a binary offering a simple interface for interacting with deployed smart contract (for instance, bonding and unbonding a mix node from the CLI), as well as creating and managing accounts and keypairs, sending tokens, and querying the blockchain. 

Instructions on how to do so can be found on the [`nym-cli` docs page](/docs/stable/nym-cli).

#### Nyxd binary 
The `nyxd` binary, although more complex to compile and use, offers the full range of commands availiable to users of CosmosSDK chains. Use this if you are (e.g.) wanting to perform more granular queries about transactions from the CLI. 

You can use the instructions on how to do this on from the [`gaiad` docs page](https://hub.cosmos.network/main/delegators/delegator-guide-cli.html#querying-the-state).


