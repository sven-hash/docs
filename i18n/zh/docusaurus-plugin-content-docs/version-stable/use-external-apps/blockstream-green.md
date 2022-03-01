---
sidebar_label: Blockstream Green钱包
description: "You can protect your Blockstream Green transactions from network eavesdroppers using the Nym mixnet. Here's how."
hide_title: false
title: Blockstream Green钱包
---

:::note注意

你需要[运行Nym Socks5客户端](/docs/stable/use-external-apps/)，然后再按照本页的指示操作。

:::

[Blockstream Green](https://blockstream.com/green/)是一个比特币和热钱包，由于它支持Socks5，它可以使用Nym服务。请在Green中设置你的代理，操作如下。

首先你需要注销。

接下来，点击右侧的设置，设置代理网址。

![Blockstream Green settings](/img/docs/wallet-proxy-settings/blockstream-green.gif)

大多数钱包和其他应用程序的工作方式基本相同：找到网络代理设置，输入代理网址（主机：**localhost**，端口：**1080**）。

在一些其他应用程序中，如果只有一个代理输入字段，你可以写成**localhost:1080**。
