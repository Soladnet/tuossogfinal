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
                
                $('.gossbag-separation-icons').click(function(){
                    $('.gossbag-separation-icons.active').removeClass('active');
                        $(this).addClass('active');
                        
                        doSeparatGoss($(this).attr('id'));
                });
                
                $('.loadMoreGossContent').click(function(){
                    alert($(this).attr('hold'));
//                    start = $(this).attr('rel');
//                    if($(this).attr('id')==='loadMoreWink'){
//                        sendData("loadWink", {target: "#individual-notification-box", loadImage: true, start: start, limit: 8});
//                    
//                }
                    return false;
                });
                
                function doSeparatGoss(pointer){
                    hold = $('#current-notification');
                    if(pointer==='wink-notification-icon'){
                         hold.text('Wink');
                        sendData("loadWink", {target: "#individual-notification-box", loadImage: true, start: 0, limit: 5});
                        $('.loadMoreGossContent').attr('hold','Wink');
                    }
                    if(pointer==='comment-notification-icon'){
                         hold.text('Comment');
                        sendData("loadGossComment", {target: "#individual-notification-box", loadImage: true, start: 0, limit: 5});
                     $('.loadMoreGossContent').attr('hold','Comment');
                 }
                    if(pointer==='frq-notification-icon'){
                         hold.text('Friend request');
                        sendData("loadGossFrq", {target: "#individual-notification-box", loadImage: true, start: 0, limit: 5});
                     $('.loadMoreGossContent').attr('hold','Frq');
                 }
                    if(pointer==='post-notification-icon'){
                         hold.text('Post');
                        sendData("loadGossPost", {target: "#individual-notification-box", loadImage: true, start: 0, limit: 5});
                     $('.loadMoreGossContent').attr('hold','Post');
                 }
                }
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
                    <span style="float:left;" class="all-notifications-message" id="current-notification">All Notifications
                    
                    </span>
                    
                    <div class="timeline-filter">
                        
                        <ul>
                            
                             <li class="gossbag-separation-li gossbag-separation-icons" id="wink-notification-icon" rel="wink-notification-icon"><span class="icon-16-eye"></span></li>
                              <li class="gossbag-separation-li gossbag-separation-icons" id="frq-notification-icon" rel="frq-notification-icon"><span class="icon-16-user-add"></span></li>
                               <li class="gossbag-separation-li gossbag-separation-icons" id="post-notification-icon" rel="post-notification-icon"><span class="icon-16-pencil"></span></li>
                                <li class="gossbag-separation-li gossbag-separation-icons" id="comment-notification-icon" rel="comment-notification-icon"><span class="icon-16-comment"></span></li>
                                <li class="active gossbag-separation-li gossbag-separation-icons" id="all-notification-icon" rel="all-notification-icon"><span class=""><a href="notifications">All</a></span></li>
                                
                        </ul>
                    </div>
                    <div class="clear"></div>
                    <span id="individual-notification-box"></span>
                    
                   
                    <div class="button" style="float:left;"><a href="" rel="5" hold="1" class="loadMoreGossContent" id="loadMoreWink">Load more > ></a></div>  
                    <script>
                        $(document).ready(function() {
                            sendData("loadGossbag", {target: "#individual-notification-box", loadImage: true, start: 0, limit: 50});
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