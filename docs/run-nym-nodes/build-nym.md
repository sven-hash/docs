---
sidebar_label: "Building Nym"
description: "How to build the Nym platform. Nym is relatively simple to build and run on Mac OS X, Linux, and Windows."
hide_title:  false
title: Building Nym
---

Nym runs on Mac OS X, Linux, and Windows. All nodes **except the Desktop Wallet** on Windows should be considered experimental - it works fine if you're an app developer but isn't recommended for running nodes. 

### Building Nym

Nym has two main codebases:

- the Nym platform, written in Rust. This contains all of our code _except_ for the validators.
- the Nym validators, written in Go.

:::note
This page details how to build the main Nym platform code. **If you want to build and run a validator, [go here](/docs/next/run-nym-nodes/nodes/validators) instead.**
:::

### Prerequisites

- (Debian/Ubuntu) `pkg-config`, `build-essential`, `libssl-dev`, `curl`, `jq`, `git`

```
sudo apt update
sudo apt install pkg-config build-essential libssl-dev curl jq git
```

- `Rust & cargo >= v1.56`

We recommend using the [Rust shell script installer](https://www.rust-lang.org/tools/install). Installing cargo from your package manager (e.g. `apt`) is not recommended as the packaged versions are usually too old.

If you really don't want to use the shell script installer, the [Rust installation docs](https://forge.rust-lang.org/infra/other-installation-methods.html) contain instructions for many platforms.

### Download and build Nym binaries

The following commands will compile binaries into the `nym/target/release` directory:

```
rustup update
git clone https://github.com/nymtech/nym.git
cd nym

git reset --hard # in case you made any changes on your branch
git pull # in case you've checked it out before

git checkout release/v1.1.2 # checkout to the latest release branch: `develop` will most likely be incompatible with deployed public networks  

cargo build --release # build your binaries with **mainnet** configuration
NETWORK=sandbox cargo build --release # build your binaries with **sandbox** configuration 
```

Quite a bit of stuff gets built. The key working parts are:

1. the [mixnode](/docs/next/run-nym-nodes/nodes/mixnodes): `nym-mixnode`
2. the [gateway node](/docs/next/run-nym-nodes/nodes/gateways): `nym-gateway`
3. the [websocket client](/docs/next/integrations/websocket-client): `nym-client`
4. the [socks5 client](/docs/next/integrations/socks5-client): `nym-socks5-client`
5. the [network requester](/docs/next/run-nym-nodes/nodes/requester): `nym-network-requester`
6. the [network explorer api](/docs/next/run-nym-nodes/nodes/network-explorer): `explorer-api`
7. the [nym-cli tool](/docs/next/nym-cli): `nym-cli` 

The repository also contains two Typescript applications which aren't built in this process: the [Nym Wallet](docs/next/wallet) and the [Network Explorer UI](docs/next/run-nym-nodes/nodes/network-explorer). Both of these can be built by following the instructions on their respective docs pages. 

:::note
You cannot build from GitHub's .zip or .tar.gz archive files on the releases page - the Nym build scripts automatically include the current git commit hash in the built binary during compilation, so the build will fail if you use the archive code (which isn't a Git repository). Check the code out from github using `git clone` instead. 
:::

