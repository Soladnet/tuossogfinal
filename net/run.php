<?php

include_once '../Config.php';
include_once './encryptionClass.php';
$encrypt = new Encryption();
if (isset($_POST['option'])) {
    if ($_POST['option'] == "gUser") {
        $input = clean($_POST['input']);
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
                            echo json_encode(array("response" => $row));
                        } else {
                            displayError(404, "$_POST[input] = $input does not exist");
                        }
                    } else {
                        displayError(404, "Query failed!");
                    }
                }
            } else {
                displayError(404, "Invaid User ID");
            }
        } else {
            displayError(404, "Method not defined!");
        }
    } else if ($_POST['option'] == "regStat") {
        $arr['totalReg'] = 0;
        $arr['regToday'] = 0;
        $arr['lastTen'] = array();
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "SELECT count(*) as count FROM `user_personal_info`";
            if ($result = $mysql->query($sql)) {
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $arr['totalReg'] = $row['count'];
                }
            }
            $date = date("Y-m-d");
            $sql1 = "SELECT count(*) as counts FROM `user_personal_info` WHERE `dateJoined`>='$date'";
            if ($result1 = $mysql->query($sql1)) {
                if ($result1->num_rows > 0) {
                    $row1 = $result1->fetch_assoc();
                    $arr['regToday'] = $row1['counts'];
                }
            }
            $sql = "SELECT * FROM `user_personal_info` order by id desc LIMIT 0,100";
            if ($result = $mysql->query($sql)) {
                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        $arr['lastTen'][] = $row;
                    }
                }
            }
            echo json_encode($arr);
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