---
sidebar_label: Nym Wallet
description: "Install and use the Nym Wallet."
hide_title: false
title: Nym Wallet
---


import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';


The Nym Desktop Wallet lets you interact with your Nym node and to delegate stake to others. In future releases, it will also let you access the Nym mixnet.

You can download it for Mac, Windows, or Linux.

[![download nym wallet](/img/docs/download-wallet.png)](https://github.com/nymtech/nym/releases/tag/v0.12.1)

### Bypassing security warnings

On MacOS and Windows, you will see a security warning pop up when you attempt to run the wallet. We are in the process of getting app store keys from Apple and Microsoft so that this doesn't happen. See the section below for details on steps to bypass these. In the meantime, we encourage you to check the authenticity of the your downloads using their file hashes:

* On MacOS 
`openssl md5 nym-wallet_0.12.1_macos_x64.dmg` should return `9a50644c51b01b2fa3d5e2bfd33183b9`

* On Ubuntu20 
`openssl md5 nym-wallet_0.12.1_amd64_ubuntu_20.04.AppImage` should return `52992fa34bf8ed1118010f9d423dfd4a`

* On Windows
`openssl md5 nym-wallet_windows_0.12.1_x64.msi` should return `6afa60c049bfd091fb48a5e099a91347`


#### Linux 

You will need to `chmod +x` the AppImage in the terminal (or give it execute permission in your file browser) before it will run. 

#### MacOS 

* Drag the application to your 'Applications' folder.

* If you double click the application you will see the following warning: 

<ThemedImage
  alt=""
  sources={{
    light: useBaseUrl('/img/docs/wallet-warnings/mac_warning1.png'),
    dark: useBaseUrl('/img/docs/wallet-warnings/mac_warning1.png'),
  }}
/>

Press cancel and ignore this. 

* Go to your system preferences -> security and privacy -> general, and unlock the application. 

<ThemedImage
  alt=""
  sources={{
    light: useBaseUrl('/img/docs/wallet-warnings/mac_warning2.png'),
    dark: useBaseUrl('/img/docs/wallet-warnings/mac_warning2.png'),
  }}
/>

* Right-click on the application, press 'open', and then 'open anyway'. 

<ThemedImage
  alt=""
  sources={{
    light: useBaseUrl('/img/docs/wallet-warnings/mac_warning3.png'),
    dark: useBaseUrl('/img/docs/wallet-warnings/mac_warning3.png'),
  }}
/>

#### Windows 

* Select more-info after clicking the msi installer app: 

<ThemedImage
  alt=""
  sources={{
    light: useBaseUrl('/img/docs/wallet-warnings/windows_warning1.png'),
    dark: useBaseUrl('/img/docs/wallet-warnings/windows_warning1.png'),
  }}
/>

* Proceed to 'run-anyway':

<ThemedImage
  alt=""
  sources={{
    light: useBaseUrl('/img/docs/wallet-warnings/windows_warning2.png'),
    dark: useBaseUrl('/img/docs/wallet-warnings/windows_warning2.png'),
  }}
/>

* Follow the installer instructions: 

<ThemedImage
  alt=""
  sources={{
    light: useBaseUrl('/img/docs/wallet-warnings/windows_warning3.png'),
    dark: useBaseUrl('/img/docs/wallet-warnings/windows_warning3.png'),
  }}
/>

<ThemedImage
  alt=""
  sources={{
    light: useBaseUrl('/img/docs/wallet-warnings/windows_warning4.png'),
    dark: useBaseUrl('/img/docs/wallet-warnings/windows_warning4.png'),
  }}
/>

<ThemedImage
  alt=""
  sources={{
    light: useBaseUrl('/img/docs/wallet-warnings/windows_warning5.png'),
    dark: useBaseUrl('/img/docs/wallet-warnings/windows_warning5.png'),
  }}
/>


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

:::note
Make sure you copy over the contents of the provided `.env.sample` to a new `.env` file before proceeding
:::

You can run the wallet without having to install it in development mode by running the following terminal command from the `nym-wallet` folder

```
yarn dev
```

This will then start the Wallet GUI and produce a binary in `nym-wallet/target/debug/` named `nym-wallet`. 

### Running in Production Mode

:::note
Make sure you copy over the contents of the provided `.env.sample` to a new `.env` file before proceeding
:::

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

