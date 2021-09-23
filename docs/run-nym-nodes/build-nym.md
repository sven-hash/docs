---
sidebar_label: "Building Nym"
description: "How to build the Nym platform. Nym is relatively simple to build and run on Mac OS X, Linux, and Windows."
hide_title: false
title: Building Nym
---

 

:::note

This page details how to build the main Nym platform code, in Rust. **If you want to build and run a validator, [go here](/docs/current/run-nym-nodes/validators) instead.**

:::


Nym runs on Mac OS X, Linux, and Windows. Windows should be considered experimental - it works fine if you're an app developer but isn't recommended for running nodes.

### Prerequisites:

- (Debian/Ubuntu) `pkg-config`, `build-essential`, `libssl-dev`, `curl`, `jq`

```
sudo apt update
sudo apt install pkg-config build-essential libssl-dev curl jq
```

- `Rust & cargo >= v1.51`

We recommend using the [Rust shell script installer](https://www.rust-lang.org/tools/install). Installing cargo from your package manager (e.g. `apt`) is not recommended as the packaged versions are usually too old.

If you really don't want to use the shell script installer, the [Rust installation docs](https://forge.rust-lang.org/infra/other-installation-methods.html) contain instructions for many platforms.

### Download & build Nym Mixnode, Gateway, and Clients binaries:

The following commands will compile binaries into the `nym/target/release` directory:

```
rustup update
git clone https://github.com/nymtech/nym.git
cd nym
git reset --hard # in case you made any changes on your branch
git pull # in case you've checked it out before

# Note: the default branch you clone from Github, `develop`, is guaranteed to be
# broken and incompatible with the running testnet at all times. You *must*
# `git checkout tags/v0.11.0` in order to join the testnet.

git checkout tags/v0.11.0
cargo build --release
```

Quite a bit of stuff gets built. The key working parts are:

1. the [mixnode](/docs/current/run-nym-nodes/mixnodes): `nym-mixnode`
2. the [gateway node](/docs/current/run-nym-nodes/gateways): `nym-gateway`
3. the [websocket client](/docs/current/build-apps/websocket-client): `nym-client`
4. the [socks5 client](/docs/current/use-apps/index): `nym-socks5-client`
5. the [network requester](/docs/current/run-nym-nodes/requester): `nym-network-requester`

