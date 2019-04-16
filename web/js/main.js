const NUM_STICKERS = 11;
let chatCounter = 0;
let judul = document.getElementById('title');
let chatWindow = document.getElementById('chat-container');
let chatContent = document.getElementById("chat-content");
let input = document.getElementById("chatform");
let chatBox = document.getElementById("text-msg");
let chatButton = document.getElementById("text-btn");
let stickerButton = document.getElementById("sticker");
let newline = document.createElement('br');
let BOT_NAME = "Asti";
let BOT_ERROR_MSG = `Maaf ${BOT_NAME} sedang offline nih, silakan coba beberapa saat lagi ya. `;
let BOT_GREETINGS = `Haloo, saya Asti, apa yang bisa saya bantu hari ini?`;

// buat handle sticker button
let stickerBtnClickable = true;


chatWindow.addEventListener('animationend', function () {
    setTimeout(function () {
        judul.classList.add('animated', 'fadeIn');
        judul.classList.remove('hidden');
    }, 750);
})

judul.addEventListener('animationend', function () {
    setTimeout(function () {
        let botGreetings = botMessage(BOT_GREETINGS);
        chatContent.appendChild(botGreetings);
        chatContent.scrollTop = chatContent.scrollHeight;
        chatBox.focus();
    }, 300);
});

chatButton.addEventListener('click', function () {
    let message = chatBox.value;
    if (message !== "") {
        processChat(message, BOT_ERROR_MSG); //sementara
        chatBox.value = '';
    }
});

input.addEventListener('click', function () {
    chatBox.focus();
});

stickerButton.addEventListener('click', function () {
    if (stickerBtnClickable) {
        stickerBtnClickable = false;
        processSticker();
    }
});


function mySticker() {
    let chat = document.createElement("span");
    chatCounter++;
    chat.classList.add('message', 'my-message', 'chat', 'chat' + chatCounter.toString());
    let sticker = document.createElement('img');
    let num = Math.floor((Math.random() * NUM_STICKERS) + 1);
    let src = `../web/assets/stickers/${num}.png`;
    sticker.setAttribute('src', src);
    sticker.classList.add('sticker', 'my-sticker');
    chat.appendChild(sticker);
    return chat;
}

function myMessage(message) {
    let chat = document.createElement("span");
    chatCounter++;
    chat.classList.add('message', 'my-message', 'chat', 'chat' + chatCounter.toString());
    chat.innerText = message;
    return chat;
}

function botSticker() {
    let chat = document.createElement("span");
    chatCounter++;
    chat.classList.add('message', 'bot-message', 'chat', 'chat' + chatCounter.toString());
    chat.innerHTML = `
        <span class="bot-blockchat-name">${BOT_NAME}</span><br>
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
    chat.classList.add('message', 'bot-message', 'chat', 'chat' + chatCounter.toString());
    chat.innerHTML = `
        <span class="bot-blockchat-name">${BOT_NAME}</span><br>${message}
    `;
    return chat;
}

function processChat(myChat, botChat) {
    myBlockChat = myMessage(myChat);
    chatContent.appendChild(myBlockChat);
    chatContent.scrollTop = chatContent.scrollHeight;
    setTimeout(function () {
        botResponse = botMessage(botChat);
        chatContent.appendChild(botResponse);
        chatContent.scrollTop = chatContent.scrollHeight;
        chatBox.focus();
    }, 500);
}

function processSticker() {
    myStickerChat = mySticker();
    chatContent.appendChild(myStickerChat);
    chatContent.scrollTop = chatContent.scrollHeight;
    setTimeout(function () {
        botStickerChat = botSticker();
        chatContent.appendChild(botStickerChat);
        chatContent.scrollTop = chatContent.scrollHeight;
        chatBox.focus();
        setTimeout(function () {
            stickerBtnClickable = true;
        }, 200);
    }, 500);
}