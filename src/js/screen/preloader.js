(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {
    preload: function () {
      this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
      this.load.setPreloadSprite(this.asset);

      this.load.spritesheet('tileset', 'assets/tileset.png', 16, 16);
      this.load.tilemap('tilemap', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.spritesheet('button', 'assets/button.jpg', 100, 100);

      this.load.spritesheet('mario', 'assets/mario.png', 20, 20);

      // this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      // this.loadResources();

      this.ready = true;
    },

    loadResources: function () {
      // load your assets here
    },

    create: function () {

    },

    update: function () {
      // if (!!this.ready) {
        this.game.state.start('game');
      // }
    },

    onLoadComplete: function () {
      // this.ready = true;
    }
  };

  window['mario-websockets'] = window['mario-websockets'] || {};
  window['mario-websockets'].Preloader = Preloader;
}());
