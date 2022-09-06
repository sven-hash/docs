---
sidebar_label: Socks5客户端
hide_title:  false
description: "How to run the Nym Socks5 client on a desktop or server machine."
title: Socks5客户端
---

:::note注意

Nym Socks5客户端是在[构建Nym](/docs/next/run-nym-nodes/build-nym/)章节构建的。如果你还没有构建Nym但想运行这里的代码，请先去之前的章节。

:::

### 查看命令帮助
你可以用以下方法检查你的二进制文件是否被正确编译了：

```
./nym-socks5-client --help
```

它会返回一系列的可用命令：

<details>
  <summary>输出结果</summary>

        Nym Socks5 Proxy 1.0.1
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

    
</details>

你可以通过运行以下命令来检查可用命令的参数：

```
./nym-client <command> --help 
```

### 初始化一个新的客户端实例

在你使用客户端之前，你需要初始化一个新的实例，运行以下命令初始化：

```
nym-socks5-client init --id <id> --provider <provider>
```

上面例子中的`--id`是一个本地标识符，这样你就可以为你的客户端命名，名称**永远不会**在网络上传输。

`--provider`字段需要填写一个网络请求器的Nym地址，它可以代表你进行网络请求。如果你在社区找不到，你将不得不[运行你自己的请求器](/docs/stable/run-nym-nodes/nodes/requester/)。一个更好的发现公共服务提供者的方法即将到来，但目前只要你在社区频道中询问，就会有人给你一个地址来用。

用户如果启用了`eth`功能，需要添加如下几个参数，以便初始化他们的客户端。

```
nym-socks5-client init --eth_endpoint <eth_endpoint> --eth_private_key <eth_private_key> --id <id> --provider <provider>
```

### 运行socks5客户端

运行初始化过的客户端：

```
nym-socks5-client run --id <id>
```

它会返回：

<details>
  <summary>输出结果</summary>

    
        2022-04-27T16:15:45.843Z INFO  nym_socks5_client::client > Starting nym client
        2022-04-27T16:15:45.889Z INFO  nym_socks5_client::client > Obtaining initial network topology
        2022-04-27T16:15:51.470Z INFO  nym_socks5_client::client > Starting topology refresher...
        2022-04-27T16:15:51.470Z INFO  nym_socks5_client::client > Starting received messages buffer controller...
        2022-04-27T16:15:51.648Z INFO  gateway_client::client    > Claiming more bandwidth for your tokens. This will use 1 token(s) from your wallet. Stop the process now if you don't want that to happen.
        2022-04-27T16:15:51.648Z WARN  gateway_client::client    > Not enough bandwidth. Trying to get more bandwidth, this might take a while
        2022-04-27T16:15:51.648Z INFO  gateway_client::client    > The client is running in disabled credentials mode - attempting to claim bandwidth without a credential
        2022-04-27T16:15:51.706Z INFO  nym_socks5_client::client > Starting mix traffic controller...
        2022-04-27T16:15:51.706Z INFO  nym_socks5_client::client > Starting real traffic stream...
        2022-04-27T16:15:51.706Z INFO  nym_socks5_client::client > Starting loop cover traffic stream...
        2022-04-27T16:15:51.707Z INFO  nym_socks5_client::client > Starting socks5 listener...
        2022-04-27T16:15:51.707Z INFO  nym_socks5_client::socks::server > Listening on 127.0.0.1:1080
        2022-04-27T16:15:51.707Z INFO  nym_socks5_client::client        > Client startup finished!
        2022-04-27T16:15:51.707Z INFO  nym_socks5_client::client        > The address of this client is: BFKhbyNsSVwbsGSLwHDkfwH5mwZqZYpnpNjjV7Xo25Xc.EFWd1geWspzyVeinwXrY5fCBMRtAKV1QmK1CNFhAA8VG@BNjYZPxzcJwczXHHgBxCAyVJKxN6LPteDRrKapxWmexv
        2022-04-27T16:15:51.707Z INFO  nym_socks5_client::socks::server > Serving Connections...

</details>



### 使用socks5客户端

这将在你的本地机器上启动一个SOCKS5代理，地址是`localhost:1080`。现在你可以通过Nym Sandbox测试网来传输应用程序的流量。

想要查看如何将一些现有的应用程序附加到你的客户端的例子，请看[使用外部应用程序](/docs/stable/use-external-apps/)章节。