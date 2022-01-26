---
sidebar_label: "Visión general de la red"
description: "Una visión general de la arquitectura de la plataforma Nym"
hide_title: false
title: Visión general de la red
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

Actualmente estamos ejecutando una [testnet](https://testnet-milhon-explorer.nymtech.net/) con validadores Nym y mixnodes. Juntos, los validadores y los mixnodes proporcionan un control de acceso integrado y privacidad en la red a los usuarios de la plataforma Nym. Cuentan con la ayuda de otros componentes de la plataforma: varios tipos de clientes y nodos de pasarela.

He aquí una visión general de toda la red.

<ThemedImage
  alt="Diagrama general de la red Nym"
  sources={{
    light: useBaseUrl('/img/docs/nym-platform.png'),
    dark: useBaseUrl('/img/docs/nym-platform-dark.png'),
  }}
/>

La [plataforma Nym](https://github.com/nymtech/nym) incluye mixnodes, validadores, puertas de enlace y código de cliente utilizado para hablar con la red. Todo esto se ejecuta de forma descentralizada y sin confianza.

Los mixnodes proporcionan seguridad de red para el contenido de la red _y_ los metadatos, haciendo imposible ver quién se comunica con quién.

Los validadores aseguran la red con defensas Sybil de prueba de participación, determinan qué nodos están incluidos en la red y trabajan juntos para crear credenciales de umbral de coco que proporcionan acceso anónimo a los datos y recursos.

Los nodos de la pasarela actúan como almacén de mensajes para los clientes que pueden desconectarse y volver a conectarse, y se defienden de los ataques de denegación de servicio.

Pero la plataforma Nym (azul) es sólo infraestructura. La parte interesante son las aplicaciones mejoradas de privacidad (amarillo) que pueden ser creadas por desarrolladores de privacidad o enganchadas a la red para aplicaciones existentes. Hemos incluido algunos ejemplos (ficticios) de cosas que creemos que la gente podría construir o integrar. Lee nuestros documentos y usa tu imaginación, ¡y puede que se te ocurran muchos más!

Las aplicaciones mejoradas con Nym pueden

- mejorar las propiedades de privacidad de las aplicaciones existentes, como carteras criptográficas, VPNs, sistemas de pago, chat, registros médicos, blockchains, intercambios, mercados, DAOs u otros sistemas de asignación.
- Permitir tipos de aplicaciones completamente nuevos construidos desde cero con la privacidad en su núcleo.

Las aplicaciones se comunican con la red Nym conectándose a los nodos de la pasarela. Las aplicaciones pueden estar en línea y fuera de línea; la pasarela proporciona una especie de buzón donde las aplicaciones pueden recibir sus mensajes.

Hay dos tipos básicos de aplicaciones con privacidad mejorada:
1. Aplicaciones orientadas al usuario que se ejecutan en dispositivos móviles o de escritorio. Éstas suelen exponer una interfaz de usuario (UI) a un usuario humano. Puede tratarse de aplicaciones existentes, como carteras de criptomonedas que se comunican con Nym a través de nuestro proxy SOCKS5, o de aplicaciones totalmente nuevas.
2. 2. Proveedores de servicios, que normalmente se ejecutan en un servidor y realizan acciones en nombre de los usuarios sin saber quiénes son.

Los proveedores de servicios (SP) pueden interactuar con sistemas externos en nombre de un usuario. Por ejemplo, un SP puede enviar una transacción de Bitcoin, Ethereum o Cosmos, hacer una solicitud de red por proxy, hablar con un servidor de chat o proporcionar acceso anónimo a un sistema médico como un [rastreador de coronavirus de privacidad](https://constructiveproof.com/posts/2020-04-24-coronavirus-tracking-app-privacy/).

También existe una categoría especial de proveedores de servicios, a saber, los SP que no interactúan visiblemente con ningún sistema externo. Se podría pensar en ellas como cripto-utopiapps: están haciendo algo, pero no es posible desde fuera decir con certeza cuál es su función, o quién está interactuando con ellas.

Todas las aplicaciones hablan con los nodos de la pasarela Nym utilizando paquetes Sphinx y un pequeño conjunto de mensajes de control sencillos. Estos mensajes se envían a las pasarelas a través de websockets. Cada cliente de la aplicación tiene una relación de larga duración con su pasarela; Nym define los mensajes para que los clientes se registren y autentifiquen con las pasarelas, así como para enviar paquetes Sphinx cifrados.

Actualmente nos centramos en proporcionar privacidad a los sistemas de cadenas de bloques. Pero nuestras ambiciones son más amplias. A medio plazo, estamos trabajando activamente para reunir una serie de nuevas tecnologías que puedan permitir una privacidad sólida para todo Internet. En los últimos 15 años no ha habido muchas nuevas tecnologías de privacidad ampliamente adoptadas para ayudar a los usuarios de Internet. Estamos trabajando duro para cambiar esta situación.

### Estado actual

Mixnet y los validadores ya funcionan.

Las API de Mixnet se han estabilizado en su mayor parte, y en este momento es posible empezar a crear aplicaciones.

Los validadores ya funcionan en su forma más básica. Más adelante, los validadores también generarán credenciales de coco.

Actualmente existe un cliente nativo de mixnet escrito en Rust. Se ejecuta de forma autónoma en ordenadores de sobremesa o servidores. Puedes utilizarlo para conectar aplicaciones de escritorio o servidor a la red Nym, utilizando cualquier lenguaje que hable de websockets.

También existe un cliente webassembly. Los clientes webassembly se pueden utilizar dentro de los navegadores o aplicaciones móviles, y de nuevo se comunican con las pasarelas a través de websockets. El cliente webassembly no está completo (todavía no envía tráfico de cobertura), pero está funcionando hasta un punto en el que deberías poder utilizarlo para el desarrollo de aplicaciones. El tráfico de cobertura, cuando esté configurado, se producirá de forma transparente y no deberías tener que preocuparte por ello como desarrollador de aplicaciones Nym.

Por último, un cliente y proveedor de servicios SOCKS5 (llamado nym-network-requester) facilita la adaptación de carteras de criptomonedas y otras aplicaciones existentes compatibles con SOCKS para utilizar la infraestructura de privacidad Nym.

En las próximas secciones, veremos la privacidad de la red y la privacidad del acceso con más detalle.