---
sidebar_label: Nym请求器
description: "Run a requester proxy for the benefit of the community."
hide_title: false
title: Nym请求器
---


:::note注意

Nym请求器是在[构建Nym](/docs/next/run-nym-nodes/build-nym/)章节构建的。如果你还没有构建Nym但想运行这里的代码，请先去之前的章节。

:::

如果你能访问一台服务器，那么你可以运行nym-network-requester（Nym网络请求器），它允许Nym用户从你的服务器向外发出网络请求。

nym-network-requester不是一个开放的代理服务器。它带有一个名为`allowed.list.sample`的文件，其中包含Blockstream Green和Electrum加密钱包使用的URL。

### 运行你的nym客户端 

在启动你的Nym网络请求器之前，你必须运行一个Nym客户端的二进制文件，让它来监听请求。

首先，选择你的客户端要连接的网关，活跃的网关可以在[网络浏览器](https://sandbox-explorer.nymtech.net/nym/gateway)的'Gateways'栏目找到。

然后用你选择的网关的ID密钥初始化你的nym客户端：

```
 ./nym-client init --id requester-client --gateway <GATEWAY_ID>
```

它会返回：

``` 

      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (client - version 0.12.1)

    
Initialising client...
Saved all generated keys
Saved configuration file to "/home/nym/.nym/clients/requester-client/config/config.toml"
Using gateway: 8yGFbT5feDpPmH66TveVjonpUn3tpvjobdvEWRbsTH9i
Client configuration completed.


The address of this client is: BUVD1uAXEWSfMDdewwfxUAd6gSsEfHHPvnsV8LTfe9ZG.DaY9kqXREEkvpJ1Nv3nrfxF6HDamsJmtZQDFuyTAXwJZ@8yGFbT5feDpPmH66TveVjonpUn3tpvjobdvEWRbsTH9i
```

现在，在`/etc/systemd/system/nym-client.service`创建一个服务文件：

```
[Unit]
Description=Nym Client (0.12.1)
StartLimitInterval=350
StartLimitBurst=10

[Service]
User=nym # replace this with whatever user you wish 
LimitNOFILE=65536
ExecStart=/home/nym/nym-client run --id requester-client # remember to check the path to your nym-client binary and the id of your client 
KillSignal=SIGINT
Restart=on-failure
RestartSec=30

[Install]
WantedBy=multi-user.target
```

然后用以下命令启用并启动你的客户端：

```
systemctl enable nym-client.service
systemctl start nym-client.service

# you can always check your client has succesfully started with: 
systemctl status nym-client.service
```

通过`systemctl status nym-client.service`，你应该可以在启动时看到客户端的地址。另外，你也可以使用`journalctl -t nym-client -o cat -f`在控制台中获取客户端的输出。

记下客户端的地址：

```
 2021-07-10T14:45:50.131 INFO  nym_client::client              > The address of this client is: BLJ6SrgbaYjb7Px32G7zSZnocuim3HT9n3ocKcwQHETd.4WAAh7xRxWVeiohcw44G8wQ5bGHMEvq8j9LctDkGKUC7@8yGFbT5feDpPmH66TveVjonpUn3tpvjobdvEWRbsTH9i
```

### 运行你的网络请求器  

现在我们有一个正在运行的客户端供请求器监听，我们可以用以下命令启动它：

```
 ./nym-network-requester 

Starting socks5 service provider:
 2021-08-11T13:28:02.767Z INFO  nym_network_requester::core > * connected to local websocket server at ws://localhost:1977

All systems go. Press CTRL-C to stop the server.
```

你可以看到，它已经连接到我们之前启动的nym客户端。

现在用`CTRL-C`停止该进程，并为请求器创建一个服务文件，就像我们之前为客户端所做的那样，在`/etc/systemd/system/nym-network-requester.service`创建如下的文件：

```
[Unit]
Description=Nym Client (0.12.1)
StartLimitInterval=350
StartLimitBurst=10

[Service]
User=nym # replace this with whatever user you wish 
LimitNOFILE=65536
ExecStart=/home/nym/nym-network-requester # remember to check the path to your nym-network-requester binary 
KillSignal=SIGINT
Restart=on-failure
RestartSec=30

[Install]
WantedBy=multi-user.target
```

然后用以下命令启用并启动你的客户端：

```
systemctl enable nym-network-requester.service
systemctl start nym-network-requester.service

# you can always check your requester has succesfully started with: 
systemctl status nym-network-requester.service
```

## 配置你的防火墙

尽管你的请求器现在已经准备好接收流量了，但你的服务器可能不是 -- 使用以下`ufw`的命令创建一个正确配置的防火墙：

```
# check if you have ufw installed
ufw version
# if it is not installed, install with
sudo apt install ufw -y
# enable ufw
sudo ufw enable
# check the status of the firewall
sudo ufw status
```

最后打开你的请求器的p2p端口，以及ssh和入站流量的端口：

```
sudo ufw allow 1789,22,9000/tcp
# check the status of the firewall
sudo ufw status
```

关于请求器端口配置的更多信息，请查看下面的[请求器端口参考表](#requester-port-reference) 。

### 使用你的网络请求器

你可以安全地与任何你想要的人分享你正在运行的Nym客户端的地址 -- 如果你想为整个Nym网络运行一个请求器，可以把它交给我们，我们甚至可以把它放在Nym文档中。

这样做安全吗？如果是一个开放的代理，这将是不安全的，因为任何Nym用户都可以向互联网上的任何系统发出网络请求。

为了减轻管理员的压力，Nym请求器默认放弃了所有传入的请求。为了让它发出请求，你需要在`$HOME/.nym/service-providers/nym-network-requester/allowed.list`文件中添加特定的域名。

如果你愿意，你可以直接使用默认`allowed.list`文件中的域名，在`nym`代码的根目录下运行这个命令：

`cp service-providers/nym-network-requester/allowed.list.sample ~/.nym/service-providers/nym-network-requester/allowed.list`。

这些URL将允许来自Blockstream Green和Electrum加密货币钱包以及KeyBase聊天客户端的请求通过。

:::caution警告

如果你改变了你的 `allowed.list`，请确保你重新启动nym-network-requester.service（Nym请求器服务）以更新允许请求列表。

:::

### 为其他客户端添加URL

如果Nym只允许有三个客户端连接，那就太糟糕了。我们怎样才能增加对新的应用程序的支持呢？这是很容易做到的。

查看你的Nym请求器的配置目录：

```
ls $HOME/.nym/service-providers/network-requester/

# returns: allowed.list  unknown.list
```

我们已经知道，`allowed.list`记录了允许通过的请求，所有未知的请求都被记录在`unknown.list`中。如果你想尝试使用一个新的客户端类型，只需启动新的应用程序，将其指向你的本地SOCKS5代理（配置使用你的远程`Nym请求器`），并不断从`unknown.list`中复制URL到`allowed.list`（可能需要多次尝试，直到你得到所有的URL，这取决于应用程序的复杂性）。

我们很乐意听到你增加了对新应用程序的支持：让我们知道或在`allowed.list.sample`上提交一个有带说明的合并请求。

:::caution警告

如果你要添加自定义域名，请注意：虽然它们可能会出现在你的请求器的日志中，比如`api-0.core.keybaseapi.com:443`，但你**只需要**包括主域名就够了，在这个例子中主域名是`keybaseapi.com`。

:::

### 运行一个开放的代理

如果你真的很想运行一个开放的代理服务器，也许是为了自己使用或在一小群可信赖的朋友之间测试，你是可以这样做的。你可以在运行时通过使用`--open-proxy`标志来禁用网络检查，如果你以这种配置运行，你要自己承担风险。


### 请求器端口表

所有关于请求器的端口配置可以在`$HOME/.nym/clients/<YOUR_ID>/config/config.toml`和`$HOME/.nym/service-providers/<YOUR_ID>/config/config.toml`找到。如果你修改了任何端口配置，请记得重启你的客户和请求器进程。

| 默认端口 | 用途               |
| -------- | ------------------ |
| 1789     | 监听混合网络的流量 |
| 9000     | 监听客户端的流量   |
