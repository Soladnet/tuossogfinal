<?php

include_once './LoginClass.php';
$confirm = new Login();
if (isset($_GET['page'])) {
    if ($_GET['page'] == "index") {
        include_once './searchIndex.php';
    } else if ($_GET['page'] == "home") {
        if (isset($_COOKIE['user_auth'])) {
            $confirm->confirmCookies();
            include_once './home.php';
        } else {
            include_once './searchIndex.php';
        }
    } else if ($_GET['page'] == "communities") {
        include_once './communities.php';
    } else if ($_GET['page'] == "messages") {
        $confirm->confirmCookies();
        include_once 'messages.php';
    } else if ($_GET['page'] == "friends") {
        $confirm->confirmCookies();
        include_once 'friends.php';
    } else if ($_GET['page'] == "login") {
        include_once './login.php';
    } else if ($_GET['page'] == "login_exec") {
        include_once './login_exec.php';
    } else if ($_GET['page'] == "settings") {
        $confirm->confirmCookies();
        include_once './settings.php';
    } else if ($_GET['page'] == "notifications") {
        $confirm->confirmCookies();
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
        $confirm->confirmCookies();
        include_once './create-community.php';
    } else if ($_GET['page'] == "community-settings") {
        $confirm->confirmCookies();
        include_once './community-settings.php';
    } else if ($_GET['page'] == "password-recovery") {
        include_once './password-recovery.php';
    } else if ($_GET['page'] == "password-recovery-confirm") {
        include_once './password-recovery-confirm.php';
    } else if ($_GET['page'] == "password-reset") {
        include_once './password-reset.php';
    } else if ($_GET['page'] == "tos") {
        include_once './toservice.php';
    } else if ($_GET['page'] == "privacy") {
        include_once './privacy.php';
    } else if ($_GET['page'] == "rights") {
        include_once './rights.php';
    } else if ($_GET['page'] == "terms") {
        include_once './terms.php';
    } else {
        header("Location: communities/$_GET[page]");
    }
} else {
    if (isset($_COOKIE['user_auth'])) {
        $confirm->confirmCookies();
        include_once './home.php';
    } else {
        include_once './searchIndex.php';
    }
}
?>