var fs = require('fs');
var http = require('http');
var socketio = require('socket.io');
var server = http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-type': 'text/html' });
    response.end(fs.readFileSync(__dirname + '/index.html'));
}).listen(8080, function () {
    console.log('Listening at: http://localhost:8080');
});
socketio.listen(server).on('connection', function (socket) {
    socket.on('message', function (message) {
        console.log('Message Received: ', message);
        socket.broadcast.emit('message', message);
    });
    socket.on('else', function (message) {
        console.log('Other: ', message);
    });
});
