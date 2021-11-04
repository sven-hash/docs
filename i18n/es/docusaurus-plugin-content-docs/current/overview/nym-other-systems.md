---
sidebar_label: "Nym frente a otros sistemas"
description: "Una comparación de Nym y otros sistemas de privacidad"
hide_title: false
title: Nym frente a otros sistemas
---

 

Nym es el primer sistema que conocemos que proporciona una protección integrada tanto a nivel de red como de transacción a la vez. Creemos que este enfoque sin fisuras ofrece la mejor protección posible de la privacidad, garantizando que nada se pierda entre los sistemas.

La mayoría de los sistemas comparables se concentran en una sola de estas capas a la vez.

### Nym vs VPNs

La solución de privacidad a nivel de red más popular actualmente es la VPN (red privada virtual), que proporciona protección a nivel de red a través de un túnel encriptado entre el ordenador del usuario y uno gestionado por un proveedor de VPN. Sin embargo, las VPN suelen estar mal configuradas e, incluso cuando lo están correctamente, no ofrecen una privacidad real ni una resistencia adecuada a la censura.

Los proveedores de VPN también pueden observar completamente todo el tráfico de red entre los usuarios y la Internet pública, sabiendo exactamente a qué servicios acceden sus usuarios en un momento dado. El usuario debe confiar en que el proveedor de VPN no está utilizando su información de forma maliciosa o guardando registros.

La mixnet de Nym es una red anónima superpuesta que proporciona un fuerte anonimato a nivel de red, incluso frente a potentes sistemas capaces de monitorizar pasivamente toda la red. La mixnet está descentralizada, sin terceros de confianza, por lo que no requiere un proveedor de confianza como una VPN. Y lo que es más importante, Nym proporciona una privacidad superior a la de las VPN y puede soportar una alta calidad de servicio y una baja latencia mediante incentivos.

### Nym vs. Tor

Tor es la red anónima superpuesta más conocida en la actualidad. A diferencia de las VPNs, Tor proporciona un "circuito" de tres saltos que proporciona mejor privacidad que las VPNs de un solo nodo, por lo que cualquier nodo de Tor no puede desanonimizar el tráfico. El enrutamiento de cebolla de Tor encripta el tráfico entre cada salto, de modo que sólo el último salto, el 'nodo de salida' de Tor, puede desencriptar el paquete.

Sin embargo, las propiedades de anonimato de Tor pueden ser derrotadas por una entidad que sea capaz de monitorizar todos los nodos de 'entrada' y 'salida' de la red, porque mientras el enrutamiento-cebolla encripta el tráfico, Tor no añade ofuscación de tiempo o utiliza tráfico señuelo para ofuscar los patrones de tráfico que pueden ser utilizados para desanonimizar a los usuarios. Aunque este tipo de ataques se consideraban irreales cuando se inventó Tor, en la era de las poderosas agencias gubernamentales y empresas privadas, este tipo de ataques son una amenaza real. El diseño de Tor también se basa en una autoridad de directorio centralizada para el enrutamiento.

Mientras que Tor puede ser la mejor solución existente para la navegación web de propósito general que accede a todo Internet, es indiscutible que las mixnets son mejores que Tor para los sistemas de paso de mensajes como las transacciones de criptomonedas y la mensajería segura, y creemos que los incentivos bien diseñados también pueden permitir el uso de Nym como una VPN descentralizada de propósito general. La mixnet de Nym proporciona una privacidad superior haciendo que los paquetes sean indistinguibles unos de otros, añadiendo tráfico de cobertura y proporcionando ofuscación de tiempo. A diferencia de los diseños anteriores de mixnet y de Tor, la Nym mixnet descentraliza sus operaciones compartidas utilizando la tecnología blockchain y utiliza incentivos para escalar y proporcionar resistencia a la censura.

### Nym frente a I2P

I2P ('Invisible Internet Project') sustituye la autoridad de directorio de Tor por una tabla hash distribuida para el enrutamiento. Cómo diseñar una tabla hash distribuida segura y privada es todavía una cuestión de investigación abierta, e I2P está abierto a una serie de ataques que aíslan, desvían o desanonimizan a los usuarios. Al igual que Tor, I2P se basa en la "seguridad por oscuridad", donde se asume que ningún adversario puede vigilar toda la red. Mientras que la seguridad por oscuridad puede haber sido de vanguardia en el cambio de milenio, este enfoque está mostrando rápidamente su edad.
El diseño mixto de vanguardia de Nym garantiza el anonimato de la red y la resistencia a la vigilancia incluso frente a potentes ataques desanonimizadores. A diferencia de I2P, Nym añade tráfico señuelo y ofuscación temporal. En lugar de una autoridad de directorio centralizada o una tabla de hash distribuida, Nym utiliza la tecnología blockchain y los incentivos económicos para descentralizar su red.La Nym mixnet puede anonimizar los metadatos incluso frente a organismos gubernamentales o empresas privadas que pueden vigilar los enlaces de la red y observar el tráfico entrante y saliente de todos los clientes y servidores.

### Nym frente a Facebook Connect
El sistema de credenciales Nym descentraliza las funciones de sistemas como Facebook Connect al tiempo que añade privacidad. Los datos personales se han convertido en un activo tóxico, incluso para las empresas que basan todo su negocio en torno a ellos, como lo demuestra el hackeo del sistema de identidad OAuth de Facebook en 2018 y la posterior liberación de los datos de 50 millones de usuarios.

A diferencia de Facebook Connect y otros servicios similares basados en OAuth, como Sign in with Google, los nombres de usuario y contraseñas tradicionales, o incluso los pares de claves públicas/privadas, las credenciales Nym permiten a los usuarios autenticar y autorizar el intercambio de datos sin revelar involuntariamente ninguna información a un tercero. No hay un tercero central a cargo de las credenciales, y los usuarios siguen teniendo el control total de sus propios datos, revelándolos sólo a quienes ellos quieren. Un usuario puede almacenar sus datos donde quiera (incluso en sus propios dispositivos), y a diferencia de alternativas como los DID del W3C, un usuario no almacena nada en la cadena de bloques, lo que ofrece una mayor privacidad.