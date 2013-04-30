<?php

include_once './Config.php';
include_once './encryptionClass.php';

/**
 * Description of Post
 *
 * @author user
 */
class Post {

    var $uid, $comId, $postId;

    public function __construct() {
        
    }

    public function countUserPosts() {
        $arrFetch = array();
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        //$count = 0;
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "SELECT count(`id`) as count FROM `post` WHERE `sender_id` = $this->uid";
            if ($result = $mysql->query($sql)) {
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $arrFetch['post_count'] = $row;

                    $arrFetch['status'] = TRUE;
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

    public function post($values) {
        $arrFetch = array();
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "INSERT INTO post(post,community_id,sender_id) VALUES $values";
            if ($mysql->query($sql)) {
                if ($mysql->affected_rows > 0) {
                    $arrFetch['post']['id'][] = $mysql->insert_id;
                    $result = $mysql->query("SELECT NOW() as time");
                    $row = $result->fetch_assoc();
                    $result->free();
                    $arrFetch['post']['time'] = $row['time'];
                } else {
                    $arrFetch['post']['id'] = 0;
                }
                $arrFetch['status'] = TRUE;
            } else {
                $arrFetch['status'] = FALSE;
            }
        }
        $mysql->close();
        return $arrFetch;
    }

    public function postImage($values) {
        $arrFetch = array();
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "INSERT INTO post_image(post_id,community_id,sender_id,original,thumbnail100) VALUES $values";
            if ($mysql->query($sql)) {
                $arrFetch['status'] = TRUE;
            } else {
                $arrFetch['status'] = FALSE;
            }
        }
        $mysql->close();
        return $arrFetch;
    }

    public function loadPost($timezone) {
        $arrFetch = array();
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        //$count = 0;
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $encrypt = new Encryption();
            $sql = "SELECT p.`id`, p.`post`, p.`sender_id`,u.firstname,u.lastname, p.`time`, p.`status` FROM `post` as p JOIN user_personal_info as u ON p.sender_id=u.id WHERE p.`community_id`=$this->comId  AND p.deleteStatus=0 order by p.`id` desc";
            if ($result = $mysql->query($sql)) {
                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        $row['post'] = nl2br($row['post']);
                        $comCount = $this->getCommentCountFor($row['id']);
                        if ($comCount['status']) {
                            $row['numComnt'] = $comCount['count'];
                        } else {
                            $row['numComnt'] = 0;
                        }
                        $post_image = $this->loadPostImage($row['id']);
                        if ($post_image['status']) {
                            $row['post_photo'] = $post_image['photo'];
                        }
//                        $row['time'] = $this->convert_time_zone($row['time'], $timezone);
                        $row['sender_id'] = $encrypt->safe_b64encode($row['sender_id']);
                        $arrFetch['post'][] = $row;
                    }
                    $arrFetch['status'] = TRUE;
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

    public function loadPostImage($postId) {
        $arrFetch = array();
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        //$count = 0;
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "SELECT original,thumbnail100 as thumbnail FROM `post_image` WHERE `post_id` =$postId";
            if ($result = $mysql->query($sql)) {
                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        $arrFetch['photo'][] = $row;
                    }
                    $arrFetch['status'] = TRUE;
                } else {
                    $arrFetch['status'] = FALSE;
                }
                $result->free();
            }
        }
        $mysql->close();
        return $arrFetch;
    }

    public function getCommentCountFor($postId) {
        $arrFetch = array();
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        //$count = 0;
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "SELECT count(`id`) as count FROM `comments` WHERE `post_id` =$postId AND `deleteStatus`=0";
            if ($result = $mysql->query($sql)) {
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $arrFetch['count'] = $row['count'];
                    $arrFetch['status'] = TRUE;
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

    public function loadComment($postId) {
        $arrFetch = array();
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        //$count = 0;
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $encrypt = new Encryption();
            $sql = "SELECT c.`id`, c.`comment`, c.`post_id`, c.`sender_id`,u.firstname,u.lastname, c.`time`, c.`status` FROM `comments` as c JOIN user_personal_info as u ON c.`sender_id`=u.id WHERE c.`post_id`=$postId AND c.`deleteStatus`=0 order by c.id ASC";
            if ($result = $mysql->query($sql)) {
                if ($result->num_rows > 0) {
                    while ($row = $result->fetch_assoc()) {
                        $row['comment'] = nl2br($row['comment']);
                        include_once './GossoutUser.php';
                        $user = new GossoutUser($row['sender_id']);
                        $pix = $user->getProfilePix();
                        if ($pix['status']) {
                            $row['photo'] = $pix['pix'];
                        } else {
                            $row['photo'] = array("nophoto" => TRUE, "alt" => $pix['alt']);
                        }
                        $row['sender_id'] = $encrypt->safe_b64encode($row['sender_id']);
                        $arrFetch['comment'][] = $row;
                    }
                    $arrFetch['status'] = TRUE;
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

    public function comment($pid, $uid, $comment) {
        $arrFetch = array();
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "INSERT INTO comments(comment,post_id,sender_id) VALUES('$comment','$pid','$uid')";
            if ($mysql->query($sql)) {
                if ($mysql->affected_rows > 0) {
                    $arrFetch['comment']['id'] = $mysql->insert_id;
                    include_once './GossoutUser.php';
                    $user = new GossoutUser($uid);
                    $user->getProfile();
                    $arrFetch['comment']['name'] = $user->getFullname();
                    $pix = $user->getProfilePix();
                    if ($pix['status']) {
                        $arrFetch['comment']['photo'] = $pix['pix'];
                    } else {
                        $arrFetch['comment']['photo'] = array("nophoto" => TRUE, "alt" => $pix['alt']);
                    }
                    $result = $mysql->query("SELECT NOW() as time");
                    $row = $result->fetch_assoc();
                    $result->free();
                    $arrFetch['comment']['time'] = $row['time'];
                } else {
                    $arrFetch['comment']['id'] = 0;
                }
                $arrFetch['status'] = TRUE;
            } else {
                $arrFetch['status'] = FALSE;
            }
        }
        $mysql->close();
        return $arrFetch;
    }

    public function getUserId() {
        return $this->uid;
    }

    public function getCommunityId() {
        $this->comId;
    }

    public function setUserId($newUid) {
        $this->uid = $newUid;
    }

    public function setCommunity($newComId) {
        $this->comId = $newComId;
    }

    public function setPostId($newPost) {
        $this->postId = $newPost;
    }

    public function deletePost() {
        $arrFetch = array();
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "UPDATE post SET `deleteStatus`=1 WHERE id=$this->postId AND sender_id=$this->uid";
            if ($mysql->query($sql)) {
                if ($mysql->affected_rows > 0) {
                    $arrFetch['status'] = TRUE;
                } else {
                    $arrFetch['status'] = FALSE;
                }
            } else {
                $arrFetch['status'] = FALSE;
            }
        }
        $mysql->close();
        return $arrFetch;
    }
    public function deleteComment($cid) {
        $arrFetch = array();
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "UPDATE comments SET `deleteStatus`=1 WHERE id=$cid AND sender_id=$this->uid";
            if ($mysql->query($sql)) {
                if ($mysql->affected_rows > 0) {
                    $arrFetch['status'] = TRUE;
                } else {
                    $arrFetch['status'] = FALSE;
                }
            } else {
                $arrFetch['status'] = FALSE;
            }
        }
        $mysql->close();
        return $arrFetch;
    }

    private function convert_time_zone($timeFromDatabase, $userOffset) {
        $userTime = new DateTime($timeFromDatabase, new DateTimeZone('UTC'));
        $userTime->setTimezone(new DateTimeZone($userOffset));
        return $userTime->format('Y-m-d H:i:s');
        // or return $userTime; // if you want to return a DateTime object.
    }

}

?>
