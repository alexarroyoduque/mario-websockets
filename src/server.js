var app = require('express')(),
    express = require('express'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    _ = require('lodash');

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });

http.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

var client = {
  screen: '',
  controllers: []
};

io.on('connection', function (socket){
  console.log('Conexión entrando');

  function cleanRoom() {
    console.log('Sala vaciada');
    client.controllers.length = 0;
    socket.emit('cleanRoom_resend', {});
    socket.broadcast.emit('cleanRoom_resend', {});
  }
  socket.on('cleanRoom', function () {
    if (client.screen) {
      cleanRoom();
      client.screen = socket.id;
    }
  });

  socket.on('disconnect', function () {
    if (client.screen === socket.id) {
      console.log('Pantalla desconectada');
      cleanRoom();
    } else {
      console.log('Jugador desconectado');
      _.remove(client.controllers, {id: socket.id});
      if (client.screen) {
        io.to(client.screen).emit('killPlayer', {id: socket.id});
      }
    }
  });

  socket.on('register_screen', function (data) {
    console.log('Screen registrada');
    client.screen = socket.id;
  });

  socket.on('register_newPlayer', function (data) {
    console.log('register_newPlayer');
    var playerData = {id: socket.id};

    client.controllers.push(playerData);
    console.log('Nuevo jugador');
    console.log(client.controllers);
    socket.emit('register_newPlayer_resend', playerData);

    if (client.screen) {
      io.to(client.screen).emit('register_newPlayer_resend', {
        id: playerData.id
      });
    }
  });

  socket.on('playerPosition', function (data) {
    if (client.screen) {
      io.to(client.screen).emit('playerPosition_resend', {
        id: data.id,
        x: data.x,
        y: data.y
      });
    }
  });

});

app.use(express.static('src'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/controller.html');
});

app.get('/controller', function (req, res) {
  res.sendFile(__dirname + '/controller.html');
});

app.get('/screen', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/src/phaser-arcade-physics.min.js', function (req, res) {
  res.sendFile(__dirname + '/src/phaser-arcade-physics.min.js');
});

app.get('/src/screen-scripts.min.js', function (req, res) {
  res.sendFile(__dirname + '/src/screen-scripts.min.js');
});

app.get('/src/controller-scripts.min.js', function (req, res) {
  res.sendFile(__dirname + '/src/controller-scripts.min.js');
});
