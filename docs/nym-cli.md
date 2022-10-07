---
sidebar_label: "Nym CLI"
description: "Common questions you might have when integrating with Nym"
hide_title:  false
title: Nym CLI
---

This is a CLI tool for interacting with:

* the Nyx blockchain
* the smart contracts for the Mixnet
It provides a convenient wrapper around the nymd client with similar functionality to thenyxd binary for querying the chain or executing smart contract methods.


### Building 
The `nym-cli` binary can be built by running `cargo build --release` in the [/tools/nym-cli](https://github.com/nymtech/nym/tree/develop/tools/nym-cli) directory. 

### Features 

You can use this binary for account management, querying and sending transactions to the mixnet [smart contracts](https://github.com/nymtech/nym/tree/develop/contracts). 

Currently supported features include: 

* **Account Management**
    * create a new account with a random mnemonic
    * query the account balance
    * query the account public key (needed to verify signatures)
    * query for transactions originating from the account
    * send tokens to another account
* **Blockchain Queries**
    * query for the current block height
    * query for a block at a height
    * query for a block at a timestamp
* **Smart Contract Interaction**
    * upload a smart contract
    * instantiate a smart contract
    * upgrade a smart contract
    * execute a smart contract method
* **Mixnet Interaction**
    * ledger Directory
    * query for mixnodes
    * query for gateways
* **Operators**
    * bond/unbond a mixnode or gateway
    * query for waiting rewards
    * withdraw rewards
    * manage mixnode settings
* **Delegators**
    * delegate/undelegate to a mixnode
    * query for waiting rewards
    * withdraw rewards
* **Signature Generation and Verification**
    * create a signature for string data (UTF-8)
    * verify a signature for an account
* **Vesting**
    * create a vesting schedule
    * query for a vesting schedule
* **Coconut (coming soon)**
    * issue credentials
    * verify credentials
