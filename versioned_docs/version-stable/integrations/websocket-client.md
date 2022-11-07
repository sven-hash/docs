---
sidebar_label: "Websocket client"
hide_title:  false
description: "How to run the Nym websocket client on a desktop or server machine."
title: Websocket client
---


:::note
The Nym Websocket Client was built in the [building nym](/docs/stable/run-nym-nodes/build-nym/) section. If you haven't yet built Nym and want to run the code on this page, go there first.
:::

### Viewing command help

You can check that your binaries are properly compiled with:

```
./nym-client --help
```

<details>
  <summary>console output</summary>


      Nym client 1.0.1
      Nymtech
      Implementation of the Nym client

      USAGE:
          nym-client [SUBCOMMAND]

      FLAGS:
          -h, --help       Prints help information
          -V, --version    Prints version information

      SUBCOMMANDS:
          help       Prints this message or the help of the given subcommand(s)
          init       Initialise a Nym client. Do this first!
          run        Run the Nym client with provided configuration client optionally overriding set parameters
          upgrade    Try to upgrade the client


</details>


The two most important commands you will issue to the client are: 

1. `init` - initalise a new client instance. 
2. `run` - run a mixnet client process. 

You can check the necessary parameters for the available commands by running:

```
./nym-client <command> --help 
```

### Initialising a new client instance

Before you can use the client, you need to initalise a new instance of it. Each instance of the client has its own public/private keypair, and connects to its own gateway node. Taken together, these 3 things (public/private keypair + gateway node) make up an app's identity.

Initialising a new client instance can be done with the following command:

```
./nym-client init --id <client_id> 
```

<details>
  <summary>console output</summary>


      Initialising client...
      Saved all generated keys
      Saved configuration file to "/home/mx/.nym/clients/client/config/config.toml"
      Using gateway: BNjYZPxzcJwczXHHgBxCAyVJKxN6LPteDRrKapxWmexv
      Client configuration completed.




      The address of this client is: 7bxykcEH1uGNMr8mxGABvLJA44nbYt6Rp7xXHhJ4wQVk.HpnFbaMJ8NN1cp5ZPdPTc2GoBDnG4Jd51Sti32tbf3tF@BNjYZPxzcJwczXHHgBxCAyVJKxN6LPteDRrKapxWmexv

</details>

The `--id` in the example above is a local identifier so that you can name your clients; it is **never** transmitted over the network.

There is an optional `--gateway` flag that you can use if you want to use a specific gateway. The supplied argument is the `Identity Key` of the gateway you wish to use, which can be found on the [mainnet Network Explorer](https://explorer.nymtech.net/network-components/gateways) or [Sandbox Testnet Explorer](https://sandbox-explorer.nymtech.net/network-components/gateways) depending on which network you are on. 

Not passing this argument will randomly select a gateway for your client.

### Configuration
When you initalise a client instance, a configuration directory will be generated and stored in `$HOME_DIR/.nym/clients/<client-name>/`.

```
/home/<user>/.nym/clients/<client_id>/
├── config
│   └── config.toml
└── data
    ├── private_identity.pem
    └── public_identity.pem
```

The `config.toml` file contains client configuration options, while the two `pem` files contain client key information.

The generated files contain the client name, public/private keypairs, and gateway address. The name `<client_id>` in the example above is just a local identifier so that you can name your clients.


### Running the native client

You can run the initalised client by doing this:

```
./nym-client run --id <client_id>
```

When you run the client, it immediately starts generating (fake) cover traffic and sending it to the mixnet.

When the client is first started, it will reach out to the Nym network's validators, and get a list of available Nym nodes (gateways, mixnodes, and validators). We call this list of nodes the network _topology_. The client does this so that it knows how to connect, register itself with the network, and know which mixnodes it can route Sphinx packets through.

### Connecting to the local websocket

The Nym native client exposes a websocket interface that your code connects to. To program your app, choose a websocket library for whatever language you're using. The **default** websocket port is `1977`, you can override that in the client config if you want.

The Nym monorepo includes websocket client example code for Rust, Go, Javacript, and Python, all of which can be found [here](https://github.com/nymtech/nym/tree/develop/clients/native/examples)

> Rust users can run the examples with `cargo run --example <rust_file>.rs`, as the examples are not organised in the same way as the other examples, due to already being inside a cargo project. 

All of these code examples will do the following: 
1. connect to a running websocket client on port 1977
2. format a message to send in either JSON or Binary format. Nym messages have defined JSON formats.
3. send the message into the websocket. The native client packages the message into a Sphinx packet and sends it to the mixnet
4. wait for confirmation that the message hit the native client
5. wait to receive messages from other Nym apps

By varying the message content, you can easily build sophisticated Service Provider apps. For example, instead of printing the response received from the mixnet, your Service Provider might take some action on behalf of the user - perhaps initiating a network request, a blockchain transaction, or writing to a local data store.

### Message Types

There are a small number of messages that your application sends up the websocket to interact with the native client, as follows.

#### Sending text

If you want to send text information through the mixnet, format a message like this one and poke it into the websocket:

```json
{
  "type": "send",
  "message": "the message",
  "recipient": "71od3ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm"
}
```

In some applications, e.g. where people are chatting with friends who they know, you might want to include unencrypted reply information in the message field, like so:

```json
{
  "type": "send",
  "message": {
    "recipient": "198427b63ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm",
    "chatMessage": "hi julia!"
  },
  recipient: "71od3ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm"
}
```

This provides an easy way for the receiving chat to then turn around and send a reply message:

```json
{
  "type": "send",
  "message": {
    "recipient": "71od3ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm",
    "chatMessage": "winston, so lovely to hear from you! shall we meet at the antiques shop?"
  },
  "sender": "198427b63ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm"
}
```

If that fits your security model, good. However, it may be the case that you want to send **anonymous replies using Single Use Reply Blocks (SURBs)**.

```json
{
    type: send, 
    message: {
      recipient: 71od3ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm 
      chatMessage: "something you want to keep secret"
      withReplySurb: true
    }
}
```
You can read more about SURBs [here](/docs/stable/architecture/traffic-flow#private-replies-using-surbs) but in short they are ways for the receiver of this message to anonymously reply to you - the sender - without them having to know your nym address! 


#### Sending binary data

You can also send bytes instead of JSON. For that you have to send a binary websocket frame containing a binary encoded
Nym [`ClientRequest`](https://github.com/nymtech/nym/blob/develop/clients/native/websocket-requests/src/requests.rs#L25) containing the same information. 

As a response the `native-client` will send a `ServerResponse` to be decoded. 

You can find examples of sending and receiving binary data in the Rust, Python and Go [code examples](https://github.com/nymtech/nym/tree/develop/clients/native/examples), and an example project from the Nym community [BTC-BC](https://github.com/sgeisler/btcbc-rs/): Bitcoin transaction transmission via Nym, a client and service provider written in Rust.

#### Receiving messages

When another PEAP sends a message to you, all extraneous information is stripped and you just get the message. So if an app sends the following message:

```json
{
  "type": "send",
  "message": "2 + 2 = 4",
  "recipient_address": "71od3ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm"
}
```

The receiving user will get only `2 + 2 = 4`.

#### Getting your own address

Sometimes, when you start your app, it can be convenient to ask the native client to tell you what your own address is (from the saved configuration files). To do this, send:

```json
{
  "type": "selfAddress"
}
```

You'll get back:

```json
{
  "type": "selfAddress",
  "address": "the-address"
}
```

#### Error messages

Errors from the app's client, or from the gateway, will be sent down the websocket to your code in the following format:

```json
{
  "type": "error",
  "message": "string message"
}


