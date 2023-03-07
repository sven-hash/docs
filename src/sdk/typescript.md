# Typescript SDK

The Nym Typescript SDK allows developers to start building browser-based Mixnet applications quickly, by simply importing the SDK into their code via NPM as they would any other Typescript library. 

You can find the source code [here](https://github.com/nymtech/nym/tree/release/{{platform_release_version}}/sdk) and the library on NPM [here](https://www.npmjs.com/package/@nymproject/sdk). 

Currently developers can use the SDK to do the following **entirely in the browser**: 
* Create a client
* Listen for incoming messages and reply to them
* Encrypt text and binary-encoded messages as Sphinx packets and send these through the mixnet  

> We will be fleshing out further mixnet-related features in the coming weeks with functionality such as importing/exporting keypairs for developing apps with a retained identity over time.

In the future the SDK will be made up of several components, each of which will allow developers to interact with different parts of Nym's infrastructure.  

| Component | Functionality                                                                  | Released |
| --------- | ------------------------------------------------------------------------------ | -------- |
| Mixnet    | Create clients & keypairs, subscribe to Mixnet events, send & receive messages | ✔️     |
| Coconut   | Create & verify Coconut credentials                                            | ❌       |
| Validator | Sign & broadcast Nyx blockchain transactions, query the blockchain             | ❌       |

### Using the SDK 
The following code snippet shows the basic flow of initialising a client, subscribing to an event on the websocket connection, and sending yourself a message through the Mixnet: 

```javascript 
import { createNymMixnetClient } from '@nymproject/sdk';

const main = async () => {
  const nym = await createNymMixnetClient();

  const nymApiUrl = 'https://validator.nymtech.net/api';

  // show message payload content when received 
  nym.events.subscribeToTextMessageReceivedEvent((e) => {
    console.log('Got a message: ', e.args.payload);
  });

  // start the client and connect to a gateway
  await nym.client.start({
    clientId: 'My awesome client',
    nymApiUrl,
  });

  // send a message to yourself
  const payload = 'Hello mixnet';
  const recipient = nym.client.selfAddress();
  nym.client.send({ payload, recipient });
  
};
```

You can send a message to another user (you will need to know their address at a Gateway) with: 
```javascript
const payload = 'Hello mixnet';
const recipient = '<< RECIPIENT ADDRESS GOES HERE >>';
await nym.client.sendMessage({ payload, recipient });
```

There are also examples for several different frameworks which can be run in the browser: 
* [Plain html](https://github.com/nymtech/nym/tree/release/{{platform_release_version}}/sdk/typescript/examples/plain-html)
* [Create-react-app](https://github.com/nymtech/nym/tree/release/{{platform_release_version}}/sdk/typescript/examples/react-webpack-with-theme-example) 
* [Vanilla Typescript](https://github.com/fmtabbara/nym-sdk-vanilla-template) 

### How it works
The SDK can be thought of as a 'wrapper' around the compiled [WebAssembly client](https://github.com/nymtech/nym/tree/release/{{platform_release_version}}/clients/webassembly) code: it runs the client (a Wasm blob) in a web worker. This allows us to keep the work done by the client - such as the heavy lifting of creating and multiply-encrypting Sphinx packets - in a seperate thread from our UI, enabling you to build reactive frontends without worrying about the work done under the hood by the client eating your processing power. 

The SDK exposes an interface that allows developers to interact with the Wasm blob inside the webworker from frontend code.  

### Framework Support 
Currently, the SDK **only** works with frameworks that use webpack as a bundler. If you want to use the SDK with a framework that isn't on this list, such as Angular, or NodeJS, **here be dragons!** These frameworks will probably use a different bundler than the examples listed above, which are all using Webpack. 

Support for environments with different bundlers will be added in subsequent releases. 

| Bundler | Supported |
| ------- | --------- |
| Webpack | ✔️        |
| Packer  | ❌        |

<!--      
| Environment      | Supported | 
| ---------------- | --------- | 
| Browser          |  ✔️       |
| Headless NodeJS  |  ❌       |
| Electron Desktop |  ❌       | -->


### Think about what you're sending!
```admonish caution
Think about what information your app sends. That goes for whatever you put into your Sphinx packet messages as well as what your app's environment may leak.
```

Whenever you write client PEAPPs using HTML/JavaScript, we recommend that you do not load external resources from CDNs. Webapp developers do this all the time, to save load time for common resources, or just for convenience. But when you're writing privacy apps it's better not to make these kinds of requests. Pack everything locally.

If you use only local resources within your Electron app or your browser extensions, explicitly encoding request data in a Sphinx packet does protect you from the normal leakage that gets sent in a browser HTTP request. [There's a lot of stuff that leaks when you make an HTTP request from a browser window](https://panopticlick.eff.org/). Luckily, all that metadata and request leakage doesn't happen in Nym, because you're choosing very explicitly what to encode into Sphinx packets, instead of sending a whole browser environment by default.
