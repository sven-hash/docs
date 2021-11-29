---
sidebar_label: "Privacidad de la red"
description: "Nym asegura la privacidad de la red utilizando paquetes Sphinx encriptados por capas y una red mixta Loopix"
hide_title: false
title: Privacidad de la red
---

 

Cuando se envían datos a través de Internet, pueden ser registrados por una amplia gama de observadores: su ISP, los proveedores de infraestructura de Internet, las grandes empresas de tecnología y los gobiernos.

Incluso si el _contenido_ de una solicitud de red está encriptado, los observadores pueden ver que los datos fueron transmitidos, su tamaño, la frecuencia de transmisión, y reunir metadatos de las partes no encriptadas de los datos (como la información de enrutamiento IP). Los adversarios pueden entonces combinar toda la información filtrada para desanonimizar probabilísticamente a los usuarios.

La charla relámpago de Claudia en la Dappcon 2019 de Berlín ofrece una visión general de la privacidad en la red.

<iframe width="560" height="380" src="https://www.youtube.com/embed/5A378jgYXSc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<br /><br />

El mixnet de Nym ofrece garantías de seguridad muy sólidas contra este tipo de vigilancia. Se _paquetiza_ y _mezcla_ el tráfico IP de muchos usuarios dentro de una _mixnet_: un sistema descentralizado compuesto por muchos _mixnodes_.

Una mixnet puede utilizarse para asegurar sistemas con o sin cadena de bloques. Cosas como los monederos de criptomonedas encajan de forma natural en las mixnets; pero también lo hacen cosas que no son blockchain, como los sistemas de chat, o sistemas para los que se quiere un uso amplio pero con fuertes garantías de privacidad para los usuarios, como las aplicaciones de seguimiento de coronavirus.

Si te gustan las comparaciones, la red mixta Nym es conceptualmente similar a otros sistemas como Tor, pero proporciona protecciones mejoradas contra los ataques de tiempo de extremo a extremo que pueden desanonimizar a los usuarios. Cuando Tor se puso en marcha por primera vez, en 2002, ese tipo de ataques se consideraba ciencia ficción. Pero el futuro ya está aquí.

### Loopix, la red mixta de Nym

Para hacer frente a estas nuevas amenazas, la mixnet Nym reordena los paquetes encriptados e indistinguibles de [Sphinx](https://cypherpunks.ca/~iang/pubs/Sphinx_Oakland09.pdf) a medida que viajan por los mixnodos. Nuestro diseño de mixnet se basa en el [Sistema de Anonimato Loopix](https://arxiv.org/abs/1703.00536), algo modificado para ofrecer mejores garantías de calidad de servicio. Otra de nuestras investigadoras, Ania, es autora del artículo académico de Loopix.

Este breve vídeo muestra a Ania discutiendo en detalle el diseño de la red mixta Loopix en USENix 2017.

<iframe width="560" height="380" src="https://www.youtube.com/embed/R-yEqLX_UvI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>.
<br /><br />

Hay una introducción muy poco técnica a las redes mixtas en la entrada del blog [A Simple Introduction to Mixnets](https://medium.com/nymtech/a-simple-introduction-to-mixnets-6783a103d20e). Pero esta es la explicación resumida.

Supongamos que un adversario parecido a Dios puede observar cada paquete de la red, grabarlo todo y analizarlo todo en tiempo real. ¿Es posible tener comunicaciones privadas en un entorno así? Intuitivamente, la respuesta es no: el adversario puede observar cada paquete mientras viaja por la red, e identificar progresivamente a los usuarios con un alto grado de éxito utilizando técnicas de probabilidad

La Nym mixnet resuelve este problema _mezclando_ los mensajes dentro de los nodos de la red que son opacos al adversario. Cada paquete está encriptado en una capa, y con relleno binario para que sea indistinguible de todos los demás paquetes. Los paquetes entrantes se "mezclan" con todos los demás mensajes dentro del nodo. Es decir, el nodo elimina una capa de encriptación del paquete y añade un pequeño retraso aleatorio en la transmisión, de modo que los mensajes no se emiten en el mismo orden en que llegaron.