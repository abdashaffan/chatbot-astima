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
let picture = document.getElementById("bot-picture");

// Const and global variables
const NUM_STICKERS = 11;
const UNDEFINED = -999;
const BOT_NAME = "Lyara";

const BOT_CMD_START = "/start";
const BOT_CMD_HELP = "/help";
const BOT_CMD_MODE_RANDOM = "/random";
const BOT_CMD_MODE_SPECIFIC = "/specific";
const BOT_CMD_EXIT = "/exit";


const BOT_START_FIRST_MSG = `Please start the session first.`;
const BOT_ERROR_MSG = `ERROR`;
const BOT_FETCH_ERROR_MSG = `Sorry there was a mistake when loading your questions. please try again in a few moments.`;
const BOT_GREETINGS_MSG = `Hello, i'm ${BOT_NAME}.`;
const BOT_HELP_MSG = ` 
        Please type: <br>
        <span class = "command" >${BOT_CMD_START}</span > to start the game<br>
        <span class = "command" >${BOT_CMD_HELP}</span > to show help<br>
        <span class = "command" >${BOT_CMD_MODE_RANDOM}</span > to set question mode to random<br>
        <span class = "command" >${BOT_CMD_MODE_SPECIFIC}</span > to set question mode to specific<br>
        <span class = "command" >${BOT_CMD_EXIT}</span > to exit current session<br>
    `;
const BOT_SELECT_MODE_MSG = `
            1. Type <span class="command">${BOT_CMD_MODE_RANDOM}</span> to answer random question with different categories <br><br>
            2. Type <span class="command"> ${BOT_CMD_MODE_SPECIFIC} </span> to answer random question with same category
`;





function mySticker() {
    let chat = document.createElement("span");
    chat.classList.add('message', 'my-message', 'chat');
    let sticker = document.createElement('img');
    let num = Math.floor((Math.random() * NUM_STICKERS) + 1);
    let src = `assets/stickers/${num}.png`;
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
    chat.classList.add('message', 'bot-message', 'chat');
    chat.innerHTML = `
        <span class="bot-blockchat-name">${BOT_NAME}</span><br>
    `;
    let sticker = document.createElement('img');
    let num = Math.floor((Math.random() * NUM_STICKERS) + 1);
    let src = `assets/stickers/${num}.png`;
    sticker.setAttribute('src', src);
    sticker.classList.add('sticker', 'bot-sticker');
    chat.appendChild(sticker);
    return chat;
}

function botMessage(message) {

    let chat = document.createElement("span");
    setTimeout(function () {
        chat.classList.add('message', 'bot-message', 'chat');
        chat.innerHTML = `
            <span class="bot-blockchat-name">${BOT_NAME}</span><br>${message}
        `;
        chatContent.scrollTop = chatContent.scrollHeight; //
    }, 300);
    return chat;
}

function send(chatNode, bot = false) {
    chatContent.appendChild(chatNode);
    chatContent.scrollTop = chatContent.scrollHeight;
    if (bot) {
        animateProfile(1);
        animateProfile(1);
    }
}

function processSticker() {
    let myStickerChat = mySticker();
    send(myStickerChat);
    setTimeout(function () {
        let botStickerChat = botSticker();
        send(botStickerChat, true);
        setTimeout(function () {
            sticker.toggle();
            chatBox.focus();
        }, 200);
    }, 500);
}

function isUndefined(item) {
    return (item === UNDEFINED);
}

function isEqual(item1, item2) {
    return (item1 === item2);
}

function isAnswerCorrect(input, answer) {
    return (input.toLowerCase() === answer.toLowerCase());
}

function stopCurrentSession() {
    session.resetAnswer();
    session.resetquestionId();
    gameStatus.resetGameMode();
    gameStatus.stopGame();
    session.stopQuestionSession();
    send(botMessage(`Session stopped`), true);
}

function getRandomQuestion() {
    fetch("https://opentdb.com/api.php?amount=1&type=boolean")
        .then(res => res.json())
        .then(data => {
            session.setAnswer(data.results[0].correct_answer);
            send(botMessage(data.results[0].question), true);
        })
        .catch(function (err) {
            console.log(err);
            send(botMessage((BOT_FETCH_ERROR_MSG)), true);
            return;
        });
}

function getSpecificQuestion(questionId) {
    fetch(`https://opentdb.com/api.php?amount=1&category=${questionId}&type=boolean`)
        .then(res => res.json())
        .then(json => {
            session.setAnswer(json.results[0].correct_answer);
            send(botMessage(json.results[0].question), true);
        })
        .catch(err => {
            console.log(err);
            send(botMessage(BOT_FETCH_ERROR_MSG), true);
        });
}

function handleUserInput(input) {
    //jika game belum di /start
    if (!gameStatus.isGameStarted()) {
        if (isEqual(input, BOT_CMD_START)) {
            gameStatus.startGame();
            send(botMessage(BOT_SELECT_MODE_MSG)), true;
            return;
        }
        if (isEqual(input, BOT_CMD_HELP)) {
            send(botMessage(BOT_HELP_MSG), true);
            return;
        }
        if (isEqual(input, BOT_CMD_EXIT) || isEqual(BOT_CMD_MODE_RANDOM) || isEqual(BOT_CMD_MODE_SPECIFIC)) {
            send(botMessage(BOT_START_FIRST_MSG), true);
            return;
        }
        send(botMessage(BOT_HELP_MSG), true);
        return;

    }
    //kalo belum milih game mode
    if (gameStatus.isGameStarted() && isUndefined(gameStatus.currentGameMode())) {

        // /random
        if (isEqual(input, BOT_CMD_MODE_RANDOM)) {
            gameStatus.setGameMode(1);
            session.startQuestionSession();

            send(botMessage(`Let's play random question session`), true);
            send(botMessage(`Please answer with <span class="command">TRUE</span> or <span class="command">FALSE</span>`), true);
            getRandomQuestion();

            return;
        }
        // /specific
        if (isEqual(input, BOT_CMD_MODE_SPECIFIC)) {
            gameStatus.setGameMode(2);
            session.startQuestionSession();
            let category = session.getRandomCategory()
            let questionId = category.id;
            session.setQuestionId(questionId);
            let questionCategory = category.name;
            send(botMessage(`Let's play specific question session about <span class="topic-name">${questionCategory}</span>`), true);
            send(botMessage(`Please answer with <span class="command">TRUE</span> or <span class="command">FALSE</span>`), true);
            getSpecificQuestion(questionId);
            return;
        }
        if (isEqual(input, BOT_CMD_EXIT)) {
            stopCurrentSession();
            return;
        }
        send(botMessage(BOT_SELECT_MODE_MSG), true);
        return;

    }
    //kalo questionSession udah dimulai, yang masuk sini udah pasti jawaban
    if (session.getQuestionSession()) {
        //mode random
        if (gameStatus.currentGameMode() === 1) {
            if (isEqual(input, BOT_CMD_EXIT)) {
                stopCurrentSession();
                return;
            }
            if (isEqual(input, BOT_CMD_HELP)) {
                send(botMessage(BOT_HELP_MSG), true);
                return;
            }
            if (isEqual(input, BOT_CMD_MODE_SPECIFIC)) {
                send(botMessage(`Can't change session mode right now, Please exit first`), true);
                return;
            }
            if (isEqual(input, BOT_CMD_START)) {
                send(botMessage(`Can't start another session right now, Please exit first`));
                return;
            }
            if (isEqual(input, BOT_CMD_MODE_RANDOM)) {
                send(botMessage(`Already on random mode`));
                return;
            }
            if (isAnswerCorrect(input, session.getAnswer())) {
                send(botMessage(`Bingo! you got the answer right. Ready for another challenge ?`));
                getRandomQuestion();
                return;
            }
            send(botMessage(`Wrong!`), true);
            send(botMessage(`The answer was <span class="answer">${session.getAnswer()}</span> ! Better luck next time.`), true);
            getRandomQuestion();
            return;
        }
        //mode spesifik
        if (gameStatus.currentGameMode() === 2) {

            if (isEqual(input, BOT_CMD_EXIT)) {
                stopCurrentSession();
                return;
            }
            if (isEqual(input, BOT_CMD_HELP)) {
                send(botMessage(BOT_HELP_MSG), true);
                return;
            }
            if (isEqual(input, BOT_CMD_MODE_RANDOM)) {
                send(botMessage(`Can't change session mode right now, Please exit first`), true);
                return;
            }
            if (isEqual(input, BOT_CMD_START)) {
                send(botMessage(`Can't start another session right now, Please exit first`), true);
                return;
            }
            if (isEqual(input, BOT_CMD_MODE_SPECIFIC)) {
                send(botMessage(`Already on specific question mode`), true);
                return;
            }
            if (isAnswerCorrect(input, session.getAnswer())) {
                send(botMessage(`Bingo! you got the answer right. Ready for another challenge ?`), true);
                getSpecificQuestion(session.getQuestionId());
                return;
            }
            send(botMessage(`Wrong!`), true);
            send(botMessage(`The answer was <span class="answer">${session.getAnswer()}</span> ! Better luck next time.`), true);
            getSpecificQuestion(session.getQuestionId());
            return;
        }

    }

}

function executeChat() {
    let message = chatBox.value;
    if (message !== "") {
        send(myMessage(message));
        handleUserInput(message);
        chatBox.value = '';
    }
}


function animateProfile(idx) {
    if (idx > 5) {
        picture.src = `assets/avatar1.png`;
        return;
    }
    picture.src = `assets/avatar${idx}.png`;
    setTimeout(function () {
        animateProfile(++idx);
    }, 100);

}

function smile() {
    setTimeout(function () {
        picture.src = `assets/avatar${5}.png`;
    }, 300);
}

function unsmile() {
    setTimeout(function () {
        picture.src = `assets/avatar${1}.png`;
    }, 300);
}
let sticker = (function () {
    let stickerBtnClickable = false;
    return {
        toggle: function () {
            stickerBtnClickable = !stickerBtnClickable;
        },
        clickable: function () {
            return stickerBtnClickable;
        }
    };
})();

let session = (function () {

    let questionSession = false;
    let questionId = UNDEFINED;
    let questionCategories = {};
    fetch(`https://opentdb.com/api_category.php`)
        .then(res => res.json())
        .then(data => {
            questionCategories = data.trivia_categories; //array of objects
        })
        .catch(err => {
            console.log(err);
        });
    let answer = '';
    return {
        getQuestionSession: function () {
            return questionSession;
        },
        startQuestionSession: function () {
            questionSession = true;
        },
        stopQuestionSession: function () {
            questionSession = false;
        },
        getQuestionId: function () {
            return questionId;
        },
        setQuestionId: function (questionIdInt) {
            questionId = questionIdInt;
        },
        resetquestionId: function () {
            questionId = UNDEFINED;
        },
        getRandomCategory: function () {
            return questionCategories[Math.floor(Math.random() * questionCategories.length)];
        },
        getAnswer: function () {
            return answer;
        },
        setAnswer: function (_answer) {
            answer = _answer;
        },
        resetAnswer: function () {
            answer = '';
        }

    }

})();


let gameStatus = (function () {
    let gameStarted = false;
    let gameMode = UNDEFINED;


    return {

        isGameStarted: function () {
            return gameStarted;
        },
        startGame: function () {
            gameStarted = true;
        },
        stopGame: function () {
            gameStarted = false;
        },
        currentGameMode: function () {
            return gameMode;
        },
        setGameMode(gameModeInt) {
            gameMode = gameModeInt;
        },
        resetGameMode() {
            gameMode = UNDEFINED;
        }
    };
})();

let score = (function () {
    let scr = 0;

    return {

        getScore: function () {
            return scr;
        },
        add: function (points) {
            scr += points;
        },
        reset: function () {
            scr = 0;
        }
    };
})();

chatWindow.addEventListener('animationend', function () {
    setTimeout(function () {
        judul.classList.add('animated', 'fadeIn');
        judul.classList.remove('hidden');
        document.getElementById('footer').classList.add('animated', 'fadeIn');
        document.getElementById('footer').classList.remove('hidden');
    }, 750);
})
judul.addEventListener('animationend', function () {
    setTimeout(function () {
        let botGreetings = botMessage(BOT_GREETINGS_MSG);
        let botHelp = botMessage(BOT_HELP_MSG);
        send(botGreetings, true);
        setTimeout(function () {
            send(botHelp, true);
            sticker.toggle();
        }, 500);
        chatBox.focus();
    }, 300);
});
input.addEventListener('click', function () {
    chatBox.focus();
});
stickerButton.addEventListener('click', function () {
    if (sticker.clickable()) {
        sticker.toggle();
        processSticker();
    }
});
chatButton.addEventListener('click', function () {
    executeChat();
});
input.addEventListener('keypress', function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        executeChat();
    }
});
picture.addEventListener('mouseenter', smile);
picture.addEventListener('mouseleave', unsmile);
picture.addEventListener('click', smile);