---
sidebar_label: "Socks5 Client"
hide_title:  false
description: "How to run the Nym Socks5 client on a desktop or server machine."
title: Socks5 Client
---

:::note
The Nym Socks5 Client was built in the [building nym](/docs/stable/run-nym-nodes/build-nym/) section. If you haven't yet built Nym and want to run the code on this page, go there first.
:::

### Viewing command help

You can check that your binaries are properly compiled with:

```
./nym-socks5-client --help
```

<details>
  <summary>console output</summary>

        Nym Socks5 Proxy 1.0.2
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

</details>

You can check the necessary parameters for the available commands by running:

```
./nym-client <command> --help
```

### Initialising a new client instance

Before you can use the client, you need to initalise a new instance of it, which can be done with the following command:

```
nym-socks5-client init --id <id> --provider <provider>
```

The `--id` in the example above is a local identifier so that you can name your clients; it is **never** transmitted over the network.

The `--provider` field needs to be filled with the Nym address of a Network Requester that can make network requests on your behalf. If you can't find one from the community, you'll have to [run your own](/docs/stable/run-nym-nodes/nodes/requester/). A nicer way of discovering public Service Providers is incoming, but at the moment just ask around in community channels and someone will give you an address to use.

### Running the socks5 client

You can run the initalised client by doing this:

```
nym-socks5-client run --id <id>
```

<details>
  <summary>console output</summary>

        2022-04-27T16:15:45.843Z INFO  nym_socks5_client::client > Starting nym client
        2022-04-27T16:15:45.889Z INFO  nym_socks5_client::client > Obtaining initial network topology
        2022-04-27T16:15:51.470Z INFO  nym_socks5_client::client > Starting topology refresher...
        2022-04-27T16:15:51.470Z INFO  nym_socks5_client::client > Starting received messages buffer controller...
        2022-04-27T16:15:51.648Z INFO  gateway_client::client    > Claiming more bandwidth for your tokens. This will use 1 token(s) from your wallet. Stop the process now if you don't want that to happen.
        2022-04-27T16:15:51.648Z WARN  gateway_client::client    > Not enough bandwidth. Trying to get more bandwidth, this might take a while
        2022-04-27T16:15:51.648Z INFO  gateway_client::client    > The client is running in disabled credentials mode - attempting to claim bandwidth without a credential
        2022-04-27T16:15:51.706Z INFO  nym_socks5_client::client > Starting mix traffic controller...
        2022-04-27T16:15:51.706Z INFO  nym_socks5_client::client > Starting real traffic stream...
        2022-04-27T16:15:51.706Z INFO  nym_socks5_client::client > Starting loop cover traffic stream...
        2022-04-27T16:15:51.707Z INFO  nym_socks5_client::client > Starting socks5 listener...
        2022-04-27T16:15:51.707Z INFO  nym_socks5_client::socks::server > Listening on 127.0.0.1:1080
        2022-04-27T16:15:51.707Z INFO  nym_socks5_client::client        > Client startup finished!
        2022-04-27T16:15:51.707Z INFO  nym_socks5_client::client        > The address of this client is: BFKhbyNsSVwbsGSLwHDkfwH5mwZqZYpnpNjjV7Xo25Xc.EFWd1geWspzyVeinwXrY5fCBMRtAKV1QmK1CNFhAA8VG@BNjYZPxzcJwczXHHgBxCAyVJKxN6LPteDRrKapxWmexv
        2022-04-27T16:15:51.707Z INFO  nym_socks5_client::socks::server > Serving Connections...

</details>

### Using the socks5 client

This will start up a SOCKS5 proxy on your local machine, at `localhost:1080`. You can now route application traffic through the Nym mixnet!

To have a look at examples of how to attach some existing applications to your client, please see the [Use External Apps](/docs/stable/use-external-apps/) section.
