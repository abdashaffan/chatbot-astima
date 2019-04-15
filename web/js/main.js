let chatCounter = 0;
let windowChat = document.getElementById("chat-content");
let kotakPesan = document.getElementById("text-msg");
let tombolKirim = document.getElementById("text-btn");
let newline = document.createElement('br');
let ERROR_MSG = "Maaf saya sedang offline, silakan coba beberapa saat lagi. ";
let BOT_NAME = "Astimah";


tombolKirim.addEventListener('click', function (e) {
    e.preventDefault();
    let message = kotakPesan.value;
    if (message !== "") {
        processChat(message, ERROR_MSG); //sementara
        kotakPesan.value = '';
    }
});


function myMessage(message) {
    let chat = document.createElement("span");
    chatCounter++;
    chat.classList.add('message', 'my-message', 'chat', 'chat' + chatCounter.toString(), 'hidden');
    chat.innerText = message;
    return chat;
}

function botMessage(message) {
    let chat = document.createElement("span");
    chatCounter++;
    chat.classList.add('message', 'bot-message', 'chat', 'chat' + chatCounter.toString(), 'hidden');
    chat.innerHTML = `
        <p class="bot-blockchat-name">${BOT_NAME}</p>${message}
    `;
    return chat;
}

function raiseAllChatHistory(chatHistories, upscale) {

    for (let i = 0; i < chatHistories.length; i++) {


        let currentHeight = window.getComputedStyle(chatHistories[i]).bottom;
        currentHeight = Number(currentHeight.slice(0, -2));


        let finalHeight = currentHeight + upscale;


        chatHistories[i].style.bottom = `${currentHeight + upscale + 10}px`;


    }

}

function processChat(myChat, botChat) {
    let initialChatHistories = document.querySelectorAll('.chat');
    myBlockChat = myMessage(myChat);
    windowChat.appendChild(myBlockChat);
    if (chatCounter !== 1) {
        let myCurrentChatClass = `.chat${chatCounter}`;
        let myChatUpInPixels = document.querySelector(myCurrentChatClass).getBoundingClientRect().height;
        raiseAllChatHistory(initialChatHistories, myChatUpInPixels);
    }
    myBlockChat.classList.remove('hidden');

    let chatHistories = document.querySelectorAll('.chat'); //Masukkan pesan bot pada DOM secata hidden agar nilai height bisa diambil terlebih dahulu
    botResponse = botMessage(botChat);
    windowChat.appendChild(botResponse);
    let botCurrentChatClass = `.chat${chatCounter}`;
    setTimeout(function () {
        //Angkat semua chat sebelum balasan bot ditampilkan (tidak di hidden)
        let botChatUpInPixels = document.querySelector(botCurrentChatClass).getBoundingClientRect().height;
        raiseAllChatHistory(chatHistories, botChatUpInPixels);
        botResponse.classList.remove('hidden'); //Perlihatkan respon bot

    }, 1000);

}