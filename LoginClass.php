<?php

session_start();
include_once './Config.php';
include_once './encryptionClass.php';

class Login {

    var $user, $pass, $rem,$uid;

    public function __construct() {
        
    }

    public function setUsername($username) {
        $this->user = $this->clean($username);
    }

    public function setPassword($password) {
        $this->pass = md5($password);
    }

    public function setRememberStatus($remember = FALSE) {
        $this->rem = $remember;
    }
    public function setUid($uid){
        $this->uid = $uid;
    }

    public function getUser() {
        return $this->user;
    }

    public function confirmLogin() {
        $arrFetch = array();
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        //$count = 0;
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $str = "SELECT l.id, p.email, l.activated,p.dateJoined,  p.firstname, p.lastname, p.gender, p.dob,p.relationship_status,p.phone,p.url,p.bio,p.favquote,p.location,p.likes,p.dislikes,p.works FROM user_login_details AS l JOIN user_personal_info AS p ON p.id = l.id WHERE p.email = '$this->user' AND l.password = '$this->pass' AND l.id=p.id";

            if ($result = $mysql->query($str)) {
                if ($result->num_rows > 0 && $result->num_rows == 1) {
                    $row = $result->fetch_assoc();
                    if (is_numeric($row['id'])) {
                        $arrFetch['status'] = TRUE;
                        $arrFetch['user'] = $row['id'];
                        $encrypt = new Encryption();
                        if ($this->rem) {
                            $expire = time() + 60 * 60 * 24 * 30 * 3;
                            setcookie("user_auth", $encrypt->safe_b64encode($row['id']), $expire);
                        } else {
                            setcookie("user_auth", $encrypt->safe_b64encode($row['id']),0);
                        }
                        $_SESSION['auth'] = $row;
                    } else {
                        $arrFetch['status'] = FALSE;
                    }
                } else {
                    $arrFetch['status'] = FALSE;
                }
                $result->free();
            } else {
                $arrFetch['status'] = FALSE;
            }
        }
        $mysql->close();
        return $arrFetch;
    }
    public function isValidPassword() {
        $arrFetch = array();
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        //$count = 0;
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "SELECT count(*) as count FROM user_personal_info as u JOIN user_login_details as ul ON u.id=ul.id AND u.id='$this->uid' AND ul.password='$this->pass'";
            if ($result = $mysql->query($sql)) {
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    if ($row['count'] == 1) {
                        $arrFetch['status'] = TRUE;
                        $arrFetch['sql'] = $sql;
                    } else {
                        $arrFetch['status'] = FALSE;
                    }
                } else {
                    $arrFetch['status'] = FALSE;
                }
            } else {
                $arrFetch['status'] = FALSE;
            }
        }
        return $arrFetch;
    }
    public function isValidCredential() {
        $arrFetch = array();
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        //$count = 0;
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "SELECT count(*) as count FROM user_personal_info as u JOIN user_login_details as ul ON u.id=ul.id AND u.email='$this->user' AND ul.password='$this->pass'";
            if ($result = $mysql->query($sql)) {
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    if ($row['count'] == 1) {
                        $arrFetch['status'] = TRUE;
                    } else {
                        $arrFetch['status'] = FALSE;
                    }
                } else {
                    $arrFetch['status'] = FALSE;
                }
            } else {
                $arrFetch['status'] = FALSE;
            }
        }
        return $arrFetch;
    }

    public function logout() {
//        if (isset($_SESSION['auth'])) {
        unset($_SESSION['auth']);
        setcookie("user_auth", "", time() - 3600);
        setcookie("m_t", "", time() - 3600);
//        }
        header("Location:login");
    }

    public function clean($value) {
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

}

?>
