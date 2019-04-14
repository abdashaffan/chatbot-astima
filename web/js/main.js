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
    kotakPesan.value = '';
});

function myMessage(message) {
    let chat = document.createElement("span");
    chatCounter++;
    chat.classList.add('message', 'my-message', 'chat', 'chat' + chatCounter.toString());
    chat.innerText = message;
    return chat;
}

function botMessage(message) {
    let chat = document.createElement("span");
    chatCounter++;
    chat.classList.add('message', 'bot-message', 'chat', 'chat' + chatCounter.toString(), 'hidden');
    chat.innerHTML = `
        <p class="bot-blockchat-name">${BOT_NAME}</p><br>${message}
    `;
    return chat;
}

function raiseAllChatHistory(chatHistories, upscale) {
    let allPastChats = [].slice.call(chatHistories); //mengubah nodeList ke array sudah pengolahan lebih mudah
    let scale = upscale.height;
    allPastChats.forEach(function () {
        console.log(`bergerak ke atas sebesar ${scale}`); //harusnya pake fungsi transisi
    });
}

function processChat(myChat, botChat) {
    myBlockChat = myMessage(myChat);
    windowChat.appendChild(myBlockChat);
    let chatHistories = document.querySelectorAll('.chat');
    botResponse = botMessage(botChat);
    windowChat.appendChild(botResponse);
    let currentChatClass = `.chat${chatCounter}`;
    setTimeout(function () {
        let upInPixels = document.querySelector(currentChatClass).getBoundingClientRect();
        raiseAllChatHistory(chatHistories, upInPixels);
        botResponse.classList.remove('hidden');
    }, 1000);

}