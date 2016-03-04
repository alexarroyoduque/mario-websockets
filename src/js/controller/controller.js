var socket,
    controllerInfo = {};

(function() {
    'use strict';

    function Controller() {}

    Controller.prototype = {
        create: function() {
            var centerX = this.game.world.centerX,
                centerY = this.game.world.centerY,
                buttonLeft,
                buttonRight,
                buttonJump,
                self = this;

            this.VELOCITY_X = 150;
            this.GRAVITY_Y = 485;
            this.JUMP_VELOCITY = 250;

            this.game.stage.backgroundColor = "#4488AA";
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.gravity.y = this.GRAVITY_Y;

            // map
            this.map = this.game.add.tilemap('tilemap');
            this.map.addTilesetImage('tileset');
            this.map.setCollisionBetween(0, this.map.tiles.length);
            this.layer = this.map.createLayer('Tileset');
            this.layer.resizeWorld();

            // player
            function setupPlayer(player) {
                player.animations.add('standby', [0], 0, true);
                player.animations.add('move', [1, 2], 10, true);
                player.body.collideWorldBounds = true;
                player.body.setSize(16, 16);
                player.anchor.setTo(1, 0.5);
            }

            this.player = this.game.add.sprite(100, 20, 'mario');
            this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
            setupPlayer(this.player);

            this.game.camera.follow(this.player);

            // controls
            function createControls(gameContext) {
                gameContext.controls= {
                    left: false,
                    right: false,
                    jump: false
                };
            }
            createControls(this);


            this.buttonGroup = this.game.add.group();
            this.buttonTextGroup = this.game.add.group();

            socket = io();
            socket.on('connect', function () {
                console.log('Soy el controllerInfo');
                socket.emit('register_newPlayer');

                socket.on('register_newPlayer_resend', function (data) {
                    console.log('Mi info de player es:');
                    controllerInfo = data;
                    console.log(controllerInfo);
                    console.log('Player id: ' + controllerInfo.id);
                });

                socket.on('cleanRoom_resend', function (data) {
                    console.log('Información de jugador borrada');
                    controllerInfo = {};
                });

                function playerDoAction () {
                    var gameContext = this[0],
                        actionName = this[1],
                        actionValue = this[2];
                    gameContext.controls[actionName] = actionValue;
                };

                function setupButtonAction(button, action, gameContext) {
                    button.onInputDown.add(playerDoAction, [gameContext, action, true]);
                    button.onInputOver.add(playerDoAction, [gameContext, action, true]);
                    button.onInputOut.add(playerDoAction, [gameContext, action, false]);
                    button.onInputUp.add(playerDoAction, [gameContext, action, false]);
                }

                function setupButton(button) {
                    button.alpha = 0.7;
                    button.fixedToCamera = true;
                }

                buttonLeft = self.game.add.button(centerX - 220, centerY + 20, 'button', null, [self, controllerInfo], 1, 0, 1);
                setupButtonAction(buttonLeft, 'left', self);
                self.buttonGroup.add(buttonLeft);

                buttonRight = self.game.add.button(centerX - 100, centerY + 20, 'button', null, [self, controllerInfo], 1, 0, 1);
                setupButtonAction(buttonRight, 'right', self);
                self.buttonGroup.add(buttonRight);

                buttonJump = self.game.add.button(centerX + 100, centerY + 20, 'button', null, [self, controllerInfo], 1, 0, 1);
                setupButtonAction(buttonJump, 'jump', self);
                self.buttonGroup.add(buttonJump);

                self.buttonGroup.forEach(setupButton, self);
            });
        },

        update: function() {
            this.game.physics.arcade.collide(this.player, this.layer);
            socket.emit('playerPosition', {id: controllerInfo.id, x: this.player.x, y: this.player.y});
            this.player.body.velocity.x = 0;
            if (this.controls.left) {
                this.player.body.velocity.x = -this.VELOCITY_X;
                this.player.animations.play('move');
                if (this.player.scale.x > 0) {
                    this.player.scale.x = - 1;
                    this.player.body.setSize(16, 16, 16, 0);
                }
            } else if (this.controls.right) {
                this.player.body.velocity.x = this.VELOCITY_X;
                this.player.animations.play('move');
                if (this.player.scale.x < 0) {
                    this.player.scale.x = 1;
                    this.player.body.setSize(16, 16, 0, 0);
                }
            } else {
                this.player.animations.play('standby');
            }

            if (this.controls.jump && this.player.body.onFloor()) {
                this.player.body.velocity.y = - this.JUMP_VELOCITY;
            }
        },
        render: function () {
            // this.game.debug.body(this.player);
            // this.game.debug.spriteInfo(this.player, 150, 30);
        }
    };

    window['mario-websockets'] = window['mario-websockets'] || {};
    window['mario-websockets'].Controller = Controller;
}());
