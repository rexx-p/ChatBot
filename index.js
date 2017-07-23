var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http)

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');

});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('chat message', function (data) {
        console.log('message : ' + JSON.stringify(data));
        io.emit('chat message', data);
    });

    socket.on('stop typing', function (data) {
        console.log('stop typing ');
        io.emit('stop typing', data);
    });


    socket.on('typing', function (data) {
        console.log('typing message : ' + JSON.stringify(data));
        socket.broadcast.emit('typing', data);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});
