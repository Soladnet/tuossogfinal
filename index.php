<?php

//echo $_SERVER['HTTP_USER_AGENT'];
include_once './LoginClass.php';
$confirm = new Login();
if (isset($_GET['page'])) {
    if ($_GET['page'] == "index") {
        include_once './searchIndex.php';
    } else if ($_GET['page'] == "home") {
        if (isset($_COOKIE['user_auth'])) {
            $confirm->isLoggedIn();
            include_once './Gossout_Community.php';
            $com = new Community();
            $id = $confirm->safe_b64decode($_COOKIE['user_auth']);
            if (is_numeric($id)) {
                $com->setUser($id);
                $userComm = $com->userComm(0, 2);
                if ($userComm['status']) {
                    include_once './home.php';
                } else {
                    include_once './start-up.php';
                }
            } else {
                $confirm->logout();
            }
        } else {
            include_once './searchIndex.php';
        }
    } else if ($_GET['page'] == "communities") {
        include_once './communities.php';
    } else if ($_GET['page'] == "messages") {
        $confirm->isLoggedIn();
        include_once 'messages.php';
    } else if ($_GET['page'] == "friends") {
        $confirm->isLoggedIn();
        include_once 'friends.php';
    } else if ($_GET['page'] == "login") {
        include_once './login.php';
    } else if ($_GET['page'] == "login_exec") {
        include_once './login_exec.php';
    } else if ($_GET['page'] == "settings") {
        $confirm->isLoggedIn();
        include_once './settings.php';
    } else if ($_GET['page'] == "notifications") {
        $confirm->isLoggedIn();
        include_once './all-notifications.php';
    } else if ($_GET['page'] == "signup-personal") {
        include_once './signup-personal.php';
    } else if ($_GET['page'] == "validate-email") {
        include_once './validate-email.php';
    } else if ($_GET['page'] == "signup-login") {
        include_once './signup-login.php';
    } else if ($_GET['page'] == "signup-photo") {
        include_once './signup-photo.php';
    } else if ($_GET['page'] == "signup-agreement") {
        include_once './signup-agreement.php';
    } else if ($_GET['page'] == "create-community") {
        $confirm->isLoggedIn();
        include_once './create-community.php';
    } else if ($_GET['page'] == "community-settings") {
        $confirm->isLoggedIn();
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
    } else if ($_GET['page'] == "user") {
        include_once 'user-profile.php';
    } else {
        include_once './communities.php';
    }
} else {
    if (isset($_COOKIE['user_auth'])) {
        $confirm->isLoggedIn();
        include_once './Gossout_Community.php';
        $com = new Community();
        $id = $confirm->safe_b64decode($_COOKIE['user_auth']);
        if (is_numeric($id)) {
            $com->setUser($id);
            $commuser = $com->userComm(0, 2);
            if ($commuser['status']) {
                include_once './home.php';
            } else {
                include_once './start-up.php';
            }
        } else {
            $confirm->logout();
        }
    } else {
        include_once './searchIndex.php';
    }
}
?>