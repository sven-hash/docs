---
sidebar_label: "Mixnodes"
description: "Mixnodes accept Sphinx packets, shuffle packets together, and forward them onwards, providing strong privacy for internet users."
hide_title: false
title: Mixnodes
---

:::note 
The Nym mixnode was built in the [building nym](/docs/next/run-nym-nodes/build-nym/) section. If you haven't yet built Nym and want to run the code, go there first.
:::

After your build is finished, the `nym-mixnode` binary will be located in `/path/to/nym/target/release/` directory. You may move or copy it to wherever you wish (for example, you may wish to compile your binaries once locally and then move them to different machines).

Alternatively, you can fetch the binaries from our [releases page](https://github.com/nymtech/nym/releases).

:::caution
Please note that unless you ran a mixnode in the Milhon testnet, **you will not be able to get `NYMT` tokens and bond your mixnode for the Sandbox testnet at this time**.

In the future we will set up a token faucet - watch out for updates on this. 

For those not able to immediately get involved, please look into [delegated staking](https://medium.com/nymtech/nym-delegated-staking-reputation-rewards-and-community-selection-bf0f346f7301).
If you **do** delegate your `NYMT` to others and shut down your node, remember to **save the keys located in `$HOME/.nym` in case you want to run a node in the future**
:::

Even you have already been running a node on the Milhon testnet, **you must do a clean install of the v0.12.1 `nym-mixnode` binary**. 

You can either build the repository from source, or grab the new binaries from our [releases page](https://github.com/nymtech/nym/releases). 

### Initialising your mixnode
You can check that your binaries are properly compiled with:

```
./nym-mixnode --help
```

Which should return a list of all avaliable commands:

```

      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (mixnode - version 0.12.1)

    
Nym Mixnode 0.12.1
Nymtech
Implementation of a Loopix-based Mixnode

USAGE:
    nym-mixnode [SUBCOMMAND]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

SUBCOMMANDS:
    describe        Describe your mixnode and tell people why they should delegate stake to you
    help            Prints this message or the help of the given subcommand(s)
    init            Initialise the mixnode
    node-details    Show details of this mixnode
    run             Starts the mixnode
    sign            Sign text to prove ownership of this mixnode
    upgrade         Try to upgrade the mixnode

```

To check available configuration options use:

```
./nym-mixnode init --help
```

Which will return: 

```
      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (mixnode - version 0.12.1)


nym-mixnode-init
Initialise the mixnode

USAGE:
    nym-mixnode init [OPTIONS] --host <host> --id <id> --wallet-address <wallet-address>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
        --announce-host <announce-host>      The custom host that will be reported to the directory server
        --host <host>                        The host on which the mixnode will be running
        --http-api-port <http-api-port>      The port on which the mixnode will be listening for http requests
        --id <id>                            Id of the nym-mixnode we want to create config for.
        --mix-port <mix-port>                The port on which the mixnode will be listening for mix packets
        --validators <validators>            Comma separated list of rest endpoints of the validators
        --verloc-port <verloc-port>          The port on which the mixnode will be listening for verloc packets
        --wallet-address <wallet-address>    The wallet address you will use to bond this mixnode, e.g.
                                             nymt1z9egw0knv47nmur0p8vk4rcx59h9gg4zuxrrr9

```

Initalise your mixnode with the following command, replacing the value of `--id` with the moniker you wish to give your mixnode, and the `--wallet-address` with the address you used on the Milhon Testnet **which has been auto-generated and migrated to the Sandbox testnet**. 

```
./nym-mixnode init --id winston-smithnode --host $(curl ifconfig.me) --wallet-address <wallet-address>
```

:::caution
Please make sure you have access to the `--wallet-address` account, and download the Desktop Wallet [here](https://nymtech.net/get-involved) if you have not already done so, in order to be able to interact with your node!
:::

To participate in the Nym testnet, `--host` must be publicly routable on the internet. It can be either an Ipv4 or IPv6 address. Your node _must_ be able to send TCP data using _both_ IPv4 and IPv6 (as other nodes you talk to may use either protocol). The `$(curl ifconfig.me)` command above returns your IP automatically using an external service. Alternatively, you can enter your IP manually wish. If you do this, remember to enter your IP **without** any port information.

:::caution
Please note that the `init` command will refuse to destroy existing mixnode keys.
:::

During the `init` process you will have the option to change the `http_api`, `verloc` and `mixnode` ports from their default settings. If you wish to change these in the future you can edit their values in the `config.toml` file created by the initialization process, which is located at `~/.nym/mixnodes/<your-id>/`.

### Running your mixnode

Run your mixnode with: 

```
./nym-mixnode run --id winston-smithnode
```

Which should return a nice clean startup:

```

      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (mixnode - version 0.12.1)


Starting mixnode winston-smithnode...


To bond your mixnode you will need to install the Nym wallet, go to https://nymtech.net/get-involved and select the Download button.
Select the correct version and install it to your machine. You will need to provide the following:

Identity Key: 733KdRDp9jyiTKvK6U1AGbSg8uEb7TUN8HtTEvNACTKq
Sphinx Key: BVQxKYbGmnnESLUkzmpLVNxQkqoeuCYro7EL5sfqUkxN
Owner Signature: 4eY6PEUEPMWZSBc5dSksrWWQrtCcejgPptNnNbM7MWaFKru7LzSNib8FtZdqcUGRvsySu44znPZx6QmU1snd1Zov
Host: 1.2.3.4 (bind address: 127.0.0.1)
Version: 0.12.1
Mix Port: 1789, Verloc port: 0.12.1, Http Port: 8000

You are bonding to wallet address: nymt1z9egw0knv47nmur0p8vk4rcx59h9gg4zuxrrr9


 2021-12-20T09:53:38.646Z INFO  nym_mixnode::node > Starting nym mixnode
 2021-12-20T09:53:38.856Z INFO  nym_mixnode::node > Starting node stats controller...
 2021-12-20T09:53:38.857Z INFO  nym_mixnode::node > Starting packet delay-forwarder...
 2021-12-20T09:53:38.857Z INFO  nym_mixnode::node > Starting socket listener...
```

If everything worked, you'll see your node running on the [Sandbox network explorer](https://sandbox-explorer.nymtech.net).

Note that your node's public identity key is displayed during startup, you can use it to identify your node in the list.

Keep reading to find out more about configuration options or troubleshooting if you're having issues. There are also some tips for running on AWS and other cloud providers, some of which require minor additional setup.

Also have a look at the saved configuration files in `$HOME/.nym/mixnodes/` to see more configuration options.

### Describe your mixnode (optional)

In order to easily identify your node via human-readable information later on in the development of the testnet when delegated staking is implemented, you can `describe` your mixnode with the following command:

```
./nym-mixnode describe --id winston-smithnode
```

Which will output something like this:

```

      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (mixnode - version 0.12.1)


name: winston-smithnode
description: nym-mixnode hosted on Linode VPS in <location> with the following specs: <specs>.
link, e.g. https://mixnode.yourdomain.com: mixnode.mydomain.net
```

This information will be shown in the mixnode's page in the Network Explorer, and help people make delegated staking decisions.

### Displaying mixnode information 

You can always check the details of your mixnode with the `node-details` command: 

```
./nym-mixnode node-details --id winston-smithnode


      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (mixnode - version 0.12.1)


Identity Key: 733KdRDp9jyiTKvK6U1AGbSg8uEb7TUN8HtTEvNACTKq
Sphinx Key: BVQxKYbGmnnESLUkzmpLVNxQkqoeuCYro7EL5sfqUkxN
Owner Signature: 4eY6PEUEPMWZSBc5dSksrWWQrtCcejgPptNnNbM7MWaFKru7LzSNib8FtZdqcUGRvsySu44znPZx6QmU1snd1Zov
Host: 1.2.3.4 (bind address: 127.0.0.1)
Version: 0.12.1
Mix Port: 1789, Verloc port: 0.12.1, Http Port: 8000

You are bonding to wallet address: nymt1z9egw0knv47nmur0p8vk4rcx59h9gg4zuxrrr9
```

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

Finally open your mixnode's p2p port, as well as ports for ssh, http, and https connections, and ports `8000` and `1790` for verloc and measurement pings:

```
sudo ufw allow 1789,1790,8000,22,80,443/tcp
# check the status of the firewall
sudo ufw status
```

For more information about your mixnode's port configuration, check the [mixnode port reference table](#mixnode-port-reference) below.

### Automating your mixnode with systemd

It's useful to have the mixnode automatically start at system boot time. Here's a systemd service file to do that:

```ini
[Unit]
Description=Nym Mixnode (0.12.1)
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

Change the path in `ExecStart` to point at your mixnode binary (`nym-mixnode`), and the `User` so it is the user you are running as.

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

`ulimit` is 1024 by default on most systems. It needs to be set higher, because mixnodes make and receive a lot of connections to other nodes.

If you see errors such as:

```
Failed to accept incoming connection - Os { code: 24, kind: Other, message: "Too many open files" }
```

This means that the operating system is preventing network connections from being made.

##### Set the ulimit via `systemd` service file

Query the `ulimit` of your mixnode with:

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

### Checking that your node is mixing correctly

Once you've started your mixnode and it connects to the testnet validator, your node will automatically show up in the [Nym testnet explorer](https://sandbox-explorer.nymtech.net/), or checkout the [leaderboard interface](https://nodes.guru/nym/leaderboard) created by community member Evgeny Garanin from [Nodes Guru](https://nodes.guru).

For more details see [Troubleshooting FAQ](https://nymtech.net/docs/run-nym-nodes/troubleshooting/#how-can-i-tell-my-node-is-up-and-running-and-mixing-traffic)

### Viewing command help

See all available options by running:

```
./nym-mixnode --help
```

Subcommand help is also available, e.g.:

```
./nym-mixnode upgrade --help
```

### Virtual IPs and hosting via Google & AWS

On some services (AWS, Google, etc), the machine's available bind address is not the same as the public IP address. In this case, bind `--host` to the local machine address returned by `ifconfig`, but also specify `--announce-host` with the public IP. Please make sure that you pass the correct, routable `--announce-host`.

For example, on a Google machine, you may see the following output from the `ifconfig` command:

```
ens4: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1460
        inet 10.126.5.7  netmask 255.255.255.255  broadcast 0.0.0.0
        ...
```

The `ens4` interface has the IP `10.126.5.7`. But this isn't the public IP of the machine, it's the IP of the machine on Google's internal network. Google uses virtual routing, so the public IP of this machine is something else, maybe `36.68.243.18`.

`nym-mixnode init --host 10.126.5.7`, initalises the mixnode, but no packets will be routed because `10.126.5.7` is not on the public internet.

Trying `nym-mixnode init --host 36.68.243.18`, you'll get back a startup error saying `AddrNotAvailable`. This is because the mixnode doesn't know how to bind to a host that's not in the output of `ifconfig`.

The right thing to do in this situation is `nym-mixnode init --host 10.126.5.7 --announce-host 36.68.243.18`.

This will bind the mixnode to the available host `10.126.5.7`, but announce the mixnode's public IP to the directory server as `36.68.243.18`. It's up to you as a node operator to ensure that your public and private IPs match up properly.

### Mixnode Hardware Specs

For the moment, we haven't put a great amount of effort into optimizing concurrency to increase throughput. So don't bother provisioning a beastly server with multiple cores.

- Processors: 2 cores are fine. Get the fastest CPUs you can afford.
- RAM: Memory requirements are very low - typically a mixnode may use only a few hundred MB of RAM.
- Disks: The mixnodes require no disk space beyond a few bytes for the configuration files

This will change when we get a chance to start doing performance optimizations in a more serious way. Sphinx packet decryption is CPU-bound, so once we optimise, more fast cores will be better.

### Metrics
Here is an overview of the commands for getting information about a particular node via `curl`:  

| Endpoint             | Description                                                                           | Command                                                                                        |
|----------------------|---------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------|
| `/description`       | Returns the description of the node set with the `describe` command                   | `curl <NODE_IP_ADDRESS>:8000/description`                                                      |
| `/verloc`            | Returns the verloc information of the node, updated every 12 hours                    | `curl <NODE_IP_ADDRESS>:8000/verloc`                                                           |
| `/report`            | Returns the most recent node status test report                                       | `curl https://sandbox-validator.nymtech.net/api/v1/status/mixnode/<NODE_ID>/report`            |
| `/history`           | Returns all previous test reports                                                     | `curl https://sandbox-validator.nymtech.net/api/v1/status/mixnode/<NODE_ID>/history`           |
| `/status`            | Returns the status of the node                                                        | `curl https://sandbox-validator.nymtech.net/api/v1/status/mixnode/<NODE_ID>/status`            |
| `/reward-estimation` | Returns various reward estimation statistics                                          | `curl https://sandbox-validator.nymtech.net/api/v1/status/mixnode/<NODE_ID>/reward-estimation` |
| `/stake-saturation`  | Returns the stake saturation of the node as a decimal, with `1` being fully saturated | `curl https://sandbox-validator.nymtech.net/api/v1/status/mixnode/<NODE_ID>/stake-saturation`  |
| `/core-status-count` | Returns the amount of times the node has been selected for use in network tests       | `curl https://sandbox-validator.nymtech.net/api/v1/status/mixnode/<NODE_ID>/core-status-count` | 


#### Metrics of interest 
Although some of the endpoints return information that is fairly self-explanatory, there are some which are more complex, which are explained in more detail here. 

##### `/report` 
This endpoint returns different metrics returned regarding your mixnode's uptime and package-mixing capabilities:

- `identity`: the identity key of the mixnode.
- `owner`: the address of the owner of the mixnode. 
- `last_hour`: uptime over the last hour as a percentage. 
- `last_day`: uptime over the last 24 hours as a percentage. 

##### `/reward-estimation`
This endpoint returns different metrics returned regarding your mixnode's currently estimated rewards:

- `estimated_total_node_reward`: the estimated total reward in `uNYM` that the mixnode will recieve for this epoch to be split between the operator and the delegator(s), if any.  
- `estimated_operator_reward`: the estimated total reward in `uNYM` that the operator will recieve for this epoch.   
- `estimated_delegators_reward`: the estimated reward in `uNYM` that will be split between all of the mixnode delegator(s), if any. 
- `current_epoch_start`: the UNIX timestamp of the beginning of the current epoch.
- `current_epoch_end`: the UNIX timestamp of the end of the current epoch.
- `current_epoch_uptime`: the uptime of the mixnode for the current epoch, represented as a percentage. 
- `as_at`: the UNIX timestamp when the metrics information cache was last refreshed.  

##### `/core-status-count`
This endpoint returns the number of times that the node has been selected from the rewarded set and had 1000 packets sent to it, before being used by the network monitor to test the rest of the network. 

- `identity`: the identity key of the mixnode. 
- `count`: the number of times it has been used for network testing. 


### Mixnode port reference

All mixnode-specific port configuration can be found in `$HOME/.nym/mixnodes/<your-id>/config/config.toml`. If you do edit any port configs, remember to restart your mixnode.

| Default port | Use                       |                                                                                                                                            
|--------------|---------------------------|
| `1789`       | Listen for mixnet traffic |
| `1790`       | Listen for VerLoc traffic |
| `8000`       | Metrics http API endpoint |
