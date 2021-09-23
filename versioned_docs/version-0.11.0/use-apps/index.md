---
sidebar_label: Use Apps
description: "Tutorials for building Privacy Enhanced Applications (or integrating existing apps with Nym)"
hide_title: false
title: Use Apps with Nym
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

:::note

The Nym SOCKS5 Client was built in the [building nym](/docs/0.11.0/run-nym-nodes/build-nym/) section. If you haven't yet built Nym and want to run the code on this page, go there first.

:::


Nym is a general purpose system. We aim to provide the strongest possible protections for internet traffic and transactions.

The system is still very young, but it's starting to be able to do useful work. You can start using it today.

Many existing applications are able to use the SOCKS5 proxy protocol. They can use the `nym-socks5-client` to bounce their network traffic through the Nym network, like this:

<!-- ![Socks5 architecture](/img/docs/nym-socks5-architecture.png) -->
<ThemedImage
  alt="Overview diagram of the Nym network"
  sources={{
    light: useBaseUrl('/img/docs/nym-socks5-architecture.png'),
    dark: useBaseUrl('/img/docs/nym-socks5-architecture-dark.png'),
  }}
/>

The Nym network already runs the mixnet, and the `nym-network-requester` and `nym-client` components. In order to use existing applications with Nym, you only need to set up the `nym-socks5-client`.

Note that the nym-network-requester we're running works only for specific applications. We are not running an open proxy, we have an allowed list of applications that can use the mixnet (currently Blockstream Green, Electrum, and KeyBase). We can add other applications upon request, just come talk to us in our dev chat. Or, you can [set up your own](/docs/0.11.0/run-nym-nodes/requester) `nym-network-requester`, it's not very hard to do if you have access to a server.

The Nym SOCKS5 proxy runs on your local machine and exposes a SOCKS5 network proxy on a port. You can use it just like you would any other SOCKS5 proxy: you add drop the proxy address in an application's proxy settings, and all your TCP traffic is routed through the proxy. This makes it the easiest way to enable strong network privacy in existing applications, as many apps already support SOCKS5 out of the box. In this sense it's very similar to other socks proxies.

The Nym SOCKS5 proxy, though, does something quite interesting and different. Rather than simply copy data between TCP streams and making requests directly from the machine it's running on, it does the following:

* takes a TCP data stream in, e.g. a request from a crypto wallet
* chops up the TCP stream into multiple Sphinx packets, assigning sequence numbers to them, while leaving the TCP connection open for more data
* sends the Sphinx packets through the mixnet to a nym-network-requester. Packets are shuffled and mixed as they transit the mixnet.
* nym-network-requester reassembles the original TCP stream using the sequence numbers, and makes the intended request.
* nym-network-requester then does the whole process in reverse, chopping up the response into Sphinx packets and sending it back through the mixnet to the crypto wallet.
* The crypto wallet receives its data, without even noticing that it wasn't talking to a "normal" SOCKS5 proxy.

## Running the nym-socks5-client

:::caution
**Obligatory disclaimer time:** The Nym mixnet is still under construction and has not undergone a security audit. Do not rely on it for strong privacy (yet).
:::

After building the Nym platform code, initialize the client:

```
nym-socks5-client init --id my-socks5-client --provider AFB7kzofcDSJ1feEJsfHE5uxq4wJecLz8MkWVywAzMCu.DZex1uSmS5iLxbc1zR96T1dDs9Wmi8ko7qjX4ACCTYQR@8yGFbT5feDpPmH66TveVjonpUn3tpvjobdvEWRbsTH9i
```

The `--provider` field needs to be filled with the Nym address of a `nym-network-requester` that can make network requests on your behalf. The address in the above example is one that we are currently running for the Milhon Testnet, but you can also [run your own](/docs/0.11.0/run-nym-nodes/requester/) if you want.

Then run the socks5 client locally:

```
nym-socks5-client run --id my-socks5-client
```

This will start up a SOCKS5 proxy on your local machine, at `localhost:1080`.

In the next few sections, we will show you how to run it with some existing applications. Later, we will discuss how you can use any application that can use SOCKS5 with Nym.
