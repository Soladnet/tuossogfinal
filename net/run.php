<?php

include_once '../Config.php';
include_once './encryptionClass.php';
$encrypt = new Encryption();
if (isset($_POST['option'])) {
    if ($_POST['option'] == "gUser") {
        $input = trim($_POST['input']);
        if ($input != "") {
            if (isset($_POST['decode'])) {
                $input = $encrypt->safe_b64decode($input);
            }
            
            if (is_numeric($input)) {
                $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
                if ($mysql->connect_errno > 0) {
                    throw new Exception("Connection to server failed!");
                } else {
                    $sql = "SELECT * FROM `user_personal_info` WHERE id = '$input'";
                    if ($result = $mysql->query($sql)) {
                        if ($result->num_rows > 0) {
                            $row = $result->fetch_assoc();
                            echo json_encode(array("response"=>$row));
                        }else{
                            displayError(404, "$_POST[input] = $input does not exist");
                        }
                    }else{
                        displayError(404, "Query failed!");
                    }
                }
            } else {
                displayError(404, "Invaid User ID");
            }
        } else {
            displayError(404, "Method not defined!");
        }
    } else {
        displayError(404, "Method not defined!");
    }
} else {
    displayError(404, "Method not defined!");
}

//$input = $_POST['input'];
//$encoded = $encrypt->safe_b64encode($input);
//$inputCount = strlen($input);
//$encodedCount = strlen($encoded);
//echo json_encode(array("text" => $input, "encoded" => $encoded, "textCount" =>$inputCount , "encodedCount" => $encodedCount));
function displayError($code, $meesage) {
    $response_arr = array();
    $response_arr['error']['code'] = $code;
    $response_arr['error']['message'] = $meesage;
    if ($meesage == "The request cannot be fulfilled due to bad syntax") {
        @mail("soladnet@gmail.com", "bad syntax from user " . $_SERVER['HTTP_REFERER'], json_encode($_POST));
    }
    echo json_encode($response_arr);
}

?>