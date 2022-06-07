---
sidebar_label: 验证节点
description: "Nym Validators provide privacy-enhanced credentials based on the testimony of a set of decentralized, blockchain-based issuing authorities."
hide_title: false
title: 验证节点
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Nym验证节点通过质押代币保护网络，使网络 免受女巫攻击。

验证节点还可以根据一系列去中心化的、基于区块链的发行机构的证明，提供隐私增强的凭证。Nym验证节点使用名为[Coconut](https://arxiv.org/abs/1802.07344)的[签名方案](https://en.wikipedia.org/wiki/Digital_signature)来签发凭证。这允许隐私应用程序通过去中心化的机构生成匿名的资源证明，然后与服务提供商一起使用它们。

验证节点是使用[Cosmos SDK](https://cosmos.network)和[Tendermint](https://tendermint.com)构建的，带有一个[CosmWasm](https://cosmwasm.com)智能合约负责目录服务、节点绑定和混合网络的委托质押。

### 构建Nym验证节点

#### 前提

- `git`

```
sudo apt update
sudo apt install git
```

验证`git`是否已安装。

```
git version
# Should return: git version X.Y.Z
```

- `Go `

`Go`可以通过以下命令安装（摘自[Agoric SDK docs](https://github.com/Agoric/agoric-sdk/wiki/Validator-Guide-for-Incentivized-Testnet#install-go)）：

```
# First remove any existing old Go installation
sudo rm -rf /usr/local/go

# Install correct Go version
curl https://dl.google.com/go/go1.17.5.linux-amd64.tar.gz | sudo tar -C/usr/local -zxvf -

# Update environment variables to include go
cat <<'EOF' >>$HOME/.profile
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export GO111MODULE=on
export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
EOF
source $HOME/.profile
```

验证`Go`是否安装了：

```
go version
# Should return: go version go1.15.7 linux/amd64
```

- `gcc`

使用下面的命令安装`gcc` 

```
sudo apt install build-essential
# Optional additional manual pages can be installed with:
sudo apt-get install manpages-dev
```

验证`gcc`是否安装了：

```
gcc --version
```

它会返回类似这样的内容：

```
gcc (Ubuntu 7.4.0-1ubuntu1~18.04) 7.4.0
Copyright (C) 2017 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

#### 构建你的验证节点

我们使用Cosmos验证节点的`wasmd`版本来运行我们的区块链。首先选择下面正确的网络来确定正确的安装流程，因为从这里开始，说明、文件和端点都不同：


<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox（测试网）">
    <pre>
      <code>
        BECH32_PREFIX=nymt
      </code>
    </pre>
        <pre>
      <code>
        WASMD_VERSION=v0.21.0
      </code>
    </pre>
    <pre>
      <code>
      NYM_APP_NAME=nymd
      </code>
    </pre>
    </TabItem>
    <TabItem value="mainnet" label="Nyx（主网）">
      <pre>
      <code>
        BECH32_PREFIX=n
      </code>
    </pre>
      <pre>
      <code>
        WASMD_VERSION=v0.26.0
      </code>
    </pre>
        <pre>
      <code>
      NYM_APP_NAME=nyxd
      </code>
    </pre>
  </TabItem>
</Tabs>

运行下面的命令来克隆、编译和构建它：

```
git clone https://github.com/CosmWasm/wasmd.git
cd wasmd
git checkout ${WASMD_VERSION}
mkdir build
go build -o ./build/${NYM_APP_NAME} -mod=readonly -tags "netgo,ledger" -ldflags "-X github.com/cosmos/cosmos-sdk/version.Name=${NYM_APP_NAME} -X github.com/cosmos/cosmos-sdk/version.AppName=${NYM_APP_NAME} -X github.com/CosmWasm/wasmd/app.NodeDir=.${NYM_APP_NAME} -X github.com/cosmos/cosmos-sdk/version.Version=${WASMD_VERSION} -X github.com/cosmos/cosmos-sdk/version.Commit=dc5ef6fe84f0a5e3b0894692a18cc48fb5b00adf -X github.com/CosmWasm/wasmd/app.Bech32Prefix=${BECH32_PREFIX} -X \"github.com/cosmos/cosmos-sdk/version.BuildTags=netgo,ledger\"" -trimpath ./cmd/wasmd
```

这时，你在`build/`文件夹下能看到`nymd`（Sandbox测试网）或者`nyxd`（主网）二进制文件，运行它来测试它是否被正确编译了：

```
./build/${NYM_APP_NAME}
```

你应该能看到输出了`nymd`帮助文本。

这说明我们已经成功编译了`nymd`或者`nyxd`，和`libwasmvm.so`共享对象库的二进制文件，`libwasmvm.so`是wasm虚拟机，我们需要他来执行Nym智能合约。

:::caution警告

如果你在本地编译了这些文件，你需要把它们都上传到验证节点运行的服务器上。**如果你在服务器上编译了这些文件，请跳到下面设置 `LD_LIBRARY PATH`的步骤**。

:::

要在你的本地系统中找到这些文件，运行：

```
WASMVM_SO=$(ldd build/nymd | grep libwasmvm.so | awk '{ print $3 }')
ls ${WASMVM_SO}
```

它会返回类似这样的结果：

```
'/home/username/go/pkg/mod/github.com/!cosm!wasm/wasmvm@v0.13.0/api/libwasmvm.so'
```

当你上传`nymd`或者`nyxd`二进制文件时，你需要在启动验证验证节点时告诉它`libwasmvm.so`的位置，否则`nymd`将无法运行。如果你已经在你的服务器上编译了它们，那么就没有必要了，因为编译后的`nymd`已经可以访问`libwasmvm.so`文件了。

把`nymd`/`nyxd`和`libwasmvm.so`都上传到你的验证节点的机器。如果你试图在你的服务器上运行`./nymd`，如果`nymd`找不到`libwasmvm.so`，你可能会看到这样错误：

```
./nymd: error while loading shared libraries: libwasmvm.so: cannot open shared object file: No such file or directory
```

你需要在你的用户的`~/.bashrc`文件中设置`LD_LIBRARY_PATH`，并将其加入我们的路径，将下面的命令中的`/home/youruser/path/to/nym/binaries`替换为`nymd`和`libwasmvm.so`的位置，然后运行它。如果你已经在服务器上编译了这些东西，它们会保存在`build/`文件夹中。

```
NYX_BINARIES=/home/youruser/path/to/nym/binaries
# if you are using another shell like zsh replace '.bashrc' with the relevant config file
echo 'export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:'NYX_BINARIES >> ~/.bashrc 
echo 'export PATH=$PATH:'${NYX_BINARIES} >> ~/.bashrc
source ~/.bashrc
```

检查是否一切运行正常：

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox（测试网）">
    <pre>
      <code>
        nymd  
      </code>
    </pre>
    </TabItem>
    <TabItem value="mainnet" label="Nyx（主网）">
      <pre>
      <code>
        nyxd      
      </code>
    </pre>
  </TabItem>
</Tabs>

这应该会返回帮助文本。

### 初始化你的验证节点

前提：

- FQDN域名
- IPv4和IPv6连接

为你的验证节点起一个名字，并在下面的命令中用它来代替`yourname`：

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox（测试网）">
    <pre>
      nymd init YOUR_NAME --chain-id=nym-sandbox 
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx（主网）">
    <pre>
      nyxd init YOUR_NAME --chain-id=nyx 
    </pre>
  </TabItem>
</Tabs>

:::caution警告

`nymd init`会生成`priv_validator_key.json` 和`node_key.json`两个文件.

如果你已经在以前的测试网中搭建了一个验证节点，**一定要备份位于**`~/.nymd/config/priv_validator_key.json`的密钥。

如果你不保存验证节点的密钥，那么节点无法对区块签名，而且会一直无法使用，并且
没有办法用`nymd`准确地（重新）生成这个密钥。 

:::

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox（测试网）">
    这时，你有一个新的验证节点，它有自己的genesis文件，位于<code>$HOME/.nymd/config/genesis.json</code>。你需要用Nym-Sandbox的 <a href="https://nymtech.net/testnets/sandbox/genesis.json">genesis file</a>来**替换该文件的内容**。你可以使用下面的命令下载该文件：
    <pre>
      <code>
      wget  -O $HOME/.nymd/config/genesis.json https://nymtech.net/testnets/sandbox/genesis.json
      </code>
      </pre>
    </TabItem>
    <TabItem value="mainnet" label="Nyx（主网）">
      这时，你有一个新的验证节点，它有自己的genesis文件，位于<code>$HOME/.nyxd/config/genesis.json</code>。你需要用Nym-Sandbox的 <a href="https://nymtech.net/genesis/genesis.json">genesis file</a>来**替换该文件的内容**。你可以使用下面的命令下载该文件：
      <pre>
      <code>
      wget  -O $HOME/.nyxd/config/genesis.json https://nymtech.net/genesis/genesis.json
      </code>
    </pre>
  </TabItem>
</Tabs>

#### `config.toml`配置

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox（测试网）">
    ​按照下面的内容编辑<code>$HOME/.nymd/config/config.toml</code>，将下面的Nym验证节点设置成一个持续可用的节 点，这样你的验证节点就可以从网络的其他地方同步区块：
    <pre>
      cors_allowed_origins = ["*"] 
    </pre>
    <pre>
      persistent_peers = "d24ee58d85a65d34ad5adfc3302c3614b36e8b14@sandbox-validator.nymtech.net:26656" 
    </pre>
    <pre>
      create_empty_blocks = false 
    </pre>
    <pre>
      laddr = "tcp://0.0.0.0:26656" 
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx（主网）">
    按照下面的内容​编辑<code>$HOME/.nyxd/config/config.toml</code>：
    <pre>
      persistent_peers = "dc0af6cde717420e9f8d35a3e0883aee0e5dbff3@15.235.14.66:26656" 
    </pre>
    <pre>
      create_empty_blocks = false 
    </pre>
    <pre>
      laddr = "tcp://0.0.0.0:26656" 
    </pre>
  </TabItem>
</Tabs>

具体的配置如下：

- `cors_allowed_origins = ["*"]`允许网络钱包向你的验证节点发出HTTPS请求
- `persistent_peers = "<PEER_ADDRESS>@<DOMAIN>.nymtech.net:26656"` 允许你的验证节点开始从其他节点拉取区块
- `create_empty_blocks = false`可以为你节省一点空间
- `laddr = "tcp://0.0.0.0:26656"`是`p2p配置选项`


另外，如果你想启用[Prometheus](https://prometheus.io/)指标，那么在`config.toml`中还必须匹配以下内容：

- `prometheus = true`
- `prometheus_listen_addr = ":26660"`

:::tip提示

记得在下面 "配置Prometheus 指标 "章节中也要启用指标。

:::

如果你想给你的节点添加一个人类可读的名字：

- `moniker = "yourname"`。

最后，如果你打算在你的服务器上使用[Cockpit](https://cockpit-project.org/documentation.html)，请把`grpc`端口从`9090`改为`9090`，因为这是Cockpit所使用的端口。

#### `app.toml` 配置

在文件`$HOME/.nymd/config/app.toml`中，设置以下值:

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox（测试网）">
    <pre>
      minimum-gas-prices = "0.025unymt" 
    </pre>
    <pre>
      设置`[api]`下面的enable = true来运行API服务器
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx（主网）">
    <pre>
      设置`[api]`下面的enable = true来运行API服务器
    </pre>
  </TabItem>
</Tabs>

### 设置你的验证节点的管理员账户

你需要一个管理员账户来负责你的验证节点，用以下方法设置：

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox（测试网）">
    <pre>
      <code>
      nymd keys add nymd-admin
      </code>
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx（主网）">
    <pre>
      <code>
      nyxd keys add nyxd-admin
      </code>
    </pre>
  </TabItem>
</Tabs>

这会把你的管理员账户的钥匙添加到系统的钥匙串中，并记录你的名字、地址、公钥和助记词。正如说明中所说，别忘了要**记下你的助记词**。

你可以通过以下方式获得管理账户的地址：

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox（测试网）">
    <pre>
      <code>
      nymd keys show nymd-admin -a
      </code>
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx（主网）">
    <pre>
      <code>
      nyxd keys show nyxd-admin -a
      </code>
    </pre>
  </TabItem>
</Tabs>

当被系统询问时，输入你的密钥串**密码**，而不是助记词

### 启动你的验证节点

现在一切都应该准备好了，你已经搭建了验证节点，在`config.toml`和`app.toml`中做了所有的修改，Nym genesis文件被复制到合适的位置（替换了最初自动生成的文件）。现在让我们来验证整个设置：

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox（测试网）">
    <pre>
      <code>
      nymd validate-genesis
      </code>
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx（主网）">
    <pre>
      <code>
      nyxd validate-genesis
      </code>
    </pre>
  </TabItem>
</Tabs>

如果该检查通过，你应该看到以下输出：

```
File at /path/to/.nymd/config/genesis.json is a valid genesis file
```

> 如果这个测试没有通过，请检查你是否将`/path/to/.nymd/config/genesis.json`的内容替换为正确的genesis文件。

在运行节点之前，我们需要打开防火墙的端口：

```
# if ufw is not already installed:
sudo apt install ufw
sudo ufw enable
sudo ufw allow 1317,26656,26660,22,80,443,8000,1790/tcp
# to check everything worked
sudo ufw status
```

端口`22`、`80`和`443`分别用于ssh、http和https的连接，`8000`和`1790`是用于VerLoc和我们的节点定位系统，其余的端口都记录[这里](https://docs.cosmos.network/v0.42/core/grpc_rest.html)。

关于验证节点的端口配置的更多信息，请查看下面的[验证节点端口参考表](#validator-port-reference)。

> 如果你打算在你的验证节点的服务器上使用[Cockpit](https://cockpit-project.org/)，那么你需要在上面的`config.toml`文件中定义一个不同的`grpc`端口：同时记得也要打开这个端口。

启动验证节点：

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox（测试网）">
    <pre>
      <code>
      nymd start
      </code>
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx（主网）">
    <pre>
      <code>
      nyxd start
      </code>
    </pre>
  </TabItem>
</Tabs>

一旦你的验证节点启动，它将开始向其他节点请求区块，这可能需要几个小时。一旦它同步完成，你就可以发出加入验证节点集群的请求：

> 如果你在升级验证节点的二进制文件时遇到问题，请尝试替换（或重新编译）`libwasmvm.so`文件，并在验证节点的服务器上替换它。

:::warning警告

当加入共识时，不要质押大量不成比例的代币，这可能会扰乱（甚至中止）网络。

请在验证节点开始时质押少量的代币（具体数额可以参考当前的验证节点），然后慢慢地把剩余的代币分批委托给自己。

:::

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox（测试网）">
    <pre>
      nymd tx staking create-validator
        --amount=10000000unyxt
        --fees=5000unyxt
        --pubkey=$(/home/youruser/path/to/nym/binaries/nymd tendermint show-validator)
        --moniker="whatever you called your validator"
        --chain-id=nym-sandbox
        --commission-rate="0.10"
        --commission-max-rate="0.20"
        --commission-max-change-rate="0.01"
        --min-self-delegation="1"
        --gas="auto"
        --gas-adjustment=1.15
        --from="KEYCHAIN NAME"
        --node https://sandbox-validator.nymtech.net:443 
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx（主网）">
    <pre>
      nyxd tx staking create-validator
        --amount=10000000unyx
        --fees=0unyx 
        --pubkey=$(/home/youruser/path/to/nym/binaries/nymd tendermint show-validator)
        --moniker="whatever you called your validator"
        --chain-id=nym
        --commission-rate="0.10"
        --commission-max-rate="0.20"
        --commission-max-change-rate="0.01"
        --min-self-delegation="1"
        --gas="auto"
        --gas-adjustment=1.15
        --from="KEYCHAIN NAME"
        --node https://rpc.nyx.nodes.guru:443     
      </pre>
  </TabItem>
</Tabs>

你需要质押`unyxt`（Sandbox测试网）或者`unyx`（主网）代币来完成这个操作。

注意：我们目前正在努力建立一组封闭的信誉良好的验证节点。你可以向我们索要代币，但如果我们拒绝，请不要生气 -- 验证节点是我们系统核心安全的一部分，我们一开始会选择我们已经认识的或有良好声誉的人来运行节点。

如果你想为你的节点添加一些说明，你可以使用如下的命令：

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox（测试网）">
    <pre>
      nymd tx staking edit-validator   
        --chain-id=nym-sandbox   
        --moniker="whatever you called your validator"
        --details="Nym validator"   
        --security-contact="your email"   
        --identity="your identity"   
        --gas="auto"   
        --gas-adjustment=1.15   
        --from="KEYCHAIN NAME"
        --fees 2000unyxt
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx（主网）">
    <pre>
      nymd tx staking edit-validator   
        --chain-id=nym   
        --moniker="whatever you called your validator"
        --details="Nym validator"   
        --security-contact="your email"   
        --identity="your identity"   
        --gas="auto"   
        --gas-adjustment=1.15   
        --from="KEYCHAIN NAME"
        --fees 2000unyx
    </pre>
  </TabItem>
</Tabs>
使用上述命令，你可以指定`gpg`钥匙的最后编号（会在`keybase`中使用）以及验证节点的细节和你的电子邮件，以便联系~。

### 使用systemd自启动你的验证节点

你可能希望在服务器重启时自动重新启动验证节点。下面是一个systemd的模板文件，可以放在`/etc/systemd/system/nymd.service`下面：

```ini
[Unit]
Description=Nymd (1.0.0-rc.1)
StartLimitInterval=350
StartLimitBurst=10

[Service]
User=nym                                                          # change to your user
Type=simple
Environment="LD_LIBRARY_PATH=/home/youruser/path/to/nym/binaries" # change to correct path
ExecStart=/home/youruser/path/to/nym/binaries/nymd start          # change to correct path
Restart=on-failure
RestartSec=30
LimitNOFILE=infinity

[Install]
WantedBy=multi-user.target
```

继续运行：

```
systemctl daemon-reload # to pickup the new unit file
systemctl enable nymd   # to enable the service
systemctl start nymd    # to actually start the service
journalctl -f           # to monitor system logs showing the service start
```

### 为HTTPS安装和配置nginx

#### 安装

[Nginx](https://www.nginx.com/resources/glossary/nginx/#:~:text=NGINX%20is%20open%20source%20software,%2C%20media%20streaming%2C%20and%20more.&text=In%20addition%20to%20its%20HTTP,%2C%20TCP%2C%20and%20UDP%20servers.) 是一个用于操作高性能网络服务器的开源软件，它允许我们在验证节点的服务器上设置反向代理，以提高性能和安全性。

安装 "nginx "并在防火墙中允许 "Nginx Full "规则。

```
sudo ufw allow 'Nginx Full'
```

通过systemctl检查nginx是否运行：

```
systemctl status nginx
```

它会返回：

```
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2018-04-20 16:08:19 UTC; 3 days ago
     Docs: man:nginx(8)
 Main PID: 2369 (nginx)
    Tasks: 2 (limit: 1153)
   CGroup: /system.slice/nginx.service
           ├─2369 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─2380 nginx: worker process
```

#### 配置

在`/etc/nginx/conf.d/validator.conf`中创建一个文件，将验证节点`26657`端口代理到nginx的`80`端口：

```
server {
  listen 80;
  listen [::]:80;
  server_name "{{ domain }}";

  location / {
    proxy_pass http://127.0.0.1:26657;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```

之后：

```
sudo apt install certbot nginx python3
certbot --nginx -d nym-validator.yourdomain.com -m you@yourdomain.com --agree-tos --noninteractive --redirect
```

:::caution警告
如果你VPS的系统是Ubuntu 20：将`certbot nginx python3`替换为`python3-certbot-nginx`

:::

这些命令会在你在API前面设置一个https加密的nginx代理。

### 设置Prometheus指标 (可选)

用以下命令配置Prometheus（修改自NodesGuru的[Agoric设置指南](https://nodes.guru/agoric/setup-guide/en)）：

```
echo 'export OTEL_EXPORTER_PROMETHEUS_PORT=9464' >> $HOME/.bashrc
source ~/.bashrc
sed -i '/\[telemetry\]/{:a;n;/enabled/s/false/true/;Ta}' $HOME/.nymd/config/app.toml
sed -i "s/prometheus-retention-time = 0/prometheus-retention-time = 60/g" $HOME/.nymd/config/app.toml
sudo ufw allow 9464
echo 'Metrics URL: http://'$(curl -s ifconfig.me)':26660/metrics'
```

你的验证节点的指标将通过 "Metrics URL "返回给你，看起来像这样：

```
# HELP go_gc_duration_seconds A summary of the pause duration of garbage collection cycles.
# TYPE go_gc_duration_seconds summary
go_gc_duration_seconds{quantile="0"} 6.7969e-05
go_gc_duration_seconds{quantile="0.25"} 7.864e-05
go_gc_duration_seconds{quantile="0.5"} 8.4591e-05
go_gc_duration_seconds{quantile="0.75"} 0.000115919
go_gc_duration_seconds{quantile="1"} 0.001137591
go_gc_duration_seconds_sum 0.356555301
go_gc_duration_seconds_count 2448
# HELP go_goroutines Number of goroutines that currently exist.
# TYPE go_goroutines gauge
go_goroutines 668
# HELP go_info Information about the Go environment.
# TYPE go_info gauge
go_info{version="go1.15.7"} 1
# HELP go_memstats_alloc_bytes Number of bytes allocated and still in use.
# TYPE go_memstats_alloc_bytes gauge
go_memstats_alloc_bytes 1.62622216e+08
# HELP go_memstats_alloc_bytes_total Total number of bytes allocated, even if freed.
# TYPE go_memstats_alloc_bytes_total counter
go_memstats_alloc_bytes_total 2.09341707264e+11
# HELP go_memstats_buck_hash_sys_bytes Number of bytes used by the profiling bucket hash table.
# TYPE go_memstats_buck_hash_sys_bytes gauge
go_memstats_buck_hash_sys_bytes 5.612319e+06
# HELP go_memstats_frees_total Total number of frees.
# TYPE go_memstats_frees_total counter
go_memstats_frees_total 2.828263344e+09
# HELP go_memstats_gc_cpu_fraction The fraction of this program's available CPU time used by the GC since the program started.
# TYPE go_memstats_gc_cpu_fraction gauge
go_memstats_gc_cpu_fraction 0.03357798610671518
# HELP go_memstats_gc_sys_bytes Number of bytes used for garbage collection system metadata.
# TYPE go_memstats_gc_sys_bytes gauge
go_memstats_gc_sys_bytes 1.3884192e+07
```

### 设置资源限制ulimit

Linux机器限制了一个用户可以有多少个打开的文件。这被称为 "ulimit"。

`ulimit`在大多数系统上默认为1024。它需要设置得更高，因为混合节点会与其他节点建立和接收大量的连接。

如果你看到以下错误：

```
Failed to accept incoming connection - Os { code: 24, kind: Other, message: "Too many open files" }
```

这意味着操作系统正在阻止网络连接的进行。

##### 通过`systemd`服务文件设置ulimit

用下面的命令查询你的混合节点的ulimit：

```
grep -i "open files" /proc/$(ps -A -o pid,cmd|grep nymd | grep -v grep |head -n 1 | awk '{print $1}')/limits
```

你会得到硬和软的限制，看起来像这样：

```
Max open files            65536                65536                files
```

如果你的输出结果与**上述相同**，那么你的节点将不会遇到任何与`ulimit`相关的问题。

然而，如果其中一个值是`1024`，你必须通过systemd服务文件提高限制，在之前的服务文件中添加这一行：

```
LimitNOFILE=65536
```

重新加载守护进程：

```
systemctl daemon-reload
```

或者以root身份执行这个命令，在全系统范围内设置`ulimit`：

```
echo "DefaultLimitNOFILE=65535" >> /etc/systemd/system.conf
```

重新启动你的机器并重启你的节点。重新运行后，使用`cat /proc/$(pidof nym-mixnode)/limits | grep "Max open files"`来确认限制已经变成了65535。

##### 在基于`non-systemd`的发行版上设置ulimit。

编辑 `etc/security/conf`并添加以下内容：

```
# Example hard limit for max opened files
username        hard nofile 4096
# Example soft limit for max opened files
username        soft nofile 4096
```

之后重启你的机器并重启你的混合节点。

### 解锁你的验证节点

如果你的验证器被禁，你可以用下面的命令来修复它：

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox（测试网）">
    <pre>
      nymd tx slashing unjail 
        --broadcast-mode=block 
        --from="KEYCHAIN NAME"
        --chain-id=nym-sandbox 
        --gas=auto 
        --gas-adjustment=1.4 
        --fees=7000unyxt
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx（主网）">
    <pre>
      nyxd tx slashing unjail 
        --broadcast-mode=block 
        --from="KEYCHAIN NAME"
        --chain-id=nym 
        --gas=auto 
        --gas-adjustment=1.4 
        --fees=7000unyx
    </pre>
  </TabItem>
</Tabs>

#### 验证节点被封禁的常见原因

最常见的原因是，你的验证节点因为过多的系统日志而内存不足。

运行命令`df -H`将返回你的VPS的各个分区的大小。

如果`/dev/sda`分区几乎满了，试着删除一些`.gz`系统日志档案，然后重新启动你的验证节点进程。

### 验证节点运行的第二天

查询当前账户余额：

```
nymd query bank balances ${ADDRESS}
```

比如，在Sandbox测试网会返回：

```
balances:
- amount: "919376"
denom: unymt
pagination:
next_key: null
total: "0"
```

当然，你可以用下面命令把可用的余额质押回你的验证节点：

> 记得留一点代币支付手续费

<Tabs groupId="nym-network">
  <TabItem value="sandbox" label="Sandbox（测试网）">
    <pre>
      nymd tx staking delegate VALOPERADDRESS AMOUNTunymt 
        --from="KEYCHAIN NAME"
        --keyring-backend=os 
        --chain-id=nym-sandbox
        --gas="auto" 
        --gas-adjustment=1.15 
        --fees 5000unyxt
    </pre>
  </TabItem>
    <TabItem value="mainnet" label="Nyx（主网）">
    <pre>
      nyxd tx staking delegate VALOPERADDRESS AMOUNTunym 
        --from="KEYCHAIN NAME"
        --keyring-backend=os 
        --chain-id=nym 
        --gas="auto" 
        --gas-adjustment=1.15 
        --fees 5000unyx
    </pre>
  </TabItem>
</Tabs>

### 验证节点端口参考表

所有针对验证节点的端口配置可以在`$HOME/.nymd/config/config.toml`中找到。如果你编辑了任何端口配置，记得要重新启动你的验证节点。

| 默认端口 | 用途                     |
| -------- | ------------------------ |
| 1317     | REST API服务器端点       |
| 26656    | 监听传入的其他节点的连接 |
| 26660    | 监听Prometheus的连接     |
