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
    } else if ($_GET['page'] == "login") {
        include_once './login.php';
    } else if ($_GET['page'] == "login_exec") {
        include_once './login_exec.php';
    } else {
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