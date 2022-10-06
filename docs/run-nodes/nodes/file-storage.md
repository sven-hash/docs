---
sidebar_label: Encrypted Cloud Storage
description: "Install and use the File Storage Service Provider."
hide_title: false
---

Participants in our challenge for Hackatom VI built several working proof of concepts for a private cloud storage service; think a private Dropbox account accessed via the Mixnet, with encrypted file sharing. 

The title of our challenge was _The Eternity Service 2.0_ in reference to Ross J. Anderson’s paper [_The Eternity Service_](https://www.cl.cam.ac.uk/~rja14/eternity/eternity.html), with the end goal being to create a private cloud storage service provider and a GUI with which users interact with the service provider via the Nym mixnet. 

Find below links to the two winning submissions and the top runner up. Each took a different approach to the challenge, and all have slightly different features. 

If you want to run a public instance of one of these service providers for the rest of community to use (in either the testnet or the mainnet), please [get in touch](mailto:max@nymtech.net)! 

## First place: NymDrive    
The service provider runs in both hosted and self-hosted mode (you can set up your own IPFS bucket keys and run the supplied Nym service provider based on the README), and the graphical client works well on both MacOS and Ubuntu. 

https://github.com/saleel/nymdrive    
https://www.youtube.com/watch?v=5Rx73nw8NYI

## Runner up: The Eternity Service 2.0    
Very easy to set up and run, with short and simple README instructions. Gets you to a running system including the client and service provider with minimal hassle. 

https://github.com/marius-avram/nym-file-uploader-client
https://github.com/marius-avram/nym-file-service-provider    
https://www.youtube.com/watch?v=Rk5CGUzcscU

## Runner up: Nymdrive    
Extends the challenge in that file hashs are not used as identifiers (which would be something that would be changed in production), with a solid filesystem daemon. 

https://github.com/gyrusdentatus/nymdrive 
https://youtu.be/J_8fktuMlTw