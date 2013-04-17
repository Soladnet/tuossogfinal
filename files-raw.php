<?php
session_start();
$type = 'json'; //$_POST['mimetype'];
$xhr = true;
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']))
    $xhr = $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest';

if ($type == 'xml') {
    header('Content-type: text/xml');
    ?> 
    <address attr1="value1" attr2="value2"> 
        <street attr="value">A &amp; B</street> 
        <city>Palmyra</city> 
    </address> 
    <?php
} else if ($type == 'json') {
    if (isset($_FILES['myfile'])) {
        $data = array();
        $allowedExts = array("jpg", "jpeg", "gif", "png");
        $ext = explode(".", $_FILES["myfile"]["name"]);
        $data['extension'] = strtolower(end($ext));
        $data['size'] = $_FILES['myfile']['size'] / 1024;
        if ((($_FILES["myfile"]["type"] == "image/gif") || ($_FILES["myfile"]["type"] == "image/jpeg") || ($_FILES["myfile"]["type"] == "image/png") || ($_FILES["myfile"]["type"] == "image/pjpeg")) && ($data['size'] < 5120 && $data['size'] > 1) && in_array($data['extension'], $allowedExts) && !($_FILES["myfile"]["error"] > 0)) {
            $newPath = "upload/images/" . time() . $_COOKIE['user_auth'] . ".$data[extension]";
            $thumbnail45 = "upload/images/" . time() . $_COOKIE['user_auth'] . "-1.$data[extension]";
            $thumbnail50 = "upload/images/" . time() . $_COOKIE['user_auth'] . "-2.$data[extension]";
            $thumbnail75 = "upload/images/" . time() . $_COOKIE['user_auth'] . "-3.$data[extension]";
            $thumbnail150 = "upload/images/" . time() . $_COOKIE['user_auth'] . "-4.$data[extension]";
            include_once './SimpleImage.php';
            $image = new SimpleImage();
            $image->load($_FILES["myfile"]["tmp_name"]);
            list($width, $height) = getimagesize($_FILES["myfile"]["tmp_name"]);
//            if ($width > $height * 2 || $height > $width * 2) {
                $image->resize(150, 150);
                $image->save($thumbnail150);
                $image->resize(75, 75);
                $image->save($thumbnail75);
                $image->resize(50, 50);
                $image->save($thumbnail50);
                $image->resize(45, 45);
                $image->save($thumbnail45);
//            }  else {
//                if ($width > $height) {
//                    $image->resizeToWidth(150);
//                    $image->save($thumbnail150);
//                    $image->resizeToWidth(75);
//                    $image->save($thumbnail75);
//                    $image->resizeToWidth(50);
//                    $image->save($thumbnail50);
//                    $image->resizeToWidth(45);
//                    $image->save($thumbnail45);
//                } else {
//                    $image->resizeToHeight(150);
//                    $image->save($thumbnail150);
//                    $image->resizeToHeight(75);
//                    $image->save($thumbnail75);
//                    $image->resizeToHeight(50);
//                    $image->save($thumbnail50);
//                    $image->resizeToHeight(45);
//                    $image->save($thumbnail45);
//                }
//            }
            move_uploaded_file($_FILES["myfile"]["tmp_name"], $newPath);
            include_once './GossoutUser.php';
            $userUploader = new GossoutUser($_SESSION['auth']['id']);
            $response = $userUploader->newPictureUpload($newPath);
            if ($response['status']) {
                $userUploader->updateThumbnail($response['id'], $thumbnail45, $thumbnail50, $thumbnail75, $thumbnail150);
                header('Content-type: application/json');
                echo json_encode(array('thumb' => $thumbnail150));
            } else {
                unlink($newPath);
                unlink($thumbnail150);
                unlink($thumbnail50);
                unlink($thumbnail45);
                unlink($thumbnail75);
                displayError(404, "The request cannot be fulfilled due to bad syntax");
            }
        } else {
            displayError(404, "The request cannot be fulfilled due to unacceptable image format or size");
        }

        // wrap json in a textarea if the request did not come from xhr 
//        if (!$xhr)
//            echo '<textarea>';
//        if ($data['status']) {
//            echo "Upload Successful";
//        } else {
//            echo "Upload failed " . $data['msg'];
//        }
//
//        if (!$xhr)
//            echo '</textarea>';
    }
} else if ($type == 'script') {
    // wrap script in a textarea if the request did not come from xhr 
    if (!$xhr)
        echo '<textarea>';
    ?> 

    for (var i=0; i < 2; i++) 
    alert('Script evaluated!'); 

    <?php
    if (!$xhr)
        echo '</textarea>';
}
else {
    // return text var_dump for the html request 
    echo "VAR DUMP:<p />";
    var_dump($_POST);
    foreach ($_FILES as $file) {
        $n = $file['name'];
        $s = $file['size'];
        if (!$n)
            continue;
        echo "File: $n ($s bytes)";
    }
}

function displayError($code, $meesage) {
    $response_arr = array();
    $response_arr['error']['code'] = $code;
    $response_arr['error']['message'] = $meesage;
    header('Content-type: application/json');
    echo json_encode($response_arr);
}
?>