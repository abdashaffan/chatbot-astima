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
    <link rel="stylesheet" href="styles/main.css?v=<?php echo $timestamp;?>">
    <link rel="stylesheet" href="styles/avatar.css?v=<?php echo $timestamp;?>">
    <link rel="stylesheet" href="styles/chatbox.css?v=<?php echo $timestamp;?>">
    <link rel="stylesheet" href="styles/message.css?v=<?php echo $timestamp;?>">
    <link rel="stylesheet" href="styles/bot.css?v=<?php echo $timestamp;?>">
    <title>Chatbot Stima</title>
</head>
<body>
<!-- Di nerf dulu sampe chatboxnya kelar -->
    <!-- <span id="title">
        <span id="avatar-name">Astima</span><br>
        <span id="avatar-subtitle">Your daily assistant</span>
    </span> -->
    
    <div id="chat-container">
            <div id="chat-container-navbar">
                <img src="assets/header.png" alt="avatar" class="bot-picture">
                <span id="profile-name">Asti </span>
            </div> 

            <div id="chat-content"></div>

            <form action="" id="chatform">
                <input type="text" name="text" id="text-msg" placeholder="Kirimi Astima pesan" autofocus autocomplete="off" >
        
                <i class="material-icons md-dark" id="sticker">tag_faces</i>
                <i class="material-icons md-dark" id="text-btn">send</i>
            </form>
            
    </div>
    <!-- Di nerf dulu avatarnya karena mengalihkan perhatian -->
    <!-- <img src="assets/avatar5.png" alt="chatbot-avatar-image" id="avatar"> -->

    <script src="js/main.js?v=<?php echo $timestamp;?>"></script>
</body>
</html>