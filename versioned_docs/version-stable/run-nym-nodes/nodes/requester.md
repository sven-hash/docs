---
sidebar_label: Network Requesters
description: "Run a requester proxy for the benefit of the community."
hide_title: false
title: "Network Requesters"
---

<!-- :::note
The Nym network requester was built in the [building nym](/docs/stable/run-nym-nodes/build-nym/) section. If you haven't yet built Nym and want to run the code on this page, go there first.
::: -->

:::caution
The most recent Network Requester version is `1.1.1` - please checkout and build the repository according to instructions on the [building nym](/docs/stable/run-nym-nodes/build-nym/) page, **but checking out to `tags/nym-binaries-1.1.0-network-requester`** instead of the `v1.1.0` release
:::

If you have access to a server, you can run the Network Requester, which allows Nym users to make outbound network requests from your server.

## Anatomy of a network requester service 

The network requester is **not** an open proxy. It ships with a file called `allowed.list.sample`, which contains URLs used by the Blockstream Green and Electrum cryptographic wallets, which can be modified with the URLs of the web services it will connect to according to the maintainer of that instance.
 
A network requester service is comprised of 2 Nym binaries running on one VPS: 
* `nym-client` 
* `nym-network-requester`

The `nym-network-requester` binary listens and sends responses to the `nym-client`, which is how it connects to the mixnet. 

## Nym client 

Before initalising your Network Requester, you must initalise and run an instance of the `nym-client` binary for it to listen to. This would have been built in the same `build` process that built the `network-requester`. 

### Initialising your nym client 

First initialise your client with the command below (if you want to connect to a specific gateway, include the `--gateway` flag): 


```
 ./nym-client init --id <id>
```

<details>
  <summary>console output</summary>

      Initialising client...
      Saved all generated keys
      Saved configuration file to "/home/nym/.nym/clients/requester-client/config/config.toml"
      Using gateway: 8yGFbT5feDpPmH66TveVjonpUn3tpvjobdvEWRbsTH9i
      Client configuration completed.

      The address of this client is: BUVD1uAXEWSfMDdewwfxUAd6gSsEfHHPvnsV8LTfe9ZG.DaY9kqXREEkvpJ1Nv3nrfxF6HDamsJmtZQDFuyTAXwJZ@8yGFbT5feDpPmH66TveVjonpUn3tpvjobdvEWRbsTH9i

</details> 


You can check that your client is initialised correctly by running the following command and checking it starts up correctly: 

```
  ./nym-client run --id <id>
```

<details>
  <summary>console output</summary>


          _ __  _   _ _ __ ___
        | '_ \| | | | '_ \ _ \
        | | | | |_| | | | | | |
        |_| |_|\__, |_| |_| |_|
                |___/

                (client - version 1.1.0)

        
    2022-08-09T15:06:03.276Z INFO  nym_client::client > Starting nym client
    2022-08-09T15:06:03.293Z INFO  nym_client::client > Obtaining initial network topology
    2022-08-09T15:06:04.957Z INFO  nym_client::client > Starting topology refresher...
    2022-08-09T15:06:04.957Z INFO  nym_client::client > Starting received messages buffer controller...

</details> 



### Automating your client with systemd

Stop the running process with `CTRL-C`, and create a service file at `/etc/systemd/system/nym-client.service` so you don't have to manually restart your client if your server reboots or the process is killed for some reason: 

```
[Unit]
Description=Nym Client (1.1.0)
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

```
systemctl enable nym-client.service
systemctl start nym-client.service

# you can always check your client has succesfully started with: 
systemctl status nym-client.service
```

With `systemctl status nym-client.service` you should be able to see the address of the client at startup. Alternatively you can use `journalctl -t nym-client -o cat -f` to get the output of the client in your console as it comes in. 

Make a note of the client's address:

```
 2021-07-10T14:45:50.131 INFO  nym_client::client              > The address of this client is: BLJ6SrgbaYjb7Px32G7zSZnocuim3HT9n3ocKcwQHETd.4WAAh7xRxWVeiohcw44G8wQ5bGHMEvq8j9LctDkGKUC7@8yGFbT5feDpPmH66TveVjonpUn3tpvjobdvEWRbsTH9i
```

## Network requester 
### Running your network requester (standard mode)

:::caution
If you are following these instructions to set up a requester as part of a Service Grant, **ignore these instructions and jump to the step [below](requester#running-your-network-requester-stats-mode)**
:::

Now that we have a running client for the requester to listen to, we can start it with the following command: 

```
 ./nym-network-requester run
```

<details>
  <summary>console output</summary>

      Starting socks5 service provider:
      2021-08-11T13:28:02.767Z INFO  nym_network_requester::core > * connected to local websocket server at ws://localhost:1977

      All systems go. Press CTRL-C to stop the server.

</details> 

As you can see, it has connected to the nym client that we started before. 

### Running your network requester (stats mode)

Now that we have a running client for the requester to listen to, we can start it with the following command. 

```
 ./nym-network-requester run --enable-statistics
```

<details>
  <summary>console output</summary>

    THE NETWORK REQUESTER STATISTICS ARE ENABLED. IT WILL COLLECT AND SEND ANONYMIZED STATISTICS TO A CENTRAL SERVER. PLEASE QUIT IF YOU DON'T WANT THIS TO HAPPEN AND START WITHOUT THE enable-statistics FLAG .

    Starting socks5 service provider:
    2022-08-09T12:26:45.154Z INFO  nym_network_requester::core > * connected to local websocket server at ws://localhost:1977

    All systems go. Press CTRL-C to stop the server.

</details> 

As you can see, it has connected to the nym client that we started before. 

The `--enable-statistics` flag starts the gateway in a mode which reports very minimal usage statistics - the amount of bytes sent to a service, and the number of requests - to a service we run, as part of the Nym Connect Beta testing. 

Use the following command to ping our stats service to see what it has recorded (remember to change the `'until'` date): 

```
curl -d '{"since":"2022-07-26T12:46:00.000000+00:00", "until":"2022-07-26T12:57:00.000000+00:00"}' -H "Content-Type: application/json" -X POST http://mainnet-stats.nymte.ch:8090/v1/all-statistics
```

<details>
  <summary>console output</summary>

      [
        {
            "Service":{
              "requested_service":"chat-0.core.keybaseapi.com:443",
              "request_processed_bytes":294,
              "response_processed_bytes":0,
              "interval_seconds":60,
              "timestamp":"2022-07-26 12:55:44.459257091"
            }
        },
        {
            "Service":{
              "requested_service":"chat-0.core.keybaseapi.com:443",
              "request_processed_bytes":890,
              "response_processed_bytes":0,
              "interval_seconds":60,
              "timestamp":"2022-07-26 12:56:44.459333653"
            }
        },
        {
            "Service":{
              "requested_service":"api-0.core.keybaseapi.com:443",
              "request_processed_bytes":1473,
              "response_processed_bytes":0,
              "interval_seconds":60,
              "timestamp":"2022-07-26 12:56:44.459333653"
            }
        },
        {
            "Gateway":{
              "gateway_id":"Fo4f4SQLdoyoGkFae5TpVhRVoXCF8UiypLVGtGjujVPf",
              "inbox_count":8,
              "timestamp":"2022-07-26 12:46:34.148075290"
            }
        },
        {
            "Gateway":{
              "gateway_id":"2BuMSfMW3zpeAjKXyKLhmY4QW1DXurrtSPEJ6CjX3SEh",
              "inbox_count":6,
              "timestamp":"2022-07-26 12:46:51.578765358"
            }
        },
        {
            "Gateway":{
              "gateway_id":"Fo4f4SQLdoyoGkFae5TpVhRVoXCF8UiypLVGtGjujVPf",
              "inbox_count":8,
              "timestamp":"2022-07-26 12:47:34.149270862"
            }
        }
      ]                            

</details> 

### Automating your network requester with systemd

Stop the running process with `CTRL-C`, and create a service file for the requester as we did with our client instance previously at `/etc/systemd/system/nym-network-requester.service`:

```
[Unit]
Description=Nym Network Requester (1.1.0)
StartLimitInterval=350
StartLimitBurst=10

[Service]
User=nym # replace this with whatever user you wish 
LimitNOFILE=65536
# remember to add the `--enable-statistics` flag if running as part of a service grant and check the path to your nym-network-requester binary 
ExecStart=/home/nym/nym-network-requester run  
KillSignal=SIGINT
Restart=on-failure
RestartSec=30

[Install]
WantedBy=multi-user.target
```

Now enable and start your requester: 

```
systemctl enable nym-network-requester.service
systemctl start nym-network-requester.service

# you can always check your requester has succesfully started with: 
systemctl status nym-network-requester.service
```


### Configure your firewall

Although your requester is now ready to receive traffic, your server may not be - the following commands will allow you to set up a properly configured firewall using `ufw`:

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

Finally open your requester's p2p port, as well as ports for ssh and incoming traffic connections:

```
sudo ufw allow 1789,22,9000/tcp
# check the status of the firewall
sudo ufw status
```

For more information about your requester's port configuration, check the [requester port reference table](#requester-port-reference) below.

## Using your network requester 

:::caution
Service Grant grantees should only whitelist a single application - edit your `allowed.list` accordingly!
:::

You can safely share the address of your running `nym-client` with however you want - if you would like to run a Network Requester for the whole Nym network, give it to us and we can even put it in the Nym documentation.

Is this safe to do? If it was an open proxy, this would be unsafe, because any Nym user could make network requests to any system on the internet.

To make things a bit less stressful for administrators, the Network Requester drops all incoming requests by default. In order for it to make requests, you need to add specific domains to the `allowed.list` file at `$HOME/.nym/service-providers/network-requester/allowed.list`.

If you want, you can just use the domains in the default `allowed.list`, by running this command from the top-level `nym` code directory:

```
cp service-providers/network-requester/allowed.list.sample ~/.nym/service-providers/network-requester/allowed.list
```

Those URLs will let through requests for the Blockstream Green and Electrum cryptocurrency wallets, as well as the KeyBase chat client.

:::caution
If you change your `allowed.list`, make sure you restart the `nym-network-requester.service` to pick up the new allowed request list
:::

### Adding URLs for other clients

It would suck if Nym was restricted to only three clients. How can we add support for a new application? It's fairly easy to do.

Have a look in your nym-network-requester config directory:

```
ls $HOME/.nym/service-providers/network-requester/

# returns: allowed.list  unknown.list
```

We already know that `allowed.list` is what lets requests go through. All unknown requests are logged to `unknown.list`. If you want to try using a new client type, just start the new application, point it at your local SOCKS5 proxy (configured to use your remote `nym-network-requester`), and keep copying URLs from `unknown.list` into `allowed.list` (it may take multiple tries until you get all of them, depending on the complexity of the application).

If you add support for a new application, we'd love to hear about it: let us know or submit a commented pull request on `allowed.list.sample`. 

:::caution
If you are adding custom domains, please note that whilst they may appear in the logs of your network-requester as something like `api-0.core.keybaseapi.com:443`, you **only need** to include the main domain name, in this instance `keybaseapi.com`
:::

### Running an open proxy

If you *really* want to run an open proxy, perhaps for testing purposes for your own use or among a small group of trusted friends, it is possible to do so. You can disable network checks by passing the flag `--open-proxy` flag when you run it. If you run in this configuration, you do so at your own risk.


## Ports
### Requester port reference

All requester-specific port configuration can be found in `$HOME/.nym/clients/<YOUR_ID>/config/config.toml` & `$HOME/.nym/service-providers/<YOUR_ID>/config/config.toml`. If you do edit any port configs, remember to restart your client and requester processes.

| Default port | Use                       |
|--------------|---------------------------|
| 1789         | Listen for Mixnet traffic |
| 9000         | Listen for Client traffic |


## Testing your Network Requester

1. Add `nymtech.net` to your `allowed.list` (remember to restart you Network Requester). 

2. Initialise a local socks5 client with the address of your NR as the --provider, following instructions [here](https://docs.nymtech.net/docs/stable/integrations/socks5-client)

3. In another terminal window, run the following: 

```
curl -x socks5h://localhost:1080 https://nymtech.net/.wellknown/connect/healthcheck.json 
```

This command should return the following:

<details>
  <summary>console output</summary>

{ "status": "ok" }

</details>