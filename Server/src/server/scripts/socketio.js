var isTokenValid = (token) => {
	//authenticat encryption or user record in database
	return true;
}
/** Variables */
var connectedUsers = 0;

module.exports = (server) => {
    console.log('io module');
    var io = require('socket.io')(server);

    // middleware to verify on Connecting and Reconnecting
    io.use((socket, next) => {
        let token = socket.handshake.query.token;
				if (true || isTokenValid(token)) {
        	return next();
        }
        return next(new Error('authentication error'));
    });

    io.on('connection', function(socket) {
        console.log('a user connected');
        var addedUser = false;

        // when the client emits 'new message', this listens and executes
        socket.on('new message', function(data) {
            // we tell the client to execute 'new message'
            socket.broadcast.emit('new message', {
                username: socket.username,
                message: data
            });
        });

        // when the client emits 'add user', this listens and executes
        socket.on('add user', function(username) {
            console.log('a user added');
            if (addedUser) return;

            // we store the username in the socket session for this client
            socket.username = username;
            ++connectedUsers;
            addedUser = true;
            socket.emit('login', {
                connectedUsers: connectedUsers
            });
            // echo globally (all clients) that a person has connected
            socket.broadcast.emit('user joined', {
                username: socket.username,
                connectedUsers: connectedUsers
            });
        });

        // when the client emits 'typing', we broadcast it to others
        socket.on('typing', function() {
            socket.broadcast.emit('typing', {
                username: socket.username
            });
        });

        // when the client emits 'stop typing', we broadcast it to others
        socket.on('stop typing', function() {
            socket.broadcast.emit('stop typing', {
                username: socket.username
            });
        });

        // when the user disconnects.. perform this
        socket.on('disconnect', function() {
            console.log('a user disconnected');
            if (addedUser) {
                --connectedUsers;

                // echo globally that this client has left
                socket.broadcast.emit('user left', {
                    username: socket.username,
                    connectedUsers: connectedUsers
                });
            }
        });
    });
}