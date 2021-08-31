---
título: Solicitantes
peso: 37
descripción: "Ejecuta un proxy de solicitantes en beneficio de la comunidad".
---

:::note

El `nym-network-requester` fue construido en la sección [building nym](/docs/run-nym-nodes/build-nym/). Si aún no has construido Nym y quieres ejecutar el código de esta página, ve allí primero.

:::

Si tienes acceso a un servidor, puedes ejecutar el nym-network-requester, que permite a los usuarios de Nym hacer peticiones de red salientes desde tu servidor. 

El nym-network-requester NO es un proxy abierto. Se entrega con un archivo llamado `allowed.list.sample`, que contiene las URLs utilizadas por los monederos criptográficos Blockstream Green y Electrum. 

## Ejecutar nym-network-requester

Puedes ejecutar el solicitador tú mismo, siguiendo los siguientes pasos. 

En tu servidor, construye Nym. A continuación, ejecuta los siguientes comandos desde el directorio de nivel superior `nym`:

1. `target/release/nym-client init --gateway DiYR9o8KgeQ81woKPYVAu4LNaAEg8SWkiufDCahNnPov --id nym-network-requester-client`.
2. `target/release/nym-client run --id nym-network-requester-client`
3. 'target/release//nym-red-requester run

Esto iniciará un cliente Nym, y el solicitante nym-network-requester se adjuntará a él. 

Anote la dirección del cliente cuando se inicie:

```
 2020-09-10T14:45:50.131 INFO nym_client::client > La dirección de este cliente es: EzvzfN4baf3ULUbAmExQELUWMQry7qVDibSyekR31KE.4khUuTUyYTWiLki3SKbxeG2sP3mwgn9ykBhvtyaLfMdN@DiYR9o8KgeQ81woKPYVAu4LNaAEg8SWkiufDCahNPov
```

Copia la dirección completa (formato `xxx.yyy@zzz`) y guárdala en algún sitio. Puedes usarla tú mismo, dársela a tus amigos, o (si quieres ejecutar un nym-network-requester para toda la red Nym) dárnosla a nosotros y podremos ponerla en la documentación de Nym.

¿Es seguro hacer esto? Si se tratara de un proxy abierto, esto sería inseguro, porque cualquier usuario de Nym podría hacer peticiones de red a cualquier sistema de Internet.

Para hacer las cosas un poco menos estresantes para los administradores, nym-network-requester deja caer todas las peticiones entrantes por defecto. Para que pueda realizar peticiones, es necesario añadir dominios específicos al archivo `allowed.list` en `$HOME/.nym/service-providers/nym-network-requester/allowed.list`.

Si lo desea, puede utilizar simplemente los dominios del archivo `allowed.list` por defecto, ejecutando este comando desde el directorio de código de nivel superior `nym`:

`cp service-providers/nym-network-requester/allowed.list.sample ~/.nym/service-providers/nym-network-requester/allowed.list`.

Estas URLs permitirán las solicitudes de los monederos de criptomonedas Blockstream Green y Electrum, así como el cliente de chat KeyBase.

**IMPORTANTE: Si cambias tu lista de peticiones permitidas, asegúrate de reiniciar nym-network-requester para que recoja la nueva lista de peticiones permitidas.

## Añadir URLs para otros clientes

Sería una pena que Nym estuviera restringido a sólo tres clientes. ¿Cómo podemos añadir soporte para una nueva solicitud? Es bastante fácil de hacer. 

Echa un vistazo en tu directorio de configuración de nym-network-requester:

```
ls $HOME/.nym/service-providers/network-requester/

# devuelve: allowed.list unknown.list
```

Ya sabemos que `allowed.list` es lo que deja pasar las peticiones. Todas las peticiones desconocidas se registran en `unknown.list`. Si quieres probar a usar un nuevo tipo de cliente, simplemente inicia la nueva aplicación, apúntala a tu proxy SOCKS5 local (configurado para usar tu red remota `nym-network-requester`), y sigue copiando las URLs de `unknown.list` en `allowed.list` (puede llevar varios intentos hasta que las consigas todas, dependiendo de la complejidad de la aplicación). 

Si añades soporte para una nueva aplicación, nos encantaría saberlo: háznoslo saber o envía una solicitud de extracción comentada en `allowed.list.sample`.

## Ejecutar un proxy abierto

Si realmente quieres ejecutar un proxy abierto, tal vez con fines de prueba para tu propio uso o entre un pequeño grupo de amigos de confianza, es posible hacerlo. Puedes desactivar las comprobaciones de red pasando la bandera `--open-proxy` cuando lo ejecutes. Si lo ejecutas con esta configuración, lo haces bajo tu propio riesgo. 
