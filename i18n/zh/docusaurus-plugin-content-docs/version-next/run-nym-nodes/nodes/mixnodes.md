---
sidebar_label: "Mixnodes"
description: "Mixnodes accept Sphinx packets, shuffle packets together, and forward them onwards, providing strong privacy for internet users."
hide_title: false
title: Mixnodes
---

:::note注意

Nym混合节点是在[building nym](/docs/stable/run-nym-nodes/build-nym/)构建的。如果你还没有构建Nym但想运行这里的代码，请先去之前的章节。

:::

构建完成后，`nym-mixnode`二进制文件位于`/path/to/nym/target/release/`目录下，你可以把它移动或复制到你需要的地方（例如，你可能希望在本地编译一次二进制文件，然后把它们移到不同的机器上）。

另外，你可以从我们的[发布页](https://github.com/nymtech/nym/releases)获取构建好的二进制文件。

:::caution警告

请注意，除非你在Milhon测试网运行过一个混合节点，否则**你将无法获得`NYMT`代币并在Sandbox测试网绑定你的混合节点**。

在未来，我们将建立一个代币水龙头 -- 请关注这方面的更新。

对于那些不能立即参与的人来说，请关注[委托质押](https://medium.com/nymtech/nym-delegated-staking-reputation-rewards-and-community-selection-bf0f346f7301)。
如果你将你的`NYMT`**委托**给其他人并关闭你的节点，记得**保存位于$HOME/.nym'中的密钥，以防你将来要运行一个节点**。

:::

即使你已经在Milhon测试网上运行了一个节点，**您也必须重新安装v0.12.1`nym-mixnode`二进制文件**。

你可以从源码构建软件，或者从我们的[发布页](https://github.com/nymtech/nym/releases)下载新的二进制文件。

### 初始化你的混合节点
你可以用以下方法检查你的二进制文件是否被正确编译：


```
./nym-mixnode --help
```

它应该返回一系列的可用命令：

```

      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (mixnode - version 0.12.1)

    
Nym Mixnode 0.12.1
Nymtech
Implementation of a Loopix-based Mixnode

USAGE:
    nym-mixnode [SUBCOMMAND]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

SUBCOMMANDS:
    describe        Describe your mixnode and tell people why they should delegate stake to you
    help            Prints this message or the help of the given subcommand(s)
    init            Initialise the mixnode
    node-details    Show details of this mixnode
    run             Starts the mixnode
    sign            Sign text to prove ownership of this mixnode
    upgrade         Try to upgrade the mixnode

```

要检查可用的配置命令，请输入：

```
./nym-mixnode init --help
```

它会返回：

```
      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (mixnode - version 0.12.1)


nym-mixnode-init
Initialise the mixnode

USAGE:
    nym-mixnode init [OPTIONS] --host <host> --id <id> --wallet-address <wallet-address>

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
        --announce-host <announce-host>      The custom host that will be reported to the directory server
        --host <host>                        The host on which the mixnode will be running
        --http-api-port <http-api-port>      The port on which the mixnode will be listening for http requests
        --id <id>                            Id of the nym-mixnode we want to create config for.
        --mix-port <mix-port>                The port on which the mixnode will be listening for mix packets
        --validators <validators>            Comma separated list of rest endpoints of the validators
        --verloc-port <verloc-port>          The port on which the mixnode will be listening for verloc packets
        --wallet-address <wallet-address>    The wallet address you will use to bond this mixnode, e.g.
                                             nymt1z9egw0knv47nmur0p8vk4rcx59h9gg4zuxrrr9

```

用以下命令初始化你的混合节点，将`--id`的值替换为你希望赋予混合节点的名称，将`--wallet-address`替换为你在Milhon测试网使用的地址，**该地址已经自动生成并迁移到Sandbox测试网中**。

```
./nym-mixnode init --id winston-smithnode --host $(curl ifconfig.me) --wallet-address <wallet-address>
```

:::caution警告

请确保你能访问`--wallet-address`账户，如果你还没有桌面钱包，请在[这里](https://nymtech.net/get-involved)下载，以便能够与你的节点进行交互！

:::

要参加Nym测试网，`--host`必须是可以在互联网上公开路由到的，它可以是一个IPv4或IPv6地址。你的节点必须能够使用IPv4和IPv6发送TCP数据（因为与你对话的其他节点可能使用这两种协议）。上面的`$(curl ifconfig.me)`命令是使用外部服务自动得到你的IP，或者，你也可以手动输入你的IP，如果你这样做，记住要输入你的IP但**不包括**任何端口信息。

:::caution警告

请注意，`init`命令不会销毁现有的混合节点的密钥。

:::

在`init`过程中，你可以选择改变`http_api`、`verloc`和`mixnode`端口的默认设置。如果你将来想改变这些，你可以在初始化过程中创建的`config.toml`中编辑它们的值，该文件位于`~/.nym/mixnodes/<your-id>/`。

### 运行你的混合节点

用下面的命令运行混合节点：

```
./nym-mixnode run --id winston-smithnode
```

它会返回如下的结果：

```

      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (mixnode - version 0.12.1)


Starting mixnode winston-smithnode...


To bond your mixnode you will need to install the Nym wallet, go to https://nymtech.net/get-involved and select the Download button.
Select the correct version and install it to your machine. You will need to provide the following:

Identity Key: 733KdRDp9jyiTKvK6U1AGbSg8uEb7TUN8HtTEvNACTKq
Sphinx Key: BVQxKYbGmnnESLUkzmpLVNxQkqoeuCYro7EL5sfqUkxN
Owner Signature: 4eY6PEUEPMWZSBc5dSksrWWQrtCcejgPptNnNbM7MWaFKru7LzSNib8FtZdqcUGRvsySu44znPZx6QmU1snd1Zov
Host: 1.2.3.4 (bind address: 127.0.0.1)
Version: 0.12.1
Mix Port: 1789, Verloc port: 0.12.1, Http Port: 8000

You are bonding to wallet address: nymt1z9egw0knv47nmur0p8vk4rcx59h9gg4zuxrrr9


 2021-12-20T09:53:38.646Z INFO  nym_mixnode::node > Starting nym mixnode
 2021-12-20T09:53:38.856Z INFO  nym_mixnode::node > Starting node stats controller...
 2021-12-20T09:53:38.857Z INFO  nym_mixnode::node > Starting packet delay-forwarder...
 2021-12-20T09:53:38.857Z INFO  nym_mixnode::node > Starting socket listener...
```

如果一切顺利，你会在[Sandbox网络浏览器](https://sandbox-explorer.nymtech.net)看到你的节点在运行。

注意，你的节点的公共身份密钥（public identity key）会在启动过程中显示出来，你可以用它来在列表中识别你的节点。

继续阅读以了解更多关于配置选项或在你遇到问题时的故障排除的内容，还有一些在AWS和其他云供应商上运行的提示，其中一些需要微小的额外设置。

也可以看看`$HOME/.nym/mixnodes/`中保存的配置文件，查看更多的配置选项。

### 描述你的混合节点 (可选)

为了在以后的测试网发展过程中，别人在委托时可以通过人类可读信息识别你的节点，你可以用以下命令`描述`你的混合节点。

```
./nym-mixnode describe --id winston-smithnode
```

这将输出这样的结果：

```

      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (mixnode - version 0.12.1)


name: winston-smithnode
description: nym-mixnode hosted on Linode VPS in <location> with the following specs: <specs>.
link, e.g. https://mixnode.yourdomain.com: mixnode.mydomain.net
```

这些信息将显示在网络浏览器中混合节点的页面上，并帮助人们做出委托质押的决定。

### 显示混合节点的信息 

你可以随时用`node-details`命令检查混合节点的细节。

```
./nym-mixnode node-details --id winston-smithnode


      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (mixnode - version 0.12.1)


Identity Key: 733KdRDp9jyiTKvK6U1AGbSg8uEb7TUN8HtTEvNACTKq
Sphinx Key: BVQxKYbGmnnESLUkzmpLVNxQkqoeuCYro7EL5sfqUkxN
Owner Signature: 4eY6PEUEPMWZSBc5dSksrWWQrtCcejgPptNnNbM7MWaFKru7LzSNib8FtZdqcUGRvsySu44znPZx6QmU1snd1Zov
Host: 1.2.3.4 (bind address: 127.0.0.1)
Version: 0.12.1
Mix Port: 1789, Verloc port: 0.12.1, Http Port: 8000

You are bonding to wallet address: nymt1z9egw0knv47nmur0p8vk4rcx59h9gg4zuxrrr9
```

### 配置你的防火墙

使用`ufw`命令设置防火墙。

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

最后打开混合节点的p2p端口、ssh、http和https链接的端口，以及用于verloc和ping的`8000`和`1790`端口：

```
sudo ufw allow 1789,1790,8000,22,80,443/tcp
# check the status of the firewall
sudo ufw status
```

关于混合节点端口配置的更多信息，请查看下面的[混合节点端口参考表](#mixnode-port-reference)。

### 使用systemd自启动你的混合节点

让混合节点在系统启动时自启动非常有用，创建一个systemd的服务文件可以做到这一点：

```ini
[Unit]
Description=Nym Mixnode (0.12.1)
StartLimitInterval=350
StartLimitBurst=10

[Service]
User=nym
LimitNOFILE=65536
ExecStart=/home/nym/nym-mixnode run --id mix0100
KillSignal=SIGINT
Restart=on-failure
RestartSec=30

[Install]
WantedBy=multi-user.target
```

将上述文件放到你的系统中，即`/etc/systemd/system/nym-gateway.service`

修改`ExecStart`中的路径，使其指向你的混合节点的二进制文件（`nym-mixnode`），并修改`User`为你要运行的用户。

如果你在服务器上搭建了nym，并且你的用户名是`jetpanther`，那么启动命令可能看起来像这样：

`ExecStart=/home/jetpanther/nym/target/release/nym-mixnode run --id your-id`. Basically, you want the full `/path/to/nym-mixnode run --id whatever-your-node-id-is`

之后运行：

```
systemctl enable nym-mixnode.service
```

启动你的节点：

```
service nym-mixnode start
```

这将使得你的节点在系统启动时自启动，如果你重新启动你的机器，混合节点将自动恢复。

你也可以用`service nym-mixnode stop`或`service nym-mixnode restart`停止或者重启你的混合节点。

注意：如果你在启用systemd脚本后对其做了任何改动，你需要运行如下命令：

```
systemctl daemon-reload
```

这会让你的操作系统知道可以重新加载服务配置了。

#### 设定资源限制ulimit
Linux机器限制了一个用户可以有多少个打开的文件，这被称为 "ulimit"。

`ulimit`在大多数系统上默认为1024，它需要设置得更高，因为混合节点会与其他节点建立和接收大量的连接。

如果你看到以下错误：

```
Failed to accept incoming connection - Os { code: 24, kind: Other, message: "Too many open files" }
```

这意味着操作系统正在阻止网络连接的进行。

##### 通过`systemd`服务文件设置ulimit

用下面的命令查询你的混合节点的ulimit：

```
grep -i "open files" /proc/$(ps -A -o pid,cmd|grep nym-mixnode | grep -v grep |head -n 1 | awk '{print $1}')/limits
```

你会得到硬和软的限制，看起来像这样：

```
Max open files            65536                65536                files
```

如果你的输出结果与**上述相同**，那么你的节点将不会遇到任何与`ulimit`相关的问题。

然而，如果其中一个值是`1024`，你必须通过systemd服务文件提高限制，在之前的服务文件中添加这一行：

```
LimitNOFILE=65536
```

重新加载守护进程：

```
systemctl daemon-reload
```

或者以root身份执行这个命令，在全系统范围内设置`ulimit`：

```
echo "DefaultLimitNOFILE=65535" >> /etc/systemd/system.conf
```

重新启动你的机器并重启你的节点。重新运行后，使用`cat /proc/$(pidof nym-mixnode)/limits | grep "Max open files"`来确认限制已经变成了65535。

##### 在基于`non-systemd`的发行版上设置ulimit。

编辑 `etc/security/conf`并添加以下内容：

```
# Example hard limit for max opened files
username        hard nofile 4096
# Example soft limit for max opened files
username        soft nofile 4096
```

之后重启你的机器并重启你的混合节点。

### 检查你的节点是否正确混合流量包

一旦你启动混合节点并连接到测试网验证节点，你的节点将自动显示在[Nym测试网浏览器](https://sandbox-explorer.nymtech.net/)中，或者查看社区成员Evgeny Garanin在[Nodes Guru](https://nodes.guru)创建的[排行榜界面](https://nodes.guru/nym/leaderboard)。

更多详情请见[故障排除常见问题解答](https://nymtech.net/docs/run-nym-nodes/troubleshooting/#how-can-i-tell-my-node-is-up-and-running-and-mixing-traffic)。

### 查看命令帮助

运行如下命令查看所有可用选项！

```
./nym-mixnode --help
```

查看可用的子命令帮助：

```
./nym-mixnode upgrade --help
```

### 通过谷歌和AWS的虚拟IP和主机

在某些服务上（AWS、Google等），机器上的绑定地址与公共IP地址不一样。在这种情况下，将`--host`与`ifconfig`返回的本地机器地址绑定的同时，也要用`--announce-host`指定公共IP。请确保你传入正确的、可路由的`--announce-host`。

例如，在谷歌的机器上，`ifconfig`可能会输出以下内容：

```
ens4: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1460
        inet 10.126.5.7  netmask 255.255.255.255  broadcast 0.0.0.0
        ...
```

`ens4`网卡的IP地址是`10.126.5.7`，但这不是机器的公共IP，而是谷歌内网中机器的IP。Google使用虚拟路由，所以这台机器的公共IP是其他的地址，可能是`36.68.243.18`。

`nym-mixnode init --host 10.126.5.7`，初始化混合节点，但节点不会路由数据包，因为`10.126.5.7`不在公网上。

但是你尝试`nym-mixnode init --host 36.68.243.18`，会得到一个`AddrNotAvailable`的启动错误，这是因为混合节点不知道如何绑定一个不在`ifconfig`输出中的机器。

在这种情况下，正确的做法是`nym-mixnode init --host 10.126.5.7 --announce-host 36.68.243.18`。

这会把混合节点绑定到可用的主机`10.126.5.7`上，但向目录服务器宣称自己的公共IP为`36.68.243.18`。作为一个节点的操作者，你要确保你的公共和私人IP正确匹配。

### 混合节点硬件要求

目前，我们还没有投入大量精力优化并发性以提高吞吐量。因此，不用去配置一个多核服务器。

- 处理器：2个核心就够了，使用你能负担得起的最快的CPU。
- 内存：对内存的要求非常低 -- 通常一个混合节点可能只使用几百MB的内存。
- 磁盘：混合节点不需要磁盘空间，只需要几个字节的配置文件。

当我们有机会开始以更认真的方式进行性能优化时，硬件要求就会改变。Sphinx数据包的解密是受CPU约束的，所以一旦我们进行优化，使用更多高速的核心会有更好的效果。

### 获取混合节点指标

目前有两个方式可以获得关于混合节点的信息。`description`和`verloc`可以通过混合节点的http API访问，而`report`和`history`则从Nym节点状态API中得到。

| 端点           | 描述                                               | 命令                                                         |
| -------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| `/report`      | 返回最新的节点状态测试报告                         | `curl https://sandbox-validator.nymtech.net/api/v1/status/mixnode/<YOUR_NODE_ID>/report` |
| `/history`     | 返回过去所有的测试报告                             | `curl https://sandbox-validator.nymtech.net/api/v1/status/mixnode/<YOUR_NODE_ID>/history` |
| `/description` | 返回你用`describe`命令设置的节点描述               | `curl <YOUR_NODE_IP>:8000/description`                       |
| `/verloc`      | 返回你的节点的verloc信息，该信息每12小时更新一次。 | `curl <YOUR_NODE_IP>:8000/verloc`                            |

`/report`会返回一些关于混合节点的正常运行时间和数据包混合能力的指标。

- `mostRecentIPV4`: 返回一个`布尔值`，表示最近一次的IPv4连接测试是否成功。
- `last5MinutesIPV4`: 返回IPv4的连接时长在过去5分钟内的百分比。
- `lastHourIPV4`: 返回过去一小时内IPv4的连接时长所占的百分比。
- `lastDayIPV4`: 返回24小时内IPv4的连接时长所占的百分比。
- `mostRecentIPV6`: 返回最近一次IPv6连接测试是否成功的`布尔值`。
- `last5MinutesIPV6`: 返回IPv6的连接时长在过去5分钟内的百分比。
- `lastHourIPV6`: 返回过去一小时内IPv6的连接时长的百分比。
- `lastDayIPV6`：返回24小时内IPv6的连接时长的百分比。


### 混合节点端口参考表

所有关于混合节点的端口配置都可以在`$HOME/.nym/mixnodes/<your-id>/config/config.toml`中找到。如果你修改了任何端口配置，记得要重启你的混合节点。

| 默认端口 | 用途               |
| -------- | ------------------ |
| `1789`   | 监听混合网络的流量 |
| `1790`   | 监听VerLoc流量     |
| `8000`   | HTTPAPI端点指标    |
