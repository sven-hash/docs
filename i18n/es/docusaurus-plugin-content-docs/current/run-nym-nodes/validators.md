---
título: "Validadores"
peso: 30
descripción: "Los validadores de Nym proporcionan credenciales de privacidad mejorada basadas en el testimonio de un conjunto de autoridades emisoras descentralizadas y basadas en blockchain."
---

Los validadores Nym aseguran la red con un token de estacionamiento, defendiendo la red de ataques Sybil.

Los validadores también proporcionan credenciales de privacidad mejorada basadas en el testimonio de un conjunto de autoridades emisoras descentralizadas y basadas en la cadena de bloques. Los validadores Nym utilizan un [esquema de firma](https://en.wikipedia.org/wiki/Digital_signature) llamado [Coco](https://arxiv.org/abs/1802.07344) para emitir credenciales. Esto permite que las aplicaciones de privacidad generen reclamaciones anónimas de recursos a través de autoridades descentralizadas, para luego utilizarlas con los proveedores de servicios.

El validador se construye utilizando [Cosmos SDK](https://cosmos.network) y [Tendermint](https://tendermint.com), con un contrato inteligente [CosmWasm](https://cosmwasm.com) que controla el servicio de directorio, la vinculación de nodos, y el staking delegado de mixnet.

### Construyendo el validador Nym
#### Requisitos previos
- `Go >= v1.15`
`Go` se puede instalar a través de los siguientes comandos (tomados de los [Agoric SDK docs](https://github.com/Agoric/agoric-sdk/wiki/Validator-Guide-for-Incentivized-Testnet#install-go)):

``sh
# Primero elimina cualquier instalación antigua de Go existente
sudo rm -rf /usr/local/go

# Instalar la versión correcta de Go
curl https://dl.google.com/go/correct.go.version.linux-amd64.tar.gz | sudo tar -C/usr/local -zxvf -

# Actualizar las variables de entorno para incluir go
cat <<'EOF' >>$HOME/.profile
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export GO111MODULE=on
export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
EOF
source $HOME/.profile

```
Recuerde sustituir `correcto.go.version` por la versión que elija de la página de versiones de Go. Por ejemplo:

`correct.go.version.linux-amd64.tar.gz` se convierte en `go1.15.7.linux-amd64.tar.gz`.

Comprueba que `Go` está instalado con:

``sh
versión de go
# Debería devolver: go versión go1.15.7 linux/amd64
```

- `gcc`

`gcc` puede ser instalado con:

``sh
sudo apt install build-essential
# Las páginas de manual adicionales opcionales se pueden instalar con:
sudo apt-get install manpages-dev
```

Verifique que `gcc` está instalado con:

``sh
gcc --version
```

Lo que debería devolver algo como:

``sh
gcc (Ubuntu 7.4.0-1ubuntu1~18.04) 7.4.0
Copyright (C) 2017 Free Software Foundation, Inc.
Este es un software libre; ver la fuente para las condiciones de copia.  NO hay
garantía; ni siquiera de COMERCIALIZACIÓN o ADECUACIÓN A UN PROPÓSITO PARTICULAR.
```

#### Construyendo su validador
Utilizamos la versión `wasmd` del validador Cosmos para ejecutar nuestra blockchain. Ejecuta esto para clonar, compilar y construirlo:

```sh
WASMD_VERSION=v0.14.1
BECH32_PREFIX=hal
git clone https://github.com/CosmWasm/wasmd.git
cd wasmd
git checkout ${WASMD_VERSION}
mkdir build
go build -o build/nymd -mod=readonly -tags "netgo,ledger" -ldflags "-X github.com/cosmos/cosmos-sdk/version.Name=nymd -X github.com/cosmos/cosmos-sdk/version.AppName=nymd -X github.com/CosmWasm/wasmd/app.NodeDir=.nymd -X github.com/cosmos/cosmos-sdk/version.Version=${WASMD_VERSION} -X github.com/cosmos/cosmos-sdk/version.Commit=1920f80d181adbeaedac1eeea1c1c6e1704d3e49 -X github.com/CosmWasm/wasmd/app.Bech32Prefix=${BECH32_PREFIX} -X 'github.com/cosmos/cosmos-sdk/version.BuildTags=netgo,ledger'" -trimpath ./cmd/wasmd # noqa line-length
```
En este punto, tendrás una copia del binario `nymd` en tu directorio `build/`. Comprueba que se ha compilado correctamente ejecutando:

```sh
./build/nymd
```

Debería ver el texto de ayuda de `nymd` impreso.

Tanto el binario de la biblioteca de objetos compartidos `nymd` como `libwasmvm.so` han sido compilados. El archivo `libwasmvm.so` es la máquina virtual wasm que se necesita para ejecutar los contratos inteligentes Nym.

> Si has compilado estos archivos localmente debes subir ambos al servidor en el que se ejecutará el validador. **Si por el contrario los has compilado en el servidor, salta al paso en el que se establece la `LD_LIBRARY PATH` más abajo:

```sh
WASMVM_SO=$(ldd build/nymd | grep libwasmvm.so | awk '{ print $3 }')
ls ${WASMVM_SO}
```

Esto producirá algo como:
```sh
'/home/username/go/pkg/mod/github.com/!cosm!wasm/wasmvm@v0.13.0/api/libwasmvm.so'
```
Cuando subas tu binario `nymd`, tendrás que decirle dónde está `libwasmvm.so` cuando inicies tu validador, o `nymd` no se ejecutará. Si los has compilado en tu servidor, esto no es necesario, ya que el `nymd` compilado ya tiene acceso a `libwasmvm.so`.

Como alternativa, puedes consultar el repositorio de `nym` en <https://github.com/nymtech/nym> y utilizar la etiqueta de la versión actual con:

```sh
git clone https://github.com/nymtech/nym.git
cd nym
git reset --hard   # in case you made any changes on your branch
git pull           # in case you've checked it out before
git checkout tags/v0.10.0
```
Dentro de la carpeta `validator` encontrarás los binarios precompilados para usar.

Sube tanto `nymd` como `libwasmvm.so` a tu máquina validadora. Si intentas ejecutar `./nymd` en tu servidor, probablemente verás un error si `nymd` no puede encontrar `libwasmvm.so`:

```sh
./nymd: error while loading shared libraries: libwasmvm.so: cannot open shared object file: No such file or directory
```
Necesitarás establecer `LD_LIBRARY_PATH` en el archivo `~/.bashrc` de tu usuario, y añadirlo a nuestra ruta. Sustituye `/home/su usuario/ruta/al/nym/binarios` en el comando que aparece a continuación por las ubicaciones de `nymd` y `libwasmvm.so` y ejecútalo. Si los has compilado en el servidor, estarán en la carpeta `build/`:

```sh
NYM_BINARIES=/home/youruser/path/to/nym/binaries
echo 'export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:'NYM_BINARIES >> ~/.bashrc
echo 'export PATH=$PATH:'${NYM_BINARIES} >> ~/.bashrc
source ~/.bashrc
```
 Prueba que todo funcionó:
```sh
nymd
```
Esto debería devolver el texto de ayuda normal de `nymd`.

### Inicialización de su validador

Requisitos previos:

- FQDN Nombre de dominio
- Conectividad IPv4 e IPv6

Elija un nombre para su validador y utilícelo en lugar de `yourname` en el siguiente comando:

```sh
nymd init yourname --chain-id testnet-finney
```
En este punto, usted tiene un nuevo validador, con su propio archivo genesis ubicado en `$HOME/.nymd/config/genesis.json`. Tendrás que **reemplazar el contenido de ese archivo** que con el de Nym [testnet-finney genesis file](https://nymtech.net/testnets/finney/genesis.json).

Puedes utilizar el siguiente comando para descargar el de Finney:

```sh
wget  -O $HOME/.nymd/config/genesis.json https://nymtech.net/testnets/finney/genesis.json
```
#### config.toml configuración

Añade el validador Nym como un peer persistente para que tu validador pueda empezar a sacar bloques del resto de la red, editando las siguientes opciones de configuración en `$HOME/.nymd/
config/config.toml` para que coincida con la información de abajo:

- `cors_allowed_origins = ["*"]` permite a la cartera web hacer peticiones HTTPS a tu validador.
- `persistent_peers = "e7163ea63219504344c669164d083f52434f382b@testnet-finney-validator.nymtech.net:26656"` permite que tu validador empiece a sacar bloques de otros validadores
- `create_empty_blocks = false` puede ahorrar un poco de espacio

Opcionalmente, si quiere habilitar las métricas de [Prometheus](https://prometheus.io/) también debe coincidir lo siguiente en el `config.toml`:

- `prometheus = true`
- `prometheus_listen_addr = ":26660"`

Y si desea añadir un nombre legible para los humanos a su nodo:
- `moniker = "yourname"`

Por último, si planea utilizar [Cockpit](https://cockpit-project.org/documentation.html) en su servidor, cambie el puerto `grpc` de `9090` ya que este es el puerto utilizado por Cockpit.

#### configuración de app.toml

En el archivo `$HOME/.nymd/config/app.toml`, establezca los siguientes valores:
1. `minimum-gas-prices = "0.025uhal"`
1. `enable = true` in the `[api]` section to get the API server running

### Configurar el usuario administrador de su validador:
Necesitarás una cuenta de administrador para estar a cargo de tu validador. Configúrala con:

```sh
nymd keys add nymd-admin
```
Esto añadirá las claves de su cuenta de administrador al llavero de su sistema.

La salida del comando debería ser algo así:
```sh
$ nymd keys add nymd-admin
Enter keyring passphrase:
password must be at least 8 characters
Enter keyring passphrase:
Re-enter keyring passphrase:

- name: nymd-admin
type: local
address: hal1x4twq82ew2c49ctr36mafksyrtnxwvrkey939u
pubkey: halpub1addwnpepqdfcf5786qry8g8ef9nad5vnl0rs5cmkcywzrwwvvdye27ktjmqw2ygr2hr
mnemonic: ""
threshold: 0
pubkeys: []

**Importante** escriba esta frase mnemotécnica en un lugar seguro.
Es la única manera de recuperar su cuenta si alguna vez olvida su contraseña.

diseño pago manzana entrada muñeca izquierda insignia nunca dedo garra coco ni viaje lado castillo saber placa unidad misericordia fin de semana pelícano estancia fortuna camino
```

Como dicen las instrucciones, recuerda **escribir tu mnemónica**.

Puedes obtener la dirección de la cuenta del administrador con:

```sh
nymd keys show nymd-admin -a
```

Escriba su **contraseña** de llavero, no el mnemónico, cuando se le pida. El resultado debería ser algo parecido a esto:

```sh
hal1x4twq82ew2c49ctr36mafksyrtnxwvrkey939u
```

### Iniciando su validador

Ahora todo debería estar listo para funcionar. Tienes el validador configurado, todos los cambios hechos en `config.toml` y `app.toml`, el archivo Nym genesis copiado en su lugar (reemplazando el inicial auto-generado). Ahora vamos a validar toda la configuración:

```sh
nymd validate-genesis
```

Si esta comprobación se supera, debería recibir la siguiente salida:

```sh
File at /path/to/.nymd/config/genesis.json is a valid genesis file
```

>Si esta prueba no se ha superado, compruebe que ha sustituido el contenido de `ruta/to/.nymd/config/genesis.json` por el del archivo [testnet-finney genesis](https://nymtech.net/testnets/finney/genesis.json).

Antes de iniciar el validador, necesitaremos abrir los puertos del firewall (adaptarlos si no se usa `firewalld`):

```sh
for port in 1317/tcp 9090/tcp 26656/tcp 22/tcp 26660/tcp 80/tcp 443/tcp; do
firewall-cmd --add-port=${port}
firewall-cmd --add-port=${port} --permanent
done
```

Los puertos `22`, `80` y `443` son para conexiones ssh, http y https respectivamente. El resto de los puertos están documentados [aquí](https://docs.cosmos.network/v0.42/core/grpc_rest.html).

>Si estás planeando usar [Cockpit](https://cockpit-project.org/) en tu servidor validador entonces habrás definido un puerto `grpc` diferente en tu `config.toml` de arriba: recuerda abrir este puerto también.  

Inicia el validador:

```sh
nymd start
```

Una vez que su validador se inicie, comenzará a solicitar bloques de otros validadores. Esto puede llevar varias horas. Una vez que esté al día, puede emitir una solicitud para unirse al conjunto de validadores:

```sh
PUB_KEY=$(/home/youruser/path/to/nym/binaries/nymd tendermint show-validator) # e.g. halvalconspub1zcjduepqzw38hj6edjc5wldj3d37hwc4savn0t95uakhy6tmeqqz5wrfmntsnyehsq
MONIKER="nym-secondary"                                                       # whatever you called your validator
FROM_ACCOUNT="nymd-admin"                                                     # your keychain name

nymd tx staking create-validator \
--amount=10000000stake \
--fees=5000uhal \
--pubkey="${PUB_KEY}" \
--moniker=${MONIKER} \
--chain-id=testnet-finney \
--commission-rate="0.10" \
--commission-max-rate="0.20" \
--commission-max-change-rate="0.01" \
--min-self-delegation="1" \
--gas="auto" \
--gas-adjustment=1.15 \
--from=${FROM_ACCOUNT} \
--node https://testnet-finney-validator.nymtech.net:443
```

Para ello, necesitarás monedas `stake`.

Nota: actualmente estamos trabajando para crear un conjunto cerrado de validadores de confianza. Puedes pedirnos monedas para entrar, pero por favor no te ofendas si te decimos que no - los validadores son parte de la seguridad central de nuestro sistema y estamos empezando con gente que ya conocemos o que tiene una sólida reputación.

Si quieres editar algunos detalles de tu nodo usarás un comando como este:

```sh
nymd tx staking edit-validator   --chain-id=testnet-finney   --moniker=${MONIKER}   --details="Nym validator"   --security-contact="YOUREMAIL"   --identity="XXXXXXX"   --gas="auto"   --gas-adjustment=1.15   --from=${FROM_ACCOUNT} --fees 2000uhal
```

Con el comando anterior puedes especificar los últimos números de la clave `gpg` (como se usa en `keybase`) así como los detalles del validador y tu correo electrónico para el contacto de seguridad~

### Automatizar su validador con systemd
Lo más probable es que quiera automatizar el reinicio de su validador si su servidor se reinicia. A continuación se muestra un archivo de unidad systemd para colocar en `/etc/systemd/system/nymd.service`:

```ini
[Unit]
Description=Nymd (0.10.0)

[Service]
User=nym                                                          # change to your user
Type=simple
Environment="LD_LIBRARY_PATH=/home/youruser/path/to/nym/binaries" # change to correct path
ExecStart=/home/youruser/path/to/nym/binaries/nymd start          # change to correct path
Restart=on-failure
RestartSec=30
StartLimitInterval=350
StartLimitBurst=10

[Install]
WantedBy=multi-user.target
```
Proceda a iniciarlo:

```sh
systemctl daemon-reload # to pickup the new unit file
systemctl enable nymd   # to enable the service
systemctl start nymd    # to actually start the service
journalctl -f           # to monitor system logs showing the service start
```

### Instalación y configuración de nginx para HTTPS
#### Configuración
[Nginx](https://www.nginx.com/resources/glossary/nginx/#:~:text=NGINX%20is%20open%20source%20software,%2C%20media%20streaming%2C%20and%20more.&text=In%20addition%20to%20its%20HTTP,%2C%20TCP%2C%20and%20UDP%20servers.) es un software de código abierto utilizado para el funcionamiento de servidores web de alto rendimiento. Nos permite configurar el proxy inverso en nuestro servidor validador para mejorar el rendimiento y la seguridad.

Instala `nginx` y activa "Nginx Full" en tu firewall.

Compruebe que nginx se está ejecutando a través de systemctl:

```sh
systemctl status nginx
```
Que debería volver:

```sh
● nginx.service - A high performance web server and a reverse proxy server
   Loaded: loaded (/lib/systemd/system/nginx.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2018-04-20 16:08:19 UTC; 3 days ago
     Docs: man:nginx(8)
 Main PID: 2369 (nginx)
    Tasks: 2 (limit: 1153)
   CGroup: /system.slice/nginx.service
           ├─2369 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─2380 nginx: worker process
```

#### Configuración

El proxy del puerto `26657` de su validador al puerto `80` de nginx puede hacerse incluyendo lo siguiente en `/etc/nginx/conf.d/validator.conf`:

```sh
server {
  listen 80;
  listen [::]:80;
  server_name {{ domain }};

  location / {
    proxy_pass http://127.0.0.1:26657;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_headerHost $host;
    proxy_set_headerX-Real-IP $remote_addr;
  }
}
```

Seguido por:

```sh
sudo apt install certbot nginx python3
certbot --nginx -d nym-validator.yourdomain.com -m you@yourdomain.com --agree-tos --noninteractive --redirect
```

Estos comandos te darán un proxy nginx encriptado HTTPS frente a la API.

En el próximo testnet nos centraremos más en cosas como el TLS del validador y los nodos centinela.

### Desenclavamiento de su validador

Si, por alguna razón, tu validador es encarcelado, puedes arreglarlo con el siguiente comando:

```sh
nymd tx slashing unjail \
  --broadcast-mode=block \
  --from=${FROM_ACCOUNT} \
  --chain-id=testnet-finney \
  --gas=auto \
  --gas-adjustment=1.4 \
  --fees=7000uhal
```

### Operaciones del día 2 con su validador

Como parte de la ejecución del validador, podrá obtener algunas recompensas.

Con este comando, podemos consultar nuestras recompensas pendientes:

```sh
nymd query distribution validator-outstanding-rewards <halvaloperaddress>

```

Utilizando los valores obtenidos del comando anterior, puede retirar todas las recompensas con:

```sh
nymd tx distribution withdraw-rewards <halvaloperaddress> --from ${FROM_ACCOUNT} --keyring-backend=os --chain-id="testnet-finney" --gas="auto" --gas-adjustment=1.15 --commission --fees 5000uhal
```

Puede consultar sus saldos actuales con:
```sh
nymd query bank balances hal<address>
```
Por ejemplo
```yaml
balances:
- amount: "22976200"
denom: stake
- amount: "919376"
denom: uhal
pagination:
next_key: null
total: "0"
```

Por supuesto, puede devolver el saldo disponible a su validador con el siguiente comando:

```sh
nymd tx staking delegate <halvaloperaddress> <amount>stake--from ${FROM_ACCOUNT} --keyring-backend=os --chain-id "testnet-finney" --gas="auto" --gas-adjustment=1.15 --fees 5000uhal
```

NOTA: El valor a utilizar en lugar de la "apuesta" puede calcularse a partir del saldo disponible. Por ejemplo, si tiene `999989990556` en el saldo, puede apostar `999909990556`, tenga en cuenta que el 5º dígito, se ha cambiado de `8` a `0` para dejar algo de espacio para las comisiones (las cantidades se multiplican por 10^6).

Recuerda también sustituir `halvaloper` por la dirección de tu validador y `nym-admin` por el usuario que creaste durante la inicialización.
