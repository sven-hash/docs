---
título: "Preguntas frecuentes sobre la solución de problemas de Mixnode"
peso: 42
descripción: "Esta página te ayudará a encontrar respuestas a problemas comunes con la configuración y el mantenimiento de los mixnodes"
---

## ¿Cómo puedo saber que mi nodo está funcionando y mezclando tráfico?

En primer lugar, comprueba el [tablero] de testnet (https://testnet-milhon-explorer.nymtech.net/).
Vaya a Mixnodes y busque su nodo. 

Puedes obtener más detalles después de conectarte a tu servidor.

Aquí hay algunos ejemplos de cómo comprobar si el nodo está configurado correctamente.

### Para comprobar desde el equipo en el que se ejecuta su nodo:

- ``` sudo ss -s -t | grep 1789 ``` Esto debería funcionar en todos los sistemas basados en unix
- ``` sudo lsof -i TCP:1789 ``` si obtiene el comando no encontrado, haga ``` sudo apt install lsof ```
- ``sudo journalctl -u nym-mixnode -o cat | grep "Since startup mixed" ``` Si has creado el archivo nym-mixnode.service entonces este comando te muestra cuantos paquetes has mezclado hasta ahora. puedes añadir ` | tail` después del comando para verlo en tiempo real si es necesario. 


### Para volver a comprobarlo desde su equipo local

-  ``` telnet <IP ADDRESS> 1789<OR OTHER PORT> ```
-  ``` nmap -p 1789 <IP ADDRESS> -Pn ```

Esto no te dirá mucho, pero mientras tu conexión telnet no se cuelgue con "**Intentando...**" debería significar que tu mixnode es accesible desde el exterior.

Así es como debería verse la salida del comando **nmap** anterior si tu mixnode está configurado correctamente:

```
bob@desktop:~$ nmap -p 1789 95.296.134.220 -Pn

Host is up (0.053s latency).

PORT     STATE SERVICE
1789/tcp open  hello

```
También puedes consultar todos los mixnodes, y seguir analizándolos con un poco de ayuda de **jq**

- ``` curl https://testnet-finney-explorer.nymtech.net/data/mixnodes.json | jq ```

se puede analizar más a fondo entonces

por ejemplo, obtener una lista de nodos con ubicación en Londres 

- ``` curl https://testnet-finney-explorer.nymtech.net/data/mixnodes.json | jq -r '.[].mix_node | select(.location == "London")' ```

o para ver todos los nodos que comienzan con la dirección ipv4 65.21.x.x y listar sólo sus direcciones ipv4 completas

- ``` curl https://testnet-finney-explorer.nymtech.net/data/mixnodes.json | jq -r '.[].mix_node | select(.host | startswith("65.21")) | .host' ```

***

## Por qué mi nodo no mezcla ningún paquete & Como configurar el firewall

Si no puedes ver tu nodo en el [dashboard](https://testnet-finney-explorer.nymtech.net/) o con ninguna de las otras formas mencionadas anteriormente para comprobar tu nodo, entonces suele ser bastante simple y directo resolver este problema.
La razón más probable es :
* El firewall de su equipo no está configurado.
* Ha utilizado datos incorrectos durante el proceso de vinculación de su nodo desde la [cartera web] (web-wallet-finney.nymtech.net) 
* No usaste la bandera *--anunciar-host* mientras ejecutabas mixnode desde tu equipo local detrás de NAT.
* No has configurado el firewall de tu router mientras ejecutas el mixnode desde tu equipo local detrás de NAT o no tienes soporte para IPv6. Tu mixnode **debe hablar tanto  IPv4 como IPv6**. Tendrá que cooperar con otros nodos para enrutar el tráfico.
* El mixnode no se está ejecutando en absoluto, o bien ha salido o has cerrado la sesión sin hacer que el nodo sea persistente.


**Compruebe la configuración del firewall en su equipo. La forma más fácil en su VPS es usar ``ufw``. 
 En algunos sistemas, como el servidor Debian 10, ``ufw`` no está instalado por defecto**
- como usuario root en Debian 10 instala ufw - ```apt install ufw -y ``` 
- En Ubuntu, primero comprueba si tu ufw está habilitado - ``ufw status ```
- ``` ufw allow 1789/tcp && ufw allow 22/tcp && ufw enable ``` - > Esto permitirá el puerto 1789 para el mixnode, 22 para ssh y luego habilita el firewall. Tu nodo debería funcionar bien después de eso.
**Nota**: Necesitas añadir ``sudo `` antes de cada comando ``ufw `` si no eres un usuario root. ``sudo ufw allow 1789/tcp ``. Los símbolos ``&&`` se utilizan para encadenar comandos en Linux. 

En ciertos proveedores de nube como AWS y Google Cloud, necesitas hacer una configuración adicional de tu firewall y usar ```--host`` con tu **ip local** y ``--announce-host`` con la **ip pública** de tu host mixnode. 

Para obtener todas las **direcciones IP** de tu host, prueba lo siguiente:

```hostname -i`` te muestra tu **dirección ip** local,
```hostname -I`` que te mostrará todas las **direcciones ip** de tu host. Este es un ejemplo de salida. 

``sh
bob@nym:~$ hostname -I
88.36.11.23 172.18.0.1 2a01:28:ca:102::1:641
```
* El primer **ipv4** es tu ip pública que necesitas usar para ```--anunciar-host``.
* El segundo **ipv4** es tu ip local que tienes que usar para ``--host`` 
* Y la tercera debería confirmar si tu equipo tiene **ipv6** disponible. 

## ¿Cómo puedo asegurarme que mi nodo funciona desde mi equipo local si estoy detrás de NAT y no tengo una dirección IP fija?

En primer lugar, tu ISP tiene que estar preparado para IPv6. Lamentablemente, en 2020, la mayoría de ellos no lo están y no obtendrás una dirección IPv6 por defecto de tu ISP. Normalmente es un servicio de pago adicional o simplemente no lo ofrecen. 

Antes de empezar, comprueba si tienes IPv6 [aquí](https://test-ipv6.cz/). Si no es así, no pierdas el tiempo en ejecutar un nodo que no podrá mezclar ningún paquete debido a esta limitación. Llama a tu ISP y pregunta por IPv6, ¡hay de sobra para todos!

Si todo va bien y tienes IPv6 disponible, entonces necesitarás ``init`` el mixnode con una bandera extra, ``--announce-host``. También necesitarás editar tu archivo **config** cada vez que tu dirección IPv4 cambie, lo que podría ser unos días o unas semanas. 

También podría ser necesaria una configuración adicional en su router para permitir la entrada y salida de tráfico al puerto 1789 y el soporte de IPv6.

Aquí hay un ejemplo del comando `init` para crear la configuración del mixnode.

``` 
./target/release/nym-mixnode init --id nym-nat --host 0.0.0.0 --announce-host 85.160.12.13 --layer 3 --location Mars 
```

- La opción `--host 0.0.0.0` debería funcionar siempre, incluso si la dirección IPv4 de su equipo local cambia. Por ejemplo, el lunes su router le da a su equipo una dirección `192.168.0.13` y el miércoles, el arrendamiento DHCP terminará y se le asignará `192.168.0.14`. El uso de `0.0.0.0` debería evitar esto sin tener que establecer ninguna ip estática en la configuración de tu router.
- Puedes obtener tu dirección IPv4 actual usando `curl ipinfo.io` si estás en MacOS o Linux o visitando [whatsmyip site](https://www.whatsmyip.org/). Simplemente cópiala y úsala como dirección `--anounce-host`.

Asegúrate de comprobar si tu nodo está mezclando realmente. Necesitarás un poco de suerte para configurar esto desde tu casa detrás de NAT. 

## ¿Puedo utilizar un puerto diferente al 1789?

Sí, esto es lo que necesitas.
Digamos que quieres usar el puerto **1337** para tu mixnode. 

### Configurando el firewall 

`sudo ufw allow 1337` (ejecutar sin sudo si eres root). Puedes encontrar más detalles sobre esto en la sección **Por qué mi nodo no mezcla ningún paquete y Cómo configurar el firewall** de este wiki.

### Editar la configuración existente 

Si ya tienes una configuración que creaste antes y quieres cambiar el puerto, necesitas detener tu nodo, si está corriendo, y luego editar tu archivo de configuración. 
Asumiendo que el nombre de tu nodo es `nym`, el archivo de configuración se encuentra en `~/.nym/mixnodes/nym/config/config.toml`. 
```
nano ~/.nym/mixnodes/nym/config/config.toml 
```
Tendrás que editar dos partes del archivo. `announce_address` y `listening_address` en el archivo config.toml. Simplemente encuentra estas dos partes, borra tu antiguo puerto `:1789` y añade `:1337` después de tu dirección IP.

Para guardar la edición, presiona `CTRL+O` y luego sal `CTRL+X`. Luego ejecuta el nodo de nuevo. Deberías ver si el mixnode está usando el puerto que has cambiado en el archivo config.toml justo después de ejecutar el nodo. 


## ¿Dónde puedo encontrar mis claves privadas y públicas y la configuración del mixnode?

Todos los archivos de configuración y claves se almacenan en un directorio con el nombre de tu `id` que elegiste durante la configuración *init* con el siguiente PATH: `$HOME/.nym/mixnodes/` donde `$HOME` es un directorio de inicio del usuario (tu usuario actual en este caso) que lanzó el mixnode.

Dependiendo de cómo hayas instalado Nym, los archivos se almacenarán aquí:

1. Autoinstalador - `/home/nym/.nym/mixnodes/<YOURNODEID>`.
2. Construido desde el código fuente como tu usuario o root - `~/.nym/mixnodes/<YOURNODEID>`.

La estructura del directorio es la siguiente:

```
bob@nym:~$ tree /home/nym/.nym/mixnodes/
/home/nym/.nym/mixnodes/
|-- nym010
|   |-- config
|   |   `-- config.toml
|   `-- data
|       |-- private_identity.pem
|       |-- private_sphinx.pem
|       |-- public_identity.pem
|       `-- public_sphinx.pem


```

**Nota:** Si usted usa  `cat` la clave public_sphinx.pem, la salida será diferente de la clave pública que verá en Nym [dashboard](https://testnet-finney-explorer.nymtech.net/). La razón es que los archivos `.pem` están codificados en **base64**, sin embargo, en la web están en una codificación diferente - **base58**. No te confundas si tus claves parecen diferentes. Son las mismas claves, sólo que con diferente codificación :). 


## Sigo viendo mensajes de ERROR o WARN en los registros de mi nodo. ¿Por qué?

He visto bastantes errores de miembros de la comunidad en nuestro [chat de ayuda de Telegram](https://t.me/nymchan_help_chat).

La mayoría de ellos son benignos. Por lo general, se encontrará con errores cuando sus nodos intenten establecer una conexión con un nodo "muerto", que esté mal configurado (lo más probable es que su firewall lo esté).

Mientras su nodo muestre en sus registros "¡desde el inicio se han mezclado 1337 paquetes!", debería estar bien. Si quieres estar seguro, comprueba el Nym [dashboard](https://testnet-finney-explorer.nymtech.net/) o mira otras formas de comprobar si tu nodo está realmente mezclando, mencionadas en la sección **¿Cómo puedo saber si mi nodo está funcionando y mezclando tráfico?** en este wiki. 




## He compilado Nym desde el código fuente. ¿Cómo hago que el mixnode se ejecute en segundo plano?

Cuando cierras la sesión actual, matas el proceso y por lo tanto el mixnode se detendrá. Hay varias maneras de hacer que persista incluso después de salir de la sesión ssh. Tmux, screen por ejemplo. 

Una solución fácil sería usar **nohup** -> ``nohup`./nym-mixnode run --id NYM & ``` donde `--id NYM` es el id que estableciste durante el comando *init* previamente. 

**Sin embargo**, la solución **más fiable** y **elegante** es crear un archivo **systemd.service** y ejecutar el nym-mixnode con el comando `systemctl`.

Crea un archivo con nano y copia allí lo siguiente. 
**IMPORTANTE:** Tienes que escribir allí el id de tu nodo que estableciste antes en la configuración, de lo contrario no funcionará.
En la línea ExecStart, reescribe el --id SOMENAME con exactamente el mismo nombre que usaste para la configuración.

``` sudo nano /etc/systemd/system/nym-mixnode.service ```

Copia ahí esto y cambia el nombre del id y la ruta dependiendo de cómo hayas instalado tu mixnode

```
[Unit]
Description=nym mixnode service
After=network.target

[Service]
Type=simple
User=nym
LimitNOFILE=65536
ExecStart=/home/nym/nym-mixnode run --id nym
KillSignal=SIGINT
Restart=on-failure
RestartSec=30
Restart=on-abort
[Install]
WantedBy=multi-user.target

```
Ahora presiona CTRL + O para escribir el archivo, presiona enter. Luego sal con CTRL + W.

``sudo systemctl enable nym-mixnode ``

- Habilita el servicio 

``sudo systemctl start nym-mixnode ```

- Iniciar el servicio

``sudo systemctl status nym-mixnode ```

- Comprueba si el servicio está funcionando correctamente y el mixnode está mezclando. 

Ahora tu nodo debería estar mezclando todo el tiempo a menos que reinicies el servidor.

Cada vez que cambies tu archivo de servicio systemd necesitas ejecutar ``sudo systemctl daemon-reload`` y reiniciar el servicio. 
## ¿Dónde puedo obtener más ayuda?

La forma más rápida de contactar con uno de nosotros o conseguir ayuda de la comunidad, es visitar nuestro [chat de ayuda en Telegram](https://t.me/nymchan_help_chat).

Para más preguntas técnicas, únete a nuestro canal de Keybase. Obtén Keybase [aquí](https://keybase.io/), luego haz clic en Equipos -> Únete a un equipo. Escribe nymtech.friends en el nombre del equipo y pulsa continuar. Para charlar en general, pasa el rato en el canal #general. Nuestro desarrollo tiene lugar en el canal #dev. 
