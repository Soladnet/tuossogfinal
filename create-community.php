<?php
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
        <title>
            Gossout - Create Community
        </title>
        <script src="scripts/jquery-1.9.1.min.js"></script>
        <link rel="stylesheet" href="css/validationEngine.jquery.css" type="text/css"/>
        <?php
        include ("head.php");
        ?>
        <link rel="stylesheet" href="css/jackedup.css" type="text/css"/>
        <script src="scripts/humane.min.js"></script>
        <script src="scripts/languages/jquery.validationEngine-en.js" type="text/javascript"></script>
        <script src="scripts/jquery.validationEngine.js" type="text/javascript"></script>
        <script src="scripts/jquery.form.js"></script>
        <script type="text/javascript">
            $(document).ready(function() {
                jQuery("#creatForm").validationEngine();
                $("#imageSelectBtn").click(function() {
                    $("#comImageField").focus().trigger("click");
                });
                var bar = $('.bar');
                var percent = $('.percent');
                var status = $('#status');

                $('#creatForm').ajaxForm({
                    beforeSend: function() {
                        status.empty();
                        var percentVal = '0%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                        $("#creatLoading").html("<img src='images/loading.gif'/>");
                    },
                    uploadProgress: function(event, position, total, percentComplete) {
                        var percentVal = percentComplete + '%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                    },
                    success: function(responseText, statusText, xhr, $form) {
                        var percentVal = 'Completed!';
                        bar.width(percentVal)
                        percent.html(percentVal);
                        if (responseText.status === "success") {
                            $("#creatForm").resetForm();
                            $("#noCom").hide();
                            $("#cc").html(parseInt($("#cc").html())+1);
                            $("#aside-community-list").prepend('<div class="community-listing"><span><a href="' + responseText.unique_name + '">' + responseText.name + '</a></span></div><hr>');
                            humane.log("Community created successfully", {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-success'});
                        } else {
                            if (responseText.status) {
                                humane.log("Community was not created", {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-error'});
                            } else {
                                humane.log(responseText.error.message, {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-error'});
                            }
                        }
                    },
                    complete: function(xhr) {
                        $("#creatLoading").html("");
                    },
                    data: {
                        param: "creatCommunity",
                        uid: readCookie('user_auth')
                    }
                });
                $(".fancybox").fancybox({
                    openEffect: 'none',
                    closeEffect: 'none'

                });
                sendData("loadNotificationCount", {uid: readCookie("user_auth"), title: document.title});
            });
        </script>
        <style>
            .progress { position:relative; width:400px; border: 1px solid #ddd; padding: 1px; border-radius: 3px; }
            .bar { background-color: #B4F5B4; width:0%; height:20px; border-radius: 3px; }
            .percent { position:absolute; display:inline-block; top:3px; left:48%; }
        </style>
    </head>
    <body>
        <div class="page-wrapper">
            <?php
            include ("nav.php");
            include ("nav-user.php");
            ?>
            <div class="logo"><img src="images/gossout-logo-text-svg.svg" alt=""></div>

            <div class="content">
                <div class="create-community">
                    <h1>Create Community</h1>
                    <hr>
                    <h3>Some surutu and turance...! :D Lorem ipsum dolor sit amet, consectetur 
                        adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. </h3>
                    <h3 class="notice">Please, NOTE that Communities are deleted 
                        after <strong>XX</strong> days of inactivity.</h3>
                    <hr>
                    <form method="POST" action="tuossog-api-json.php" id="creatForm">
                        <div class="individual-detail">
                            <h2>1. Helve</h2>
                            <p class="desc">Give your community a helve; example: WHO for World Health organizations</p>
                            <input type="text" class="validate[required,ajax[ajaxCommunityNameCallPhp]] text-input input-fields" name="helve"/>
                        </div>

                        <div class="individual-detail">
                            <h2>2. Name</h2>
                            <p class="desc">This name would be used to identify the community</p>
                            <input type="text" name="name" class="validate[required] text-input input-fields">
                        </div>

                        <div class="individual-detail">
                            <h2>3. About</h2>
                            <p class="desc">Give a short description of the community</p>
                            <textarea name="desc" class="input-fields validate[required]"></textarea>
                        </div>


                        <div class="individual-detail">
                            <h2>4. Privacy</h2>
                            <p class="desc">Private communities can only be accessed by members that are invited to join</p>
                            <p><input type="checkbox" value="Private" name="privacy"> Make community private</p>
                        </div>
                        <div class="individual-detail">
                            <h2>5. Community Photo</h2>
                            <p class="desc">Logo, Badge, whatever image that best represents your Community</p>
                            <p class="desc">Image must be of the following type: .jpg, .png or .jpeg and must not be more than 2MB of size</p>
                            <hr>
                            <label>Select an image: </label>
                            <input type="file" name="img" class="input-fields" id="comImageField" style="position: absolute;left: -9999px;"><div class="button" id="imageSelectBtn"><span class="icon-16-camera"></span></div>
                            <!--<p></p>-->
                            <!--<input type="submit" class="button" value="Upload photo">-->
                        </div>
                        <div class="progress">
                            <div class="bar"></div >
                            <div class="percent">0%</div >
                        </div>
                        <div id="status"></div>
                        <hr/>
                        <br>
                        <input type="submit" class="button-big" value="Create"><span id="creatLoading"></span>
                    </form>
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