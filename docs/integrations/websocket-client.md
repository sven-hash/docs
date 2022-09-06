---
sidebar_label: "Websocket client"
hide_title:  false
description: "How to run the Nym websocket client on a desktop or server machine."
title: Websocket client
---


:::note
The Nym Websocket Client was built in the [building nym](/docs/next/run-nym-nodes/build-nym/) section. If you haven't yet built Nym and want to run the code on this page, go there first.
:::


### Viewing command help

You can check that your binaries are properly compiled with:

```
./nym-client --help
```

<details>
  <summary>console output</summary>


      Nym Client 1.0.1
      Nymtech
      Implementation of the Nym Client

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


When you initalise a client instance, a configuration directory will be generated and stored in `$HOME_DIR/.nym/clients/<client-name>/`.

```
/home/<user>/.nym/clients/<client_id>/
├── config
│   └── config.toml
└── data
    ├── private_identity.pem
    └── public_identity.pem
```

The file `config.toml` contains client configuration options, while the two `pem` files contain client key information.

The generated files contain the client name, public/private keypairs, and gateway address. The name `<client_id>` in the example above is just a local identifier so that you can name your clients; it is **never** transmitted over the network.

### Running the native client

You can run the initalised client by doing this:

```
./nym-client run --id <client_id>
```

When you run the client, it immediately starts generating (fake) cover traffic and sending it to the Nym testnet.

Congratulations, you have just contributed a tiny bit of privacy to the world! `<CTRL-C>` to stop the client.

When the client is first started, it will reach out to the Nym network's validators, and get a list of available Nym nodes (gateways, mixnodes, and validators). We call this list of nodes the network _topology_. The client does this so that it knows how to connect, register itself with the network, and know which mixnodes it can route Sphinx packets through.


#### Connecting to the local websocket

The Nym native client exposes a websocket interface that your code connects to. To program your app, choose a websocket library for whatever language you're using. The default websocket port is `1977`, you can override that in the client config if you want.

<!-- ### A simple example PEAP

Let's write some code. Sometimes when you're learning something new it's easiest to see a short working example. Here's a simple app written in Python. This example is packaged with the Nym platform, dig around in the `python-examples` directory inside `clients/native`

```python
import asyncio
import json
import websockets

self_address_request = json.dumps({"type": "selfAddress"})


async def send_text():
    message = "Hello Nym!"

    uri = "ws://localhost:1977"
    async with websockets.connect(uri) as websocket:  # 1
        await websocket.send(self_address_request)
        self_address = json.loads(await websocket.recv())
        print("our address is: {}".format(self_address["address"]))

        text_send = json.dumps(
            {  # 2
                "type": "send",
                "message": message,
                "recipient": self_address["address"],
            }
        )

        print("sending '{}' over the mix network...".format(message))
        await websocket.send(text_send)  # 3
        msg_send_confirmation = json.loads(await websocket.recv())  # 4
        assert msg_send_confirmation["type"], "send"

        print("waiting to receive a message from the mix network...")
        received_message = await websocket.recv()  # 5
        print("received {} from the mix network!".format(received_message))


asyncio.get_event_loop().run_until_complete(send_text())
```

The Python code does the following.

1. connects to the websocket on port 1977
2. formats a message to send. Nym messages have defined JSON formats.
3. sends the message into the websocket. The native client packages the message into a Sphinx packet and sends it to the mixnet
4. waits for confirmation that the message hit the native client
5. waits to receive messages from other Nym apps

By varying the message content, you can easily build sophisticated Service Provider apps. For example, instead of `print("received {} from the mix network!".format(received_message))` your Service Provider might take some action on behalf of the user - perhaps initiating a network request, a blockchain transaction, or writing to a local data store. -->

### Message Types

There are a small number of messages that your application sends up the websocket to interact with the native client, as follows.

#### Sending text

If you want to send text information through the mixnet, format a message like this one and poke it into the websocket:

```json
{
  "type": "send",
  "message": "the message",
  "recipient_address": "71od3ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm"
}
```

In some applications, e.g. where people are chatting with friends who they know, you might want to include unencrypted reply information in the message field, like so:

```json
{
  "type": "send",
  "message": {
    "sender": "198427b63ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm",
    "chatMessage": "hi julia!"
  },
  "recipient_address": "71od3ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm"
}
```

This provides an easy way for the receiving chat to then turn around and send a reply message:

```json
{
  "type": "send",
  "message": {
    "sender": "71od3ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm",
    "chatMessage": "winston, so lovely to hear from you! shall we meet at the antiques shop?"
  },
  "recipient_address": "198427b63ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm"
}
```

If that fits your security model, good. However, it may be the case that you want to send anonymous replies using Single Use Reply Blocks, or _surbs_. These will be available soon.

#### Sending binary data

*The provided links reference a certain version of Nym, please look for the up-to-date versions of the referenced code
parts if you have any problems.*

You can also send bytes instead of JSON. For that you have to send a binary websocket frame containing a binary encoded
Nym [`ClientRequest`](https://github.com/nymtech/nym/blob/6f8ae53f0c47aa82b14e96bc313f47643c505063/clients/native/websocket-requests/src/requests.rs#L36).
For the correct encoding please refer to the [rust reference implementation](https://github.com/nymtech/nym/blob/6f8ae53f0c47aa82b14e96bc313f47643c505063/clients/native/websocket-requests/src/requests.rs#L216)
as it is likely to change in the future.

As a response the `native-client` will send a `ServerResponse`, which can be decoded in a similar manner, please refer
to the [rust implementation](https://github.com/nymtech/nym/blob/6f8ae53f0c47aa82b14e96bc313f47643c505063/clients/native/websocket-requests/src/responses.rs#L286)
for further details.

One example project from the Nym community using the binary API is [BTC-BC](https://github.com/sgeisler/btcbc-rs/): Bitcoin transaction transmission via Nym, client and service provider written in Rust.

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
```
