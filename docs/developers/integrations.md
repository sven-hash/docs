---
sidebar_label: "Integration FAQ"
description: "Common questions you might have when integrating with Nym"
hide_title: false
title: Integration FAQ
---

:::note
This is an evolving document. If you do not see questions or information for your relevant integration, let us know by dropping an issue in the [docs repository](https://github.com/nymtech/docs/issues) or via the nymtech.friends channel on Keybase, or the #integrations channel in Discord. 
:::

### Integrating Nym for cryptocurrency payments 

#### 'Validator' vs 'full node'
The difference between a full node and a validator in the context of a Cosmos SDK blockchain is that: 
* A full node holds the entire blockchain state, but **does not** participate in consensus by signing and producing blocks. You can set this up by following our [documentation](https://nymtech.net/docs/stable/run-nym-nodes/nodes/validators/) but **stopping after** the `nyxd start` command. 
* A validator is a full node that has staked `NYX` tokens, and joined consensus. You can set this up by following our [documentation](https://nymtech.net/docs/stable/run-nym-nodes/nodes/validators/) as usual. 

These differences might be a little alien for those used to blockchains that use Proof of Work for consensus, where running a full node means you are also producing blocks. Given that Nyx is a Proof of Stake blockchain, this difference becomes important. 

#### Testing
* Is there the equivalent of Bitcoin's `regtest` for test transactions?
    * Use the `--dry-run` flag if you're wanting to test individual txs 
* We recommend you compile a 1 node local blockchain by following our validator docs, but not adding the persistent peers to your `genesis.json` file, if you're wanting to have a replicable setup for testing different flows of transactions in an automated environment. 
* Following this, run a validator on our sandbox testnet to check application flows with some permanence.

:::note
There is also a script you can use with ansible, which sets up a new chain, with a 'genesis' validator, and mints 1 billion tokens to the validator operator. This is in the process of being cleaned up to be made available to the public: keep your eyes peeled! 
:::

#### Automated setups 
* I want an automated setup where I can send txs to my node - which keyring should I use? 
    * When testing, use `test`. Otherwise, use `pass`  
* I want to script checking for transactions sent to and from particular address(es) - is there a command for this?
    * `nyxd query txs --events "coin_received.receiver=${address}"` will return all transactions to `address`
    * `./nyxd query txs --events 'message.sender=n1hzn28p2c6pzr98r85jp3h53fy8mju5w7ndd5vh'` will return all transactions sent from `address`. Note the `''` around the value of the `--events` flag!
    * You can find the full list of events concerning each module in its respective directory of the Cosmos SDK github repository. Here is the `bank` one as an example, which is the module used for sending tokens between accounts: https://github.com/cosmos/cosmos-sdk/blob/6f070623741fe0d6851d79ada41e6e2b1c67e236/x/bank/spec/04_events.md
    * There is an explainer of Cosmos SDK chain's module-based setup [here](https://docs.cosmos.network/main/modules/). 

#### Estimating gas usage 
* How to work out how much gas to use? 
    * Users of Ethereum, Bitcoin, etc are used to setting: 
        * An amount of gas to use for the transaction
        * A fee per unit of gas, in order for mempool prioritisation of txs. 
    * Cosmos SDK chains work slightly differently: 
        * Tendermint (the consensus protocol used by Cosmos SDK blockchains) does not have fee prioritisation built into it, but instead relies on First In First Out (FIFO) rules, with support for additional rules being added at the application layer as discussed [here](https://medium.com/tendermint/tendermint-v0-35-introduces-prioritized-mempool-a-makeover-to-the-peer-to-peer-network-more-61eea6ec572d). 
    * Gas price is a per validator setting, and is not being exposed anywhere. Most of our validator have their `minimum-gas-price` set to `0.025unyx,0.025unym`, meaning you can pay in either currency. We recommend you pay in `unyx`.  
    * We recommend to use a combination of the `gas=auto` and `gas-adjustment` flags as our validator documentation specifies, and using the `fees` flag as a cap for the amount of tokens you're willing to spend on a transaction. 
        * `gas=auto` will simulate the transaction, and use this simulation to input an amount of gas to be used. 
        * The value of the `gas-adjustment` flag will multiply the simulated amount of gas by itself in case the simulation understimates the amount of gas necessary, which is a known issue with Cosmos SDK chains. 
        * `fees` flag sets an upper limit to the amount you're willing to pay, denominated in `unym`.
        * Example tx from our documentation: 
        ```
        nyxd tx slashing unjail --broadcast-mode=block --from="KEYRING_NAME" --chain-id=nyx --gas=auto --gas-adjustment=1.4 --fees=7000unyx
        ```
    * We are aware this approach is not the most efficient way of handling transaction costs in an automated fashion. However, since these inefficiences equate to < ~$1cent, we believe this is fine for the moment. CosmosSDK will hopefully become more exact in its gas estimation in the future. 
    * Another option would be to set up your own validator which has no minimum gas price - i.e. one that's able to accept free transactions - and then restrict access to that validator to only the infrastructure that you're going to use to be doing NYM transactions. Then you wouldn't have to worry about the gas estimates not being 100% accurate. 

#### Mainnet synchronisation
* I need to run a full node or validator, how can I easily sync? 
    * Please reach out via Telegram or Discord to the Nym team member assisting you with integration. There is a script we will send you that syncs from one of our validators that will allow you to sync quickly. 
