<?php

ini_set('max_execution_time', 7200);
include_once './config.php';
$mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
if ($mysql->connect_errno > 0) {
    throw new Exception("Connection to server failed!");
} else {
    $sql = "SELECT firstname, lastname, email FROM `user_personal_info`";
    if ($result = $mysql->query($sql)) {
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $name = "$row[firstname] $row[lastname]";
                $msg = "<!doctype html><html><head><meta charset='utf-8'><style>a:hover{color: #000;}a:active , a:focus{color: green;}.index-functions:hover{/*cursor: pointer;*/ color: #99C43D !important;-webkit-box-shadow: inset 0px 0px 1px 1px #ddd;box-shadow: inset 0px 0px 1px 1px #ddd;}.index-functions:active{color: #C4953D !important;-webkit-box-shadow: inset 0px 0px 1px 2px #ddd;box-shadow: inset 0px 0px 1px 2px #ddd;}</style></head><body style='font-family: 'Segoe UI',sans-serif;background-color: #f9f9f9;color: #000000;line-height: 2em;'><div style='max-width: 800px;margin: 0 auto;background-color: #fff;border: 1px solid #f2f2f2;padding: 10px'><div class='header'><img style='float: right;top: 0px;' src='http://service.gossout.com/images/gossout-logo-text-and-image-Copy.png'/><br><p style='margin: 3px;'><span class='user-name'>Hi, <a style='color: #62a70f;text-decoration: none;'>$name</a></span></p><hr style='margin: .3em 0;width: 100%;height: 1px;border-width:0;color: #ddd;background-color: #ddd;'></div><div style='background-color: #fff;padding: 1em;'><p style='margin: 3px;font-size: .9em;color:#0000'>This is to notify you that Gossout will take a new look and will be released on the 12th of May 2013. Log-on to enjoy the new experiences, new feel, and many more.</p><h3 style='color: #62a70f;'>New Features</h3><ul style='color: #000000'><li style='color: #000000'>New design to improve your experience</li><li style='color: #000000'>Create and join as many communities as you want!</li><li style='color: #000000'>Discover new communities</li><li style='color: #000000'>Upload multiple images on posts</li><li style='color: #000000'>Search and explore people, posts, and communities</li></ul></div><hr style='margin: .3em 0;width: 100%;height: 1px;border-width:0;color: #ddd;background-color: #ddd;'><div style='background-color: #f9f9f9;padding: 10px;font-size: .8em;'><center><div class='index-intro-2'><div style='display: block;display: inline-block;padding: 1em;max-width: 200px;' class='index-functions'><div style='margin: 0 auto;width: 24px;height:1em'><span style='margin-right: .15em;display: inline-block;width: 24px;height: 24px;'><img src='http://service.gossout.com/images/community-resize.png'/></span></div><h3 style='text-align: center;height: 1em;'>Discover</h3><p style='margin: 3px;color: #777;line-height: 1.5;margin-bottom: 1em;padding-top: 1em;font-size: .8em;padding-top: 0;'>Communities &amp; Friends</p></div><div style='display: block;display: inline-block;padding: 1em;max-width: 200px;' class='index-functions'><div style='margin: 0 auto;width: 24px;height:1em'><span style='margin-right: .15em;display: inline-block;width: 24px;height: 24px;'><img src='http://service.gossout.com/images/connect-pple.png'/></span></div><h3 style='text-align: center;height: 1em;'>Connect</h3><p style='margin: 3px;color: #777;line-height: 1.5;margin-bottom: 1em;padding-top: 1em;font-size: .8em;padding-top: 0;'>Meet People, Share Interests</p></div><div style='display: block;display: inline-block;padding: 1em;max-width: 200px;' class='index-functions'><div style='margin: 0 auto;width: 24px;height:1em'><span style='margin-right: .15em;display: inline-block;width: 24px;height: 24px;'><img src='http://service.gossout.com/images/search.png'/></span></div><h3 style='text-align: center;height: 1em;'>Search</h3><p style='margin: 3px;color: #777;line-height: 1.5;margin-bottom: 1em;padding-top: 1em;font-size: .8em;padding-top: 0;'>Communities, People and Posts</p></div></div></center><hr style='margin: .3em 0;width: 100%;height: 1px;border-width:0;color: #ddd;background-color: #ddd;'><table cellspacing='5px'><tr ><td colspan='3'> ©<?php echo date('Y');?><a style='color: #62a70f;text-decoration: none;' href='http://www.gossout.com'>Gossout</a></td></tr></table></div></div></body></html>";
                $to = "$row[firstname] $row[lastname]<$row[email]>";
                $subject = "Gossout is taking a new look!";
                $headers = "From: Gossout Team<feedback@gossout.com>\r\n";
                $headers .= "MIME-Version: 1.0\r\n";
                $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
                @mail($to, $subject, $msg, $headers);
                echo $name;
            }
        } else {
            echo $mysql->error;
            exit;
        }
    }
}
?>