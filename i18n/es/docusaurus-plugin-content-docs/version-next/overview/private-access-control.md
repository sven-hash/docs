---
sidebar_label: "Coco"
description: "Nym garantiza la privacidad del control de acceso mediante un sofisticado esquema de firma llamado Coconut"
hide_title:  false
title: Coconut
---


### Presentación de Coconut

Coconut es un esquema de firma criptográfica que produce credenciales de privacidad mejorada. Permite a los programadores de aplicaciones que se preocupan por el control de acceso a los recursos pensar y codificar de una nueva manera.

La mayoría de las veces, cuando construimos la seguridad del sistema, pensamos en preguntas de _quién_:

- ¿Se ha identificado Alicia (autenticación)?
- ¿Tiene Alicia permiso para realizar una acción concreta (autorización)?

Coconut cambia fundamentalmente estas preguntas. En lugar de preguntarse _quién_ es un usuario, permite a los diseñadores de aplicaciones plantearse preguntas diferentes, centradas sobre todo en cuestiones de _derechos_:

- ¿La entidad que realiza esta acción tiene derecho a hacer X?

Esto permite un tipo de seguridad diferente. Muchos de los sistemas informáticos con los que hablamos a diario no necesitan saber _quiénes somos_, sólo necesitan saber si tenemos _derecho a usar_ el sistema. Coconut permite que las autoridades de firma y los validadores trabajen juntos para determinar si el titular de una clave privada tiene derecho a realizar una acción. Las credenciales son generadas de forma cooperativa por sistemas descentralizados y sin confianza.

Una vez generadas las credenciales, pueden ser _re-randomizadas:_ credenciales completamente nuevas, que nadie ha visto antes, pueden ser presentadas a los proveedores de servicios, y mágicamente validadas sin que puedan ser vinculadas a la credencial originalmente entregada por los validadores.

Estas propiedades permiten que las credenciales de coco actúen como una versión descentralizada y totalmente privada de las credenciales OAuth, o como tokens criptográficos al portador generados por sistemas descentralizados. Los tokens pueden ser mutados para que no sean rastreables, pero siguen siendo verificados con los permisos originales intactos.

Los usuarios presentan reclamaciones criptográficas codificadas dentro de las credenciales para obtener un acceso seguro a los recursos a pesar de que los sistemas que verifican el uso de las credenciales no pueden saber quiénes son.

### Re-randomisation vs pseudonymity

Estamos a hombros de gigantes. Hace diez años, Bitcoin mostró el camino a seguir al permitir a las personas controlar el acceso a los recursos sin recurrir a las preguntas de _quién_. En cambio, en Bitcoin y en las sucesivas cadenas de bloques, una clave privada demuestra un _derecho de uso_.

Pero como podemos ver ahora, las claves privadas en los sistemas blockchain actúan sólo como una barrera menor para averiguar _quién_ está accediendo a los recursos. Una clave privada de Bitcoin o Ethereum es efectivamente un seudónimo de larga duración que es fácilmente rastreable a través de transacciones sucesivas.

Coconut nos permite construir sistemas verdaderamente privados en lugar de pseudónimos.

### ¿Cómo funciona Coconut?

Al igual que las credenciales normales, las credenciales Coconut de Nym pueden ser firmadas con una clave secreta y posteriormente verificadas por cualquiera que tenga la clave pública correcta. Pero las credenciales Nym tienen superpoderes adicionales en comparación con los esquemas de firma "normales" como RSA o DSA.

En concreto, Coconut es un esquema de firma de credenciales con umbral de revelación selectiva, ciego y reasignable. Eso es mucho decir, así que vamos a desglosarlo en sus componentes.

Digamos que tienes un "mensaje" con el contenido "Esta credencial controla X". Además de las funciones normales `firmar(mensaje, clave secreta)` y `verificar(mensaje, clave pública)` presentes en otros esquemas de firma, Coconut añade lo siguiente:

1. _[Blind signatures](https://en.wikipedia.org/wiki/Blind_signature)_ - disfraza el contenido del mensaje para que el firmante no pueda ver lo que está firmando. Esto defiende a los usuarios frente a los firmantes: la entidad que ha firmado no puede identificar al usuario que ha creado una determinada credencial, ya que nunca ha visto el mensaje que está firmando antes de que haya sido _cegado_ (convertido en jerigonza). Coconut utiliza pruebas de conocimiento cero para que el firmante pueda firmar con confianza sin ver el contenido no cegado del mensaje.
2. 2. Firmas re-aleatorias: toma una firma y genera una nueva firma que es válida para el mismo mensaje subyacente "Esta credencial controla X". La nueva cadena de bits de la firma re-aleatoria es equivalente a la firma original, pero no se puede vincular a ella. Por lo tanto, un usuario puede "mostrar" una credencial varias veces, y cada vez parece ser una nueva credencial, que no se puede vincular a ninguna "muestra" anterior. Pero el contenido subyacente de la credencial reasignada es el mismo (incluso para cosas como la protección contra el doble gasto). Esto, una vez más, protege al usuario contra el firmante, porque el firmante no puede rastrear el mensaje firmado que dio al usuario cuando se presenta. También protege al usuario contra la parte de confianza que acepta la credencial firmada. El usuario puede mostrar credenciales re-aleatorias repetidamente, y aunque el mensaje subyacente es el mismo en todos los casos, no hay manera de rastrearlas viendo al usuario presentar la misma credencial múltiples veces.

3. 3. Revelación selectiva de atributos: permite a alguien con la clave pública verificar algunas partes de un mensaje, pero no todas. Así, por ejemplo, se pueden revelar selectivamente partes de un mensaje firmado a algunas personas, pero no a otras. Se trata de una propiedad muy poderosa de Coconut, que puede dar lugar a diversas aplicaciones: sistemas de votación, revelación selectiva de datos médicos, sistemas KYC respetuosos con la privacidad, etc.

4. _[Emisión de umbrales](https://en.wikipedia.org/wiki/Threshold_cryptosystem)_ - permite que la generación de firmas se reparta entre varios nodos y se descentralice, de modo que o bien todos los firmantes necesitan firmar (_n de n_ donde _n_ es el número de firmantes) o bien sólo un número umbral de firmantes necesita firmar un mensaje (_t de n_ donde _t_ es el valor umbral).

En conjunto, estas propiedades proporcionan privacidad a las aplicaciones a la hora de generar y utilizar firmas para las demandas criptográficas. Si se compara con la tecnología existente, se puede pensar en ella como una especie de [JWT] [https://jwt.io/] descentralizado supercargado que favorece la privacidad.

Una visión ligeramente ampliada de Coconut está disponible [en esta entrada del blog](https://medium.com/nymtech/nyms-coconut-credentials-an-overview-4aa4e922cd51).

### Uso de Coconut para la privacidad de las transacciones en la cadena de bloques

En el contexto de un sistema de moneda blockchain, Coconut nos permite crear una credencial Coconut de privacidad mejorada que representa de forma demostrable una cantidad bajo control de una entidad determinada. La credencial puede entonces "gastarse" de forma anónima, como si fuera el valor original. Se aplican protecciones contra el doble gasto a la credencial, por lo que sólo puede gastarse una vez. Los validadores de Nym pueden entonces desbloquear el valor para que pueda ser canjeado por el titular de la credencial.

Aunque todavía hay que trabajar para integrarlo en varias cadenas de bloques, en principio Coconut puede anonimizar las transacciones de la cadena de bloques en cualquier sistema que ofrezca multi-sig. En estos momentos estamos trabajando en la integración de [Cosmos](https://cosmos.network). Bitcoin y Ethereum son también objetivos obvios aquí.

Coconut es simple y flexible, y puede garantizar la privacidad para algo más que las transferencias de monedas; también puede proporcionar privacidad para contratos inteligentes más complejos.

Por último, cabe mencionar que Coconut puede aplicarse tanto a los sistemas de blockchain como a los que no lo son: es una tecnología de propósito general.
