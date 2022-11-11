---
sidebar_label: "Gateways"
description: "Gateways provide a destination for mixnet packets. Most of the internet doesn't use encrypted Sphinx packets, so the gateway acts as a destination for Sphinx traffic."
hide_title: false
title: Gateways
---

:::note
The Nym gateway was built in the [building nym](/docs/stable/run-nym-nodes/build-nym/) section. If you haven't yet built Nym and want to run the code, go there first.
:::

Gateways provide a destination for mixnet packets. Most of the internet doesn't use encrypted Sphinx packets, so the gateway acts as a destination, sort of like a mailbox, for messages.

Nym clients connect to gateways. Messages are automatically piped to connected clients and deleted from the gateway's disk storage. If a client is offline when a message arrives, it will be stored for later retrieval. When the client connects, all messages will be delivered, and deleted from the gateway's disk. 

When it starts up, a client registers itself with a gateway, and the gateway returns an access token. The access token plus the gateway's IP can then be used as a form of addressing for delivering packets.

The default gateway implementation included in the Nym platform code holds packets for later retrieval. For many applications (such as simple chat), this is usable out of the box, as it provides a place that potentially offline clients can retrieve packets from. The access token allows clients to pull messages from the gateway node.

## Preliminary steps

There are a couple of steps that need completing before starting to set up your gateway:

- preparing your wallet
- requisitioning a VPS (Virtual Private Server)

### Wallet preparation 
#### Mainnet
Before you initialise and run your gateway, head to our [website](https://nymtech.net/download/) and download the Nym wallet for your operating system. If pre-compiled binaries for your operating system aren't availiable, you can build the wallet yourself with instructions [here](/docs/stable/wallet). 

If you don't already have one, please create a Nym address using the wallet, and fund it with tokens. The minimum amount required to bond a gateway is 100 `NYM`, but make sure you have a bit more to account for gas costs. 

`NYM` is currently present on several exchanges. Head to our [telegram](https://t.me/nymchan) or [Discord](https://discord.com/invite/nym) channels to find out where to get `NYM` tokens. 

:::note
Remember that you can **only** use native Cosmos `NYM` tokens to bond your gateway. You **cannot** use ERC20 representations of `NYM` to run a node. 
:::

#### Sandbox testnet
Make sure to download a wallet and create an account as outlined above. Then head to our [token faucet](https://faucet.nymtech.net/) and get some tokens to use to bond it. 

### VPS Hardware Specs

You will need to rent a VPS to run your mix node on. One key reason for this is that your node **must be able to send TCP data using both IPv4 and IPv6** (as other nodes you talk to may use either protocol.

We currently have these _rough_ specs for VPS hardware: 

- Processors: 2 cores are fine. Get the fastest CPUs you can afford.
- RAM: Memory requirements depend on the amount of users your Gateway will be serving at any one time. If you're just going to be using it yourself, then minimal RAM is fine. **If you're running your Gateway as part of a Service Grant, get something with at least 4GB RAM.** 
- Disks: much like the amount of RAM your Gateway could use, the amount of disk space required will vary with the amount of users your Gateway is serving. **If you're running your Gateway as part of a Service Grant, get something with at least 40GB storage.** 


## Gateway setup and maintenance

Now that you have built the codebase, set up your wallet, and have a VPS with the `nym-gateway` binary, you can set up your gateway with the instructions below.

### Viewing command help

You can check that your binaries are properly compiled with:

```
./nym-gateway --help
```
<details>
  <summary>console output</summary>

        nym-gateway 1.1.0
        Nymtech

        Build Timestamp:    2022-05-06T13:07:46.187796508+00:00
        Build Version:      1.1.0
        Commit SHA:         945dda0c24f2f964f27066af320441446973e383
        Commit Date:        2022-05-04T15:57:36+00:00
        Commit Branch:      detached HEAD
        rustc Version:      1.60.0
        rustc Channel:      stable
        cargo Profile:      release

        USAGE:
            nym-gateway <SUBCOMMAND>

        OPTIONS:
            -h, --help
                    Print help information

            -V, --version
                    Print version information

        SUBCOMMANDS:
            help
                    Print this message or the help of the given subcommand(s)
            init
                    Initialise the gateway
            node-details
                    Show details of this gateway
            run
                    Starts the gateway
            sign
                    Sign text to prove ownership of this mixnode
            upgrade
                    Try to upgrade the gateway

</details>

You can also check the various arguments required for individual commands with: 

```
./nym-gateway <command> --help
```


### Initialising your gateway (standard mode)

:::caution
If you are following these instructions to set up a gateway as part of a Service Grant, **ignore these instructions and jump to the step [below](gateways#initialising-your-gateway-stats-mode)**
:::

To check available configuration options use:

```
 ./nym-gateway init --help
```

<details>
  <summary>console output</summary>

    nym-gateway-init 
    Initialise the gateway

    USAGE:
        nym-gateway init [OPTIONS] --id <ID> --host <HOST> --wallet-address <WALLET_ADDRESS> --mnemonic <MNEMONIC>

    OPTIONS:
            --announce-host <ANNOUNCE_HOST>
                The host that will be reported to the directory server

            --clients-port <CLIENTS_PORT>
                The port on which the gateway will be listening for clients gateway-requests

            --datastore <DATASTORE>
                Path to sqlite database containing all gateway persistent data

        -h, --help
                Print help information

            --host <HOST>
                The custom host on which the gateway will be running for receiving sphinx packets

            --id <ID>
                Id of the gateway we want to create config for

            --mix-port <MIX_PORT>
                The port on which the gateway will be listening for sphinx packets

            --mnemonic <MNEMONIC>
                Cosmos wallet mnemonic needed for double spending protection

            --validator-apis <VALIDATOR_APIS>
                Comma separated list of endpoints of the validators APIs

            --wallet-address <WALLET_ADDRESS>
                The wallet address you will use to bond this gateway, e.g.
                nymt1z9egw0knv47nmur0p8vk4rcx59h9gg4zuxrrr9

</details>


The following command returns a gateway on your current IP with the `id` of `supergateway`:

```
./nym-gateway init --id supergateway --host $(curl ifconfig.me) --wallet-address <WALLET_ADDRESS> --enabled-statistics true
```

The `$(curl ifconfig.me)` command above returns your IP automatically using an external service. Alternatively, you can enter your IP manually wish. If you do this, remember to enter your IP **without** any port information.

### Initialising your gateway (stats mode)

The following command returns a gateway on your current IP with the `id` of `supergateway` with statistics enabled:

```
./nym-gateway init --id supergateway --host $(curl ifconfig.me) --wallet-address <WALLET_ADDRESS> --mnemonic <MNEMONIC> --enabled-statistics true
```

The `$(curl ifconfig.me)` command above returns your IP automatically using an external service. Alternatively, you can enter your IP manually wish. If you do this, remember to enter your IP **without** any port information.

### Bonding your gateway
#### Via the Desktop wallet (recommended)
You can bond your gateway via the Desktop wallet. 

Open your wallet, and head to the `Bond` page, then select the node type and input your node details. 

#### Via the CLI (power users)
If you want to bond your Gateway via the CLI, then check out the [Nym CLI](/docs/stable/nym-cli) tool. 

### Running your gateway (standard mode)

:::caution
If you are following these instructions to set up a gateway as part of a Service Grant, **ignore these instructions and jump to the step [below](gateways#running-your-gateway-stats-mode)**
:::

The `run` command starts the gateway:

```
./nym-gateway run --id supergateway
```

<details>
  <summary>console output</summary>

    Starting gateway supergateway...

    To bond your gateway you will need to install the Nym wallet, go to https://nymtech.net/get-involved and select the Download button.
    Select the correct version and install it to your machine. You will need to provide the following: 
    
    Identity Key: 6jWSJZsQ888jwzi1CBfkHefiDdUEjgwfeMfJU4RNhDuk
    Sphinx Key: HbqYJwjmtzDi4WzGp7ehj8Ns394sRvJnxtanX28upon
    Owner Signature: wRKxr1CnoyBB9AYPSaXgE4dCP757ffMz5gkja8EKaYR82a63FK9HYV3HXZnLcSaNXkzN3CJnxG2FREv1ZE9xwvx
    Host: 62.240.134.46 (bind address: 62.240.134.46)
    Version: 1.1.0
    Mix Port: 1789, Clients port: 9000
    Data store is at: "/home/mx/.nym/gateways/supergateway/data/db.sqlite"
    2022-04-27T16:04:33.831Z INFO  nym_gateway::node > Starting nym gateway!
    2022-04-27T16:04:34.268Z INFO  nym_gateway::node > Starting mix packet forwarder...
    2022-04-27T16:04:34.269Z INFO  nym_gateway::node > Starting mix socket listener...
    2022-04-27T16:04:34.269Z INFO  nym_gateway::node::mixnet_handling::receiver::listener > Running mix listener on "62.240.134.46:1789"
    2022-04-27T16:04:34.269Z INFO  nym_gateway::node                                      > Starting client [web]socket listener...
    2022-04-27T16:04:34.269Z INFO  nym_gateway::node                                      > Finished nym gateway startup procedure - it should now be able to receive mix and client traffic!

</details>

### Running your gateway (stats mode)

```
./nym-gateway run --id supergateway --enabled-statistics true
```

The `--enabled-statistics` flag starts the gateway in a mode which reports very minimal usage statistics - the amount of bytes sent to a service, and the number of requests - to a service we run, as part of the Nym Connect Beta testing. 

Use the following command to ping our stats service to see what it has recorded (remember to change the `'until'` date):  

```
curl -d '{"since":"2022-07-26T12:46:00.000000+00:00", "until":"2022-07-26T12:57:00.000000+00:00"}' -H "Content-Type: application/json" -X POST https://mainnet-stats.nymte.ch:8090/v1/all-statistics
```

<details>
  <summary>console output</summary>

      [
        {
            "Service":{
              "requested_service":"chat-0.core.keybaseapi.com:443",
              "request_processed_bytes":294,
              "response_processed_bytes":0,
              "interval_seconds":60,
              "timestamp":"2022-07-26 12:55:44.459257091"
            }
        },
        {
            "Service":{
              "requested_service":"chat-0.core.keybaseapi.com:443",
              "request_processed_bytes":890,
              "response_processed_bytes":0,
              "interval_seconds":60,
              "timestamp":"2022-07-26 12:56:44.459333653"
            }
        },
        {
            "Service":{
              "requested_service":"api-0.core.keybaseapi.com:443",
              "request_processed_bytes":1473,
              "response_processed_bytes":0,
              "interval_seconds":60,
              "timestamp":"2022-07-26 12:56:44.459333653"
            }
        },
        {
            "Gateway":{
              "gateway_id":"Fo4f4SQLdoyoGkFae5TpVhRVoXCF8UiypLVGtGjujVPf",
              "inbox_count":8,
              "timestamp":"2022-07-26 12:46:34.148075290"
            }
        },
        {
            "Gateway":{
              "gateway_id":"2BuMSfMW3zpeAjKXyKLhmY4QW1DXurrtSPEJ6CjX3SEh",
              "inbox_count":6,
              "timestamp":"2022-07-26 12:46:51.578765358"
            }
        },
        {
            "Gateway":{
              "gateway_id":"Fo4f4SQLdoyoGkFae5TpVhRVoXCF8UiypLVGtGjujVPf",
              "inbox_count":8,
              "timestamp":"2022-07-26 12:47:34.149270862"
            }
        }
      ]                            

</details> 

### Upgrading your gateway 

There are two methods to upgrade from `v1.0.2` to `v1.1.0`: 

**Simple method:**
* pause your gateway process 
* replace the existing binary with the newest binary (which you can either compile yourself or grab from our [releases page](https://github.com/nymtech/nym/releases))
* re-run `init` with the same values as you used initially. **This will just update the config file, it will not overwrite existing keys**. 
* restart your gateway process with the new binary. 

Running `init` again is necessary to update your gateway config file with new fields and values that come with this release, such as whether the gateway is running in `statistics-enabled` mode. **This mode is off by default**. This is to help us beta-test [NymConnect](https://blog.nymtech.net/announcing-nymconnect-in-beta-f84ed8598f26) and is described in more details [above](gateways#running-your-gateway-stats-mode). 


**Manual method:**
* pause your gateway process
* replace the existing binary with the newest binary (which you can either compile yourself or grab from our [releases page](https://github.com/nymtech/nym/releases))
* manually edit `$HOME/.nym/gateways/<your-id>/config/config.toml` to include the following: 
    * update the `version` to `1.1.0`
    * add the following to the `additional gateway config options` section 
```
    # Whether gateway collects and sends anonymized statistics
    enabled_statistics = false

    # Domain address of the statistics service
    statistics_service_url = 'https://mainnet-stats.nymte.ch:8090/'
```
* restart your gateway process with the new binary. 


### Configure your firewall

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
Description=Nym Gateway (1.1.0)
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

If you want to enable statistics mode, the start command would be: 
`ExecStart=/home/nym/nym-gateway run --id supergateway --enabled-statistics true`
  
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

## Gateway related Validator API endpoints 

Numerous gateway related API endpoints are documented on the Validator API's [Swagger Documentation](https://validator.nymtech.net/api/swagger/index.html). There you can also try out various requests from your broswer, and download the response from the API. Swagger will also show you what commands it is running, so that you can run these from an app or from your CLI if you prefer. 

## Ports 

All gateway specific port configuration can be found in `$HOME/.nym/gateways/<your-id>/config/config.toml`. If you do edit any port configs, remember to restart your gateway.

### Gateway port reference

| Default port | Use                       |
|--------------|---------------------------|
| 1789         | Listen for Mixnet traffic |
| 9000         | Listen for Client traffic |
