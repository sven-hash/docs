---
sidebar_label: "Use Apps"
description: "Tutoriales para construir aplicaciones mejoradas de privacidad (o integrar apps existentes con Nym)"
hide_title:  false
title: Usar aplicaciones con Nym
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

:::note

El cliente SOCKS5 de Nym fue construido en la sección [building nym](/docs/0.11.0/run-nym-nodes/build-nym/). Si aún no has construido el cliente Nym y quieres ejecutar el código de esta página, ve allí primero.

:::


Nym es un sistema de propósito general. Nuestro objetivo es proporcionar la mayor protección posible para el tráfico y las transacciones en Internet.

El sistema es todavía muy joven, pero está empezando a ser capaz de hacer un trabajo útil. Puede empezar a utilizarlo hoy mismo.

Muchas aplicaciones existentes pueden utilizar el protocolo proxy SOCKS5. Pueden utilizar el `nym-socks5-client` para hacer rebotar su tráfico de red a través de la red Nym, de esta manera:

<!--[Architecture Socks5](/img/docs/nym-socks5-architecture.png) -->
<ThemedImage
  alt="Diagrama general de la red Nym"
  sources={{
    light: useBaseUrl('/img/docs/nym-socks5-architecture.png'),
    dark: useBaseUrl('/img/docs/nym-socks5-architecture-dark.png'),
  }}
/>

La red Nym ya ejecuta el mixnet, y los componentes `nym-network-requester` y `nym-client`. Para utilizar las aplicaciones existentes con Nym, sólo es necesario configurar el `nym-socks5-client`.

Ten en cuenta que la nym-network-requester que estamos ejecutando sólo funciona para aplicaciones específicas. No estamos ejecutando un proxy abierto, tenemos una lista permitida de aplicaciones que pueden utilizar la red mixta (actualmente Blockstream Green, Electrum y KeyBase). Podemos añadir otras aplicaciones a petición, sólo tienes que  hablar con nosotros en nuestro chat de desarrollo. O, puedes [configurar tu propio](/docs/0.11.0/run-nym-nodes/requester) `nym-network-requester`, no es muy difícil de hacer si tienes acceso a un servidor.

El proxy Nym SOCKS5 se ejecuta en tu máquina local y expone un proxy de red SOCKS5 en un puerto. Puedes utilizarlo como lo harías con cualquier otro proxy SOCKS5: añades la dirección del proxy en la configuración del proxy de una aplicación, y todo tu tráfico TCP se enruta a través del mismo. Esto hace que sea la forma más fácil de habilitar una fuerte privacidad de red en las aplicaciones existentes, ya que muchas aplicaciones ya soportan SOCKS5 de forma inmediata. En este sentido, es muy similar a otros proxies SOCKS.

Sin embargo, el proxy Nym SOCKS5 hace algo bastante interesante y diferente. En lugar de simplemente copiar datos entre flujos TCP y hacer peticiones directamente desde la máquina en la que se está ejecutando, hace lo siguiente:

* toma un flujo de datos TCP, por ejemplo, una solicitud de una cartera criptográfica
* Corta el flujo TCP en múltiples paquetes Sphinx, asignándoles números de secuencia, mientras deja la conexión TCP abierta para más datos.
* envía los paquetes Sphinx a través de la red mixta a un solicitante de la red nym. Los paquetes se barajan y mezclan mientras transitan por la mixnet.
* nym-network-requester reensambla el flujo TCP original utilizando los números de secuencia, y realiza la solicitud prevista.
* A continuación, nym-network-requester realiza todo el proceso a la inversa, troceando la respuesta en paquetes Sphinx y enviándola de nuevo a través de la mixnet al monedero criptográfico.
# La billetera criptográfica recibe sus datos, sin siquiera notar que no estaba hablando con un proxy SOCKS5 "normal".

## Ejecutando el nym-socks5-client

:::caution
**Atencion obligatoria sobre responsabilidad :** La red mixta Nym está todavía en construcción y no ha sido sometida a una auditoría de seguridad. No confíes en él para obtener una privacidad fuerte (todavía).
:::

Después de construir el código de la plataforma Nym, iniciaza el cliente:

```
nym-socks5-client init --id my-socks5-client --provider AFB7kzofcDSJ1feEJsfHE5uxq4wJecLz8MkWVywAzMCu.DZex1uSmS5iLxbc1zR96T1dDs9Wmi8ko7qjX4ACCTYQR@8yGFbT5feDpPmH66TveVjonpUn3tpvjobdvEWRbsTH9i
```

El campo `--provider` debe rellenarse con la dirección Nym de un `nym-network-requester` que pueda realizar peticiones de red en su nombre. La dirección del ejemplo anterior es una de las que estamos ejecutando actualmente para la Milhon Testnet, pero también puedes [ejecutar la tuya] (/docs/0.11.0/run-nym-nodes/requester/) si lo deseas.

Luego ejecuta el cliente socks5 localmente:

```
nym-socks5-client run --id my-socks5-client
```

Esto iniciará un proxy SOCKS5 en tu máquina local, en `localhost:1080`.

En las próximas secciones, mostraremos cómo ejecutarlo con algunas aplicaciones existentes. Más adelante, discutiremos cómo puedes usar cualquier aplicación que pueda usar SOCKS5 con Nym.