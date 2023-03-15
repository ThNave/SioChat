var socket = io();
var id_salon ='salon';//variable qui va definir un destinataire (par defaut, le salon général)
var lesMessage = [];//tableau qui va contenir l'enssemble des messages envoyé (semi persistance)

//demander pseudo
socket.emit('set-pseudo', prompt("Pseudo ?"));


var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var pseudo = document.getElementById('pseudo');

form.addEventListener('submit',(e) => {
    e.preventDefault();
    socket.emit('message', input.value);
    input.value = '';
});

//afficherles pseudo connecter (chat gpt)
// Create a container element for the list of connected users
const pseudoList = document.createElement('ul');
document.body.appendChild(pseudoList);

// Listen to the 'listpseudo' event and update the list of connected users on the UI
socket.on('listpseudo', (userList) => {
  // Clear the previous list of connected users
  pseudoList.innerHTML = '';

  // Add each user to the list
  userList.forEach((pseudo) => {
    const userElem = document.createElement('li');
    userElem.textContent = pseudo;
    pseudoList.appendChild(userElem);
  });
});

// code pour afficher les messages sur la page
socket.on('listmessage', (message) =>{
  const list=document.createElement('li');
  list.innerHTML=message;
  messages.appendChild(list);
});

//affichage message en fonction des choix d el utilisateur
//-soit les messages du salon général
//-soit les messages d'une conversation avec un autre utilisateur
function salon(id){
  const messageContainer = document.getElementById('message-container');
  messageContainer.innerHTML='';

  //afficher chaque message dans le conteneur de message
    lesMessages.forEach((message) => {
      console.log("le salon"+message.salon)
      console.log("l'id"+id)

      console.log("emet id"+message.emet_id)
      console.log("l'id courant"+socket.id)
        const messageElem = document.createElement('div');
    })

  /*Acompleter */
}

//verifier message non lus, puis affiche un badge de notifications
//incrémenté a coté de l'utilisateur en question
function check_unread(){
  
  /*Acompleter*/
}




//a partir de la tout en commentaire

/*
this.socket.fromEvent('reception_message').subscribe((contenu: string) => {
    if (contenu) {
      var message = document.createElement('li');
      message.textContent = contenu;
      messages.appendChild(message);
    }
  });
  
  this.socket.fromEvent('user_join').subscribe((pseudo: string) => {
    if (pseudo) {
      var message = document.createElement('li');
      message.textContent = pseudo + ' a rejoint le chat.';
      messages.appendChild(message);
    }
  });
  
  this.socket.fromEvent('user_leave').subscribe((pseudo: string) => {
    if (pseudo) {
      var message = document.createElement('li');
      message.textContent = pseudo + ' a quitté le chat.';
      messages.appendChild(message);
    }
  });
  */