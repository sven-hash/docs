---
title: "Mixnodes"
weight: 30
description: "Mixnodes accept Sphinx packets, shuffle packets together, and forward them onwards, providing strong privacy for internet users."
---
{{< lastmodified >}}

{{% notice info %}}
The Nym gateway was built in the [building nym](/docs/run-nym-nodes/build-nym/) section. If you haven't yet built Nym and want to run the code, go there first.
{{% /notice %}}

{{< table_of_contents >}}

## Upgrading your mixnode from an earlier version

If you have already been running a node on the Nym network v0.9.2 or v0.10.0, grab the new binaries from our [releases page](https://github.com/nymtech/nym/releases) and use the `upgrade` command to upgrade your configs in place.

```sh
./nym-mixnode upgrade --id your-node-id
```

Once you've upgraded, **make sure to unbond and then rebond your node** via the [Finney Testnet web wallet](https://web-wallet-finney.nymtech.net/)!

Once you have rebonded your node with 100 HALs (this is currently a hardcoded amount for the testnet), the rest of the balance in your mixnode will be returned to your wallet. Make sure to check your balance via the web wallet interface. 

## Initialize your mixnode

If you are new to Nym, here's how you initialize a mixnode:

```sh
./nym-mixnode init --id winston-smithnode --host $(curl ifconfig.me)
```

To participate in the Nym testnet, `--host` must be publicly routable on the internet. It can be either an Ipv4 or IPv6 address. Your node _must_ be able to send TCP data using _both_ IPv4 and IPv6 (as other nodes you talk to may use either protocol). The above command gets your IP automatically using an external service `$(curl ifconfig.me)`. Enter it manually if you don't have `curl` installed.

You can pick any `--id` you want.

When you run `init`, configuration files are created at `~/.nym/mixnodes/<your-id>/`.

The `init` command will refuse to destroy existing mixnode keys.

## Claim your mixnode in Telegram to recieve tokens

Testnet Finney, which works with version 0.10.x of the Nym mixnode, introduces the concept of "mixnode bonding". Each mixnode operator needs to get tokens, and bond them in our blockchain, in order to enter Testnet Finney.

To claim your mixnode, run the `sign` command, and provide your Telegram username:

```shell
./nym-mixnode sign --id winston-smithnode --text @your-telegram-username


      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (mixnode - version {{< param gatewaystable >}})


Signing the text "@your-telegram-username" using your mixnode\'s Ed25519 identity key...

Signature is: 4Yo4ZkUBxREJapzf7AxLPodQXic4cfbNziJMLxsftTQsVdm5XKUg8be8ErXhnHunsnmz8EZvuGLwSD98PifCad1f

You can claim your mixnode in Telegram by talking to our bot. To do so:

* go to the '@nymchan_help_chat' channel
* copy the following line of text, and paste it into the channel

/claim 7xdQ1USuNEZN4WbbiZFPfd59HTqFeNkxpu4zWrYGtmTz 4Yo4ZkUBxREJapzf7AxLPodQXic4cfbNziJMLxsftTQsVdm5XKUg8be8ErXhnHunsnmz8EZvuGLwSD98PifCad1f
```

Then enter the **@nymchan_help_chat** channel on Telegram and talk to the bot to associate your Telegram username with your mixnode key:

```
/claim 7xdQ1USuNEZN4WbbiZFPfd59HTqFeNkxpu4zWrYGtmTz 4Yo4ZkUBxREJapzf7AxLPodQXic4cfbNziJMLxsftTQsVdm5XKUg8be8ErXhnHunsnmz8EZvuGLwSD98PifCad1f
```

This proves to the bot that your username owns the mixnode.

Next, go to the [Finney Testnet web wallet](https://web-wallet-finney.nymtech.net/) and create a Nym address. It will look something like `hal1rytmasg5kavx4xasa0zg0u69jus8fn0r5j7nnt`. **Be sure to write down your mnemonic!**

Once you have a Nym testnet address, ask the Telegram bot for tokens:

```
/faucet hal1rytmasg5kavx4xasa0zg0u69jus8fn0r5j7nnt # your address goes here!
```

The bot will send you tokens so that you can bond your mixnode. First, you'll need to run it.


## Run your mixnode

```sh
./nym-mixnode run --id winston-smithnode
```

Should return a nice clean startup:

```shell
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

            (mixnode - version {{< param gatewaystable >}})


Starting mixnode winston-smithnode...

Directory server [presence]: http://testnet-finney-validator.nymtech.net:1317
Directory server [metrics]: http://testnet-metrics.nymtech.net:8080
Listening for incoming packets on <your-ip>:1789
Announcing the following socket address: <your-ip>:1789

To bond your mixnode, go to https://web-wallet-finney.nymtech.net/.  You will need to provide the following:
    Identity key: 7xdQ1USuNEZN4WbbiZFPfd59HTqFeNkxpu4zWrYGtmTz
    Sphinx key: 6T6PpSAzaiHMKJQPKPABXzppxLtUDB3TB4ChM16t3oYP
    Host: <your-ip>:1789
    Layer: 3
    Location: [physical location of your node\'s server]
    Version: {{< param gatewaystable >}}


```

Once the tokens arrive, go back to the web wallet and fill in the mixnode bonding form, using your mixnode's info.

If everything worked, you'll see your node running at https://testnet-finney-explorer.nymtech.net.

Note that your node's public identity key is displayed during startup, you can use it to identify your node in the list.

Keep reading to find our more about configuration options or troubleshooting if you're having issues. There are also some tips for running on AWS and other cloud providers, some of which require minor additional setup.

{{% notice info %}}
If you run into trouble, please ask for help in the channel **nymtech.friends#general** on [KeyBase](https://keybase.io).
{{% /notice %}}

Have a look at the saved configuration files to see more configuration options.

## Configure your firewall

The following commands will allow you to set up a firewall using `ufw`.

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

## Describe your mixnode (optional)

In order to easily identify your node via human-readable information later on in the development of the testnet when delegated staking is implemented, you can `describe` your mixnode with the following command:

```sh
./nym-mixnode describe --id winston-smithnode
```

Which will output something like this:

```sh

      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (mixnode - version 0.10.1)


name: winston-smithnode
description: nym-mixnode hosted on Linode VPS in <location> with the following specs: <specs>.
link, e.g. https://mixnode.yourdomain.com: mixnode.mydomain.net
```

This information will be shown in a (not yet built) mixnode page in in the Network Explorer, and help people make delegated staking decisions.

## Automating your mixnode with systemd

Although it's not totally necessary, it's useful to have the mixnode automatically start at system boot time. Here's a systemd service file to do that:

```
[Unit]
Description=Nym Mixnode ({{< param gatewaystable >}})
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

## Set the ulimit
If you are not running nym-mixnode with systemd as above with `LimitNOFILE=65536` then you will run into issues.
You **must** set your ulimit well above 1024 or your node won't work properly in the testnet. To test the `ulimit` of your mixnode:

```
grep -i "open files" /proc/$(ps -A -o pid,cmd|grep nym-mixnode | grep -v grep |head -n 1 | awk '{print $1}')/limits
```

You'll get back the hard and soft limits, something like this:

```Max open files            65536                65536                files     ```

This means you're good and your node will not encounter any `ulimit` related issues.

However;

If either value is 1024, you must raise the limit. To do so, either edit the systemd service file and add `LimitNOFILE=65536` and reload the daemon:
```systemctl daemon-reload``` as root

or execute this as root for system-wide setting of `ulimit`:

```
echo "DefaultLimitNOFILE=65535" >> /etc/systemd/system.conf
```

Reboot your machine and restart your node. When it comes back, do `cat /proc/$(pidof nym-mixnode)/limits | grep "Max open files"`  again to make sure the limit has changed to 65535.

Changing the `DefaultLimitNOFILE` and rebooting should be all you need to do. But if you want to know what it is that you just did, read on.

Linux machines limit how many open files a user is allowed to have. This is called a `ulimit`.

`ulimit` is 1024 by default on most systems. It needs to be set higher, because mixnodes make and receive a lot of connections to other nodes.

### Symptoms of ulimit problems

If you see any references to `Too many open files` in your logs:

```
Failed to accept incoming connection - Os { code: 24, kind: Other, message: "Too many open files" }
```

This means that the operating system is preventing network connections from being made. Raise your `ulimit`.



## Checking that your node is mixing correctly

Once you've started your mixnode and it connects to the testnet validator, your node will automatically show up in the [Nym testnet explorer](https://testnet-finney-explorer.nymtech.net/), or checkout the [leaderboard interface](https://nodes.guru/nym/leaderboard) created by community member Evgeny Garanin from [Nodes Guru](https://nodes.guru).

For more details see [Troubleshooting FAQ](https://nymtech.net/docs/run-nym-nodes/troubleshooting/#how-can-i-tell-my-node-is-up-and-running-and-mixing-traffic)

## Viewing command help

See all available options by running:

```
./nym-mixnode --help
```

Subcommand help is also available, e.g.:

```
./nym-mixnode upgrade --help
```

## Virtual IPs, Google, AWS, and all that

On some services (e.g. AWS, Google), the machine's available bind address is not the same as the public IP address. In this case, bind `--host` to the local machine address returned by `ifconfig`, but also specify `--announce-host` with the public IP. Please make sure that you pass the correct, routable `--announce-host`.

For example, on a Google machine, you may see the following output from the `ifconfig` command:

```
ens4: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1460
        inet 10.126.5.7  netmask 255.255.255.255  broadcast 0.0.0.0
        ...
```

The `ens4` interface has the IP `10.126.5.7`. But this isn't the public IP of the machine, it's the IP of the machine on Google's internal network. Google uses virtual routing, so the public IP of this machine is something else, maybe `36.68.243.18`.

`nym-mixnode init --host 10.126.5.7`, inits the mixnode, but no packets will be routed because `10.126.5.7` is not on the public internet.

Trying `nym-mixnode init --host 36.68.243.18`, you'll get back a startup error saying `AddrNotAvailable`. This is because the mixnode doesn't know how to bind to a host that's not in the output of `ifconfig`.

The right thing to do in this situation is `nym-mixnode init --host 10.126.5.7 --announce-host 36.68.243.18`.

This will bind the mixnode to the available host `10.126.5.7`, but announce the mixnode's public IP to the directory server as `36.68.243.18`. It's up to you as a node operator to ensure that your public and private IPs match up properly.

## Mixnode Hardware Specs

For the moment, we haven't put a great amount of effort into optimizing concurrency to increase throughput. So don't bother provisioning a beastly server with many cores.

- Processors: 2 cores are fine. Get the fastest CPUs you can afford.
- RAM: Memory requirements are very low - typically a mixnode may use only a few hundred MB of RAM.
- Disks: The mixnodes require no disk space beyond a few bytes for the configuration files

This will change when we get a chance to start doing performance optimizations in a more serious way. Sphinx packet decryption is CPU-bound, so once we optimise, more fast cores will be better.

## Mixnode Metrics

We currently have an API set up returning our metrics tests of the network. There are two endpoints to ping for information about your mixnode, `report` and `history`.

### `/report` endpoint

```sh
curl https://testnet-finney-node-status-api.nymtech.net/api/status/mixnode/<YOUR_NODE_IDENTITY>/report
```

Returns the most recent test report, and looks something like this:

```sh
{"pubKey":"3wbvb6snDfXscqNLVAoquEhHPiHvPyJMHEcw8VEnuXz1","owner":"hal1k8r8g69m2528uwzu3hsglp7h0h39zf6u405wz5","mostRecentIPV4":true,"last5MinutesIPV4":100,"lastHourIPV4":100,"lastDayIPV4":100,"mostRecentIPV6":true,"last5MinutesIPV6":100,"lastHourIPV6":100,"lastDayIPV6":100}
```

There serveral metrics of interest here regarding your mixnode's uptime and package-mixing capabilities:
- `mostRecentIPV4`: returns a `bool` for whether the most recent IPv4 connectivity test was successful.
- `last5MinutesIPV4`: returns IPv4 connectivity as a percentage over the last five minutes.
- `lastHourIPV4`: returns IPv4 connectivity as a percentage over the last hour.
- `lastDayIPV4`: returns IPv4 connectivity as a percentage over the 24 hours.
- `mostRecentIPV6`: returns a `bool` for whether the most recent IPv6 connectivity test was successful.
- `last5MinutesIPV6`: returns IPv6 connectivity as a percentage over the last five minutes.
- `lastHourIPV6`: returns IPv6 connectivity as a percentage over the last hour.
- `lastDayIPV6`: returns IPv6 connectivity as a percentage over the 24 hours.

### `/history` endpoint

```sh
curl https://testnet-finney-node-status-api.nymtech.net/api/status/mixnode/<YOUR_NODE_IDENTITY>/history
```

Returns all previous test reports as described in `/report`.
