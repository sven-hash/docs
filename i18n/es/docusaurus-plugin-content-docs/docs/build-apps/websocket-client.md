---
sidebar_label: "Cliente Websocket"
hide_title: false
description: "Cómo ejecutar el cliente de websocket Nym en una máquina de escritorio o servidor"
title: Cliente Websocket
---

 

:::note

El cliente Websocket Nym fue construido en la sección [building nym](/docs/0.11.0/run-nym-nodes/build-nym/). Si aún no has construido Nym y quieres ejecutar el código de esta página, ve allí primero.

:::

Desde dentro del directorio `nym`, el binario `nym-client` se ha construido en el directorio `./target/release/`. Puedes ejecutarlo así (o añadirlo a tu `$PATH`):

`./nym-client`

```
nym@localhost:~$ ./nym-client


      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (client - version 0.11.0 )



usage: --help to see available options.


```

Hay dos comandos que puede emitir al cliente.

1. `init` - inicializa una nueva instancia de cliente. Requiere el parámetro `--id clientname`.
2. `run` - ejecuta un proceso de cliente mixnet. Requiere el parámetro `--id nombredelcliente`.

### Inicialización de una nueva instancia de cliente

Antes de poder utilizar el cliente, es necesario inicializar una nueva instancia del mismo. Cada instancia del cliente tiene su propio par de claves públicas/privadas, y se conecta a su propio nodo de entrada. En conjunto, estas tres cosas (par de claves públicas/privadas + nodo de puerta de enlace) conforman la identidad de una aplicación.

La inicialización de una nueva instancia de cliente puede hacerse con el siguiente comando:

```
./nym-client init --id alice
```

Cuando se inicializa una instancia de cliente, se genera un directorio de configuración que se almacena en `$HOME_DIR/.nym/clients/<nombre-del-cliente>/`.

```
nym@localhost:~$ tree ~/.nym/clients/alice/
/home/dave/.nym/clients/alice/
├── config
│ └── config.toml
└── datos
    ├── private_identity.pem
    └── public_identity.pem
```

El archivo `config.toml` contiene las opciones de configuración del cliente, mientras que los dos archivos `pem` contienen la información de la clave del cliente.

Los archivos generados contienen el nombre del cliente, los pares de claves públicas/privadas y la dirección de la pasarela. El nombre `alice` en el ejemplo anterior es sólo un identificador local para que puedas nombrar a tus clientes; nunca se transmite por la red.

### Ejecución del cliente nativo

Puedes ejecutar el cliente `alice` haciendo lo siguiente:

```
./nym-client run --id alice
```

Cuando ejecutas el cliente, inmediatamente empieza a generar tráfico de cobertura (falso) y a enviarlo a la red de pruebas de Nym.

¡Enhorabuena, acabas de contribuir con un poquito de privacidad al mundo! Para detener el cliente, pulse la tecla `<CTRL-C>`.

Cuando el cliente se inicia por primera vez, se pondrá en contacto con los validadores de la red Nym y obtendrá una lista de nodos Nym disponibles (puertas de enlace, mixnodes y validadores). A esta lista de nodos la llamamos _topología_ de la red. El cliente hace esto para saber cómo conectarse, registrarse en la red y saber a través de qué mixnodes puede enrutar los paquetes Sphinx.

Una vez que el cliente ha obtenido la topología de la red, envía automáticamente una solicitud de registro a una de las primeras pasarelas disponibles. La pasarela devuelve un token de autenticación único que el cliente adjunta a cada solicitud posterior a la pasarela.

#### Conexión al websocket local

El cliente nativo de Nym expone una interfaz de websocket a la que su código se conecta. Para programar tu aplicación, elige una biblioteca de websocket para el lenguaje que estés utilizando. El puerto de websocket por defecto es `1977`, puedes anularlo en la configuración del cliente si lo deseas.

### Un simple ejemplo peap

Vamos a escribir algo de código. A veces, cuando estás aprendiendo algo nuevo, es más fácil ver un ejemplo corto que funcione. Aquí hay una simple aplicación escrita en Python. Este ejemplo está empaquetado con la plataforma Nym, busca en el directorio `python-examples` dentro de `clients/native`.

``python
importar asyncio
importar json
importar websockets

self_address_request = json.dumps({"type": "selfAddress"})


async def send_text():
    message = "¡Hola Nym!"

    uri = "ws://localhost:1977"
    async con websockets.connect(uri) como websocket:  # 1
        await websocket.send(self_address_request)
        self_address = json.loads(await websocket.recv())
        print("nuestra dirección es: {}".format(self_address["address"]))

        text_send = json.dumps(
            { # 2
                "tipo": "enviar",
                "mensaje": mensaje,
                "destinatario": self_address["dirección"],
            }
        )

        print("enviando '{}' por la red mixta...".format(mensaje))
        await websocket.send(text_send) # 3
        msg_send_confirmation = json.loads(await websocket.recv())  # 4
        assert msg_send_confirmation["type"], "send"

        print("esperando recibir un mensaje de la red mixta...")
        received_message = await websocket.recv() # 5
        print("¡recibido {} de la red mixta!".format(mensaje_recibido))


asyncio.get_event_loop().run_until_complete(send_text())
```

El código Python hace lo siguiente

1. se conecta al websocket en el puerto 1977
2. formatea un mensaje para enviarlo. Los mensajes Nym tienen formatos JSON definidos.
3. envía el mensaje al websocket. El cliente nativo empaqueta el mensaje en un paquete Sphinx y lo envía al mixnet
4. espera la confirmación de que el mensaje ha llegado al cliente nativo
5. espera a recibir mensajes de otras aplicaciones Nym

Variando el contenido del mensaje, se pueden construir fácilmente sofisticadas aplicaciones de Proveedor de Servicios. Por ejemplo, en lugar de `print("¡recibido {} de la red mixta!".format(mensaje_recibido))` tu Proveedor de Servicios podría realizar alguna acción en nombre del usuario - tal vez iniciar una solicitud de red, una transacción de blockchain, o escribir en un almacén de datos local.

### Tipos de mensajes

Hay un pequeño número de mensajes que su aplicación envía por el websocket para interactuar con el cliente nativo, como sigue.

#### Envío de texto

Si quieres enviar información de texto a través del mixnet, formatea un mensaje como este y mételo en el websocket:

```json
{
  "type": "enviar",
  "mensaje": "el mensaje",
  "recipient_address": "71od3ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm"
}
```

En algunas aplicaciones, por ejemplo, en las que la gente chatea con amigos que conoce, es posible que desee incluir información de respuesta no cifrada en el campo del mensaje, de este modo

```json
{
  "type": "enviar",
  "mensaje": {
    "remitente": "198427b63ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm",
    "chatMessage": "¡Hola Julia!"
  },
  "recipient_address": "71od3ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm"
}
```

Esto proporciona una manera fácil para que el chat de recepción para luego dar la vuelta y enviar un mensaje de respuesta:

```json
{
  "type": "enviar",
  "mensaje": {
    "remitente": "71od3ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm",
    "chatMessage": "¡Winston, es un placer saber de ti! ¿Nos vemos en la tienda de antigüedades?"
  },
  "recipient_address": "198427b63ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm"
}
```

Si eso se ajusta a su modelo de seguridad, bien. Sin embargo, puede darse el caso de que quieras enviar respuestas anónimas utilizando bloques de respuesta de uso único, o _surbs_. Estos estarán disponibles en la próxima versión de Nym (0.11.0).

#### Envío de datos binarios

*Los enlaces proporcionados hacen referencia a una determinada versión de Nym, por favor busca las versiones actualizadas de las partes de código referenciadas si tienes algún problema.
si tienes algún problema.*

También puedes enviar bytes en lugar de JSON. Para ello tienes que enviar una trama binaria de websocket que contenga una codificación binaria
Nym [`ClientRequest`](https://github.com/nymtech/nym/blob/6f8ae53f0c47aa82b14e96bc313f47643c505063/clients/native/websocket-requests/src/requests.rs#L36).
Para conocer la codificación correcta, consulta la [implementación de referencia de rust](https://github.com/nymtech/nym/blob/6f8ae53f0c47aa82b14e96bc313f47643c505063/clients/native/websocket-requests/src/requests.rs#L216)
ya que es probable que cambie en el futuro.

Como respuesta el `native-client` enviará un `ServerResponse`, que puede ser decodificado de manera similar, por favor consulte
a la [implementación de rust](https://github.com/nymtech/nym/blob/6f8ae53f0c47aa82b14e96bc313f47643c505063/clients/native/websocket-requests/src/responses.rs#L286)
para más detalles.

Un proyecto de ejemplo de la comunidad Nym que utiliza la API binaria es [BTC-BC](https://github.com/sgeisler/btcbc-rs/): Transmisión de transacciones de Bitcoin a través de Nym, cliente y proveedor de servicios escrito en Rust.

#### Recepción de mensajes

Cuando otra persona te envía un mensaje, toda la información extraña es eliminada y sólo recibes el mensaje. Así que si una aplicación envía el siguiente mensaje

```json
{
  "tipo": "send",
  "mensaje": "2 + 2 = 4",
  "recipient_address": "71od3ZAupdCdxeFNg8sdonqfZTnZZy1E86WYKEjxD4kj@FWYoUrnKuXryysptnCZgUYRTauHq4FnEFu2QGn5LZWbm"
}
```

El usuario receptor sólo recibirá `2 + 2 = 4`.

#### Obtener su propia dirección

A veces, cuando inicias tu aplicación, puede ser conveniente pedirle al cliente nativo que te diga cuál es tu propia dirección (desde los archivos de configuración guardados). Para ello, envía

```json
{
  "type": "selfAddress"
}
```

Obtendrás de vuelta:

``json
{
  "type": "selfAddress",
  “Address": "the-address"
}
```

#### Mensajes de error

Los errores del cliente de la aplicación, o de la pasarela, se enviarán por el websocket a tu código en el siguiente formato:

```json
{
  "type": "error",
  "mensaje": "mensaje de cadena"
}
```