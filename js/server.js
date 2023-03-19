//configuration des modules
const express = require('express');
const app =  express();
const http = require('http');
const server = http.createServer(app);
const { Server }  = require("socket.io");
const io = new Server (server);
var path = require("path");
let PORT = 8080;

//Port d'écoute
server.listen(PORT, () => {
    console.log('Serveur démarré sur le port:'+PORT);
});

//diréctions route des différentes pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});
app.get('/js/client.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'js/client.js'));
});
app.get('/css/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'css/style.css'));
});


//gestions connexion des clients
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
            io.emit('reception_utilisateurs',utilisateurs);//RETIRER LE S DE RECEPTIONUTILISATEURS EN CA DE PROBLèME
            console.table(utilisateurs)
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
