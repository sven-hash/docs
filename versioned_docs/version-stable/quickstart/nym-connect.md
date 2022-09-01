---
sidebar_label: "Nym Connect"
description: "Nym is a blockchain-based privacy platform. It provides strong network-level privacy against sophisticated end-to-end attackers, and anonymous transactions using blinded, re-randomizable, decentralized credentials."
hide_title: false
---

# Nym Connect

Follow this guide to install and run Nym connect.

### Step 1. Download

Get the latest release of nym connect app [here](https://github.com/nymtech/nym/releases/tag/nym-connect-v1.0.2).

:::note
Nym connect build for linux currently supports only **debian**. If you wish to run on another distro that is not debian, you'll need to build from source. To build from source, you'll also need a [Developer ID Application](https://developer.apple.com/support/developer-id/).
:::

#### Building from source

```
rustup update
git clone https://github.com/nymtech/nym.git
git reset --hard # in case you made any changes on your branch
git pull # in case you've checked it out before
cd nym/nym-connect # navigate into nym-connect directory
yarn  # this command will install all related dependencies
yarn build # since this is rust related project, this command will compile build both rust and typescript parts of nym-connect

cd target/release # path to nym connect
./nym-connect # to start nym connect
```

### Step 2. Run

After installation, proceed to running the app and select the service you wish to run.
![Nym connect app](/img/docs/nym-connect-app.png)

### Step 3. Connect

Hit the big connect button to start the proxy.

### Step 4. Proxy setting

Now proceed to the service you selected. On the proxy section of the app, add the Sock5 Proxy address and port number provided to you on Nym connect and you can proceed to use the application with privacy guaranteed.
