---
sidebar_label: Websocket客户端
hide_title: false
description: "How to run the Nym websocket client on a desktop or server machine."
title: Websocket客户端
---

:::note注意

Nym Websocket 客户端是在[构建Nym](/docs/stable/run-nym-nodes/build-nym/)章节构建的。如果你还没有构建Nym但想运行这里的代码，请先去之前的章节。

:::

你可以用以下方法检查你的二进制文件是否被正确编译了：


```
./nym-client --help
```

它会返回一系列的可用命令：

```

      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (client - version 0.12.1)

    
Nym Client 0.12.1
Nymtech
Implementation of the Nym Client

USAGE:
    nym-client [SUBCOMMAND]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

SUBCOMMANDS:
    help       Prints this message or the help of the given subcommand(s)
    init       Initialise a Nym client. Do this first!
    run        Run the Nym client with provided configuration client optionally overriding set parameters
    upgrade    Try to upgrade the client

```

两个你向客户发出的最重要的命令是：

1. `init` -- 初始化一个新的客户端实例。
2. `run`-- 运行一个混合网络客户端进程。

你可以通过运行以下命令来检查可用命令的参数：

```
./nym-client <command> --help 
```

### 初始化一个新的客户端实例

在你使用客户端之前，你需要初始化一个新实例。客户端的每个实例都有自己的公钥/私钥对，并连接到自己的网关，这三样东西（公钥/私钥对+网关）共同构成了一个应用程序的身份。

运行以下命令来初始化一个新的客户端实例：

```
./nym-client init --id <client_id> 
```

上面例子中的`--id`是一个本地标识符，这样你就可以为你的客户端命名，名称**永远不会**在网络上传输。

`--gateway`参数是一个可选参数，如果你想使用一个特定的网关，请浏览`https://sandbox-explorer.nymtech.net/network-components/gateways`并选择`Identity key`然后传递参数到：`--gateway CbxxDmmNCufXSsi7hqUnorchtsqqSLSZp7QfRJ5ugSRA`。另外，如果你不传递这个参数，程序会随机选择一个网关连接。

当你启动一个客户端实例时，它将生成一个配置目录并存储在`$HOME_DIR/.nym/clients/<client-name>/`。

```
/home/<user>/.nym/clients/<client_id>/
├── config
│   └── config.toml
└── data
    ├── private_identity.pem
    └── public_identity.pem
```

文件`config.toml`包含了客户端配置选项，而两个`pem`文件包含客户端的密钥信息。

生成的文件包含客户端名称、公/私钥对和网关地址。上面例子中的名称`<client_id>`只是一个本地标识符，这样你就可以为你的客户端命名，名称**永远不会**在网络上传输。

### 运行本地客户端

你可以通过以下命令运行客户端：

```
./nym-client run --id <client_id>
```

当你运行客户端时，它会立即开始生成（假的）覆盖流量并将其发送到Nym测试网。

恭喜你，你刚刚为这个世界贡献了一丁点隐私！按下`<CTRL-C>`来停止客户端。

当客户端第一次启动时，它将与Nym网络的验证节点通讯，并获得一个可用的Nym节点（网关、混合节点和验证节点）的列表，我们把这个节点列表称为网络*拓扑结构*。客户端这样做是为了知道如何连接，在网络上注册自己，并知道哪些混合节点可以路由Sphinx数据包。

一旦客户端获得了网络拓扑结构，它就会自动发送一个注册请求给第一个可用的网关，网关会返回一个唯一的认证令牌，客户端会把这个令牌附在随后的每个请求上。

#### 连接到本地的websocket

Nym本地客户端暴露了一个websocket接口，你的代码可以连接到这个接口。要为你的应用程序编程，请为你使用的语言选择一个websocket库。默认的websocket端口是`1977`，如果你想的话，你可以在客户端配置中覆盖它。

### 消息类型

在下面的例子中，你的应用程序通过websocket发送少量信息，与本地客户端进行通讯。

#### 发送文本

如果你想通过混合网络发送文本信息，请格式化生成一个像下面这样的信息，然后把它放进websocket中：

```json
{
  "type": "send",
  "message": "the message",
  "recipient_address": "71od3ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm"
}
```

在一些应用中，例如人们与认识的朋友聊天，你可能想在信息栏中包括未加密的回复信息，像这样：

```json
{
  "type": "send",
  "message": {
    "sender": "198427b63ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm",
    "chatMessage": "hi julia!"
  },
  "recipient_address": "71od3ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm"
}
```

这为接收聊天提供了一个简单的方法，然后再发送一个回复信息：

```json
{
  "type": "send",
  "message": {
    "sender": "71od3ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm",
    "chatMessage": "winston, so lovely to hear from you! shall we meet at the antiques shop?"
  },
  "recipient_address": "198427b63ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm"
}
```

如果这符合你对安全的要求，很好，但是，你可能想使用一次性回复块，或_surbs_来发送匿名回复，我们会尽快提供。

#### 发送二进制数据

*以下所提供的链接参考了Nym的某一版本，如果你有任何问题，请查看最新版本的代码*。

你也可以发送字节而不是JSON。为此，你必须发送一个二进制websocket的数据帧，其中包含了二进制编码的Nym的[`ClientRequest`](https://github.com/nymtech/nym/blob/6f8ae53f0c47aa82b14e96bc313f47643c505063/clients/native/websocket-requests/src/requests.rs#L36)。关于正确的编码，请查阅[rust参考实现](https://github.com/nymtech/nym/blob/6f8ae53f0c47aa82b14e96bc313f47643c505063/clients/native/websocket-requests/src/requests.rs#L216)，因为它在未来可能会改变。

作为响应，本地客户端将发送一个`ServerResponse`，它可以用类似的方式进行解码，更多细节请参考[rust参考实现](https://github.com/nymtech/nym/blob/6f8ae53f0c47aa82b14e96bc313f47643c505063/clients/native/websocket-requests/src/requests.rs#L216)。

Nym社区使用二进制API的一个例子项目是[BTC-BC](https://github.com/sgeisler/btcbc-rs/)：使用Nym的比特币交易，客户端和服务提供者用Rust编写。

#### 接收消息

当另一个peap（隐私增强型应用程序）向你发送信息时，所有不相干的信息都会被移除，你只得到信息。所以，如果一个应用程序发送了以下信息：

```json
{
  "type": "send",
  "message": "2 + 2 = 4",
  "recipient_address": "71od3ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm"
}
```

用户只会收到`2 + 2 = 4`。

#### 查看你自己的地址

有时，当你启动你的应用程序时，想要本地客户端返回自己的地址（来自保存的配置文件），请发送下面的信息：

```json
{
  "type": "selfAddress"
}
```

你会得到答复：

```json
{
  "type": "selfAddress",
  "address": "the-address"
}
```

#### 错误消息

来自应用程序客户端或网关的错误，会以下面格式通过websocket发送到你的代码中：

```json
{
  "type": "error",
  "message": "string message"
}
```
