---
sidebar_label: "Sock5 Proxy"
description: "Nym sock5 proxy"
hide_title: false
---

# Nym Sock5 Proxy

Nym Sock5 Proxy allows existing applications to connect and use Nym mixnet for increased network privacy. Presently available on mac, windows and linux.

[Download Nym Socks5 client](https://github.com/nymtech/nym/releases/download/nym-binaries-1.0.2/nym-socks5-client)

:::info
Please note that Nym Sock5 Proxy has currently only been built on the operating systems for mac, Debian and Windows. If you find an issue or any additional prerequisties, please create an issue or PR against `develop` on [Github](https://github.com/nymtech/docs).
:::

### Building from source

### Prerequisites

- (Debian/Ubuntu) `pkg-config`, `build-essential`, `libssl-dev`, `curl`, `jq`

```
sudo apt update
sudo apt install pkg-config build-essential libssl-dev curl jq
```

- `Rust & cargo >= v1.56`

We recommend using the [Rust shell script installer](https://www.rust-lang.org/tools/install). Installing cargo from your package manager (e.g. `apt`) is not recommended as the packaged versions are usually too old.

If you really don't want to use the shell script installer, the [Rust installation docs](https://forge.rust-lang.org/infra/other-installation-methods.html) contain instructions for many platforms.

### Download and build Nym binaries

Please refer to [building nym section](stable/run-nym-nodes/build-nym) on how to build from source.

### Verify setup

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
