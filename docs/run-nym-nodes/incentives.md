---
sidebar_label: "Network Incentives"
description: "Why should you run Nym nodes?"
hide_title: false
title: Network Incentives
---

The Nym network has some of the same overall goals as [Tor](https://tor-project.org). But we want to enable Nym to scale in response to increased demand (and shrink when demand drops, so as not to waste resources). To do this in a decentralized way, nodes are included in the network based on cryptocurrency bonding, and a system of delegated staking.

There are 2 public networks currently: the (now permanent) Sandbox testnet, and the Nym mainnet. 

## Nym Mainnet

Node operators earn `NYM` tokens for performing their different operations. See the different pages of each node type for more on their specific tasks in the `nodes` section of the sidebar for more information.  

### Joining mainnet
Users who hold `NYM` tokens will be able to use their tokens to purchase access to the mixnet, bond nodes, and stake these tokens on existing nodes to earn rewards via the Desktop Wallet. 

The majority of users will not need to run a node to gain network rewards; we recommend anyone who wishes to contribute to the network in a non-technical way to delegate their stake to existing node operators via the Desktop Wallet. 

If you are technically-minded, feel run a gateway or mixnode! We recommend people run gateways, as we have enough mixnodes from the various testnets we've iterated through recently. 

In the future you will also be able to earn by spinning up a service provider if you want to serve the network differently, and reimburse the service credentials users pay you for using your service. Service credentials will be able to be reimbured for `NYM` from the Validators. 

## Sandbox Testnet 
Sandbox is not incentivized but it includes `NYMT` test-tokens designed to mimic the tokenomics of the Nym mainnet. `NYMT`s have no real world utility but node operators or delegators will receive `NYMT`s to see how the economics, reward sharing and other mechanisms of the Nym mainnet works.

:::caution
Testnet rewards may not exactly reflect how the incentives structure work on mainnet but they will be very close to it!
:::

### Joining the Sandbox Testnet as a participant of Milhon 
Existing members of the Milhon testnet were automatically moved over to Sandbox when it launched, as were the balances of their wallets and nodes. These balances are based on a snapshot taken at 15:00 UDT 20th December 2021.  

### Joining the Sandbox Testnet as a new participant 
There is a `NYMT` faucet [here](https://faucet.nymtech.net/). These tokens can be used to bond nodes and delegate to existing Sandbox nodes.  
    
:::caution
If for any reason you lose your mnemonic, the tokens held in your account are lost, and they will **not** be able to be returned to you. 
:::

## Network Rewards

Node operator and delegator rewards are determined according to the principles laid out in the section 6 of [Nym Whitepaper](https://nymtech.net/nym-whitepaper.pdf). 

Below is a TLDR of the variables and formulas involved in calculating these rewards per epoch. The initial reward pool contains 250 million NYM, leaving a circulating supply of 750 million NYM.

|Symbol|Definition|
|---|---|
|<img src="https://render.githubusercontent.com/render/math?math=R"></img>|global share of rewards available, starts at 2% of the reward pool. 
|<img src="https://render.githubusercontent.com/render/math?math=R_{i}"></img>|node reward for mixnode `i`.
|<img src="https://render.githubusercontent.com/render/math?math=\sigma_{i}"></img>|ratio of total node stake (node bond + all delegations) to the token circulating supply.
|<img src="https://render.githubusercontent.com/render/math?math=\lambda_{i}"></img>|ratio of stake operator has pledged to their node to the token circulating supply.
|<img src="https://render.githubusercontent.com/render/math?math=\omega_{i}"></img>|fraction of total effort undertaken by node `i`, set to `1/k` in testnet Sandbox.
|<img src="https://render.githubusercontent.com/render/math?math=k"></img>|number of nodes stakeholders are incentivised to create, set by the validators, a matter of governance. Currently determined by the reward set size, and set to 720 in testnet Sandbox.
|<img src="https://render.githubusercontent.com/render/math?math=\alpha"></img>|Sybil attack resistance parameter - the higher this parameter is set the stronger the reduction in competitivness gets for a Sybil attacker.
|<img src="https://render.githubusercontent.com/render/math?math=PM_{i}"></img>|declared profit margin of operator `i`, defaults to 10% in testnet Sandbox.
|<img src="https://render.githubusercontent.com/render/math?math=PF_{i}"></img>|uptime of node `i`, scaled to 0 - 1, for the rewarding epoch
|<img src="https://render.githubusercontent.com/render/math?math=PP_{i}"></img>|cost of operating node `i` for the duration of the rewarding eopoch, set to 40 Nym for testnet Sandbox.

Node reward for node `i` is determined as:

<img src="https://render.githubusercontent.com/render/math?math=R_{i}=PF_{i} \cdot R \cdot (\sigma^'_{i} \cdot \omega_{i} \cdot k %2b \alpha \cdot \lambda^'_{i} \cdot \sigma^'_{i} \cdot k)/(1 %2b \alpha)"></img>


where:

<img src="https://render.githubusercontent.com/render/math?math=\sigma^'_{i} = min\{\sigma_{i}, 1/k\}"></img>


and

<img src="https://render.githubusercontent.com/render/math?math=\lambda^'_{i} = min\{\lambda_{i}, 1/k\}"></img>


Operator of node `i` is credited with the following amount:

<img src="https://render.githubusercontent.com/render/math?math=min\{PP_{i},R_{i})\} %2b max\{0, (PM_{i} %2b (1 - PM_{i}) \cdot \lambda_{i}/\delta_{i}) \cdot (R_{i} - PP_{i})\}"></img>


Delegate with stake `s` recieves:

<img src="https://render.githubusercontent.com/render/math?math=max\{0, (1-PM_{i}) \cdot (s^'/\sigma_{i}) \cdot (R_{i} - PP_{i})\}"></img>


where `s'` is stake `s` scaled over total token circulating supply.


