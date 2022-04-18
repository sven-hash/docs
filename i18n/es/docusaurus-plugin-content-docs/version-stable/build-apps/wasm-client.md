---
sidebar_label: "Cliente de Webassembly"
hide_title: false
description: "Cómo integrar el cliente Nym webassembly en tus propias aplicaciones para permitir una fuerte privacidad a tus usuarios"
title: Cliente Webassembly
---

 

El cliente Nym webassembly permite que cualquier tiempo de ejecución con capacidad de webassembly construya y envíe paquetes Sphinx a la red Nym.

Puedes instalar [@nymproject/nym-client-wasm](https://www.npmjs.com/package/@nymproject/nym-client-wasm) a través de `npm` desde su página de paquetes, o con:

```
npm i @nymproject/nym-client-wasm
```

El paquete `nym-client-wasm` permite crear fácilmente paquetes de Sphinx desde aplicaciones móviles y aplicaciones cliente basadas en el navegador (incluyendo Electron o similares). Las extensiones del navegador también deberían funcionar.

El cliente webassembly le permite entregar aplicaciones web que construyen y envían paquetes Sphinx únicamente en una ventana del navegador web. Sin embargo, tenga en cuenta que todas las restricciones normales de [almacenamiento de claves basado en el navegador](https://pomcor.com/2017/06/02/keys-in-browser/) y las reglas de mismo origen (que están ahí por una buena razón) hacen que sea difícil estructurar aplicaciones webapps puras de forma segura. Todavía estamos evaluando lo que se puede hacer aquí.

### Construyendo aplicaciones con nym-client-wasm

Hay dos aplicaciones de ejemplo ubicadas en el directorio `clients/webassembly` en la base de código principal de la plataforma Nym. La aplicación `js-example` es una simple aplicación JavaScript. El `react-example` es una aplicación de chat de mejor aspecto hecha en React y Typescript.

#### Inicialización de una nueva identidad Nym

Los principales métodos que usarás del paquete NPM son:

``js
let identity = new Identity();
```

Esto genera una nueva identidad Nym, que consiste en un par de claves públicas/privadas y una dirección de puerta de enlace Nym.

#### Construyendo un cliente Nym

```js
let client = new Client(directoryUrl, identity, authToken);
```

Esto devuelve un Cliente nym que se conecta a una pasarela Nym a través de websocket. Toda la comunicación con la red Nym se realiza a través de este cliente.

El `directoryUrl` de la red Nym es `http://testnet-validator1.nymtech.net:8081`. Utilízalo si quieres conectarte a la red de pruebas en funcionamiento.

#### Ejecutar el cliente Nym

``js
client.start();
```

Esto hará que el cliente recupere una topología de red desde el `directoryUrl` definido, y se conecte a su puerta de enlace vía websocket. El tráfico de cobertura aún no se envía, pero el envío de mensajes debería funcionar tras el inicio del cliente.

#### Envío de mensajes

``js
client.sendMessage(message, recipient) {
```

Envía un mensaje por el websocket a la pasarela Nym de este cliente.

NOTA: el cliente webassembly actualmente no implementa el chunking. Los mensajes de más de ~1KB causarán un pánico. Esto se arreglará en una versión futura.

Por el momento, `message` debe ser una cadena. Los binarios `Blob` y `ArrayBuffer`
serán soportados pronto.

`recipient` es una dirección Nym como cadena.

#### Obtener la dirección del cliente

Dado un cliente, para obtener su dirección, puedes llamar a

``js
client.formatAsRecipient();
```

#### SURBs

Las respuestas anónimas que utilizan surbs todavía no funcionan en el cliente de webassembly. Deberían estar disponibles en la próxima versión.

#### JSON

El envío de JSON es bastante sencillo. Si estás jugando con la aplicación de ejemplo de wasm, sólo tienes que meterlo en la caja de mensajes y enviarlo (o enviarlo programáticamente como el contenido del `mensaje` de `client.sendMessage(message, recipient)` en el código de tu propia aplicación.

#### ¡Piensa en lo que estás enviando!

:::caution
Piensa en la información que envía tu aplicación. Eso va para cualquier cosa que pongas en tus mensajes de paquetes Sphinx, así como lo que el entorno de tu aplicación pueda filtrar.
:::

Siempre que escribas PEAPs de cliente usando HTML/JavaScript, te recomendamos que no cargues recursos externos desde CDNs. Los desarrolladores de aplicaciones web hacen esto todo el tiempo, para ahorrar tiempo de carga de recursos comunes, o simplemente por conveniencia. Pero cuando estás escribiendo aplicaciones de privacidad es mejor no hacer este tipo de peticiones. Empaquetar todo localmente.

Si usted utiliza sólo los recursos locales dentro de su aplicación Electron o sus extensiones del navegador, codificar explícitamente los datos de la solicitud en un paquete Sphinx le protege de la fuga normal que se envía en una solicitud HTTP del navegador. [Hay un montón de cosas que se filtran cuando se hace una solicitud HTTP desde una ventana del navegador](https://panopticlick.eff.org/). Por suerte, todos esos metadatos y la fuga de solicitudes no ocurren en Nym, porque estás eligiendo muy explícitamente qué codificar en los paquetes Sphinx, en lugar de enviar todo un entorno de navegador por defecto.
