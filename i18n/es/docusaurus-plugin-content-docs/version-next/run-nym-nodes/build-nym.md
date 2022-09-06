---
sidebar_label: "Building Nym"
description: "Cómo construir la plataforma Nym. Nym es relativamente sencillo de construir y ejecutar en Mac OS X, Linux y Windows."
hide_title:  false
title: Construyendo Nym
---

 

:::note

Esta página detalla cómo construir el código principal de la plataforma Nym, en Rust. **Si quieres construir y ejecutar un validador, [ve aquí](/es/docs/stable/run-nym-nodes/validators).

:::


Nym funciona en Mac OS X, Linux y Windows. Windows debe considerarse experimental - funciona bien si eres un desarrollador de aplicaciones pero no se recomienda para ejecutar nodos.

### Prerrequisitos:

- (Debian/Ubuntu) `pkg-config`, `build-essential`, `libssl-dev`, `curl`, `jq`

```
sudo apt update
sudo apt install pkg-config build-essential libssl-dev curl jq
```

- `Rust & cargo >= v1.51`

Recomendamos utilizar el [Rust shell script installer](https://www.rust-lang.org/tools/install). No se recomienda instalar cargo desde el gestor de paquetes (por ejemplo, `apt`) ya que las versiones empaquetadas suelen ser demasiado antiguas.

Si realmente no quieres usar el instalador de shell script, los [documentos de instalación de Rust](https://forge.rust-lang.org/infra/other-installation-methods.html) contienen instrucciones para muchas plataformas.

### Descarga y construye los binarios de Nym Mixnode, Gateway y Clients:

Los siguientes comandos compilarán los binarios en el directorio `nym/target/release`:

```
rustup update
git clone https://github.com/nymtech/nym.git
cd nym
git reset --hard # en caso de que hayas hecho algún cambio en tu rama
git pull # en caso de que lo hayas revisado antes

# Nota: la rama por defecto que clonas desde Github, `develop`, está garantizada
# rota e incompatible con la red de pruebas en funcionamiento en todo momento. Usted *debe*
# git checkout tags/v0.11.0` para unirse a la red de pruebas.

git checkout tags/v0.11.0
cargo build --release
```

Se construyen bastantes cosas. Las partes clave de trabajo son:

1. El [mixnode](/es/docs/stable/run-nym-nodes/mixnodes): `nym-mixnode`.
2. el [nodo pasarela](/es/docs/stable/run-nym-nodes/gateways): `nym-gateway`
3. el [cliente websocket](/es/docs/stable/build-apps/websocket-client): `nym-client`
4. el [cliente socks5](/es/docs/stable/use-apps/index): `nym-socks5-client`
5. el [solicitante de red](/es/docs/stable/run-nym-nodes/requester): `nym-network-requester`

