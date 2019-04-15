let chatCounter = 0;
let NUM_STICKERS = 11;
let judul = document.getElementById('title');
let chatWindow = document.getElementById('chat-container');
let chatContent = document.getElementById("chat-content");
let kotakPesan = document.getElementById("text-msg");
let tombolKirim = document.getElementById("text-btn");
let tombolStiker = document.getElementById("sticker");
let newline = document.createElement('br');
let ERROR_MSG = "Maaf saya sedang offline, silakan coba beberapa saat lagi. ";
let BOT_NAME = "Astimah";


chatWindow.addEventListener('animationend', function () {
    setTimeout(function () {
        judul.classList.add('animated', 'fadeIn');
        judul.classList.remove('hidden');
    }, 300);
})



tombolKirim.addEventListener('click', function () {
    let message = kotakPesan.value;
    if (message !== "") {
        processChat(message, ERROR_MSG); //sementara
        kotakPesan.value = '';
    }
});

tombolStiker.addEventListener('click', processSticker);

function mySticker() {
    let sticker = document.createElement('img');
    let num = Math.floor((Math.random() * NUM_STICKERS) + 1);
    let src = `../web/assets/stickers/${num}.png`;
    sticker.setAttribute('src', src);
    chatCounter++;
    sticker.classList.add('sticker', 'my-sticker', 'chat', 'chat' + chatCounter.toString());
    return sticker;
}

function myMessage(message) {
    let chat = document.createElement("span");
    chatCounter++;
    chat.classList.add('message', 'my-message', 'chat', 'chat' + chatCounter.toString(), 'hidden');
    chat.innerText = message;
    return chat;
}

function botSticker() {
    let chat = document.createElement("span");
    chatCounter++;
    chat.classList.add('message', 'bot-message', 'chat', 'chat' + chatCounter.toString(), 'hidden');
    chat.innerHTML = `
        <p class="bot-blockchat-name">${BOT_NAME}</p><br>
    `;
    let sticker = document.createElement('img');
    let num = Math.floor((Math.random() * NUM_STICKERS) + 1);
    let src = `../web/assets/stickers/${num}.png`;
    sticker.setAttribute('src', src);
    sticker.classList.add('sticker', 'bot-sticker');
    chat.appendChild(sticker);
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
        chatHistories[i].style.bottom = `${currentHeight + upscale + 10}px`;
    }

}

function processChat(myChat, botChat) {
    let initialChatHistories = document.querySelectorAll('.chat');
    myBlockChat = myMessage(myChat);
    chatContent.appendChild(myBlockChat);
    if (chatCounter !== 1) {
        let myCurrentChatClass = `.chat${chatCounter}`;
        let myChatUpInPixels = document.querySelector(myCurrentChatClass).getBoundingClientRect().height;
        raiseAllChatHistory(initialChatHistories, myChatUpInPixels);
    }
    myBlockChat.classList.remove('hidden');

    let chatHistories = document.querySelectorAll('.chat'); //Masukkan pesan bot pada DOM secata hidden agar nilai height bisa diambil terlebih dahulu
    botResponse = botMessage(botChat);
    chatContent.appendChild(botResponse);
    let botCurrentChatClass = `.chat${chatCounter}`;
    setTimeout(function () {
        //Angkat semua chat sebelum balasan bot ditampilkan (tidak di hidden)
        let botChatUpInPixels = document.querySelector(botCurrentChatClass).getBoundingClientRect().height;
        raiseAllChatHistory(chatHistories, botChatUpInPixels);
        botResponse.classList.remove('hidden'); //Perlihatkan respon bot

    }, 500);

}

function processSticker() {
    let initialChatHistories = document.querySelectorAll('.chat');
    myStickerChat = mySticker();
    chatContent.appendChild(myStickerChat);
    if (chatCounter !== 1) {
        let myCurrentChatClass = `.chat${chatCounter}`;
        let myChatUpInPixels = document.querySelector(myCurrentChatClass).getBoundingClientRect().height;
        raiseAllChatHistory(initialChatHistories, myChatUpInPixels);
    }
    myStickerChat.classList.remove('hidden');

    let chatHistories = document.querySelectorAll('.chat'); //Masukkan pesan bot pada DOM secata hidden agar nilai height bisa diambil terlebih dahulu
    botStickerChat = botSticker();
    chatContent.appendChild(botStickerChat);
    let botCurrentChatClass = `.chat${chatCounter}`;
    setTimeout(function () {
        //Angkat semua chat sebelum balasan bot ditampilkan (tidak di hidden)
        let botChatUpInPixels = document.querySelector(botCurrentChatClass).getBoundingClientRect().height;
        raiseAllChatHistory(chatHistories, botChatUpInPixels);
        botStickerChat.classList.remove('hidden'); //Perlihatkan respon bot

    }, 500);
}