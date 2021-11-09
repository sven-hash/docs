---
sidebar_label: Nym Wallet
description: "Install and use the Nym Wallet."
hide_title: false
title: Nym Wallet
---

A Rust and Tauri desktop wallet implementation which gives access to the Nym mixnet, serving as a point of connection to interact with your node and to delegate stake to others! 

:::note 

Unlike the rest of the Nym codebase, the Nym Desktop Wallet is currently built via Yarn. Follow this doc for the instructions to do so. 

<!-- Pre-compiled versions of the Wallet for Mac, Windows, and Linux (compiled on Ubuntu 20) can be found [here](https://github.com/nymtech/nym/releases?q=wallet&expanded=true).  -->

:::

### Building the Nym Desktop Wallet

#### Prerequisites

- `git`

```
sudo apt update
sudo apt install git
```

Verify `git` is installed with:

```
git version
# Should return: git version X.Y.Z
```

- `Yarn`

- `NodeJS >= v16.8.0`

- `Rust & cargo >= v1.56`

We recommend using the [Rust shell script installer](https://www.rust-lang.org/tools/install). Installing cargo from your package manager (e.g. `apt`) is not recommended as the packaged versions are usually too old.

If you really don't want to use the shell script installer, the [Rust installation docs](https://forge.rust-lang.org/infra/other-installation-methods.html) contain instructions for many platforms.

#### Additional prerequisites for Windows

- When running on Windows you will need to install c++ build tools
- An easy guide to get rust up and running can be found [here]("http://kennykerr.ca/2019/11/18/rust-getting-started/")
- When installing NodeJS please use the `current features` version
- Using a package manager like [Chocolatey]("chocolatey.org") is recommended

#### Installation

Inside of the `nym-wallet` folder, run:

```
yarn install
``` 

### Running in Development Mode

You can run the wallet without having to install it in development mode by running the following terminal command from the `tauri-wallet` folder

```
yarn dev
```

This will then start the Wallet GUI. 

### Running in Production Mode

To build and install the wallet, run the following terminal command from the `nym-wallet` folder

```
yarn build
```

This will build an executable file that you can use to install the wallet on your machine. 

### Install the wallet

Once the the building process is complete an installation file can be found in: `nym-wallet/target/release/nym_wallet`. 
