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
        <title>Gossout - Communities</title>
        <script type="text/javascript" src="scripts/jquery-1.9.1.min.js"></script>
        <?php
        include ("head.php");
        ?>
        <link rel="stylesheet" href="css/jackedup.css">
        <script type="text/javascript" src="scripts/humane.min.js"></script>
        <script type="text/javascript" src="scripts/jquery.fancybox.pack.js?v=2.1.4"></script>
        <script src="scripts/jquery.timeago.js" type="text/javascript"></script>
        <script src="scripts/test_helpers.js" type="text/javascript"></script>
        <?php
        if (isset($_GET['param']) ? $_GET['param'] != "" ? $_GET['param'] : FALSE  : FALSE) {
            ?>
            <script type="text/javascript" src="scripts/jquery.form.js"></script>
            <?php
        }
        ?>
        <script type="text/javascript">
            $(function() {
<?php
if (isset($_GET['param']) ? $_GET['param'] != "" ? $_GET['param'] : FALSE  : FALSE) {
    ?>
                    sendData("loadCommunity", {target: "#rightcolumn", uid: readCookie('user_auth'), loadImage: true, max: true, loadAside: true, comname: '<?php echo $_GET['param'] ?>'});
    <?php
} else {
    ?>
                    sendData("loadCommunity", {target: ".community-box", uid: readCookie('user_auth'), loadImage: true, max: true});
    <?php
}
?>
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
                <span id="rightcolumn">
                    <div class="communities-list">
                        <h1 id="pageTitle">Communities</h1>

                        <div class="community-search-box">
                            <input name="" class="community-search-field " placeholder="Search Communities" type="text" value="" required="">
                            <input type="submit" class="button" value="Search">
                        </div>
                        <div class="clear"></div>
                        <hr/>
                        <div id="creatComDiv">
                            <h3>Would you like to create one? It's very easy! 
                                <br>
                                <button class="button-big"><a href="create-community.php">New Community</a></button>
                            </h3>
                        </div>
                        <div class="community-box">
                            <!--                        <div class="notice">
                                                        You do not currently belong to any Community.
                                                        Here are some suggestions we think you might like!
                            
                                                    </div>
                                                    <div class="timeline-filter">
                                                        <ul>
                                                            <li><span class="icon-16-earth"></span></li>
                                                            <li class="active"><a href=""><p>Suggestions</p> </a></li>
                                                            <li><a href=""><p>My Communities</p></a></li>
                                                        </ul>
                                                    </div>
                                                    <div class="clear"></div>-->
                        </div>

                    </div>
                </span>

                <?php
                if (isset($_GET['param']) ? $_GET['param'] != "" ? $_GET['param'] : FALSE  : FALSE) {
                    include("sample-community-aside.php");
                } else {
                    include("aside.php");
                }
                ?>	
            </div>
            <?php
            include("footer.php");
            ?>
        </div>

    </body>
</html>