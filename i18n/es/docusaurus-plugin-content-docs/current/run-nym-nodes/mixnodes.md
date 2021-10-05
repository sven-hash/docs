---
title: "Mixnodes"
weight: 30
description: "Los mixnodes aceptan paquetes Sphinx, mezclan los paquetes y los reenvían, lo que proporciona una gran privacidad a los usuarios de Internet."
---


:::note
El mixnode Nym fue compilado en la sección [building nym] (/docs/run-nym-nodes/build-nym/). Si aún no ha creado Nym y desea ejecutar el código, vaya allí primero.
:::

Para añadir su mixnode a la red testnet, puede copiar el binario `nym-mixnode` desde el directorio `target/release` a su servidor o bien puede compilarlo directamente en el servidor.

### Actualización desde una versión anterior 

Si ya está estado ejecutando un nodo en la red Nym con la versión v0.9.2, puede usar el comando `upgrade` para actualizar la versión.

```
./nym-mixnode upgrade --id ID-NODO
```

### Inicializar un mixnode

Si es tu primera vez en NYM, así se inicializa un mixnode:

```
./nym-mixnode init --id ID-NODO --host $(curl ifconfig.me) --location Ciudad
```
Para poder participar en la red de prueba de Nym, `--host` debe ser públicamente enrutable en Internet. Puede ser una dirección IPv4 o IPv6. Su nodo * debe * poder enviar datos TCP usando * tanto * IPv4 como IPv6 (ya que otros nodos con los que habla pueden usar cualquiera de los dos protocolos). El comando anterior obtiene su IP automáticamente usando un servicio externo `$ (curl ifconfig.me)`. Puede poner su IP pública directamente si no tiene instalado `curl`. 

La opción `--location` es opcional pero nos ayuda a depurar la red de prueba. 

La opción `--id` es el identificador del nodo que queramos usar.

Cuando tu ejecutes el comando `init`, se creará un fichero de configuración en `~/.nym/mixnodes/ID-NODO/`. 

El comando `init` NO destruirá las llaves de otros mixnode existente.

### Reclama tu mixnode en Telegram para que puedas obtener tokens

La red de Testnet se llama Finney y trabaja con la versión 0.10.x del mixnode de Nym, añade el concepto de "mixnode bonding". Cada operador de mixnode necesita obtener tokens y vincularlse al mixnode para ingresar en la red de Testnet Finney.

Para reclamar su mixnode simplemente ejecute el comando `sign` y proporcione su nombre de usuario de Telegram:

```
./nym-mixnode sign --id ID-NODO --text @USUARIO_TELEGRAM


      _ __  _   _ _ __ ___
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (mixnode - version 0.10.0)

    
Signing the text "@your-telegram-username" using your mixnode's Ed25519 identity key...

Signature is: 4Yo4ZkUBxREJapzf7AxLPodQXic4cfbNziJMLxsftTQsVdm5XKUg8be8ErXhnHunsnmz8EZvuGLwSD98PifCad1f

You can claim your mixnode in Telegram by talking to our bot. To do so:

* go to the '@nymchan_help_chat' channel
* copy the following line of text, and paste it into the channel

/claim 7xdQ1USuNEZN4WbbiZFPfd59HTqFeNkxpu4zWrYGtmTz 4Yo4ZkUBxREJapzf7AxLPodQXic4cfbNziJMLxsftTQsVdm5XKUg8be8ErXhnHunsnmz8EZvuGLwSD98PifCad1f
```

Luego ingrese al canal de Telegram ** @ nymchan_help_chat ** y hable con el bot para asociar su nombre de usuario de Telegram con su clave de mixnode: 

```
/claim 7xdQ1USuNEZN4WbbiZFPfd59HTqFeNkxpu4zWrYGtmTz 4Yo4ZkUBxREJapzf7AxLPodQXic4cfbNziJMLxsftTQsVdm5XKUg8be8ErXhnHunsnmz8EZvuGLwSD98PifCad1f
```

Con esto hemos declarado que nuestro mixnode debe estar asociado a nuestra cuenta.

A continuación, vaya a la [Wallet web Finney Testnet] (https://web-wallet-finney.nymtech.net/) y cree una dirección Nym. Se verá algo así como `hal1rytmasg5kavx4xasa0zg0u69jus8fn0r5j7nnt`. ¡Asegúrese de escribir su mnemotécnico (las palarbas de seguridad de su cuenta)!

Una vez que tenga una dirección de red de TESTNET de Nym, solicite tokens al bot de Telegram:

```
/faucet hal1rytmasg5kavx4xasa0zg0u69jus8fn0r5j7nnt # Cambiando esto por tu dirección de la wallet
```

El bot te enviará tokens para que puedas vincular tu mixnode. Primero, deberá lanzarlo.


### Corriendo el mixnode

`./nym-mixnode run --id ID-NODO`


Deberías de ver un arranque limpio como este:

```
     | '_ \| | | | '_ \ _ \
     | | | | |_| | | | | | |
     |_| |_|\__, |_| |_| |_|
            |___/

             (mixnode - version 0.10.0)

    
Starting mixnode winston-smithnode...

Directory server [presence]: http://testnet-finney-validator.nymtech.net:1317
Directory server [metrics]: http://testnet-metrics.nymtech.net:8080
Listening for incoming packets on <your-ip>:1789
Announcing the following socket address: <your-ip>:1789

To bond your mixnode, go to https://web-wallet-finney.nymtech.net/.  You will need to provide the following:
    Identity key: 7xdQ1USuNEZN4WbbiZFPfd59HTqFeNkxpu4zWrYGtmTz
    Sphinx key: 6T6PpSAzaiHMKJQPKPABXzppxLtUDB3TB4ChM16t3oYP
    Host: <your-ip>:1789
    Layer: 3
    Location: [physical location of your node's server]
    Version: 0.10.0
    
```

Una vez que lleguen los tokens, regrese a la billetera web y complete el formulario de vinculación de mixnode, utilizando la información del mixnode que se ha generado en el arranque.

Si todo funcionó, verá su nodo ejecutándose en https://testnet-finney-explorer.nymtech.net.

Tenga en cuenta que la **Identity key** de su nodo se muestra durante el inicio, puede usarla para identificar su nodo en la lista.

Siga leyendo para encontrar más información sobre las opciones de configuración o la solución de problemas si tiene problemas. También hay algunos consejos para ejecutar en AWS y otros proveedores de la nube, algunos de los cuales requieren una configuración adicional menor.

:::note
Si tiene problemas, solicite ayuda en el canal  **nymtech.friends#general** en [KeyBase](https://keybase.io).
:::

Eche un vistazo a los archivos de configuración guardados para ver más opciones de configuración.

### Haciendo un script de inicio de systemd

Aunque no es totalmente necesario, es útil hacer que el mixnode se inicie automáticamente al arrancar el sistema. Aquí hay un archivo de servicio systemd para hacerlo:

```
[Unit]
Description=Nym Mixnode (0.10.0)

[Service]
User=nym
LimitNOFILE=65536
ExecStart=/home/nym/nym-mixnode run --id mix0100
KillSignal=SIGINT 
Restart=on-failure
RestartSec=30
StartLimitInterval=350
StartLimitBurst=10

[Install]
WantedBy=multi-user.target
```

Pon el archivo anterior en tu sistema en `/etc/systemd/system/nym-mixnode.service`. 

Cambia la ruta en `ExecStart` para que apunte al binario de tu mixnode (`nym-mixnode`), y el `User` para que sea el usuario con el que estás ejecutando.

Si has construido nym en tu servidor, y tu nombre de usuario es `jetpanther`, entonces el comando de inicio podría ser así: 

`ExecStart=/home/jetpanther/nym/target/release/nym-mixnode run --id your-id`. Básicamente, quieres el comando completo `path/to/nym-mixnode run --id whatever-your-node-id-is`.

Entonces ejecuta:

```
systemctl enable nym-mixnode.service
```

Inicia tu nodo: 

```
service nym-mixnode start
```

Esto hará que tu nodo se inicie en el momento del arranque del sistema. Si reinicia su equipo, el nodo volverá a arrancar automáticamente. 

También puedes usar `service nym-mixnode stop` o `service nym-mixnode restart`. 

Nota: si realizas algún cambio en tu script systemd después de haberlo habilitado, tendrás que ejecutar 

```
systemctl daemon-reload
```

Esto permite a tu sistema operativo saber que está bien recargar la configuración del servicio.

### Configurar el  ulimit
Si no estás ejecutando nym-mixnode con systemd como arriba con `LimitNOFILE=65536` entonces tendrás problemas.
Debes establecer tu ulimit por encima de 1024 o tu nodo no funcionará correctamente en la red de pruebas. Para probar el `ulimit` de tu mixnode:

```
grep -i "open files" /proc/$(ps -A -o pid,cmd|grep nym-mixnode | grep -v grep |head -n 1 | awk '{print $1}')/limits 
```

Obtendrás los límites duros y blandos, algo así 

``Máximo de archivos abiertos 65536 65536 archivos ```

Esto significa que estás bien y que tu nodo no se encontrará con ningún problema relacionado con `ulimit`. 

Sin embargo;

Si cualquiera de los dos valores es 1024, debes aumentar el límite. Para ello, edita el archivo de servicio systemd y añade `LimitNOFILE=65536` y recarga el demonio:
``systemctl daemon-reload`` como root

o ejecuta esto como root para configurar el `ulimit` en todo el sistema: 

```
echo "DefaultLimitNOFILE=65535" >> /etc/systemd/system.conf
```

Reinicie su equipo y reinicie su nodo. Cuando vuelva, ejecuta `cat /proc/$(pidof nym-mixnode)/limits | grep "Max open files"` de nuevo para asegurarse de que el límite haya cambiado a 65535.

Cambiar el `DefaultLimitNOFILE` y reiniciar debería ser todo lo que necesitas hacer. Pero si quiere saber qué es lo que acaba de hacer, sigue leyendo.

Los equipos Linux limitan el número de archivos abiertos que puede tener un usuario. Esto se llama `ulimit`.

El `ulimit` por defecto es de 1024 en la mayoría de los sistemas. Es necesario ponerlo más alto, porque los mixnodes hacen y reciben muchas conexiones con otros nodos.

#### Síntomas de problemas de ulimit

Si ves alguna referencia a "Demasiados archivos abiertos" en tus registros:

```
Fallo al aceptar la conexión entrante - Os { código: 24, kind: Otro, mensaje: "Demasiados archivos abiertos" }
```

Esto significa que el sistema operativo está impidiendo que se realicen conexiones de red. Aumente su `ulimit`.



### Comprobación de que su nodo está mezclando correctamente

Una vez que hayas iniciado tu mixnode y se conecte al validador de testnet, tu nodo aparecerá automáticamente en el [Nym testnet explorer](https://testnet-finney-explorer.nymtech.net/).

Para más detalles, consulte [Preguntas frecuentes sobre la resolución de problemas](https://nymtech.net/docs/run-nym-nodes/troubleshooting/#how-can-i-tell-my-node-is-up-and-running-and-mixing-traffic)

### Ver la ayuda del comando

Vea todas las opciones disponibles ejecutando:

```
./nym-mixnode --help
```

También está disponible la ayuda de los subcomandos, por ejemplo

```
./nym-mixnode upgrade --help
```

### IPs virtuales, Google, AWS, y lo demás

En algunos servicios (por ejemplo, AWS, Google), la dirección de enlace disponible del equipo no es la misma que la dirección IP pública. En este caso, enlaza `--host` con la dirección del equipo local devuelta por `ifconfig`, pero especifica también `--announce-host` con la IP pública. Asegúrate  que pasas la dirección correcta y enrutable de `--announce-host`.

Por ejemplo, en un equipo de Google, puede ver la siguiente salida del comando `ifconfig`:

```
ens4: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1460
        inet 10.126.5.7  netmask 255.255.255.255  broadcast 0.0.0.0
        ...
```

La interfaz `ens4` tiene la IP `10.126.5.7`. Pero esta no es la IP pública del equipo, es la IP del equipo en la red interna de Google. Google utiliza el enrutamiento virtual, por lo que la IP pública de este equipo es otra, tal vez `36.68.243.18`.

Si se utiliza `nym-mixnode init --host 10.126.5.7`, se entra en el mixnode, pero no se enrutan los paquetes porque `10.126.5.7` no está en la red pública.

Intentando `nym-mixnode init --host 36.68.243.18`, obtendrás un error de inicio diciendo `AddrNotAvailable`. Esto se debe a que el mixnode no sabe cómo enlazar con un host que no está en la salida de `ifconfig`.

Lo que hay que hacer en esta situación es `nym-mixnode init --host 10.126.5.7 --announce-host 36.68.243.18`.

Esto vinculará el mixnode al host disponible `10.126.5.7`, pero anunciará la IP pública del mixnode al servidor de directorio como `36.68.243.18`. Depende de ti, como operador del nodo, asegurarte de que tus IPs públicas y privadas coinciden correctamente.



### Especificaciones de hardware del Mixnode

Por el momento, no hemos puesto una gran cantidad de esfuerzo en la optimización de la concurrencia para aumentar el rendimiento. Así que no te molestes en aprovisionar un servidor bestial con muchos núcleos. 

* Procesadores: 2 núcleos están bien. Consigue las CPUs más rápidas que puedas permitirte. 
* RAM: Los requerimientos de memoria son muy bajos - típicamente un mixnode puede usar sólo unos cientos de MB de RAM. 
* Discos: Los mixnodes no requieren espacio en disco más allá de unos pocos bytes para los archivos de configuración

Esto cambiará cuando tengamos la oportunidad de empezar a hacer optimizaciones de rendimiento de una manera más seria. El descifrado de paquetes de Sphinx está ligado a la CPU, así que una vez que optimicemos, será mejor tener más núcleos rápidos.
