---
sidebar_label: 网络奖励
hide_title: false
---

# 网络奖励

节点操作员和委托人的奖励是根据[Nym白皮书](https://nymtech.net/nym-whitepaper.pdf)第6章节中的规定确定的。

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

