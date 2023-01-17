---
sidebar_label: "Socks5 Client"
hide_title:  false
description: "How to run the Nym Socks5 client on a desktop or server machine."
title: Socks5 Client
---
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';


:::note
The Nym socks5 client was built in the [building nym](/docs/next/run-nym-nodes/build-nym/) section. If you haven't yet built Nym and want to run the code on this page, go there first.
:::

Many existing applications are able to use either the SOCKS4, SOCKS4A, or SOCKS5 proxy protocols. If you want to send such an application's traffic through the mixnet, you can use the `nym-socks5-client` to bounce network traffic through the Nym network, like this:

<ThemedImage
  alt="Overview diagram of the Nym network"
  sources={{
    light: useBaseUrl('/img/docs/nym-socks5-architecture.png'),
    dark: useBaseUrl('/img/docs/nym-socks5-architecture-dark.png'),
  }}
/>

There are 2 pieces of software that work together to send SOCKS traffic through the mixnet: the `nym-socks5-client`, and the `nym-network-requester`. 

The `nym-socks5-client` allows you to do the following from your local machine:
* Take a TCP data stream from a application that can send traffic via SOCKS5. 
* Chop up the TCP stream into multiple Sphinx packets, assigning sequence numbers to them, while leaving the TCP connection open for more data
* Send the Sphinx packets through the mixnet to a [Nym Network Requester](/docs/next/run-nym-nodes/nodes/requester). Packets are shuffled and mixed as they transit the mixnet.

The `nym-network-requester` then reassembles the original TCP stream using the packets' sequence numbers, and make the intended request. It will then chop up the response into Sphinx packets and send them back through the mixnet to your  `nym-socks5-client`. The application will then receive its data, without even noticing that it wasn't talking to a "normal" SOCKS5 proxy!


### Viewing command help

You can check that your binaries are properly compiled with:

```
./nym-socks5-client --help
```

<details>
  <summary>console output</summary>

         _ __  _   _ _ __ ___
        | '_ \| | | | '_ \ _ \
        | | | | |_| | | | | | |
        |_| |_|\__, |_| |_| |_|
                |___/

                (socks5 proxy - version 1.1.6)

    
        nym-socks5-client 1.1.6
        Nymtech
        A SOCKS5 localhost proxy that converts incoming messages to Sphinx and sends them to a Nym address

        USAGE:
        nym-socks5-client [OPTIONS] <SUBCOMMAND>

        OPTIONS:
                --config-env-file <CONFIG_ENV_FILE>
                Path pointing to an env file that configures the client

        -h, --help
                Print help information

        -V, --version
                Print version information

        SUBCOMMANDS:
        completions          Generate shell completions
        generate-fig-spec    Generate Fig specification
        help                 Print this message or the help of the given subcommand(s)
        init                 Initialise a Nym client. Do this first!
        run                  Run the Nym client with provided configuration client optionally
                                overriding set parameters
        upgrade              Try to upgrade the client
                upgrade    Try to upgrade the client

    
</details>

You can check the necessary parameters for the available commands by running:

```
./nym-client <command> --help 
```

### Initialising a new client instance

Before you can use the client, you need to initalise a new instance of it, which can be done with the following command:

```
./nym-socks5-client init --id <id> --provider <provider>
```

The `--id` in the example above is a local identifier so that you can name your clients; it is **never** transmitted over the network.

The `--provider` field needs to be filled with the Nym address of a Network Requester that can make network requests on your behalf. If you can't find one from the community, you'll have to [run your own](/docs/next/run-nym-nodes/nodes/requester). A nicer way of discovering public Service Providers is incoming, but at the moment just ask around in community channels and someone will give you an address to use. 

:::caution
Please note that the `nym-socks5-client` currently **does not** have [multiSURBs](/docs/next/architecture/traffic-flow#private-replies-using-surbs) enabled by default to allow for a non-breaking network update, allowing network requesters to update to `v1.1.4`. This should be enabled in the next release once requesters have had time to update without interrupting network services. 

If you **know** that your client is communicating with a network requester which is >= `v1.1.4` then `init` your `nym-socks5-client` binary with the `--use-anonymous-sender-tag` flag like so: 

```
./nym-socks5-client init --id <id> --provider <provider> --use-anonymous-sender-tag
```
::: 


### Running the socks5 client

You can run the initalised client by doing this:

```
./nym-socks5-client run --id <id>
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

After completing the steps above, your local Socks5 Client will be listening on `localhost:1080` ready to proxy traffic to the Network Requester set as the `--provider` when initialising. 

When trying to connect your app, generally the proxy settings are found in `settings->advanced` or `settings->connection`. 

Here is an example of setting the proxy connecting in Blockstream Green:

![Blockstream Green settings](/img/docs/wallet-proxy-settings/blockstream-green.gif)

Most wallets and other applications will work basically the same way: find the network proxy settings, enter the proxy url (host: **localhost**, port: **1080**).

In some other applications, this might be written as **localhost:1080** if there's only one proxy entry field.
