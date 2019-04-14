let windowChat = document.getElementById("chat-container");
let kotakPesan = document.getElementById("text-msg");
let tombolKirim = document.getElementById("text-btn");


tombolKirim.addEventListener('click', function (e) {
    e.preventDefault();
    let message = kotakPesan.value;
    console.log(message);
    createMessage(message);

});

function createMessage(message) {
    let chat = document.createElement("span");
    let br = document.createElement('br');
    chat.classList.add('message', 'my-message');
    chat.innerText = message;
    console.log(chat);
    windowChat.appendChild(chat);
    windowChat.appendChild(br);

}

// function raisechatMessages() {
//     let messageList = document.querySelectorAll("#text-chat");
// }

// function raiseChat() {

// }