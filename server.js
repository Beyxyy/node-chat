// Description: Server for the chat app
const http = require('http');

const bdd = require('./services/mongo.js');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, World!');
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});


//corrige erreur de allow control origin
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']    
    }
});

io.on('connection', function (socket) {
        console.log('a user connected');

    //envoie de message    
    socket.on('chat-message', function (msg) {
        console.log('message: ' + msg.message + ' user: ' +msg.pseudo); 
        socket.emit('chat-message', {message : msg.message, pseudo : 'youO'});
        socket.broadcast.emit('chat-message', msg);
    });
    //message de déconnexion
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});
//utilise socket.io pour créer un systeme d'écoute de message



