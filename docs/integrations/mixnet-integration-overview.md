---
sidebar_label: Overview 
hide_title:  false
title: "Overview"
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

If you are wanting to integrate Nym by using the Mixnet as a transport layer for application traffic, you will have to run one of the three Nym Clients in order to connect to the Mixnet. 

Before looking at the technical details of the various Nym Clients avaliable to you, here's an overview of _how_ traffic would flow through the Mixnet if we connected a simple chat application to the Mixnet. 

### Initialization

First, we need to initalise an app and connect it to Nym.

<ThemedImage
  alt="Message to gateway"
  sources={{
    light: useBaseUrl('/img/docs/application-flow/send-to-gateway.png'),
    dark: useBaseUrl('/img/docs/application-flow/send-to-gateway-dark.png'),
  }}
/>

At the bottom we have an app. It consists of two parts:

* your application specific logic in yellow
* Nym client code in blue

Nym apps have a stable, potentially long-lasting relation to a Gateway node. A Client will register itself with a Gateway, and get back an authentication token that it can then use to retrieve messages from the gateway.

Gateways serve a few different functions:

* they act as an end-to-end encrypted message store in case your app goes offline.
* they send encrypted surb-acks for potentially offline recipients, to ensure reliable message delivery
* they offer a stable addressing location for apps, although the IP may change frequently


### Sending messages to ourself

The Nym Client part of the app (in blue) accepts messages from your code (in yellow), and automatically turns it into layer-encrypted Sphinx packets. If your message is too big to fit inside on Sphinx packet, it'll be split into multiple packets with a sequence numbers to ensure reliable automatic reassembly of the full message when it gets to the recipient.

The app has now connected to the Gateway, but we haven't sent a message to ourselves yet. Let's do that now.

<ThemedImage
  alt="Sending message sent to self"
  sources={{
    light: useBaseUrl('/img/docs/application-flow/simplest-request.png'),
    dark: useBaseUrl('/img/docs/application-flow/simplest-request-dark.png'),
  }}
/>

Let's say your code code pokes a message `hello world` into the Nym Client. The Nym Client automatically wraps that message up into a layer encrypted Sphinx packet, adds some routing information and encryption, and sends it to its own gateway. The gateway strips the first layer of encryption, ending up with the address of the first mixnode it should forward to, and a Sphinx packet.

The gateway forwards the Sphinx packet containing the `hello world` message. Each mixnode in turn forwards to the next mixnode. The last mixnode forwards to the recipient gateway (in this case, our own gateway since we are sending to ourself).

Our app has presumably not gone offline in the short time since the message was sent. So when the gateway receives the packet, it decrypts the packet and sends the (encrypted) content back to our app.

The Nym Client inside the app decrypts the message, and your code receives the message `hello world`, again as a websocket event.

Messages are end-to-end encrypted. Although the gateway knows our app's IP when it connects, it's unable to read any of the message contents.

### Sending messages to other apps

The process for sending messages to other apps is exactly the same, you simply specify a different recipient address. Address discovery happens outside the Nym system: in the case of a Service Provider app, the service provider has presumably advertised its own address. If you're sending to a friend of yours, you'll need to get ahold of their address out of band, maybe through a private messaging app such as Signal.

<ThemedImage
  alt="Sending message to a PEAP"
  sources={{
    light: useBaseUrl('/img/docs/application-flow/sp-request.png'),
    dark: useBaseUrl('/img/docs/application-flow/sp-request-dark.png'),
  }}
/>