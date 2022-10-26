---
sidebar_label: Loopix Mixnet Design 
description: "Nym ensures network privacy using layer encrypted Sphinx packets and a Loopix mixnet."
hide_title: false
title: "Loopix Mixnet Design"
---

Our mixnet design is based on the [Loopix Anonymity System](https://arxiv.org/abs/1703.00536), somewhat modified to provide better quality of service guarantees. 

This short video features our Head of Research and author of the original Lopoix paper Ania Piotrowska discussing the Loopix mixnet design in detail at USENix 2017.

<iframe width="560" height="380" src="https://www.youtube.com/embed/R-yEqLX_UvI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br /><br />

There is a very non-technical introduction to mixnets in the blog post [A Simple Introduction to Mixnets](https://medium.com/nymtech/a-simple-introduction-to-mixnets-6783a103d20e). But here's the boiled-down explanation:

Assume a God-like adversary who can watch every packet on the network, record everything, and analyze everything in real-time. Is it possible to have private communications in such an environment? Intuitively, the answer is no: the adversary can watch every packet as it travels through the network, and progressively identify users with a high degree of success using probabilistic techniques.

### Why is the Nym mixnet so Unique?

The Nym mixnet solves this problem by _mixing_ messages inside network nodes which are opaque to the adversary. Each packet is layer encrypted, and binary-padded so that it's indistinguishable from all other packets. Incoming packets are "mixed" with all other messages inside the node. That is, the node strips one layer of packet encryption, and adds a small random transmission delay, so that messages are not emitted in the same order as which they arrived.

Next, the message is sent to another mix node, decrypted and mixed again, then to a third mixnode for further mixing. Finally, the message is delivered to its destination gateway.

As long as there's enough traffic flowing through the nodes, even an adversary who can record the whole internet will not be able to trace the packet flow through the system.

The Nym mixnet mitigates against packet-dropping attacks by malicious nodes, and ensures quality-of-service, via _loop_ traffic. Clients send messages which _loop_ back to themselves. This allows clients to assure themselves that messages are being delivered properly. It also provides _cover traffic_ to ensure that enough messages are going through the system to provide privacy.

Privacy Enhanced Applications (PEAPs) that need to defend against network-level monitoring can use the Nym mixnet.

The end result is that adversaries are unable to monitor Privacy Enhanced Applications (PEAPs) using Nym even if they can record all internet traffic. The adversary can tell that a user's PEAP has connected to the mixnet; beyond that, it's impossible to say whether they are doing encrypted chat, file transfer, or interacting with another PEAP.
