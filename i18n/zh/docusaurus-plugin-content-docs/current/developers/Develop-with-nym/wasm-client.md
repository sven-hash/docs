---
sidebar_label: Webassembly客户端
hide_title: false
description: "How to integrate the Nym webassembly client into your own applications to enable strong privacy for your users"
title: Webassembly客户端
---

Nym的webassembly客户端允许任何具有webassembly能力的程序构建并发送Sphinx数据包到Nym网络。

你可以从`npm`的软件包页面安装[@nymproject/nym-client-wasm](https://www.npmjs.com/package/@nymproject/nym-client-wasm)，或者用：

```
npm i @nymproject/nym-client-wasm
```

`nym-client-wasm`包允许在移动应用和基于浏览器的客户端应用（包括Electron或类似的）中轻松创建Sphinx数据包，浏览器扩展程序也应该可以使用。

webassembly客户端允许您交付仅在 Web 浏览器窗口中构建和发送 Sphinx 数据包的 Web 应用程序，然而，请注意[基于浏览器的密钥存储](https://pomcor.com/2017/06/02/keys-in-browser/)和同源规则（这些规则的存在是有原因的）这些常见的限制，可能让你难以安全地构建纯网络应用程序，我们仍在评估我们可以做什么解决这个问题。

### 使用nym-client-wasm构建Nym应用

在Nym平台的主代码库的`clients/webassembly`目录下有两个例子，`js-example`是一个简单的、光秃秃的JavaScript应用程序，`react-example`是一个用React和Typescript完成的看起来更漂亮的聊天应用。

:::caution警告
请注意，这个例子的代码暂时已经过期：我们很快会更新。

:::

#### 初始化一个新的Nym身份

你在NPM包中使用的主方法：

```js
let identity = new Identity();
```

这将产生一个新的Nym身份，由一个公共/私人密钥对和一个Nym网关地址组成。

#### 构建一个Nym客户端

```js
let client = new Client(directoryUrl, identity, authToken);
```

这将返回一个使用websocket连接网关的Nym客户端，所有与Nym网络的通信都会通过这个客户端进行。

Nym测试网的`directoryUrl`是`http://sandbox-validator.nymtech.net:8081`。如果你想连接到正在运行的测试网，请使用它。

#### 运行Nym客户端

```js
client.start();
```

这将导致客户端从定义的`directoryUrl`检索网络拓扑结构，并通过websocket连接到其网关。覆盖流量还没有启动，但消息发送功能在客户端启动后就可以工作。

#### 发送消息

```js
client.sendMessage(message, recipient);
```

通过websocket向该客户端的Nym网关发送一条信息。

注意：webassembly客户端目前没有实现分块，超过~1KB的信息会导致系统恐慌，这将在未来的版本中修复。

`message`目前必须是一个字符串，很快会支持二进制的`Blob`和`ArrayBuffer`。

`recipient`是一个字符串类型的Nym地址。

### 得到客户端的地址

给定一个客户端，为了获得它的地址，你可以调用：

```js
client.formatAsRecipient();
```

### 一次性回复块 (SURBs)

使用surbs的匿名回复还不能在webassembly客户端工作，它们应该在下一个版本中可用。

### JSON

发送JSON是相当简单的。如果你正在使用wasm示例应用程序，你只需将其输入到消息框并发送（或在你自己的应用程序代码中以编程方式将其作为`client.sendMessage(message, recipient)`的`message`参数发送）。

### 思考你想要发送的内容！

:::caution警告

想想你的应用程序发送了什么信息，这包括你在Sphinx数据包中的任何信息，以及你的应用程序的环境可能泄露的信息。

:::

无论何时，当你使用HTML/JavaScript编写客户端时，我们建议你不要从CDN加载外部资源，网络应用程序开发员经常这样做，以节省常用资源的加载时间，或者只是为了方便。但是当你在编写隐私应用程序时，最好不要做这类请求，要把所有东西都打包到本地。

如果你在Electron应用或浏览器扩展中只使用本地资源，在Sphinx数据包中显式地编码请求数据可以保护你免受浏览器HTTP请求中的常见泄漏。[当你从浏览器窗口发出HTTP请求时，有很多东西会被泄露](https://panopticlick.eff.org/)。幸运的是，所有这些元数据和请求的泄露都不会在Nym中发生，因为你非常明确地选择将什么编码到Sphinx包里，而不是默认发送整个浏览器环境。
