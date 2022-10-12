---
sidebar_label: "Mixnet Traffic flow"
description: "An overview of the Nym platform architecture"
hide_title:  false
title: "Mixnet Traffic Flow" 
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

### Technical Motivations 

When you send data across the internet, it can be recorded by a wide range of observers: your ISP, internet infrastructure providers, large tech companies, and governments.

Even if the content of a network request is encrypted, observers can still see that data was transmitted, its size, frequency of transmission, and gather metadata from unencrypted parts of the data (such as IP routing information). Adversaries may then combine all the leaked information to probabilistically de-anonymize users.

The Nym mixnet provides very strong security guarantees against this sort of surveillance. It _packetizes_ and _mixes_ together IP traffic from many users inside the _mixnet_. 

:::note
If you're into comparisons, the Nym mixnet is conceptually similar to other systems such as Tor, but provides improved protections against end-to-end timing attacks which can de-anonymize users. When Tor was first fielded, in 2002, those kinds of attacks were regarded as science fiction. But the future is now here.
:::

### Mixnet Traffic Flow
The Nym mixnet re-orders encrypted, indistinguishable [Sphinx](https://cypherpunks.ca/~iang/pubs/Sphinx_Oakland09.pdf) packets as they travel through the gateways and mix nodes. 

Traffic to send through the mixnet is broken up into uniformly-sized packets, encrypted in the Sphinx packet format according to the route the packet will take, and sent through the mixnet to be mixed among other real traffic and fake - but identical - 'dummy traffic'. 

At each 'hop' (i.e. as a packet is forwarded from one node in the sequence to another) a layer of decryption is removed from the Sphinx packet the packet is held by the node for a variable amount of time, before being forwarded on to the next node in the route. 

:::note
For more information on this, check out the [Loopix](/docs/next/architecture/loopix) design document on the next page. 
::: 

Traffic always travels through the nodes of the mixnet like such:


<ThemedImage
  alt="Overview diagram of the Nym network"
  sources={{
    light: useBaseUrl('/img/docs/traffic-flow.png'),
    dark: useBaseUrl('/img/docs/traffic-flow.png'),
  }}
/>

From your Nym client, your encrypted traffic is sent to:
* the gateway your client has registered with,  
* a mix node on Layer 1 of the Mixnet, 
* a mix node on Layer 2 of the Mixnet,
* a mix node on Layer 3 of the Mixnet, 
* the recipient's gateway, which forwards it finally to...
* the recipient's Nym client, which communicates with an application.  

:::note
If the recipient's Nym client is offline at the time then the packets will be held by the Gateway their Nym client has registered with until they come online.
::: 

Whatever is on the 'other side' of the mixnet from your client, all traffic will travel this way through the mixnet. If you are sending traffic to a service external to Nym (such as a chat application's servers) then your traffic will be sent from the recieving Nym client to an application that will proxy it 'out' of the mixnet to these servers, shielding your metadata from them. P2P (peer-to-peer) applications, unlike the majority of apps, might want to keep all of their traffic entirely 'within' the mixnet, as they don't have to necessarily make outbound network requests to application servers. They would simply have their local application code communicate with their Nym clients, and not forward traffic anywhere 'outside' of the mixnet. 

### Acks
Whenever a hop is completed, the recieving node will send back an acknowledgement ('ack') so that the sending node knows that the packet was recieved. If it does not recieve an ack after sending, it will resend the packet, as it assumes that the packet was dropped for some reason. 

This is done 'under the hood' by the binaries themselves, and is never something that developers and node operators have to worry about dealing with themselves. 

### Private Replies using SURBs
SURBs ('Single Use Reply Blocks') allow apps to reply to other apps anonymously.

It will often be the case that a client app wants to interact with a service of some kind, or a P2P application on someone else's machine. It sort of defeats the purpose of the whole system if your client app needs to reveal its own gateway public key and client public key in order to get a response from the service/app. 

Luckily, SURBs allow for anonymous replies. A SURB is a layer encrypted set of Sphinx headers detailing a reply path ending in the original app's address. SURBs are encrypted by the client, so the recieving service/app can attach its response and send back the resulting Sphinx packet, but it **never has sight of who it is replying to**.

:::caution
Single SURBs are implemented in the mixnet. However, this doesn't allow for a lot of information to be sent back to a client anonymously (such as a picture). MultiSURBs able to deal with larger files and responses are in active development - more information on their usage will be coming soon
:::
