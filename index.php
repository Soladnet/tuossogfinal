<?php

if (isset($_GET['page'])) {
    if ($_GET['page'] == "index") {
        echo "include Homepage here!";
    } else if ($_GET['page'] == "home") {
        include './home.php';
    } else if ($_GET['page'] == "communities") {
        include_once './communities.php';
    } else if ($_GET['page'] == "messages") {
        include_once 'messages.php';
    } else if ($_GET['page'] == "friends") {
        include_once 'friends.php';
    } else if ($_GET['page'] == "login") {
        include_once './login.php';
    } else if ($_GET['page'] == "login_exec") {
        include_once './login_exec.php';
    } else if ($_GET['page'] == "settings") {
        include_once './settings.php';
    } else if ($_GET['page'] == "notifications") {
        include_once './all-notifications.php';
    } else if ($_GET['page'] == "signup-personal") {
        include_once './signup-personal.php';
    } else if ($_GET['page'] == "signup-login") {
        include_once './signup-login.php';
    } else if ($_GET['page'] == "signup-photo") {
        include_once './signup-photo.php';
    } else if ($_GET['page'] == "signup-agreement") {
        include_once './signup-agreement.php';
    } else if ($_GET['page'] == "create-community") {
        include_once './create-community.php';
    } else if ($_GET['page'] == "community-settings") {
        include_once './community-settings.php';
    }else {
        header("Location: communities/$_GET[page]");
    }
} else {
    if (isset($_COOKIE['user_auth'])) {
        include_once './home.php';
    } else {
        echo "include Homepage here!";
    }
}
?>