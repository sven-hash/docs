---
sidebar_label: Nym Wallet
description: "Install and use the Nym Wallet."
hide_title: false
title: Nym Wallet
---

The Nym Desktop Wallet lets you interact with your Nym node and to delegate stake to others. In future releases, it will also let you access the Nym mixnet.

You can download it for Mac, Windows, or Linux.

[![download nym wallet](/img/docs/download-wallet.png)](https://github.com/nymtech/nym/releases/tag/nym-wallet-v0.1.0)

The wallet is currently an early release version. If you find any bugs, please [report them to our QA team](https://github.com/nymtech/nym/issues/new?assignees=tommyv1987&labels=bug%2C+bug-needs-triage%2C+qa&template=report.md&title=%5BIssue%5D).

On MacOS and Windows, you will see a security warning pop up when you attempt to run the wallet. We are in the process of getting app store keys from Apple and Microsoft so that this doesn't happen. In the meantime, we encourage you to check the authenticity of the your downloads using their file hashes.

On Mac: 

* `shasum -a 256 nym-wallet_macos_0.1.0_aarch64.dmg` should return `74ff83d122d7cf3525e08e8f0d3d2c15c9e76878ae3f4073180111ef2a231990`
* `shasum -a 256 nym-wallet_macos_0.1.0_x64.dmg` should return `54f1076e0dfc936c832e2b2c356afb6b789bc2ef4ba68a2cea183144f5677820`

On Windows:

* `sha256.exe nym-wallet_windows_0.1.0_x64.msi` should return `2a70b923123ddea4ae875a7710d8830b65380625ef1bcf989d3c53ad56ad6b46`

On Linux: 

* `sha256sum nym-wallet_linux_0.1.0_amd64.AppImage` should return `e4a850094d14789c77d17aba815ca4f06b95a3cb509c2dceb92cf5bc16c959cf`


You will need to `chmod +x nym-wallet_linux_0.1.0_amd64.AppImage` in the terminal (or give it execute permission in your file browser) before it will run. 


### For developers

If you would like to the compile the wallet yourself, follow the instructions below. 

:::info
Please note that the wallet has currently only been built on the operating systems for which there are binaries as listed above. If you find an issue or any additional prerequisties, please create an issue or PR against `develop` on [Github](https://github.com/nymtech/docs).
:::

#### Prerequisites for building the wallet


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

- [Yarn](https://yarnpkg.com/)

- `NodeJS >= v16.8.0`

- `Rust & cargo >= v1.56`

We recommend using the [Rust shell script installer](https://www.rust-lang.org/tools/install). Installing cargo from your package manager (e.g. `apt`) is not recommended as the packaged versions are usually too old.

If you really don't want to use the shell script installer, the [Rust installation docs](https://forge.rust-lang.org/infra/other-installation-methods.html) contain instructions for many platforms.

#### Additional prerequisites for Ubuntu/Debian systems

```
sudo apt update
sudo apt install pkg-config build-essential libssl-dev curl jq
```

#### Additional prerequisites for Windows

- When running on Windows you will need to install the `c++` build tools.
- An easy guide to get Rust up and running can be found [here](http://kennykerr.ca/2019/11/18/rust-getting-started/).
- When installing `NodeJS` please use the `current features` version.
- Using a package manager like [Chocolatey](https://chocolatey.org/) is recommended.

### Installation

Inside of the `nym-wallet` folder, run:

```
yarn install
``` 

### Running in Development Mode

You can run the wallet without having to install it in development mode by running the following terminal command from the `nym-wallet` folder

```
yarn dev
```

This will then start the Wallet GUI and produce a binary in `nym-wallet/target/debug/` named `nym-wallet`. 

### Running in Production Mode

To build and install the wallet, run the following terminal command from the `nym-wallet` folder

```
yarn build
```

This will build an executable file that you can use to install the wallet on your machine. The output will compile different types of binaries dependent on your hardware / OS system. Once the binaries are built, they can be located as follows:

```
Binary output directory structure
**macos**
|
└─── target/release
|   |─ nym-wallet
└───target/release/bundle/dmg
│   │─ bundle_dmg.sh
│   │─ nym-wallet.*.dmg
└───target/release/bundle/macos/MacOs
│   │─ nym-wallet
|
**Linux**
└─── target/release
|   │─  nym-wallet
└───target/release/bundle/appimage
│   │─  nym-wallet_*_.AppImage
│   │─  build_appimage.sh
└───target/release/bundle/deb
│   │─  nym-wallet_*_.deb
|
**Windows**
└─── target/release
|   │─  nym-wallet.exe
└───target/release/bundle/msi
│   │─  nym-wallet_*_.msi
```