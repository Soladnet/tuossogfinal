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
<html lang="en">
    <head>
        <?php
        include_once './webbase.php';
        ?>
        <title>Gossout - All notification</title>
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
                    closeEffect: 'none'

                });
                sendData("loadNotificationCount", {title: document.title});
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
                <div class="all-notifications-list">
                    <h1>Notifications</h1>
                    <div class="timeline-filter">
                        <ul>
                            <li><span class="icon-16-list"></span></li>
                            <li class="active"><a href="notifications">All</a></li>
<!--                            <li><a href=""><p>Requests</p> </a></li>
                            <li><a href=""><p>Interactions</p></a></li>-->
                        </ul>
                    </div>
                    <div class="clear"></div>
                    <span id="individual-notification-box"></span>
                    <script>
                        $(document).ready(function() {
                            sendData("loadGossbag", {target: "#individual-notification-box", loadImage: true, start: 0, limit: 20});
                        });
                    </script>
                </div>

                <?php
                include("aside.php");
                ?>
            </div>
            <?php
            include("footer.php");
            ?>
        </div>

    </body>
</html>