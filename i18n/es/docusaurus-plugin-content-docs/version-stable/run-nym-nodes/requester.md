---
sidebar_label: Solicitantes
description: "Ejecutar un proxy de solicitantes en beneficio de la comunidad"
hide_title: false
title: Solicitante 
---

 

:::note

El solicitante de red Nym fue construido en la sección [building nym](/docs/0.11.0/run-nym-nodes/build-nym/). Si aún no has construido Nym y quieres ejecutar el código de esta página, ve allí primero.

:::


Si tienes acceso a un servidor, puedes ejecutar el nym-network-requester, que permite a los usuarios de Nym hacer peticiones de red salientes desde tu servidor.

El nym-network-requester NO es un proxy abierto. Se entrega con un archivo llamado `allowed.list.sample`, que contiene las URLs utilizadas por los monederos criptográficos Blockstream Green y Electrum.

### Ejecutando su cliente nym 

Antes de inicializar tu nym-network-requester, debes inicializar una instancia del binario nym-client para que escuche.

En primer lugar, elija a qué puerta de enlace desea conectar su cliente. Las pasarelas activas se pueden encontrar en la sección 'Gateways' [del explorador](https://testnet-milhon-explorer.nymtech.net/nym/gateways).

A continuación, inicializa tu cliente nym con la clave de identificación de la pasarela que hayas elegido: 

```
nym@localhost:~$ ./nym-client init --id requester-client --gateway <GATEWAY_ID>
```

Que debería devolver: 

``` 

      _ __ _ _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (cliente - versión 0.11.0)

    
Inicializando el cliente...
Guardadas todas las claves generadas
Guardado el archivo de configuración en "/home/nym/.nym/clients/requester-client/config/config.toml"
Utilizando la pasarela: 8yGFbT5feDpPmH66TveVjonpUn3tpvjobdvEWRbsTH9i
Configuración del cliente completada.


La dirección de este cliente es BUVD1uAXEWSfMDewwfxUAd6gSsEfHHPvnsV8LTfe9ZG.DaY9kqXREEkvpJ1Nv3nrfxF6HDamsJmtZQDFuyTAXwJZ@8yGFbT5feDpPmH66TveVjonpUn3tpvjobdvEWRbsTH9i
```

Ahora crea un archivo de servicio en `/etc/systemd/system/nym-client.service`: 

```
[Unidad]
description=Nym Client (0.11.0)
StartLimitInterval=350
StartLimitBurst=10

[Servicio]
User=nym # sustitúyalo por el usuario que desee 
LimitNOFILE=65536
ExecStart=/home/nym/nym-client run --id requester-client # recuerde comprobar la ruta a su binario nym-client y el id de su cliente 
KillSignal=SIGINT
Restart=on-failure
RestartSec=30

[Instalar]
WantedBy=multi-user.target
```

A continuación, habilite e inicie su cliente con los siguientes comandos: 

```
systemctl enable nym-client.service
systemctl start nym-client.service

# Siempre puedes comprobar que tu cliente se ha iniciado con éxito con 
systemctl status nym-client.service
```

Con `systemctl status nym-client.service` debería poder ver la dirección del cliente al iniciarse. También puedes utilizar `journalctl -t nym-client -o cat -f` para obtener la salida del cliente en tu consola a medida que entra. 

Anote la dirección del cliente:

```
 2021-07-10T14:45:50.131 INFO nym_client::client > La dirección de este cliente es: BLJ6SrgbaYjb7Px32G7zSZnocuim3HT9n3ocKcwQHETd.4WAAh7xRxWVeiohcw44G8wQ5bGHMEvq8j9LctDkGKUC7@8yGFbT5feDpPH66TveVjonpUn3tpvjobdvEWRbsTH9i
```

### Ejecutando su solicitante de red 

Ahora que tenemos un cliente en ejecución para que el solicitante escuche, podemos iniciarlo con el siguiente comando : 

```
nym@localhost:~$ ./nym-network-requester 

Iniciando el proveedor de servicios socks5:
 2021-08-11T13:28:02.767Z INFO nym_network_requester::core > * connected to local websocket server at ws://localhost:1977

Todos los sistemas van. Pulse CTRL-C para detener el servidor.
```
Como puedes ver, se ha conectado al cliente nym que iniciamos antes. 

Ahora detenga ese proceso con `CTRL-C`, y cree un archivo de servicio para el solicitante como hicimos con nuestra instancia de cliente anteriormente en `/etc/systemd/system/nym-network-requester.service`:

```
[Unidad]
description=Nym Client (0.11.0)
StartLimitInterval=350
StartLimitBurst=10

[Servicio]
User=nym # sustitúyalo por el usuario que desee 
LimitNOFILE=65536
ExecStart=/home/nym/nym-network-requester # recuerde comprobar la ruta a su binario nym-network-requester 
KillSignal=SIGINT
Restart=on-failure
RestartSec=30

[Instalar]
WantedBy=multi-user.target
```

Ahora habilite e inicie su solicitante: 

```
systemctl enable nym-network-requester.service
systemctl start nym-network-requester.service

# Siempre puede comprobar que su solicitante se ha iniciado con éxito con 
systemctl status nym-network-requester.service
```

## Configure su firewall

Aunque su solicitador está ahora listo para recibir tráfico, su servidor puede no estarlo - los siguientes comandos le permitirán establecer un cortafuegos correctamente configurado usando `ufw`:

```
# comprueba si tienes instalado ufw
versión de ufw
# si no está instalado, instale con
sudo apt install ufw -y
# habilitar ufw
sudo ufw enable
# comprueba el estado del firewall
sudo ufw status
```

Por último, abra el puerto p2p de su solicitante, así como los puertos para ssh y las conexiones de tráfico entrante:

```
sudo ufw allow 1789,22,9000/tcp
# comprueba el estado del firewall
sudo ufw status
```

Para obtener más información sobre la configuración de los puertos de su solicitante, consulte la [tabla de referencia de puertos del solicitante](#requester-port-reference) que aparece a continuación.

### Usando su requester de red 

Puedes compartir de forma segura la dirección de tu nym-client en ejecución con quien quieras - si quieres ejecutar un nym-network-requester para toda la red Nym, dánoslo e incluso podemos ponerlo en la documentación de Nym.

¿Es seguro hacer esto? Si fuera un proxy abierto, esto sería inseguro, porque cualquier usuario de Nym podría hacer peticiones de red a cualquier sistema de Internet.

Para hacer las cosas un poco menos estresantes para los administradores, nym-network-requester deja caer todas las peticiones entrantes por defecto. Para que pueda realizar peticiones, es necesario añadir dominios específicos al archivo `allowed.list` en `$HOME/.nym/service-providers/nym-network-requester/allowed.list`.

Si lo desea, puede utilizar simplemente los dominios del archivo `allowed.list` por defecto, ejecutando este comando desde el directorio de código de nivel superior `nym`:

`cp service-providers/nym-network-requester/allowed.list.sample ~/.nym/service-providers/nym-network-requester/allowed.list`.

Estas URLs permitirán las solicitudes de los monederos de criptomonedas Blockstream Green y Electrum, así como el cliente de chat KeyBase.

  :::caution
  Si cambias tu `allowed.list`, asegúrate de reiniciar nym-network-requester.service para que recoja la nueva lista de peticiones permitidas
  :::

### Añadir URLs para otros clientes

Sería una pena que Nym estuviera restringido a sólo tres clientes. ¿Cómo podemos añadir soporte para una nueva solicitud? Es bastante fácil de hacer.

Echa un vistazo en tu directorio de configuración de nym-network-requester:

```
ls $HOME/.nym/service-providers/network-requester/

# devuelve: allowed.list unknown.list
```

Ya sabemos que `allowed.list` es lo que deja pasar las peticiones. Todas las peticiones desconocidas se registran en `unknown.list`. Si quieres probar a usar un nuevo tipo de cliente, simplemente inicia la nueva aplicación, apúntala a tu proxy SOCKS5 local (configurado para usar tu red remota `nym-network-requester`), y sigue copiando las URLs de `unknown.list` en `allowed.list` (puede llevar varios intentos hasta que las consigas todas, dependiendo de la complejidad de la aplicación).

Si añades soporte para una nueva aplicación, nos encantaría saberlo: háznoslo saber o envía una solicitud de extracción comentada en `allowed.list.sample`. 

:::caution
Si estás añadiendo dominios personalizados, ten en cuenta que aunque pueden aparecer en los registros de tu red-solicitud como algo así como `api-0.core.keybaseapi.com:443`, sólo necesitas** incluir el nombre del dominio principal, en este caso `keybaseapi.com`.
:::

### Ejecutando un proxy abierto

Si realmente quieres ejecutar un proxy abierto, tal vez con fines de prueba para tu propio uso o entre un pequeño grupo de amigos de confianza, es posible hacerlo. Puedes desactivar las comprobaciones de red pasando la bandera `--open-proxy` cuando lo ejecutes. Si lo ejecuta con esta configuración, lo hace bajo su propio riesgo.


### Puerto de referencia del solicitante

Toda la configuración de puertos específica de los solicitantes puede encontrarse en `$HOME/.nym/clients/<YOUR_ID>/config/config.toml` & `$HOME/.nym/service-providers/<YOUR_ID>/config/config.toml`. Si edita alguna configuración de puerto, recuerde reiniciar los procesos del cliente y del solicitante.

| Puerto por defecto | Utilizar
|--------------|---------------------------|
| 1789 para el tráfico de Mixnet
| 9000: Escuchar el tráfico de los clientes.
