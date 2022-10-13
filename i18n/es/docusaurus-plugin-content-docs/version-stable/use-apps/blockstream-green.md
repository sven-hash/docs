---
sidebar_label: "Blockstream Green"
description: "Puedes proteger tus transacciones de Blockstream Green de los fisgones de la red utilizando el mixnet de Nym. Aquí se explica cómo"
hide_title:  false
title: Blockstream Green
---

 

:::note

Es necesario [ejecutar el cliente Nym Socks5](/docs/0.11.0/use-apps/index) antes de seguir las instrucciones de esta página.

:::

[Blockstream Green](https://blockstream.com/green/) es un monedero de BitCoin y Liquid. Como soporta Socks5, puede utilizar Nym. Configura tu proxy en Green de la siguiente manera.

Primero tienes que cerrar la sesión.

A continuación, haz clic en la configuración de la derecha para establecer la URL del proxy:

(/img/docs/wallet-proxy-settings/blockstream-green.gif)

La mayoría de los monederos y otras aplicaciones funcionarán básicamente de la misma manera: encontrar la configuración del proxy de red, introducir la url del proxy (host: **localhost**, puerto: **1080**).

En algunas otras aplicaciones, esto podría escribirse como **localhost:1080** si sólo hay un campo de entrada de proxy.