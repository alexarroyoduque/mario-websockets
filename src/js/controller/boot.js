(function () {
  'use strict';

  function Boot() {}

  Boot.prototype = {
    preload: function () {
      this.load.image('preloader', 'assets/preloader.gif');
    },

    create: function () {
      // configure game
      this.game.input.maxPointers = 2;

      if (this.game.device.desktop) {
        this.game.scale.pageAlignHorizontally = true;
      } else {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // this.game.scale.minWidth =  480;
        // this.game.scale.minHeight = 260;
        // this.game.scale.maxWidth = 640;
        // this.game.scale.maxHeight = 480;
        this.game.scale.forceOrientation(true, false);
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.startFullScreen(false);
      }
      this.game.state.start('preloader');
    }
  };

  window['mario-websockets'] = window['mario-websockets'] || {};
  window['mario-websockets'].Boot = Boot;
}());

