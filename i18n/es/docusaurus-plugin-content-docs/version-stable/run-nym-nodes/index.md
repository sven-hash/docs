---
sidebar_label: "Ejecutar nodos Nym"
description: "Cómo construir la plataforma Nym. Nym es relativamente sencillo de construir y ejecutar en Mac OS X, Linux y Windows."
hide_title:  false
title: Ejecutar los nodos Nym
---

 

### Instalación de los binarios preconstruidos

La [página de publicación] de Nym (https://github.com/nymtech/nym/releases) tiene binarios precompilados que _deberían_ funcionar en Ubuntu 20.04 y otros sistemas basados en Debian, pero en esta etapa no se puede garantizar que funcionen en todas partes.

Más adelante, cuando nos centremos más en cosas como el empaquetado, nos aseguraremos de que todos los componentes se construyan para todos los sistemas operativos. Hay un script de instalación de terceros que puede encontrarse [aquí](https://github.com/gyrusdentatus/nym_autoinstall), aunque puede que no esté siempre actualizado con la versión más reciente de la red de pruebas.

Si los binarios preconstruidos no funcionan o no están disponibles para su sistema, tendrá que construir la plataforma usted mismo.

### Construcción de Nym

Nym tiene dos bases de código principales:

- la plataforma Nym ([build instructions](build-nym)), escrita en Rust. Contiene todo nuestro código _excepto_ los validadores.
- Los validadores de Nym ([instrucciones de construcción](validators)), escritos en Go.
