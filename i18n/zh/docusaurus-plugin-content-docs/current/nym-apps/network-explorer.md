---
sidebar_label: Nym网络浏览器
description: "Install and use the Nym Network Explorer."
hide_title: false
title: Nym网络浏览器
---


Nym网络浏览器可以让你探索Nym的网络。我们已经将浏览器开源，任何人都可以运行它的一个实例，从而进一步将网络的权力下放! 

### 前提

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

- (Debian/Ubuntu)安装 `pkg-config`, `build-essential`, `libssl-dev`, `curl`, `jq`

```
sudo apt update
sudo apt install pkg-config build-essential libssl-dev curl jq
```

- `NodeJS` (使用`nvm install`自动安装正确的版本)和`npm`

- `Rust & cargo >= v1.56`

我们推荐使用[Rust shell script installer](https://www.rust-lang.org/tools/install)。不建议从你的软件包管理器（如`apt`）中安装包，因为打包过的版本通常太旧了。

如果你真的不想使用shell脚本安装程序，[Rust安装文档](https://forge.rust-lang.org/infra/other-installation-methods.html)中包含了许多平台的安装说明。


### 本地安装

首先克隆`nym`仓库：

```
git clone https://github.com/nymtech/nym.git
cd nym
git reset --hard # in case you made any changes on your branch
git pull # in case you've checked it out before
```

在`explorer`目录下用以下命令启动具有热加载功能的服务器，运行在`http://localhost:3000`上：

```
nvm install # install relevant nodejs and npm versions 
npm install
npm run start
```

`eslint`和`prettier`已经配置好了。

你可以通过运行以下命令检查代码：

```
npm run lint
```

:::info信息

上面的命令只会显示潜在的错误，并不会修复他们！

:::

要自动修复错误，请运行：

```
npm run lint:fix
```

请参阅`explorer/docs`中的开发文档，以了解更多关于这个应用程序的结构和设计的信息。

### 部署

为了在远程服务器上部署该浏览器（和浏览器API），首先克隆并建立`nym`仓库：

```
rustup update
git clone https://github.com/nymtech/nym.git
cd nym
git reset --hard # in case you made any changes on your branch
git pull # in case you've checked it out before
cd explorer-api
cargo build --release
```

:::caution警告

网络浏览器应该在至少有4GB内存的机器上运行 -- 如果在性能较差的机器上运行，构建过程可能会失败。

:::

#### 构建浏览器用户界面 

在`explorer`目录下运行以下命令建立用户界面：

```
nvm install # install relevant nodejs and npm versions 
npm install
npm run build
```

输出会保存在`dist`目录下。

然后它可以直接在`nym`目录中提供服务，如果你愿意，也可以从它自己的目录中提供服务。更多关于如何托管的信息，见下面的nginx模板配置。

#### 构建浏览器API

浏览器的API是在上一步用`cargo build`构建的。

### 使用systemd自启动你的浏览器

如果你的服务器重启，你很可能想让浏览器API也自动重启。下面是一个systemd模板文件，可以放在`/etc/systemd/system/nym-explorer-api.service`里面：

```ini
[Unit]
Description=Nym Explorer API (0.12.1)
StartLimitIntervalSec=350
StartLimitBurst=10

[Service]
User=nym
Type=simple
Environment="API_STATE_FILE=/home/nym/network-explorer/explorer-api-state.json"
Environment="GEO_IP_SERVICE_API_KEY=c69155d0-25f6-11ec-80bc-75e5dbd322c3"
ExecStart={{ explorer_api_location }}
Restart=on-failure
RestartSec=30

[Install]
WantedBy=multi-user.target
```

启动这项服务：

```
systemctl daemon-reload # to pickup the new unit file
systemctl enable nymd   # to enable the service
systemctl start nymd    # to actually start the service
journalctl -f           # to monitor system logs showing the service start
```

### 为HTTPS安装和配置nginx

#### 安装

[Nginx](https://www.nginx.com/resources/glossary/nginx/#:~:text=NGINX%20is%20open%20source%20software,%2C%20media%20streaming%2C%20and%20more.&text=In%20addition%20to%20its%20HTTP,%2C%20TCP%2C%20and%20UDP%20servers.) 是一个用于操作高性能网络服务器的开源软件。它允许我们在验证节点服务器上设置反向代理，以提高性能和安全性。

安装`nginx`并在防火墙中允许 "Nginx Full "规则：

```
sudo ufw allow 'Nginx Full'
```

使用systemctl检查nginx是否运行：

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

用一下内容替换`/etc/nginx/sites-available/`中默认的nginx配置：

```
server {
  listen 80;
  listen [::]:80;
  server_name {{ domain }};
  root {{ html_location }};
  location / {
    try_files /$uri /$uri/index.html /index.html =404;
  }

  location /api {
      proxy_pass http://127.0.0.1:8000;
		  rewrite /api/(.*) /$1  break;
                  proxy_set_header  X-Real-IP $remote_addr;
                  proxy_set_header  Host $host;
                  proxy_set_header  X-Real-IP $remote_addr;
  }
}
```

接着运行：

```
sudo apt install certbot nginx python3
certbot --nginx -d nym-validator.yourdomain.com -m you@yourdomain.com --agree-tos --noninteractive --redirect
```

:::caution警告

如果你的VPS的系统是Ubuntu 20：把`certbot nginx python3`替换为`python3-certbot-nginx`

:::

### 设置你的防火墙

使用`ufw`命令设置一个防火墙：

```
# check if you have ufw installed
ufw version
# if it is not installed, install with
sudo apt install ufw -y
# enable ufw
sudo ufw enable
# check the status of the firewall
sudo ufw status
```

并打开端口：

```
sudo ufw allow 22,80,443/tcp
# check the status of the firewall
sudo ufw status
```