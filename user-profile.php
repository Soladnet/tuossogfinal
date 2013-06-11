<?php
//session_start();
if (isset($_COOKIE['user_auth'])) {
    include_once './encryptionClass.php';
    include_once './GossoutUser.php';
    include_once './Community.php';
    $encrypt = new Encryption();
    $uid = $encrypt->safe_b64decode($_COOKIE['user_auth']);
    if (is_numeric($uid)) {
        $user = new GossoutUser($uid);
        $userProfile = $user->getProfile();
        $userCommunity = new Community();
        $userCommunity->setUser($uid);
    }
    if (isset($_GET['param']) && trim($_GET['param']) != "") {
        $user->setUserId(NULL);
        $user->setScreenName($_GET['param']);
        $id = $user->getId();
        if (is_numeric($id)) {
            $user->getProfile();
        } else {
            header("HTTP/1.0 404 Not Found");
            exit;
        }
    }
} else {
    if (isset($_GET['param']) && trim($_GET['param']) != "") {
        $user->setUserId(NULL);
        $user->setScreenName($_GET['param']);
        $user->getId();
        if (is_numeric($id)) {
            $user->getProfile();
        } else {
            header("HTTP/1.0 404 Not Found");
            exit;
        }
    }
}
?>
<!doctype html>
<html>
    <head>
        <?php
        include_once './webbase.php';
        ?>
        <title>Gossout</title>
        <meta http-equiv="Pragma" http-equiv="no-cache" />
        <meta http-equiv="Expires" content="-1" />
        <script type="text/javascript" src="scripts/jquery-1.9.1.min.js"></script>
        <?php
        include ("head.php");
        ?>
        <link rel="stylesheet" href="css/jackedup.css" />
        <link rel="stylesheet" href="css/chosen.css" />
        <script src="scripts/jquery.timeago.js" type="text/javascript"></script>
        <script src="scripts/test_helpers.js" type="text/javascript"></script>
        <script type="text/javascript" src="scripts/jquery.fancybox.pack.js?v=2.1.4"></script>
        <script type="text/javascript" src="scripts/humane.min.js"></script>
        <script src="scripts/chosen.jquery.min.js" type="text/javascript"></script>
        <script type="text/javascript" src="scripts/jquery.form.js"></script>
        <script type="text/javascript" src="scripts/jquery.history.js"></script>
        <script type="text/javascript">
            var community = {};
            function processCom(val) {
                if (val.length > 0) {
                    $.each(val, function(i, com) {
                        community[com.id] = com;
                    });
                }
            }
            $(document).ready(function() {
<?php
if (isset($_GET['param']) && trim($_GET['param']) == "") {
    ?>
                    var currentLocation = window.location + "";
                    var lastChar = currentLocation.substring(currentLocation.length - 1);
                    History.pushState({state: history.length + 1, rand: Math.random()}, ("<?php echo $user->getFullname() == "" ? "Gossout" : $user->getFullname() ?>"), currentLocation + (lastChar === "/" ? "<?php echo $user->getScreenName() ?>" : "/<?php echo $user->getScreenName() ?>"));
    <?php
} else {
    ?>
                    document.title = "<?php echo $user->getFullname() == "" ? "Gossout" : $user->getFullname() ?>";
    <?php
}
?>
                sendData("loadNotificationCount", {title: document.title});
                sendData("loadTimeline", {target: ".timeline-container", uid: "<?php echo $user->encodeData($user->getId()) ?>", t: true, loadImage: true});
                $(".chzn-select").chosen();
                $(".fancybox").fancybox({
                    openEffect: 'none',
                    closeEffect: 'none',
                    minWidth: 250
                });
                $("#uploadImagePost").click(function() {
                    $("#uploadInput").focus().trigger('click');
                });
                var bar = $('.bar');
                var percent = $('.percent');
                $("#timelineForm").ajaxForm({
                    beforeSubmit: function(formData, jqForm, options) {
                        $(".progress").show();
                        var percentVal = '0%';
                        bar.width(percentVal);
                        percent.html(percentVal);

                        $("#postBtn,textarea").prop('disabled', true);
                        $("#hiddenComm").val($(".chzn-select").val());
                        if ($(".chzn-select").val() === null) {
                            humane.log("You must select a community first.", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-error'});
                            $("#postBtn,textarea").prop('disabled', false);
                            $(".progress").hide(500);
                            return false;
                        } else if ($("#postText").val() === "") {
                            $("#postBtn,textarea").prop('disabled', false);
                            $(".progress").hide(500);
                            return false;
                        }
                    },
                    uploadProgress: function(event, position, total, percentComplete) {
                        var percentVal = percentComplete + '%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                    },
                    success: function(responseText, statusText, xhr, $form) {
                        var percentVal = '100%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                        var hiddenCom = $("#hiddenComm").val().split(",");
                        var post = $("#postText").val();
                        if (!responseText.error) {
                            if (responseText.time) {
                                var htmlstr = "";
                                $.each(responseText.id, function(i, id) {
                                    htmlstr += '<div class="timeline-news-single"><div class="timeline-news-profile-pic">' +
                                            '<img src="' + responseText.photo + '">' +
                                            '</div><p><a>You</a> posted to <a href="' + community[hiddenCom[i]].unique_name + '">' + community[hiddenCom[i]].name + '</a></p>' +
                                            '<p class="timeline-time timeago" title="' + responseText.time + '">' + responseText.time + '</p><p>' + nl2br(linkify(post)) + '</p>';
                                    if (responseText.post_photo) {
                                        htmlstr += '<p class="timeline-photo-upload">';
                                        $.each(responseText.post_photo, function(k, photo) {
                                            htmlstr += '<a class="fancybox" rel="gallery' + id + '"  href="' + photo.original + '" rel="group"><img src="' + photo.thumbnail + '"></a>';
                                        });
                                        htmlstr += '</p><div class="clear"></div>';
                                    }
                                    htmlstr += '<!--<p class="post-meta"><span id="post-new-comment-show-' + id + '" class=""><span class="icon-16-comment"></span>Comment(20)</span>' +
                                            '<span class="post-meta-gossout"><span class="icon-16-share"></span><a class="fancybox " id="inline" href="#share-123456">Share(20)</a></span></p>--><div class="clear"></div></div>';
                                });
                                $(".timeline-container").prepend(htmlstr);
                                prepareDynamicDates();
                                $(".timeago").timeago();
                            }
                        }
                        if ($("#filesSelected").html() !== "") {
                            $("#filesSelected").html("");
                        }
                    },
                    complete: function(response, statusText, xhr, $form) {
                        $(".progress").hide(500);
                        $("#postBtn,textarea").prop('disabled', false);
                        $("#timelineForm").clearForm();
                        $('select').trigger('liszt:updated');
                    },
                    data: {
                        param: "post",
                        uid: readCookie("user_auth")
                    }
                });
                if (Modernizr.inlinesvg) {
                    $('#logo').html('<a href="index"><img src="images/gossout-logo-text-svg.png" alt="Gossout" /></a>');
                } else {
                    $('#logo').html('<a href="index"><img src="images/gossout-logo-text-svg.png" alt="Gossout" /></a>');
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
            <div class="logo" id="logo"><img alt=""></div>

            <div class="content">
                <div class="posts">
                    <h1><?php echo $user->getFullname() == "" ? "Timeline" : $user->getFullname() ?></h1>
                    <hr>
                    <?php
                    include("post-box.php");
                    include("timeline.php");
                    ?>

                </div>

                <?php
                include("user-aside.php");
                ?>			
            </div>
            <?php
            include("footer.php");
            ?>
        </div>
        <script>
            $(document).ready(function() {
                processCom(<?php echo $comm['status'] ? json_encode($comm['community_list']) : "{}" ?>);
            });
        </script>
    </body>
</html>