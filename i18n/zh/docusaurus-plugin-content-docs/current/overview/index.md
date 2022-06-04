---
sidebar_label: 介绍
description: "Nym is a blockchain-based privacy platform. It provides strong network-level privacy against sophisticated end-to-end attackers, and anonymous access control using blinded, re-randomizable, decentralized credentials."
hide_title: false
---

# Nym平台

互联网对现代社会运作已经变得关键，互联网触及日常生活的方方面面，其方式既平凡又具有深刻的革命性，一切都在加速发展。

但我们拥有的互联网并不是我们希望的那种，在过去的二十年里，监控越来越多但是隐私技术并没有得到相应的发展，而Nym正是对纠正这种不平衡的一次尝试。

Nym平台将几种隐私技术结合在一起，将它们整合到一个合作的网络节点系统中。

在高层次上，我们的技术包括：

1. 一个名为_Coconut_的隐私增强签名方案，Coconut在资源访问控制上带来了转变，从基于身份的范式（基于你是谁）到基于隐私保护的范式（基于使用权）。
2. _Sphinx_，一种传输带有保护、层层加密的信息包的方式，这些信息包在二进制层面上是无法区分的。
3. _Mixnet_ (混合网络)，它对Sphinx数据包进行加密和混合，从而无法确定谁在与谁进行通信。我们的混合网络是基于_Loopix_设计的修改版本。
4. Nyx blockchain，Nyx区块链是一个通用的支持CosmWasm的智能合约平台，也是用于跟踪混合网络的智能合约的所在地。

我们将在接下来的章节中探讨Coconut、Sphinx和Loopix的细节。最重要的一点是，这些技术在栈的两个不同层面上确保了隐私：**网络数据传输层**和**交易层**。

