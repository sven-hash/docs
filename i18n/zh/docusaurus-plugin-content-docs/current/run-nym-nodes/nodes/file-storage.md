---
sidebar_label: 加密云存储
description: "Install and use the File Storage Service Provider."
hide_title: false
title: 加密云存储
---

我们Hackatom VI挑战赛参赛者开发了几个私人云存储服务的项目：通过混合网络访问私人Dropbox账户，并支持文件加密共享

我们挑战赛的题目是_The Eternity Service 2.0_，参考了Ross J. Anderson的论文[_The Eternity Service_](https://www.cl.cam.ac.uk/~rja14/eternity/eternity.html)，最终目标是创建一个私有云存储服务提供商和一个GUI，让用户通过Nym混合网络与服务提供商互动。

下面是两个冠军作品和亚军作品的链接。每个人都采取了不同的方案来应对挑战，并且都有稍微不同的功能。

如果你想运行这些服务提供商的一个公共实例，供社区其他成员使用（在测试网或主网），请[联系](mailto:max@nymtech.net)我们! 

## 冠军：NymDrive    

该服务提供商运行在托管和自我托管模式下（你可以根据README设置你自己的IPFS桶密钥并运行所提供的Nym服务提供商），图形化的客户端在MacOS和Ubuntu上运行良好。

https://github.com/saleel/nymdrive    
https://www.youtube.com/watch?v=5Rx73nw8NYI

## 亚军：The Eternity Service 2.0    

该项目的设置和运行非常简单，有简短的README说明，让你以最小的代价运行系统，包括客户端和服务提供商。

https://github.com/marius-avram/nym-file-uploader-client
https://github.com/marius-avram/nym-file-service-provider    
https://www.youtube.com/watch?v=Rk5CGUzcscU

## 亚军：Nymdrive    

加大了挑战的难度：文件的哈希值不再用作标识符（这在生产环境中可能会被改变），而是用一个可靠的文件系统守护程序来帮助识别文件。

https://github.com/gyrusdentatus/nymdrive 
https://youtu.be/J_8fktuMlTw