---
sidebar_label: "Introducción"
hide_title:  false
description: "Tutoriales para construir aplicaciones con privacidad mejorada (o integrar las apps existentes con Nym)"
title: Construir aplicaciones Nym
---

import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';


Si eres un programador, te invitamos a construir **aplicaciones que respeten la privacidad** utilizando Nym.

Nym te permite construir clientes y servicios que respetan la privacidad y que utilizan nuestra infraestructura de red. Tus aplicaciones pueden conectarse a otras aplicaciones que también utilizan la red Nym. Toda la comunicación entre aplicaciones se realiza a través de un conjunto de nodos de red que cooperan entre sí, llamado mixnet.

Las mixnets ofrecen fuertes garantías de privacidad frente a terceros observadores.

Para cualquier adversario externo a la red es evidente que una determinada máquina se ha conectado a la infraestructura Nym. Más allá de eso, no debería ser posible inferir qué actividad está teniendo lugar a menos que haya efectos secundarios de red observables (es decir, un proveedor de servicios que hace peticiones de red en nombre de un cliente Nym).

Entraremos en los detalles técnicos más profundamente en las próximas secciones, pero antes de eso, echemos un vistazo a los pasos involucrados en la construcción y uso de una aplicación simple.

### Inicialización

Primero, necesitamos inicializar una aplicación y conectarla a Nym.

<!-- ![send to gateway](/img/docs/application-flow/send-to-gateway.png) -->
<ThemedImage
  alt="Mensaje a la pasarela"
  sources={{
    light: useBaseUrl('/img/docs/application-flow/send-to-gateway.png'),
    dark: useBaseUrl('/img/docs/application-flow/send-to-gateway-dark.png'),
  }}
/>

En la parte inferior tenemos una aplicación. Consta de dos partes:

1. La lógica específica de tu aplicación (que escribes en cualquier lenguaje que tenga sentido: Python, Go, C#, Java, JavaScript, Haskell, etc) en amarillo
2. El código del cliente Nym en azul

Las aplicaciones Nym tienen una relación estable y potencialmente duradera con un tipo de nodo Nym conocido como puerta de enlace. Una aplicación se registra en una pasarela y recibe un token de autenticación que puede utilizar para recuperar mensajes de la pasarela.

Las pasarelas cumplen varias funciones:

- actúan como un almacén de mensajes encriptados de extremo a extremo en caso de que tu aplicación se desconecte.
- envían paquetes encriptados para destinatarios potencialmente desconectados, con el fin de garantizar una entrega fiable de los mensajes
- ofrecen una dirección estable para las aplicaciones, aunque la IP pueda cambiar con frecuencia

### Direcciones Nym

Cuando la aplicación se inicializa, genera y almacena su propio par de claves públicas/privadas localmente. Cuando la aplicación se inicia, se conecta automáticamente a la red Nym y averigua qué infraestructura Nym existe. A continuación, elige y se conecta a un nodo de la pasarela Nym a través de un websocket.

Por lo tanto, todas las aplicaciones de la red Nym tienen una dirección, con el formato `clave-identidad-usuario.clave-cifrado-usuario@clave-identidad-pasarela`. Los clientes imprimen su dirección al iniciarse.

Nuestra aplicación conoce su propia dirección, porque conoce su propia clave pública y la dirección de su pasarela.

### Enviando mensajes a nosotros mismos

La parte del cliente nym de la aplicación (en azul) acepta los mensajes de tu código (en amarillo), y los convierte automáticamente en paquetes Sphinx encriptados por capas. Si el mensaje es demasiado grande para que quepa en un paquete Sphinx, se dividirá en varios paquetes con un número de secuencia para garantizar un reensamblaje automático fiable del mensaje completo cuando llegue al destinatario.

La aplicación se ha conectado a la puerta de enlace, pero no hemos enviado un mensaje a nosotros mismos todavía. Hagámoslo ahora.


<ThemedImage
  alt="Envío de mensaje a uno mismo"
  sources={{
    light: useBaseUrl('/img/docs/application-flow/simplest-request.png'),
    dark: useBaseUrl('/img/docs/application-flow/simplest-request-dark.png'),
  }}
/>

Supongamos que tu código introduce un mensaje `hola world` en el cliente nym. El cliente nym automáticamente envuelve ese mensaje en un paquete Sphinx encriptado por capas, añade alguna información de enrutamiento y encriptación, y lo envía a su propia pasarela. La puerta de enlace quita la primera capa de encriptación, terminando con la dirección del primer mixnode al que debe reenviar, y un paquete Sphinx.

La pasarela reenvía el paquete Sphinx que contiene el mensaje "Hola mundo". Cada nodo mixto reenvía a su vez al siguiente nodo mixto. El último nodo mixto reenvía a la puerta de enlace del destinatario (en este caso, nuestra propia puerta de enlace, ya que estamos enviando a nosotros mismos).

Es de suponer que nuestra aplicación no se ha desconectado en el poco tiempo transcurrido desde que se envió el mensaje. Así que cuando la pasarela recibe el paquete, lo descifra y envía el contenido (cifrado) de vuelta a nuestra aplicación.

El cliente nym dentro de la aplicación descifra el mensaje, y su código recibe el mensaje "hola mundo", de nuevo como un evento websocket.

Los mensajes están cifrados de extremo a extremo. Aunque la pasarela conoce la IP de nuestra aplicación cuando se conecta, no puede leer nada del contenido del mensaje.

### Envío de mensajes a otras aplicaciones

El proceso para enviar mensajes a otras aplicaciones es exactamente el mismo, simplemente se especifica una dirección de destinatario diferente. El descubrimiento de la dirección ocurre fuera del sistema Nym: en el caso de una aplicación de proveedor de servicios, el proveedor de servicios presumiblemente ha anunciado su propia dirección. Si estás enviando a un amigo tuyo, tendrás que conseguir su dirección fuera de la banda, quizás a través de una app de mensajería privada como Signal.


<ThemedImage
  alt="Envío de mensaje a un PEAP"
  sources={{
    light: useBaseUrl('/img/docs/application-flow/sp-request.png'),
    dark: useBaseUrl('/img/docs/application-flow/sp-request-dark.png'),
  }}
/>

### Clientes frente a proveedores de servicios

Esperamos que las aplicaciones se clasifiquen en una de las dos grandes categorías siguientes

- aplicaciones cliente
- Proveedores de servicios

Las aplicaciones cliente exponen una interfaz de usuario para que los usuarios interactúen con Nym. Normalmente se ejecutarán en dispositivos de usuario, como ordenadores portátiles, teléfonos o tabletas.

Los proveedores de servicios, en cambio, se ejecutan generalmente en máquinas servidoras. La mayoría de los Proveedores de Servicios funcionarán las 24 horas del día y realizarán acciones en nombre de las aplicaciones cliente anónimas conectadas a la red mixta.

### Respuestas privadas mediante surbs

Los surbs permiten a las aplicaciones responder a otras aplicaciones de forma anónima.

A menudo se dará el caso de que una aplicación cliente quiera interactuar con una aplicación del Proveedor de Servicios. El propósito de todo el sistema es que la aplicación cliente tenga que revelar su propia clave pública de la puerta de enlace y la clave pública del cliente para obtener una respuesta del proveedor de servicios.

Por suerte, existen los bloques de respuesta de uso único, o _surbs_.

Un surb es un conjunto de cabeceras Sphinx encriptadas por capas que detallan una ruta de respuesta que termina en la dirección de la aplicación original. Los surbs son encriptados por el cliente, por lo que el proveedor de servicios puede adjuntar su respuesta y enviar de vuelta el paquete Sphinx resultante, pero nunca tiene la vista de quién está respondiendo.

### Aplicaciones Offline / Online

Si un mensaje llega a una dirección de la pasarela pero la aplicación está desconectada, la pasarela almacenará los mensajes para su posterior entrega. Cuando la aplicación del destinatario vuelva a estar en línea, descargará automáticamente todos los mensajes y los eliminará del disco de la pasarela.

Si una aplicación está en línea cuando llega un mensaje para ella, el mensaje se envía automáticamente a la aplicación a través del websocket, en lugar de almacenarse en el disco de la pasarela.