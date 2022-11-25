---
sidebar_label: "Webassembly client"
hide_title:  false
description: "How to integrate the Nym webassembly client into your own applications to enable strong privacy for your users"
title: "Webassembly client"
---


The Nym webassembly client allows any webassembly-capable runtime to build and send Sphinx packets to the Nym network.

You can install [@nymproject/sdk](https://www.npmjs.com/package/@nymproject/sdk) via `npm` from its package page, or with:

```
npm i @nymproject/sdk
```

The `@nymproject/sdk` package allows easy creation of Sphinx packets from within mobile apps and browser-based client-side apps (including Electron or similar). Browser extensions should also work.

The webassembly inside the client lets you deliver web apps that build and send Sphinx packets solely in a web browser window. 


### Think about what you're sending!

:::caution
Think about what information your app sends. That goes for whatever you put into your Sphinx packet messages as well as what your app's environment may leak.
:::

Whenever you write client PEAPs using HTML/JavaScript, we recommend that you do not load external resources from CDNs. Webapp developers do this all the time, to save load time for common resources, or just for convenience. But when you're writing privacy apps it's better not to make these kinds of requests. Pack everything locally.

If you use only local resources within your Electron app or your browser extensions, explicitly encoding request data in a Sphinx packet does protect you from the normal leakage that gets sent in a browser HTTP request. [There's a lot of stuff that leaks when you make an HTTP request from a browser window](https://panopticlick.eff.org/). Luckily, all that metadata and request leakage doesn't happen in Nym, because you're choosing very explicitly what to encode into Sphinx packets, instead of sending a whole browser environment by default.
