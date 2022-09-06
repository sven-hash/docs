---
sidebar_label: Understanding Nym apps 
hide_title:  false
title: "Understanding Nym apps"
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

### Clients vs Service Providers
We expect that apps will typically fall into one of two broad categories:

* **Client apps** will expose a GUI for users to interact with Nym. Typically they'll run on user devices, such as laptops, phones, or tablets.
* **Service Providers** will generally run on server machines, or be hosted on some decentralised network such as Akash. Most Service Providers will run 24/7 and take action on behalf of anonymous client apps connected to the mixnet. Examples of these are the Nym [Network Requester](/docs/stable/run-nym-nodes/nodes/requester), and the PoC [File Storage](/docs/stable/run-nym-nodes/nodes/file-storage) Service Providers. 

_**All** Nym apps - PEAPs - will listen for and send messages to the mixnet via a Nym client running on the same machine as the application. A high-level overview of this connection, and the different types of clients available to developers, is covered on the next few pages._ 

### Offline vs Online Apps
If a message arrives at a gateway address but the app is offline, the gateway will store the messages for later delivery. When the recipient app comes online again, it will automatically download all the messages, and they'll be deleted from the gateway disk.

If an app is online when a message arrives for it, the message is automatically pushed to the app down the websocket, instead of being stored to disk on the gateway.

### Private Replies using SURBs
Surbs allow apps to reply to other apps anonymously.

It will often be the case that a client app wants to interact with a Service Provider app. It sort of defeats the purpose of the whole system if your client app needs to reveal its own gateway public key and client public key in order to get a response from the Service Provider.

Luckily, there are Single Use Reply Blocks, or _SURBs_.

A surb is a layer encrypted set of Sphinx headers detailing a reply path ending in the original app's address. Surbs are encrypted by the client, so the Service Provider can attach its response and send back the resulting Sphinx packet, but it never has sight of who it is replying to.

:::caution
SURBs are still in active development - more information on their usage will be coming soon
:::