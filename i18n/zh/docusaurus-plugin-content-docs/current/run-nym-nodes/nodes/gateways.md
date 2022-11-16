---
sidebar_label: 网关
description: "Gateways provide a destination for mixnet packets. Most of the internet doesn't use encrypted Sphinx packets, so the gateway acts as a destination for Sphinx traffic."
hide_title:  false
title: 网关
---

:::note注意

Nym网关是在[构建Nym](/docs/next/run-nym-nodes/build-nym/)章节构建的。如果你还没有构建Nym但想运行这里的代码，请先去之前的章节。

:::

网关为混合节点数据包提供一个目的地。大多数互联网不使用加密的Sphinx 数据包，所以网关作为一个目的地，有点像一个邮箱，提供收发信息服务。

Nym客户端连接到网关，信息会自动发送到连接的客户端，并从网关的存储中删除。如果客户端在消息到达时处于离线状态，信息将被储存起来以便检索。当客户端连接时，所有消息会发送到客户端，并从网关中删除。从0.8.x版本开始，网关使用端到端加密，所以他们不能看到自己为用户存储的内容。

当网关启动时，客户端会向它注册，而网关返回一个访问令牌。然后，访问令牌加上网关的IP可以作为传递数据包的一种寻址方式。

Nym平台代码中包含的默认网关的实现可以保存数据包，以便以后检索。对于许多应用程序（如简单的聊天），这是有用的，因为它提供了一个潜在的离线客户端可以检索数据包的地方，访问令牌允许客户从网关节点提取消息。

### 准备一个钱包
#### 主网
在你初始化和运行你的网关之前，请到我们的[网站](https://nymtech.net/download/)下载对应你的操作系统的Nym钱包。如果没有找到适合你的操作系统的二进制文件，你可以查看[这里](/docs/next/nym-apps/wallet)的说明自己编译钱包。

如果你还没有Nym钱包地址，请使用钱包创建一个，并冲入NYM代币。绑定网关所需的最低金额为100 `NYM`，但请确保你有更多的代币来支付手续费。

`NYM`目前在数个交易所上线。前往我们的[电报群](https://t.me/nymchan)，了解在哪里可以获得`NYM`代币。 

:::note注意
记住，你**只能**使用Cosmos的 `NYM`代币来绑定你的网关。你**不能**使用ERC20的`NYM`来运行一个节点。
:::

#### Sandbox测试网
请下载一个钱包，并按上述方法创建一个账户。然后前往我们的[代币水龙头](https://faucet.nymtech.net/)获得一些代币，然后绑定到你的节点上。

### 查看命令帮助

你可以用以下方法检查你的二进制文件是否被正确编译了：


```
./nym-gateway --help
```

<details>
  <summary>输出结果</summary>

        nym-gateway 1.1.0
        Nymtech

        Build Timestamp:    2022-05-06T13:07:46.187796508+00:00
        Build Version:      1.1.0
        Commit SHA:         945dda0c24f2f964f27066af320441446973e383
        Commit Date:        2022-05-04T15:57:36+00:00
        Commit Branch:      detached HEAD
        rustc Version:      1.60.0
        rustc Channel:      stable
        cargo Profile:      release

        USAGE:
            nym-gateway <SUBCOMMAND>

        OPTIONS:
            -h, --help
                    Print help information

            -V, --version
                    Print version information

        SUBCOMMANDS:
            help
                    Print this message or the help of the given subcommand(s)
            init
                    Initialise the gateway
            node-details
                    Show details of this gateway
            run
                    Starts the gateway
            sign
                    Sign text to prove ownership of this mixnode
            upgrade
                    Try to upgrade the gateway

</details>

你也可以用以下方法检查个别命令所需的各种参数：

```
./nym-gateway <command> --help
```


### 初始化你的网关


要检查可用的配置命令，请输入：

```
 ./nym-gateway init --help
```

<details>
  <summary>输出结果</summary>

    nym-gateway-init 
    Initialise the gateway

    USAGE:
        nym-gateway init [OPTIONS] --id <ID> --host <HOST> --wallet-address <WALLET_ADDRESS> --mnemonic <MNEMONIC>

    OPTIONS:
            --announce-host <ANNOUNCE_HOST>
                The host that will be reported to the directory server

            --clients-port <CLIENTS_PORT>
                The port on which the gateway will be listening for clients gateway-requests

            --datastore <DATASTORE>
                Path to sqlite database containing all gateway persistent data

        -h, --help
                Print help information

            --host <HOST>
                The custom host on which the gateway will be running for receiving sphinx packets

            --id <ID>
                Id of the gateway we want to create config for

            --mix-port <MIX_PORT>
                The port on which the gateway will be listening for sphinx packets

            --mnemonic <MNEMONIC>
                Cosmos wallet mnemonic needed for double spending protection

            --validator-apis <VALIDATOR_APIS>
                Comma separated list of endpoints of the validators APIs

            --wallet-address <WALLET_ADDRESS>
                The wallet address you will use to bond this gateway, e.g.
                nymt1z9egw0knv47nmur0p8vk4rcx59h9gg4zuxrrr9

</details>

:::note注意
启用`eth`功能构建Nym文件的用户会在控制台看到额外的参数标识。
:::

下面的命令返回你当前IP上的一个`id`名为`supergateway`的网关：

```
./nym-gateway init --id supergateway --host $(curl ifconfig.me) --wallet-address <WALLET_ADDRESS> --mnemonic <MNEMONIC> 
```

上面的`$(curl ifconfig.me)`命令会使用外部服务自动返回你的IP，或者，你也可以手动输入你的IP。如果你这样做，记住要输入你的IP但**不包括**任何端口信息。

你的网关**必须**要能寻址IPv6，这在许多ISP中是不好找的。因此，在路由器后面运行网关是很难办到的，我们强烈建议你在VPS上运行你的网关，加入IPv6连接将有助于保持更好的正常运行时间和连接。

启用`eth`功能的用户需要添加额外的参数来初始化网关：

```
./nym-gateway init --id supergateway --host $(curl ifconfig.me) --wallet-address <WALLET_ADDRESS> --eth-endpoint <ETH_ENDPOINT> --mnemonic <MNEMONIC>
```

记得通过Nym钱包绑定你的节点，可以在[这里](https://github.com/nymtech/nym/releases/)下载，这是区块链识别你的节点和它的软件版本，并将你的网关纳入混合网络所必需的。

### 运行你的网关

使用`run`命令来运行你的网关。

比如：

```
./nym-gateway run --id supergateway
```

<details>
  <summary>输出结果</summary>

    Starting gateway supergateway...

    To bond your gateway you will need to install the Nym wallet, go to https://nymtech.net/get-involved and select the Download button.
    Select the correct version and install it to your machine. You will need to provide the following: 
    
    Identity Key: 6jWSJZsQ888jwzi1CBfkHefiDdUEjgwfeMfJU4RNhDuk
    Sphinx Key: HbqYJwjmtzDi4WzGp7ehj8Ns394sRvJnxtanX28upon
    Owner Signature: wRKxr1CnoyBB9AYPSaXgE4dCP757ffMz5gkja8EKaYR82a63FK9HYV3HXZnLcSaNXkzN3CJnxG2FREv1ZE9xwvx
    Host: 62.240.134.46 (bind address: 62.240.134.46)
    Version: 1.1.0
    Mix Port: 1789, Clients port: 9000
    Data store is at: "/home/mx/.nym/gateways/supergateway/data/db.sqlite"
    2022-04-27T16:04:33.831Z INFO  nym_gateway::node > Starting nym gateway!
    2022-04-27T16:04:34.268Z INFO  nym_gateway::node > Starting mix packet forwarder...
    2022-04-27T16:04:34.269Z INFO  nym_gateway::node > Starting mix socket listener...
    2022-04-27T16:04:34.269Z INFO  nym_gateway::node::mixnet_handling::receiver::listener > Running mix listener on "62.240.134.46:1789"
    2022-04-27T16:04:34.269Z INFO  nym_gateway::node                                      > Starting client [web]socket listener...
    2022-04-27T16:04:34.269Z INFO  nym_gateway::node                                      > Finished nym gateway startup procedure - it should now be able to receive mix and client traffic!

</details>

### 配置你的防火墙

尽管你的网关现在已经准备好接收流量了，但你的服务器可能还没有准备好 -- 下面的命令将允许你使用`ufw`建立一个配置正确的防火墙：

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

最后打开你的网关的p2p端口，以及ssh和入站流量的端口：

```
sudo ufw allow 1789,22,9000/tcp
# check the status of the firewall
sudo ufw status
```

关于网关的端口配置的更多信息，请查看下面的[网关端口参考表](#gateway-port-reference)。

### 使用systemd自启动你的网关

虽然这不是完全必要，但让网关在系统启动时自启动还是很有用的，下面的systemd服务文件可以帮到你：

```ini
[Unit]
Description=Nym Gateway (1.0.0-rc.1)
StartLimitInterval=350
StartLimitBurst=10

[Service]
User=nym
LimitNOFILE=65536
ExecStart=/home/nym/nym-gateway run --id supergateway
KillSignal=SIGINT
Restart=on-failure
RestartSec=30

[Install]
WantedBy=multi-user.target
```

将上述文件放到你的系统中，即`/etc/systemd/system/nym-gateway.service`

修改`ExecStart`中的路径，使其指向你的网关的二进制文件（`nym-gateway`），并修改`User`为你要运行的用户。

如果你在服务器上搭建了nym，并且你的用户名是`jetpanther`，那么启动命令可能看起来像这样：

`ExecStart=/home/jetpanther/nym/target/release/nym-gateway run --id your-id`

之后运行：

```
systemctl enable nym-gateway.service
```

启动你的网关：

```
service nym-gateway start
```

这将使得你的节点在系统启动时启动，如果你重新启动你的机器，网关将自动恢复。

你也可以用`service nym-gateway stop`或`service nym-gateway restart`停止或者重启你的网关。

注意：如果你在启用systemd脚本后对其做了任何改动，你需要运行如下命令：

```
systemctl daemon-reload
```

这会让你的操作系统知道可以重新加载服务配置了。

### 指标

目前，这只是网关的一个指标的端点。它可以通过`curl`访问：

```
# For gateways on the Sandbox testnet
curl https://sandbox-validator.nymtech.net/api/v1/status/gateway/<GATEWAY_ID>/core-status-count
# For gateways on the Mainnet
curl https://validator.nymtech.net/api/v1/status/gateway/<GATEWAY_ID>/core-status-count
```

该端点返回你的网关被选入奖励集中并收到1000个数据包的次数，然后这些数据包会被网络监视器用来测试网络的其他部分。

- `identity`: 网关的身份密钥。
- `count`：它被用于网络测试的次数。

### 网关节点参考表

所有针对网关的端口配置可以在`$HOME/.nym/gateways/<your-id>/config/config.toml`文件中找到。如果你修改了任何端口的配置，记得要重新启动你的网关。

| 默认端口 | 用途               |
| -------- | ------------------ |
| 1789     | 监听混合网络的流量 |
| 9000     | 监听客户端流量     |

