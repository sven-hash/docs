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

- Go 1.15

We use the `wasmd` version of the Cosmos validator to run our blockchain. Check it out and compile it with some extra Go flags in order to get it built, like this:

```sh
WASMD_VERSION=v0.14.1
BECH32_PREFIX=hal
git clone https://github.com/CosmWasm/wasmd.git
cd wasmd
git checkout ${WASMD_VERSION}
mkdir build
go build -o build/nymd -mod=readonly -tags "netgo,ledger" -ldflags "-X github.com/cosmos/cosmos-sdk/version.Name=nymd -X github.com/cosmos/cosmos-sdk/version.AppName=nymd -X github.com/CosmWasm/wasmd/app.NodeDir=.nymd -X github.com/cosmos/cosmos-sdk/version.Version=${WASMD_VERSION} -X github.com/cosmos/cosmos-sdk/version.Commit=1920f80d181adbeaedac1eeea1c1c6e1704d3e49 -X github.com/CosmWasm/wasmd/app.Bech32Prefix=${BECH32_PREFIX} -X 'github.com/cosmos/cosmos-sdk/version.BuildTags=netgo,ledger'" -trimpath ./cmd/wasmd # noqa line-length
```

At this point, you will have a copy of the `nymd` binary in your `build/` directory. Test that it's compiled properly by running it:

```sh
./build/nymd
```

You should see `nymd` help text print out.

`nymd` compiled itself, and also one other binary: a shared object library binary. This is the `libwasmvm.so` wasm virtual machine, which is needed to execute Nym smart contracts).

When you upload the `nymd` binary to your server, you'll also need to upload the shared library object file. To locate where that file compiled to on your system:

```sh
WASMVM_SO=$(ldd build/nymd | grep libwasmvm.so | awk '{ print $3 }')
ls ${WASMVM_SO}
```

This will output something like:

```sh
'/home/username/go/pkg/mod/github.com/!cosm!wasm/wasmvm@v0.13.0/api/libwasmvm.so'
```

When you upload your `nymd` binary, you'll need to tell it where `libwasmvm.so` is when you start your validator, or `nymd` will not run. Note that if you were to compile on your server instead, this wouldn't be an issue, as the compiled `nymd` there would already have access to `libwasmvm.so`.

Alternatively, you can check out the repository for `nym` at <https://github.com/nymtech/nym> and use the tag for the current release with:

```sh
git clone https://github.com/nymtech/nym.git
cd nym
git reset --hard   # in case you made any changes on your branch
git pull           # in case you've checked it out before
git checkout tags/v0.10.0
```

Inside the folder `validator` you will find the precompiled binaries to use.

Upload both `nymd` and `libwasmvm.so` to your validator machine. If you attempt to run `./nymd` on your server, you'll likely see an error if `nymd` can't find `libwasmvm.so`:

```sh
./nymd: error while loading shared libraries: libwasmvm.so: cannot open shared object file: No such file or directory
```

You'll need to set `LD_LIBRARY_PATH` in your user's `~/.bashrc` file. While we're at it, we might as well add that to our path:

```sh
NYM_BINARIES=/home/youruser/path/to/nym/binaries
echo 'export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:'NYM_BINARIES >> ~/.bashrc
echo 'export PATH=$PATH:'${NYM_BINARIES} >> ~/.bashrc
source ~/.bashrc
```

Change `/home/youruser/path/to/nym/binaries` to wherever you put `nymd` and `libwasmvm.so`. To test everything worked:

```sh
nymd
```

You should get the regular `nymd` help text.

### Initialize your validator

Requisites:

- FQDN Domain name
- IPv4 and IPv6 connectivity

Choose a name for your validator and use it in place `yourname` in the following command:

```sh
nymd init yourname --chain-id testnet-finney
```

At this point, you have a new validator, with its own genesis file which lives in `$HOME/.nymd/config/genesis.json`. You will need to **replace** that with Nym's [testnet-finney genesis file](https://nymtech.net/testnets/finney/genesis.json).

You can use the following command to download the one for Finney with:

```sh
wget  -O $HOME/.nymd/config/genesis.json https://nymtech.net/testnets/finney/genesis.json
```

#### config.toml setup

Add the Nym validator as a persistent peer so that your validator can start pulling blocks from the rest of the network, by editing `$HOME/.nymd/config/config.toml`:

- `persistent_peers = "e7163ea63219504344c669164d083f52434f382b@testnet-finney-validator.nymtech.net:26656"` allows your validator to start pulling blocks from other validators
- `cors_allowed_origins = ["*"]` allows the web wallet to make HTTPS requests to your validator.
- `create_empty_blocks = false` may save a bit of space

#### app.toml setup

In the file `$HOME/.nymd/config/app.toml`, set the following values:

1. `minimum-gas-prices = "0.025uhal"`
1. `enable = true` in the `[api]` section to get the API server running

### Set up your validator's admin user:

You'll need an admin account to be in charge of your validator. Let's get that set up:

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

Type in your keychain password, not the mnemonic, when asked.

### Start your validator

Everything should now be ready to go. You've got the validator set up, all changes made in `config.toml` and `app.toml`, the Nym genesis file copied into place (replacing your generated one). Now let's validate the whole setup:

```sh
nymd validate-genesis
```

Before starting the validator, we will need to open the firewall ports (adapt if not using `firewalld`):

```sh
for port in 1317/tcp 9090/tcp 26656/tcp; do
firewall-cmd --add-port=${port}
firewall-cmd --add-port=${port} --permanent
done
```

Assuming that check passed, you can start it up with:

```sh
nymd start
```

You will likely want to automate validator start on reboot. Here's systemd unit file that you can save at`/etc/systemd/system/nymd.service` for accomplishing this goal:

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

So let's proceed to start it with:

```sh
systemctl daemon-reload # to pickup the new unit file
systemctl enable nymd   # to enable the service
systemctl start nymd    # to actually start the service
journalctl -f           # to monitor system logs showing the service start
```

Once your validator starts, it will start requesting blocks from other validators. This may take several hours. Once it's up to date, you can issue a request to join the validator set:

```sh
PUB_KEY=$(/home/youruser/path/to/nym/binaries/nymd tendermint show-validator) # e.g. halvalconspub1zcjduepqzw38hj6edjc5wldj3d37hwc4savn0t95uakhy6tmeqqz5wrfmntsnyehsq
MONIKER="nym-secondary"  # whatever you called your validator during "init"
FROM_ACCOUNT="nymd-admin"# your keychain name

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

If you want to edit some details for your node you will use a command like this:

```sh
nymd tx staking edit-validator   --chain-id=testnet-finney   --moniker=${MONIKER}   --details="Nym validator"   --security-contact="YOUREMAIL"   --identity="XXXXXXX"   --gas="auto"   --gas-adjustment=1.15   --from=${FROM_ACCOUNT} --fees 2000uhal
```

With above command you can specify the `gpg` key last numbers (as used in `keybase`) as well as validator details and your email for security contact~

### Install nginx and https

Proxying your validator's port 26657 to nginx 80 can be done like this `/etc/nginx/conf.d/validator.conf`:

```json
server {
  listen 80;
  listen [::]:80;
  server_name {{ domain }};

  location / {
    proxy_pass http://127.0.0.1:26657;
    proxy_set_headerX-Real-IP $remote_addr;
    proxy_set_headerHost $host;
    proxy_set_headerX-Real-IP $remote_addr;
  }
}
```

Then doing:

```sh
sudo apt install certbot nginx python3
certbot --nginx -d nym-validator.yourdomain.com -m you@yourdomain.com --agree-tos --noninteractive --redirect
```

will get you a working HTTPS encrypted nginx proxy in front of the API.

In the next testnet we will be focusing more on validator TLS, sentry nodes, etc.

### Unjailing your validator

If, for some reason, your validator gets jailed, you can fix it with the following command:

```sh
nymd tx slashing unjail \
  --broadcast-mode=block \
  --from=${FROM_ACCOUNT} \
  --chain-id=testnet-finney \
  --gas=auto \
  --gas-adjustment=1.4 \
  --fees=7000uhal
```

### Day 2 operations with your validator

As part of the execution of the validator, it will be able to get some rewards.

With this command, we can query

```sh
nymd query distribution validator-outstanding-rewards <halvaloperaddress>

```

Using the values obtained from previous command, you can withdraw all rewards with:

```sh
nymd tx distribution withdraw-rewards <halvaloperaddress> --from ${FROM_ACCOUNT} --keyring-backend=os --chain-id="testnet-finney" --gas="auto" --gas-adjustment=1.15 --commission --fees 5000uhal
```

If you want to check your current balances, check them with:

```sh
nymd query bank balances hal<address>
```

For example:

```yaml
balances:
- amount: "22976200"
denom: stake
- amount: "919376"
denom: uhal
pagination:
next_key: null
total: "0"
```

You can, of course, stake back the available balance to your validator with the following command:

```sh
nymd tx staking delegate <halvaloperaddress> <amount>stake--from ${FROM_ACCOUNT} --keyring-backend=os --chain-id "testnet-finney" --gas="auto" --gas-adjustment=1.15 --fees 5000uhal
```

NOTE: The value to be used instead of the `<amount>stake` can be calculated from the available balance. For example, if you've `999989990556` in the balance, you can stake `999909990556`, note that the 5th digit, has been changed from `8` to `0` to leave some room for fees (amounts are multiplied by 10^6).

Remember to replace `halvaloper` with your validator address and `nym-admin` with the user you created during initialization.
