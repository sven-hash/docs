---
sidebar_label: Nym Websocket Tutorial
description: "Install and use the Nym Wallet."
hide_title:  false
title: Nym Simple Websocket Tutorial (Typescript)
---

### Prerequisites

* Node.js (and Node Package Manager)

#### Installation 

(Windows and macOS)
Go to https://nodejs.org/en/download/

(Linux - Ubuntu)
Type and enter the following in your terminal:

```
sudo apt install curl
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Ensure that after installing Node.js of any of the above operating systems , type and enter the followinginto your terminal to check if the install was successful :
```
node --version
npm --version
```


### Installing Typescript and Bundling our Application

Inside your terminal, type and enter:
```
npm install -g typescript
```
This will install typescript for us globally. The -g directive tells npm to install the package in the global shared node_modules folder usually at the root folder in your computer

After this , go ahead and create a new folder to start your project in and give it an appropriate name eg; ‘Mixnet Websocket Project’. Continue to then do the following:

1. Open your terminal in the folder you created (or by `cd`'ing to the directory), type and enter:

    ```
    npm init
    ```
    The following chunk of output will then be presented to you. The terminal will prompt your to provide some input for the the sections name to  license. You can simply just press enter after each prompt (like the example below) and it will just set default values. Alternatively, you can go ahead and fill out each value as you wish. 

    <img src="/img/tutorials/simple-websocket/image1.png"/>

    You will then notice a `package.json` file has been created in the directory:

    <img src="/img/tutorials/simple-websocket/image2.png"/>

 2. Continuing with our terminal, type and enter:
    
    ```
    npm install typescript
    ```
    After this point , we should open up our chosen IDE (VSCode, Sublime Text, etc) and open up the folder we are working in (the one with the `package.json`).

    <img src="/img/tutorials/simple-websocket/image3.png"/>

    We can see that typescript has been added to our `dependencies`. Typescript is now in our project.


 3. Back in our terminal, type and enter:
    
    ```
    npm install ts-node --save-dev
    ```
    This package (`ts-node`) allows us to build a typescript application in a node environment.

 4. Create a new file in the same level as `package.json` called `tsconfig.json` Inside that file , copy and paste the code below into it.

    ```
    {
        "compilerOptions": {
            "module": "commonjs",
            "esModuleInterop": true,
            "target": "es6",
            "moduleResolution": "node",
            "sourceMap": true,
            "outDir": "dist"
        },
        "lib": ["es2015"]
    }
    ```
 5. Now that we have got to this point, we want to be able to run our application on localhost to make sure everything is working okay. 
    We also want to be able to work on our application while its running and make sure it automatically picks up any saved changes when we view it on the browser. To do this , we are going to use the Parcel bundler.

    Back in your terminal, type and enter:

    ```
    npm install --global parcel-bundler
    ```

    After the npm install has finished, create a new folder called src in the same level as our tsconfig.json and package.json (our project root). Inside there , create 2 new files. One called `index.html` and one called `index.ts`.

 6. In our `index.html`, paste in the following code:
    
    ```
    <!DOCTYPE html>
    <html>
        <head>
            <title>App Test</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h1>Test</h1>
            <div id="app"></div>
            <script src="index.ts"></script>
        </body>
    </html>

    ```

    And in our index.ts, paste the following code:

    ```
    console.log('test log')
    ```

    Once we have done that , navigate into our `package.json` and in the scripts section, just above the test command,  paste the following:

    ```
    "start": "parcel src/index.html"
    ```

    Now back in our terminal , type `npm start` and press enter.

    <img src="/img/tutorials/simple-websocket/image4.png"/>

    This will result in the above output. Open your browser to see the results (localhost:1234). You should now have a running web application!

    
### Building the User Client

We will focus mainly on the logic of the `index.ts` file in this section. It is where we want to establish our logic which connects our application to the mixnet, construct messages that we want to send and then send it to the mixnet for a service provider to receive.

 <img src="/img/tutorials/simple-websocket/image5.png"/>

 Our main focus will be on the two blue boxes, which we will try to connect to the orange boxes. Everything in the middle has already been taken care of for us. The first place to to start will be implementing the code that connects our Typescript Client to our Nym Websocket Client.

 1. In our `index.ts` paste or type in the following code : 
    
    ```
    async function main() {
    }

    /* Connect to a websocket. */
    function connectWebsocket(url) {
        return new Promise(function (resolve, reject) {
            var server = new WebSocket(url);
            console.log('connecting to Websocket Server (Nym Client)...')
            server.onopen = function () {
                resolve(server);
            };
            server.onerror = function (err) {
                reject(err);
            };
        
        });
    }
    
    main();
    ```
    In this function, we return a Promise which attempts to establish a websocket connection to the url value that we pass into it as our parameter. If its successful , we will be notified in our application and our websocket client, If not successful, we will receive an error in our application. We are going to write the code for this further in the tutorial.

    We are also declaring our `main()` function , where we will be calling logic that will initialize and run our application when executed.

 2. Next, we will implement the functions that will handle DOM manipulation (code which will alter our UI depending on 
    how we are interacting with our application).Paste or type the below code into index.ts, below our `main()` function:
 
    ```
    /*
        Display messages that relates to initializing our client and client status (appearing in our activity log).
    */
    function displayClientMessage(message) {
        document.getElementById("output").innerHTML += "<p>" + message + "</p >";
    }
    
    /*
        Handle any messages that come back down the websocket.
    */
    function handleResponse(resp) {
        try {
            let response = JSON.parse(resp.data);
            if (response.type == "error") {
                displayJsonResponse("Server responded with error: " + response.message);
            } else if (response.type == "selfAddress") {
                displayJsonResponse(response);
                ourAddress = response.address;
                displayClientMessage("Our address is:  " + ourAddress + ", we will now send messages to ourself.");
            } else if (response.type == "received") {
                handleReceivedTextMessage(response)
            }
        } catch (_) {
            displayJsonResponse(resp.data)
        }
    }
    
    /*
        Handle any string message values that are recieved through messages sent back to us.
    */
    function handleReceivedTextMessage(message) {
        const text = message.message
        displayJsonResponse(text)
    }
    
    /*
        Display websocket responses in the Activity Log.
    */
    function displayJsonResponse(message) {
        let receivedDiv = document.createElement("div")
        let paragraph = document.createElement("p")
        paragraph.setAttribute('style', 'color: orange')
        let paragraphContent = document.createTextNode("received back >>> " + JSON.stringify(message))
        paragraph.appendChild(paragraphContent)
        
        receivedDiv.appendChild(paragraph)
        document.getElementById("output").appendChild(receivedDiv)
    }

    ```

    This may look like a big chunk of code, but dont worry, the majority of it relates to adjusting HTML elements of our `index.html`. The next thing we then want to do is define some key variables that we will want to utilize in our application.

3.  Above our main function , paste or type the following code:

    ```
    /*
        The adress that is given to us from our mixnet client.
    */
    var ourAddress : string;
    
    /*
        Address we want to send our messages to.
    */
    var targetAddress: string;
    
    /*
        Variable that holds our websocket connection data.
    */
    var websocketConnection: any;
    ```

    These three variables will be the three main global variables of our application.

    `ourAddress` will be populated once we get a response from the initialization of our Nym Websocket Client (which we will cover later).

    `targetAddress` will be set by us later in the tutorial, once we boot up the Service Providers nym client.

    `websocketConnection` will be populated once we get a successful response from our Promise within the `connectWebsocket()` function.

4.  Lets go ahead and fill out or `main()` function. Paste or type out the following code :
  
    ```
    async function main() {
        var port = '1977' // client websocket listens on 1977 by default.
        var localClientUrl = "ws://127.0.0.1:" + port;
        
        // Set up and handle websocket connection to our desktop client.
        websocketConnection = await connectWebsocket(localClientUrl).then(function (c) {
            return c;
        }).catch(function (err) {
            displayClientMessage("Websocket connection error. Is the client running with <pre>--connection-type WebSocket</pre> on port + port + "?");
        })

        websocketConnection.onmessage = function (e) {
            handleResponse(e);
        };
        
        sendSelfAddressRequest();
        
        // Set up the send button
        const sendButton = document.querySelector('#send-button');
        
        sendButton?.addEventListener('click', function handleClick(event) {
            sendMessageToMixnet();
        });
    }

    ```

    Accompanying this, lets provide it with the function that we currently have not defined yet - `sendSelfAddressRequest()`. Lets place it under our `main()` function:

    ```
    /*
        Get out address to log in the activity log so we know what our address is in the mixnet via our application UI
    */

    function sendSelfAddressRequest() {
        var selfAddress = {
            type: "selfAddress"
        }
        displayJsonSend(selfAddress);
        websocketConnection.send(JSON.stringify(selfAddress));
    }

    ```

    Our added logic into the main function will do the following:

    - State the Port (set to 1977, which our Nym Websocket Client listens to by default) and Local client url (which we point to localhost (127.0.0.1)).
    - Call our `connectWebsocket()` function and assign the value it returns to `websocketConnection`, the global variable which we created earlier.
    - Handle any responses which come back from our websocket and handle it accoredinlgy depending what value is present in its type attribute within the `handleResponse()` function.
    - Call our newly added function , `sendSelfAddressRequest()` where we send a object with an attribute, `type : selfAddress`to get the address of our Nym Websocket Client.
    - Listen to a Send button on your `index.html` (which we will implement soon) that when its pressed, it will grab whatever data we want to send and send it through the mixnet. This will be done in a new function we will now create, `sendMessageToMixnet()`.

5.  Under our `sendSelfAddressRequest()` function , paste or type out the code below:

    ```
    /*
        Function that gets the form data and sends that to the mixnet in a stringified JSON format.
    */
    function sendMessageToMixnet() {
    
        //Access our form elements current values
        var nameInput = (<HTMLInputElement>document.getElementById("nameInput")).value;
        var serviceSelect = (<HTMLInputElement>document.getElementById("serviceSelect")).value;
        var textInput = (<HTMLInputElement>document.getElementById("textInput")).value;
        var freebieCheck = (<HTMLInputElement>document.getElementById("freebieCheck")).checked;
        
        //Place each of the form values into a single object to be sent.
        const messageContentToSend = {
            name : nameInput,
            service : serviceSelect,
            comment : textInput,
            gift : freebieCheck
        }
        
        /*We have to send a string to the mixnet for it to be a valid message , so we use JSON.stringify to make our object into a string.*/
        const message = {
            type: "send",
            message: JSON.stringify(messageContentToSend),
            recipient: targetAddress,
            withReplySurb: false,
        }
        
        //Display our json data to ber sent
        displayJsonSend(message);
        
        //Send our message object via out via our websocket connection.
        websocketConnection.send(JSON.stringify(message));
    }

    ```

    This function will do a few things for us:
    - Get the values from a form in the index.html (which we will create soon) and assign them to local variables within the function.
    - We insert our local variables into one object to be send to the mixnet.
    - Call a function, `displayJsonSend()`, which will render our sent message on to the UI.
    - Use our `websocketConnection` global variable to send our message to the websocket. Youll notice that we JSON.stringify our data when passing it into the `send()` function. This is because our Nym Websocket Client will only accept messages in string format (for now) and will throw an error if the value it receives is not a string.

    Below our `sendMessageToMixnet()` function Paste or type out the code below for our `displayJsonSend()` function:

    ```
    /*
        Functions that will display responses into our activity log.
    */
    function displayJsonSend(message) {
        let sendDiv = document.createElement("div")
        let paragraph = document.createElement("p")
        paragraph.setAttribute('style', 'color: #36d481')
        let paragraphContent = document.createTextNode("sent >>> " + JSON.stringify(message))
        paragraph.appendChild(paragraphContent)
        
        sendDiv.appendChild(paragraph)
        document.getElementById("output").appendChild(sendDiv)
    }

    ```

6.  Lets finally get our HTML file filled out with some UI that will accompany what we have in our `index.ts`.
    Replace the contents of `index.html` with the following code:

    <details>
    <summary>index.html Code</summary>

        <!doctype html>
        <html>
        <head>
            <style>
                .headerContainer{
                    align-items: end;
                    display: flex;
                    margin-left: 10px;
                    margin-top: 10px;
                    margin-bottom: 20px;
                }
                .container{
                    width: 400px;
                    margin-left: 20px;
                }
                </style>
            <meta charset="UTF-8">
            <title>Mixnet Websocket Starter Client</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css" integrity="sha512-KXol4x3sVoO+8ZsWPFI/r5KBVB/ssCGB5tsv2nVOKwLg33wTFP3fmnXa47FdSVIshVTgsYk/1734xSk9aFIa4A==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        </head>
        <body>
            <div class="headerContainer">
                <img class="ui small image" src="https://nymtech.net/img/docs/FAVICON_DARK.png" style="height:45px;width:45px;">
                <h1 style="margin-left: 10px;margin-top: 20px">Mixnet Websocket Starter User Client</h1>
            </div>
            
            <div class="container">
                <form class="ui form">
                    <div class="field">
                        <label>Name</label>
                        <input type="text" id="nameInput" name="nameInput" value="Freddy">
                        </div>
                    <div class="field">
                        <label>Service</label>
                        <select class="ui dropdown" id="serviceSelect" name="serviceSelect">
                        <option value="service_1">Service 1</option>
                        <option value="service_2">Service 2</option>
                        <option value="service_3">Service 3</option>
                        </select>
                    </div>
                    <div class="field">
                        <label>Message</label>
                        <input type="text" id="textInput" name="textInput" value="Hello, Service Provider. I would like to use a service!">
                    </div>
                    <div class="field">
                        <div class="ui checkbox">
                        <input type="checkbox" id="freebieCheck" name="freebieCheck">
                        <label for="checkbox"> Send me free stuff.</label>
                        </div>
                    </div>
                </form>
                <div class="field" style="margin-top: 10px;">
                    <button class="ui button" id="send-button"><i class="icon location arrow"></i>Send</button>
                </div>
            </div>
            
            <div class="ui icon message" style="margin-left:20px;max-width: fit-content;">
                <i class="question circle icon"></i>
                <div class="content">
                    <div class="header">
                        How it works
                        </div>
                        <p>Once you have started your Nym Websocket client(s), you can fill out the form and send data to the mixnet using the <b>"Send"</b> button.</p>
                        <p>Your message will then be relayed through your Nym Websocket client running on the port (specified using --port in the command line) which is set to 1977 by default.</p>
                        <p>Below, you can see the activity log. <b style='color: #36d481;'>Sent</b> messages will display in <b style='color: #36d481;'>green</b> while <b style='color: orange;'>received</b> messages will display in <b style='color: orange;'>orange</b>.</p>
                </div>
            </div>
            
            <h3 style="margin-left:10px">Activity Log</h3>
            
            <p style="background-color: #202124;color: #fff;">
                <span id="output"></div>
            </p>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js" integrity="sha512-aVKKRRi/Q/YV+4mjoKBsE4x3H+BkegoM/em46NNlCqNTmUYADjBbeNefNxYV7giUp0VxICtqdrbqU7iVaeZNXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.js" integrity="sha512-Xo0Jh8MsOn72LGV8kU5LsclG7SUzJsWGhXbWcYs2MAmChkQzwiW/yTQwdJ8w6UA9C6EVG18GHb/TrYpYCjyAQw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
            <script src="index.ts"></script>
        </body>
        </html>

    </details>

    From here, save your file and go back to your terminal and type `npm start` . If all has gone well , we should be able to see a new user interface for our application.

### Connecting our Nym Websocket Client

At this point, we should have all our code at this point be able to make the first simple websocket connection that we are looking for. 
For this, we need a copy of the Websocket Client itself. 


Go to https://github.com/nymtech/developer-tutorials, open up the Websocket Client Demo folder and download the `nym-client` file and the `nym-client.d`file.

:::note
You can find the whole project in the above repository. Feel free to cross check the code once you have finished or feel free to skip to the end with this finished solution.
:::

Once we have this up and running, we can get to the real nitty gritty of connecting and executing of our websocket functionality. Make sure you place the `nym-client` and `nym-client.d` in an appropriate location on your computer. 

<img src="/img/tutorials/simple-websocket/image6.png"/>

<br/>
<br/>

Then, in your terminal, navigate to the folder location of these files and execute the foillowing command:

```
./nym-client init --id websocket-client
```
The resulting output will look something like this:

<img src="/img/tutorials/simple-websocket/image7.png"/>

<br/>
<br/>

:::note
This address you see (along with the other addresses in this tutorial) will be different to the one you have when you execute this command. Addresses generated are different for each client when initialized.
:::

We can see from this output that this command does the following:
- Saves a `config.toml`  file on our computers users directory within the folder `.nym` (dont worry too much about this for now).
- Starts using a gateway on the mixnet.
- Generates and address for our Nym Websocket Client.

Next, within the same terminal, lets run the following command:

```
./nym-client run --id websocket-client 
```

You should then see and output looking something like this:

<img src="/img/tutorials/simple-websocket/image8.png"/>

<br/>
<br/>

Our Nym Websocket Client for our Typescript Script is now up and running! Let's have a look at what is happening in our Web Application in the browser (you may want to refresh the browser one back on the application).

<img src="/img/tutorials/simple-websocket/image9.png"/>

<br/>
<br/>

We have a response in our Activity Log section at the bottom of our application. We can see that we got a successful response from our websocket, hence we were able to get back the address we saw in the above terminal output. Lets try something here. Terminate the terminal process by holding `CTRL + C`.  After that, lets take another look at our browser application.

<img src="/img/tutorials/simple-websocket/image10.png"/>

<br/>
<br/>

Excellent, so we also know that our error code for a missing websocket is also working for us. Lets get that client back up and running (by using `./nym-client run --id websocket-client`)so we can get on to connecting it to a Service Provider.

### Adding our Service Provider

Its time to get a full circle of websocket functionality up and running. Go back to https://github.com/nymtech/developer-tutorials, open up the Websocket Client Demo folder and download our Service Provider code.

Like our User Client , the Service Provider is a typescript application, bundles using parcel and has the same npm dependencies. Once downloaded, place the project in an appropriate folder and navigate to the project folder location in a new terminal window. Make sure your in the project root (the same level as your `package.json`, `tsconfig.json`, etc) and run:

```
npm install 
```

Then in your package.json, under the “scripts” section. Check that the “start” line looks like this:

```
"start": "parcel src/index.html --port 1235",
```

This will ensure that our User Client and Service Provider wont have a port conflict when we run them locally. Go ahead and then run :

```
npm start
```

We should then have the following screen appear when we open a new tab on url : localhost:1235.

<img src="/img/tutorials/simple-websocket/image11.png"/>

<br/>
<br/>

So we can see that the Service Provider is wanting to listen to a websocket connection on port 1978 but currently it cant find one. That's our cue  to open up another terminal window (in the same location where we have our `nym-client`and `nym-client.d` file) and get ourselves a second instance of our Nym Websocket Client running.

Go back to the folder where you placed your nym-client files and open up a new terminal there.
Type and enter the following

```
./nym-client init --id service-provider --port 1978
./nym-client run --id service-provider
```
We then have our second Nym Websocket Client up and running. Lets go back to our browser back to our Service Provider tab and look at what's changed:

<img src="/img/tutorials/simple-websocket/image12.png"/>

<br/>
<br/>

Same as our User Client, we got a successful response from the websocket. All good so far.

We now want to send messages to from our User Client to our Service provider. We have just this one step left to do. Back in the `index.ts` of our User Client code, we need to do the following:

Assign the global variable `targetAddress` that we initialized at the top of our code file to the value of our Service Providers websocket client address (the address stated in the screenshot above).

```
/*
   Address we want to send our messages to.
*/
var targetAddress = 'FR2dKwFTFDPN1DSBUehbWea5RXTEf2tQGUz1L7RsxGHT.QndBs9qMtNH5s3RXmnP96FgzAeFV6nwLNB6hrGGvUN2@62F81C9GrHDRja9WCqozemRFSzFPMecY85MbGwn6efve';
```

:::note
As mentioned earlier, your address will be different to the one seen here in this tutorial. Use the one that you generated for your Service Provider via the second instance of your Nym Websocket Client.
:::

Save that and refresh both of our web applications in the browser. At this point, we should have the following set up:

4 Terminals Open 
- 1 User Client Web App running,
- 1 Service Provider App running, 
- 2 Nym Websocket Clients for each of those two web applications.

<img src="/img/tutorials/simple-websocket/image13.png"/>

<br/>
<br/>

2 Applications (UI) running in the browser 
- 1 User Client.
- 1 Service Provider.

Now , let's send a message from one to the other!

Go to our Client Application and fill out the form that we constructed with our HTML Code earlier in the tutorial:

<img src="/img/tutorials/simple-websocket/image14.png"/>

<br/>
<br/>

When you are ready, Go ahead and hot that send button. Once you have done that have a look at your Service Provider application in your browser:

<img src="/img/tutorials/simple-websocket/image15.png"/>

<br/>
<br/>

There you have it, a message sent from a User Client to a Service Provider over the mixnet, creating a simple web application solution in the process.
















    

    





    



   

