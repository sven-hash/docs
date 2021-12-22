---
sidebar_label: "Socks5 Client"
hide_title: false
description: "How to run the Nym Socks5 client on a desktop or server machine."
title: Socks5 Client
---

:::note
The Nym Socks5 Client was built in the [building nym](/docs/next/run-nym-nodes/build-nym/) section. If you haven't yet built Nym and want to run the code on this page, go there first.
:::

You can check that your binaries are properly compiled with:

```
./nym-socks5-client --help
```

Which should return a list of all avaliable commands:

```
      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (socks5 proxy - version 0.12.0)

    
Nym Socks5 Proxy 0.12.0
Nymtech
A Socks5 localhost proxy that converts incoming messages to Sphinx and sends them to a Nym address

USAGE:
    nym-socks5-client [SUBCOMMAND]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

SUBCOMMANDS:
    help       Prints this message or the help of the given subcommand(s)
    init       Initialise a Nym client. Do this first!
    run        Run the Nym client with provided configuration client optionally overriding set parameters
    upgrade    Try to upgrade the client

```

You can check the necessary parameters for the available commands by running:

```
./nym-client <command> --help 
```

### Initialising a new client instance

Before you can use the client, you need to initalise a new instance of it, which can be done with the following command:

```
nym-socks5-client init --eth_endpoint <eth_endpoint> --eth_private_key <eth_private_key> --id <id> --provider <provider>
```

The `--id` in the example above is a local identifier so that you can name your clients; it is **never** transmitted over the network.

The `--provider` field needs to be filled with the Nym address of a `nym-network-requester` that can make network requests on your behalf. The address in the above example is one that we are currently running for the Sandbox Testnet, but you can also [run your own](/docs/next/run-nym-nodes/nodes/requester/) if you want.

The `--testnet-mode` flag is used to initialise your gateway so that it doesn't require bandwidth credentials for data sent through the mixnet by clients. This functionality is still in active development, and updates regarding Basic Bandwidth Credentials will be shared soon. 

The `--eth_endpoint` flag must point to either an Ethereum Full Node or an [Infura](https://infura.io/) endpoint, and the `--eth_private_key` is the private key of an Ethereum address. 

:::caution
Even though the `--testnet-mode` flag removes the need to provide basic bandwidth credentials, you still have to provide the ethereum-related information for the moment.
::: 

### Running the socks5 client

You can run the initalised client by doing this:

```
nym-socks5-client run --id <id>
```

### Using the socks5 client

This will start up a SOCKS5 proxy on your local machine, at `localhost:1080`. You can now route application traffic through the Nym Sandbox Testnet! 

To have a look at examples of how to attach some existing applications to your client, please see the [Use External Apps](/docs/next/use-external-apps/index) section. 