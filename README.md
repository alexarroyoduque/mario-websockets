mario-websockets
============

Proyecto experimental.

Un pequeño juego de plataformas multijugador donde cada usuario juega con su smartphone. Cada jugador con su smartphone juega con su personaje (Mario) y en otra pantalla general se ve la interacción de todos los jugadores conectados a la vez. El juego está hecho con [phaserJS](http://phaser.io/) y usa [socket.io](http://socket.io/) para el intercambio de mensajes cliente-servidor.

Puedes probar el experimento ahora mismo!

1. Abre esto en tu navegador: [https://mario-websockets-phaser.herokuapp.com/screen](https://mario-websockets-phaser.herokuapp.com/screen)

2. Abre esto en tu smartphone: [https://mario-websockets-phaser.herokuapp.com/controller](https://mario-websockets-phaser.herokuapp.com/controller)

##Requisitos

Es necesario tener instalado:

1. NodeJS: [descargar instalador](http://nodejs.org/) según Sistema Operativo

2. Bower: con NodeJS instalado ejecutar `npm install -g bower`

3. Gulp: con NodeJS instalado ejecutar `npm install -g gulp`

4. [GIT](http://git-scm.com/) para clonar el repositorio

##Arrancar proyecto

1. Clonar repositorio, también es posible descargarlo en .[zip](https://github.com/alejandroarroyo/mario-websockets/archive/master.zip)
    
    + `git clone https://github.com/alejandroarroyo/mario-websockets

    + `cd mario-websockets`

2. Instalar dependencias

    + NodeJS: `npm install`
    
    + Bower: `bower install`
    
3. Tareas de gulp

    + `gulp`: levanta proyecto en local
    
    + `gulp server`: levanta proyecto en local con un express para jugar con los sockets
    
    + `gulp build`: crea versión distribuida del proyecto


> Alejandro Arroyo Duque

> Portafolio: [http://alexarroyoduque.github.io](http://alexarroyoduque.github.io)

> Twitter: [@AlexArroyoDuque](https://twitter.com/AlexArroyoDuque)