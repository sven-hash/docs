---
sidebar_label: 选择你的客户端
hide_title: false
description: "There are multiple kinds of Nym client. Each is useful in different situations. Here's how to choose."
title: 选择你的客户端
---

在上一节中，我们大致了解了在构建Nym应用程序时的流程。现在是时候了解一下如何通过选择Nym客户端来构造你的应用了。

### 了解Nym客户端

Nym混合网络的很大一部分功能是在客户端实现的，包括：

* 确定网络拓扑结构 -- 存在哪些混合节点，它们的密钥是什么等等
* 在网关上注册
* 对网关进行认证
* 接收和解密来自网关的信息
* 创建层层加密的Sphinx数据包
* 发送带有真实信息的Sphinx数据包
* 当没有真正的消息被发送时，发送由Sphinx数据包构成的_覆盖流量_

在接下来的几节中，我们将讨论如何将Nym客户端集成到你的应用程序中。

### Nym客户端的类型

目前，有三种Nym客户端。

- 本地（websocket）客户端
- SOCKS5客户端
- wasm（webassembly）客户端

你需要选择你想集成哪一个到你的应用程序里。你使用哪一种，主要取决于你喜欢的编程风格和你应用程序的目的。

#### websocket客户端

你的第一个选择是本地websocket客户端（`nym-client`），这是一个编译好的程序，可以在Linux、Mac OS X和Windows机器上运行，它作为一个持久的进程在桌面或服务器机器上运行，你可以使用任何支持websockets的语言连接到它。

#### webassembly的客户端

如果你用JavaScript编程，或建立一个[边缘计算](https://en.wikipedia.org/wiki/Edge_computing)的应用程序，你可能想选择webassembly客户端。我们期待更多的客户端应用程序使用webassembly客户端搭建，它已被打包并且[可以通过npm安装](https://www.npmjs.com/package/@nymproject/nym-client-wasm)，所以你可以运行`npm install`把它集成到你的JavaScript或TypeScript应用程序中。

#### SOCKS5客户端

这种客户端对于现有的客户端是非常有用的，他们可以使用Nym混合网络而不需要修改任何代码，需要做的是使用SOCKS5代理协议（许多应用程序都支持 -- 加密钱包、浏览器、聊天应用程序等）。但在编写自定义应用程序上，它的灵活性不如其他客户端。

### 客户端之间的共同点

所有的Nym客户端软件包的功能对于隐私应用程序的开发者来说基本上是一致，它们需要作为一个持久的进程在系统中运行，以便保持连接并等待接收来自其网关的任何传入的消息。他们向网关注册和认证，并对Sphinx数据包进行加密。
