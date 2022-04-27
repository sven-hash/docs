---
sidebar_label: "Validators"
description: "Nym Validators provide privacy-enhanced credentials based on the testimony of a set of decentralized, blockchain-based issuing authorities."
hide_title: false
title: Validators
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Nym validators secure the network with a staking token, defending the network from Sybil attacks.

Validators also provide privacy-enhanced credentials based on the testimony of a set of decentralized, blockchain-based issuing authorities. Nym validators use a [signature scheme](https://en.wikipedia.org/wiki/Digital_signature) called [Coconut](https://arxiv.org/abs/1802.07344) to issue credentials. This allows privacy apps to generate anonymous resource claims through decentralised authorities, then use them with Service Providers.

The validator is built using [Cosmos SDK](https://cosmos.network) and [Tendermint](https://tendermint.com), with a [CosmWasm](https://cosmwasm.com) smart contract controlling the directory service, node bonding, and delegated mixnet staking.

### Building the Nym validator

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

- `Go`

`Go` can be installed via the following commands (taken from the [Agoric SDK docs](https://github.com/Agoric/agoric-sdk/wiki/Validator-Guide-for-Incentivized-Testnet#install-go)):

```
# First remove any existing old Go installation
sudo rm -rf /usr/local/go

# Install correct Go version
curl https://dl.google.com/go/go1.17.5.linux-amd64.tar.gz | sudo tar -C/usr/local -zxvf -

# Update environment variables to include go
cat <<'EOF' >>$HOME/.profile
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export GO111MODULE=on
export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
EOF
source $HOME/.profile
```

Verify `Go` is installed with:

```
go version
# Should return: go version go1.17.5 linux/amd64
```

- `gcc`

`gcc` can be installed with:

```
sudo apt install build-essential
# Optional additional manual pages can be installed with:
sudo apt-get install manpages-dev
```

Verify `gcc` is installed with:

```
gcc --version
```

Which should return something like:

```
gcc (Ubuntu 7.4.0-1ubuntu1~18.04) 7.4.0
Copyright (C) 2017 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

#### Building your validator
We use the `wasmd` version of the Cosmos validator to run our blockchain. First define the correct `BECH32_PREFIX` by selecting the correct network below, as the instructions, files, and endpoints differ in the instructions from here on in: 

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox (Testnet)">
    <pre>
      <code>
        BECH32_PREFIX=nymt
      </code>
    </pre>
        <pre>
      <code>
        WASMD_VERSION=v0.21.0
      </code>
    </pre>
    <pre>
      <code>
      NYM_APP_NAME=nymd
      </code>
    </pre>
    </TabItem>
    <TabItem value="mainnet" label="Nyx (Mainnet)">
      <pre>
      <code>
        BECH32_PREFIX=n
      </code>
    </pre>
      <pre>
      <code>
        WASMD_VERSION=v0.26.0
      </code>
    </pre>
        <pre>
      <code>
      NYM_APP_NAME=nyxd
      </code>
    </pre>
  </TabItem>
</Tabs>

Then run this to clone, compile, and build your validator:

```
git clone https://github.com/CosmWasm/wasmd.git
cd wasmd
git checkout ${WASMD_VERSION}
mkdir build
go build -o ./build/${NYM_APP_NAME} -mod=readonly -tags "netgo,ledger" -ldflags "-X github.com/cosmos/cosmos-sdk/version.Name=${NYM_APP_NAME} -X github.com/cosmos/cosmos-sdk/version.AppName=${NYM_APP_NAME} -X github.com/CosmWasm/wasmd/app.NodeDir=.${NYM_APP_NAME} -X github.com/cosmos/cosmos-sdk/version.Version=${WASMD_VERSION} -X github.com/cosmos/cosmos-sdk/version.Commit=dc5ef6fe84f0a5e3b0894692a18cc48fb5b00adf -X github.com/CosmWasm/wasmd/app.Bech32Prefix=${BECH32_PREFIX} -X \"github.com/cosmos/cosmos-sdk/version.BuildTags=netgo,ledger\"" -trimpath ./cmd/wasmd
```

At this point, you will have a copy of the `nymd` (for sandbox) or `nyxd` (for mainnet) binary in your `build/` directory. Test that it's compiled properly by running:

```
./build/${NYM_APP_NAME}
```

You should see help text print out.

Both the `nymd` or `nyxd` binary and the `libwasmvm.so` shared object library binary have been compiled. `libwasmvm.so` is the wasm virtual machine which is needed to execute smart contracts.


:::caution
If you have compiled these files locally you need to upload both of them to the server on which the validator will run. **If you have instead compiled them on the server skip to the step outlining setting `LD_LIBRARY PATH` below.**
:::

To locate these files on your local system run:

```
WASMVM_SO=$(ldd build/nymd | grep libwasmvm.so | awk '{ print $3 }')
ls ${WASMVM_SO}      
```

This will output something like:

```
'/home/username/go/pkg/mod/github.com/!cosm!wasm/wasmvm@v0.13.0/api/libwasmvm.so'
```

When you upload your `nymd`/`nyxd` binary, you'll need to tell it where `libwasmvm.so` is when you start your validator, or it will not run. If you have compiled them on your server then this is not necessary, as the compiled `nymd`/`nyxd` already has access to `libwasmvm.so`.

Upload both `nymd`/`nyxd` and `libwasmvm.so` to your validator machine. If `nymd`/`nyxd` can't find `libwasmvm.so` you will see an error like the following:

```
./nyxd: error while loading shared libraries: libwasmvm.so: cannot open shared object file: No such file or directory
```

You'll need to set `LD_LIBRARY_PATH` in your user's `~/.bashrc` file, and add that to our path. Replace `/home/youruser/path/to/nym/binaries` in the command below to the locations of `nymd` and `libwasmvm.so` and run it. If you have compiled these on the server, they will be in the `build/` folder:

```
NYX_BINARIES=/home/youruser/path/to/nym/binaries
# if you are using another shell like zsh replace '.bashrc' with the relevant config file
echo 'export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:'NYX_BINARIES >> ~/.bashrc 
echo 'export PATH=$PATH:'${NYX_BINARIES} >> ~/.bashrc
source ~/.bashrc
```

Test everything worked:

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox (Testnet)">
    <pre>
      <code>
        nymd  
      </code>
    </pre>
    </TabItem>
    <TabItem value="mainnet" label="Nyx (Mainnet)">
      <pre>
      <code>
        nyxd      
      </code>
    </pre>
  </TabItem>
</Tabs>

This should return the regular help text.

### Initialising your validator
Prerequisites:

- FQDN Domain name
- IPv4 and IPv6 connectivity

Choose a name for your validator and use it in place of `yourname` in the following command:

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox (Testnet)">
    <pre>
      nymd init YOUR_NAME --chain-id=nym-sandbox 
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx (Mainnet)">
    <pre>
      nyxd init YOUR_NAME --chain-id=nyx 
    </pre>
  </TabItem>
</Tabs>

:::caution
`init` generates `priv_validator_key.json` and `node_key.json`.  

If you have already set up a validator on a previous testnet, **make sure to back up the key located at** 
`~/.nymd/config/priv_validator_key.json`. 

If you don't save the validator key, then it can't sign blocks and will be jailed all the time, and
there is no way to deterministically (re)generate this key.  
:::

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox (Testnet)">
    At this point, you have a new validator, with its own genesis file located at <code>$HOME/.nymd/config/genesis.json</code>. You will need to replace the contents of that file that with the Sandbox Testnet <a href="https://nymtech.net/testnets/sandbox/genesis.json">genesis file</a>. You can use the following command to download the one for the Sandbox testnet:
    <pre>
      <code>
      wget  -O $HOME/.nymd/config/genesis.json https://nymtech.net/testnets/sandbox/genesis.json
      </code>
      </pre>
    </TabItem>
    <TabItem value="mainnet" label="Nyx (Mainnet)">
      At this point, you have a new validator, with its own genesis file located at <code>$HOME/.nyxd/config/genesis.json</code>. You will need to replace the contents of that file that with the Nyx Mainnet <a href="https://nymtech.net/genesis/genesis.json">genesis file</a>. You can use the following command to download the one for the Nyx Mainnet:
      <pre>
      <code>
      wget  -O $HOME/.nyxd/config/genesis.json https://nymtech.net/genesis/genesis.json
      </code>
    </pre>
  </TabItem>
</Tabs>

#### `config.toml` configuration
<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox (Testnet)">
    Add the Nym validator as a persistent peer so that your validator can start pulling blocks from the rest of the network, by editing the following config options in <code>$HOME/.nymd/config/config.toml</code> to match the information below:
    <pre>
      cors_allowed_origins = ["*"] 
    </pre>
    <pre>
      persistent_peers = "d24ee58d85a65d34ad5adfc3302c3614b36e8b14@sandbox-validator.nymtech.net:26656" 
    </pre>
    <pre>
      create_empty_blocks = false 
    </pre>
    <pre>
      laddr = "tcp://0.0.0.0:26656" 
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx (Mainnet)">
    Edit the following config options in <code>$HOME/.nyxd/config/config.toml</code> to match the information below:
    <pre>
      persistent_peers = "dc0af6cde717420e9f8d35a3e0883aee0e5dbff3@15.235.14.66:26656" 
    </pre>
    <pre>
      create_empty_blocks = false 
    </pre>
    <pre>
      laddr = "tcp://0.0.0.0:26656" 
    </pre>
  </TabItem>
</Tabs>

These affect the following: 
* `cors_allowed_origins = ["*"]` allows the wallet to make HTTPS requests to your validator.
* `persistent_peers = "<PEER_ADDRESS>@<DOMAIN>.nymtech.net:26656"` allows your validator to start pulling blocks from other validators
* `create_empty_blocks = false` will save space 
* `laddr = "tcp://0.0.0.0:26656"` is in your p2p configuration options 

Optionally, if you want to enable [Prometheus](https://prometheus.io/) metrics then the following must also match in the `config.toml`:

- `prometheus = true`
- `prometheus_listen_addr = ":26660"`

:::tip
Remember to enable metrics in the 'Configuring Prometheus metrics' section below as well.
:::

And if you wish to add a human-readable moniker to your node:

- `moniker = "yourname"`

Finally, if you plan on using [Cockpit](https://cockpit-project.org/documentation.html) on your server, change the `grpc` port from `9090` as this is the port used by Cockpit.

#### `app.toml` configuration
In the file `$HOME/.${NYM_APP_NAME}/config/app.toml`, set the following values:

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox (Testnet)">
    <pre>
      minimum-gas-prices = "0.025unymt" 
    </pre>
    <pre>
      enable = true` in the `[api]` section to get the API server running
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx (Mainnet)">
    <pre>
      enable = true in the `[api]` section to get the API server running
    </pre>
  </TabItem>
</Tabs>


### Setting up your validator's admin user
You'll need an admin account to be in charge of your validator. Set that up with:

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox (Testnet)">
    <pre>
      <code>
      nymd keys add nymd-admin
      </code>
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx (Mainnet)">
    <pre>
      <code>
      nyxd keys add nyxd-admin
      </code>
    </pre>
  </TabItem>
</Tabs>

This will add keys for your administrator account to your system's keychain and log your name, address, public key, and mnemonic. As the instructions say, remember to **write down your mnemonic**.

You can get the admin account's address with:

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox (Testnet)">
    <pre>
      <code>
      nymd keys show nymd-admin -a
      </code>
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx (Mainnet)">
    <pre>
      <code>
      nyxd keys show nyxd-admin -a
      </code>
    </pre>
  </TabItem>
</Tabs>

Type in your keychain **password**, not the mnemonic, when asked. 

### Starting your validator
Everything should now be ready to go. You've got the validator set up, all changes made in `config.toml` and `app.toml`, the Nym genesis file copied into place (replacing the initial auto-generated one). Now let's validate the whole setup:

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox (Testnet)">
    <pre>
      <code>
      nymd validate-genesis
      </code>
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx (Mainnet)">
    <pre>
      <code>
      nyxd validate-genesis
      </code>
    </pre>
  </TabItem>
</Tabs>


If this check passes, you should receive the following output:

```
File at /path/to/genesis.json is a valid genesis file
```

> If this test did not pass, check that you have replaced the contents of `/path/to/.nymd/config/genesis.json` with that of the correct genesis file.

Before starting the validator, we will need to open the firewall ports:

```
# if ufw is not already installed:
sudo apt install ufw
sudo ufw enable
sudo ufw allow 1317,26656,26660,22,80,443/tcp
# to check everything worked
sudo ufw status
```

Ports `22`, `80`, and `443` are for ssh, http, and https connections respectively. The rest of the ports are documented [here](https://docs.cosmos.network/v0.42/core/grpc_rest.html).

For more information about your validator's port configuration, check the [validator port reference table](#validator-port-reference) below.

> If you are planning to use [Cockpit](https://cockpit-project.org/) on your validator server then you will have defined a different `grpc` port in your `config.toml` above: remember to open this port as well.

Start the validator:
<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox (Testnet)">
    <pre>
      <code>
      nymd start
      </code>
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx (Mainnet)">
    <pre>
      <code>
      nyxd start
      </code>
    </pre>
  </TabItem>
</Tabs>

Once your validator starts, it will start requesting blocks from other validators. This may take several hours. Once it's up to date, you can issue a request to join the validator set with the command below. 

:::warning
When joining consensus, make sure that you do not disrupt (or worse - halt) the network by coming in with a disproportionately large amount of staked tokens. 

Please initially stake a small amount of tokens compared to existing validators, then delegate to yourself in tranches over time. 
:::

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox (Testnet)">
    <pre>
      nymd tx staking create-validator
        --amount=10000000unyxt
        --fees=5000unyxt
        --pubkey=$(/home/youruser/path/to/nym/binaries/nymd tendermint show-validator)
        --moniker="whatever you called your validator"
        --chain-id=nym-sandbox
        --commission-rate="0.10"
        --commission-max-rate="0.20"
        --commission-max-change-rate="0.01"
        --min-self-delegation="1"
        --gas="auto"
        --gas-adjustment=1.15
        --from="KEYCHAIN NAME"
        --node https://sandbox-validator.nymtech.net:443 
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx (Mainnet)">
    <pre>
      nyxd tx staking create-validator
        --amount=10000000unyx
        --fees=0unyx 
        --pubkey=$(/home/youruser/path/to/nym/binaries/nymd tendermint show-validator)
        --moniker="whatever you called your validator"
        --chain-id=nym
        --commission-rate="0.10"
        --commission-max-rate="0.20"
        --commission-max-change-rate="0.01"
        --min-self-delegation="1"
        --gas="auto"
        --gas-adjustment=1.15
        --from="KEYCHAIN NAME"
        --node https://rpc.nyx.nodes.guru:443     
      </pre>
  </TabItem>
</Tabs>

You'll need either `unyxt` tokens on Sandbox, or `unyx` tokens on mainnet to perform this command.

Note: we are currently working towards building up a closed set of reputable validators. You can ask us for coins to get in, but please don't be offended if we say no - validators are part of our system's core security and we are starting out with people we already know or who have a solid reputation.

If you want to edit some details for your node you will use a command like this:

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox (Testnet)">
    <pre>
      nymd tx staking edit-validator   
        --chain-id=nym-sandbox   
        --moniker="whatever you called your validator"
        --details="Nym validator"   
        --security-contact="your email"   
        --identity="your identity"   
        --gas="auto"   
        --gas-adjustment=1.15   
        --from="KEYCHAIN NAME"
        --fees 2000unyxt
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx (Mainnet)">
    <pre>
      nymd tx staking edit-validator   
        --chain-id=nym   
        --moniker="whatever you called your validator"
        --details="Nym validator"   
        --security-contact="your email"   
        --identity="your identity"   
        --gas="auto"   
        --gas-adjustment=1.15   
        --from="KEYCHAIN NAME"
        --fees 2000unyx
    </pre>
  </TabItem>
</Tabs>

With above command you can specify the `gpg` key last numbers (as used in `keybase`) as well as validator details and your email for security contact~

### Automating your validator with systemd
You will most likely want to automate your validator restarting if your server reboots. Below is a systemd unit file to place at `/etc/systemd/system/nymd.service`:

```ini
[Unit]
Description=Nymd (1.0.0-rc.1)
StartLimitInterval=350
StartLimitBurst=10

[Service]
User=nym                                                          # change to your user
Type=simple
Environment="LD_LIBRARY_PATH=/home/youruser/path/to/nym/binaries" # change to correct path
ExecStart=/home/youruser/path/to/nym/binaries/nymd start          # change to correct path
Restart=on-failure
RestartSec=30
LimitNOFILE=infinity

[Install]
WantedBy=multi-user.target
```

Proceed to start it with:

```
systemctl daemon-reload # to pickup the new unit file
systemctl enable nymd   # to enable the service
systemctl start nymd    # to actually start the service
journalctl -f           # to monitor system logs showing the service start
```

### Installing and configuring nginx for HTTPS
#### Setup
[Nginx](https://www.nginx.com/resources/glossary/nginx/#:~:text=NGINX%20is%20open%20source%20software,%2C%20media%20streaming%2C%20and%20more.&text=In%20addition%20to%20its%20HTTP,%2C%20TCP%2C%20and%20UDP%20servers.) is an open source software used for operating high-performance web servers. It allows us to set up reverse proxying on our validator server to improve performance and security.

Install `nginx` and allow the 'Nginx Full' rule in your firewall:

```
sudo ufw allow 'Nginx Full'
```

Check nginx is running via systemctl:

```
systemctl status nginx
```

Which should return:

```
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

Proxying your validator's port `26657` to nginx port `80` can then be done by creating a file with the following at `/etc/nginx/conf.d/validator.conf`:

```
server {
  listen 80;
  listen [::]:80;
  server_name "{{ domain }}";

  location / {
    proxy_pass http://127.0.0.1:26657;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

Followed by:

```
sudo apt install certbot nginx python3
certbot --nginx -d nym-validator.yourdomain.com -m you@yourdomain.com --agree-tos --noninteractive --redirect
```

:::caution
If using a VPS running Ubuntu 20: replace `certbot nginx python3` with `python3-certbot-nginx`
:::

These commands will get you an https encrypted nginx proxy in front of the API.

### Configuring Prometheus metrics (optional)

Configure Prometheus with the following commands (adapted from NodesGuru's [Agoric setup guide](https://nodes.guru/agoric/setup-guide/en)):

```
echo 'export OTEL_EXPORTER_PROMETHEUS_PORT=9464' >> $HOME/.bashrc
source ~/.bashrc
sed -i '/\[telemetry\]/{:a;n;/enabled/s/false/true/;Ta}' $HOME/.nymd/config/app.toml
sed -i "s/prometheus-retention-time = 0/prometheus-retention-time = 60/g" $HOME/.nymd/config/app.toml
sudo ufw allow 9464
echo 'Metrics URL: http://'$(curl -s ifconfig.me)':26660/metrics'
```

Your validator's metrics will be available to you at the returned 'Metrics URL', and look something like this:

```
# HELP go_gc_duration_seconds A summary of the pause duration of garbage collection cycles.
# TYPE go_gc_duration_seconds summary
go_gc_duration_seconds{quantile="0"} 6.7969e-05
go_gc_duration_seconds{quantile="0.25"} 7.864e-05
go_gc_duration_seconds{quantile="0.5"} 8.4591e-05
go_gc_duration_seconds{quantile="0.75"} 0.000115919
go_gc_duration_seconds{quantile="1"} 0.001137591
go_gc_duration_seconds_sum 0.356555301
go_gc_duration_seconds_count 2448
# HELP go_goroutines Number of goroutines that currently exist.
# TYPE go_goroutines gauge
go_goroutines 668
# HELP go_info Information about the Go environment.
# TYPE go_info gauge
go_info{version="go1.15.7"} 1
# HELP go_memstats_alloc_bytes Number of bytes allocated and still in use.
# TYPE go_memstats_alloc_bytes gauge
go_memstats_alloc_bytes 1.62622216e+08
# HELP go_memstats_alloc_bytes_total Total number of bytes allocated, even if freed.
# TYPE go_memstats_alloc_bytes_total counter
go_memstats_alloc_bytes_total 2.09341707264e+11
# HELP go_memstats_buck_hash_sys_bytes Number of bytes used by the profiling bucket hash table.
# TYPE go_memstats_buck_hash_sys_bytes gauge
go_memstats_buck_hash_sys_bytes 5.612319e+06
# HELP go_memstats_frees_total Total number of frees.
# TYPE go_memstats_frees_total counter
go_memstats_frees_total 2.828263344e+09
# HELP go_memstats_gc_cpu_fraction The fraction of this program's available CPU time used by the GC since the program started.
# TYPE go_memstats_gc_cpu_fraction gauge
go_memstats_gc_cpu_fraction 0.03357798610671518
# HELP go_memstats_gc_sys_bytes Number of bytes used for garbage collection system metadata.
# TYPE go_memstats_gc_sys_bytes gauge
go_memstats_gc_sys_bytes 1.3884192e+07
```

### Setting the ulimit
Linux machines limit how many open files a user is allowed to have. This is called a `ulimit`.

`ulimit` is 1024 by default on most systems. It needs to be set higher, because validators make and receive a lot of connections to other nodes.

If you see errors such as:

```
Failed to accept incoming connection - Os { code: 24, kind: Other, message: "Too many open files" }
```

This means that the operating system is preventing network connections from being made.

##### Set the ulimit via `systemd` service file
Query the `ulimit` of your validator with:

```
grep -i "open files" /proc/$(ps -A -o pid,cmd|grep nymd | grep -v grep |head -n 1 | awk '{print $1}')/limits
```

You'll get back the hard and soft limits, which looks something like this:

```
Max open files            65536                65536                files
```

If your output is **the same as above**, your node will not encounter any `ulimit` related issues.

However if either value is `1024`, you must raise the limit via the systemd service file. Add the line:

```
LimitNOFILE=65536
```

Reload the daemon:

```
systemctl daemon-reload
```

or execute this as root for system-wide setting of `ulimit`:

```
echo "DefaultLimitNOFILE=65535" >> /etc/systemd/system.conf
```

Reboot your machine and restart your node. When it comes back, use `cat /proc/$(pidof nym-validator)/limits | grep "Max open files"` to make sure the limit has changed to 65535.

##### Set the ulimit on `non-systemd` based distributions
Edit `etc/security/conf` and add the following lines:

```
# Example hard limit for max opened files
username        hard nofile 4096
# Example soft limit for max opened files
username        soft nofile 4096
```

Then reboot your server and restart your validator.

### Unjailing your validator
If your validator gets jailed, you can fix it with the following command:

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox (Testnet)">
    <pre>
      nymd tx slashing unjail 
        --broadcast-mode=block 
        --from="KEYCHAIN NAME"
        --chain-id=nym-sandbox 
        --gas=auto 
        --gas-adjustment=1.4 
        --fees=7000unyxt
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx (Mainnet)">
    <pre>
      nyxd tx slashing unjail 
        --broadcast-mode=block 
        --from="KEYCHAIN NAME"
        --chain-id=nym 
        --gas=auto 
        --gas-adjustment=1.4 
        --fees=7000unyx
    </pre>
  </TabItem>
</Tabs>

#### Common reasons for your validator being jailed

The most common reason for your validator being jailed is that your validator is out of memory because of bloated syslogs.

Running the command `df -H` will return the size of the various partitions of your VPS.

If the `/dev/sda` partition is almost full, try pruning some of the `.gz` syslog archives and restart your validator process.

### Day 2 operations with your validator

You can check your current balances with:

```
nymd query bank balances ${ADDRESS}
```

For example, on the Sanbox testnet this would return:

```yaml
balances:
- amount: "919376"
denom: unymt
pagination:
next_key: null
total: "0"
```

You can, of course, stake back the available balance to your validator with the following command. 

> Remember to save some tokens for gas costs! 

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox (Testnet)">
    <pre>
      nymd tx staking delegate VALOPERADDRESS AMOUNTunymt 
        --from="KEYCHAIN NAME"
        --keyring-backend=os 
        --chain-id=nym-sandbox
        --gas="auto" 
        --gas-adjustment=1.15 
        --fees 5000unyxt
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx (Mainnet)">
    <pre>
      nyxd tx staking delegate VALOPERADDRESS AMOUNTunym 
        --from="KEYCHAIN NAME"
        --keyring-backend=os 
        --chain-id=nym 
        --gas="auto" 
        --gas-adjustment=1.15 
        --fees 5000unyx
    </pre>
  </TabItem>
</Tabs>

### Validator port reference
All validator-specific port configuration can be found in `$HOME/.nymd/config/config.toml`. If you do edit any port configs, remember to restart your validator.

| Default port | Use                                  |
|--------------|--------------------------------------|
| 1317         | REST API server endpoint             |
| 26656        | Listen for incoming peer connections |
| 26660        | Listen for Prometheus connections    |
