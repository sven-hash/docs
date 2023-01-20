---
sidebar_label: Using Ledger Live with Nyx
description: "Instructions for using the Ledger Live app with the Nyx blockchain"
hide_title: false
title: "Using Ledger Live with Nyx"
---

Use the following instructions to be able to interact with the Nyx blockchain - either with deployed smart contracts, or just to send tokens. 

## Prerequisites 
* Download and install [Ledger Live](https://www.ledger.com/ledger-live). 
* Compile the `nyxd` binary as per the instructions [here](/docs/next/run-nym-nodes/nodes/validators#building-the-nym-validator). Stop after you can successfully run `nyxd` and get the helptext in your console output. 

## Prepare your Ledger App 
* Plug in your Ledger device                                                    
* Install the Cosmos app by following the instructions [here](https://hub.cosmos.network/main/resources/ledger.html)                                                
* On the device, navigate to the Cosmos app and open it    

## Create a keypair 
Add a reference to the ledger device on your local machine by running the following command in the same directory as your `nyxd` binary: 

```
nyxd keys add ledger_account --ledger 
```  

## Command help with `nyxd`
More information about each command is available by consulting the help section (`--help`) at each layer of `nyxd`'s commands:

```
# logging top level command help
nyxd --help

# logging top level command help for transaction commands 
nyxd tx --help

# logging top level command help for transaction commands utilising the 'bank' module
nyxd tx bank --help
```

## Sending tokens between addresses
Perform a transaction from the CLI with `nyxd`, appending the `--ledger` option to the command. 

As an example, the below command will send 1 `NYM` from the ledger account to the `$DESTINATION_ACCOUNT`:

```
nyxd tx bank send ledger_account $DESTINATION_ACCOOUNT 1000000unym --ledger --node https://rpc.dev.nymte.ch:443
```

> When a command is run, the transaction will appear on the Ledger device and will require physical confirmation from the device before being signed.

## Nym-specific transactions
Nym-specific commands and queries, like bonding a mix node or delegating unvested tokens, are available in the `wasm` module, and follow the following pattern: 

```
# Executing commands
nyxd tx wasm execute ${CONTRACT_ADDRESS} ${JSON_MSG}

# Querying the state of a smart contract 
nyxd query wasm contract-state smart ${CONTRACT_ADDRESS} ${JSON_MSG}
```

You can find the value of `${CONTRACT_ADDRESS}` in the [`network defaults`](https://github.com/nymtech/nym/blob/release/v1.1.6/common/network-defaults/src/mainnet.rs) file. 

The value of `${JSON_MSG}` will be a blog of `json` formatted as defined for each command and query. You can find these definitions for the mixnet smart contract [here](https://github.com/nymtech/nym/blob/develop/common/cosmwasm-smart-contracts/mixnet-contract/src/msg.rs) and for the vesting contract [here](https://github.com/nymtech/nym/blob/develop/common/cosmwasm-smart-contracts/vesting-contract/src/messages.rs) under `ExecuteMsg` and `QueryMsg`. 

### Example command execution: 
This example will call the `bond_mixnde` function in the mixnet smart contract: 
```
CONTRACT_ADDRESS=mixnet_contract_address
JSON_MSG='{"bond_mixnode":{"mix_node": {"host": "foo", "version": "v1.0.1", <OTHER FIELDS HERE> }, "owner_signature": "value"}'

nymd tx wasm execute ${CONTRACT_ADDRESS} ${JSON_MSG} --ledger --from admin --chain-id qa-net --gas-prices 0.025unymt --gas auto -b block
```