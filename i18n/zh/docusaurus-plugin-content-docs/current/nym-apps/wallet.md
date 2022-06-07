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

在Windows上，当你试图运行钱包时，你会收到一个安全警告，我们正在从微软获得应用程序商店的密钥，之样就不会发生这种情况。有关绕过这些警告的详细步骤，请参见下面的章节。


#### Linux 

你需要在终端对AppImage运行`chmod +x'（或在文件浏览器中给它执行权限），然后它才能运行。

#### Windows 

_在Windows上打开钱包时，你仍然会遇到警告。这是因为 -- 尽管我们钱包得到了微软的批准 -- 但目前它的下载量还不到1万次。一旦钱包的下载量超过这个阈值，这个警告将消失。_

跟着下面的步骤来绕过这些警告：

* 点击msi安装程序后选择"更多信息"：

<ThemedImage
  alt=""
  sources={{
    light: useBaseUrl('/img/docs/wallet-warnings/windows_warningv1-0-2.png'),
    dark: useBaseUrl('/img/docs/wallet-warnings/windows_warningv1-0-2.png'),
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

请注意，该钱包目前只在有上述二进制文件的操作系统上构建。如果你发现问题或者任何额外的前提条件，请在[Github](https://github.com/nymtech/docs)上针对`develop`分支创建一个问题或PR。

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

### 在开发模式下删除签名错误

如果你想自己建立钱包，你需要对位于`nym-wallet/src-tauri/tauri.conf.json`的文件做一些修改。这些修改与钱包被Mac和Windows应用商店接受有关，但在你自己构建和运行钱包时并不相关。

在**所有**操作系统上：

* 将第49行的值设置为`false`
* 删除第50至54行  

MacOS和Windows用户还需要修改：

* MacOS用户还必须删除第39行 
* Windows用户必须删除第42至46行 

### 安装

 当你修改过`tauri.conf.json`文件后，在`nym-wallet`目录下运行：

```
yarn install
```

### 在开发者模式下运行

:::note注意

确保你在运行之前将提供的`.env.sample`的内容复制到一个新的`.env`文件中。

:::

你可以通过在`nym-wallet`文件夹中运行以下终端命令来运行钱包，而不必在开发模式下安装它：

```
yarn dev
```

这会启动钱包的图形界面并在`nym-wallet/target/debug/`中产生一个名为`nym-wallet`的二进制文件。

### 在生产模式下运行

:::note注意

确保你在运行之前将提供的`.env.sample`的内容复制到一个新的`.env`文件中。

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

