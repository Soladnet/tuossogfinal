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
    } else {
        include_once './LoginClass.php';
        $login = new Login();
        $login->logout();
        exit;
    }
} else {
    include_once './LoginClass.php';
    $login = new Login();
    $login->logout();
    exit;
}
?>
<!doctype html>
<html lang="en">
    <head>
        <?php
        include_once './webbase.php';
        ?>
        <title>Gossout - Settings</title>
        <script type="text/javascript" src="scripts/jquery-1.9.1.min.js"></script>
        <?php
        include ("head.php");
        ?>
        <link rel="stylesheet" href="css/jackedup.css">
        <link rel="stylesheet" href="css/validationEngine.jquery.css">
        <script type="text/javascript" src="scripts/humane.min.js"></script>
        <script type="text/javascript" src="scripts/jquery.fancybox.pack.js?v=2.1.4"></script>
        <script src="scripts/jquery.timeago.js" type="text/javascript"></script>
        <script src="scripts/test_helpers.js" type="text/javascript"></script>
        <script src="scripts/jquery.form.js" type="text/javascript"></script>
        <script src="scripts/jquery.validationEngine.js" type="text/javascript"></script>
        <script src="scripts/languages/jquery.validationEngine-en.js" type="text/javascript"></script>
        <script>
            $(document).ready(function() {
                sendData("loadNotificationCount", {title: document.title});
                $(".fancybox").fancybox({
                    openEffect: 'none',
                    closeEffect: 'none'
                });
                $("#clickToFileUpload,#changePassAnchor").click(function() {
                    if (this.id === "changePassAnchor") {
                        showOption(this);
                    } else {
                        $("#uploadField").focus().trigger('click');
                    }
                });
                $("#imageUploadForm,#profileForm,#changePassForm").validationEngine();
                var bar = $('.bar');
                var percent = $('.percent');
                $("#imageUploadForm").ajaxForm({
                    beforeSend: function() {
                        $("#photoProgress").show();
                        var percentVal = '0%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                    }, uploadProgress: function(event, position, total, percentComplete) {
                        var percentVal = "";
                        if (percentComplete > 99) {
                            percentVal = "Finalizing...";
                        } else {
                            percentVal = percentComplete + '%';
                        }
                        bar.width(percentVal)
                        percent.html(percentVal);
                    },
                    success: function(responseText, statusText, xhr, $form) {
                        var percentVal = '100%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                        if (responseText.status) {
                            $("#imageUploadForm").resetForm();
                            document.getElementById("user-img").src = document.getElementById("profile-pic").src = responseText.thumb;
                            humane.log("Profile picture changed successfully", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
                        } else {
                            if (responseText.error) {
                                humane.log(responseText.error.message, {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-error'});
                            } else {
                                humane.log(responseText.message, {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-error'});
                            }
                        }
                    },
                    complete: function(xhr) {
                        $("#photoProgress").hide();
                    }
                });
                $("#profileForm,#changePassForm").ajaxForm({
                    beforeSend: function() {
                        $("#profileText").show();
                        var percentVal = '0%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                    }, uploadProgress: function(event, position, total, percentComplete) {
                        var percentVal = "";
                        if (percentComplete == 100) {
                            percentVal = "Finalizing...";
                        } else {
                            percentVal = percentComplete + '%';
                        }
                        bar.width(percentVal)
                        percent.html(percentVal);
                    },
                    success: function(responseText, statusText, xhr, $form) {
                        var percentVal = '100%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                        if (responseText.status) {
                            $("#asideName,#more-fullname").html($("#fname").val() + " " + $("#lname").val());
                            var msg = responseText.message ? responseText.message : "Profile updated successfully";
                            humane.log(msg, {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
                        } else {
                            if (responseText.error) {
                                humane.log(responseText.error.message, {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-error'});
                            } else {
                                var msg = responseText.message ? responseText.message : "Profile was not updated";
                                humane.log(msg, {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-error'});
                            }
                        }
                        $(":password").val("");
                    },
                    complete: function(xhr) {
                        $("#profileText").hide();
                    },
                    data: {
                        param: "settings",
                        uid: readCookie('user_auth')
                    }
                });
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
                <div class="settings-list individual-detail">
                    <h1>Settings</h1>
                    <hr>
                    <hr>
                    <div class="individual-setting">
                        <h2>Profile Photo</h2>
                        <div class="pic-user">
                            <img src="<?php
                            $pix = $user->getPix();
                            echo isset($pix['thumbnail150']) ? $pix['thumbnail150'] : "images/no-pic.png"
                            ?>" id="user-img">
                        </div>
                        <hr>
                        <form id="imageUploadForm" method="Post" action="files-raw.php">
                            <p></p>
                            <center>
                                <input type="file" name="myfile" class="input-fields validate[required]" id="uploadField" style="position: absolute;left: -9999px;"><div class="button" id="clickToFileUpload"><span class="icon-16-camera"></span> Click to choose image</div><input type="submit" class="button" value="Upload photo">
                                <div class="progress" id="photoProgress" style="display: none">
                                    <div class="bar"></div >
                                    <div class="percent">0%</div >
                                </div>
                            </center>
                        </form>
                        <hr>
                    </div>
                    <form id="profileForm" action="tuossog-api-json.php" method="POST">
                        <div class="individual-setting" >
                            <h2>First Name</h2>
                            <input type="text" id="fname" name="fname" class="input-fields validate[required]" placeholder="Enter First name here" value="<?php echo $user->getFirstname() ?>">
                        </div>
                        <div class="individual-setting" >
                            <h2>Last Name</h2>
                            <input type="text" id="lname" name="lname" class="input-fields validate[required]" placeholder="Enter last name here" value="<?php echo $user->getLastname() ?>">
                        </div>
                        <div class="individual-setting">
                            <h2>Email</h2>
                            <input type="text" id="email" name="email" class="input-fields validate[required]" placeholder="Enter email here" readonly="" value="<?php echo $user->getEmail() ?>">
                        </div>
                        <div class="individual-setting">
                            <h2>Password</h2>
                            <input type="password" name="pass" class="input-fields validate[required]">
                        </div>
                        <input type="submit" class="button" value="Save Changes">
                        <div class="progress" id="profileText" style="display: none">
                            <div class="bar"></div >
                            <div class="percent">0%</div >
                        </div>
                    </form>
                    <hr/>
                    <hr/>
                    <a id="changePassAnchor">Change password</a>
                    <span style="display: none" id="changePassSpan">
                        <form id="changePassForm" action="tuossog-api-json.php" method="POST">
                            <div class="individual-setting">
                                <p class="desc">To change your password use the form bellow</p>
                                <h2>Old Password</h2>
                                <input type="password" name="opass" class="input-fields validate[required]">
                                <hr/>
                                <h2>New Password</h2>
                                <input type="password" name="npass" class="input-fields validate[required,minSize[6]]" id="npass">
                                <hr/>
                                <h2>Confirm Password</h2>
                                <input type="password" name="cnpass" class="input-fields validate[required,equals[npass]]">
                                <hr/>
                                <input type="submit" value="Change Password" class="button">
                            </div>
                        </form>
                    </span> 
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