import * as fs from 'fs';
import * as http from 'http';
import * as socketio from 'socket.io';

const server = http.createServer((request: http.ServerRequest, response: http.ServerResponse) => {
	response.writeHead(200, { 'Content-type': 'text/html'});
	response.end(fs.readFileSync(__dirname + '/index.html'));
}).listen(8080, (): void => {
	console.log('Listening at: http://localhost:8080');
});

socketio.listen(server).on('connection', (socket: SocketIO.Socket): void => {
	socket.on('message', (message: string): void => {
		console.log('Message Received: ', message);
		socket.broadcast.emit('message', message);
	});
	socket.on('else', (message: string): void => {
		console.log('Other: ', message);
	});
});
