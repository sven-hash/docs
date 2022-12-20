---
sidebar_label: "Mix nodes"
description: "Mix nodes accept Sphinx packets, shuffle packets together, and forward them onwards, providing strong privacy for internet users."
hide_title: false
title: Mix nodes 
---

:::note
The Nym mix node binary was built in the [building nym](/docs/stable/run-nym-nodes/build-nym/) section. If you haven't yet built Nym and want to run the code, go there first.
:::

After your build is finished, the `nym-mixnode` binary will be located in `/path/to/nym/target/release/` directory. You may move or copy it to wherever you wish (for example, you may wish to compile your binaries once locally and then move them to different machines).

Alternatively, you can fetch the binaries from our [releases page](https://github.com/nymtech/nym/releases).

## Preliminary steps

There are a couple of steps that need completing before starting to set up your mix node:

- preparing your wallet
- requisitioning a VPS (Virtual Private Server)

### Wallet preparation

#### Mainnet

Before you initialise and run your mixnode, head to our [website](https://nymtech.net/download/) and download the Nym wallet for your operating system. If pre-compiled binaries for your operating system aren't availiable, you can build the wallet yourself with instructions [here](/docs/stable/wallet).

If you don't already have one, please create a Nym address using the wallet, and fund it with tokens. The minimum amount required to bond a mixnode is 100 `NYM`, but make sure you have a bit more to account for gas costs.

`NYM` is currently present on several exchanges. Head to our [telegram channels](https://t.me/nymchan) to find out where to get `NYM` tokens.

:::note
Remember that you can **only** use Cosmos `NYM` tokens to bond your mixnode. You **cannot** use ERC20 representations of `NYM` to run a node.
:::

#### Sandbox testnet

Make sure to download a wallet and create an account as outlined above. Then head to our [token faucet](https://faucet.nymtech.net/) and get some tokens to use to bond it.

### VPS Hardware Specs

You will need to rent a VPS to run your mix node on. One key reason for this is that your node **must be able to send TCP data using both IPv4 and IPv6** (as other nodes you talk to may use either protocol.

For the moment, we haven't put a great amount of effort into optimizing concurrency to increase throughput, so don't bother provisioning a beastly server with multiple cores. This will change when we get a chance to start doing performance optimizations in a more serious way. Sphinx packet decryption is CPU-bound, so once we optimise, more fast cores will be better.

For now, see the below rough specs:

- Processors: 2 cores are fine. Get the fastest CPUs you can afford.
- RAM: Memory requirements are very low - typically a mix node may use only a few hundred MB of RAM.
- Disks: The mixnodes require no disk space beyond a few bytes for the configuration files. 

## Mix node setup and maintenance

Now that you have built the codebase, set up your wallet, and have a VPS with the `nym-mixnode` binary, you can set up your mix node with the instructions below.

### Viewing command help

You can check that your binaries are properly compiled with:

```
./nym-mixnode --help
```

Which should return a list of all avaliable commands.

<details>
  <summary>console output</summary>

      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (mixnode - version 1.1.4)

        
    nym-mixnode 1.1.4
    Nymtech
    Implementation of a Loopix-based Mixnode

    USAGE:
        nym-mixnode [OPTIONS] <SUBCOMMAND>

    OPTIONS:
            --config-env-file <CONFIG_ENV_FILE>
                Path pointing to an env file that configures the mixnode

        -h, --help
                Print help information

        -V, --version
                Print version information

    SUBCOMMANDS:
        completions          Generate shell completions
        describe             Describe your mixnode and tell people why they should delegate state to
                                you
        generate-fig-spec    Generate Fig specification
        help                 Print this message or the help of the given subcommand(s)
        init                 Initialise the mixnode
        node-details         Show details of this mixnode
        run                  Starts the mixnode
        sign                 Sign text to prove ownership of this mixnode
        upgrade              Try to upgrade the mixnode

        nym-mixnode 1.1.4
        Nymtech


</details>

You can also check the various arguments required for individual commands with:

```
./nym-mixnode <command> --help
```

### Initialising your mix node

To check available configuration options for initializing your node use:

```
./nym-mixnode init --help
```

<details>
  <summary>console output</summary>

      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (mixnode - version 1.1.4)

        
    nym-mixnode-init 
    Initialise the mixnode

    USAGE:
        nym-mixnode init [OPTIONS] --id <ID> --host <HOST> --wallet-address <WALLET_ADDRESS>

    OPTIONS:
            --announce-host <ANNOUNCE_HOST>
                The custom host that will be reported to the directory server

        -h, --help
                Print help information

            --host <HOST>
                The host on which the mixnode will be running

            --http-api-port <HTTP_API_PORT>
                The port on which the mixnode will be listening for http requests

            --id <ID>
                Id of the mixnode we want to create config for

            --mix-port <MIX_PORT>
                The port on which the mixnode will be listening for mix packets

            --validators <VALIDATORS>
                Comma separated list of rest endpoints of the validators

            --verloc-port <VERLOC_PORT>
                The port on which the mixnode will be listening for verloc packets

            --wallet-address <WALLET_ADDRESS>
                The wallet address you will use to bond this mixnode, e.g.
                nymt1z9egw0knv47nmur0p8vk4rcx59h9gg4zuxrrr9

</details>

Initalise your mixnode with the following command, replacing the value of `--id` with the moniker you wish to give your mixnode, and the `--wallet-address` with the Nym address you created earlier:

```
./nym-mixnode init --id winston-smithnode --host $(curl ifconfig.me) --wallet-address <wallet-address>
```

Your `--host` must be publicly routable on the internet in order to mix packets, and can be either an Ipv4 or IPv6 address.

:::caution
Your node **must** be able to send TCP data using **both** IPv4 and IPv6 (as other nodes you talk to may use either protocol).
:::

The `$(curl ifconfig.me)` command above returns your IP automatically using an external service. Alternatively, you can enter your IP manually wish. If you do this, remember to enter your IP **without** any port information.

:::note
The `init` command will refuse to destroy existing mix node keys.
:::

During the `init` process you will have the option to change the `http_api`, `verloc` and `mixnode` ports from their default settings. If you wish to change these in the future you can edit their values in the `config.toml` file created by the initialization process, which is located at `~/.nym/mixnodes/<your-id>/`.

### Bonding your mix node

:::caution
From this release, if you unbond your mixnode that means you are leaving the mixnet and you will lose all your delegations (permanently). You can join again with the same identity key, however, you will start with no delegations.
:::

#### Via the Desktop wallet (recommended)

You can bond your mix node via the Desktop wallet.

Open your wallet, and head to the `Bond` page, then select the node type and input your node details.

#### Via the CLI (power users)
If you want to bond your Gateway via the CLI, then check out the [Nym CLI](/docs/stable/nym-cli) tool. 

### Running your mix node

Now you've bonded your mix node, run it with:

```
./nym-mixnode run --id winston-smithnode
```

<details>
  <summary>console output</summary>

    Starting mixnode winston-smithnode...

    To bond your mixnode you will need to install the Nym wallet, go to https://nymtech.net/get-involved and select the Download button.
    Select the correct version and install it to your machine. You will need to provide the following:

    Identity Key: GWrymUuLaxVHSs8iE7YW48MB81npnKjrVuJzJsGkeji6
    Sphinx Key: FU89ULkS4YYDXcm5jShhJvoit7H4jG4EXHxRKbS9cXSJ
    Owner Signature: Kd5StZtg5PsjLtWRJ5eQejuLHz3JUNzZrk6Jd4WVS5u9Q5bFt6DvuVzN7NbiX9WMZYpsYMJoegH3Bz94o6gsY6b
    Host: 62.240.134.46 (bind address: 62.240.134.46)
    Version: 1.1.4
    Mix Port: 1789, Verloc port: 1790, Http Port: 8000

    You are bonding to wallet address: n1x42mm3gsdg808qu2n3ah4l4r9y7vfdvwkw8az6


    2022-04-27T16:08:01.159Z INFO  nym_mixnode::node > Starting nym mixnode
    2022-04-27T16:08:01.490Z INFO  nym_mixnode::node > Starting node stats controller...
    2022-04-27T16:08:01.490Z INFO  nym_mixnode::node > Starting packet delay-forwarder...
    2022-04-27T16:08:01.490Z INFO  nym_mixnode::node > Starting socket listener...
    2022-04-27T16:08:01.490Z INFO  nym_mixnode::node::listener > Running mix listener on "62.240.134.46:1789"
    2022-04-27T16:08:01.490Z INFO  nym_mixnode::node           > Starting the round-trip-time measurer...

</details>

If everything worked, you'll see your node running on the either the [Sandbox testnet network explorer](https://sandbox-explorer.nymtech.net) or the [mainnet network explorer](https://explorer.nymtech.net), depending on which network you're running.

Note that your node's public identity key is displayed during startup, you can use it to identify your node in the list.

Keep reading to find out more about configuration options or troubleshooting if you're having issues. There are also some tips for running on AWS and other cloud providers, some of which require minor additional setup.

Also have a look at the saved configuration files in `$HOME/.nym/mixnodes/` to see more configuration options.

### Describe your mix node (optional)

In order to easily identify your node via human-readable information later on in the development of the testnet when delegated staking is implemented, you can `describe` your mixnode with the following command:

```
./nym-mixnode describe --id winston-smithnode
```

<details>
  <summary>console output</summary>

    name: winston-smithnode
    description: nym-mixnode hosted on Linode VPS in <location> with the following specs: <specs>.
    link, e.g. https://mixnode.yourdomain.com: mixnode.mydomain.net
    location, e.g. City: London, Country: UK: <your_location>

    This information will be shown in the mixnode's page in the Network Explorer, and help people make delegated staking decisions.

</details>

:::caution
Remember to restart your mix node process in order for the new description to be propogated
:::

### Upgrading your mix node 

* pause your mix node process 
* replace the existing binary with the newest binary (which you can either compile yourself or grab from our [releases page](https://github.com/nymtech/nym/releases))
* re-run `init` with the same values as you used initially. **This will just update the config file, it will not overwrite existing keys**. 
* restart your mix node process with the new binary. 

> Do **not** use the `upgrade` command: there is a known error with the command that will be fixed in the next release. 


### Displaying mix node information

You can always check the details of your mix node with the `node-details` command:

```
./nym-mixnode node-details --id winston-smithnode
```

<details>
  <summary>console output</summary>

    Identity Key: GWrymUuLaxVHSs8iE7YW48MB81npnKjrVuJzJsGkeji6
    Sphinx Key: FU89ULkS4YYDXcm5jShhJvoit7H4jG4EXHxRKbS9cXSJ
    Owner Signature: Kd5StZtg5PsjLtWRJ5eQejuLHz3JUNzZrk6Jd4WVS5u9Q5bFt6DvuVzN7NbiX9WMZYpsYMJoegH3Bz94o6gsY6b
    Host: 62.240.134.46 (bind address: 62.240.134.46)
    Version: 1.1.4
    Mix Port: 1789, Verloc port: 1790, Http Port: 8000

    You are bonding to wallet address: n1x42mm3gsdg808qu2n3ah4l4r9y7vfdvwkw8az6

</details>

### Configure your firewall

The following commands will allow you to set up a firewall using `ufw`.

```
# check if you have ufw installed
ufw version
# if it is not installed, install with
sudo apt install ufw -y
# enable ufw
sudo ufw enable
# check the status of the firewall
sudo ufw status
```

Finally open your mix node's p2p port, as well as ports for ssh, http, and https connections, and ports `8000` and `1790` for verloc and measurement pings:

```
sudo ufw allow 1789,1790,8000,22,80,443/tcp
# check the status of the firewall
sudo ufw status
```

For more information about your mix node's port configuration, check the [mix node port reference table](#mixnode-port-reference) below.

### Automating your mix node with systemd

It's useful to have the mix node automatically start at system boot time. Here's a systemd service file to do that:

```ini
[Unit]
Description=Nym Mixnode (1.1.4)
StartLimitInterval=350
StartLimitBurst=10

[Service]
User=nym
LimitNOFILE=65536
ExecStart=/home/nym/nym-mixnode run --id mix0100
KillSignal=SIGINT
Restart=on-failure
RestartSec=30

[Install]
WantedBy=multi-user.target
```

Put the above file onto your system at `/etc/systemd/system/nym-mixnode.service`.

Change the path in `ExecStart` to point at your mix node binary (`nym-mixnode`), and the `User` so it is the user you are running as.

If you have built nym on your server, and your username is `jetpanther`, then the start command might look like this:

`ExecStart=/home/jetpanther/nym/target/release/nym-mixnode run --id your-id`. Basically, you want the full `/path/to/nym-mixnode run --id whatever-your-node-id-is`

Then run:

```
systemctl enable nym-mixnode.service
```

Start your node:

```
service nym-mixnode start
```

This will cause your node to start at system boot time. If you restart your machine, the node will come back up automatically.

You can also do `service nym-mixnode stop` or `service nym-mixnode restart`.

Note: if you make any changes to your systemd script after you've enabled it, you will need to run:

```
systemctl daemon-reload
```

This lets your operating system know it's ok to reload the service configuration.

#### Setting the ulimit

Linux machines limit how many open files a user is allowed to have. This is called a `ulimit`.

`ulimit` is 1024 by default on most systems. It needs to be set higher, because mix nodes make and receive a lot of connections to other nodes.

If you see errors such as:

```
Failed to accept incoming connection - Os { code: 24, kind: Other, message: "Too many open files" }
```

This means that the operating system is preventing network connections from being made.

##### Set the ulimit via `systemd` service file

Query the `ulimit` of your mix node with:

```
grep -i "open files" /proc/$(ps -A -o pid,cmd|grep nym-mixnode | grep -v grep |head -n 1 | awk '{print $1}')/limits
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

Reboot your machine and restart your node. When it comes back, use `cat /proc/$(pidof nym-mixnode)/limits | grep "Max open files"` to make sure the limit has changed to 65535.

##### Set the ulimit on `non-systemd` based distributions

Edit `etc/security/conf` and add the following lines:

```
# Example hard limit for max opened files
username        hard nofile 4096
# Example soft limit for max opened files
username        soft nofile 4096
```

Then reboot your server and restart your mixnode.

## Node Families 
Mix nodes can now be arranged into 'families': a group of mix nodes which publically annouce that they are run by the same organisation. All nodes in family that are selected to mixmine during an epoch will be included in the same layer of the mixnet, to avoid a single family creating a full 3 hop route for any packets. 

Each family has a family 'head' - the first mix node in the group. This node will be used to generate signatures for nodes wishing to join the family. It doesn't matter which of your nodes you choose to be the head, it will most likely be the first fully-saturated node you have in your setup, with subsequent nodes being members of the family.  

### Prepare your environment

* In order to call the commands outlined below you must use the `nyxd` binary ([setup instructions here](/docs/stable/run-nym-nodes/nodes/rpc-node)).

* import your keys for signing transactions 
```
./nyxd keys add -i mix0-famhead # the head of the mix node family 
./nyxd keys add -i mix1 # the first member of the mix node family  
```

* set the address of the mixnet contract and the validator endpoint as variables. These can be found in the [network config file](https://github.com/nymtech/nym/tree/develop/common/network-defaults/src) of the relevant network: 
```
VALIDATOR-ENDPOINT=https://rpc.nymtech.net
MIXNET-CONTRACT=n17srjznxl9dvzdkpwpw24gg668wc73val88a6m5ajg6ankwvz9wtst0cznr
```

* set the signature created by the family head as a variable:
```
SIGNATURE="TS3Z1uhkJ8R3qgaJJ5s8HeYtfQex4yJSNHXskth1bGbFVnFpxcsNMREF9y3xvPY3LgPMmvbsoE2aVwsr27WwpWV"
```


### Creating a family

Use the same signature as used when bonding the mixnode, give it any label you want. 

The `--from` is the **mnemonic** of the family head you loaded into your `nyxd` keyring:

```
./nyxd tx wasm execute ${MIXNET-CONTRACT} '{"create_family": {"owner_signature": ${SIGNATURE}, "label": "my-family-name"}}' --node ${VALIDATOR-ENDPOINT} --from mix0-famhead --chain-id nyx --gas-prices 0.025unym --gas auto --gas-adjustment 1.3 -y -b block
```

### Joining a family

Ssh into the vps of the family head and run the following command to obtain the signature for the member. The value is the **identity key** of the mix node which wants to join the family: 

```
./nym-mixnode sign --id mixnode --text 4Yr4qmEHd9sgsuQ83191FR2hD88RfsbMmB4tzhhZWriz
```

This will return a signature which is going to be used below - in this example it is `3SEjfNcJ5L3cXdvWCdiQNT5DkCFJ2TurK5xsYyEdHH324nAA3bWvKoXmkjU9Xbr9ZyemGDLJ4dmGEHWUwL1LCWKq`. 

The `--from` is going to be the mnemonic of the member wanting to join the family: 

```
./nyxd tx wasm execute ${MIXNET-CONTRACT} '{"join_family": {"signature": "3SEjfNcJ5L3cXdvWCdiQNT5DkCFJ2TurK5xsYyEdHH324nAA3bWvKoXmkjU9Xbr9ZyemGDLJ4dmGEHWUwL1LCWKq","family_head": "8A3Pv7Y9xGZdhUYd7sMHKp5y3nn5P3aBDDnJLataYE2J"}}' --node ${VALIDATOR-ENDPOINT} --from mix1 --chain-id nyx --gas-prices 0.025unym --gas auto --gas-adjustment 1.3 -y -b block
```

### Leaving a family 

If wanting to leave, run the same initial command as above, followed by:
```
./nyxd tx wasm execute ${MIXNET-CONTRACT} '{"leave_family": {"signature": "3SEjfNcJ5L3cXdvWCdiQNT5DkCFJ2TurK5xsYyEdHH324nAA3bWvKoXmkjU9Xbr9ZyemGDLJ4dmGEHWUwL1LCWKq","family_head": "8A3Pv7Y9xGZdhUYd7sMHKp5y3nn5P3aBDDnJLataYE2J"}}' --node ${VALIDATOR-ENDPOINT} --from mix1 --chain-id nyx --gas-prices 0.025unym --gas auto --gas-adjustment 1.3 -y -b block
```

## Checking that your node is mixing correctly

### Network explorers

Once you've started your mix node and it connects to the testnet validator, your node will automatically show up in the 'Mix nodes' section of either the Nym Network Explorers:

- [Mainnet](https://explorer.nymtech.net/overview)
- [Sandbox testnet](https://sandbox-explorer.nymtech.net/)

Enter your **identity key** to find your node. There are numerous statistics about your node on that page that are useful for checking your uptime history, packets mixed, and any delegations your node may have.

There are also 2 community explorers which have been created by [Nodes Guru](https://nodes.guru):

- [Mainnet](https://mixnet.explorers.guru/)
- [Sandbox testnet](https://sandbox.mixnet.explorers.guru/)

For more details see [Troubleshooting FAQ](https://nymtech.net/docs/stable/run-nym-nodes/nodes/troubleshooting/#how-can-i-tell-my-node-is-up-and-running-and-mixing-traffic)

### Virtual IPs and hosting via Google & AWS

On some services (AWS, Google, etc), the machine's available bind address is not the same as the public IP address. In this case, bind `--host` to the local machine address returned by `ifconfig`, but also specify `--announce-host` with the public IP. Please make sure that you pass the correct, routable `--announce-host`.

For example, on a Google machine, you may see the following output from the `ifconfig` command:

```
ens4: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1460
        inet 10.126.5.7  netmask 255.255.255.255  broadcast 0.0.0.0
        ...
```

The `ens4` interface has the IP `10.126.5.7`. But this isn't the public IP of the machine, it's the IP of the machine on Google's internal network. Google uses virtual routing, so the public IP of this machine is something else, maybe `36.68.243.18`.

`nym-mixnode init --host 10.126.5.7`, initalises the mix node, but no packets will be routed because `10.126.5.7` is not on the public internet.

Trying `nym-mixnode init --host 36.68.243.18`, you'll get back a startup error saying `AddrNotAvailable`. This is because the mix node doesn't know how to bind to a host that's not in the output of `ifconfig`.

The right thing to do in this situation is `nym-mixnode init --host 10.126.5.7 --announce-host 36.68.243.18`.

This will bind the mix node to the available host `10.126.5.7`, but announce the mix node's public IP to the directory server as `36.68.243.18`. It's up to you as a node operator to ensure that your public and private IPs match up properly.

## Metrics / API endpoints

The mix node binary exposes several API endpoints that can be pinged in order to gather information about the node, and the Validator API exposes numerous mix node related endpoints which provide network-wide information about mix nodes, the network topology (the list of avaliable mix nodes for packet routing), and information regarding uptime monitoring and rewarding history. 

### Mix node API endpoints 

Since the mix node binary exposes several API endpoints itself, you can ping these easily via curl: 

| Endpoint             | Description                                                                           | Command                                                                                |
| -------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `/description`       | Returns the description of the node set with the `describe` command                   | `curl <NODE_IP_ADDRESS>:8000/description`                                              |
| `/hardware`          | Returns the hardware information of the node                                          | `curl <NODE_IP_ADDRESS>:8000/hardware`                                                 |
| `/verloc`            | Returns the verloc information of the node, updated every 12 hours                    | `curl <NODE_IP_ADDRESS>:8000/verloc`                                                   |

The code for exposed API endpoints can be found [here](https://github.com/nymtech/nym/tree/develop/mixnode/src/node/http). 

### Mix node related Validator API endpoints 

Numerous endpoints are documented on the Validator API's [Swagger Documentation](https://validator.nymtech.net/api/swagger/index.html). There you can also try out various requests from your broswer, and download the response from the API. Swagger will also show you what commands it is running, so that you can run these from an app or from your CLI if you prefer. 

<!-- | `/report`            | Returns the most recent node status test report                                       | `curl https://validator.nymtech.net/api/v1/status/mixnode/<NODE_ID>/report`            |
| `/history`           | Returns all previous test reports                                                     | `curl https://validator.nymtech.net/api/v1/status/mixnode/<NODE_ID>/history`           |
| `/status`            | Returns the status of the node                                                        | `curl https://validator.nymtech.net/api/v1/status/mixnode/<NODE_ID>/status`            |
| `/reward-estimation` | Returns various reward estimation statistics                                          | `curl https://validator.nymtech.net/api/v1/status/mixnode/<NODE_ID>/reward-estimation` |
| `/stake-saturation`  | Returns the stake saturation of the node as a decimal, with `1` being fully saturated | `curl https://validator.nymtech.net/api/v1/status/mixnode/<NODE_ID>/stake-saturation`  |
| `/core-status-count` | Returns the amount of times the node has been selected for use in network tests       | `curl https://validator.nymtech.net/api/v1/status/mixnode/<NODE_ID>/core-status-count` |

:::note
Replace `validator` with `sandbox-validator` in your commands if you're wanting to query the testnet
:::

There are also several endpoints which return information about all mixnodes in the network:

| Endpoint     | Description                                                                      | Command                                                          |
| ------------ | -------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `/blacklist` | Returns a list of mixnodes that failed connectivity checks in the previous round | `curl https://validator.nymtech.net/api/v1/mixnodes/blacklisted` |
| `/active`    | Returns the active set                                                           | `curl https://validator.nymtech.net/api/v1/mixnodes/active`      |

### Metrics of interest

Although some of the endpoints return information that is fairly self-explanatory, there are some which are more complex, which are explained in more detail here.

#### `/report`

This endpoint returns different metrics returned regarding your mixnode's uptime and package-mixing capabilities:

- `identity`: the identity key of the mixnode.
- `owner`: the address of the owner of the mixnode.
- `last_hour`: uptime over the last hour as a percentage.
- `last_day`: uptime over the last 24 hours as a percentage.

#### `/reward-estimation`

This endpoint returns different metrics returned regarding your mixnode's currently estimated rewards:

- `estimated_total_node_reward`: the estimated total reward in `uNYM` that the mixnode will recieve for this epoch to be split between the operator and the delegator(s), if any.
- `estimated_operator_reward`: the estimated total reward in `uNYM` that the operator will recieve for this epoch.
- `estimated_delegators_reward`: the estimated reward in `uNYM` that will be split between all of the mixnode delegator(s), if any.
- `current_epoch_start`: the UNIX timestamp of the beginning of the current epoch.
- `current_epoch_end`: the UNIX timestamp of the end of the current epoch.
- `current_epoch_uptime`: the uptime of the mixnode for the current epoch, represented as a percentage.
- `as_at`: the UNIX timestamp when the metrics information cache was last refreshed.

#### `/core-status-count`

This endpoint returns the number of times that the node has been selected from the rewarded set and had 1000 packets sent to it, before being used by the network monitor to test the rest of the network.

- `identity`: the identity key of the mixnode.
- `count`: the number of times it has been used for network testing. -->

## Ports 

All mix node-specific port configuration can be found in `$HOME/.nym/mixnodes/<your-id>/config/config.toml`. If you do edit any port configs, remember to restart your mix node.

### Mix node port reference

| Default port | Use                       |
| ------------ | ------------------------- |
| `1789`       | Listen for mixnet traffic |
| `1790`       | Listen for VerLoc traffic |
| `8000`       | Metrics http API endpoint |
