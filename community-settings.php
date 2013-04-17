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
<html>
    <head>
        <?php
        include_once './webbase.php';
        ?>
        <title>Gossout - Settings</title>
        <script type="text/javascript" src="scripts/jquery-1.9.1.min.js"></script>
        <?php
        include ("head.php");
        ?>
        <link rel="stylesheet" href="css/validationEngine.jquery.css" type="text/css"/>
        <link rel="stylesheet" href="css/jackedup.css">
        <link rel="stylesheet" href="css/chosen.css" />
        <script type="text/javascript" src="scripts/humane.min.js"></script>
        <script src="scripts/jquery.timeago.js" type="text/javascript"></script>
        <script src="scripts/test_helpers.js" type="text/javascript"></script>
        <script src="scripts/languages/jquery.validationEngine-en.js" type="text/javascript"></script>
        <script src="scripts/jquery.validationEngine.js" type="text/javascript"></script>
        <script src="scripts/jquery.form.js"></script>
        <script type="text/javascript" src="scripts/jquery.fancybox.pack.js?v=2.1.4"></script>
        <script src="scripts/chosen.jquery.min.js" type="text/javascript"></script>
        <?php
        if (isset($_GET['param']) ? $_GET['param'] != "" ? $_GET['param'] : FALSE  : FALSE) {
            ?>
            <script type="text/javascript">
                $(document).ready(function() {
                    sendData("loadCommunity", {target: "#rightcolumn", uid: readCookie('user_auth'), loadImage: true, max: true, loadAside: true, comname: '<?php echo $_GET['param'] ?>', settings: true});
                    $("#settingsForm,#imageChangeForm").validationEngine();
                    $("#settingsForm").ajaxForm({
                        success: function(responseText, statusText, xhr, $form) {
                            if (!responseText.error) {
                                $("#commTitle").html(responseText.name);
                                $("#commDesc").html(responseText.desc);
                                humane.log(responseText.message, {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-success'});
                            } else {
                                humane.log(responseText.error.message, {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-success'});
                            }
                        },
                        complete: function(xhr) {
                        }
                    });
                    $("#imageChangeForm").ajaxForm({
                        success: function(responseText, statusText, xhr, $form) {
                            if (responseText.status) {
                                $("#imageChangeForm").resetForm();
                                document.getElementById("commPix").src = document.getElementById("com-img").src = responseText.thumb;
                                humane.log(responseText.message, {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-success'});
                            } else {
                                if (responseText.error) {
                                    humane.log(responseText.error.message, {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-error'});
                                } else {
                                    humane.log(responseText.message, {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-error'});
                                }
                            }
                        },
                        complete: function(xhr) {
                        },
                        data: {
                            name: ""
                        }
                    });
                    $("#uploadFileBtn").click(function() {
                        $("#fileUpload").trigger('click');
                    });
                });
            </script>
            <?php
        }
        ?>
    </head>
    <body>
        <div class="page-wrapper">
            <?php
            include ("nav.php");
            include ("nav-user.php");
            ?>
            <div class="logo"><img src="images/gossout-logo-text-svg.svg" alt=""></div>

            <div class="content">
                <div class="settings-list create-community">
                    <h1>Community Settings</h1>
                    <hr>
                    <hr>
                    <form action="tuossog-api-json.php" method="POST" id="imageChangeForm">
                        <div class="individual-setting individual-detail">
                            <h2>Photo</h2>
                            <div class="pic-user">
                                <img src="images/no-pic.png" id="com-img">
                            </div>
                            <hr>
                            <input type="file" name="img" id="fileUpload" class="input-fields validate[required]" style="position: absolute;left: -9999px;">
                            <input type="hidden" name="param" value="Update Community" />
                            <input type="hidden" name="creator" value="" class="creator_field"/> 
                            <input type="hidden" name="helve" readonly="" class="validate[required] helve">
                            <div class="button" id="uploadFileBtn"><span class="icon-16-camera"></span> Choose Photo</div>
                            <p class="desc">Logo, Badge, whatever image that best represents your community
                                Image must be of the following type: .jpg, .png or .jpeg and must not be more than 2MB of size</p>
                            <input type="submit" class="button" value="Upload photo">
                            <hr>
                        </div>
                    </form>
                    <form method="POST" action="tuossog-api-json.php" id="settingsForm">
                        <div class="individual-setting">
                            <h2>Helve</h2>
                            <input type="hidden" name="creator" value="" id="creator_field" class="creator_field" />
                            <input type="text" name="helve" id="helve" readonly="" class="validate[required] helve">
                        </div>
                        <div class="individual-setting">
                            <h2>Name</h2>
                            <input type="text" name="name" id="commName" class="validate[required]">
                        </div>
                        <div class="individual-setting">
                            <h2>Description</h2>
                            <textarea name="desc" id="commDescription" rows="5" class="validate[required]">

                            </textarea>
                        </div>

                        <div class="individual-setting">
                            <h2>Privacy</h2>
                            <p> <input type="checkbox" name="privacy" value="Private" id="privacy"> Make this community private</p>
                        </div>
                        <!--                    <div class="individual-setting">
                                                <h2>Notifications</h2>
                                                <p> <input type="checkbox"> Receive notifications through e-mail</p>
                                            </div>-->
                        <div class="button"><a id="setting_cancel">Cancel</a></div>
                        <input type="submit" class="button submit" value="Save Changes"><input type="hidden" name="param" value="Update Community"/>
                    </form>
                </div>
                <?php
                include("sample-community-aside.php");
                ?>			
            </div>
            <?php
            include("footer.php");
            ?>
        </div>

    </body>
</html>