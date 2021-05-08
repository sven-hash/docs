---
title: "Validators"
weight: 30
description: "Nym Validators provide privacy-enhanced credentials based on the testimony of a set of decentralized, blockchain-based issuing authorities."
---

Nym validators secure the network with a staking token, defending the network from Sybil attacks.

Validators also provide privacy-enhanced credentials based on the testimony of a set of decentralized, blockchain-based issuing authorities. Nym validators use a [signature scheme](https://en.wikipedia.org/wiki/Digital_signature) called [Coconut](https://arxiv.org/abs/1802.07344) to issue credentials. This allows privacy apps to generate anonymous resource claims through decentralised authorities, then use them with Service Providers.

The validator is built using [Cosmos SDK](https://cosmos.network) and [Tendermint](https://tendermint.com), with a [CosmWasm](https://cosmwasm.com) smart contract controlling the directory service, node bonding, and delegated mixnet staking. 

### Building the Nym validator

Prerequisites:

* Go 1.15

We use the `wasmd` version of the Cosmos validator to run our blockchain. Check it out and compile it with some extra Go flags in order to get it built, like this: 

```
WASMD_VERSION=v0.14.1
BECH32_PREFIX=hal
git clone https://github.com/CosmWasm/wasmd.git
cd wasmd
git checkout $WASMD_VERSION
mkdir build
go build -o build/nymd -mod=readonly -tags "netgo,ledger" -ldflags "-X github.com/cosmos/cosmos-sdk/version.Name=nymd -X github.com/cosmos/cosmos-sdk/version.AppName=nymd -X github.com/CosmWasm/wasmd/app.NodeDir=.nymd -X github.com/cosmos/cosmos-sdk/version.Version=$WASMD_VERSION -X github.com/cosmos/cosmos-sdk/version.Commit=1920f80d181adbeaedac1eeea1c1c6e1704d3e49 -X github.com/CosmWasm/wasmd/app.Bech32Prefix=$BECH32_PREFIX} -X 'github.com/cosmos/cosmos-sdk/version.BuildTags=netgo,ledger'" -trimpath ./cmd/wasmd  # noqa line-length
```

At this point, you will have a copy of the `nymd` binary in your `build/` directory. Test that it's compiled properly by running it: 

```
./build/nymd
```

You should see `nymd` help text print out. 

`nymd` compiled itself, and also one other binary: a shared object library binary. This is the `libwasmvm.so` wasm virtual machine, which is needed to execute Nym smart contracts). 

When you upload the `nymd` binary to your server, you'll also need to upload the shared library object file. To locate where that file compiled to on your system:

```
WASMVM_SO=$(ldd build/nymd | grep libwasmvm.so | awk '{ print $3 }')
ls $WASMVM_SO
```

This will output something like: 

```
'/home/username/go/pkg/mod/github.com/!cosm!wasm/wasmvm@v0.13.0/api/libwasmvm.so'
```

When you upload your `nymd` binary, you'll need to tell it where `libwasmvm.so` is when you start your validator, or `nymd` will not run. Note that if you were to compile on your server instead, this wouldn't be an issue, as the compiled `nymd` there would already have access to `libwasmvm.so`.

Upload both `build/nymd` and `libwasmvm.so` to your validator machine. If you attempt to run `./nymd` on your server, you'll likely see an error if `nymd` can't find `libwasmvm.so`:

```
./nymd: error while loading shared libraries: libwasmvm.so: cannot open shared object file: No such file or directory
```

You'll need to set `LD_LIBRARY_PATH` in your user's `~/.bashrc` file. While we're at it, we might as well add that to our path:

```
NYM_BINARIES=/home/youruser/path/to/nym/binaries
echo 'export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:'NYM_BINARIES >> ~/.bashrc 
echo 'export PATH=$PATH:'$NYM_BINARIES >> ~/.bashrc 
source ~/.bashrc
```

Change `/home/youruser/path/to/nym/binaries` to wherever you put `nymd` and `libwasmvm.so`. To test everything worked:

```
nymd
```

You should get the regular `nymd` help text.


### Initialize your validator

Choose a name for your validator and use it in place `yourname` in the following command: 

```
nymd init yourname --chain-id testnet-finney
```

At this point, you have a new validator, with its own genesis file which lives in `$HOME/.nymd/config/genesis.json`. You will need to **replace** that with Nym's [testnet-finney genesis file](https://nymtech.net/testnets/finney/genesis.json).

#### config.toml setup

Add the Nym validator as a persistent peer so that your validator can start pulling blocks from the rest of the network, by editing `$HOME/.nymd/config/config.toml`:

* `persistent_peers = "e7163ea63219504344c669164d083f52434f382b@testnet-finney-validator.nymtech.net:26656"` allows your validator to start pulling blocks from other validators
* `cors_allowed_origins = ["*"]` allows the web wallet to make HTTPS requests to your validator. 
* `create_empty_blocks = false` may save a bit of space

#### app.toml setup

In the file `$HOME/.nymd/config/app.toml`, set the following values: 

1. `minimum-gas-prices = "0.025uhal"`
1. `enable = true` in the `[api]` section to get the API server running


### Set up your validator's admin user:

You'll need an admin account to be in charge of your validator. Let's get that set up: 

```
nymd keys add nymd-admin
```

This will add keys for your administrator account to your system's keychain. 

The command output should look something like:

```
$ nymd keys add nymd-admin
Enter keyring passphrase:
password must be at least 8 characters
Enter keyring passphrase:
Re-enter keyring passphrase:

- name: nymd-admin
  type: local
  address: hal}1x4twq82ew2c49ctr36mafksyrtnxwvrkey939u
  pubkey: hal}pub1addwnpepqdfcf5786qry8g8ef9nad5vnl0rs5cmkcywzrwwvvdye27ktjmqw2ygr2hr
  mnemonic: ""
  threshold: 0
  pubkeys: []


**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.

design payment apple input doll left badge never toe claw coconut neither travel side castle know plate unit mercy weekend pelican stay fortune road
```

As the instructions say, remember to **write down your mnemonic**.

You can get the admin account's address with: 

```
nymd keys show nymd-admin -a
```

Type in your keychain password, not the mnemonic, when asked. 


### Start your validator

Everything should now be ready to go. You've got the validator set up, all changes made in `config.toml` and `app.toml`, the Nym genesis file copied into place (replacing your generated one). Now let's validate the whole setup: 

```
nymd validate-genesis
```


Assuming that check passed, you can start up: 

```
nymd start
```

You will likely want to automate validator start on reboot. Here's systemd unit file for that: 

```
[Unit]
Description=Nymd (0.10.0)
StartLimitInterval=350
StartLimitBurst=10

[Service]
User=nym                                                          # change to your user
Type=simple
Environment="LD_LIBRARY_PATH=/home/youruser/path/to/nym/binaries" # change to correct path
ExecStart=/home/youruser/path/to/nym/binaries/nymd start          # change to correct path
Restart=on-failure
RestartSec=30

[Install]
WantedBy=multi-user.target
```

Once your validator starts, it will start requesting blocks from other validators. This may take several hours. Once it's up to date, you can issue a request to join the validator set: 

```
PUB_KEY=$(/home/nym/nymd tendermint show-validator) # e.g. halvalconspub1zcjduepqzw38hj6edjc5wldj3d37hwc4savn0t95uakhy6tmeqqz5wrfmntsnyehsq
MONIKER="nym-secondary"                             # whatever you called your validator during "init"
FROM_ACCOUNT="nym-admin"                            # your keychain name

nymd tx staking create-validator \
  --amount=10000000stake \
  --fees=5000uhal \
  --pubkey="$PUB_KEY" \
  --moniker=$MONIKER \
  --chain-id=testnet-finney \
  --commission-rate="0.10" \
  --commission-max-rate="0.20" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="1" \
  --gas="auto" \
  --gas-adjustment=1.15 \
  --from=$FROM_ACCOUNT \
  --node https://testnet-finney-validator.nymtech.net:443
```

You'll need `stake` coins for this. 

Note: we are currently working towards building up a closed set of reputable validators. You can ask us for coins to get in, but please don't be offended if we say no - validators are part of our system's core security and we are starting out with people we already know or who have a solid reputation. 

### Install nginx and https

Proxying your validator's port 26657 to nginx 80 can be done like this:

```
server {
  listen 80;
  listen [::]:80;
  server_name {{ domain }};

  location / {
                  proxy_pass http://127.0.0.1:26657;
                  proxy_set_header  X-Real-IP $remote_addr;
                  proxy_set_header  Host $host;
                  proxy_set_header  X-Real-IP $remote_addr;
            }

}

```

Then doing:

```
sudo apt install certbot nginx python3
certbot --nginx -d nym-validator.yourdomain.com -m you@yourdomain.com --agree-tos --noninteractive --redirect
```

will get you a working HTTPS encrypted nginx proxy in front of the API. 

In the next testnet we will be focusing more on validator TLS, sentry nodes etc. 
