---
sidebar_label: 常见问题和解决方案
description: "This page will help you find answers to common issues with setting up and maintaining mixnodes"
hide_title: false
title: 常见问题和解决方案
---


### 我试图从GitHub的归档文件中构建Nym，但是失败了

GitHub在发布时自动包括Nym仓库的.zip和tar.gz文件，你不能解压这些文件并构建 - 否则你会看到类似这样的东西：

```
  process didn't exit successfully: `/build/nym/src/nym-0.12.1/target/release/build/nym-socks5-client-c1d0f76a8c7d7e9a/build-script-build` (exit status: 101)
  --- stderr
  thread 'main' panicked at 'failed to extract build metadata: could not find repository from '/build/nym/src/nym-0.12.1/clients/socks5'; class=Repository (6); code=NotFound (-3)', clients/socks5/build.rs:7:31
  note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
warning: build failed, waiting for other jobs to finish...
error: build failed
```

为什么会出现这种情况？

因为我们的脚本会在二进制文件中自动包含Git的提交哈希值和Git标签，以方便之后的调试。如果你下载了一个.zip文件，并尝试编译，它就不是一个Git仓库，构建就会像上面那样失败。

### 我怎样才能知道我的节点已经开始运行并混合了流量？

首先检查Nym浏览器的'Mixnodes'部分:

* [主网](https://explorer.nymtech.net/overview) 
* [Sandbox测试网](https://sandbox-explorer.nymtech.net/) 

输入你的 **identity key**（身份密钥），查看'mixnode stats'和'uptime story'章节

另外，还有两个社区浏览器，由[Nodes Guru](https://nodes.guru)创建：

* [主网](https://mixnet.explorers.guru/)
* [Sandbox测试网](https://sandbox.mixnet.explorers.guru/)

如果你想了解更多的信息，或者你的节点没有显示出来，但你想仔细检查，这里有一些关于如何检查节点是否被正确配置的例子。

#### 从你的VPS检查

在你连接到你的VPS之后，可以通过各种方法获得更多的信息：

##### 使用`ss`命令统计套接字

```
sudo ss -s -t | grep 1789 # if you have specified a different port in your mixnode config, change accordingly
```

这个命令应该会返回很多包含 "ESTAB "的数据。这个命令可以在每个基于unix的系统上运行。

##### 用`lsof`列出打开的文件和依赖的进程

```
# check if lsof is installed:
lsof -v
# install if not installed
sudo apt install lsof
# run against mixnode port
sudo lsof -i TCP:1789 # if you have specified a different port in your mixnode config, change accordingly
```

这个命令应该返回类似这样的信息：

```
nym-mixno 103349 root   53u  IPv6 1333229972      0t0  TCP [2a03:b0c0:3:d0::ff3:f001]:57844->[2a01:4f9:c011:38ae::5]:1789 (ESTABLISHED)
nym-mixno 103349 root   54u  IPv4 1333229973      0t0  TCP nym:57104->194.5.78.73:1789 (ESTABLISHED)
nym-mixno 103349 root   55u  IPv4 1333229974      0t0  TCP nym:48130->static.236.109.119.168.clients.your-server.de:1789 (ESTABLISHED)
nym-mixno 103349 root   56u  IPv4 1333229975      0t0  TCP nym:52548->vmi572614.contaboserver.net:1789 (ESTABLISHED)
nym-mixno 103349 root   57u  IPv6 1333229976      0t0  TCP [2a03:b0c0:3:d0::ff3:f001]:43244->[2600:1f18:1031:2401:c04b:2f25:ca79:fef3]:1789 (ESTABLISHED)
```

##### 用`journalctl`查询`systemd`日志

```
sudo journalctl -u nym-mixnode -o cat | grep "Since startup mixed"
```

如果你已经创建了`nym-mixnode.service`文件（即你通过`systemd`运行你的混合节点），那么这个命令会显示你到目前为止已经混合了多少个数据包，并且应该返回像这样的信息：

```
2021-05-18T12:35:24.057Z INFO  nym_mixnode::node::metrics                      > Since startup mixed 233639 packets!
2021-05-18T12:38:02.178Z INFO  nym_mixnode::node::metrics                      > Since startup mixed 233739 packets!
2021-05-18T12:40:32.344Z INFO  nym_mixnode::node::metrics                      > Since startup mixed 233837 packets!
2021-05-18T12:46:08.549Z INFO  nym_mixnode::node::metrics                      > Since startup mixed 234081 packets!
2021-05-18T12:56:57.129Z INFO  nym_mixnode::node::metrics                      > Since startup mixed 234491 packets!
```

如果需要的话，你可以在命令的末尾添加` | tail`来实时获取新的日志。

#### 从你本地机器上检查

##### 使用`nmap`扫描端口

```
nmap -p 1789 <IP ADDRESS> -Pn
```

如果你的混合节点配置正确，它应该输出这样的结果：

```
bob@desktop:~$ nmap -p 1789 95.296.134.220 -Pn

Host is up (0.053s latency).

PORT     STATE SERVICE
1789/tcp open  hello
```

##### 查询所有节点并用`jq`解析

```
curl https://sandbox-explorer.nymtech.net/data/mixnodes.json | jq
```

应该返回一个当前在线的所有节点的JSON对象。

这个命令可以按不同的键进一步解析，比如说按照节点位置：

```
curl https://sandbox-explorer.nymtech.net/data/mixnodes.json | jq -r '.[].mix_node | select(.location == "London")'
```

或者按照地址：

```
curl https://sandbox-explorer.nymtech.net/data/mixnodes.json | jq -r '.[].mix_node | select(.host | startswith("65.21")) | .host'
```

#### 检查测试网的API

我们目前建立了一个API，用于返回当前网络的指标。有两个端点可以ping到关于你的混合节点的信息，`report`和`history`。在 [混合节点指标文档](docs/stable/run-nym-nodes/nodes/mixnodes) 中找到更多相关信息。

### 为什么我的节点没有混合数据包？

如果你仍然无法在[数据面包](https://sandbox-explorer.nymtech.net/)上看到你的节点，或者显示你的节点没有混合任何数据包，可能存在以下几个问题：

- 你没有正确配置主机上的防火墙。
- 你在绑定节点时提供了不正确的信息。
- 你在一个不支持IPv6的VPS上运行你的混合节点。
- 你在NAT后面运行混合节点，但没有使用`--announce-host`选项。
- 在NAT后的机器上运行混合节点时，你没有配置你的路由器防火墙，或者你的机器不支持IPv6。
- 你的混合节点根本没有运行，它要么退出了/恐慌了，要么你关闭了会话而没有持续运行节点。

:::caution警告

你的混合节点**必须同时使用IPv4和IPv6**，以便与其他节点交互并路由流量。这是我们在节点操作者中看到的许多错误背后的一个常见原因，所以请向你的供应商检查你的VPS是否能够做到这一点！

:::

#### 未正确配置防火墙

你的混合节点无法混合数据包，最常见的原因是防火墙配置不当，使用`ufw`命令设置防火墙：

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

最后打开混合节点的p2p端口、ssh、http和https链接的端口，以及用于verloc和测量ping的`8000`和`1790`端口：

```
sudo ufw allow 1789,1790,8000,22,80,443/tcp
# check the status of the firewall
sudo ufw status
```

#### 不正确的绑定信息

检查你在[网页钱包界面](https://nymtech.net/token//)中绑定混合节点时提供的信息是否正确。如果有问题，请解除绑定，然后再重新绑定你的节点！

#### 缺少`announce-host`标志

在某些云供应商，如AWS和谷歌云，你需要对你的防火墙做一些额外的配置，并使用`--host`设置你的**本地私有IP**和`--announce-host`设置混合节点的**公共IP**。

#### 没有IPv6连接

确保你的VPS与你所使用的任何供应商都支持IPv6的连接。

要获得你的主机的所有IP地址，尝试以下命令：

```
hostname -i
```

将返回你的**本地ip**地址。

```
hostname -I
```

将返回你主机的所有ip地址，你会得到像这样的输出结果：

```
bob@nym:~$ hostname -I
88.36.11.23 172.18.0.1 2a01:28:ca:102::1:641
```

- 第一个**ipv4**地址是你需要在`--announce-host`标志后设置的公共IP。
- 第二个**ipv4**是你需要在`--host`标志后设置的本地ip。
- 第三个输出应该确认你的机器是否有可用的ipv6。

#### 在NAT后面的机器上运行Nym，没有固定的IP地址

如果你想在你的本地机器上运行混合节点，那么你的ISP必须是支持IPv6。不幸的是，在2022年，大多数并没有，你难以从你的ISP那里得到一个默认的IPv6地址，通常情况下，这是一项额外的付费服务，或者他们根本不提供。

在你开始之前，请在[这里](https://test-ipv6.cz/)检查你是否有IPv6地址。如果没有，那么就不要浪费时间去运行一个节点。由于这项限制，你的节点将无法混合任何数据包。给你的ISP打电话，要求他提供IPv6，是有足够的IPv6地址可以分给每个人的。

如果一切顺利，你有IPv6可用，那么你需要在`init`（初始化）混合节点时加入一个额外的标志，`--announce-host`。当你的IPv4地址改变时，你还需要编辑你的`config.toml`文件，这可能是几天或几周的时间。

你可能还需要在路由器上做额外的配置，以允许流量进出1789端口和支持IPv6。

下面是一个初始化混合节点配置的`init`命令的例子：

```
./target/release/nym-mixnode init --id nym-nat --host 0.0.0.0 --announce-host 85.160.12.13 --layer 3
```

- `--host 0.0.0.0`应该每次都会得到本地IPv4地址，即使你的地址发生变化。例如，周一你的路由器给你的机器分配的地址是`192.168.0.13`，而在周三，DHCP租赁结束，你将被分配到另一个地址`192.168.0.14`。使用`0.0.0.0`应该可以避免这种情况，你不需要在路由器中设置任何静态IP。

- 你可以通过使用`curl ipinfo.io`（如果你使用MacOS或Linux）或访问[whatsmyip site](https://www.whatsmyip.org/)获得你当前的IPv4地址。简单地复制它并将其作为`--anounce-host`的地址。

请确保你检查你的节点是否真的混合数据包，你需要一点运气才能在NAT后面设置好这点。

#### 不小心在当前会话杀死了节点进程

当你关闭当前的终端会话时，你需要确保你不会杀死混合节点的进程！这里有多种方法可以让它在退出ssh会话后依然存在，最简单的方法是使用`nohup`，更优雅的方法是用`systemd`运行节点。

##### 用`nohup`在后台运行你的混合节点

```
nohup ./nym-mixnode run --id NYM # where `--id NYM` is the id you set during the `init` command.
```

##### 用`systemd`在后台运行你的混合节点

最可靠和优雅的解决方案是创建一个`systemd.service`文件，用`systemctl`命令运行`nym-mixnode`程序。

用`nano`在`/etc/systemd/system/nym-mixnode.service`创建一个文件，文件内容如下：

```
[Unit]
Description=nym mixnode service
After=network.target

[Service]
Type=simple
User=nym                                      # change as appropriate
LimitNOFILE=65536
ExecStart=/home/nym/nym-mixnode run --id nym  # change as appropriate
KillSignal=SIGINT
Restart=on-failure
RestartSec=30
Restart=on-abort
[Install]
WantedBy=multi-user.target
```

```
# enable the service
sudo systemctl enable nym-mixnode
# start the service
sudo systemctl start nym-mixnode
# check if the service is running properly and mixnode is mixing
sudo systemctl status nym-mixnode
```

现在你的节点应该在一直混合数据包，如果你重启你的服务器，混合节点也会重启！

任何时候你改变了`systemd`服务文件，你都需要`sudo systemctl daemon-reload`以重启服务。

#### 网络配置看起来没问题但是日志仍然是`Since startup mixed 0 packets`!

这种问题很可能是由于你的节点配置和绑定信息不匹配造成的，解除绑定，然后再重新绑定你的节点。

还要确保在网络钱包中输入的所有信息与你启动混合节点进程时在日志中出现的完全一致。特别是，`host`字段必须包含混合节点要监听的_端口_。

- 正确的主机：`34.12.3.43:1789`。
- 错误的主机：`34.12.3.43`。

### 常见错误和警告

节点日志中的大多数 "ERROR "和 "WARN "信息都是良性的 -- 只要你的节点在日志中输出`since startup mixed X packets!`（并且这个数字随着时间的推移而增加），你的节点就正在混合数据包。如果你想确认，请检查Nym的[数据面板](https://sandbox-explorer.nymtech.net/)，或者查看其他方法来检查你的节点是否正常，比如上面的小节**我怎样才能知道我的节点已经开始运行并混合了流量？**

更具体的错误和警告将在下面介绍。

#### `tokio runtime worker` 错误

如果你遇到的问题包括以下的错误：

```
thread 'tokio-runtime-worker' panicked at 'Failed to create TCP listener: Os { code: 99, kind: AddrNotAvailable, message: "Cannot assign requested address" }'
```

那么你需要在启动时使用`---announce-host <public ip>`和`--host <local ip>`这两个标志。这个问题的出现是因为你使用了像AWS或谷歌云这样的供应商，或者你的VPS可用绑定地址与公共IP地址不一样（参见[通过谷歌和AWS的虚拟IP和主机](docs/stable/run-nym-nodes/nodes/mixnodes)以获得更多关于这个问题的信息）。

#### `rocket::launch` 警告

这些警告不是问题，请忽略它们。Rocket是一个rust的web框架，我们用它来为混合节点提供`/verloc`和`/description`的http API。

在[混合节点指标文档](docs/stable/run-nym-nodes/nodes/mixnodes)中查看更多相关信息。

Rocket默认运行在端口`8000`，虽然在测试网阶段，我们需要Rocket可以通过这个端口，但在未来，可能允许大家自定义该端口。

#### `failed to receive reply to our echo packet within 1.5s. Stopping the test`

这与`0.10.1`中出现的VerLoc的实现有关，它的日志敏感性特别高。这个警告意味着发送至混合节点的回声数据包被接收，但没有发送回来。在这一点上，*这不会影响你的混合节点在测试网中的回报率或性能指标*。

#### `Connection to <IP>:1789 seems to be dead`

这个警告目前是正常的，*与你的混合节点无关！*它只是一个警告，你的节点由于某种原因无法连接到其他人的混合节点，很可能是因为他们离线或配置有问题。

### 我可以使用1789以外的端口吗？

当然！你需要做：

假设你想让你的混合节点使用`1337`端口，你需要打开新的端口（并关闭旧的）：

```
sudo ufw allow 1337
sudo ufw deny 1789
```

之后修改混合节点的配置文件。

:::caution警告

如果你想修改一个已经运行的节点的端口，你需要在编辑配置文件之前停止你的节点。

:::

假设你的节点名称是`nym`，配置文件位于`~/.nym/mixnodes/nym/config/config.toml`。

```
nano ~/.nym/mixnodes/nym/config/config.toml
```

你需要编辑文件的两个部分：`announce_address`和`listening_address`在config.toml文件中。只要在你的IP地址后面用`:1337`（你的新端口）替换`:1789`（默认端口）即可。

最后，重新启动你的节点。在你运行节点后，你应该能看到混合节点是否正在使用你在config.toml文件中修改过的端口。

### 我在哪里可以找到我的私钥和公钥以及混合节点配置？

所有的配置和密钥文件都存储在以你的`id`命名的目录中，可以在以下PATH中找到：`$HOME/.nym/mixnodes/`其中`$HOME`是启动混合节点的用户（你当前的用户）的家目录。

根据你安装Nym的方式，这些文件将被存放在这里：

1. 自动安装程序 - `/home/nym/.nym/mixnodes/<YOURNODEID>`。
2. 以你的用户或根用户的身份从源码构建 - `~/.nym/mixnodes/<YOURNODEID>`。

该目录结构如下：

```
bob@nym:~$ tree /home/nym/.nym/mixnodes/
/home/nym/.nym/mixnodes/
|-- nym010
|   |-- config
|   |   `-- config.toml
|   `-- data
|       |-- private_identity.pem
|       |-- private_sphinx.pem
|       |-- public_identity.pem
|       `-- public_sphinx.pem


```

:::caution警告

如果你`cat`（查看命令）了`public_sphinx.pem key`，但输出结果与你在Nym[数据面板](https://sandbox-explorer.nymtech.net/)上看到的公钥不同。原因是`.pem`文件是以**base64**编码的，然而在网上它们是以**base58**编码的。如果你的密钥看起来不同，不要感到困惑。它们是相同的密钥，只是编码不同而已 :)

:::

### 什么是 "verloc"，我必须配置我的混合节点来实现它吗？

`verloc`是_可验证位置_的缩写。混合节点和网关在测量彼此之间的光速距离，试图验证它们之间离的多远。在以后的版本中，这将使我们能够以一种不可伪造和值得信赖的方式在算法上验证节点位置。

你不需要为你的节点做任何额外的配置来实现这一点，从`0.10.1`版本开始，它是一个在混合网络后台运行的被动进程。

### 寻求更多帮助？

联系我们或从社区获得帮助的最快方式是访问我们的[Telegram help chat](https://t.me/nymchan_help_chat)。

对于更多的技术问题，请加入我们的Keybase频道。在[这里](https://keybase.io/)获取Keybase，然后点击Teams -> Join a team。在team name中输入nymtech.friends，然后点击继续。普通聊天，可以进入#general频道，在#dev频道了解开发相关的问题。
