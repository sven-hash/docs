---
title: "Mixnode Troubleshooting FAQ"
weight: 42
description: "This page will help you find answers to common issues with setting up and maintaining mixnodes"
---

{{< lastmodified >}}

{{< table_of_contents >}}

<a name="ismixing" />

## How can I tell my node is up and running and mixing traffic?

First of all check the 'Mixnodes' section of the testnet [dashboard](https://testnet-finney-explorer.nymtech.net/) and enter your **identity key**, and you should see your node. Alternatively you can check the [leaderboard interface](https://nodes.guru/nym/leaderboard) created by community member Evgeny Garanin from [Nodes Guru](https://nodes.guru).

If you want more information, or if your node isn't showing up and you want to double-check, here are some examples on how to check if the node is configured properly.

### Check from your VPS

Additional details can be obtained via various methods after you connect to your VPS:

#### Socket statistics with `ss`

```sh
sudo ss -s -t | grep 1789 # if you have specified a different port in your mixnode config, change accordingly
```
This command should return a lot of data containing `ESTAB`. This command should work on every unix based system.

#### List open files and reliant processes with `lsof`

```sh
# check if lsof is installed:
lsof -v
# install if not installed
sudo apt install lsof
# run against mixnode port
sudo lsof -i TCP:1789 # if you have specified a different port in your mixnode config, change accordingly
```

This command should return something like this:

```sh
nym-mixno 103349 root   53u  IPv6 1333229972      0t0  TCP [2a03:b0c0:3:d0::ff3:f001]:57844->[2a01:4f9:c011:38ae::5]:1789 (ESTABLISHED)
nym-mixno 103349 root   54u  IPv4 1333229973      0t0  TCP nym:57104->194.5.78.73:1789 (ESTABLISHED)
nym-mixno 103349 root   55u  IPv4 1333229974      0t0  TCP nym:48130->static.236.109.119.168.clients.your-server.de:1789 (ESTABLISHED)
nym-mixno 103349 root   56u  IPv4 1333229975      0t0  TCP nym:52548->vmi572614.contaboserver.net:1789 (ESTABLISHED)
nym-mixno 103349 root   57u  IPv6 1333229976      0t0  TCP [2a03:b0c0:3:d0::ff3:f001]:43244->[2600:1f18:1031:2401:c04b:2f25:ca79:fef3]:1789 (ESTABLISHED)
```

#### Query `systemd` journal with `journalctl`

```sh
sudo journalctl -u nym-mixnode -o cat | grep "Since startup mixed"
```

If you have created `nym-mixnode.service` file (i.e. you are running your mixnode via `systemd`) then this command shows you how many packets have you mixed so far, and should return a list of messages like this:

```sh
2021-05-18T12:35:24.057Z INFO  nym_mixnode::node::metrics                      > Since startup mixed 233639 packets!
2021-05-18T12:38:02.178Z INFO  nym_mixnode::node::metrics                      > Since startup mixed 233739 packets!
2021-05-18T12:40:32.344Z INFO  nym_mixnode::node::metrics                      > Since startup mixed 233837 packets!
2021-05-18T12:46:08.549Z INFO  nym_mixnode::node::metrics                      > Since startup mixed 234081 packets!
2021-05-18T12:56:57.129Z INFO  nym_mixnode::node::metrics                      > Since startup mixed 234491 packets!
```

You can add ` | tail` to the end of the command to watch for new entries in real time if needed.

### Check from your local machine

#### Scan ports with `nmap`:

```sh
nmap -p 1789 <IP ADDRESS> -Pn
```

If your mixnode is configured properly it should output something like this:

```
bob@desktop:~$ nmap -p 1789 95.296.134.220 -Pn

Host is up (0.053s latency).

PORT     STATE SERVICE
1789/tcp open  hello
```

#### Query all nodes and parse with `jq`:

```sh
curl https://testnet-finney-explorer.nymtech.net/data/mixnodes.json | jq
```

Should return a JSON object of all nodes currently online.

This command can be further parsed by various keys, such as location:

```sh
curl https://testnet-finney-explorer.nymtech.net/data/mixnodes.json | jq -r '.[].mix_node | select(.location == "London")'
```

or address:

```
curl https://testnet-finney-explorer.nymtech.net/data/mixnodes.json | jq -r '.[].mix_node | select(.host | startswith("65.21")) | .host'
```

### Check with testnet API

We currently have an API set up returning our metrics tests of the network. There are two endpoints to ping for information about your mixnode, `report` and `history`. Find more information about this in the [Mixnodes metrics documentation]( {{< ref "./mixnodes.md#mixnode-metrics" >}} ).


## Why is my node not mixing any packets?

If you are still unable to see your node on the [dashboard](https://testnet-finney-explorer.nymtech.net/), or your node is declaring it has not mixed any packets, there are several potential issues:
- The firewall on your host machine is not configured properly.
- You provided incorrect information when bonding your node via the [web wallet](web-wallet-finney.nymtech.net)
- You are running your mixnode from a VPS without IPv6 support.
- You did not use the `--announce-host` flag while running the mixnode from your local machine behind NAT.
- You did not configure your router firewall while running the mixnode from your local machine behind NAT, or you are lacking IPv6 support.
- Your mixnode is not running at all, it has either exited / panicked or you closed the session without making the node persistent.

{{% notice info %}}
Your mixnode **must speak both IPv4 and IPv6** in order to cooperate with other nodes and route traffic. This is a common reason behind many errors we are seeing among node operators, so check with your provider that your VPS is able to do this!   
{{% /notice %}}

### Incorrectly configured firewall

The most common reason your mixnode might not be mixing packets is due to a poorly configured firewall. The following commands will allow you to set up a firewall using `ufw`.

```sh
# check if you have ufw installed
ufw version
# if it is not installed, install with
sudo apt install ufw -y
# enable ufw
sudo ufw enable
# check the status of the firewall
sudo ufw status
```

Finally open your mixnode's p2p port, as well as ports for ssh, http, and https connections:

```sh
sudo ufw allow 1789,22,80,443/tcp
# check the status of the firewall
sudo ufw status
```

### Incorrect bonding information

Check that you have provided the correct information when bonding your mixnode in the web wallet [interface](web-wallet-finney.nymtech.net). When in doubt, unbond and then rebond your node!

### Missing `announce-host` flag

On certain cloud providers such as AWS and Google Cloud, you need to do some additional configuration of your firewall and use ```--host``` with your **local ip** and ```--announce-host``` with the **public ip** of your mixnode host.

### No IPv6 connectivity

Make sure that your VPS has IPv6 connectivity available with whatever provider you are using.

To get all ip addresses of your host, try following commands:

```sh
hostname -i
```
Will return your **local ip** address.

```sh
hostname -I
```
Will return all of the ip addresses of your host. This output should look something like this:

```sh
bob@nym:~$ hostname -I
88.36.11.23 172.18.0.1 2a01:28:ca:102::1:641
```

* The first **ipv4** is the public ip you need to use for the ```--announce-host``` flag.
* The second **ipv4** is the local ip you need to use for the ```--host``` flag.
* The 3rd output should confirm if your machine has ipv6 available.

### Running on a local machine behind NAT with no fixed IP address

Your ISP has to be IPv6 ready if you want to run a mixnode on your local machine. Sadly, in 2020, most of them are not and you won't get an IPv6 address by default from your ISP. Usually it is a extra paid service or they simply don't offer it.

Before you begin, check if you have IPv6 [here](https://test-ipv6.cz/). If not, then don't waste your time to run a node which won't ever be able to mix any packet due to this limitation. Call your ISP and ask for IPv6, there is a plenty of it for everyone!

If all goes well and you have IPv6 available, then you will need to ```init``` the mixnode with an extra flag, ```--announce-host```. You will also need to edit your `config.toml` file each time your IPv4 address changes, that could be a few days or a few weeks.

Additional configuration on your router might also be needed to allow traffic in and out to port 1789 and IPv6 support.

Here is a sample of the `init` command to create the mixnode config.

```
./target/release/nym-mixnode init --id nym-nat --host 0.0.0.0 --announce-host 85.160.12.13 --layer 3
```

- `--host 0.0.0.0` should work everytime even if your local machine IPv4 address changes. For example on Monday your router gives your machine an address `192.168.0.13` and on Wednesday, the DHCP lease will end and you will be asigned `192.168.0.14`. Using `0.0.0.0` should avoid this without having to set any static ip in your router`s configuration.

- you can get your current IPv4 address by either using `curl ipinfo.io` if you're on MacOS or Linux or visiting [whatsmyip site](https://www.whatsmyip.org/). Simply copy it and use it as `--anounce-host` address.

Make sure you check if your node is really mixing. You will need a bit of luck to set this up from your home behind NAT.

### `tokio runtime worker` error

If you are running into issues with an error including the following:

```sh
thread 'tokio-runtime-worker' panicked at 'Failed to create TCP listener: Os { code: 99, kind: AddrNotAvailable, message: "Cannot assign requested address"
```

Then you need to `--announce-host <public ip>` and ``--host <local ip>` on startup. This issue arises because of your use of a provider like AWS or Google Cloud, and the fact that your VPS' available bind address is not the same as the public IP address (see [Virtual IPs, Google, AWS, and all that]( {{< ref "./mixnodes.md#virtual-ips-google-aws-and-all-that" >}} ) for more information on this issue).  

### Accidentally killing your node process on exiting session

When you close your current terminal session, you need to make sure you don't kill the mixnode process! There are multiple ways on how to make it persistent even after exiting your ssh session, the easiest solution is to use `nohup`, and the more elegant solution is to run the node with `systemd`.

#### Running your mixnode as a background process with `nohup`

`nohup` is a command with which your terminal is told to ignore the `HUP` or 'hangup' signal. This will stop the mixnode process ending if you kill your session.

```sh
nohup ./nym-mixnode run --id NYM # where `--id NYM` is the id you set during the `init` command.
```

#### Running your mixnode as a background process with `systemd`
The most reliable and elegant solution is to create a `systemd.service` file and run the nym-mixnode with `systemctl` command.

Create a file with `nano` at `/etc/systemd/system/nym-mixnode.service` containing the following:

```sh
[Unit]
Description=nym mixnode service
After=network.target

[Service]
Type=simple
User=nym                                      # change as appropriate
LimitNOFILE=65536
ExecStart=/home/nym/nym-mixnode run --id nym  # change as appropriate
KillSignal=SIGINT
Restart=on-failure
RestartSec=30
Restart=on-abort
[Install]
WantedBy=multi-user.target
```

```sh
# enable the service
sudo systemctl enable nym-mixnode
# start the service
sudo systemctl start nym-mixnode
# check if the service is running properly and mixnode is mixing
sudo systemctl status nym-mixnode
```

Now your node should be mixing all the time, and restart if you reboot your server!

Anytime you change your `systemd` service file you need to `sudo systemctl daemon-reload` in order to restart the service.


## Network configuration seems fine but log still claims `Since startup mixed 0 packets!`

This behavior is most likely caused by a mismatch between your node configuration and the bonding information. Go to <https://web-wallet-finney.nymtech.net/>, unbond your node, and bond it again. The re-bonding procedure does not cost any additional HAL, so you can do it as often as you like.

Make sure to enter all the information in the web wallet exactly as it appears in the log when you start the mixnode process. In particular, the `host` field must contain the port information:

- correct host:  `34.12.3.43:1789`
- incorrect host:`34.12.3.43`

## Can I use a port other than 1789 ?

Yes! Here is what you will need to do:

Let's say you would like to use port `1337` for your mixnode. First you need to open the new port:

```sh
sudo ufw allow 1337
```

Now you need to edit the mixnode's config.

{{% notice info %}}
If you want to change the port for an already running node, you need to stop the process before editing your config file.
{{% /notice %}}

Assuming your node name is `nym`, the config file is located at `~/.nym/mixnodes/nym/config/config.toml`.
```
nano ~/.nym/mixnodes/nym/config/config.toml
```
You will need to edit two parts of the file. `announce_address` and `listening_address` in the config.toml file. Simply replace `:1789` (the default port) with `:1337` (your new port) after your IP address.

Finally, restart your node. You should see if the mixnode is using the port you have changed in the config.toml file right after you run the node.

## Where can I find my private and public keys and mixnode config?

All config and keys files are stored in a directory named after your `id` which you chose during the `init` process, and can be found at the following PATH: `$HOME/.nym/mixnodes/` where `$HOME` is a home directory of the user (your current user in this case) that launched the mixnode.

Depending on how you installed Nym, the files will be stored here:

1. Autoinstaller - `/home/nym/.nym/mixnodes/<YOURNODEID>`
2. Built from source as your user or root - `~/.nym/mixnodes/<YOURNODEID>`

The directory structure is as follows:

```
bob@nym:~$ tree /home/nym/.nym/mixnodes/
/home/nym/.nym/mixnodes/
|-- nym010
|   |-- config
|   |   `-- config.toml
|   `-- data
|       |-- private_identity.pem
|       |-- private_sphinx.pem
|       |-- public_identity.pem
|       `-- public_sphinx.pem


```

{{% notice info %}}
If you `cat` the `public_sphinx.pem key`, the output will be different from the public key you will see on Nym [dashboard](https://testnet-finney-explorer.nymtech.net/). The reason for this is that `.pem` files are encoded in **base64**, however on the web they are in **base58**. Don't be confused if your keys look different. They are the same keys, just with different encoding :).
{{% /notice %}}

## What is `verloc` and do I have to configure my mixnode to implement it?
`verloc` is short for _verifiable location_. Mixnodes and gateways now measure speed-of-light distances to each other, in an attempt to verify how far apart they are. In later releases, this will allow us to algorithmically verify node locations in a non-fakeable and trustworthy manner.

You don't have to do any additional configuration for your node to implement this, it is a passive process that runs in the background of the mixnet from version `0.10.1` onwards.

## I keep seeing `Connection to <IP>:1789 seems to be dead` messages. Is this normal?

Yes, this is normal at the moment, and is **nothing to do with your mixnode**! It is simply a warning that your node is unable to connect to other peoples' mixnodes for some reason, most likely because they are offline or poorly configured.

## I keep seeing ERROR or WARN messages in my node logs. Why is that ?

I have seen quite a few errors from community members in our [Telegram help chat](https://t.me/nymchan_help_chat).

Most of them are benign. Usually you will encounter errors when your nodes tries to estabilish a connection with a "dead" node, that is misconfigured(most likely its firewall is).

As long as your node outputs `since startup mixed 1337 packets!` in your logs, you should be fine. If you want to be sure, check the Nym [dashboard](https://testnet-finney-explorer.nymtech.net/) or see other ways on how to check if your node is really mixing, mentioned in section **How can I tell my node is up and running and mixing traffic?** in this wiki.


## Where can I get more help?

The fastest way to reach one of us or get a help from the community, visit our [Telegram help chat](https://t.me/nymchan_help_chat).

For more tech heavy questions join our Keybase channel. Get Keybase [here](https://keybase.io/), then click Teams -> Join a team. Type nymtech.friends into the team name and hit continue. For general chat, hang out in the #general channel. Our development takes places in the #dev channel.
