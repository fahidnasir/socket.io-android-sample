var app = require('express')();
var http = require('http').Server(app);
var io =  require('socket.io')(http);

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/views/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('chat message', function(msg){
        io.emit('response message', msg);
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
});

http.listen(3355, function(){
    console.log('listening on *:3355');
});