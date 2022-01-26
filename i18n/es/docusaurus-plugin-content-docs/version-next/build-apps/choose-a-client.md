---
sidebar_label: "Elige un cliente"
hide_title: false
description: "Hay múltiples tipos de cliente Nym. Cada uno es útil en diferentes situaciones. Aquí te explicamos cómo elegir"
title: "Elige un cliente"
---

 

En la sección anterior, obtuvimos una visión general del flujo de la aplicación cuando estás construyendo aplicaciones con Nym. Ahora es el momento de entender un poco cómo estructurar tu aplicación eligiendo un cliente Nym.

### Entender los clientes Nym

Una gran parte de la funcionalidad de Nym mixnet se implementa del lado del cliente, incluyendo:

* determinar la topología de la red - qué mixnodes existen, cuáles son sus claves, etc.
* Registro en una puerta de enlace
* autenticación en una puerta de enlace
* recibir y descifrar mensajes de la pasarela
* Creación de paquetes Sphinx encriptados por capas
* envío de paquetes Sphinx con mensajes reales
* envío de paquetes Sphinx _tráfico encubierto_ cuando no se están enviando mensajes reales

En las siguientes secciones discutiremos cómo integrar los clientes Nym en tus aplicaciones.

### Tipos de clientes Nym

En la actualidad, existen tres clientes Nym

- el cliente nativo
- el cliente [webassembly](https://webassembly.org/)
- el cliente SOCKS5

Tienes que elegir cuál quieres incorporar a tu aplicación. El que utilices dependerá en gran medida de tu estilo de programación preferido y del propósito de tu aplicación.

#### El cliente websocket

Tu primera opción es el cliente websocket (`nym-client`). Es un programa compilado que puede ejecutarse en máquinas Linux, Mac OS X y Windows. Se ejecuta como un proceso persistente en una máquina de escritorio o servidor. Puedes conectarte a él desde cualquier lenguaje que soporte websockets.

#### El cliente webassembly

Si trabajas en JavaScript o construyes una aplicación [edge computing](https://en.wikipedia.org/wiki/Edge_computing), es probable que quieras elegir el cliente webassembly. Esperamos que muchas aplicaciones cliente se construyan utilizando el cliente webassembly. Está empaquetado y [disponible en el registro npm](https://www.npmjs.com/package/@nymproject/nym-client-wasm), así que puedes `npm install` en tu aplicación JavaScript o TypeScript.

#### El cliente SOCKS5

Este cliente es útil para permitir que las aplicaciones existentes utilicen la red mixta de Nym sin ningún cambio de código. Todo lo que se necesita es que puedan utilizar el protocolo proxy SOCKS5 (lo que muchas aplicaciones pueden hacer - carteras de criptomonedas, navegadores, aplicaciones de chat, etc). Es menos flexible como forma de escribir aplicaciones personalizadas que los otros clientes.

### Puntos en común entre los clientes

Todos los paquetes de clientes Nym presentan básicamente las mismas capacidades para el desarrollador de aplicaciones de privacidad. Necesitan ejecutarse como un proceso persistente para mantenerse conectados y listos para recibir cualquier mensaje entrante de sus nodos de puerta de enlace. Se registran y autentifican en las pasarelas, y encriptan los paquetes Sphinx.
