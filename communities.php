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
    include_once './GossoutUser.php';
    $user = new GossoutUser(0);
    $userProfile = $user->getProfile();
//    $host = $_SERVER['HTTP_HOST'];
//    if ($host == "localhost") {
//        header("Location: http://$host/gossoutfinal/login");
//    } else {
//        header("Location: http://$host/login");
//    }
}
?>
<!doctype html>
<html lang="en">
    <head>
        <?php
        include_once './webbase.php';
        ?>
        <title>Gossout - Communities</title>
        <meta http-equiv="Pragma" http-equiv="no-cache" />
        <meta http-equiv="Expires" content="-1" />
        <script type="text/javascript" src="scripts/jquery-1.9.1.min.js"></script>
        <?php
        include ("head.php");
        ?>
        <link rel="stylesheet" href="css/chosen.css" />
        <link rel="stylesheet" href="css/jackedup.css">
        <link rel="stylesheet" href="css/validationEngine.jquery.css">
        <script type="text/javascript" src="scripts/humane.min.js"></script>
        <script type="text/javascript" src="scripts/jquery.fancybox.pack.js?v=2.1.4"></script>
        <script src="scripts/jquery.timeago.js" type="text/javascript"></script>
        <script src="scripts/test_helpers.js" type="text/javascript"></script>
        <script src="scripts/chosen.jquery.min.js" type="text/javascript"></script>
        <script type="text/javascript" src="scripts/jquery.form.js"></script>
        <script type="text/javascript" src="scripts/languages/jquery.validationEngine-en.js"></script>
        <script type="text/javascript" src="scripts/jquery.validationEngine.js"></script>
        <?php
        if (isset($_GET['param']) ? $_GET['param'] != "" ? $_GET['param'] : FALSE  : FALSE) {
            ?>
            <style>
                .progress { position:relative; width:60%; border: 1px solid #ddd; padding: 1px; border-radius: 3px; }
                .bar { background-color: #B4F5B4; width:0%; height:20px; border-radius: 3px; }
                .percent { position:absolute; display:inline-block; top:3px; left:48%; }
            </style>
            <?php
        }
        ?>
        <script type="text/javascript">
            $(document).ready(function() {
<?php
if (isset($_GET['param']) ? $_GET['param'] != "" ? $_GET['param'] : FALSE  : FALSE) {
    ?>
                    sendData("loadCommunity", {target: "#rightcolumn", loadImage: true, max: true, loadAside: true, comname: '<?php echo $_GET['param'] ?>'});
    <?php
} else {
    ?>
                    sendData("loadCommunity", {target: ".community-box", loadImage: true, max: true});
                    $("#searchForm").validationEngine();
                    $("#searchForm").ajaxForm({
                        beforeSend: function() {
                            if (!($('#searchTerm').val().length > 2) && $('#searchTerm').val() !== "*") {
                                return false;
                            } else {
                                $(".community-box").html("<center><img src='images/loading.gif'/></center>");
                            }
                        },
                        success: function(responseText, statusText, xhr, $form) {
                            var htmlstr = "";
                            if (responseText.status === true) {
                                if (responseText.community) {
                                    $.each(responseText.community, function(i, response) {
                                        htmlstr += '<div class="community-box-wrapper"><div class="community-image">' +
                                                '<img src="' + response.thumbnail100 + '">' +
                                                '</div><div class="community-text"><div class="community-name">' +
                                                '<a href="' + response.unique_name + '">' + response.name + '</a> </div><hr><div class="details">' + (br2nl(response.description).length > 100 ? br2nl(response.description).substring(0, 100) + "..." : br2nl(response.description)) +
                                                '</div><div class="members">' + response.type + '</div><div class="members">' + response.mem_count + ' ' + (response.mem_count > 1 ? "Members" : "Member") + '</div><div class="members">' + response.post_count + ' ' + (response.post_count > 1 ? "Posts" : "Post") + '</div></div><div class="clear"></div></div>';
                                    });
                                    $(".community-box").html(htmlstr);
                                } else {
                                }
                            } else {
                                if (responseText.status) {
                                    humane.log("Community was not created", {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-error'});
                                } else {
                                    $(".community-box").html("<center>No result found!</center>");
                                }
                            }
                        },
                        data: {
                            param: "search",
                            opt: "mc",
                            uid: readCookie('user_auth')
                        }
                    });
                    $('#all').addClass('active');
                    $("#all").click(function() {
                        $('#my-communities-list').show();
                        $('#suggestion-list').show();
                        $('#my-communities').removeClass('active');
                        $('#suggestions').removeClass('active');
                        $('#all').addClass('active');
                    });
                    $("#suggestions").click(function() {
                        $('#my-communities-list').hide();
                        $('#suggestion-list').show();
                        $('#all').removeClass('active');
                        $('#my-communities').removeClass('active');
                        $('#suggestions').addClass('active');
                    });
                    $("#my-communities").click(function() {
                        $('#suggestion-list').hide();
                        $('#my-communities-list').show();
                        $('#all').removeClass('active');
                        $('#suggestions').removeClass('active');
                        $('#my-communities').addClass('active');
                    });


    <?php
}
?>
                var user = readCookie('user_auth');
                if (user !== 0) {
                    sendData("loadNotificationCount", {title: document.title});
                }
                $(".fancybox").fancybox({
                    openEffect: 'none',
                    closeEffect: 'none',
                    minWidth: 250
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
                <span id="rightcolumn">
                    <div class="communities-list">
                        <h1 id="pageTitle">Communities</h1>

                        <div class="community-search-box">
                            <form action="tuossog-api-json.php" method="POST" id="searchForm">
                                <input name="a" class="community-search-field validate[required]" id="searchTerm" placeholder="Search Communities" type="text" value="" >
                                <input type="submit" class="button" value="Search">
                            </form>
                        </div>
                        <div class="clear"></div>
                        <hr/>
                        <div id="creatComDiv">
                            <h3>Would you like to create one? It's very easy and free! 
                                <br>
                                <div class="button"><a href="create-community">Start a Community</a></div>
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