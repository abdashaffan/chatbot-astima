// DOM Node selector
const judul = document.getElementById('title');
const chatWindow = document.getElementById('chat-container');
const chatContent = document.getElementById("chat-content");
const input = document.getElementById("chatform");
const chatBox = document.getElementById("text-msg");
const chatButton = document.getElementById("text-btn");
const stickerButton = document.getElementById("sticker");
const newline = document.createElement('br');

// Const and global variables
const NUM_STICKERS = 11;
const BOT_NAME = "Asti";

const BOT_CMD_START = "/start";
const BOT_CMD_HELP = "/help";
const BOT_CMD_MODE_RANDOM = "/setrandom";
const BOT_CMD_MODE_SPECIFIC = "/setspecific";

const BOT_UNDEFINED_MSG = "Invalid Command";
const BOT_ERROR_MSG = `Sorry i can't answer your chat, please try again in a few moments`;
const BOT_HELP_MSG = `To start answering questions, please type <span class = "command" >${BOT_CMD_START}</span >`;
const BOT_GREETINGS_MSG = `Hello, i'm ${BOT_NAME}.<br>${BOT_HELP_MSG}`;
const BOT_SELECT_MODE_MSG = `
    <span style="background:inherit;">
            1. Type <span class="command">${BOT_CMD_MODE_RANDOM}</span> to answer random question with different categories <br><br>
            2. Type <span class="command"> ${BOT_CMD_MODE_SPECIFIC} </span> to answer random question with same category
    </span>
`;

let chatCounter = 0;
let isGameStarted = false;
let gameMode = 0;
let score = 0;



chatWindow.addEventListener('animationend', function () {
    setTimeout(function () {
        judul.classList.add('animated', 'fadeIn');
        judul.classList.remove('hidden');
    }, 750);
})

judul.addEventListener('animationend', function () {
    setTimeout(function () {
        let botGreetings = botMessage(BOT_GREETINGS_MSG);
        chatContent.appendChild(botGreetings);
        chatContent.scrollTop = chatContent.scrollHeight;
        chatBox.focus();
    }, 300);
});

chatButton.addEventListener('click', function () {
    let message = chatBox.value;
    if (message !== "") {
        processChat(message, handleMessage(message));
        chatBox.value = '';
    }
});

input.addEventListener('click', function () {
    chatBox.focus();
});

// buat handle sticker button
let stickerBtnClickable = true;
stickerButton.addEventListener('click', function () {
    if (stickerBtnClickable) {
        stickerBtnClickable = false;
        processSticker();
    }
});


function handleMessage(message) {
    if (!isGameStarted && message === BOT_CMD_START) {
        isGameStarted = true;
        return BOT_SELECT_MODE_MSG;
    } else if (isGameStarted) {
        let prefix = '';
        if (!gameMode) { //gameMode belum diset
            prefix = `Okay, let's play`;
            if (message === BOT_CMD_MODE_RANDOM) {
                gameMode = 1;
                return `${prefix} random question mode..`;
            } else if (message === BOT_CMD_MODE_SPECIFIC) {
                gameMode = 2;
                return `${prefix} specific question mode..`;
            }
            return BOT_UNDEFINED_MSG;
        } else {
            prefix = `Change game mode to`;
            if (message === BOT_CMD_MODE_RANDOM && gameMode != 1) {
                gameMode = 1;
                return `${prefix} random question mode..`;
            } else if (message === BOT_CMD_MODE_SPECIFIC && gameMode != 2) {
                gameMode = 2;
                return `${prefix} specific question mode..`;
            } else {
                return BOT_UNDEFINED_MSG;
            }
        }
    } else {
        return BOT_HELP_MSG;
    }
}


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

function send(chatNode) {
    chatContent.appendChild(chatNode);
    chatContent.scrollTop = chatContent.scrollHeight;
}


function processChat(myChat, botChat) {
    myBlockChat = myMessage(myChat);
    send(myBlockChat);
    setTimeout(function () {
        botResponse = botMessage(botChat);
        send(botResponse);
        chatBox.focus();
    }, 500);
}

function processSticker() {
    myStickerChat = mySticker();
    send(myStickerChat);
    setTimeout(function () {
        botStickerChat = botSticker();
        send(botStickerChat);
        setTimeout(function () {
            stickerBtnClickable = true;
            chatBox.focus();
        }, 200);
    }, 500);
}