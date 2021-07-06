---
title: "Gateways"
weight: 40
description: "Gateways provide a destination for mixnet packets. Most of the internet doesn't use encrypted Sphinx packets, so the gateway acts as a destination for Sphinx traffic."
---

{{< note title=" " >}}
The Nym gateway was built in the [building nym](/docs/run-nym-nodes/build-nym/) section. If you haven't yet built Nym and want to run the code, go there first.
{{< /note >}}


Gateways provide a destination for mixnet packets. Most of the internet doesn't use encrypted Sphinx packets, so the gateway acts as a destination, sort of like a mailbox, for messages.

Nym clients connect to gateways. Messages are automatically piped to connected clients and deleted from the gateway's disk storage. If a client is offline when a message arrives, it will be stored for later retrieval. When the client connects, all messages will be delivered, and deleted from the gateway's disk. As of release 0.8.x gateways use end-to-end encryption, so they cannot see the content of what they're storing for users.

When it starts up, a client registers itself with a gateway, and the gateway returns an access token. The access token plus the gateway's IP can then be used as a form of addressing for delivering packets.

The default gateway implementation included in the Nym platform code holds packets for later retrieval. For many applications (such as simple chat), this is usable out of the box, as it provides a place that potentially offline clients can retrieve packets from. The access token allows clients to pull messages from the gateway node.

If you would like to run a gateway for the network, please get in touch via **nymtech.friends#general** on [KeyBase](https://keybase.io) or [email us](mailto:max@nymtech.net).

{{< table_of_contents >}}

## Initializing your gateway

You can check that your binaries are properly compiled with:

```shell
./nym-gateway
```

Which should return:

```shell
$ ./nym-gateway


      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (gateway - version {{< param gatewaystable >}})



usage: --help to see available options.
```

To check available configuration options use:

```shell
./nym-gateway init --help
```

In order to initialize your gateway the `id`, `clients-host`, and `mix-host` parameters are required, although feel free to experiment with adding any of the other flags output from the `--help` command above.

- `--id` specifies a human-readable name for this gateway. This also determines the location of your gateway's config file, so keep it to one word for ease.
- `--clients-host` needs to be an IPv4 or IPv6 address. This is the IP that the gateway will listen on for requests coming from Nym clients.
- `--mix-host` needs to be an IPv4 or IPv6 address. This is the IP that the gateway will listen on for incoming Sphinx packets coming from the mixnet.

For example, the following command returns a gateway on your current IP with the `id` of `supergateway`:

```shell
root@localhost:~# ./nym-gateway init --clients-host $(curl ifconfig.me) --mix-host $(curl ifconfig.me) --id supergateway

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    13  100    13    0     0     25      0 --:--:-- --:--:-- --:--:--    25
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    13  100    13    0     0     61      0 --:--:-- --:--:-- --:--:--    61


      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (gateway - version {{< param gatewaystable >}})


Initialising gateway supergateway...
Saved identity and mixnet sphinx keypairs
Saved configuration file to "/path/to/.nym/gateways/supergateway/config/config.toml"
Gateway configuration completed.



Public identity key: 3M2seioUjFw8drmTJabP8c8e6Ds9MBhsGwrzAfk2x64L

Public sphinx key: 2Rk7UQ2xqsbQtaTLpRVEzMDrV12xSg54mLsqvq1cTHhs


To bond your gateway you will [most likely] need to provide the following:
    Identity key: 3M2seioUjFw8drmTJabP8c8e6Ds9MBhsGwrzAfk2x64L
    Sphinx key: 2Rk7UQ2xqsbQtaTLpRVEzMDrV12xSg54mLsqvq1cTHhs
    Mix Host: 194.195.246.82:1789
    Clients Host: ws://194.195.246.82:9000
    Location: [physical location of your node\'s server]
    Version: {{< param gatewaystable >}}
```

Gateways **must** also be capable of addressing IPv6, which is something that is hard to come by with many ISPs. Running a gateway from behind your router will be tricky because of this, and we strongly recommend to run your gateway on a VPS. Additional to IPv6 connectivity, this will help maintain better uptime and connectivity.

## Running your gateway

The `run` command runs the gateway.

Example:

`./nym-gateway run --id supergateway`

Results in:

```shell
./nym-gateway run --id supergateway


      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (gateway - version {{< param gatewaystable >}})


Starting gateway supergateway...
Public sphinx key: 2Rk7UQ2xqsbQtaTLpRVEzMDrV12xSg54mLsqvq1cTHhs

Public identity key: 3M2seioUjFw8drmTJabP8c8e6Ds9MBhsGwrzAfk2x64L

Validator REST endpoint: http://testnet-{{< param testnetNameLowercase >}}-validator.nymtech.net:1317
Listening for incoming sphinx packets on 194.195.246.82:1789
Announcing the following socket address for sphinx packets: 194.195.246.82:1789
Listening for incoming clients packets on 194.195.246.82:9000
Announcing the following socket address for clients packets: ws://194.195.246.82:9000
Inboxes directory is: "/root/.nym/gateways/supergateway/data/inboxes"
Clients ledger is stored at: "/root/.nym/gateways/supergateway/data/client_ledger.sled"
 2021-05-26T19:55:14.432Z INFO  nym_gateway::node > Starting nym gateway!
 2021-05-26T19:55:14.826Z INFO  nym_gateway::node > Starting mix packet forwarder...
 2021-05-26T19:55:14.826Z INFO  nym_gateway::node > Starting clients handler
 2021-05-26T19:55:14.827Z INFO  nym_gateway::node > Starting mix socket listener...
 2021-05-26T19:55:14.827Z INFO  nym_gateway::node::mixnet_handling::receiver::listener > Running mix listener on "194.195.246.82:1789"
 2021-05-26T19:55:14.827Z INFO  nym_gateway::node::mixnet_handling::receiver::listener > Starting mixnet listener at 194.195.246.82:1789
 2021-05-26T19:55:14.827Z INFO  nym_gateway::node                                      > Starting client [web]socket listener...
 2021-05-26T19:55:14.827Z INFO  nym_gateway::node::client_handling::websocket::listener > Starting websocket listener at 194.195.246.82:9000
 2021-05-26T19:55:14.827Z INFO  nym_gateway::node                                       > Finished nym gateway startup procedure - it should now be able to receive mix and client traffic!
```

### Configure your firewall

Although your gateway is now ready to receive traffic, your server may not be - the following commands will allow you to set up a properly configured firewall using `ufw`:

```shell
# check if you have ufw installed
ufw version
# if it is not installed, install with
sudo apt install ufw -y
# enable ufw
sudo ufw enable
# check the status of the firewall
sudo ufw status
```

Finally open your gateway's p2p port, as well as ports for ssh and incoming traffic connections:

```shell
sudo ufw allow 1789,22,9000/tcp
# check the status of the firewall
sudo ufw status
```

For more information about your gateway's port configuration, check the [gateway port reference table]({{< ref "#gateway-port-reference" >}}) below.

## Automating your mixnode with systemd

Although it's not totally necessary, it's useful to have the gateway automatically start at system boot time. Here's a systemd service file to do that:

```ini
[Unit]
Description=Nym Gateway ({{< param gatewaystable >}})
StartLimitInterval=350
StartLimitBurst=10

[Service]
User=nym
LimitNOFILE=65536
ExecStart=/home/nym/nym-gateway run --id supergateway
KillSignal=SIGINT
Restart=on-failure
RestartSec=30

[Install]
WantedBy=multi-user.target
```

Put the above file onto your system at `/etc/systemd/system/nym-gateway.service`.

Change the path in `ExecStart` to point at your gateway binary (`nym-gateway`), and the `User` so it is the user you are running as.

If you have built nym on your server, and your username is `jetpanther`, then the start command might look like this:

`ExecStart=/home/jetpanther/nym/target/release/nym-gateway run --id your-id`. Basically, you want the full `/path/to/nym-gateway run --id whatever-your-node-id-is`

Then run:

```shell
systemctl enable nym-gateway.service
```

Start your node:

```shell
service nym-gateway start
```

This will cause your node to start at system boot time. If you restart your machine, the node will come back up automatically.

You can also do `service nym-gateway stop` or `service nym-gateway restart`.

Note: if you make any changes to your systemd script after you've enabled it, you will need to run:

```shell
systemctl daemon-reload
```

This lets your operating system know it's ok to reload the service configuration.

## Gateway port reference

All gateway-specific port configuration can be found in `$HOME/.nym/gateways/<your-id>/config/config.toml`. If you do edit any port configs, remember to restart your gateway.

| Default port | Use                       |
|--------------|---------------------------|
| 1789         | Listen for Mixnet traffic |
| 9000         | Listen for Client traffic |
