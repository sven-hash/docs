---
sidebar_label: 例子
description: Example list for desktop apps to use with socks5 
hide_title: false
title: 例子
---

任何能够创建socks5连接的桌面程序都可以通过混合网络收发信息。

目前，只有一个服务提供商能够转发来自`nym-socks5-client`的二进制的流量：[Network Requester](/docs/next/run-nym-nodes/nodes/requester)。

只要应用程序正在连接的域名包含在你的socks5客户端所连接的服务提供商的白名单中，你就能像往常一样通过代理访问这个域名--不同的是你的流量会隐藏在混合网络之中。

在[这里](https://github.com/nymtech/nym/blob/develop/service-providers/network-requester/allowed.list.sample)查看当前被列入白名单的应用程序有：

* blockstream.info
* greenaddress.it
* electrum.org
* qtornado.com
* aranguren.org
* hsmiths.com
* not.fyi
* cluelessperson.com
* bauerj.eu
* keybaseapi.com
* amazonaws.com
 
但是**你可以随时添加你自己的域名**，或者从`上面的白名单`中删除任何不需要的东西。

## 桌面应用程序连接到Nym的例子
下面，我们举了两个将应用程序连接到本地socks5代理并通过混合网络转发流量的例子。

你可以随时尝试其他应用程序，比如Telegram。当尝试连接你的应用程序时，一般来说，你能够在`settings->advanced`或`settings->connection`中找到代理配置。

如果你想在文档中查看这些例子，请在[Github仓库](https://github.com/nymtech/docs)中创建一个PR。

### Blockstream Green钱包 
[Blockstream Green](https://blockstream.com/green/)是一个比特币和热钱包，由于它支持Socks5，它可以使用Nym服务。请在Green中设置你的代理，操作如下：

首先你需要注销。

接下来，点击右侧的设置，设置代理网址。

![Blockstream Green settings](/img/docs/wallet-proxy-settings/blockstream-green.gif)

大多数钱包和其他应用程序的工作方式基本相同：找到网络代理设置，输入代理网址（主机：**localhost**，端口：**1080**）。

在一些其他应用程序中，如果只有一个代理输入字段，你可以写成**localhost:1080**。

### Keybase
我们自己的内部聊天用的就是这个软件，欢迎试一试，并在我们的频道打个招呼!

在`设置>高级>代理设置`下面配置KeyBase中的socks5代理。

![Electrum settings](/img/docs/keybase-settings.gif)

