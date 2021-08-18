---
sidebar_label: Requesters
description: "Run a requester proxy for the benefit of the community."
hide_title: true 
---

<br />

:::note

The Nym network requester was built in the [building nym](/docs/run-nym-nodes/build-nym/) section. If you haven't yet built Nym and want to run the code on this page, go there first.

:::


If you have access to a server, you can run the nym-network-requester, which allows Nym users to make outbound network requests from your server.

The nym-network-requester is NOT an open proxy. It ships with a file called `allowed.list.sample`, which contains URLs used by the Blockstream Green and Electrum cryptographic wallets.

### Running your nym client 

Before initializing your nym-network-requester, you must initialize an instance of the nym-client binary for it to listen to.

First of all, choose which gateway to connect your client to. Active gateways can be found in the 'Gateways' [section of the explorer](https://testnet-milhon-explorer.nymtech.net/nym/gateways).

Then initialize your nym client with the ID key of your gateway of choice: 

```shell
nym@localhost:~$ ./nym-client init --id requester-client --gateway <GATEWAY_ID>
```

Which should return: 

```shell 

      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (client - version 0.11.0)

    
Initialising client...
Saved all generated keys
Saved configuration file to "/home/nym/.nym/clients/requester-client/config/config.toml"
Using gateway: 8yGFbT5feDpPmH66TveVjonpUn3tpvjobdvEWRbsTH9i
Client configuration completed.


The address of this client is: BUVD1uAXEWSfMDdewwfxUAd6gSsEfHHPvnsV8LTfe9ZG.DaY9kqXREEkvpJ1Nv3nrfxF6HDamsJmtZQDFuyTAXwJZ@8yGFbT5feDpPmH66TveVjonpUn3tpvjobdvEWRbsTH9i
```

Now create a service file at `/etc/systemd/system/nym-client.service`: 

```shell
[Unit]
Description=Nym Client (0.11.0)
StartLimitInterval=350
StartLimitBurst=10

[Service]
User=nym # replace this with whatever user you wish 
LimitNOFILE=65536
ExecStart=/home/nym/nym-client run --id requester-client # remember to check the path to your nym-client binary and the id of your client 
KillSignal=SIGINT
Restart=on-failure
RestartSec=30

[Install]
WantedBy=multi-user.target
```

Then enable and start your client with the following commands: 

```shell
systemctl enable nym-client.service
systemctl start nym-client.service

# you can always check your client has succesfully started with: 
systemctl status nym-client.service
```

With `systemctl status nym-client.service` you should be able to see the address of the client at startup. Alternatively you can use `journalctl -t nym-client -o cat -f` to get the output of the client in your console as it comes in. 

Make a note of the client's address:

```shell
 2021-07-10T14:45:50.131 INFO  nym_client::client              > The address of this client is: BLJ6SrgbaYjb7Px32G7zSZnocuim3HT9n3ocKcwQHETd.4WAAh7xRxWVeiohcw44G8wQ5bGHMEvq8j9LctDkGKUC7@8yGFbT5feDpPmH66TveVjonpUn3tpvjobdvEWRbsTH9i
```

### Running your network requester 

Now that we have a running client for the requester to listen to, we can start it with the following command : 

```shell
nym@localhost:~$ ./nym-network-requester 

Starting socks5 service provider:
 2021-08-11T13:28:02.767Z INFO  nym_network_requester::core > * connected to local websocket server at ws://localhost:1977

All systems go. Press CTRL-C to stop the server.
```

As you can see, it has connected to the nym client that we started before. 

Now stop that process with `CTRL-C`, and create a service file for the requester as we did with our client instance previously at `/etc/systemd/system/nym-network-requester.service`:

```shell
[Unit]
Description=Nym Client (0.11.0)
StartLimitInterval=350
StartLimitBurst=10

[Service]
User=nym # replace this with whatever user you wish 
LimitNOFILE=65536
ExecStart=/home/nym/nym-network-requester # remember to check the path to your nym-network-requester binary 
KillSignal=SIGINT
Restart=on-failure
RestartSec=30

[Install]
WantedBy=multi-user.target
```

Now enable and start your requester: 

```shell
systemctl enable nym-network-requester.service
systemctl start nym-network-requester.service

# you can always check your requester has succesfully started with: 
systemctl status nym-network-requester.service
```

## Configure your firewall

Although your requester is now ready to receive traffic, your server may not be - the following commands will allow you to set up a properly configured firewall using `ufw`:

```shell
# check if you have ufw installed
ufw version
# if it is not installed, install with
sudo apt install ufw -y
# enable ufw
sudo ufw enable
# check the status of the firewall
sudo ufw status
```

Finally open your requester's p2p port, as well as ports for ssh and incoming traffic connections:

```shell
sudo ufw allow 1789,22,9000/tcp
# check the status of the firewall
sudo ufw status
```

For more information about your requester's port configuration, check the [requester port reference table](#requester-port-reference) below.

### Using your network requester 

You can safely share the address of your running nym-client with however you want - if you would like to run a nym-network-requester for the whole Nym network, give it to us and we can even put it in the Nym documentation.

Is this safe to do? If it was an open proxy, this would be unsafe, because any Nym user could make network requests to any system on the internet.

To make things a bit less stressful for administrators, nym-network-requester drops all incoming requests by default. In order for it to make requests, you need to add specific domains to the `allowed.list` file at `$HOME/.nym/service-providers/nym-network-requester/allowed.list`.

If you want, you can just use the domains in the default `allowed.list`, by running this command from the top-level `nym` code directory:

`cp service-providers/nym-network-requester/allowed.list.sample ~/.nym/service-providers/nym-network-requester/allowed.list`

Those URLs will let through requests for the Blockstream Green and Electrum cryptocurrency wallets, as well as the KeyBase chat client.

  :::caution
  If you change your `allowed.list`, make sure you restart nym-network-requester.service to pick up the new allowed request list
  :::

### Adding URLs for other clients

It would suck if Nym was restricted to only three clients. How can we add support for a new application? It's fairly easy to do.

Have a look in your nym-network-requester config directory:

```shell
ls $HOME/.nym/service-providers/network-requester/

# returns: allowed.list  unknown.list
```

We already know that `allowed.list` is what lets requests go through. All unknown requests are logged to `unknown.list`. If you want to try using a new client type, just start the new application, point it at your local SOCKS5 proxy (configured to use your remote `nym-network-requester`), and keep copying URLs from `unknown.list` into `allowed.list` (it may take multiple tries until you get all of them, depending on the complexity of the application).

If you add support for a new application, we'd love to hear about it: let us know or submit a commented pull request on `allowed.list.sample`. 

:::caution
If you are adding custom domains, please note that whilst they may appear in the logs of your network-requester as something like `api-0.core.keybaseapi.com:443`, you **only need** to include the main domain name, in this instance `keybaseapi.com`
:::

### Running an open proxy

If you really, really want to run an open proxy, perhaps for testing purposes for your own use or among a small group of trusted friends, it is possible to do so. You can disable network checks by passing the flag `--open-proxy` flag when you run it. If you run in this configuration, you do so at your own risk.


### Requester port reference

All requester-specific port configuration can be found in `$HOME/.nym/clients/<YOUR_ID>/config/config.toml` & `$HOME/.nym/service-providers/<YOUR_ID>/config/config.toml`. If you do edit any port configs, remember to restart your client and requester processes.

| Default port | Use                       |
|--------------|---------------------------|
| 1789         | Listen for Mixnet traffic |
| 9000         | Listen for Client traffic |
