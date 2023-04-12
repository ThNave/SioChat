//création d'un socket.io
var socket = io();

//définition variable
var id_salon ='salon';
var lesMessage = [];
var user = null;

//variable qui va contenir les infos de l'utilisateurs
let infosUtilisateur;

//demander pseudo
socket.emit('set-pseudo', prompt("Pseudo ?"));

//récupérations éléments du DOM
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var usersContainer = document.getElementById('utilisateurs');


//gestion envois du message
form.addEventListener('submit',(e) => {
    e.preventDefault();
    socket.emit('message', input.value);//envois du message via le socket
    input.value = '';//vidage du champ saisie
});

// code pour afficher les messages sur la page
socket.on('listmessage', (message) =>{
  //ajout du message a l'interface
  const list=document.createElement('li');
  list.innerHTML=message;
  messages.appendChild(list);
});

//affichage des messages en fonction du choix de l'utilisateur :
// - Soit les messages du salon général
// - Soit les messages d'une conversation privé avec un autre utilisateur
function salon(id){
  console.log(id_client);

  /*A completer */
}




// Réception de la liste des utilisateurs connectés envoyée par le serveur
socket.on('reception_utilisateurs', (utilisateurs) => {

  // Vidage de la liste des utilisateurs affichée
  usersContainer.innerHTML = '';
  
  // Parcours de la liste des utilisateurs
utilisateurs.forEach((utilisateur) => {
  // Récupération de l'ID de l'utilisateur
  user = utilisateur.id_client;

  // Si l'utilisateur n'est pas le client courant, on l'ajoute à la liste des utilisateurs affichée
  if (user !== socket.id) { //pour ne pas afficher son propre pseudo
    const userElem = document.createElement('div');
    const userProfileURL = 'http://siochat/profile/' + utilisateur.pseudo_client; // URL de la page de profil de l'utilisateur
    userElem.innerHTML = '<a href="' + userProfileURL + '">' + utilisateur.pseudo_client + '</a>'; // ajout de la balise <a>
    usersContainer.appendChild(userElem);
  } 

});
});