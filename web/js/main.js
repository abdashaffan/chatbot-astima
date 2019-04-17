'use strict';

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
const BOT_CMD_MODE_RANDOM = "/random";
const BOT_CMD_MODE_SPECIFIC = "/specific";
const BOT_CMD_GIVEUP = "/giveup";
const BOT_CMD_EXIT = "/exit";


const BOT_ERROR_MSG = `ERROR`;
const BOT_FETCH_ERROR_MSG = `
    <span style="background:inherit;">
        Sorry there was a mistake when loading your questions. please try again in a few moments.
    </span>
`;
const BOT_GREETINGS_MSG = `
    <span style="background:inherit;">
        Hello, i'm ${BOT_NAME}.
    </span>
`;
const BOT_HELP_MSG = ` 
    <span style="background:inherit;">
        Please type: <br>
        <span class = "command" >${BOT_CMD_START}</span > to start the game<br>
        <span class = "command" >${BOT_CMD_HELP}</span > to show help<br>
        <span class = "command" >${BOT_CMD_MODE_RANDOM}</span > to set question mode to random<br>
        <span class = "command" >${BOT_CMD_MODE_SPECIFIC}</span > to set question mode to specific<br>
        <span class = "command" >${BOT_CMD_GIVEUP}</span > to giveup the current question<br>
        <span class = "command" >${BOT_CMD_EXIT}</span > to exit current session<br>
    </span>  
    `;
const BOT_SELECT_MODE_MSG = `
    <span style="background:inherit;">
            1. Type <span class="command">${BOT_CMD_MODE_RANDOM}</span> to answer random question with different categories <br><br>
            2. Type <span class="command"> ${BOT_CMD_MODE_SPECIFIC} </span> to answer random question with same category
    </span>
`;





function mySticker() {
    let chat = document.createElement("span");
    chat.classList.add('message', 'my-message', 'chat');
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
    chat.classList.add('message', 'my-message', 'chat');
    chat.innerText = message;
    return chat;
}


function botSticker() {
    let chat = document.createElement("span");
    chat.classList.add('message', 'bot-message', 'chat', 'bot-sticker-wrapper');
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
    chat.classList.add('message', 'bot-message', 'chat');
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
    let myBlockChat = myMessage(myChat);
    send(myBlockChat);
    setTimeout(function () {
        let botResponse = botMessage(botChat);
        send(botResponse);
        chatBox.focus();
    }, 500);
}

function processSticker() {
    let myStickerChat = mySticker();
    send(myStickerChat);
    setTimeout(function () {
        let botStickerChat = botSticker();
        send(botStickerChat);
        setTimeout(function () {
            stickerBtnClickable = true;
            chatBox.focus();
        }, 200);
    }, 500);
}

// function playRandomMode(userAnswer) {
//     let question = '';
//     let answer = '';
//     fetch("http://jservice.io/api/random?1")
//         .then(res => res.json())
//         .then((data) => {
//             question = data[0].question;
//             answer = data[0].answer;
//             return play(userAnswer, question, answer);
//         })
//         .catch(function (err) {
//             console.log(err);
//             return (BOT_FETCH_ERROR_MSG);
//         });
// }

// function playSpecificMode(userAnswer, id) {
//     let question = '';
//     let answer = '';
//     fetch(`http://jservice.io/api/category?id=${id}`)
//         .then(res => res.json())
//         .then((data) => {
//             let questionNum = data.clues[Math.floor(Math.random() * data.clues.length)];
//             question = data.clues[questionNum].question;
//             answer = data.clues[questionNum].answer;
//             return play(userAnswer, question, answer);
//         })
//         .catch(function (err) {
//             console.log(err);
//             return (BOT_FETCH_ERROR_MSG);
//         });
// }



let isGameStarted = false;
let gameMode = 0;
let stickerBtnClickable = true;
let popularCategoryId = [ //dari jService.io/popular
    136, 42, 21, 25, 103, 442, 114, 49, 530, 672, 78, 680, 99, 309, 218, 1079, 197, 2537
];
let questionId = -1;


chatWindow.addEventListener('animationend', function () {
    setTimeout(function () {
        judul.classList.add('animated', 'fadeIn');
        judul.classList.remove('hidden');
    }, 750);
})
judul.addEventListener('animationend', function () {
    // setTimeout(function () {
    let botGreetings = botMessage(BOT_GREETINGS_MSG);
    let botHelp = botMessage(BOT_HELP_MSG);
    send(botGreetings);
    setTimeout(function () {
        console.log('yo');
        send(botHelp);
    }, 500);
    chatBox.focus();
    // }, 300);
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
chatButton.addEventListener('click', function () {
    let message = chatBox.value;
    if (message !== "") {
        processChat(message, BOT_ERROR_MSG);
        chatBox.value = '';
    }
});