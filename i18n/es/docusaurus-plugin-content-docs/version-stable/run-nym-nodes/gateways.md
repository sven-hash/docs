---
sidebar_label: "Gateways"
description: "Las pasarelas proporcionan un destino para los paquetes mixnet. La mayor parte de Internet no utiliza paquetes Sphinx encriptados, por lo que la pasarela actúa como destino del tráfico Sphinx."
hide_title: false
título: Pasarelas
---

 

:::note

La pasarela Nym fue construida en la sección [building nym](/es/docs/stable/run-nym-nodes/build-nym/). Si aún no has construido Nym y quieres ejecutar el código, ve allí primero.

:::



Las puertas de enlace proporcionan un destino para los paquetes mixnet. La mayor parte de Internet no utiliza paquetes Sphinx encriptados, por lo que la pasarela actúa como destino, algo así como un buzón, para los mensajes.

Los clientes Nym se conectan a las pasarelas. Los mensajes se envían automáticamente a los clientes conectados y se eliminan del almacenamiento en disco de la pasarela. Si un cliente está desconectado cuando llega un mensaje, éste se almacenará para su posterior recuperación. Cuando el cliente se conecta, todos los mensajes se entregan y se borran del disco de la pasarela. A partir de la versión 0.8.x las pasarelas utilizan un cifrado de extremo a extremo, por lo que no pueden ver el contenido de lo que almacenan para los usuarios.

Cuando se pone en marcha, un cliente se registra en una pasarela, y la pasarela devuelve un token de acceso. El token de acceso y la IP de la pasarela pueden utilizarse como forma de direccionamiento para la entrega de paquetes.

La implementación de la pasarela por defecto incluida en el código de la plataforma Nym retiene los paquetes para su posterior recuperación. Para muchas aplicaciones (como un simple chat), esto es utilizable desde el principio, ya que proporciona un lugar del que los clientes potencialmente desconectados pueden recuperar los paquetes. El token de acceso permite a los clientes extraer mensajes del nodo de la pasarela.

### Inicialización de la pasarela

Puedes comprobar que tus binarios están correctamente compilados con

```
./nym-gateway
```

Que debería devolver:

```

      _ __ _ _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (pasarela - versión 0.11.0)



uso: --help para ver las opciones disponibles.
```

Para comprobar las opciones de configuración disponibles, utilice:

```
nym@localhost:~$ ./nym-gateway init --help
```

Para inicializar su puerta de enlace se requieren los parámetros `id` y `host`, aunque puede experimentar añadiendo cualquiera de las otras banderas que aparecen en el comando `--help` anterior:

```
--announce-host <announce-host> El host que será reportado al servidor de directorio
--clients-ledger <clients-ledger> Archivo del libro mayor que contiene los clientes registrados
--clients-port <clients-port> El puerto en el que la pasarela escuchará las
                                               solicitudes
--host <host> El host personalizado en el que se ejecutará la pasarela para recibir paquetes de sphinx
                                               paquetes
--id <id> Id de la pasarela para la que queremos crear la configuración.
--inboxes <inboxes> Directorio con las bandejas de entrada donde se almacenan todos los paquetes para los clientes
--mix-port <mix-port> El puerto en el que la pasarela escuchará los paquetes de sphinx
--mixnet-contract <mixnet-contract> Dirección del contrato del validador que gestiona la red
--validadores <validadores> Lista separada por comas de los puntos finales de descanso de los validadores
```

Por ejemplo, el siguiente comando devuelve un gateway en su IP actual con el `id` de `supergateway`:

```
nym@localhost:~$ ./nym-gateway init --id supergateway --host $(curl ifconfig.me)
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    14  100    14    0     0    125      0 --:--:-- --:--:-- --:--:--   123

      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (gateway - version 0.11.0)

    
Initialising gateway supergateway...
Saved identity and mixnet sphinx keypairs
Saved configuration file to "/home/nym/.nym/gateways/supergateway/config/config.toml"
Gateway configuration completed.



Public identity key: 398BwaVTnnA4Drv878Znmdiat1fGbQ1qgzxd3rZEfqRA

Public sphinx key: Gk1WYjVAGuyMFitJGxUGKH3TuvFvKx6B9amP7kzbFrSe


To bond your gateway you will [most likely] need to provide the following:
    Identity key: 398BwaVTnnA4Drv878Znmdiat1fGbQ1qgzxd3rZEfqRA
    Sphinx key: Gk1WYjVAGuyMFitJGxUGKH3TuvFvKx6B9amP7kzbFrSe
    Host: 172.105.67.104
    Mix Port: 1789
    Clients Port: 9000
    Location: [physical location of your node's server]
```

Las puertas de enlace **deben** también ser capaces de direccionar IPv6, que es algo que es difícil de conseguir con muchos ISP. Ejecutar una puerta de enlace desde detrás de su router será difícil debido a esto, y recomendamos encarecidamente ejecutar su puerta de enlace en un VPS. Además de la conectividad IPv6, esto ayudará a mantener un mejor tiempo de actividad y conectividad.

Recuerda vincular tu nodo a través de la [billetera web de Milhon Testnet](https://testnet-milhon-wallet.nymtech.net/). Esto es necesario para que la cadena de bloques reconozca su nodo y su versión de software, e incluya su puerta de enlace en la red mixta. 

### Ejecutar su puerta de enlace

El comando `run` ejecuta la pasarela.

Ejemplo:

`./nym-gateway run --id supergateway`

El resultado es:

```
nym@localhost:~$ ./nym-gateway run --id supergateway

      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (gateway - version 0.11.0)


Starting gateway supergateway...
Public sphinx key: Gk1WYjVAGuyMFitJGxUGKH3TuvFvKx6B9amP7kzbFrSe

Public identity key: 398BwaVTnnA4Drv878Znmdiat1fGbQ1qgzxd3rZEfqRA

Validator servers: ["http://testnet-milhon-validator1.nymtech.net:1317"]
Listening for incoming packets on 172.105.67.104
Announcing the following address: 172.105.67.104
Inboxes directory is: "/home/nym/.nym/gateways/supergateway/data/inboxes"
Clients ledger is stored at: "/home/nym/.nym/gateways/supergateway/data/client_ledger.sled"
 2021-07-20T15:08:36.751Z INFO  nym_gateway::node > Starting nym gateway!
 2021-07-20T15:08:36.849Z INFO  nym_gateway::node > Starting mix packet forwarder...
 2021-07-20T15:08:36.849Z INFO  nym_gateway::node > Starting clients handler
 2021-07-20T15:08:36.850Z INFO  nym_gateway::node > Starting mix socket listener...
 2021-07-20T15:08:36.850Z INFO  nym_gateway::node::mixnet_handling::receiver::listener > Running mix listener on "172.105.67.104:1789"
 2021-07-20T15:08:36.850Z INFO  nym_gateway::node::mixnet_handling::receiver::listener > Starting mixnet listener at 172.105.67.104:1789
 2021-07-20T15:08:36.850Z INFO  nym_gateway::node                                      > Starting client [web]socket listener...
 2021-07-20T15:08:36.850Z INFO  nym_gateway::node::client_handling::websocket::listener > Starting websocket listener at 172.105.67.104:9000
 2021-07-20T15:08:36.850Z INFO  nym_gateway::node                                       > Finished nym gateway startup procedure - it should now be able to receive mix and client traffic!

```

#### Configure su cortafuegos

Aunque su puerta de enlace ya está preparada para recibir tráfico, es posible que su servidor no lo esté. Los siguientes comandos le permitirán configurar un cortafuegos correctamente con `ufw`:

```
# comprueba si tienes ufw instalado
versión de ufw
# si no está instalado, instale con
sudo apt install ufw -y
# habilitar ufw
sudo ufw enable
# comprueba el estado del firewall
sudo ufw status
```

Finalmente abre el puerto p2p de tu pasarela, así como los puertos para ssh y las conexiones de tráfico entrante:

```
sudo ufw allow 1789,22,9000/tcp
# comprueba el estado del firewall
sudo ufw status
```

Para más información sobre la configuración de puertos de su puerta de enlace, consulte la [tabla de referencia de puertos de la puerta de enlace](#referencia-de-puertos-de-la-puerta-de-envío) a continuación.

### Automatización de su puerta de enlace con systemd

Aunque no es totalmente necesario, es útil hacer que la pasarela se inicie automáticamente al arrancar el sistema. Aquí hay un archivo de servicio systemd para hacerlo:

```ini
[Unidad]
description=Puerta de enlace Nym (0.11.0)
StartLimitInterval=350
StartLimitBurst=10

[Servicio]
Usuario=nym
LimitNOFILE=65536
ExecStart=/home/nym/nym-gateway run --id supergateway
KillSignal=SIGINT
Restart=on-failure
RestartSec=30

[Instalar]
WantedBy=multi-user.target
```

Ponga el archivo anterior en su sistema en `/etc/systemd/system/nym-gateway.service`.

Cambia la ruta en `ExecStart` para que apunte a tu binario de la pasarela (`nym-gateway`), y el `User` para que sea el usuario con el que estás ejecutando.

Si has construido nym en tu servidor, y tu nombre de usuario es `jetpanther`, entonces el comando de inicio podría ser así:

`ExecStart=/home/jetpanther/nym/target/release/nym-gateway run --id your-id`. Básicamente, quieres el comando completo `path/to/nym-gateway run --id whatever-your-node-id-is`.

Entonces ejecuta:

```
systemctl enable nym-gateway.service
```

Inicia tu nodo:

```
service nym-gateway start
```

Esto hará que tu nodo se inicie al arrancar el sistema. Si reinicias tu máquina, el nodo volverá a arrancar automáticamente.

También puedes hacer `service nym-gateway stop` o `service nym-gateway restart`.

Nota: si haces algún cambio en el script de systemd después de haberlo habilitado, tendrás que ejecutar

```
systemctl daemon-reload
```

Esto permite a tu sistema operativo saber que está bien recargar la configuración del servicio.

### Referencia de los puertos de la pasarela

Toda la configuración de puertos específica de la pasarela se encuentra en `$HOME/.nym/gateways/<su-id>/config/config.toml`. Si edita alguna configuración de puertos, recuerde reiniciar su pasarela.

| Default port | Use                       |
|--------------|---------------------------|
| 1789         | Listen for Mixnet traffic |
| 9000         | Listen for Client traffic |
