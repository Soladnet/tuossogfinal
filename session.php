<?php
//session_start();
//echo "2013-05-17 21:03:36">"2013-05-17 22:03:05";
//session_destroy();
//print_r($_SESSION);
//echo "<br/>" . $_SERVER['REMOTE_ADDR'];
//echo "<br/>";
//include_once './Config.php';
//$mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
//if ($mysql->connect_errno > 0) {
//    throw new Exception("Connection to server failed!");
//} else {
//    $sql = "SELECT NOW() as time";
//    if ($result = $mysql->query($sql)) {
//        $row = $result->fetch_assoc();
//        echo $row['time'] . " - ";
//    }
//}
//echo "<br/>";
////$var = GeoLocation("41.71.149.159", "34e6d3f396a1be972da92c290cf54b28e9076c11e1772cbf9d58d0764539b5c6");
////echo $var;
////
////function GeoLocation($ip, $api) {
////    $params = @file_get_contents("http://api.ipinfodb.com/v3/ip-city/?key=" . $api . "&ip=" . $ip . "&format=json");
////    return $params;
////}
//
//echo "<br/>";
//$ip = "41.71.149.159"; //$_SERVER['REMOTE_ADDR']; // means we got user's IP address 
//$json = @file_get_contents('http://smart-ip.net/geoip-json/' . $ip); // this one service we gonna use to obtain timezone by IP
//// maybe it's good to add some checks (if/else you've got an answer and if json could be decoded, etc.)
//$ipData = json_decode($json, true);
//
//if ($ipData['timezone']) {
//    echo convert_time_zone($row['time'], $ipData['timezone']);
//} else {
//    date_default_timezone_set("Africa/Lagos");
//    echo convert_time_zone($row['time'], 'Africa/Lagos');
//}
//function convert_time_zone($timeFromDatabase_time, $tz) {
//    $date = new DateTime($timeFromDatabase_time, new DateTimeZone(date_default_timezone_get()));
//    $date->setTimezone(new DateTimeZone($tz));
//    return $date->format('Y-m-d H:i:s');
//    // or return $userTime; // if you want to return a DateTime object.
//}
//$email = "soladnnet@gmail.com";
//$usernameTemp = explode('@', $email);
//$username = FALSE;
//$count = 0;
//do {
//    if ($count > 0) {
//        $username = prepareUsername($usernameTemp[0] . $count);
//    } else {
//        $username = prepareUsername($usernameTemp[0]);
//    }
//    $count++;
//} while (!$username);
//
//echo $username;
//include_once './GossoutUser.php';
//$user = new GossoutUser(0);
//echo $user->encodeText("1");
//echo '<<==<br/>';
//include './encryptionClass.php';
//$encrypt = new Encryption();
//echo ($encrypt->safe_b64decode("GIWzvI0FSIDDyI0FUAA="));
//echo date("Y-m-d");
//$str = "_-thissdfkj";
//print_r(preg_match("/[^A-Za-z0-9_-]/", $str));
//function prepareUsername($email) {
//    $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
//    if ($mysql->connect_errno > 0) {
//        throw new Exception("Connection to server failed!");
//    } else {
//        $sql = "SELECT * FROM user_personal_info WHERE username='$email'";
//        if ($mysql->query($sql)) {
//            if ($mysql->affected_rows > 0) {
//                $mysql->close();
//                return FALSE;
//            } else {
//                $mysql->close();
//                return $email;
//            }
//        }
//    }
//}
//$stamp = imagecreatefrompng('images/stamp25.png');
//$im = imagecreatefrompng('images/no-pic.png');
//
//// Set the margins for the stamp and get the height/width of the stamp image
//$marge_right = 1;
//$marge_bottom = 1;
//$sx = imagesx($stamp);
//$sy = imagesy($stamp);
//
//$imx = imagesx($im);
//$imy = imagesy($im);
//
//// Copy the stamp image onto our photo using the margin offsets and the photo 
//// width to calculate positioning of the stamp. 
//imagecopy($im, $stamp, imagesx($im) - $sx - $marge_right, imagesy($im) - $sy - $marge_bottom, 0, 0, imagesx($stamp), imagesy($stamp));
//
//// Output and free memory
//header('Content-type: image/png');
//imagepng($im);
//imagedestroy($im);
?>
<!doctype html>
<html>
    <head>
        <link rel="stylesheet" href="css/jquery-ui-base-1.8.20.css"/>
        <link rel="stylesheet" href="css/tagit-dark-grey.css"/>
        <link rel="stylesheet" href="css/style.min.css"/>
        <script type="text/javascript" src="scripts/jquery-1.9.1.min.js"></script>
        <script type="text/javascript" src="scripts/jquery-ui.1.8.20.min.js"></script>
        <script type="text/javascript" src="scripts/tagit.js"></script>
        <script>
            var availableTags = [
                "ActionScript",
                "AppleScript",
                "Asp",
                "BASIC",
                "C",
                "C++",
                "Clojure",
                "COBOL",
                "ColdFusion",
                "Erlang",
                "Fortran",
                "Groovy",
                "Haskell",
                "Java",
                "JavaScript",
                "Lisp",
                "Perl",
                "PHP",
                "Python",
                "Ruby",
                "Scala",
                "Scheme"
            ];
            $(document).ready(function() {
                $('#demo2').tagit();
            });
        </script>
    </head>
    <body>
        <div class="box">
            <div class="note">
                You can manually specify tags in your markup by adding <em>list items</em> to the unordered list!
            </div>

            <ul id="demo2" data-name="demo2">
                <li data-value="here">here</li>
                <li data-value="are">are</li>
                <li data-value="some...">some</li>
                <!-- notice that this tag is setting a different value :) -->
                <li data-value="initial">initial</li>
                <li data-value="tags">tags</li>
            </ul>
        </div>
    </body>

</html>