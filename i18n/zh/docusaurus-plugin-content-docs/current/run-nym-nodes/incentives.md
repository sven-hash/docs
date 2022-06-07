---
sidebar_label: 网络激励
description: "Why should you run Nym nodes?"
hide_title: false
title: 激励
---

Nym网络有一些与[Tor](https://tor-project.org)相同的目标，但我们想让Nym能够随着需求的增加而扩大规模（当需求下降时则缩小规模，以避免浪费资源）。为了以去中心化的方式做到这一点，节点在加入网络之前需要_质押_，需要一定数量的`NYM`代币质押到节点以加入Nym网络，以及一个委托质押系统。

当前Nym有两个公共网络：一个是永久Sandbox测试网，另一个是Nym主网

## Nym主网

节点运营商通过执行不同的操作获得`NYM`代币。关于每个节点类型的具体任务，请参见侧边栏的`节点`章节的不同页面，以了解更多信息。 

### 加入主网

Nym是一个无权限的、开放的系统。因此，持有`NYM`代币的用户能够使用代币来访问混合网络，绑定节点，并通过桌面钱包将这些代币质押在现有的节点上以获得奖励。

大多数用户将不需要运行一个节点来获得网络奖励；我们建议任何希望以非技术的方式为网络做出贡献的人，可以通过桌面钱包将他们的代币委托给现有的节点运营商。

如果你有技术能力，尝试运行一个网关或者混合节点! 我们建议人们运行网关，因为我们有足够的混合节点，他们来自我们之前迭代的各种测试网。

在未来，如果你想以不同的方式为网络提供服务，你也可以通过建立一个服务提供商来赚钱，并消耗用户为使用你的服务而支付的服务凭证，Nyx区块链验证节点将销毁服务凭证。

## Sandbox测试网

Sandbox测试网是没有激励机制的，但它包括`NYMT`测试代币，旨在模拟Nym主网的代币经济学。`NYMT`在现实世界中没有价值，但节点操作员或者委托人会收到`NYMT`，以了解Nym主网的经济模型、奖励分享和其他机制如何运作。

:::caution警告

测试网的奖励可能不完全反映主网上的奖励机制，但它们会非常接近于主网上的奖励！

:::

### 作为Milhon的参与者加入Sandbox测试网 

当Sandbox测试网启动时，现有的成员将自动转移到Sandbox测试网，他们的钱包和节点的余额也将被转移，这些余额是基于2021年12月20日15:00 UDT的快照确定的。 

### 作为新的参与者加入Sandbox测试网  

我们搭建了一个NYMT测试代币的[水龙头](https://faucet.nymtech.net/)。这些代币可以用来绑定节点并委托给现有的Sanbox的节点

:::caution警告

不论由于任何原因，你丢失了你的助记词，你账户中持有的代币就会丢失，我们**无法**返还给你。

:::

# 网络奖励

节点运营商和委托人的奖励是根据[Nym白皮书](https://nymtech.net/nym-whitepaper.pdf)第6章节中的规定确定的。

下面是用于计算每个周期的奖励所涉及的变量和公式的简要说明。最初的奖励池包含2.5亿个NYM代币，剩余的7.5亿NYM代币用作流通。

|符号|定义|
|--|--|
|<img src="https://render.githubusercontent.com/render/math?math=R"></img>|全球的奖励份额，起始值为奖励池的2% |
|<img src="https://render.githubusercontent.com/render/math?math=R_{i}"></img>|混合节点`i`的代币奖励数目|
|<img src="https://render.githubusercontent.com/render/math?math=\sigma_{i}"></img>|节点总质押数目（绑定+委托）对代币流通量的比率|
|<img src="https://render.githubusercontent.com/render/math?math=\lambda_{i}"></img>|节点运营者质押数目对代币流通量的比率|
|<img src="https://render.githubusercontent.com/render/math?math=\omega_{i}"></img>|节点`i`承担的总工作量的比例，在Sandbox测试网中设置为`1/k`|
|<img src="https://render.githubusercontent.com/render/math?math=k"></img>|质押持有者由于激励所创建的节点数目，由验证节点设置，这是个治理问题，目前由奖励的规模决定，在Sandbox测试网中设置为720|
|<img src="https://render.githubusercontent.com/render/math?math=\alpha"></img>|抵抗女巫攻击的参数 - 这个参数设置得越高，发动攻击的节点的竞争力降低的就越多|
|<img src="https://render.githubusercontent.com/render/math?math=PM_{i}"></img>|节点`i`公布的利润率，在Sandbox测试网中默认为10%|
|<img src="https://render.githubusercontent.com/render/math?math=PF_{i}"></img>| 节点`i`在奖励周期的在线时长，取值为0到1                      |
|<img src="https://render.githubusercontent.com/render/math?math=PP_{i}"></img>|节点`i`在奖励周期期间的运行成本，当前Sandbox测试网中设置为40Nym代币|

节点`i`的奖励计算公式为：

<img src="https://render.githubusercontent.com/render/math?math=R_{i}=PF_{i} \cdot R \cdot (\sigma^'_{i} \cdot \omega_{i} \cdot k %2b \alpha \cdot \lambda^'_{i} \cdot \sigma^'_{i} \cdot k)/(1 %2b \alpha)"></img>


其中：

<img src="https://render.githubusercontent.com/render/math?math=\sigma^'_{i} = min\{\sigma_{i}, 1/k\}"></img>


与

<img src="https://render.githubusercontent.com/render/math?math=\lambda^'_{i} = min\{\lambda_{i}, 1/k\}"></img>


节点`i`的操作员收到的奖励数目：

<img src="https://render.githubusercontent.com/render/math?math=min\{PP_{i},R_{i})\} %2b max\{0, (PM_{i} %2b (1 - PM_{i}) \cdot \lambda_{i}/\delta_{i}) \cdot (R_{i} - PP_{i})\}"></img>


委托`s`个代币收到的奖励数目：

<img src="https://render.githubusercontent.com/render/math?math=max\{0, (1-PM_{i}) \cdot (s^'/\sigma_{i}) \cdot (R_{i} - PP_{i})\}"></img>

其中`s'`代表委托的`s`个代币占总流通量的比例。
