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

- `Go >= v1.15`
- `gcc`

We use the `wasmd` version of the Cosmos validator to run our blockchain. Run this to clone, compile, and build it:

```sh
WASMD_VERSION=v0.14.1
BECH32_PREFIX=hal
git clone https://github.com/CosmWasm/wasmd.git
cd wasmd
git checkout ${WASMD_VERSION}
mkdir build
go build -o build/nymd -mod=readonly -tags "netgo,ledger" -ldflags "-X github.com/cosmos/cosmos-sdk/version.Name=nymd -X github.com/cosmos/cosmos-sdk/version.AppName=nymd -X github.com/CosmWasm/wasmd/app.NodeDir=.nymd -X github.com/cosmos/cosmos-sdk/version.Version=${WASMD_VERSION} -X github.com/cosmos/cosmos-sdk/version.Commit=1920f80d181adbeaedac1eeea1c1c6e1704d3e49 -X github.com/CosmWasm/wasmd/app.Bech32Prefix=${BECH32_PREFIX} -X 'github.com/cosmos/cosmos-sdk/version.BuildTags=netgo,ledger'" -trimpath ./cmd/wasmd  
```

At this point, you will have a copy of the `nymd` binary in your `build/` directory. Test that it's compiled properly by running:

```sh
./build/nymd
```

You should see `nymd` help text print out.

Both `nymd` the `libwasmvm.so` shared object library binary have been compiled. `libwasmvm.so` is the wasm virtual machine which is needed to execute Nym smart contracts.

> If you have compiled these files locally you need to upload both of them to the server on which the validator will run. **If you have instead compiled them on the server skip to the step outlining setting `LD_LIBRARY PATH` below.** To locate these files on your local system run:
```sh
WASMVM_SO=$(ldd build/nymd | grep libwasmvm.so | awk '{ print $3 }')
ls ${WASMVM_SO}
```
This will output something like:
```sh
'/home/username/go/pkg/mod/github.com/!cosm!wasm/wasmvm@v0.13.0/api/libwasmvm.so'
```
When you upload your `nymd` binary, you'll need to tell it where `libwasmvm.so` is when you start your validator, or `nymd` will not run. If you have compiled them on your server then this is not necessary, as the compiled `nymd` already has access to `libwasmvm.so`.
Upload both `build/nymd` and `libwasmvm.so` to your validator machine. If you attempt to run `./nymd` on your server, you'll likely see an error if `nymd` can't find `libwasmvm.so`:
```sh
./nymd: error while loading shared libraries: libwasmvm.so: cannot open shared object file: No such file or directory
```


You'll need to set `LD_LIBRARY_PATH` in your user's `~/.bashrc` file, and add that to our path. Replace `/home/youruser/path/to/nym/binaries` in the command below to the locations of `nymd` and `libwasmvm.so` and run it. If you have compiled these on the server, they will be in the `build/` folder:


```sh
NYM_BINARIES=/home/youruser/path/to/nym/binaries
echo 'export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:'NYM_BINARIES >> ~/.bashrc
echo 'export PATH=$PATH:'${NYM_BINARIES} >> ~/.bashrc
source ~/.bashrc
```

 Test everything worked:

```sh
nymd
```

This should return the regular `nymd` help text.

### Initialize your validator

Choose a name for your validator and use it in place of `yourname` in the following command (this will return a block of json data in your console):

```sh
nymd init yourname --chain-id testnet-finney
```

At this point, you have a new validator, with its own genesis file which lives in `$HOME/.nymd/config/genesis.json`. You will need to **replace the contents of that file** that with Nym's [testnet-finney genesis file](https://nymtech.net/testnets/finney/genesis.json).

#### config.toml setup

Add the Nym validator as a persistent peer so that your validator can start pulling blocks from the rest of the network, by editing the following config options in `$HOME/.nymd/config/config.toml` to match the information below:

- `cors_allowed_origins = ["*"]` allows the web wallet to make HTTPS requests to your validator.
- `persistent_peers = "e7163ea63219504344c669164d083f52434f382b@testnet-finney-validator.nymtech.net:26656"` allows your validator to start pulling blocks from other validators
- `create_empty_blocks = false` may save a bit of space

Optionally, if you want to enable [Prometheus](https://prometheus.io/) metrics then the following must also match in the `config.toml`:

- `prometheus = true`
- `prometheus_listen_addr = ":26660"`

And if you wish to add a human-readable moniker to your node:

- `moniker = "yourname"`


#### app.toml setup

In the file `$HOME/.nymd/config/app.toml`, set the following values:

1. `minimum-gas-prices = "0.025uhal"`
1. `enable = true` in the `[api]` section to get the API server running

### Set up your validator's admin user:

You'll need an admin account to be in charge of your validator. Set that up with:

```sh
nymd keys add nymd-admin
```

This will add keys for your administrator account to your system's keychain.

The command output should look something like:

```sh
$ nymd keys add nymd-admin
Enter keyring passphrase:
password must be at least 8 characters
Enter keyring passphrase:
Re-enter keyring passphrase:

- name: nymd-admin
  type: local
  address: hal1x4twq82ew2c49ctr36mafksyrtnxwvrkey939u
  pubkey: halpub1addwnpepqdfcf5786qry8g8ef9nad5vnl0rs5cmkcywzrwwvvdye27ktjmqw2ygr2hr
  mnemonic: ""
  threshold: 0
  pubkeys: []


**Important** write this mnemonic phrase in a safe place.
It is the only way to recover your account if you ever forget your password.

design payment apple input doll left badge never toe claw coconut neither travel side castle know plate unit mercy weekend pelican stay fortune road
```

As the instructions say, remember to **write down your mnemonic**.

You can get the admin account's address with:

```sh
nymd keys show nymd-admin -a
```

Type in your keychain **password**, not the mnemonic, when asked. The output should look something like this:

```sh
hal1x4twq82ew2c49ctr36mafksyrtnxwvrkey939u
```

### Start your validator

Everything should now be ready to go. You've got the validator set up, all changes made in `config.toml` and `app.toml`, the Nym genesis file copied into place (replacing the initial auto-generated one). Now let's validate the whole setup:

```sh
nymd validate-genesis
```

If this check passes, you should receive the following output:

```sh
File at /path/to/.nymd/config/genesis.json is a valid genesis file
```

Assuming that check passed, you can start it up with the command below (it is recommended to start it using `tmux` or `screen` for ease later on if you do not automate your validator with `systemd` as described below):

```sh
nymd start
```

>If this test did not pass, check that you have replaced the contents of `/path/to/.nymd/config/genesis.json` with that of the [testnet-finney genesis file](https://nymtech.net/testnets/finney/genesis.json).

Once your validator starts, it will start requesting blocks from other validators. This may take several hours. Once it's up to date, you can issue a request to join the validator set:

```sh
PUB_KEY=$(/home/youruser/path/to/nym/binaries/nymd tendermint show-validator) # e.g. halvalconspub1zcjduepqzw38hj6edjc5wldj3d37hwc4savn0t95uakhy6tmeqqz5wrfmntsnyehsq
MONIKER="nym-secondary"                                                       # whatever you called your validator
FROM_ACCOUNT="nymd-admin"                                                     # your keychain name

nymd tx staking create-validator \
  --amount=10000000stake \
  --fees=5000uhal \
  --pubkey="${PUB_KEY}" \
  --moniker=${MONIKER} \
  --chain-id=testnet-finney \
  --commission-rate="0.10" \
  --commission-max-rate="0.20" \
  --commission-max-change-rate="0.01" \
  --min-self-delegation="1" \
  --gas="auto" \
  --gas-adjustment=1.15 \
  --from=${FROM_ACCOUNT} \
  --node https://testnet-finney-validator.nymtech.net:443
```

You'll need `stake` coins for this.

Note: we are currently working towards building up a closed set of reputable validators. You can ask us for coins to get in, but please don't be offended if we say no - validators are part of our system's core security and we are starting out with people we already know or who have a solid reputation.

### Automating your validator with systemd
You will most likely want to automate your validator restarting if your server reboots. Below is a systemd unit file for that:

```ini
[Unit]
Description=Nymd (0.10.0)

[Service]
User=nym                                                          # change to your user
Type=simple
Environment="LD_LIBRARY_PATH=/home/youruser/path/to/nym/binaries" # change to correct path
ExecStart=/home/youruser/path/to/nym/binaries/nymd start          # change to correct path
Restart=on-failure
RestartSec=30
StartLimitInterval=350
StartLimitBurst=10

[Install]
WantedBy=multi-user.target
```

### Install and configure nginx for HTTPS
#### Setup
Install `nginx` and open ports 80 and 443 in your firewall (most Debain installations will come with `ufw` as standard) with:

```sh
sudo ufw allow "Nginx Full"
sudo ufw status
```

If the output of the last command is `inactive`, then enable `ufw` with:
```sh
sudo ufw enable
```

Followed by `Y` when prompted.

Check nginx is running via systemctl:

```sh
systemctl status nginx
```

Which should return:
```sh
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2018-04-20 16:08:19 UTC; 3 days ago
     Docs: man:nginx(8)
 Main PID: 2369 (nginx)
    Tasks: 2 (limit: 1153)
   CGroup: /system.slice/nginx.service
           ├─2369 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─2380 nginx: worker process
```

#### Configuration

Allow your server to listen for ssl connections:
```json
server {
    listen              443 ssl;
    server_name         www.example.com;
    ssl_certificate     www.example.com.crt;
    ssl_certificate_key www.example.com.key;
    ssl_protocols       TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers         HIGH:!aNULL:!MD5;
    ...
}
```

Proxying your validator's port 26657 to nginx port 80 can then be done with the following:

```json
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

Followed by:

```sh
sudo apt install certbot nginx python3
certbot --nginx -d nym-validator.yourdomain.com -m you@yourdomain.com --agree-tos --noninteractive --redirect
```

These commands will get you an HTTPS encrypted nginx proxy in front of the API.

In the next testnet we will be focusing more on things such as validator TLS and sentry nodes.

### Additional firewall configuration

As well as ports 443 and 80 enabled in the section above, enable the remaining necessary ports by running `sudo ufw allow` with ports `1317`, `26656`, `26660`, and `22`.

Make sure that you `/path/to/ufw` file includes:

```sh
IPV6=yes
```

### Unjailing your validator

If for some reason your validator gets jailed, you can fix it with following:

```sh

nymd tx slashing unjail \
  --broadcast-mode=block \
  --from=nymd-admin \         # your keys name you used in the earlier step when creating admin user keys
  --chain-id=testnet-finney \
  --gas=auto \
  --gas-adjustment=1.4 \
  --fees=7000uhal
```
