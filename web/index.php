<?php
$timestamp = date("YmdHis"); 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400|Roboto" rel="stylesheet">
    <link rel="stylesheet" href="styles/main.css?v=<?php echo $timestamp;?>">
    <link rel="stylesheet" href="styles/avatar.css?v=<?php echo $timestamp;?>">
    <link rel="stylesheet" href="styles/chatbox.css?v=<?php echo $timestamp;?>">
    <link rel="stylesheet" href="styles/message.css?v=<?php echo $timestamp;?>">
    <link rel="stylesheet" href="styles/bot.css?v=<?php echo $timestamp;?>">
    <title>Astimah - Trivia questions bot</title>
</head>
<body>

    <div id="title" class="hidden">
        
        <h1 class="main-title">Astimah</h1>
        <h3 class="sub-title">Your random trivia questions bot</h3>
    </div>
    
    <div id="chat-container" class="animated bounceIn">
            <div id="chat-container-navbar">
                <img src="assets/header.png" alt="avatar" class="bot-picture">
                <span id="profile-name">Asti</span>
            </div> 

            <div id="chat-content"></div>

            <form action="" id="chatform" onkeypress="return event.keyCode != 13;">
                <input type="text" name="text" id="text-msg" placeholder="What can i do for you?" autofocus autocomplete="off" >
        
                <i class="material-icons md-dark" id="sticker">tag_faces</i>
                <i class="material-icons md-dark" id="text-btn">send</i>
            </form>
            
    </div>
    <div id="footer">
        view on <a href="https://github.com/abdashaffan/chatbot-astima"target="_BLANK" id="github-link">github</a>
    </div>
    <script src="js/main.js?v=<?php echo $timestamp;?>"></script>
</body>
</html>