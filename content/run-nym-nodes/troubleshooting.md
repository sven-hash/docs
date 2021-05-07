---
title: "Mixnode Troubleshooting FAQ"
weight: 42
description: "This page will help you find answers to common issues with setting up and maintaining mixnodes"
---






{{< table_of_contents >}}



<a name="ismixing" />

## How can I tell my node is up and running and mixing traffic?

First of all check the testnet [dashboard](https://testnet-finney-explorer.nymtech.net/).
Go to Mixnodes and search for your node. 

Additional details can be obtained after you connect to your server.

Here are some examples on how to check if the node is configured properly.

### To check from the machine your node is running on:

- ``` sudo ss -s -t | grep 1789 ``` This should work on every unix based system
- ``` sudo lsof -i TCP:1789 ``` if you get command not found, do ``` sudo apt install lsof ```
- ```sudo journalctl -u nym-mixnode -o cat | grep "Since startup mixed" ``` If you created nym-mixnode.service file then this command shows you how many packets have you mixed so far. you can add ` | tail` after the command to watch it in real time if needed. 

### To double check from your local machine

-  ``` telnet <IP ADDRESS> 1789<OR OTHER PORT> ```
-  ``` nmap -p 1789 <IP ADDRESS> -Pn ```

This won't tell you much but as long as your telnet connetion does not hang on "**Trying ...**" it should mean your mixnode is accessible from the outside.

This is how an output from above **nmap** command should look like if your mixnode is configured properly :

```
bob@desktop:~$ nmap -p 1789 95.296.134.220 -Pn

Host is up (0.053s latency).

PORT     STATE SERVICE
1789/tcp open  hello

```



You can query all mixnodes as well, and further parse it with a little help of **jq**

- ``` curl https://testnet-finney-explorer.nymtech.net/data/mixnodes.json | jq ```

you can parse it further then

for instance - get a list of nodes with location in London 

- ``` curl https://testnet-finney-explorer.nymtech.net/data/mixnodes.json | jq -r '.[].mix_node | select(.location == "London")' ```

or to see all nodes starting with ipv4 address 65.21.x.x and list only their complete ipv4 addresses

- ``` curl https://testnet-finney-explorer.nymtech.net/data/mixnodes.json | jq -r '.[].mix_node | select(.host | startswith("65.21")) | .host' ```

***



## Why is my node not mixing any packets & Setting up the firewall

If you are unable to see your node on the [dashboard](https://testnet-finney-explorer.nymtech.net/) or with other above mentioned ways to check up on your node then it is usually quite simple and straightforward to solve this issue.
The most probable reason being :
* Firewall on your host machine is not configured.
* You used incorrect details during the bonding process of your node from the [web wallet](web-wallet-finney.nymtech.net) 
* Not using *--anounce-host* flag while running mixnode from your local machine behind NAT.
* You did not configure your router firewall while running the mixnode from your local machine behind NAT or you are lacking IPv6 support. Your mixnode **must speak both IPv4 and IPv6**. You will need to cooperate with other nodes in order to route traffic.
* Mixnode is not running at all, it either exited or you closed the session without making the node persistent.

**Check your firewall settings on your host machine. Easiest way on your VPS is to use ```ufw``` 
 On some systems, like Debian 10 server, ```ufw``` is not installed by default**
- as a root user on Debian 10 install ufw - ```apt install ufw -y ``` 
- On Ubuntu, first check if your ufw is enabled - ```ufw status ```
-  ``` ufw allow 1789/tcp && ufw allow 22/tcp && ufw enable ```  - > This will allow port 1789 for the mixnode, 22 for ssh and then enables the firewall. Your node should work right after that.
**Note**: You need to add ```sudo ``` before each ```ufw ``` command if you're not a root user. ```sudo ufw allow 1789/tcp ```. The ```&&``` symbols are used to chain together commands in Linux. 

On certain cloud providers such as AWS and Google Cloud, you need to do some additional configuration of your firewall and use ```--host``` with your **local ip** and ```--announce-host``` with the **public ip** of your mixnode host. 

To get all **ip addresses** of your host, try following:

```hostname -i``` shows you your **local ip** address,
```hostname -I``` which will show you all **ip addresses** of your host. Here is an example output. 

```sh
bob@nym:~$ hostname -I
88.36.11.23 172.18.0.1 2a01:28:ca:102::1:641
```
* The first **ipv4** is your public ip you need to use for ```--anounce-host```
* The second **ipv4** is your local ip that you have to use for ```--host``` 
* And the 3rd one should confirm if your machine has **ipv6** available. 

### Ok, I have the network stuff straight, but the log still claims "Since startup mixed 0 packets!"

This behavior is most likely caused by a mismatch between your node configuration and the bonding information. Go to <https://web-wallet-finney.nymtech.net/>, unbond your node, and bond it again. The re-bonding procedure does not cost any additional HAL, so you can do it as often as you like.

Make sure to enter all the information in the web wallet exactly as it appears in the log when you start the mixnode process. In particular, the "host" field must contain the port information:

- correct host: 34.12.3.43:1789
- wrong host: 34.12.3.43

## How can I make sure my node works from my local machine if I'm behind NAT and have no fixed IP address ?

First of all, your ISP has to be IPv6 ready. Sadly, in 2020, most of them are not and you won't get an IPv6 address by default from your ISP. Usually it is a extra paid service or they simply don't offer it. 

Before you begin, check if you have IPv6 [here](https://test-ipv6.cz/). If not, then don't waste your time to run a node which won't ever be able to mix any packet due to this limitation. Call your ISP and ask for IPv6, there is a plenty of it for everyone!

If all goes well and you have IPv6 available, then you will need to ```init``` the mixnode with an extra flag, ```--announce-host```. You will also need to edit your **config** file each time your IPv4 address changes, that could be a few days or a few weeks. 

Additional configuration on your router might also be needed to allow traffic in and out to port 1789 and IPv6 support.

Here is a sample of the `init` command to create the mixnode config.

``` 
./target/release/nym-mixnode init --id nym-nat --host 0.0.0.0 --announce-host 85.160.12.13 --layer 3 --location Mars 
```

- `--host 0.0.0.0` should work everytime even if your local machine IPv4 address changes. For example on Monday your router gives your machine an address `192.168.0.13` and on Wednesday, the DHCP lease will end and you will be asigned `192.168.0.14`. Using `0.0.0.0` should avoid this without having to set any static ip in your router`s configuration.
- you can get your current IPv4 address by either using `curl ipinfo.io` if you're on MacOS or Linux or visiting [whatsmyip site](https://www.whatsmyip.org/). Simply copy it and use it as `--anounce-host` address.

Make sure you check if your node is really mixing. You will need a bit of luck to set this up from your home behind NAT. 



## Can I use a different port other than 1789 ?

Yes! Here is what you will need.
Let's say you would like to use port **1337** for your mixnode. 

### Configuring the firewall 

`sudo ufw allow 1337` (run without sudo if you are root). More details about this can be found in the **Why is my node not mixing any packets & Setting up the firewall** section of this wiki.

### Edit existing config 

If you already have a config you created before and want to change the port, you need to stop your node if it's running and then edit your config file. 
Assuming your node name is `nym`, the config file is located at `~/.nym/mixnodes/nym/config/config.toml`. 
```
nano ~/.nym/mixnodes/nym/config/config.toml 
```
You will need to edit two parts of the file. `announce_address` and `listening_address` in the config.toml file. Simply find these two parts, delete your former port `:1789` and append `:1337` after your IP address.

To save the edit, press `CTRL+O` and then exit `CTRL+X`. Then run the node again. You should see if the mixnode is using the port you have changed in the config.toml file right after you run the node. 


## Where can I find my private and public keys and mixnode config?

All config and keys files are stored in a directory named after your `id` which you chose during the *init* configuration with a following PATH: `$HOME/.nym/mixnodes/` where `$HOME` is a home directory of the user (your current user in this case) that launched the mixnode.

Depending on how you installed Nym, the files will be stored here:

1. Autoinstaller - `/home/nym/.nym/mixnodes/<YOURNODEID>`
2. Built from source as your user or root - `~/.nym/mixnodes/<YOURNODEID>`

The directory structure looks as following:

```
bob@nym:~$ tree /home/nym/.nym/mixnodes/
/home/nym/.nym/mixnodes/
|-- nym010
|   |-- config
|   |   `-- config.toml
|   `-- data
|       |-- private_identity.pem
|       |-- private_sphinx.pem
|       |-- public_identity.pem
|       `-- public_sphinx.pem


```

**Note:** If you `cat` the public_sphinx.pem key, the output will be different from the public key you will see on Nym [dashboard](https://testnet-finney-explorer.nymtech.net/). Reason being `.pem` files are encoded in **base64**, however; on web they are in different encoding - **base58**. Don't be confused if your keys look different. They are the same keys, just with different encoding :). 


## I keep seeing ERROR or WARN messages in my node logs. Why is that ?

I have seen quite a few errors from community members in our [Telegram help chat](https://t.me/nymchan_help_chat).

Most of them are benign. Usually you will encounter errors when your nodes tries to estabilish a connection with a "dead" node, that is misconfigured(most likely its firewall is).

As long as your node outputs `since startup mixed 1337 packets!` in your logs, you should be fine. If you want to be sure, check the Nym [dashboard](https://testnet-finney-explorer.nymtech.net/) or see other ways on how to check if your node is really mixing, mentioned in section **How can I tell my node is up and running and mixing traffic?** in this wiki. 




## I compiled Nym from source. How do I make the mixnode run in the background?

When you close current session, you kill the process and therefore the mixnode will stop. There are multiple ways on how to make it persistent even after exiting your ssh session. Tmux, screen for instance. 

Easy solution would be to use **nohup** -> ```nohup`./nym-mixnode run --id NYM & ``` where `--id NYM` is the id you set during the *init* command previously. 

**However**, the **most reliable** and **elegant solution** is to create a **systemd.service** file and run the nym-mixnode with `systemctl` command.

Create a file with nano and copy there following. 
**IMPORTANT:** You need to write there your node id which you set up in the config earlier, else it won't work!
At line ExecStart, rewrite the --id SOMENAME with exactly the same name as you used for the config.

``` sudo nano /etc/systemd/system/nym-mixnode.service ```

Copy there this and change the id name and path depending on the way how you installed your mixnode


```
[Unit]
Description=nym mixnode service
After=network.target

[Service]
Type=simple
User=nym
LimitNOFILE=65536
ExecStart=/home/nym/nym-mixnode run --id nym
KillSignal=SIGINT
Restart=on-failure
RestartSec=30
Restart=on-abort
[Install]
WantedBy=multi-user.target

```

Now pres CTRL + O to write the file, hit enter. Then exit with CTRL + W.

```sudo systemctl enable nym-mixnode ```

- Enable the service 

```sudo systemctl start nym-mixnode ```

- Start the service

```sudo systemctl status nym-mixnode ```

- Check if the service is running properly and mixnode is mixing. 

Now your node should be mixing all the time unless you restart the server!

Anytime you change your systemd service file you need to ```sudo systemctl daemon-reload``` and restart the service. 
## Where can I get more help?

The fastest way to reach one of us or get a help from the community, visit our [Telegram help chat](https://t.me/nymchan_help_chat).

For more tech heavy questions join our Keybase channel. Get Keybase [here](https://keybase.io/), then click Teams -> Join a team. Type nymtech.friends into the team name and hit continue. For general chat, hang out in the #general channel. Our development takes places in the #dev channel. 
