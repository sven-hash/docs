---
sidebar_label: "Nym Connect"
description: "Nym is a blockchain-based privacy platform. It provides strong network-level privacy against sophisticated end-to-end attackers, and anonymous transactions using blinded, re-randomizable, decentralized credentials."
hide_title: false
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

# Nym Connect

Nym Connect app lets you send traffic through Nym mixnet for supported applications.

You can download it for Mac, Windows or Linux PCs.

[Download Nym Connect](https://github.com/nymtech/nym/releases/tag/nym-connect-v1.0.2)

### Bypassing security warnings

On Windows you will see a security warning pop up when you attempt to run Nym connect. We are in the process of getting app store keys from Microsoft so that this doesn't happen. See the section below for details on steps to bypass these.

#### Linux

You will need to `chmod +x` the AppImage in the terminal (or give it execute permission in your file browser) before it will run.

#### Mac OS

After downloading, double click or drag to your applications directory and right click to select open.

<ThemedImage
alt=""
sources={{
    light: useBaseUrl('/img/docs/nym-mac-install-drag.png'),
    dark: useBaseUrl('/img/docs/nym-mac-install-drag.png'),
  }}
/>

Drag Nym Connect to your applications icons then on your iFinder, search and open Nym Connect. You might run into this error just click Open to continue.

<ThemedImage
alt=""
sources={{
    light: useBaseUrl('/img/docs/nym-mac-warning.png'),
    dark: useBaseUrl('/img/docs/nym-mac-warning.png'),
  }}
/>

<ThemedImage
alt=""
sources={{
    light: useBaseUrl('/img/docs/nym-connect-app.png'),
    dark: useBaseUrl('/img/docs/nym-connect-app.png'),
  }}
/>

Select any of the supported services and hit the big connect button to start the proxy. Once you've done this, you can go to the application and add your proxy address to start using the application and pushing traffic through Nym mixnet.

![Nym connect app](/img/docs/keybase-demo.gif)

### Building from source

:::info
Please note that Nym Connect has currently only been built on the operating systems for Mac OS, Debian and Windows. If you find an issue or any additional prerequisties, please create an issue or PR against `develop` on [Github](https://github.com/nymtech/docs).
:::

### Software prerequisites for building Nym Connect

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

### Download Nym Connect

```
rustup update
git clone https://github.com/nymtech/nym.git
git reset --hard # in case you made any changes on your branch
git pull # in case you've checked it out before
cd nym/nym-connect # navigate into nym-connect directory
```

### Removing signing errors when building in development mode

If you're wanting to build Nym connect yourself, you will need to make a few modifications to the file located at `nym-connect/src-tauri/tauri.conf.json` before doing so. These relate to Nym connect being accepted by Mac and Windows app stores, and so aren't relevant to you when building and running Nym connect yourself.

On **all** operating systems:

- set the value of line 49 to `false`
- remove lines 50 to 54

As well as these modifications for MacOS and Windows users:

- MacOS users must also remove line 39
- Windows users must remove lines 42 to 46

### Installation

Once you have made these modifications to `tauri.conf.json`, inside of the `nym-connect` folder, run:

```
yarn install
```

### Building

To build and install Nym connect, run the following terminal command from the `nym-connect` folder

```
yarn build
```

### Running in Development Mode

:::note
Make sure you copy over the contents of the provided `.env.sample` to a new `.env` file before proceeding
:::

You can run Nym connect without having to install it in development mode by running the following terminal command from the `nym-connect` folder

```
yarn dev
```

This will then start Nym Connect UI and produce a binary in `nym-connect/target/debug/` named `nym-connect`.

### Running in Production Mode

:::note
Make sure you copy over the contents of the provided `.env.sample` to a new `.env` file before proceeding
:::

To build and install Nym connect, run the following terminal command from the `nym-connect` folder

```
yarn build
```

This will build an executable file that you can use to install Nym Connect on your machine. The output will compile different types of binaries dependent on your hardware / OS system. Once the binaries are built, they can be located as follows:

```
Binary output directory structure
**macos**
|
└─── target/release
|   |─ nym-connect
└───target/release/bundle/dmg
│   │─ bundle_dmg.sh
│   │─ nym-connect.*.dmg
└───target/release/bundle/macos/MacOs
│   │─ nym-connect
|
**Linux**
└─── target/release
|   │─  nym-connect
└───target/release/bundle/appimage
│   │─  nym-connect_*_.AppImage
│   │─  build_appimage.sh
└───target/release/bundle/deb
│   │─  nym-connect_*_.deb
|
**Windows**
└─── target/release
|   │─  nym-conenct.exe
└───target/release/bundle/msi
│   │─  nym-connect_*_.msi
```
