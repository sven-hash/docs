---
sidebar_label: "Incentives"
description: "Why should you run Nym nodes?"
hide_title: true 
---

<br />

We will get into building the Nym codebase and running nodes in the next section. Before we do so, a note on token incentives.

The Nym network has some of the same overall goals as [Tor](https://tor-project.org). But we want to enable Nym to scale in response to increased demand (and shrink when demand drops, so as not to waste resources). To do this in a decentralized way, nodes are included in the network based on cryptocurrency bonding, and a system of delegated staking.

We are now starting to test out the incentives structure for running Nym nodes. For the Milhon testnet, Nym testnet wallet holders who run nodes or delegate stake to nodes will receive (valueless) testnet tokens, the `PUNK`, which runs on our Cosmos-based blockchain validators.

:::caution
The structure of token rewards will be under experimentation throughout the course of Milhon, and we will be altering them fairly frequently to run experiments and get community feedback. **Milhon Testnet rewards may not reflect how the incentives structure will work on mainnet.**
:::

To get `PUNKs` needed to run a node or delegate to one in the testnet, you will need:

* The Telegram id that you registered with via the Nym bot in the Finney testnet.
* The Identity Key of your Finney mixnode. 
* The HAL wallet address with which you bonded HALs to your mixnode. 

The initial amount of `PUNKs` you receive in Milhon depends on the amount of `HALs` you received during the course of testnet Finney, once that is done we will close the book of `HALs` and will not visit that again. So think of Milhon as a continuation of Finney but with different token names. 

If you have the 3 items listed above, you can head to the [Milhon web wallet](https://testnet-milhon-wallet.nymtech.net/) and create a `PUNK` wallet address for yourself. Make sure to copy, paste and save the mnemonic for that account somewhere safe and do not lose it!

If for any reason you lose your mnemonic after funds have been sent to that address, those funds are lost and they will not be resent. 

You will be able to convert only the amount of `HALs` you have on your Finney node bond (what is being shown on the explorer) plus up to 60 you have in the wallet of the address connected to your mixnode. 


