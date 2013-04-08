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
        <title>Gossout</title>
        <link rel="stylesheet" href="css/jackedup.css">
        <script type="text/javascript" src="scripts/jquery-1.9.1.min.js"></script>
        <?php
        include ("head.php");
        ?>
        <script src="scripts/jquery.timeago.js" type="text/javascript"></script>
        <script src="scripts/test_helpers.js" type="text/javascript"></script>
        <script type="text/javascript" src="scripts/jquery.fancybox.pack.js?v=2.1.4"></script>
        <script type="text/javascript" src="scripts/humane.min.js"></script>
        <script type="text/javascript">
            $(document).ready(function() {
                sendData("loadNotificationCount",{uid: readCookie("user_auth"),title:document.title});
                $(".fancybox").fancybox({
                    openEffect: 'none',
                    closeEffect: 'none'
                });
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
                <div class="posts">
<!--                    <h1>Timeline Feed</h1>
                    <hr>-->
                    <div class="timeline-filter">
                        <ul>
                            <li><span class="icon-16-list"></span></li>
                            <li class="active"><a href="">All</a></li>
                            <li><a href="">Posts</a></li>
                            <li><a href="">Activities</a></li>
                        </ul>
                    </div>
                    <div class="clear"></div>
                    <hr>
<!--                    <div class="success">
                        <p><span class="icon-16-asterisk"></span>While you were away, <a href="notifications">700 of your friends</a> 
                            posted new stuffs in  <a href="sample-community.php">Sample Community Name</a>
                        </p>
                    </div>-->
                    <?php
                    include("post-box.php");
                    include("timeline.php");
                    ?>

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