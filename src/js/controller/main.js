window.addEventListener('load', function () {
  'use strict';

  var ns = window['mario-websockets'];
  var game = new Phaser.Game(480, 320, Phaser.AUTO, 'mario-websockets-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  /* yo phaser:state new-state-files-put-here */
  game.state.add('controller', ns.Controller);
  game.state.start('boot');
}, false);
