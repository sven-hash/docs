---
sidebar_label: "Choose a client"
hide_title:  false
description: "There are multiple kinds of Nym client. Each is useful in different situations. Here's how to choose."
title: "Choose a client "
---

In the previous section, we got a general overview of the application flow when you're building Nym-enabled apps. Now it's time to understand a bit about how to structure your app by choosing a Nym client.

### Understanding Nym clients

A large proportion of the Nym mixnet's functionality is implemented client-side, including:

* determining network topology - what mixnodes exist, what their keys are, etc.
* registering with a gateway
* authenticating to a gateway
* receiving and decrypting messages from the gateway
* creation of layer-encrypted Sphinx packets
* sending Sphinx packets with real messages
* sending Sphinx packet _cover traffic_ when no real messages are being sent

Nym clients now all also support packet _retransmission_. What this means is that if a client sends 100 packets to a gateway, but only receives an acknowledgement ('ack') for 95 of them, it will resend those 5 packets to the gateway again, to make sure that all packets are received.  

In the next few sections we will discuss how to integrate Nym clients into your apps.

### Types of Nym clients

At present, there are three Nym clients:

- the native (websocket) client
- the SOCKS5 client
- the wasm (webassembly) client

You need to choose which one you want incorporate into your app. Which one you use will depend largely on your preferred programming style and the purpose of your app.

#### The websocket client

Your first option is the native websocket client (`nym-client`). This is a compiled program that can run on Linux, Mac OS X, and Windows machines. It runs as a persistent process on a desktop or server machine. You can connect to it from any language that supports websockets.

#### The webassembly client

If you're working in JavaScript, or building an [edge computing](https://en.wikipedia.org/wiki/Edge_computing) app, you'll likely want to choose the webassembly client. We expect that many client apps will be built using the webassembly client. It's packaged and [available on the npm registry](https://www.npmjs.com/package/@nymproject/nym-client-wasm), so you can `npm install` it into your JavaScript or TypeScript application.

#### The SOCKS5 client

This client is useful for allowing existing applications to use the Nym mixnet without any code changes. All that's necessary is that they can use the SOCKS5 proxy protocol (which many applications can - crypto wallets, browsers, chat applications etc). It's less flexible as a way of writing custom applications than the other clients.

### Commonalities between clients

All Nym client packages present basically the same capabilities to the privacy application developer. They need to run as a persistent process in order to stay connected and ready to receive any incoming messages from their gateway nodes. They register and authenticate to gateways, and encrypt Sphinx packets.
