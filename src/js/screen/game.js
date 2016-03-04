var playersGroup = [];
var socket;

(function() {
    'use strict';

    function Game() {

    }

    Game.prototype = {
        create: function() {
            var self = this,
                buttonClean;
            this.game.stage.backgroundColor = "#4488AA";

            // map
            this.map = this.game.add.tilemap('tilemap');
            this.map.addTilesetImage('tileset');
            this.map.setCollisionBetween(0, this.map.tiles.length);
            this.layer = this.map.createLayer('Tileset');
            this.layer.resizeWorld();


            playersGroup = this.game.add.group();
            playersGroup.createMultiple(10, 'mario', 0);

            this.buttonGroup = this.game.add.group();

            socket = io();
            socket.on('connect', function() {
                console.log('conectado desde screen');
                socket.emit('register_screen');


                function cleanRoom() {
                    socket.emit('cleanRoom');
                    playersGroup.forEachAlive(function (player) {
                        player.kill();
                    }, this);
                }

                buttonClean = self.game.add.button(20, 20, 'button', null, self, 1, 0, 1);
                buttonClean.alpha = 0.7;
                buttonClean.onInputDown.add(cleanRoom, self);
            });

            socket.on('register_newPlayer_resend', function(data) {
                console.log('register_newPlayer_resend');
                console.log(data);

                var newPlayer = playersGroup.getFirstExists(false);
                newPlayer.reset(100, 100, 'mario');
                newPlayer.id = data.id;
                console.log('Nuevo jugador en la pantalla con id: ' + data.id);
            });

            socket.on('playerPosition_resend', function(data) {
                // console.log('playerPosition_resend');
                // console.log(data);

                playersGroup.filter(function(child, index, children) {
                    if (data.id === child.id) {
                        child.x = data.x;
                        child.y = data.y;
                    }
                }, true);
            });

            socket.on('killPlayer', function(data) {
                playersGroup.filter(function(child, index, children) {
                    if (data.id === child.id) {
                        if (child.alive) {
                            child.kill();
                        }
                    }
                }, true);
            });

        },

        update: function() {}
    };

    window['mario-websockets'] = window['mario-websockets'] || {};
    window['mario-websockets'].Game = Game;
}());
