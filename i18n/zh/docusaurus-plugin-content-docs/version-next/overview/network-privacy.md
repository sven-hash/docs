---
sidebar_label: Network Privacy
description: "Nym ensures network privacy using layer encrypted Sphinx packets and a Loopix mixnet."
hide_title: false
title: Network Privacy
---

 

当你在互联网上发送数据时，它可以被大量的观察者记录下来：你的ISP、互联网基础设施供应商、大型科技公司和政府。

即使网络请求的_内容_是加密的，观察者仍然可以看到数据被传输，其大小和传输频率，并从数据未加密的部分收集元数据（如IP路由信息），然后，攻击者可以将所有泄露的信息结合起来，对用户概率去匿名化。

Claudia在柏林Dappcon 2019的演讲中对网络隐私进行了总体概述。

<iframe width="560" height="380" src="https://www.youtube.com/embed/5A378jgYXSc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br /><br />

Nym混合网络对这种监视提供了非常强大的安全保障。它将许多用户的IP流量_打包并混合_在一起，形成一个_混合网络_：一个由许多_混合节点_组成的去中心化的系统。

混合网络可以用来保护区块链或者非区块链系统，像加密货币钱包这样的东西自然会适合混合网络；但非区块链的东西也是如此，比如聊天系统，或者用户广泛使用但缺乏强大隐私保护的系统，比如冠状病毒追踪应用程序。

如果你想要比较Nym和其他系统，Nym混合网络在概念上与Tor等其他系统相似，但提供了改进的保护措施，以防止端到端的时序攻击，这些攻击可以去匿名化用户。当Tor在2002年首次投入使用时，这类攻击被认为是天方夜谭，但是，如今已经成为可能。

### Loopix, NYM混合网络

为了应对这些新的威胁，Nym混合网络在数据包通过混合节点时，对加密的、不可区分的[Sphinx](https://cypherpunks.ca/~iang/pubs/Sphinx_Oakland09.pdf)数据包进行重新排序。我们混合网络的设计是基于[Loopix Anonymity System](https://arxiv.org/abs/1703.00536)，并稍加修改以提供更好的服务质量保证。我们的另一位研究人员Ania正是Loopix学术论文的作者。

这个简短的视频中，Ania在USENix 2017上详细论述了Loopix混合网的设计。

<iframe width="560" height="380" src="https://www.youtube.com/embed/R-yEqLX_UvI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br /><br />

在博文[A Simple Introduction to Mixnets](https://medium.com/nymtech/a-simple-introduction-to-mixnets-6783a103d20e)中，对混合网络做了非技术性的介绍，但这里做一下精简的解释。

假设有一个像上帝一样的对手，可以观察网络上的每一个数据包，记录并实时分析一切。在这样的环境下，有可能进行私人通信吗？直观地说，答案是否定的：对手可以在每一个数据包通过网络时进行监视，并利用概率技术逐步识别用户，而且成功率很高。

Nym混合网络通过在网络节点内混合信息来解决这个问题，这些信息对对手是不透明的。每个数据包都经过层层加密，并进行二进制填充，使其与所有其他数据包无法区分。传入的数据包与节点内的所有其他信息 "混合"，也就是说，节点解开一层加密，并增加了一个小的随机传输延迟，因此，消息不是按照它们到达的顺序发出的。

接下来，消息被送到另一个混合节点，解密并再次混合，然后送到第三个混合节点进行进一步混合，最后，消息被传递到其目的地的网关。

只要有足够的流量流经节点，即使是能够记录整个互联网的对手也无法追踪到通过该系统的数据包流。

Nym混合网络通过_loop_流量来缓解恶意节点的丢包攻击，并确保服务质量。客户端发送的信息会回传给自己，这使客户能够保证信息被正确地传递。它还提供_覆盖流量_，以确保有足够的消息通过系统来提供隐私。

需要抵御网络级监控的隐私增强应用程序（简称Peaps）可以使用Nym混合网络。

最终的结果是，即使对手能够记录所有的互联网流量，也无法监控使用Nym的隐私增强型应用（Peaps），对手可以知道用户的Peap已经连接到混合网络，除此之外，无法判断他们是否在进行加密聊天、文件传输或与另一个Peap互动。
