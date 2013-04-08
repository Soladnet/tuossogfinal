<?php

include_once './Config.php';

/**
 * Description of Post
 *
 * @author user
 */
class Post {

    var $uid, $comId;

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

    public function post($comid, $uid, $post) {
        $arrFetch = array();
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "INSERT INTO post(post,community_id,sender_id) VALUES('$post','$comid','$uid')";
            if ($mysql->query($sql)) {
                if ($mysql->affected_rows > 0) {
                    $arrFetch['post']['id'] = $mysql->insert_id;
                    include_once './GossoutUser.php';
                    $user = new GossoutUser($uid);
                    $user->getProfile();
                    $arrFetch['post']['name'] = $user->getFullname();
                    $pix = $user->getProfilePix();
                    if ($pix['status']) {
                        $arrFetch['post']['photo'] = $pix['pix'];
                    } else {
                        $arrFetch['post']['photo'] = array("nophoto" => TRUE, "alt" => $pix['alt']);
                    }
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

    public function postImage($post_id, $community_id, $sender_id, $original, $thumbnail100) {
        $arrFetch = array();
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "INSERT INTO post_image(post_id,community_id,sender_id,original,thumbnail100) VALUES('$post_id','$community_id','$sender_id','$original','$thumbnail100')";
            if ($mysql->query($sql)) {
                $arrFetch['status'] = TRUE;
            } else {
                $arrFetch['status'] = FALSE;
            }
        }
        $mysql->close();
        return $arrFetch;
    }

    public function loadPost() {
        $arrFetch = array();
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        //$count = 0;
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
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
                        if($post_image['status']){
                            $row['post_photo'] = $post_image['photo'];
                        }
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
                }else{
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
            $sql = "SELECT count(`id`) as count FROM `comments` WHERE `post_id` =$postId";
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
            $sql = "SELECT c.`id`, c.`comment`, c.`post_id`, c.`sender_id`,u.firstname,u.lastname, c.`time`, c.`status`, c.`deleteStatus` FROM `comments` as c JOIN user_personal_info as u ON c.`sender_id`=u.id WHERE `post_id`=$postId order by c.id ASC";
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

}

?>
