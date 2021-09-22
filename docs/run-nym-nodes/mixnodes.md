---
sidebar_label: "Mixnodes"
description: "Mixnodes accept Sphinx packets, shuffle packets together, and forward them onwards, providing strong privacy for internet users."
hide_title: false
title: Mixnodes
---

 

:::note 

The Nym mixnode was built in the [building nym](/docs/current/run-nym-nodes/build-nym/) section. If you haven't yet built Nym and want to run the code, go there first.

:::

### Running a mixnode for the first time

After your build is finished, the `nym-mixnode` binary will be located in `/path/to/nym/target/release/` directory. You may move or copy it to wherever you wish (for example, you may wish to compile your binaries once locally and then move them to different machines).

Alternatively, you can fetch the binaries from our [releases page](https://github.com/nymtech/nym/releases).

:::caution
Please note that unless you ran a mixnode in the Finney testnet, **you will not be able to get PUNKs and bond your mixnode for the Milhon testnet**. 
Instead please look into [delegated staking](https://medium.com/nymtech/nym-delegated-staking-reputation-rewards-and-community-selection-bf0f346f7301) for how you can get involved. 
:::

:::caution
If you **do** delegate your PUNKs to others and shut down your node, remember to **save the keys located in `$HOME/.nym`!**
:::


### Upgrading your mixnode from an earlier version

If you have already been running a node on the Nym network `v0.10.0` or `0.10.1`, grab the new binaries from our [releases page](https://github.com/nymtech/nym/releases) and use the `upgrade` command to upgrade your configs in place.

```
./nym-mixnode upgrade --id your-node-id
```

Claim your mixnode in the new testnet by following the steps in the 'Claim your mixnode in Telegram to receive tokens' section below. 

### Initialize your mixnode

Here's how you initialize a mixnode if you are running one locally for testing, or just curious:

```
./nym-mixnode init --id winston-smithnode --host $(curl ifconfig.me)
```

To participate in the Nym testnet, `--host` must be publicly routable on the internet. It can be either an Ipv4 or IPv6 address. Your node _must_ be able to send TCP data using _both_ IPv4 and IPv6 (as other nodes you talk to may use either protocol). The `$(curl ifconfig.me)` command above returns your IP automatically using an external service.

You can install `curl` with:

```
sudo apt-get install curl
```

Alternatively, you can enter your IP manually wish. If you do this, remember to enter your IP **without** any port information.

You can pick any `--id` you want.

The `init` command will refuse to destroy existing mixnode keys.

During the `init` process you will have the option to change the `http_api`, `verloc` and `mixnode` ports from their default settings. If you wish to change these in the future you can edit their values in the `config.toml` file created by the initialization process, which is located at `~/.nym/mixnodes/<your-id>/`.



### Claim your mixnode in Telegram to receive tokens

In order to take part in Testnet Milhon each mixnode operator needs to get PUNK, and bond them in the blockchain. 

Go to the [Milhon Testnet web wallet](https://testnet-milhon-wallet.nymtech.net/) and create a Nym address. It will look something like `punk1rytmasg5kavx4xasa0zg0u69jus8fn0r5j7nnt`. **Be sure to write down your mnemonic!**

Once you have a Nym testnet address, ask the Telegram bot for tokens. Run the `sign` command:

```
./nym-mixnode sign --id winston-smithnode --text "@<YOUR_TELEGRAM_USERNAME> <YOUR_PUNK_WALLET_ADDRESS>"


      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (mixnode - version 0.11.0)

    
Signing the text "@winston_smithnode_telegram punk1rytmasg5kavx4xasa0zg0u69jus8fn0r5j7nnt" using your mixnode's Ed25519 identity key...

Signature is: 3Zo2uMmK5x1WcMQWfqrd9MWw3N4updUBsAPM4tejfWMfMjS55jxsjyMXZ2pwBCJbhvBxkREBJ8R9ED2UcMRJprrU

You can claim your mixnode in Telegram by talking to our bot. To do so:

* go to the 'https://t.me/nympunkbot' channel
* copy the following line of text, and paste it into the channel

/transfer punk1rytmasg5kavx4xasa0zg0u69jus8fn0r5j7nnt 3Zo2uMmK5x1WcMQWfqrd9MWw3N4updUBsAPM4tejfWMfMjS55jxsjyMXZ2pwBCJbhvBxkREBJ8R9ED2UcMRJprrU
```

Then enter the **[@nympunkbot](https://t.me/nympunkbot)** channel on Telegram and talk to the bot to associate your Telegram username with your mixnode key:

```
/transfer punk1rytmasg5kavx4xasa0zg0u69jus8fn0r5j7nnt 3Zo2uMmK5x1WcMQWfqrd9MWw3N4updUBsAPM4tejfWMfMjS55jxsjyMXZ2pwBCJbhvBxkREBJ8R9ED2UcMRJprrU
```

This proves to the bot that your username owns the mixnode. 

:::caution
**Do not send tokens to `punk10pyejy66429refv3g35g2t7am0was7yalwrzen` thinking this is your address - this is the address of the mixnet smart contract**.
:::

### Run your mixnode

```
./nym-mixnode run --id winston-smithnode
```

Should return a nice clean startup:

```


      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (mixnode - version 0.11.0)

    
Starting mixnode winston-smithnode...
Validator servers: ["http://testnet-milhon-validator1.nymtech.net:1317", "http://testnet-milhon-validator2.nymtech.net:1317"]
Listening for incoming packets on 89.144.210.254
Announcing the following address: 89.144.210.254

To bond your mixnode, go to https://testnet-milhon-wallet.nymtech.net/.  You will need to provide the following:
    Identity key: D5yLugjknoZ8gwEjQVvFSVckNPur6qYLSPFsKJcZUruR
    Sphinx key: Fh7BjMTYv4KAzXjoFzsz3PUpJ2wT2i6fsSTDQQuJ916Y
    Address: 89.144.210.254
    Version: 0.11.0
    
 2021-07-21T13:31:34.672Z INFO  nym_mixnode::node > Starting nym mixnode
 2021-07-21T13:31:35.083Z INFO  nym_mixnode::node > Starting node stats controller...
 2021-07-21T13:31:35.084Z INFO  nym_mixnode::node > Starting packet delay-forwarder...
 2021-07-21T13:31:35.084Z INFO  nym_mixnode::node > Starting socket listener...
 2021-07-21T13:31:35.084Z INFO  nym_mixnode::node::listener > Running mix listener on "89.144.210.254:1789"
 2021-07-21T13:31:35.084Z INFO  nym_mixnode::node           > Starting the round-trip-time measurer...


```

Now bond your mixnode in the [Milhon web wallet](https://testnet-milhon-wallet.nymtech.net/) before running your node. 

If everything worked, you'll see your node running on the [Milhon network explorer](https://testnet-milhon-explorer.nymtech.net).

Note that your node's public identity key is displayed during startup, you can use it to identify your node in the list.

Keep reading to find out more about configuration options or troubleshooting if you're having issues. There are also some tips for running on AWS and other cloud providers, some of which require minor additional setup.

Have a look at the saved configuration files to see more configuration options.


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

             (mixnode - version 0.11.0)


name: winston-smithnode
description: nym-mixnode hosted on Linode VPS in <location> with the following specs: <specs>.
link, e.g. https://mixnode.yourdomain.com: mixnode.mydomain.net
```

This information will be shown in a (not yet built) mixnode page in in the Network Explorer, and help people make delegated staking decisions.

### Automating your mixnode with systemd

Although it's not totally necessary, it's useful to have the mixnode automatically start at system boot time. Here's a systemd service file to do that:

```ini
[Unit]
Description=Nym Mixnode (0.11.0)
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

#### Set the ulimit

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

Once you've started your mixnode and it connects to the testnet validator, your node will automatically show up in the [Nym testnet explorer](https://testnet-milhon-explorer.nymtech.net/), or checkout the [leaderboard interface](https://nodes.guru/nym/leaderboard) created by community member Evgeny Garanin from [Nodes Guru](https://nodes.guru).

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

`nym-mixnode init --host 10.126.5.7`, initializes the mixnode, but no packets will be routed because `10.126.5.7` is not on the public internet.

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

There are currently two options for getting information about your mixnode. `description` and `verloc` are accessed via your mixnode's http API, whilst `report` and `history` are reported by the Nym node status API.

| Endpoint       | Description                                                                                                                                                                                      | Command                                                                                                                               |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `/report`      | Returns the most recent node status test report                                                                                                                                                  | `curl https://testnet-milhon-validator1.nymtech.net/api/v1/status/mixnode/<YOUR_NODE_ID>/report`        |
| `/history`     | Returns all previous test reports                                                                                                                                                                | `curl https://testnet-milhon-validator1.nymtech.net/api/v1/status/mixnode/<YOUR_NODE_ID>/history`       |
| `/description` | Returns the description of your node set with the `describe` command. | `curl <YOUR_NODE_IP>:8000/description`                                                                                                |
| `/verloc`      | Returns the verloc information of your node, which is updated every 12 hours.                                                                                                                    | `curl <YOUR_NODE_IP>:8000/verloc`                                                                                                     |


There several metrics of interest returned by `/report` regarding your mixnode's uptime and package-mixing capabilities:

- `mostRecentIPV4`: returns a `bool` for whether the most recent IPv4 connectivity test was successful.
- `last5MinutesIPV4`: returns IPv4 connectivity as a percentage over the last five minutes.
- `lastHourIPV4`: returns IPv4 connectivity as a percentage over the last hour.
- `lastDayIPV4`: returns IPv4 connectivity as a percentage over the 24 hours.
- `mostRecentIPV6`: returns a `bool` for whether the most recent IPv6 connectivity test was successful.
- `last5MinutesIPV6`: returns IPv6 connectivity as a percentage over the last five minutes.
- `lastHourIPV6`: returns IPv6 connectivity as a percentage over the last hour.
- `lastDayIPV6`: returns IPv6 connectivity as a percentage over the 24 hours.


### Mixnode port reference

All mixnode-specific port configuration can be found in `$HOME/.nym/mixnodes/<your-id>/config/config.toml`. If you do edit any port configs, remember to restart your mixnode.

| Default port | Use                       |                                                                                                                                            
|--------------|---------------------------|
| `1789`       | Listen for mixnet traffic |
| `1790`       | Listen for VerLoc traffic |
| `8000`       | Metrics http API endpoint |
