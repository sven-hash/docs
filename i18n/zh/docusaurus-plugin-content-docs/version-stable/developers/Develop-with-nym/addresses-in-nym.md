---
sidebar_label: 地址系统
description: "How addresses operate in Nym"
hide_title: false
title: 地址系统

---

当Nym客户端初始化时，它会在本地生成并存储自己的公钥/私钥对。当客户端启动后，它会自动连接到Nym网络并找到Nym的基础设施，然后选择并通过websocket连接到一个特定的网关节点。

因此，Nym网络中的所有应用程序都有一个地址，格式为。

```
user-identity-key.user-encryption-key@gateway-identity-key
```

实际上，它长这个样子：

```
DguTcdkWWtDyUFLvQxRdcA8qZhardhE1ZXy1YCC7Zfmq.Dxreouj5RhQqMb3ZaAxgXFdGkmfbDKwk457FdeHGKmQQ@4kjgWmFU1tcGAZYRZR57yFuVAexjLbJ5M7jvo3X5Hkcf
```

目前，这显然对用户不是很友好，我们会在未来几个月内进行开发、优化。