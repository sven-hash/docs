---
sidebar_label: "Mixnet Traffic flow"
description: "An overview of the Nym platform architecture"
hide_title:  false
title: "Mixnet Traffic Flow" 
---

### Technical Motivations 

When you send data across the internet, it can be recorded by a wide range of observers: your ISP, internet infrastructure providers, large tech companies, and governments.

Even if the content of a network request is encrypted, observers can still see that data was transmitted, its size, frequency of transmission, and gather metadata from unencrypted parts of the data (such as IP routing information). Adversaries may then combine all the leaked information to probabilistically de-anonymize users.

The Nym mixnet provides very strong security guarantees against this sort of surveillance. It _packetizes_ and _mixes_ together IP traffic from many users inside the _mixnet_. 

:::note
If you're into comparisons, the Nym mixnet is conceptually similar to other systems such as Tor, but provides improved protections against end-to-end timing attacks which can de-anonymize users. When Tor was first fielded, in 2002, those kinds of attacks were regarded as science fiction. But the future is now here.
:::

### Mixnet Traffic Flow

If you imagine connecting to the mixnet to use a privacy-protected application, your traffic would go through several hops to get to the 'other side' of the mixnet: 

DESCRIBE TRAFFIC FLOW 

#### A Note On P2P Traffic

P2p apps might be an instance of the previously mentioned utopiapps: their traffic might never need to leave the 'other side' of the mixnet, instead passing through the mixnet to the other peers in the p2p network that is using the mixnet for its traffic routing 

SMALL ASCII FLOW 