---
sidebar_label: Encrypted Cloud Storage Providers
description: "Install and use the File Storage Service Provider."
hide_title: false
title: Encrypted Cloud Storage Providers
---

Participants in our challenge for Hackatom __?which number?__ built several working proof of concepts for a private cloud storage service; think a private Dropbox account accessed via the Mixnet, with encrypted file sharing. The title of our challenge was _The Eternity Service 2.0_ in reference to _____'s paper _The Eternity Service_ published in ____, with the end goal being to create ______small overview jhere______ 

Find below links to the two winning submissions and the top runner up. Each took a different approach to the challenge, and all have slightly different features. 

If you want to run an instance of one of these service providers in either the testnet or the mainnet, please [get in touch](mailto:max@nymtech.net)! 

## First place: NymDrive    
https://github.com/saleel/nymdrive    
https://www.youtube.com/watch?v=5Rx73nw8NYI

This is really impressive for a hackathon entry. The service provider runs in both hosted and self-hosted mode (I was able to relatively easily set up my own IPFS bucket keys and run the supplied Nym service provider myself based on the README). The graphical client looks good, and works well on both MacOS and Ubuntu. It's especially noteworthy that with a few fairly simple improvements, this client could probably be used by "normal" users, which is exactly what we were after. I would be pleased to work with Saleel on any improvements. The most obvious improvement to be made is as he noted in the TODO notes, the incorporation of the webassembly client so that he can eliminate the native client console dependency.


## Runner up: The Eternity Service 2.0    
https://github.com/marius-avram/nym-file-uploader-client
https://github.com/marius-avram/nym-file-service-provider    
https://www.youtube.com/watch?v=Rk5CGUzcscU

Very easy to set up and run, the provided instructions in the README were excellent - short and simple, but gets you to a running system including the client and service provider with minimal hassle. As a result, this one was probably the best entry in terms of setup simplicity. The UI is quite similar to Saleel's entry. However there are a few more "production-ready" flourishes in Saleel's competitor which makes it easier to use, including the ability to locally view filenames so you know which file is which, and to easily delete local data and then restore it from IPFS which make it a bit more useful.

## Runner up: Nymdrive    
https://github.com/gyrusdentatus/nymdrive 
http://nymdrive.org:3030    
https://youtu.be/J_8fktuMlTw

I like the fact that file hashes are not used as identifiers (this was part of the challenge that, in a production application, we would want to improve upon, so it's nice to see that you've taken this additional step). The use of a filesystem daemon is a simple and effective way to get an easy-to-use graphical interface to the filesystem. I was able to run the GUI application without any trouble and use the hosted service, but based on the README instructions I wasn't able to set up the service provider myself with a local mixnet (which I was easily able to do with the others). It would have been nice to do this in order to see traffic flowing through the system and have a look at how the encrypted files look on the server.
