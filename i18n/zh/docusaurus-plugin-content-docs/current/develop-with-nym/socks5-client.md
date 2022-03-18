---
sidebar_label: Socks5客户端
hide_title: false
description: "How to run the Nym Socks5 client on a desktop or server machine."
title: Socks5客户端
---

:::note注意

Nym Socks5客户端是在[构建Nym](/docs/next/run-nym-nodes/build-nym/)章节构建的。如果你还没有构建Nym但想运行这里的代码，请先去之前的章节。

:::

你可以用以下方法检查你的二进制文件是否被正确编译了：

```
./nym-socks5-client --help
```

它会返回一系列的可用命令：

```
      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (socks5 proxy - version 0.12.1)

    
Nym Socks5 Proxy 0.12.1
Nymtech
A Socks5 localhost proxy that converts incoming messages to Sphinx and sends them to a Nym address

USAGE:
    nym-socks5-client [SUBCOMMAND]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

SUBCOMMANDS:
    help       Prints this message or the help of the given subcommand(s)
    init       Initialise a Nym client. Do this first!
    run        Run the Nym client with provided configuration client optionally overriding set parameters
    upgrade    Try to upgrade the client

```

你可以通过运行以下命令来检查可用命令的参数：

```
./nym-client <command> --help 
```

### 初始化一个新的客户端实例

在你使用客户端之前，你需要初始化一个新的实例，运行以下命令初始化：

```
nym-socks5-client init --eth_endpoint <eth_endpoint> --eth_private_key <eth_private_key> --id <id> --provider <provider>
```

上面例子中的`--id`是一个本地标识符，这样你就可以为你的客户端命名，名称**永远不会**在网络上传输。

 `--provider`字段需要填写为 "nym-network-requester "的Nym地址，它可以代表你进行网络请求。上面例子中的地址是我们目前为Sandbox测试网运行的地址，但如果你愿意，你也可以[运行你自己的](/docs/next/run-nym-nodes/nodes/requester/)。


### 运行socks5客户端

运行初始化过的客户端：

```
nym-socks5-client run --id <id>
```

### 使用socks5客户端

这将在你的本地机器上启动一个SOCKS5代理，地址是`localhost:1080`。现在你可以通过Nym Sandbox测试网来传输应用程序的流量。

想要查看如何将一些现有的应用程序附加到你的客户端的例子，请看[使用外部应用程序](/docs/next/use-external-apps/)章节。