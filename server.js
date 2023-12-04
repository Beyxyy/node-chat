// Description: Server for the chat app
require('dotenv').config();
const express   = require('express');
const session   = require('express-session');


// importation des websockets
const http      = require('http');

//importation de passport
const passport  = require('passport');
const PPRT = require("./auth/passport");



//déclaration de mongoose
const mongoose  = require('mongoose');
const cors = require('cors'); // Importez le module cors

const bodyParser = require('body-parser');
app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret:'oneboy',
    saveUninitialized: true,
    resave: true
  }));

  
PPRT.ProcessLogin(passport);
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes.js');
require('./routes/chatRoutes.js');


const uri = `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@cluster0.mmzkmud.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});




app.listen(4000, () => {
    console.log('Server running on port 4000');
});




//ajout des web sockets 
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, World!');
});




// corrige erreur des cors
const { methods } = require('expres');
app.use(cors());



const io = require('socket.io')(server);

io.on('connection', (socket) => {
    // Rejoindre un salon
    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room);
        // Envoi d'un message de bienvenue au client
        socket.emit('message', 'Bienvenue dans le salon ' + room);
        // Annoncer à tous les autres clients sauf l'émetteur
        socket.broadcast.to(room).emit('message', `${username} a rejoint le salon.`);
    });
    // Envoi de messages dans un salon
    socket.on('sendMessage', ({ room, message }) => {
        io.to(room).emit('message', message);
    });
    // Quitter un salon
    socket.on('disconnect', () => {
        // Annonce à tous dans le salon
        io.emit('message', 'Un utilisateur a quitté le salon');
    });
});

// utilise socket.io pour créer un systeme d'écoute de message



