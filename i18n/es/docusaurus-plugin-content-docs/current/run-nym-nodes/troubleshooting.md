---
sidebar_label: "Preguntas frecuentes sobre la solución de problemas de Mixnode"
description: "Esta página le ayudará a encontrar respuestas a los problemas más comunes con la configuración y el mantenimiento de los mixnodes"
hide_title: false
title: Preguntas frecuentes sobre la solución de problemas de Mixnode
---

 

### ¿Cómo puedo saber si mi nodo está funcionando y mezclando tráfico?

En primer lugar, comprueba la sección "Mixnodes" del [panel de control] de testnet (https://testnet-milhon-explorer.nymtech.net/) e introduce tu **clave de identidad**, y deberías ver tu nodo. También puedes consultar la [interfaz de la tabla de clasificación](https://nodes.guru/nym/leaderboard) creada por el miembro de la comunidad Evgeny Garanin de [Nodes Guru](https://nodes.guru).

Si quieres más información, o si tu nodo no aparece y quieres volver a comprobarlo, aquí tienes algunos ejemplos de cómo comprobar si el nodo está configurado correctamente.

#### Compruebe desde su VPS

Se pueden obtener detalles adicionales a través de varios métodos después de conectarse a su VPS:

##### Estadísticas de socket con `ss`

```
sudo ss -s -t | grep 1789 # si has especificado un puerto diferente en la configuración de tu mixnode, cambia en consecuencia
```

Este comando debería devolver un montón de datos que contienen `ESTAB`. Este comando debería funcionar en todos los sistemas basados en Unix.

##### Lista de archivos abiertos y procesos dependientes con `lsof`.

```
# comprueba si lsof está instalado:
lsof -v
# instalar si no está instalado
sudo apt install lsof
# ejecutar contra el puerto de mixnode
sudo lsof -i TCP:1789 # si ha especificado un puerto diferente en su configuración de mixnode, cambie en consecuencia
```

Este comando debería devolver algo como esto

```
nym-mixno 103349 root 53u IPv6 1333229972 0t0 TCP [2a03:b0c0:3:d0::ff3:f001]:57844->[2a01:4f9:c011:38ae::5]:1789 (ESTABLISHED)
nym-mixno 103349 root 54u IPv4 1333229973 0t0 TCP nym:57104->194.5.78.73:1789 (ESTABLISHED)
nym-mixno 103349 root 55u IPv4 1333229974 0t0 TCP nym:48130->static.236.109.119.168.clients.your-server.de:1789 (ESTABLISHED)
nym-mixno 103349 root 56u IPv4 1333229975 0t0 TCP nym:52548->vmi572614.contaboserver.net:1789 (ESTABLISHED)
nym-mixno 103349 root 57u IPv6 1333229976 0t0 TCP [2a03:b0c0:3:d0::ff3:f001]:43244->[2600:1f18:1031:2401:c04b:2f25:ca79:fef3]:1789 (ESTABLISHED)
```

##### Consulta del diario `systemd` con `journalctl`.

```
sudo journalctl -u nym-mixnode -o cat | grep "Since startup mixed"
```

Si has creado el archivo `nym-mixnode.service` (es decir, estás ejecutando tu mixnode a través de `systemd`) entonces este comando te muestra cuántos paquetes has mezclado hasta ahora, y debería devolverte una lista de mensajes como esta

```
2021-05-18T12:35:24.057Z INFO nym_mixnode::node::metrics > ¡Desde el inicio ha mezclado 233639 paquetes!
2021-05-18T12:38:02.178Z INFO nym_mixnode::node::metrics > ¡Desde el inicio se han mezclado 233739 paquetes!
2021-05-18T12:40:32.344Z INFO nym_mixnode::node::metrics > ¡Desde el inicio se han mezclado 233837 paquetes!
2021-05-18T12:46:08.549Z INFO nym_mixnode::node::metrics > ¡Desde el inicio se han mezclado 234081 paquetes!
2021-05-18T12:56:57.129Z INFO nym_mixnode::node::metrics > ¡Desde el inicio se han mezclado 234491 paquetes!
```

Puedes añadir ` | tail` al final del comando para buscar nuevas entradas en tiempo real si es necesario.

#### Comprueba desde tu máquina local

##### Escanea los puertos con `nmap`:

```
nmap -p 1789 <Dirección IP> -Pn
```

Si su mixnode está configurado correctamente debería mostrar algo como esto:

```
bob@desktop:~$ nmap -p 1789 95.296.134.220 -Pn

El host está activo (0.053s de latencia).

ESTADO DEL PUERTO SERVICIO
1789/tcp open hello
```

##### Consultar todos los nodos y parsear con `jq`:

```
curl https://testnet-milhon-explorer.nymtech.net/data/mixnodes.json | jq
```

Debería devolver un objeto JSON de todos los nodos actualmente en línea.

Este comando puede ser analizado por varias claves, como la ubicación:
```
curl https://testnet-milhon-explorer.nymtech.net/data/mixnodes.json | jq -r '.[].mix_node | select(.location == "London")'
```

o la dirección:

```
curl https://testnet-milhon-explorer.nymtech.net/data/mixnodes.json | jq -r '.[].mix_node | select(.host | startswith("65.21")) | .host'
```

#### Comprobación con la API de testnet

Actualmente tenemos una API configurada que devuelve nuestras pruebas de métricas de la red. Hay dos puntos finales para hacer ping para obtener información sobre su mixnode, `report` y `history`. Encuentra más información sobre esto en la [documentación de métricas de Mixnodes](/docs/0.11.0/run-nym-nodes/mixnodes).

### ¿Por qué mi nodo no mezcla ningún paquete?

Si todavía no puede ver su nodo en el [tablero](https://testnet-milhon-explorer.nymtech.net/), o su nodo declara que no ha mezclado ningún paquete, hay varios problemas potenciales:

- El cortafuegos de tu máquina anfitriona no está configurado correctamente.
- Has proporcionado información incorrecta al enlazar tu nodo a través de la [cartera web](https://testnet-milhon-wallet.nymtech.net/)
- Estás ejecutando tu mixnode desde un VPS sin soporte IPv6.
- No usaste la bandera `--announce-host` mientras ejecutabas el mixnode desde tu máquina local detrás de NAT.
- No configuraste el firewall de tu router mientras ejecutabas el mixnode desde tu máquina local detrás de NAT, o no tienes soporte para IPv6.
- Tu mixnode no se está ejecutando en absoluto, o bien ha salido / entrado en pánico o has cerrado la sesión sin hacer que el nodo sea persistente.

:::caution
Tu mixnode **debe hablar tanto IPv4 como IPv6** para poder cooperar con otros nodos y enrutar el tráfico. ¡Esta es una razón común detrás de muchos errores que estamos viendo entre los operadores de nodos, así que compruebe con su proveedor que su VPS es capaz de hacer esto!
:::

#### Firewall mal configurado

La razón más común por la que tu mixnode podría no estar mezclando paquetes es debido a un firewall mal configurado. Los siguientes comandos te permitirán configurar un firewall usando `ufw`.

```
# comprueba si tienes ufw instalado
versión de ufw
# si no está instalado, instálalo con
sudo apt install ufw -y
# habilitar ufw
sudo ufw enable
# comprueba el estado del firewall
sudo ufw status
```

Finalmente abre el puerto p2p de tu mixnode, así como los puertos para conexiones ssh, http y https, y los puertos `8000` y `1790` para verloc y pings de medición:

```
sudo ufw allow 1789,1790,8000,22,80,443/tcp
# comprueba el estado del firewall
sudo ufw status
```

#### Información de enlace incorrecta

Compruebe que ha proporcionado la información correcta al enlazar su mixnode en la cartera web [interfaz](https://testnet-milhon-wallet.nymtech.net/). En caso de duda, desvincule y vuelva a vincular su nodo.

#### Falta la bandera `announce-host`.

En ciertos proveedores de nube como AWS y Google Cloud, necesitas hacer una configuración adicional de tu firewall y usar `--host` con tu **ip local** y `--announce-host` con la **ip pública** de tu mixnode host.

#### No hay conectividad IPv6

Asegúrese de que su VPS tiene conectividad IPv6 disponible con cualquier proveedor que esté utilizando.

Para obtener todas las direcciones IP de su host, pruebe los siguientes comandos:

```
hostname -i
```

Le devolverá su **dirección ip** local.

```
hostname -I
```

Devolverá todas las direcciones ip de tu host. Esta salida debería ser algo así:

```
bob@nym:~$ hostname -I
88.36.11.23 172.18.0.1 2a01:28:ca:102::1:641
```

- El primer **ipv4** es la ip pública que necesitas usar para la bandera `--announce-host`.
- El segundo **ipv4** es la IP local que necesitas usar para la bandera `--host`.
- La tercera salida debería confirmar si su máquina tiene ipv6 disponible.

#### Ejecutando en una máquina local detrás de NAT sin dirección IP fija

Tu ISP tiene que estar preparado para IPv6 si quieres ejecutar un mixnode en tu máquina local. Lamentablemente, en 2020, la mayoría de ellos no lo están y no obtendrás una dirección IPv6 por defecto de tu ISP. Normalmente es un servicio extra de pago o simplemente no lo ofrecen.

Antes de empezar, comprueba si tienes IPv6 [aquí](https://test-ipv6.cz/). Si no es así, no pierdas el tiempo en ejecutar un nodo que no podrá mezclar ningún paquete debido a esta limitación. Llama a tu ISP y pregunta por IPv6, ¡hay de sobra para todos!

Si todo va bien y tienes IPv6 disponible, entonces necesitarás `init` el mixnode con una bandera extra, `--announce-host`. También necesitarás editar tu archivo `config.toml` cada vez que tu dirección IPv4 cambie, eso podría ser unos días o unas semanas.

También podría ser necesaria una configuración adicional en su router para permitir la entrada y salida de tráfico al puerto 1789 y el soporte de IPv6.

Aquí hay un ejemplo del comando `init` para crear la configuración del mixnode.
```
./target/release/nym-mixnode init --id nym-nat --host 0.0.0.0 --announce-host 85.160.12.13 --layer 3
```

- La opción `--host 0.0.0.0` debería funcionar siempre, incluso si la dirección IPv4 de su máquina local cambia. Por ejemplo, el lunes su router le da a su máquina una dirección `192.168.0.13` y el miércoles, el arrendamiento DHCP terminará y se le asignará `192.168.0.14`. El uso de `0.0.0.0` debería evitar esto sin tener que establecer ninguna ip estática en la configuración de tu router.

- Puedes obtener tu dirección IPv4 actual usando `curl ipinfo.io` si estás en MacOS o Linux o visitando [whatsmyip site](https://www.whatsmyip.org/). Simplemente cópiala y úsala como dirección `--anounce-host`.

Asegúrate de comprobar si tu nodo se está mezclando realmente. Necesitarás un poco de suerte para configurar esto desde tu casa detrás de NAT.

#### Matando accidentalmente el proceso de tu nodo al salir de la sesión

Cuando cierres tu sesión de terminal actual, tienes que asegurarte de no matar el proceso del mixnode. Hay múltiples maneras de hacer que persista incluso después de salir de tu sesión ssh, la solución más fácil es usar `nohup`, y la solución más elegante es ejecutar el nodo con `systemd`.

##### Ejecutando tu mixnode como un proceso en segundo plano con `nohup`.

`nohup` es un comando con el que se le dice a tu terminal que ignore la señal `HUP` o 'hangup'. Esto evitará que el proceso del mixnode termine si matas tu sesión.

```
nohup ./nym-mixnode run --id NYM # donde `--id NYM` es el id que estableciste durante el comando `init`.
```

##### Ejecutar tu mixnode como un proceso en segundo plano con `systemd`.

La solución más fiable y elegante es crear un archivo `systemd.service` y ejecutar el nym-mixnode con el comando `systemctl`.

Crea un archivo con `nano` en `/etc/systemd/system/nym-mixnode.service` que contenga lo siguiente

```
[Unidad]
description=servicio mixnode nym
After=red.target

[Servicio]
Tipo=simple
User=nym # cambiar según corresponda
LimitNOFILE=65536
ExecStart=/home/nym/nym-mixnode run --id nym # cambiar según corresponda
KillSignal=SIGINT
Restart=al fallar
RestartSec=30
Restart=on-abort
[Instalar]
WantedBy=multi-user.target
```

```
# habilitar el servicio
sudo systemctl enable nym-mixnode
# iniciar el servicio
sudo systemctl start nym-mixnode
# comprueba si el servicio está funcionando correctamente y el mixnode está mezclando
sudo systemctl status nym-mixnode
```

Ahora tu nodo debería estar mezclando todo el tiempo, ¡y reiniciarse si reinicias tu servidor!

Cada vez que cambie su archivo de servicio `systemd` necesita `sudo systemctl daemon-reload` para reiniciar el servicio.
#### Network configuration seems fine but log still claims `Since startup mixed 0 packets!`

Este comportamiento es probablemente causado por un desajuste entre la configuración de su nodo y la información de vinculación. Desvincula y vuelve a vincular tu nodo a través de la [cartera web])(https://testnet-milhon-wallet.nymtech.net/). El procedimiento de revinculación no tiene ningún coste adicional de HAL, por lo que puedes hacerlo tan a menudo como quieras.

Asegúrate también de introducir toda la información en el monedero web exactamente como aparece en el registro cuando inicias el proceso de mixnode. En particular, el campo `host` debe contener el _puerto_ en el que escuchará tu mixnode:

- host correcto: `34.12.3.43:1789`
- host incorrecto: `34.12.3.43`.

### Errores y advertencias comunes

La mayoría de los mensajes de `ERROR` y `WARN` en los registros de su nodo son benignos - mientras su nodo muestre `desde el inicio mezcló X paquetes!` en sus registros (y este número aumenta con el tiempo), su nodo está mezclando paquetes. Si quieres estar seguro, comprueba el [dashboard] de Nym (https://testnet-milhon-explorer.nymtech.net/) o mira otras formas de comprobar si tu nodo está mezclando correctamente como se indica en la sección **¿Cómo puedo saber si mi nodo está funcionando y mezclando tráfico?** más arriba.

A continuación se describen errores y advertencias más específicos.

#### Error de `tokio runtime worker`.

Si tiene problemas con un error que incluye lo siguiente:

```
thread 'tokio-runtime-worker' panicked at 'Failed to create TCP listener: Os { código: 99, kind: AddrNotAvailable, message: "Cannot assign requested address" }'
```

Entonces necesitas `--anunciar-host <public ip>` y ``--host <local ip>` en el arranque. Este problema surge debido a que utilizas un proveedor como AWS o Google Cloud, y al hecho de que la dirección bind disponible de tu VPS no es la misma que la dirección IP pública (ver [IPs virtuales y alojamiento a través de Google y AWS](docs/0.11.0/run-nym-nodes/mixnodes) para más información sobre este tema).

#### advertencias de `rocket::launch`.
Estas advertencias no son un problema, por favor ignóralas. Rocket es un framework web para rust que estamos utilizando para proporcionar a mixnodes las APIs http `/verloc` y `/description`.

Encuentra más información sobre esto en la [documentación de métricas de Mixnodes](docs/0.11.0/run-nym-nodes/mixnodes).

Rocket se ejecuta en el puerto `8000` por defecto. Aunque en esta fase de la red de pruebas necesitamos que Rocket sea accesible a través de este puerto, en el futuro será posible personalizar el puerto concreto que utiliza.

#### `no ha podido recibir respuesta a nuestro paquete de eco en 1,5s. Deteniendo la prueba`

Esto está relacionado con la implementación de VerLoc que apareció en `0.10.1`, que tiene una sensibilidad de registro particularmente alta. Esta advertencia significa que el paquete de eco enviado al mixnode fue recibido, pero no enviado de vuelta. Esto no afectará a la tasa de recompensas o a las métricas de rendimiento de tu mixnode en la red de pruebas en este momento.

#### `La conexión a <IP>:1789 parece estar muerta`

Esta advertencia es normal en este momento, y no tiene nada que ver con tu nodo mixto. Es simplemente una advertencia de que tu nodo no puede conectarse a los nodos mixtos de otras personas por alguna razón, probablemente porque están desconectados o mal configurados.

### ¿Puedo usar un puerto diferente al 1789?

Sí, esto es lo que tienes que hacer:

Asumiendo que quieres usar el puerto `1337` para tu mixnode, necesitas abrir el nuevo puerto (y cerrar el antiguo):

```
sudo ufw allow 1337
sudo ufw deny 1789
```

Y luego editar la configuración del mixnode.

:::caution
Si quieres cambiar el puerto de un nodo que ya está en funcionamiento, debes detener el proceso antes de editar el archivo de configuración.
:::

Asumiendo que el nombre de tu nodo es `nym`, el archivo de configuración se encuentra en `~/.nym/mixnodes/nym/config/config.toml`.

```
nano ~/.nym/mixnodes/nym/config/config.toml
```

YTendrás que editar dos partes del archivo. `announce_address` y `listening_address` en el archivo config.toml. Simplemente sustituye `:1789` (el puerto por defecto) por `:1337` (tu nuevo puerto) después de tu dirección IP.

Finalmente, reinicia tu nodo. Deberías ver si el mixnode está usando el puerto que has cambiado en el archivo config.toml justo después de ejecutar el nodo.

### ¿Dónde puedo encontrar mis claves privadas y públicas y la configuración del mixnode?

Todos los archivos de configuración y claves se almacenan en un directorio con el nombre de tu `id` que elegiste durante el proceso de `init`, y se puede encontrar en el siguiente PATH: `$HOME/.nym/mixnodes/` donde `$HOME` es el directorio de inicio del usuario (tu usuario actual en este caso) que lanzó el mixnode.

Dependiendo de cómo hayas instalado Nym, los archivos se almacenarán aquí:

1. Autoinstalador - `/home/nym/.nym/mixnodes/<YOURNODEID>`.
2. Construido desde el código fuente como tu usuario o root - `~/.nym/mixnodes/<YOURNODEID>`.

La estructura del directorio es la siguiente:

```
bob@nym:~$ tree /home/nym/.nym/mixnodes/
/home/nym/.nym/mixnodes/
|-- nym010
| |-- config
| | `-- config.toml
| `-- data
| |-- private_identity.pem
| |-- private_sphinx.pem
| Identidad_pública.pem
| ``public_sphinx.pem


```

:::caution
Si usted `cata` la clave `public_sphinx.pem`, la salida será diferente de la clave pública que verá en Nym [dashboard](https://testnet-milhon-explorer.nymtech.net/). La razón de esto es que los archivos `.pem` están codificados en **base64**, sin embargo en la web están en **base58**. No te confundas si tus claves parecen diferentes. Son las mismas claves, sólo que con diferente codificación :).
:::

### ¿Qué es `verloc` y tengo que configurar mi mixnode para implementarlo?

`verloc` es la abreviatura de _verifiable location_. Los nodos mixtos y las puertas de enlace miden ahora las distancias de velocidad de la luz entre sí, en un intento de verificar la distancia entre ellos. En versiones posteriores, esto nos permitirá verificar algorítmicamente las ubicaciones de los nodos de una manera no falsa y confiable.

No tienes que hacer ninguna configuración adicional para tu nodo para implementar esto, es un proceso pasivo que se ejecuta en el fondo del mixnet desde la versión `0.10.1` en adelante.

### ¿Dónde puedo obtener más ayuda?

La forma más rápida de contactar con uno de nosotros o conseguir ayuda de la comunidad, es visitar nuestro [chat de ayuda en Telegram](https://t.me/nymchan_help_chat).

Para más preguntas técnicas, únete a nuestro canal de Keybase. Obtén Keybase [aquí](https://keybase.io/), luego haz clic en Equipos -> Únete a un equipo. Escribe nymtech.friends en el nombre del equipo y pulsa continuar. Para charlar en general, pasa el rato en el canal #general. Nuestro desarrollo tiene lugar en el canal #dev.
