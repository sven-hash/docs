---
sidebar_label: 构建Nym
description: "How to build the Nym platform. Nym is relatively simple to build and run on Mac OS X, Linux, and Windows."
hide_title: false
title: 构建Nym
---

Nym可以在Mac OS X、Linux和Windows上运行。Windows应该被认为是实验性的 -- 如果你是一个应用程序的开发者，它可以正常工作，但不建议用于运行节点。

### 构建Nym

Nym有两个主要的代码库：

- Nym平台，用Rust编写，它包含了我们所有的代码，验证节点除外。
- Nym验证节点，用Go语言编写。

:::note注意

本页详细介绍了如何构建Nym平台的代码。**如果你想编译和运行一个验证节点，**请点击**[这里](/docs/stable/run-nym-nodes/nodes/validators)**。

:::

### 前提

- (Debian/Ubuntu) `pkg-config`, `build-essential`, `libssl-dev`, `curl`, `jq`

```
sudo apt update
sudo apt install pkg-config build-essential libssl-dev curl jq
```

- `Rust & cargo >= v1.56`

我们推荐使用[Rust shell script installer](https://www.rust-lang.org/tools/install)，不建议从你的软件包管理器（如`apt`）安装单元包，因为打包的版本通常太旧了。

如果你真的不想使用shell脚本安装程序，[Rust安装文档](https://forge.rust-lang.org/infra/other-installation-methods.html)包含了在许多平台安装的说明。

### 下载并构建Nym二进制文件

下面的命令将编译二进制文件到`nym/target/release`目录：

```
rustup update
git clone https://github.com/nymtech/nym.git
cd nym
git reset --hard # in case you made any changes on your branch
git pull # in case you've checked it out before

# Note: the default branch you clone from Github, `develop`, may be
# incompatible with both the mainnet and testnet. As such, make sure 
# to checkout the current release: 
# `git checkout tags/v1.0.0`.

git checkout tags/v1.0.0
# this builds your binaries with mainnet configuration
cargo build --release
# to build your binaries with Sandbox testnet configuration, run this instead: 
NETWORK=sandbox cargo build --release
```

你会得到一些文件，关键的部分有：

1. [混合节点](/docs/stable/run-nym-nodes/nodes/mixnodes)：`nym-mixnode`
2. [网关](/docs/stable/run-nym-nodes/nodes/gateways): `nym-gateway`
3. [websocket客户端](/docs/stable/developers/develop-with-nym/websocket-client): `nym-client`
4. [socks5客户端](/docs/stable/use-external-apps/index): `nym-socks5-client`
5. [网络请求器](/docs/stable/run-nym-nodes/nodes/requester): `nym-network-requester`
6. [网络浏览器api](/docs/stable/nym-apps/network-explorer): `explorer-api`

仓库还包含两个在这个过程中没有构建的Typescript应用程序：[Nym Wallet](docs/stable/nym-apps/wallet)和[Network Explorer UI](docs/stable/nym-apps/network-explorer) ，这两样东西都可以按照它们各自文档上的说明来安装。

:::note注意

你不能从GitHub发布页面上的.zip或.tar.gz归档文件进行安装 -- Nym的构建脚本在编译时会自动将当前git提交的哈希值包含在二进制文件中，所以如果你使用归档代码（这并不是一个Git仓库），构建将会失败。用`git clone`代替从github上查看代码。

:::

### 启用Ethereum功能构建Nym（可选项）

如果有用户想要使用基本带宽凭证（BBCs），那么他们必须以稍微不同的方式构建各种二进制文件。

:::warning警告
目前这是一个可选的功能，用户也可以在没有这些设置下使用混合网络。
:::

要在启用这些功能的情况下构建代码库，请讲前面指南中的`cargo build --release`命令替换为：

```
cargo build --release --features eth
```

这个标识会在编译和构建`nym-client`, `nym-socks5-client`和`gateway`二进制文件时启用了`eth`功能。这些特性算是一种设置：BBC会在客户端和网关在运行时创建连接并通过混合网络发送数据包，我们很快会有一篇博文解释这些功能。