---
sidebar_label: Nym钱包
description: "Install and use the Nym Wallet."
hide_title: false
title: Nym钱包
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';



Nym桌面钱包可以让你跟你的Nym节点交互，并将代币委托给其他人。在之后的版本中，它还可以让你访问Nym混合网络。

你可以在Mac、Windows或Linux上下载它。

[![download nym wallet](/img/docs/download-wallet.png)](https://github.com/nymtech/nym/releases/tag/v0.12.1)

### 绕过安全警告

在MacOS和Windows上，当你试图运行钱包时，你会看到一个安全警告。我们正在从苹果和微软获得应用商店的密钥，以便这种情况不会发生。有关绕过这些安全警告的细节，请参见下面的章节。同时，我们建议你使用文件哈希值来检查你下载的文件的真实性：

* 在MacOS上
`openssl md5 nym-wallet_0.12.1_macos_x64.dmg` 应当返回 `9a50644c51b01b2fa3d5e2bfd33183b9`

* 在Ubuntu20上
`openssl md5 nym-wallet_0.12.1_amd64_ubuntu_20.04.AppImage` 应当返回`52992fa34bf8ed1118010f9d423dfd4a`
* 在Windows上
`openssl md5 nym-wallet_windows_0.12.1_x64.msi` 应当返回 `6afa60c049bfd091fb48a5e099a91347`


#### Linux 

你需要在终端对AppImage运行`chmod +x'（或在文件浏览器中给它执行权限），然后它才能运行。

#### MacOS 

* 将该应用程序拖到你的 "应用程序 "文件夹中。
* 如果你双击该应用程序，你会看到以下警告：

<ThemedImage
  alt=""
  sources={{
    light: useBaseUrl('/img/docs/wallet-warnings/mac_warning1.png'),
    dark: useBaseUrl('/img/docs/wallet-warnings/mac_warning1.png'),
  }}
/>

点击取消并忽略它。

- 进入你的系统偏好->安全和隐私->一般，解锁该应用程序。

<ThemedImage
  alt=""
  sources={{
    light: useBaseUrl('/img/docs/wallet-warnings/mac_warning2.png'),
    dark: useBaseUrl('/img/docs/wallet-warnings/mac_warning2.png'),
  }}
/>

* 右键单击该应用程序，点击 "打开"，然后点击 "仍然打开"。

<ThemedImage
  alt=""
  sources={{
    light: useBaseUrl('/img/docs/wallet-warnings/mac_warning3.png'),
    dark: useBaseUrl('/img/docs/wallet-warnings/mac_warning3.png'),
  }}
/>

#### Windows 

* 点击msi安装程序后选择"更多信息"：

<ThemedImage
  alt=""
  sources={{
    light: useBaseUrl('/img/docs/wallet-warnings/windows_warning1.png'),
    dark: useBaseUrl('/img/docs/wallet-warnings/windows_warning1.png'),
  }}
/>

* 点击"仍要安装":

<ThemedImage
  alt=""
  sources={{
    light: useBaseUrl('/img/docs/wallet-warnings/windows_warning2.png'),
    dark: useBaseUrl('/img/docs/wallet-warnings/windows_warning2.png'),
  }}
/>

* 跟随安装指示： 

<ThemedImage
  alt=""
  sources={{
    light: useBaseUrl('/img/docs/wallet-warnings/windows_warning3.png'),
    dark: useBaseUrl('/img/docs/wallet-warnings/windows_warning3.png'),
  }}
/>

<ThemedImage
  alt=""
  sources={{
    light: useBaseUrl('/img/docs/wallet-warnings/windows_warning4.png'),
    dark: useBaseUrl('/img/docs/wallet-warnings/windows_warning4.png'),
  }}
/>

<ThemedImage
  alt=""
  sources={{
    light: useBaseUrl('/img/docs/wallet-warnings/windows_warning5.png'),
    dark: useBaseUrl('/img/docs/wallet-warnings/windows_warning5.png'),
  }}
/>


### 开发者

如果你想自己编译钱包，请按照以下说明进行。

:::info信息

请注意，该钱包目前只在有上述二进制文件的操作系统上构建。如果你发现问题或者任何额外的前提条件，请在[Github](https://github.com/nymtech/docs)上针对`develop`创建一个问题或PR。

:::

#### 构建钱包的前提条件


- `git`

```
sudo apt update
sudo apt install git
```

检查是否正确安装`git`：

```
git version
# Should return: git version X.Y.Z
```

- [Yarn](https://yarnpkg.com/)

- `NodeJS >= v16.8.0`

- `Rust & cargo >= v1.56`

我们推荐使用[Rust shell script installer](https://www.rust-lang.org/tools/install)。不建议从你的软件包管理器（如`apt`）中安装包，因为打包过的版本通常太旧了。

如果你真的不想使用shell脚本安装程序，[Rust安装文档](https://forge.rust-lang.org/infra/other-installation-methods.html)中包含了许多平台的安装说明。

#### 在Ubuntu/Debian上安装的额外前提条件

```
sudo apt update
sudo apt install pkg-config build-essential libssl-dev curl jq
```

#### 在Windows上安装的额外前提条件

- 当在Windows上运行时，你需要安装`c++`构建工具。
- 可以在[这里](http://kennykerr.ca/2019/11/18/rust-getting-started/)找到一个简单的指南运行Rust。
- 当安装`NodeJS`时，请使用`current features`版本。
- 建议使用像[Chocolatey](https://chocolatey.org/)这样的软件包管理器。

### 安装

 在`nym-wallet`目录下运行：

```
yarn install
```

### 在开发者模式下运行

:::note注意

确保你在运行之前将提供的".env.sample "的内容复制到一个新的".env "文件中。

:::

你可以通过在`nym-wallet`文件夹中运行以下终端命令来运行钱包，而不必在开发模式下安装它：

```
yarn dev
```

这会启动钱包的图形界面并在`nym-wallet/target/debug/`中产生一个名为`nym-wallet`的二进制文件。

### 在生产模式下运行

:::note注意

确保你在运行之前将提供的".env.sample "的内容复制到一个新的".env "文件中。

:::

要构建和安装钱包，在`nym-wallet`文件夹运行以下终端命令：

```
yarn build
```

这会生成一个可执行文件，你可以用它来在你的机器上安装钱包，它的输出会编译不同类型的二进制文件，这取决于你的硬件/操作系统。一旦二进制文件编译完成，你可以在下面的文件中找到他们：

```
Binary output directory structure
**macos**
|
└─── target/release
|   |─ nym-wallet
└───target/release/bundle/dmg
│   │─ bundle_dmg.sh
│   │─ nym-wallet.*.dmg
└───target/release/bundle/macos/MacOs
│   │─ nym-wallet
|
**Linux**
└─── target/release
|   │─  nym-wallet
└───target/release/bundle/appimage
│   │─  nym-wallet_*_.AppImage
│   │─  build_appimage.sh
└───target/release/bundle/deb
│   │─  nym-wallet_*_.deb
|
**Windows**
└─── target/release
|   │─  nym-wallet.exe
└───target/release/bundle/msi
│   │─  nym-wallet_*_.msi
```

