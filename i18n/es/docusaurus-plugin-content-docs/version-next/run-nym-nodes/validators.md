---
sidebar_label: "Validadores"
description: "Los validadores de Nym proporcionan credenciales de privacidad mejorada basadas en el testimonio de un conjunto de autoridades emisoras descentralizadas y basadas en blockchain."
hide_title:  false
title: Validadores
---

 

Los validadores Nym aseguran la red con un token de estacionamiento, defendiendo la red de ataques Sybil.

Los validadores también proporcionan credenciales de privacidad mejorada basadas en el testimonio de un conjunto de autoridades emisoras descentralizadas y basadas en la cadena de bloques. Los validadores Nym utilizan un [esquema de firma](https://en.wikipedia.org/wiki/Digital_signature) llamado [Coco](https://arxiv.org/abs/1802.07344) para emitir credenciales. Esto permite que las aplicaciones de privacidad generen reclamaciones anónimas de recursos a través de autoridades descentralizadas, para luego utilizarlas con los proveedores de servicios.

El validador se construye utilizando [Cosmos SDK](https://cosmos.network) y [Tendermint](https://tendermint.com), con un contrato inteligente [CosmWasm](https://cosmwasm.com) que controla el servicio de directorio, la vinculación de nodos, y el staking delegado de mixnet.

### Construyendo el validador Nym

#### Requisitos previos

- `git`

```
sudo apt update
sudo apt install git
```

Verifique que `git` está instalado con:

```
git version
# Debería devolver: git versión X.Y.Z
```

- `Go >= v1.15`

`Go` se puede instalar a través de los siguientes comandos (tomados de los [Agoric SDK docs](https://github.com/Agoric/agoric-sdk/wiki/Validator-Guide-for-Incentivized-Testnet#install-go)):

```
# Primero elimina cualquier instalación antigua de Go existente
sudo rm -rf /usr/local/go

# Instalar la versión correcta de Go
curl https://dl.google.com/go/<VERSION.GO.CORRECTA>.linux-amd64.tar.gz | sudo tar -C/usr/local -zxvf -

# Actualizar las variables de entorno para incluir go
cat <<'EOF' >>$HOME/.profile
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export GO111MODULE=on
export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
EOF
source $HOME/.profile
```

Recuerde reemplazar `<CORRECT.GO.VERSION>` con la versión que elija de la página de versiones de Go. Por ejemplo

`<CORRECT.GO.VERSION>.linux-amd64.tar.gz` se convierte en `go1.15.7.linux-amd64.tar.gz`.

Verifique que `Go` está instalado con:

```
versión de go
# Debería devolver: go versión go1.15.7 linux/amd64
```

- `gcc`

`gcc` se puede instalar con:

```
sudo apt install build-essential
# Las páginas de manual adicionales opcionales se pueden instalar con:
sudo apt-get install manpages-dev
```

Verifique que `gcc` está instalado con:

```
gcc --version
```

Que debería devolver algo como:

```
gcc (Ubuntu 7.4.0-1ubuntu1~18.04) 7.4.0
Copyright (C) 2017 Free Software Foundation, Inc.
Este es un software libre; ver la fuente para las condiciones de copia.  NO hay
garantía; ni siquiera de COMERCIALIZACIÓN o ADECUACIÓN A UN PROPÓSITO PARTICULAR.
```

#### Construyendo su validador

Utilizamos la versión `wasmd` del validador Cosmos para ejecutar nuestra blockchain. Ejecuta esto para clonar, compilar y construirlo:

```
WASMD_VERSION=v0.17.0
BECH32_PREFIX=punk
git clone https://github.com/CosmWasm/wasmd.git
cd wasmd
git checkout ${WASMD_VERSION}
mkdir build
go build -o build/nymd -mod=readonly -tags "netgo,ledger" -ldflags "-X github.com/cosmos/cosmos-sdk/version.Name=nymd -X github.com/cosmos/cosmos-sdk/version.AppName=nymd -X github.com/CosmWasm/wasmd/app.NodeDir=.nymd -X github.com/cosmos/cosmos-sdk/version. Version=${WASMD_VERSION} -X github.com/cosmos/cosmos-sdk/version.Commit=d2e35c249e39e90c5a85e03e0b75800431612b20 -X github.com/CosmWasm/wasmd/app. Bech32Prefix=${BECH32_PREFIX} -X 'github.com/cosmos/cosmos-sdk/version.BuildTags=netgo,ledger'" -trimpath ./cmd/wasmd # noqa line-length
```

En este punto, tendrás una copia del binario `nymd` en tu directorio `build/`. Comprueba que se ha compilado correctamente ejecutando

```
./build/nymd
```

Deberías ver el texto de ayuda de `nymd` impreso.

Tanto el binario de la biblioteca de objetos compartidos `nymd` como `libwasmvm.so` han sido compilados. `libwasmvm.so` es la máquina virtual wasm que se necesita para ejecutar los contratos inteligentes Nym.


:::caution
Si has compilado estos archivos localmente debes subir ambos al servidor en el que se ejecutará el validador. **Si por el contrario los has compilado en el servidor, salta al paso en el que se establece la `LD_LIBRARY PATH` más abajo.
:::

Para localizar estos archivos en su sistema local ejecute:

```
WASMVM_SO=$(ldd build/nymd | grep libwasmvm.so | awk '{ print $3 }')
ls ${WASMVM_SO}
```

Esto mostrará algo como:

```
/home/username/go/pkg/mod/github.com/!cosm!wasm/wasmvm@v0.13.0/api/libwasmvm.so'
```

Cuando subas tu binario `nymd`, tendrás que decirle dónde está `libwasmvm.so` cuando inicies tu validador, o `nymd` no se ejecutará. Si los has compilado en tu servidor, esto no es necesario, ya que el `nymd` compilado ya tiene acceso a `libwasmvm.so`.

Como alternativa, puedes consultar el repositorio de `nym` en <https://github.com/nymtech/nym> y utilizar la etiqueta de la versión actual con:

```
git clone https://github.com/nymtech/nym.git
cd nym
git reset --hard # en caso de que hayas hecho algún cambio en tu rama
git pull # en caso de que lo hayas revisado antes
git checkout tags/v0.11.0
```

Dentro del directorio `validator` encontrarás los binarios precompilados a utilizar.

Sube tanto `nymd` como `libwasmvm.so` a tu máquina validadora. Si intentas ejecutar `./nymd` en tu servidor, probablemente verás un error si `nymd` no puede encontrar `libwasmvm.so`:
```
./nymd: error al cargar las bibliotecas compartidas: libwasmvm.so: no se puede abrir el archivo de objetos compartidos: No such file or directory
```

Tendrás que establecer `LD_LIBRARY_PATH` en el archivo `~/.bashrc` de tu usuario, y añadirlo a nuestra ruta. Sustituye `/home/tu usuario/ruta/al/nym/binaries` en el comando que aparece a continuación por las ubicaciones de `nymd` y `libwasmvm.so` y ejecútalo. Si los has compilado en el servidor, estarán en la carpeta `build/`:

```
NYM_BINARIES=/home/su usuario/ruta/al/nym/binarios
echo 'export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:'NYM_BINARIES >> ~/.bashrc
echo 'export PATH=$PATH:'${NYM_BINARIES} >> ~/.bashrc
fuente ~/.bashrc
```

Prueba que todo funcionó:

```
nymd
```

Esto debería devolver el texto de ayuda normal de `nymd`.

### Initialising your validator

Requisitos previos:

- FQDN Nombre de dominio
- Conectividad IPv4 e IPv6

Elija un nombre para su validador y utilícelo en lugar de `yourname` en el siguiente comando:

```
nymd init yourname --chain-id testnet-milhon
```

:::caution
`nymd init` genera `priv_validator_key.json` y `node_key.json`.  

Si ya ha configurado un validador en una red de prueba anterior, **asegúrese de hacer una copia de seguridad de la clave ubicada en** 
`~/.nymd/config/priv_validator_key.json`. 

Si no guarda la clave del validador, entonces no podrá firmar bloques y estará encarcelado todo el tiempo, y
no hay forma de (re)generar esta clave de forma determinista utilizando `nymd`.  
:::

En este punto, usted tiene un nuevo validador, con su propio archivo genesis ubicado en `$HOME/.nymd/config/genesis.json`. Tendrás que **reemplazar el contenido de ese archivo** que con el [archivo genesis de testnet-milhon] de Nym (https://nymtech.net/testnets/milhon/genesis.json).

Puedes utilizar el siguiente comando para descargar el de Milhon:

```
wget -O $HOME/.nymd/config/genesis.json https://nymtech.net/testnets/milhon/genesis.json
```

#### `config.toml` configuración

Añade el validador Nym como un peer persistente para que tu validador pueda empezar a sacar bloques del resto de la red, editando las siguientes opciones de configuración en `$HOME/.nymd/config/config.toml` para que coincidan con la información que aparece a continuación:

- `cors_allowed_origins = ["*"]` permite a la cartera web hacer peticiones HTTPS a su validador.
- `persistent_peers = "d6265e7c885eda002ef8736d2270bcbfb346a3aa@testnet-milhon-validator1.nymtech.net:26656"` permite que tu validador comience a extraer bloques de otros validadores
- `create_empty_blocks = false` puede ahorrar un poco de espacio
- `laddr = "tcp://0.0.0.0:26656"` en sus `opciones de configuración p2p`. 


Opcionalmente, si quiere habilitar las métricas de [Prometheus](https://prometheus.io/), también debe coincidir lo siguiente en el `config.toml`:

- `prometheus = true`
- `prometheus_listen_addr = ":26660"`

:::consejo
Recuerde habilitar las métricas en la sección 'Configurar las métricas de Prometheus' más abajo también.
:::

Y si desea añadir un nombre legible para los humanos a su nodo:

- `moniker = "yourname"`

Finalmente, si planeas usar [Cockpit](https://cockpit-project.org/documentation.html) en tu servidor, cambia el puerto `grpc` de `9090` ya que este es el puerto usado por Cockpit.

#### Configuración de `app.toml`.

En el archivo `$HOME/.nymd/config/app.toml`, establece los siguientes valores:

1. `precios-mínimos-de-gas = "0.025upunk"`
1. 2. `enable = true` en la sección `[api]` para que el servidor de la API funcione

### Configurar el usuario administrador de tu validador

Necesitarás una cuenta de administrador para estar a cargo de tu validador. Configúrala con:

```
nymd keys add nymd-admin
```

Esto añadirá las claves de tu cuenta de administrador al llavero de tu sistema.

La salida del comando debería ser algo así:

```
$ nymd keys add nymd-admin
Introduzca la frase de contraseña del llavero:
la contraseña debe tener al menos 8 caracteres
Introduzca la frase de contraseña del llavero:
Vuelva a introducir la frase de contraseña del llavero:

- nombre: nymd-admin
tipo: local
dirección: punk1x4twq82ew2c49ctr36mafksyrtnxwvrkey939u
pubkey: punkpub1addwnpepqdfcf5786qry8g8ef9nad5vnl0rs5cmkcywzrwwvvdye27ktjmqw2ygr2hr
mnemónico: ""
umbral: 0
pubkeys: []


**Importante** escribe esta frase mnemónica en un lugar seguro.
Es la única manera de recuperar tu cuenta si alguna vez olvidas tu contraseña.

diseño pago manzana entrada muñeca izquierda insignia nunca dedo garra coco ni viaje lado castillo saber placa unidad misericordia fin de semana pelícano estancia fortuna camino
```

Como dicen las instrucciones, recuerda **escribir tu mnemónica**.

Puedes obtener la dirección de la cuenta del administrador con:

```
nymd keys show nymd-admin -a
```

Escribe tu **contraseña** del llavero, no el mnemónico, cuando se te pida. El resultado debería ser algo parecido a esto:

```
punk1x4twq82ew2c49ctr36mafksyrtnxwvrkey939u
```

### Iniciando tu validador

Ahora todo debería estar listo para funcionar. Tienes el validador configurado, todos los cambios realizados en `config.toml` y `app.toml`, el archivo Nym genesis copiado en su lugar (reemplazando el inicial auto-generado). Ahora vamos a validar toda la configuración:

```
nymd validate-genesis
```

Si esta comprobación se supera, deberías recibir la siguiente salida:

```
El archivo en /ruta/.nymd/config/genesis.json es un archivo genesis válido
```

> Si esta prueba no se ha superado, compruebe que ha sustituido el contenido de `ruta/a/.nymd/config/genesis.json` por el del [archivo genesis de testnet-milhon](https://nymtech.net/testnets/milhon/genesis.json).

Antes de iniciar el validador, tendremos que abrir los puertos del cortafuegos:
```
# si ufw no está ya instalado:
sudo apt install ufw
sudo ufw enable
sudo ufw allow 1317,26656,26660,22,80,443,8000,1790/tcp
# para comprobar que todo ha funcionado
sudo ufw status
```

Los puertos `22`, `80` y `443` son para conexiones ssh, http y https respectivamente. `8000` y `1790` son para VerLoc, nuestro sistema de localización de nodos, y el resto de los puertos están documentados [aquí](https://docs.cosmos.network/v0.42/core/grpc_rest.html).

Para más información sobre la configuración de los puertos de tu validador, consulta la [tabla de referencia de puertos del validador](#validator-port-reference) a continuación.

> Si estás planeando usar [Cockpit](https://cockpit-project.org/) en tu servidor del validador, entonces habrás definido un puerto `grpc` diferente en tu `config.toml` anterior: recuerda abrir este puerto también.

Inicia el validador:

```
nymd start
```

Una vez que el validador se inicie, empezará a solicitar bloques a otros validadores. Esto puede llevar varias horas. Una vez que esté actualizado, puedes emitir una solicitud para unirte al conjunto de validadores:

```
PUB_KEY=$(/home/tuusuario/ruta/al/nym/binaries/nymd tendermint show-validator) # ej. punkvalconspub1zcjduepqzw38hj6edjc5wldj3d37hwc4savn0t95uakhy6tmeqz5wrfmntsnyehsq
MONIKER="nym-secondary" # como sea que haya llamado a su validador
FROM_ACCOUNT="nymd-admin" # su nombre de llavero

nymd tx staking create-validator \N ------
--amount=10000000stake \N ------
--fees=5000upunk \ ~ -pubkey="${subtotal=".
--pubkey="${PUB_KEY}" \
--moniker=${MONIKER} \
--chain-id=testnet-milhon \N -

--commission-max-rate="0.20" \ ~ -commission-max-rate="0.20
--commission-max-change-rate="0.01" \
--min-self-delegation="1" \N - gas="auto
--gas="auto" \ ~ -
--gas-adjustment=1.15 \N -from=${FROM==$}
--from=${FROM_ACCOUNT} \
--nodo https://testnet-milhon-validator.nymtech.net:443
```

Necesitarás monedas ``stake`` para esto.

Nota: actualmente estamos trabajando para crear un conjunto cerrado de validadores de confianza. Puedes pedirnos monedas para entrar, pero por favor no te ofendas si te decimos que no - los validadores son parte de la seguridad central de nuestro sistema y estamos empezando con gente que ya conocemos o que tiene una sólida reputación.

Si quieres editar algunos detalles de tu nodo usarás un comando como este

```
nymd tx staking edit-validator --chain-id=testnet-milhon --moniker=${MONIKER}   --details="Nym validator" --security-contact="YOUREMAIL" --identity="XXXXXXX" --gas="auto" --gas-adjustment=1.15 --from=${FROM_ACCOUNT} --fees 2000upunk
```

Con el comando anterior puedes especificar los últimos números de la clave `gpg` (como se usa en `keybase`) así como los detalles del validador y tu correo electrónico para el contacto de seguridad~

### Automatizando tu validador con systemd

Lo más probable es que quiera automatizar el reinicio de su validador si su servidor se reinicia. A continuación se muestra un archivo de unidad systemd para colocar en `/etc/systemd/system/nymd.service`:

```ini
[Unidad]
description=Nymd (0.11.0)
StartLimitInterval=350
StartLimitBurst=10

[Servicio]
User=nym # cambiar a su usuario
Tipo=simple
Environment="LD_LIBRARY_PATH=/home/su usuario/ruta/para/nym/binarios" # cambiar a la ruta correcta
ExecStart=/home/su usuario/ruta/para/nym/binarios/nymd start # cambiar a la ruta correcta
Restart=on-failure
RestartSec=30

[Instalar]
WantedBy=multi-user.target
```

Proceda a iniciarlo con:

```
systemctl daemon-reload # para recoger el nuevo archivo de unidad
systemctl enable nymd # para activar el servicio
systemctl start nymd # para iniciar el servicio
journalctl -f # para monitorizar los registros del sistema que muestran el inicio del servicio
```

### Instalación y configuración de nginx para HTTPS

#### Instalación

[Nginx](https://www.nginx.com/resources/glossary/nginx/#:~:text=NGINX%20es%20software%20de%20código_abierto,%2C%20media%20streaming%2C%20y%20más.&text=En%20además%20de%20sus%20HTTP,%2C%20TCP%2C%20y%20UDP%20servidores.) es un software de código abierto utilizado para operar servidores web de alto rendimiento. Nos permite configurar el proxy inverso en nuestro servidor validador para mejorar el rendimiento y la seguridad.

Instale `nginx` y permita la regla 'Nginx Full' en su firewall:

```
sudo ufw allow 'Nginx Full'
```

Comprueba que nginx se está ejecutando a través de systemctl:

```
systemctl status nginx
```

Que debería devolver:

```
● nginx.service - Un servidor web de alto rendimiento y un servidor proxy inverso
   Cargado: cargado (/lib/systemd/system/nginx.service; habilitado; preset del proveedor: habilitado)
   Activo: activo (en ejecución) desde Fri 2018-04-20 16:08:19 UTC; hace 3 días
     Documentos: man:nginx(8)
 PID principal: 2369 (nginx)
    Tareas: 2 (límite: 1153)
   Grupo CG: /system.slice/nginx.service
           ├─2369 nginx: proceso maestro /usr/sbin/nginx -g daemon on; master_process on;
           └─2380 nginx: proceso trabajador
```

#### Configuración

La delegación del puerto `26657` de tu validador al puerto `80` de nginx puede hacerse creando un archivo con lo siguiente en `/etc/nginx/conf.d/validator.conf`:

```
servidor {
  listen 80;
  listen [::]:80;
  server_name "{{ domain }}";

  location / {
    proxy_pass http://127.0.0.1:26657;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```

Seguido de:

```
sudo apt install certbot nginx python3
certbot --nginx -d nym-validator.sudominio.com -m you@yourdomain.com --agree-tos --noninteractive --redirect
```

:::caution
Si utiliza un VPS con Ubuntu 20: sustituya `certbot nginx python3` por `python3-certbot-nginx`.
:::

Estos comandos le darán un proxy nginx encriptado https frente a la API.

### Configurar las métricas de Prometheus (opcional)

Configura Prometheus con los siguientes comandos (adaptados de la [guía de configuración de Agoric] de NodesGuru (https://nodes.guru/agoric/setup-guide/en)):

```
echo 'export OTEL_EXPORTER_PROMETHEUS_PORT=9464' >> $HOME/.bashrc
fuente ~/.bashrc
sed -i '/[telemetría]/{:a;n;/enabled/s/false/true/;Ta}' $HOME/.nymd/config/app.toml
sed -i "s/prometheus-retention-time = 0/prometheus-retention-time = 60/g" $HOME/.nymd/config/app.toml
sudo ufw allow 9464
echo 'URL de las métricas: http://'$(curl -s ifconfig.me)':26660/metrics'
```

Las métricas de su validador estarán disponibles en la 'URL de métricas' devuelta, y tendrán un aspecto similar al siguiente

```
# HELP go_gc_duration_seconds Un resumen de la duración de la pausa de los ciclos de recogida de basura.
# TYPE go_gc_duration_seconds resumen
go_gc_duration_seconds{cuantile="0"} 6.7969e-05
go_gc_duration_seconds{cuantil="0.25"} 7.864e-05
go_gc_duration_seconds{cuantil="0.5"} 8.4591e-05
go_gc_duration_seconds{cuantil="0.75"} 0.000115919
go_gc_duration_seconds{cuantil="1"} 0.001137591
go_gc_duration_seconds_sum 0.356555301
go_gc_duration_seconds_count 2448
# HELP go_goroutines Número de goroutines que existen actualmente.
# TYPE go_goroutines gauge
go_goroutines 668
# HELP go_info Información sobre el entorno Go.
# TYPE go_info gauge
go_info{version="go1.15.7"} 1
# HELP go_memstats_alloc_bytes Número de bytes asignados y aún en uso.
# TYPE go_memstats_alloc_bytes gauge
go_memstats_alloc_bytes 1.62622216e+08
# HELP go_memstats_alloc_bytes_total Número total de bytes asignados, incluso si se han liberado.
# TYPE go_memstats_alloc_bytes_total contador
go_memstats_alloc_bytes_total 2.09341707264e+11
# HELP go_memstats_buck_hash_sys_bytes Número de bytes utilizados por la tabla hash del cubo de perfiles.
# TYPE go_memstats_buck_hash_sys_bytes calibre
go_memstats_buck_hash_sys_bytes 5.612319e+06
# HELP go_memstats_frees_total Número total de libres.
# TYPE go_memstats_frees_total counter
go_memstats_frees_total 2.828263344e+09
# HELP go_memstats_gc_cpu_fraction Fracción del tiempo de CPU disponible de este programa utilizado por la GC desde que se inició el programa.
# TYPE go_memstats_gc_cpu_fraction indicador
go_memstats_gc_cpu_fraction 0.03357798610671518
# HELP go_memstats_gc_sys_bytes Número de bytes utilizados para los metadatos del sistema de recogida de basura.
# TYPE go_memstats_gc_sys_bytes indicador
go_memstats_gc_sys_bytes 1.3884192e+07
```

### Libera tu validador

Si tu validador se queda encerrado, puedes arreglarlo con el siguiente comando:

```
nymd tx slashing unjail 
  --broadcast-mode=block \N -from=${FROM=Amigos de la Tierra
  --from=${FROM_ACCOUNT} \
  --chain-id=testnet-milhon \N - gas=auto
  --gas=auto \N - gas
  --gas-adjustment=1.4 \N-
  --fees=7000upunk
```

#### Razones más comunes para que su validador sea encarcelado

La razón más común por la que el validador se bloquea es que el validador se queda sin memoria debido a los syslogs hinchados.

Ejecutando el comando `df -H` te devolverá el tamaño de las distintas particiones de tu VPS.

Si la partición `/dev/sda` está casi llena, intente podar algunos de los archivos syslog `.gz` y reinicie su proceso de validación.

### Operaciones del día 2 con tu validador

Como parte de la ejecución del validador, podrá obtener algunas recompensas.

Con este comando, podemos consultar nuestras recompensas pendientes:

```
nymd query distribution validator-outstanding-rewards <punkvaloperaddress>
```

Usando los valores obtenidos del comando anterior, puedes retirar todas las recompensas con:

```
nymd tx distribution withdraw-rewards <punkvaloperaddress> --from ${FROM_ACCOUNT} --keyring-backend=os --chain-id="testnet-milhon" --gas="auto" --gas-adjustment=1.15 --commission --fees 5000upunk
```

Puede comprobar sus saldos actuales con:

```
nymd query bank balances punk<address>
```

Por ejemplo:

```yaml
saldos:
- cantidad: "22976200"
denom: stake
- importe: "919376"
denom: upunk
paginación:
next_key: null
total: "0"
```

Por supuesto, puedes devolver el saldo disponible a tu validador con el siguiente comando:

```
nymd tx staking delegate <punkvaloperaddress> <amount>stake--from ${FROM_ACCOUNT} --keyring-backend=os --chain-id "testnet-milhon" --gas="auto" --gas-adjustment=1.15 --fees 5000upunk
```

NOTA: El valor que se utilizará en lugar de la `<cantidad>stake` puede calcularse a partir del saldo disponible. Por ejemplo, si tienes `999989990556` en el balance, puedes apostar `999909990556`, ten en cuenta que el 5º dígito, ha sido cambiado de `8` a `0` para dejar algo de espacio para las tasas (las cantidades se multiplican por 10^6).

Recuerda también sustituir `punkvaloper` por tu dirección del validador y `nym-admin` por el usuario que creaste durante la inicialización.

### Referencia del puerto del validador

Toda la configuración de puertos específica del validador se encuentra en `$HOME/.nymd/config/config.toml`. Si editas cualquier configuración de puerto, recuerda reiniciar tu validador.

| Puerto por defecto | Utilizar
|--------------|--------------------------------------|
| 1317: punto final del servidor de la API REST
| 1790: Escucha para el tráfico de VerLoc.
| 8000: Punto final de la API http de métricas
| 26656 Escucha para conexiones entrantes de pares
| 26660 Escucha de conexiones Prometheus
