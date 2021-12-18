---
sidebar_label: "Gateways"
description: "Gateways provide a destination for mixnet packets. Most of the internet doesn't use encrypted Sphinx packets, so the gateway acts as a destination for Sphinx traffic."
hide_title: false
title: Gateways
---

 

:::note

The Nym gateway was built in the [building nym](/docs/0.11.0/run-nym-nodes/build-nym/) section. If you haven't yet built Nym and want to run the code, go there first.

:::



Gateways provide a destination for mixnet packets. Most of the internet doesn't use encrypted Sphinx packets, so the gateway acts as a destination, sort of like a mailbox, for messages.

Nym clients connect to gateways. Messages are automatically piped to connected clients and deleted from the gateway's disk storage. If a client is offline when a message arrives, it will be stored for later retrieval. When the client connects, all messages will be delivered, and deleted from the gateway's disk. As of release 0.8.x gateways use end-to-end encryption, so they cannot see the content of what they're storing for users.

When it starts up, a client registers itself with a gateway, and the gateway returns an access token. The access token plus the gateway's IP can then be used as a form of addressing for delivering packets.

The default gateway implementation included in the Nym platform code holds packets for later retrieval. For many applications (such as simple chat), this is usable out of the box, as it provides a place that potentially offline clients can retrieve packets from. The access token allows clients to pull messages from the gateway node.

### Initialising your gateway

You can check that your binaries are properly compiled with:

```
./nym-gateway
```

Which should return:

```

      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (gateway - version 0.11.0)



usage: --help to see available options.
```

To check available configuration options use:

```
 ./nym-gateway init --help
```

In order to initalise your gateway the `id` and `host` parameters are required, although feel free to experiment with adding any of the other flags output from the `--help` command above:

```
--announce-host <announce-host>        The host that will be reported to the directory server
--clients-ledger <clients-ledger>      Ledger file containing registered clients
--clients-port <clients-port>          The port on which the gateway will be listening for clients gateway-
                                               requests
--host <host>                          The custom host on which the gateway will be running for receiving sphinx
                                               packets
--id <id>                              Id of the gateway we want to create config for.
--inboxes <inboxes>                    Directory with inboxes where all packets for the clients are stored
--mix-port <mix-port>                  The port on which the gateway will be listening for sphinx packets
--mixnet-contract <mixnet-contract>    Address of the validator contract managing the network
--validators <validators>              Comma separated list of rest endpoints of the validators
```

For example, the following command returns a gateway on your current IP with the `id` of `supergateway`:

```
 ./nym-gateway init --id supergateway --host $(curl ifconfig.me)
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    14  100    14    0     0    125      0 --:--:-- --:--:-- --:--:--   123


      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (gateway - version 0.11.0)

    
Initialising gateway supergateway...
Saved identity and mixnet sphinx keypairs
Saved configuration file to "/home/nym/.nym/gateways/supergateway/config/config.toml"
Gateway configuration completed.



Public identity key: 398BwaVTnnA4Drv878Znmdiat1fGbQ1qgzxd3rZEfqRA

Public sphinx key: Gk1WYjVAGuyMFitJGxUGKH3TuvFvKx6B9amP7kzbFrSe


To bond your gateway you will [most likely] need to provide the following:
    Identity key: 398BwaVTnnA4Drv878Znmdiat1fGbQ1qgzxd3rZEfqRA
    Sphinx key: Gk1WYjVAGuyMFitJGxUGKH3TuvFvKx6B9amP7kzbFrSe
    Host: 172.105.67.104
    Mix Port: 1789
    Clients Port: 9000
    Location: [physical location of your node's server]
```

Gateways **must** also be capable of addressing IPv6, which is something that is hard to come by with many ISPs. Running a gateway from behind your router will be tricky because of this, and we strongly recommend to run your gateway on a VPS. Additional to IPv6 connectivity, this will help maintain better uptime and connectivity.

Remember to bond your node via the [Milhon Testnet web wallet](https://testnet-milhon-wallet.nymtech.net/)! This is required for the blockchain to recognize your node and its software version, and include your gateway in the mixnet. 

### Running your gateway

The `run` command runs the gateway.

Example:

`./nym-gateway run --id supergateway`

Results in:

```
 ./nym-gateway run --id supergateway


      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (gateway - version 0.11.0)


Starting gateway supergateway...
Public sphinx key: Gk1WYjVAGuyMFitJGxUGKH3TuvFvKx6B9amP7kzbFrSe

Public identity key: 398BwaVTnnA4Drv878Znmdiat1fGbQ1qgzxd3rZEfqRA

Validator servers: ["http://testnet-milhon-validator1.nymtech.net:1317"]
Listening for incoming packets on 172.105.67.104
Announcing the following address: 172.105.67.104
Inboxes directory is: "/home/nym/.nym/gateways/supergateway/data/inboxes"
Clients ledger is stored at: "/home/nym/.nym/gateways/supergateway/data/client_ledger.sled"
 2021-07-20T15:08:36.751Z INFO  nym_gateway::node > Starting nym gateway!
 2021-07-20T15:08:36.849Z INFO  nym_gateway::node > Starting mix packet forwarder...
 2021-07-20T15:08:36.849Z INFO  nym_gateway::node > Starting clients handler
 2021-07-20T15:08:36.850Z INFO  nym_gateway::node > Starting mix socket listener...
 2021-07-20T15:08:36.850Z INFO  nym_gateway::node::mixnet_handling::receiver::listener > Running mix listener on "172.105.67.104:1789"
 2021-07-20T15:08:36.850Z INFO  nym_gateway::node::mixnet_handling::receiver::listener > Starting mixnet listener at 172.105.67.104:1789
 2021-07-20T15:08:36.850Z INFO  nym_gateway::node                                      > Starting client [web]socket listener...
 2021-07-20T15:08:36.850Z INFO  nym_gateway::node::client_handling::websocket::listener > Starting websocket listener at 172.105.67.104:9000
 2021-07-20T15:08:36.850Z INFO  nym_gateway::node                                       > Finished nym gateway startup procedure - it should now be able to receive mix and client traffic!

```

#### Configure your firewall

Although your gateway is now ready to receive traffic, your server may not be - the following commands will allow you to set up a properly configured firewall using `ufw`:

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

Finally open your gateway's p2p port, as well as ports for ssh and incoming traffic connections:

```
sudo ufw allow 1789,22,9000/tcp
# check the status of the firewall
sudo ufw status
```

For more information about your gateway's port configuration, check the [gateway port reference table](#gateway-port-reference) below.

### Automating your gateway with systemd

Although it's not totally necessary, it's useful to have the gateway automatically start at system boot time. Here's a systemd service file to do that:

```ini
[Unit]
Description=Nym Gateway (0.11.0)
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

```
systemctl enable nym-gateway.service
```

Start your node:

```
service nym-gateway start
```

This will cause your node to start at system boot time. If you restart your machine, the node will come back up automatically.

You can also do `service nym-gateway stop` or `service nym-gateway restart`.

Note: if you make any changes to your systemd script after you've enabled it, you will need to run:

```
systemctl daemon-reload
```

This lets your operating system know it's ok to reload the service configuration.

### Gateway port reference

All gateway-specific port configuration can be found in `$HOME/.nym/gateways/<your-id>/config/config.toml`. If you do edit any port configs, remember to restart your gateway.

| Default port | Use                       |
|--------------|---------------------------|
| 1789         | Listen for Mixnet traffic |
| 9000         | Listen for Client traffic |
