<?php
//session_start();
if (isset($_COOKIE['user_auth'])) {
    include_once './encryptionClass.php';
    include_once './GossoutUser.php';
    $encrypt = new Encryption();
    $uid = $encrypt->safe_b64decode($_COOKIE['user_auth']);
    if (is_numeric($uid)) {
        $user = new GossoutUser($uid);
        $userProfile = $user->getProfile();
    }
} else {
    header("Location: login");
}
?>
<!doctype html>
<html>
    <head>
        <?php
        include_once './webbase.php';
        ?>
        <title>Gossout - Friends</title>
        <script type="text/javascript" src="scripts/jquery-1.9.1.min.js"></script>
        <?php
        include ("head.php");
        ?>
        <link rel="stylesheet" href="css/jackedup.css">
        <script type="text/javascript" src="scripts/humane.min.js"></script>
        <script type="text/javascript" src="scripts/jquery.fancybox.pack.js?v=2.1.4"></script>
        <script src="scripts/jquery.timeago.js" type="text/javascript"></script>
        <script src="scripts/test_helpers.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(document).ready(function() {
                $(".fancybox").fancybox({
                    openEffect: 'none',
                    closeEffect: 'none',
                    minWidth: 250

                });
                sendData("loadNotificationCount", {uid: readCookie("user_auth"), title: document.title});
            });
        </script>
    </head>
    <body>
        
        <div class="page-wrapper">
            <?php
            include ("nav.php");
            include ("nav-user.php");
            ?>
            <div class="logo"><img src="images/gossout-logo-text-svg.svg" alt=""></div>

            <div class="content">			
                <div class="all-friends-list">
                    <h1>All Friends</h1>

                    <div class="friend-search-box">
                        <input name="" class="friend-search-field " placeholder="Search Friends" type="text" value="" required="">
                        <input type="submit" class="button" value="Search">
                    </div>
                    <div class="clear"></div>
                    <span id="individual-friend-box"></span>
                    <div class="clear"></div>
                </div>

                <?php
                include("aside.php");
                ?>
                <div class="clear"></div>		
            </div>
            <?php
            include("footer.php");
            ?>
        </div>

    </body>
</html>