---
sidebar_label: Blockstream Green
description: "You can protect your Blockstream Green transactions from network eavesdroppers using the Nym mixnet. Here's how."
hide_title: false
title: Blockstream Green
---

 

:::note

You need to [run the Nym Socks5 client](/docs/current/use-apps/index) before following the instructions on this page.

:::

[Blockstream Green](https://blockstream.com/green/) is a BitCoin and Liquid wallet. Since it supports Socks5, it can use Nym. Set your proxy settings in Green as follows.

First you need to log out.

Next, click on the settings on the right hand side to set proxy URL:

![Blockstream Green settings](/img/docs/wallet-proxy-settings/blockstream-green.gif)

Most wallets and other applications will work basically the same way: find the network proxy settings, enter the proxy url (host: **localhost**, port: **1080**).

In some other applications, this might be written as **localhost:1080** if there's only one proxy entry field.
