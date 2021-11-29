---
sidebar_label: "Incentivos"
description: "¿Por qué deberías ejecutar los nodos Nym?"
hide_title: false
title: Incentivos
---

 

En la siguiente sección entraremos en la construcción del código base de Nym y en la ejecución de los nodos. Antes de hacerlo, una nota sobre los incentivos de los tokens.

La red Nym tiene algunos de los mismos objetivos generales que [Tor](https://tor-project.org). Pero queremos permitir que Nym escale en respuesta al aumento de la demanda (y que se reduzca cuando la demanda caiga, para no desperdiciar recursos). Para hacerlo de forma descentralizada, se incluyen nodos en la red basados en la vinculación de criptomonedas, y un sistema de estacas delegadas.

Ahora estamos empezando a probar la estructura de incentivos para el funcionamiento de los nodos Nym. Para la red de prueba de Milhon, los titulares de carteras de la red de prueba Nym que ejecuten nodos o deleguen la participación en nodos recibirán tokens de la red de prueba (sin valor), el `PUNK`, que se ejecuta en nuestros validadores de blockchain basados en Cosmos.

:::caution
La estructura de las recompensas de los tokens estará en fase de experimentación durante el transcurso de Milhon, y las modificaremos con bastante frecuencia para realizar experimentos y obtener la opinión de la comunidad. **Las recompensas de Milhon Testnet pueden no reflejar cómo funcionará la estructura de incentivos en la red principal.
:::

Para obtener los `PUNKs` necesarios para ejecutar un nodo o delegar en uno en la testnet, necesitarás:

* El id de Telegram con el que te registraste a través del bot Nym en la testnet de Finney.
* La clave de identidad de tu nodo Finney. 
* La dirección de la cartera HAL con la que vinculaste HALs a tu mixnode. 

La cantidad inicial de `PUNKs` que recibes en Milhon depende de la cantidad de `HALs` que recibiste durante el transcurso de la testnet Finney, una vez hecho esto cerraremos el libro de `HALs` y no volveremos a visitarlo. Así que piensa en Milhon como una continuación de Finney pero con diferentes nombres de fichas. 

Si tienes los 3 elementos mencionados anteriormente, puedes dirigirte al [monedero web de Milhon](https://testnet-milhon-wallet.nymtech.net/) y crear una dirección de monedero `PUNK` para ti. Asegúrate de copiar, pegar y guardar el mnemónico de esa cuenta en algún lugar seguro y no lo pierdas.

Si por alguna razón pierdes tu mnemónico después de que los fondos hayan sido enviados a esa dirección, esos fondos se pierden y no serán reenviados. 

Sólo podrás convertir la cantidad de `HALs` que tengas en tu bono del nodo Finney (lo que se muestra en el explorador) más hasta 60 que tengas en la cartera de la dirección conectada a tu mixnode. 
