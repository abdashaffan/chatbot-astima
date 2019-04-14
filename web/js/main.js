let chatCounter = 0;
let windowChat = document.getElementById("chat-container");
let kotakPesan = document.getElementById("text-msg");
let tombolKirim = document.getElementById("text-btn");
let newline = document.createElement('br');
let ERROR_MSG = "Maaf saya sedang offline.";
let BOT_NAME = "Asti";

tombolKirim.addEventListener('click', function (e) {
    e.preventDefault();
    let message = kotakPesan.value;
    processChat(message, ERROR_MSG); //sementara
});

function myMessage(message) {
    let chat = document.createElement("span");
    chat.classList.add('message', 'my-message', 'chat', 'chat' + chatCounter.toString());
    chatCounter++;
    chat.innerText = message;
    return chat;
}

function botMessage(message) {
    let chat = document.createElement("span");
    chat.classList.add('message', 'bot-message', 'chat', 'chat' + chatCounter.toString());
    chatCounter++;
    chat.innerHTML = `
        <p class="bot-blockchat-name">${BOT_NAME}</p><br>${message}
    `;
    console.log(chat);
    return chat;
}

function processChat(myChat, botChat) {
    myBlockChat = myMessage(myChat);
    windowChat.appendChild(myBlockChat);
    windowChat.appendChild(newline);
    setTimeout(function () {
        console.log(document.querySelector('.chat').getBoundingClientRect());
    }, 1000);
    botResponse = botMessage(botChat);
    windowChat.appendChild(botResponse);
    windowChat.appendChild(newline);

}