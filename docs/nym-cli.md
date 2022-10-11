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

### Useage 
You can see all available commands with: 

```
./nym-cli --help      
```

<details>
  <summary>console output</summary>

        nym-cli 
        A client for interacting with Nym smart contracts and the Nyx blockchain

        USAGE:
            nym-cli [OPTIONS] <SUBCOMMAND>

        OPTIONS:
                --config-env-file <CONFIG_ENV_FILE>
                    Overrides configuration as a file of environment variables. Note: individual env vars
                    take precedence over this file.

            -h, --help
                    Print help information

                --mixnet-contract-address <MIXNET_CONTRACT_ADDRESS>
                    Overrides the mixnet contract address provided either as an environment variable or in a
                    config file

                --mnemonic <MNEMONIC>
                    Provide the mnemonic for your account. You can also provide this is an env var called
                    MNEMONIC.

                --nymd-url <NYMD_URL>
                    Overrides the nymd URL provided either as an environment variable NYMD_VALIDATOR or in a
                    config file

                --validator-api-url <VALIDATOR_API_URL>
                    Overrides the validator API URL provided either as an environment variable API_VALIDATOR
                    or in a config file

                --vesting-contract-address <VESTING_CONTRACT_ADDRESS>
                    Overrides the vesting contract address provided either as an environment variable or in
                    a config file

        SUBCOMMANDS:
            account             Query and manage Nyx blockchain accounts
            block               Query chain blocks
            cosmwasm            Manage and execute WASM smart contracts
            generate-fig        Generates shell completion
            help                Print this message or the help of the given subcommand(s)
            mixnet              Manage your mixnet infrastructure, delegate stake or query the directory
            signature           Sign and verify messages
            tx                  Query for transactions
            vesting-schedule    Create and query for a vesting schedule
    
</details>

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
