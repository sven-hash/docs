---
sidebar_label: "Integration FAQ"
description: "Common questions you might have when integrating with Nym"
hide_title:  false
title: Integration FAQ
---

:::note
This is an evolving document. If you do not see questions or information for your relevant integration, let us know by dropping an issue in the [docs repository](https://github.com/nymtech/docs/issues) or via the `nymtech.friends` channel on Keybase, or the `#integrations` channel in Discord. 
:::

## Using the `nyxd` validator binary
For integrations that require cryptocurrency transactions (for instance, running a `NYM` <-> `BTC` swap application) then you will want to use the `nyxd` binary for creating and sending transactions, as well as reading the state of the Nyx blockchain and managing your application keypairs. 

The `nyxd` binary is a standard compilation of the Cosmos SDK `gaiad` binary compiled with the `wasmd` module enabled so we can use `cosmwasm` smart contracts. Make sure to check the [`gaiad`](https://hub.cosmos.network/main/hub-overview/overview.html) and [`cosmwasm`](https://docs.cosmwasm.com/docs/1.0/) documentation if you want to dig into functionality not covered by our own docs.  

For users coming from outside of the Cosmos SDK ecosystem, and/or the Proof of Stake blockchain ecosystem, there are a few idiosyncracies that are worth noting. 


### 'Validator' vs 'full node' vs 'CLI wallet'
If you have already read our validator setup and maintenance [documentation](/docs/next/run-nym-nodes/nodes/validators) you will have seen that we compile and use the `nyxd` binary primarily for our validators. This binary can however be used for many other tasks, such as creating and using keypairs for wallets, or automated setups that require the signing and broadcasting of transactions. 

The difference between a full node and a validator in the context of a Cosmos SDK blockchain is that: 
* A full node holds the entire blockchain state, but **does not** participate in consensus by signing and producing blocks. You can set this up by following our [documentation](https://nymtech.net/docs/stable/run-nym-nodes/nodes/validators/) but **stopping after** the `nyxd start` command. 
* A validator is a full node that has staked `NYX` tokens, and joined consensus. You can set this up by following our [documentation](https://nymtech.net/docs/stable/run-nym-nodes/nodes/validators/) as usual. 
* You can also use the `nyxd` as a minimal CLI wallet if you want to set up an account (or multiple accounts). Just compile the binary as per the documentation, **stopping after** the [building your validator](http://localhost:3000/docs/next/run-nym-nodes/nodes/validators#building-your-validator) step is complete. You can then run `nyxd keys --help` to see how you can set up and store different keypairs with which to interact with the Nyx blockchain. 

These differences might be a little alien for those used to blockchains that use Proof of Work for consensus, where running a full node means you are also producing blocks. Given that Nyx is a Proof of Stake blockchain, this difference becomes important. 

### Testing
* Is there the equivalent of Bitcoin's `regtest` for test transactions?
    * Use the `--dry-run` flag if you're wanting to test individual txs 
* If you're wanting to have a replicable setup for testing different flows of transactions in an automated environment, we recommend you compile a 1 node local blockchain by following our validator docs, but **not** adding the persistent peers to your `genesis.json` file. 
* Before moving to mainnet, you can also run a validator on our Sandbox testnet to check application flows with some permanence.

:::note
There is also a script you can use with ansible, which sets up a new chain and genesis validator with a lot of tokens. This is an easily-replicable one-shot script for testing purposes. It will be available soon. 
:::

### Automated setups 
* I want an automated setup where I can send txs to my node - which keyring should I use? 
    * When testing, use `test`. Otherwise, use `pass`  
* I want to script checking for transactions sent to and from particular address(es) - is there a command for this?
    * `nyxd query txs --events "coin_received.receiver=${address}"` will return all transactions to `address`
    * `nyxd query txs --events 'message.sender=n1hzn28p2c6pzr98r85jp3h53fy8mju5w7ndd5vh'` will return all transactions sent from `address`. Note the `''` around the value of the `--events` flag!

:::note
You can find the full list of events concerning each module in its respective directory of the Cosmos SDK github repository. [Here](https://github.com/cosmos/cosmos-sdk/blob/6f070623741fe0d6851d79ada41e6e2b1c67e236/x/bank/spec/04_events.md) is the `bank` module event list as an example, which is the module used for sending tokens between accounts.

There is an explainer of Cosmos SDK chain's module-based setup [here](https://docs.cosmos.network/main/basics/app-anatomy.html#modules). 
:::

### Estimating gas usage 
How to work out how much gas to use? Users of Ethereum, Bitcoin, etc are used to setting the following when creating a transaction: 
* An amount of gas to use for the transaction
* A fee per unit of gas, in order for mempool prioritisation of txs. 

However, Cosmos SDK chains work slightly differently. Tendermint (the consensus protocol used by Cosmos SDK blockchains) does not have fee prioritisation built into it, but instead relies on First In First Out (FIFO) rules, with support for additional rules being added at the application layer as discussed [here](https://medium.com/tendermint/tendermint-v0-35-introduces-prioritized-mempool-a-makeover-to-the-peer-to-peer-network-more-61eea6ec572d). 
* Gas price is a per validator setting, and is not being exposed anywhere. Most of our validator have their `minimum-gas-price` set to `0.025unyx,0.025unym`, meaning you can pay in either currency. We recommend you pay in `unyx`.  
* We recommend to use a combination of the `gas=auto` and `gas-adjustment` flags as our validator documentation specifies, and using the `fees` flag as a cap for the amount of tokens you're willing to spend on a transaction. 
    * `gas=auto` will simulate the transaction, and use this simulation to input an amount of gas to be used. 
    * The value of the `gas-adjustment` flag will multiply the simulated amount of gas by itself in case the simulation understimates the amount of gas necessary, which is a known issue with Cosmos SDK chains. 
    * `fees` flag sets an upper limit to the amount you're willing to pay, denominated in `unym`.
    
Using these flags together in a transaction will look something like this:

```
nyxd tx bank send FROM_ADDRESS TO_ADDRESS AMOUNTunyx --chain-id=nyx --gas="auto" --gas-adjustment=1.15 --fees FEE_AMOUNTunyx
```

We are aware this approach is not the most efficient way of handling transaction costs in an automated fashion. However, since these inefficiences equate to < ~$1cent, we believe this is fine for the moment. The Cosmos SDK will hopefully become more exact in its gas estimation in the future. 

Another option would be to set up your own validator which has no minimum gas price - i.e. one that's able to accept free transactions - and then restrict access to that validator to only the infrastructure that you're going to use to be doing NYM transactions. Then you wouldn't have to worry about the gas estimates not being 100% accurate. 

### Mainnet synchronisation
* I need to run a full node or validator, how can I easily sync? 
    * Please reach out via Telegram or Discord to the Nym team member assisting you with integration. There is a script we will send you that syncs from one of our validators that will allow you to sync quickly. 
