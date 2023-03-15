const express = require('express');
const app =  express();
const http = require('http');
const server = http.createServer(app);
const { Server }  = require("socket.io");
const io = new Server (server);
var path = require("path");
let PORT = 8080;

server.listen(PORT, () => {
    console.log('Serveur démarré sur le port:'+PORT);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});
app.get('/js/client.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'js/client.js'));
});
app.get('/css/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'css/style.css'));
});



io.on('connection',(socket)=>{

    socket.on('set-pseudo',(pseudo)=>{
        console.log(pseudo + "vient de se connecter à "+new Date ());
        socket.nickname = pseudo;
    });
        // Récupération de la liste des utilisateurs (Sockets) connectés
        io.fetchSockets().then((room)=>{
            var utilisateurs=[];
            room.forEach((item) => {
                utilisateurs.push({
                    id_client : item.id,
                    pseudo_client : item.nickname,
                });
            });
            io.emit('reception_utilisateur',utilisateurs);
            console.table(utilisateurs);
        });

        //afficher pseudo (chat gpt)
        const users = {}; // Object to store connected users

        io.on('connection', (socket) => {
          // Add the connected user to the users object
          socket.on('set-pseudo', (pseudo) => {
            socket.pseudo = pseudo;
            users[socket.id] = pseudo;
            io.emit('listpseudo', Object.values(users)); // Emit the list of connected users to all clients
          });
        
          // Remove the disconnected user from the users object
          socket.on('disconnect', () => {
            delete users[socket.id];
            io.emit('listpseudo', Object.values(users)); // Emit the updated list of connected users to all clients
          });
        }); 

        

        // code pour envoyer des messages 
    socket.on('message',(message)=>{
        console.log('reception_message',socket.nickname+": "+message);//affiche le message dans la console
        socket.broadcast.emit('listmessage', socket.nickname+": "+message);//le message que vous recevez
        socket.emit('listmessage', socket.nickname+"(vous): "+message);//le message que vous avez envoyé
    });



        //deconnexion
    socket.on('disconnect',()=>{ //se deconnecter
    console.log(socket.nickname+" vient de se déconnecter");//afficher la deconexion dans la console
    });
});
