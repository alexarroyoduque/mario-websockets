window.addEventListener('load', function () {
  'use strict';

  var ns = window['mario-websockets'];
  var game = new Phaser.Game(640, 480, Phaser.AUTO, 'mario-websockets-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  /* yo phaser:state new-state-files-put-here */
  game.state.add('game', ns.Game);
  game.state.start('boot');
}, false);
