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
const UNDEFINED = -999;
const BOT_NAME = "Asti";

const BOT_CMD_START = "/start";
const BOT_CMD_HELP = "/help";
const BOT_CMD_MODE_RANDOM = "/random";
const BOT_CMD_MODE_SPECIFIC = "/specific";
const BOT_CMD_GIVEUP = "/giveup";
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
        <span class = "command" >${BOT_CMD_GIVEUP}</span > to giveup the current question<br>
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
    chat.classList.add('message', 'bot-message', 'chat');
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
    setTimeout(function () {
        chat.classList.add('message', 'bot-message', 'chat');
        chat.innerHTML = `
            <span class="bot-blockchat-name">${BOT_NAME}</span><br>${message}
        `;
        chatContent.scrollTop = chatContent.scrollHeight; //
    }, 300);
    return chat;
}

function send(chatNode) {
    chatContent.appendChild(chatNode);
    chatContent.scrollTop = chatContent.scrollHeight;
}

function processSticker() {
    let myStickerChat = mySticker();
    send(myStickerChat);
    setTimeout(function () {
        let botStickerChat = botSticker();
        send(botStickerChat);
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
    session.resetSpecificQuestion();
    session.resetquestionId();
    gameStatus.resetGameMode();
    gameStatus.stopGame();
    session.stopQuestionSession();
    send(botMessage(`Session stopped`));
}

function handleUserInput(input) {
    //jika game belum di /start
    if (!gameStatus.isGameStarted()) {
        if (isEqual(input, BOT_CMD_START)) {
            gameStatus.startGame();
            send(botMessage(BOT_SELECT_MODE_MSG));
            return;
        }
        if (isEqual(input, BOT_CMD_HELP)) {
            send(botMessage(BOT_HELP_MSG));
            return;
        }
        if (isEqual(input, BOT_CMD_EXIT) || isEqual(input, BOT_CMD_GIVEUP) || isEqual(BOT_CMD_MODE_RANDOM) || isEqual(BOT_CMD_MODE_SPECIFIC)) {
            send(botMessage(BOT_START_FIRST_MSG));
            return;
        }
        send(botMessage(BOT_HELP_MSG));
        return;

    }
    //kalo belum milih game mode
    if (gameStatus.isGameStarted() && isUndefined(gameStatus.currentGameMode())) {

        // /random
        if (isEqual(input, BOT_CMD_MODE_RANDOM)) {
            gameStatus.setGameMode(1);
            session.startQuestionSession();

            send(botMessage(`Let's play random question session`));
            fetch("http://jservice.io/api/random?count=1")
                .then(res => res.json())
                .then(data => {
                    session.setAnswer(data[0].answer);
                    send(botMessage(`${data[0].question}?`));
                })
                .catch(function (err) {
                    console.log(err);
                    send(botMessage((BOT_FETCH_ERROR_MSG)));
                    return;
                });

            return;
        }
        // /specific
        if (isEqual(input, BOT_CMD_MODE_SPECIFIC)) {
            gameStatus.setGameMode(2);
            session.startQuestionSession();
            session.setQuestionId(session.getRandomCategoryId());
            fetch(`http://jservice.io/api/category?id=${session.getQuestionId()}`)
                .then(res => res.json())
                .then(data => {
                    session.setSpecificQuestion(data);
                    let title = session.getSpecificQuestion().title;
                    return title;
                }).then(title => {
                    send(botMessage(`Let's play specific question session about <span class="topic-name">${title}</span>`));
                    let clues = session.getSpecificQuestion().clues[Math.floor(Math.random() * session.getSpecificQuestion().clues.length)];
                    session.setAnswer(clues.answer);
                    send(botMessage(`${clues.question}?`));
                })
                .catch(err => {
                    console.log(err);
                    send(botMessage(BOT_FETCH_ERROR_MSG));
                });
            return;
        }
        if (isEqual(input, BOT_CMD_EXIT)) {
            stopCurrentSession();
            return;
        }
        send(botMessage(BOT_SELECT_MODE_MSG));
        return;

    }
    //kalo questionSession udah dimulai, yang masuk sini udah pasti jawaban
    if (session.getQuestionSession()) {
        //mode random
        if (gameStatus.currentGameMode() === 1) {
            console.log(session.getAnswer());
            if (isEqual(input, BOT_CMD_EXIT)) {
                stopCurrentSession();
                return;
            }
            if (isEqual(input, BOT_CMD_GIVEUP)) {
                send(botMessage(`The answer was <span class="answer">${session.getAnswer()}</span> ! Better luck next time.`));
                fetch("http://jservice.io/api/random?count=1")
                    .then(res => res.json())
                    .then(data => {
                        session.setAnswer(data[0].answer);
                        send(botMessage(`${data[0].question}?`));
                    })
                    .catch(function (err) {
                        console.log(err);
                        send(botMessage((BOT_FETCH_ERROR_MSG)));
                        return;
                    });
                return;
            }
            if (isEqual(input, BOT_CMD_HELP)) {
                send(botMessage(BOT_HELP_MSG));
                return;
            }
            if (isEqual(input, BOT_CMD_MODE_SPECIFIC)) {
                send(botMessage(`Can't change session mode right now, Please exit first`));
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
                fetch("http://jservice.io/api/random?count=1")
                    .then(res => res.json())
                    .then(data => {
                        session.setAnswer(data[0].answer);
                        send(botMessage(`${data[0].question}?`));
                    })
                    .catch(function (err) {
                        console.log(err);
                        send(botMessage((BOT_FETCH_ERROR_MSG)));
                        return;
                    });
                return;
            }
            send(botMessage(`Almost right!<br>..but almost right is still wrong though. Try again.`));
            return;
        }
        //mode spesifik
        if (gameStatus.currentGameMode() === 2) {
            console.log(session.getAnswer());
            if (isEqual(input, BOT_CMD_EXIT)) {
                stopCurrentSession();
                return;
            }
            if (isEqual(input, BOT_CMD_GIVEUP)) {
                send(botMessage(`The answer was <span class="answer">${session.getAnswer()}</span> ! Better luck next time.`));
                let clues = session.getSpecificQuestion().clues[Math.floor(Math.random() * session.getSpecificQuestion().clues.length)];
                session.setAnswer(clues.answer);
                send(botMessage(`${clues.question}?`));
                return;
            }
            if (isEqual(input, BOT_CMD_HELP)) {
                send(botMessage(BOT_HELP_MSG));
                return;
            }
            if (isEqual(input, BOT_CMD_MODE_RANDOM)) {
                send(botMessage(`Can't change session mode right now, Please exit first`));
                return;
            }
            if (isEqual(input, BOT_CMD_START)) {
                send(botMessage(`Can't start another session right now, Please exit first`));
                return;
            }
            if (isEqual(input, BOT_CMD_MODE_SPECIFIC)) {
                send(botMessage(`Already on specific question mode`));
                return;
            }
            if (isAnswerCorrect(input, session.getAnswer())) {
                send(botMessage(`Bingo! you got the answer right. Ready for another challenge ?`));
                let clues = session.getSpecificQuestion().clues[Math.floor(Math.random() * session.getSpecificQuestion().clues.length)];
                session.setAnswer(clues.answer);
                send(botMessage(`${clues.question}?`));
                return;
            }
            send(botMessage(`Almost right!<br>..but almost right is still wrong though. Try again.`));
            return;
        }

    }

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
    const popularCategoryId = [ //dari jService.io/popular
        136, 42, 21, 25, 103, 442, 114, 49, 530, 672, 78, 680, 99, 309, 218, 1079, 197, 2537
    ];
    let specificQuestion = {};
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
        getRandomCategoryId: function () {
            return popularCategoryId[Math.floor(Math.random() * popularCategoryId.length)];
        },
        setSpecificQuestion: function (specificQuestionData) {
            specificQuestion = {};
            specificQuestion = specificQuestionData;
        },
        getSpecificQuestion: function () {
            return specificQuestion;
        },
        resetSpecificQuestion: function (specificQuestionData) {
            specificQuestion = {};
            specificQuestion = specificQuestionData;
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
        send(botGreetings);
        setTimeout(function () {
            send(botHelp);
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
    let message = chatBox.value;
    if (message !== "") {
        send(myMessage(message));
        handleUserInput(message);
        chatBox.value = '';
    }
});