<?php
session_start();
if (isset($_COOKIE['user_auth'])) {
    include_once './encryptionClass.php';
    include_once './GossoutUser.php';
    $encrypt = new Encryption();
    $user = new GossoutUser(0);
    $id = $encrypt->safe_b64decode($_COOKIE['user_auth']);
    if (is_numeric($id)) {
        $user->setUserId($id);
        $user->getProfile();
    } else {
        include_once './LoginClass.php';
        $login = new Login();
        $login->logout();
    }
} else {
    include_once './LoginClass.php';
    $login = new Login();
    $login->logout();
}
?>
<!doctype html>
<html>
    <head>
        <?php
        include_once './webbase.php';
        ?>
        <title>Gossout - Agreement</title>
        <link rel="shortcut icon" href="favicon.ico">
        <link rel="stylesheet" media="screen" href="css/style.css">
        <script type="text/javascript" src="scripts/modernizr.custom.77319.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" > 
        <script>
            $(function() {
                $("#show-suggested-friends,#show-suggested-community,#gossbag-text,#messages-text,#gossbag-close,#messages-close,#user-actions,#user-more-option,#show-full-profile,#search,#search-close,#new-message-btn,#loadCommore,#joinleave").click(function() {
                    showOption(this);
                });
                if (Modernizr.inlinesvg) {
                    $('#logo').html('<img src="images/gossout-logo-text-svg.svg" alt="Gossout" />');
                } else {
                    $('#logo').html('<img src="images/gossout-logo-text-svg.png" alt="Gossout" />');
                }
            });
        </script>
    </head>
    <body>
        <div class="index-page-wrapper">	
            <div class="index-nav">
                <span class="index-login"><?php echo "Welcome " . $user->getFullname() ?></span>
                <div class="clear"></div>
            </div>
            <div class="index-banner">
                <div class="logo" id="logo"><img alt=""></div>
            </div>
            <div class="index-intro">		
                <div class="index-intro-2">
                    <div class="registration">
                        <div class="index-intro-1">
                            <h1>
                                Please read carefully! 
                            </h1>
                        </div>
                        <progress max="100" value="95" >95% done!</progress>
                        <hr>
                        <ul>
                            <li>
                                <p class="info">
                                    By clicking <strong>Finish</strong>, you agree to our 
                                    <a href="">Terms of Service!</a>
                                </p>
                                <p class="info">
                                    We use <a href="http://en.wikipedia.org/wiki/HTTP_cookie">cookies</a>  to ensure that we give 
                                    you the best experience on our website. <!-- We also use cookies 
                                    to ensure we show you advertising that is relevant to you. --> 
                                    If you continue, we'll assume that you 
                                    are happy to receive all <a href="http://en.wikipedia.org/wiki/HTTP_cookie">cookies</a> on this website. 

                                </p>
                            </li>
                            <div class="button"><a href="home">Finish!</a></div>
                            </form>
                            <div class="clear"></div>
                    </div>
                </div>
            </div>
            <div class="index-shadow-bottom"></div>
            <div class="index-content-wrapper">
                <?php
                include("footer.php");
                ?>
            </div>

        </div>
    </body>
</html>