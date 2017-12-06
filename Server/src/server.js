

/** ExpressJS block */
var app = require('express')();

app.get('/', (req, res)=> {
    res.sendFile(__dirname + '/views/index.html');
});

var server = app.listen(3355, function(){
    console.log('listening on *:3355');
});
/** end ExpressJS block */

/** Socket.IO block */
var io =  require('socket.io')(server);

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('chat message', function(msg){
        io.emit('response message', msg);
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
});
/** end Socket.IO block */
