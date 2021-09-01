---
sidebar_label: The Nym Platform
description: "Nym is a blockchain-based privacy platform. It provides strong network-level privacy against sophisticated end-to-end attackers, and anonymous access control using blinded, re-randomizable, decentralized credentials."
hide_title: false
title: The Nym Platform
slug: /
---


# The Nym Platform

Nym is a privacy platform. It provides strong network-level privacy against sophisticated end-to-end attackers, and anonymous access control using blinded, re-randomizable, decentralized credentials.

The internet has become essential to the functioning of modern society. Many aspects of daily life are now touched by the internet in ways that are both mundane and deeply revolutionary. Everything is accelerating.

But the internet we have is not the internet we wished we'd have. The increase in surveillance over the past twenty years has not been matched by advances in privacy tech. Nym is an attempt to redress this imbalance.

The Nym platform knits together several privacy technologies, integrating them into a system of cooperating networked nodes.

At a high level, our technologies include:

1. a privacy enhancing signature scheme called _Coconut_. Coconut allows a shift in thinking about resource access control, from an identity-based paradigm based on _who you are_ to a privacy-preserving paradigm based on _right to use_.
2. _Sphinx_, a way of transmitting armoured, layer-encrypted information packets which are indistinguishable from each other at a binary level.
3. a _mixnet_, which encrypts and mixes Sphinx packet traffic so that it cannot be determined who is communicating with whom. Our mixnet is based on a modified version of the _Loopix_ design.

We'll explore Coconut, Sphinx, and Loopix in detail in the next few sections. The most important thing to note is that these technologies ensure privacy at two different levels of the stack: network data transmission, and transactions.
