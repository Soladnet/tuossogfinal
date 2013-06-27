<?php
include_once './Config.php';

if (isset($_POST['email']) && isset($_POST['password']) && isset($_POST['cpassword'])) {
    $email = $_POST['email'];
    $pass = $_POST['password'];
    $cpass = $_POST['cpassword'];
} else {
    $_SESSION['signup_login_error']['message'] = "Invalid Login credentials";
    header("Location: signup-login?signup_login_error=");
    exit();
}

if (isValidEmail($email)) {
    $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
    if ($mysql->connect_errno > 0) {
        $arrayToJs[] = TRUE;
        echo json_encode($arrayToJs);
    } else {
        $sql = "SELECT * FROM `user_personal_info` WHERE email = '" . clean($email) . "'";
        if ($result = $mysql->query($sql)) {
            if ($result->num_rows > 0) {
                if (isset($_COOKIE['user_auth'])) {
                    include_once './GossoutUser.php';
                    $userReg = new GossoutUser(0);
                    $resp['status'] = TRUE;
                    include_once './encryptionClass.php';
                    $encrypt = new Encryption();
                    $id = $encrypt->safe_b64decode($_COOKIE['user_auth']);
                    if (is_numeric($id)) {
                        $resp['id'] = $id;
                        if ($resp['status']) {
                            $userReg->setUserId($resp['id']);
                            $userReg->getProfile();
                        }
                    } else {
                        include_once './LoginClass.php';
                        $login = new Login();
                        $login->logout();
                    }
                } else {
                    $_SESSION['signup_login_error']['message'] = "User already registered";
                    $_SESSION['signup_login_error']['data'] = $_POST;
                    header("Location: signup-login?signup_login_error=");
                    exit();
                }
            } else {
                if ($pass == $cpass) {
                    include_once './GossoutUser.php';
                    $userReg = new GossoutUser(0);
                    if (!isset($_COOKIE['user_auth']) && isset($_SESSION['data'])) {
                        $data = $_SESSION['data'];
                        $resp = $userReg->register(clean($data['first_name']), clean($data['last_name']), clean($email), md5($pass), $data['gender'], "$data[dob_yr]-$data[dob_month]-$data[dob_day]");
                        unset($_SESSION['data']);
                    } else {
                        $resp['status'] = TRUE;
                        include_once './encryptionClass.php';
                        $encrypt = new Encryption();
                        $id = $encrypt->safe_b64decode($_COOKIE['user_auth']);
                        if (is_numeric($id)) {
                            $resp['id'] = $id;
                        } else {
                            include_once './LoginClass.php';
                            $login = new Login();
                            $login->logout();
                        }
                    }
                    if ($resp['status']) {
                        $userReg->setUserId($resp['id']);
                        $result = $userReg->getProfile();
                        if (!$result['status']) {
                            include_once './LoginClass.php';
                            $login = new Login();
                            $login->logout();
                            exit;
                        }
                    } else {
                        $_SESSION['signup_login_error']['message'] = $resp['message'];
                        $_SESSION['signup_login_error']['data'] = $_POST;
                        header("Location: signup-login?signup_login_error=");
                        exit();
                    }
                } else {
                    $_SESSION['signup_login_error']['message'] = "Password fields do not match";
                    $_SESSION['signup_login_error']['data'] = $_POST;
                    header("Location: signup-login?signup_login_error=");
                    exit();
                }
            }
        } else {
            $_SESSION['signup_login_error']['message'] = "Something terrible just went wrong...we will fix this as soon as possible";
            $_SESSION['signup_login_error']['data'] = $_POST;
            header("Location: signup-login?signup_login_error=");
            exit;
        }
    }
} else {

    $_SESSION['signup_login_error']['message'] = "Email is invlaid";
    $_SESSION['signup_login_error']['data'] = $_POST;
    header("Location: signup-login?signup_login_error=");
    exit();
}

function isValidEmail($email) {
    //Perform a basic syntax-Check
    //If this check fails, there's no need to continue
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false;
    }
    //extract host
    list($user, $host) = explode("@", $email);
    //check, if host is accessible
    if (!checkdnsrr($host, "MX") && !checkdnsrr($host, "A")) {
        return false;
    }
    return true;
}

function clean($value) {
    // If magic quotes not turned on add slashes.
    if (!get_magic_quotes_gpc()) {
        // Adds the slashes.
        $value = addslashes($value);
    }
    // Strip any tags from the value.
    $value = strip_tags($value);
    // Return the value out of the function.
    return $value;
}
?>
<!doctype html>
<html lang="en">
    <head>
        <?php
        include_once './webbase.php';
        ?>
        <title>Gossout - Signup 3/3</title>
        <meta name="description" content="Start or join existing communities/interests on Gossout and start sharing pictures and videos. People use Gossout search, Discover and connect with communities">
        <meta name="keywords" content="Community,Communities,Interest,Interests,Friend,Friends,Connect,Search,Discover,Discoveries,Gossout,Gossout.com,Zuma Communication Nigeria Limited,Soladnet Software,Soladoye Ola Abdulrasheed, Muhammad Kori,Ali Sani Mohammad,Lagos,Nigeria,Nigerian,Africa,Surulere,Pictures,Picture,Video,Videos,Blog,Blogs">
        <meta name="author" content="Soladnet Sofwares, Zuma Communication Nigeria Limited">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" > 
        
        <link rel="shortcut icon" href="favicon.ico">
        <link rel="stylesheet" media="screen" href="css/style.min.css">
        <link rel="stylesheet" href="css/validationEngine.jquery.css" type="text/css"/>
        <script src="scripts/jquery-1.9.1.min.js" type="text/javascript"></script>
        <script type="text/javascript" src="scripts/modernizr.custom.77319.js"></script>
        <script src="scripts/languages/jquery.validationEngine-en.js" type="text/javascript"></script>
        <script src="scripts/jquery.validationEngine.js" type="text/javascript"></script>
        <script src="scripts/jquery.form.js"></script>
        <script>
            $(document).ready(function() {
                if (Modernizr.inlinesvg) {
                    $('#logo').html('<a href="index"><img src="images/gossout-logo-text-and-image-svg.svg" alt="Gossout" /></a>');
                } else {
                    $('#logo').html('<a href="index"><img src="images/gossout-logo-text-and-image-svg.png" alt="Gossout" /></a>');
                }
                var bar = $('.bar');
                var percent = $('.percent');
                $("#uploadForm").validationEngine();
                $("#fileChookseBtn").click(function() {
                    $("#fileInput").focus().trigger('click');
                });
                $('#uploadForm').ajaxForm({
                    beforeSend: function() {
                        $(".progress").show();
                        var percentVal = '0%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                    },
                    uploadProgress: function(event, position, total, percentComplete) {
                        var percentVal = percentComplete + '%';
                        bar.width(percentVal);
                        var value = percentVal;
                        if (percentComplete > 99) {
                            percent.html("Finalizing...");
                        }else{
                            percent.html(percentVal);
                        }
                    },
                    success: function(responseText, statusText, xhr, $form) {
                        var percentVal = '100%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                        if (!responseText.error) {
                            document.getElementById("target").src = responseText.thumb;
                        }
//                        alert(document.getElementById("target").src);
                    },
                    complete: function(xhr, textStatus) {
                        var response = JSON.parse(xhr.responseText);
                        if (!response.error) {
                            status.html("Upload Successful");
                        } else {
                            status.html("Upload Failed. " + response.error.message);
                        }
                        $(".progress").hide();
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
        <div class="index-page-wrapper">	
            <div class="index-nav">
                <span class="index-login"><?php echo "Welcome " . $userReg->getFullname() ?></span>
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
                                Ahaa... That's it! 
                            </h1>
                        </div>	
                        <progress max="100" value="85" >3 of 3 Completed</progress>
                        <hr>
                        <form id="uploadForm" method="POST" action="files-raw.php" enctype="multipart/form-data">
                            <ul>
                                <li><center>
                                    <label>Select an image: </label>
                                    <div class="profile-pic">
                                        <img src="<?php
                                        $pix = $userReg->getPix();
                                        echo isset($pix['thumbnail150']) ? $pix['thumbnail150'] : "images/user-no-pic.png"
                                        ?>" id="target">
                                    </div>
                                    <hr>
                                    <input type="file" onchange="$('#selectedFile').html('<br/><strong>File Name:</strong> ' + this.value);" id="fileInput" name="myfile" class="input-fields validate[required]" style="position: absolute;left: -9999px;"/>
                                    <div id="fileChookseBtn" class="button"><span class="icon-16-camera"></span> Click to choose image</div>
                                    <span id="selectedFile"></span>
                                    <p>Maximum file size of 5MB<br/>Image type of .jpg, .jpeg, .gif, and .png</p>
                                    <input type="submit" class="button" value="Upload photo">
                                </center>
                                <hr>
                                <div class="progress" style="display: none">
                                    <div class="bar"></div >
                                    <div class="percent">0%</div >
                                </div>
                                <div id="status"></div>
                                </li>
                            </ul>
                            <br>
                        </form>
                        <center><div class="button"><a href="validate-email">Skip</a></div>
                            <div class="button"><a href="validate-email">Next!</a></div>
                        </center>
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