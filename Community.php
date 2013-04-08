<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
require_once 'Config.php';

/**
 * Description of Community
 *
 * @author user
 */
class Community {

    var $uid;
    var $id;

    public function __construct() {
        
    }

    function create() {
        throw new Exception("Method not supported");
    }

    /**
     * @param int $userId This is the user's unique ID
     * @param int $start This specifies where the query starts from for pagination
     * @param int $limit This specifies the end of the result for pagination
     * @return Array An associative array is returned with the information for the user's community
     * 
     */
    public function userComm($start, $limit, $max = FALSE, $comname = FALSE) {
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        $arr = array();
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            if ($max) {
                if ($comname) {
                    $sql = "SELECT id,unique_name,`name`,`pix`,`type`,description FROM community WHERE unique_name='$comname'";
                } else {
                    $sql = "SELECT cs.`community_id` as id,c.unique_name,c.`name`,c.`pix`,c.`type`,c.description FROM community_subscribers as cs JOIN community as c ON cs.community_id=c.id  WHERE cs.`user`=$this->uid order by c.name asc LIMIT $start,$limit";
                }
            } else {
                if ($comname) {
                    $sql = "SELECT id,unique_name,`name` FROM community WHERE unique_name='$comname'";
                } else {
                    $sql = "SELECT cs.`community_id` as id,c.unique_name,c.`name` FROM community_subscribers as cs JOIN community as c ON cs.community_id=c.id  WHERE cs.`user`=$this->uid order by c.name asc LIMIT $start,$limit";
                }
            }
            if ($result = $mysql->query($sql)) {
                if ($result->num_rows > 0) {
                    $comInfo = new Community();
                    while ($row = $result->fetch_assoc()) {
                        $this->setCommunityId($row['id']);
                        $row['name'] = $this->toSentenceCase($row['name']);
                        $isAm = $this->isAmember($this->uid);
                        if ($isAm['status']) {
                            $row['isAmember'] = "true";
                        } else {
                            $row['isAmember'] = "false";
                        }
                        if ($max) {
                            $comInfo->setCommunityId($row['id']);
                            $mem_count = $comInfo->getMemberCount();
                            if ($mem_count['status']) {
                                $row['mem_count'] = $mem_count['count'];
                            } else {
                                $row['mem_count'] = 0;
                            }
                            $post_count = $comInfo->getPostCount();
                            if ($post_count['status']) {
                                $row['post_count'] = $post_count['count'];
                            } else {
                                $row['post_count'] = 0;
                            }
                        }

                        $arr['community_list'][] = $row;
                    }
                    $arr['status'] = true;
                } else {
                    $arr['status'] = false;
                }
                $result->free();
            } else {
                $arr['status'] = false;
            }
        }
        $mysql->close();
        return $arr;
    }

    public function isAmember($uid) {
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        $arr = array();
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "SELECT * FROM community_subscribers WHERE `user`=$uid AND community_id=$this->id";
            if ($result = $mysql->query($sql)) {
                if ($result->num_rows > 0) {
                    $arr['status'] = TRUE;
                } else {
                    $arr['status'] = FALSE;
                }
                $result->free();
            } else {
                $arr['status'] = FALSE;
            }
        }
        $mysql->close();
        return $arr;
    }

    public function userCommunityCount() {
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        $arr = array();
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "SELECT count(cs.`community_id`) as count FROM `community_subscribers` as cs WHERE cs.`user`=$this->uid";
            if ($result = $mysql->query($sql)) {
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $arr['com_count'] = $row;
                    $arr['status'] = true;
                } else {
                    $arr['status'] = false;
                }
                $result->free();
            } else {
                $arr['status'] = false;
            }
        }
        $mysql->close();
        return $arr;
    }

    /**
     * 
     * @param int start start position for pagination purpose
     * @param int limit limit of result fetch
     * @return Array An array with keys <strong>status</strong> and <strong>com_mem</strong> is returned. <strong>com_mem</strong> contains array of community members with the following keys: id, firstname, lastname, location, and gender while <strong>status</strong> holds the success status of the result i.e FALSE or TRUE
     * @throws Exception 
     */
    public function getMembers($com,$start, $limit) {
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        $arr = array();
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "SELECT cs.user as id,username,p.firstname, p.lastname,p.location,p.gender FROM community_subscribers AS cs JOIN user_personal_info as p ON p.id=cs.`user` JOIN community as c ON cs.community_id=c.id WHERE cs.community_id='$com' OR c.unique_name='$com' order by p.firstname LIMIT $start,$limit";
            if ($result = $mysql->query($sql)) {
                if ($result->num_rows > 0) {
                    include_once './GossoutUser.php';
                    $user = new GossoutUser(0);
                    while ($row = $result->fetch_assoc()) {
                        $user->setUserId($row['id']);
                        $pix = $user->getProfilePix();
                        if ($pix['status']) {
                            $row['photo'] = $pix['pix'];
                        } else {
                            $row['photo'] = array("nophoto" => TRUE, "alt" => $pix['alt']);
                        }
                        $arr['com_mem'][] = $row;
                    }
                    $arr['status'] = true;
                } else {
                    $arr['status'] = false;
                }
                $result->free();
            } else {
                $arr['status'] = false;
            }
        }
        $mysql->close();
        return $arr;
    }

    public function getMemberCount() {
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        $arr = array();
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "SELECT count(user) as count FROM community_subscribers WHERE community_id=$this->id";
            if ($result = $mysql->query($sql)) {
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $arr['count'] = $row['count'];
                    $arr['status'] = TRUE;
                } else {
                    $arr['status'] = FALSE;
                }
                $result->free();
            } else {
                $arr['status'] = FALSE;
            }
        }
        $mysql->close();
        return $arr;
    }

    public function getPostCount() {
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        $arr = array();
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "SELECT count(`id`) as count from post where community_id=$this->id";
            if ($result = $mysql->query($sql)) {
                if ($result->num_rows > 0) {
                    $row = $result->fetch_assoc();
                    $arr['count'] = $row['count'];
                    $arr['status'] = TRUE;
                } else {
                    $arr['status'] = FALSE;
                }
                $result->free();
            } else {
                $arr['status'] = FALSE;
            }
        }
        $mysql->close();
        return $arr;
    }

    /**
     * 
     * @param int newUid This id identifies the user to query
     */
    public function setUser($newUid) {
        $this->uid = $newUid;
    }

    /**
     * 
     * @return int The current user defined for this community object
     */
    public function getUser() {
        return $this->uid;
    }

    /**
     * 
     * @param int newId switch the current community id to newId
     */
    public function setCommunityId($newId) {
        $this->id = $newId;
    }

    public function suggest() {
        $response = array();
        $arr = array();
        include_once './GossoutUser.php';
        $user = new GossoutUser($this->getUser());
        $userF = $user->getFriends(0, 1000);
        if ($userF['status']) {
            $com = new Community();
            foreach ($userF['friends'] as $friend) {
                $com->setUser($friend['id']);
                $userComm = $com->userComm(0, 1000, TRUE);
                if ($userComm['status'])
                    foreach ($userComm['community_list'] as $mem) {
                        if ($mem['type'] != "Private") {
                            $mem['isAmember'] = "false";
                            $arr[$mem['id']] = $mem;
                        }
                    }
            }
            if (count($arr) > 0) {
                $response['status'] = TRUE;
            } else {
                $response['status'] = FALSE;
            }
        } else {
            $response['status'] = FALSE;
        }
        if ($response['status']) {
            $myComm = $this->userComm(0, 1000, TRUE);
            if ($myComm['status']) {
                foreach ($myComm['community_list'] as $item) {
                    if (array_key_exists($item['id'], $arr)) {
                        unset($arr[$item['id']]);
                    }
                }
            }
            if (count($arr) == 0) {
                $response['status'] = FALSE;
            } else {
                $response['suggest'] = array_values($arr);
                shuffle($response['suggest']);
            }
        } else {
            $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
            $arr = array();
            if ($mysql->connect_errno > 0) {
                throw new Exception("Connection to server failed!");
            } else {
                $sql = "SELECT id,unique_name,`name`,category,`type`,description,pix FROM community WHERE `type`='Public'";
                if ($result = $mysql->query($sql)) {
                    if ($result->num_rows > 0) {
                        while ($row = $result->fetch_assoc()) {
                            $arr[$row['id']] = $row;
                        }
                        $response['status'] = TRUE;
                    } else {
                        $response['status'] = FALSE;
                    }
                } else {
                    $response['status'] = FALSE;
                }
            }
            if ($response['status']) {
                $myComm = $this->userComm(0, 1000);
                if ($myComm['status']) {
                    foreach ($myComm['community_list'] as $item) {
                        if (array_key_exists($item['id'], $arr)) {
                            unset($arr[$item['id']]);
                        }
                    }
                }
                if (count($arr) == 0) {
                    $response['status'] = FALSE;
                } else {
                    $response['suggest'] = array_values($arr);
                    shuffle($response['suggest']);
                }
            }
        }
        return $response;
    }

    public function toSentenceCase($str) {
        $arr = explode(' ', $str);
        $exp = array();
        foreach ($arr as $x) {
            if (strtolower($x) == "of") {
                $exp[] = strtolower($x);
            } else {
                if (strlen($x) > 0) {
                    $exp[] = strtoupper($x[0]) . substr($x, 1);
                } else {
                    $exp[] = strtoupper($x);
                }
            }
        }
        return implode(' ', $exp);
    }

    public function updateDescription($commId) {
        throw new Exception("Method not supported");
    }

    public function updateName($commName) {
        throw new Exception("Method not supported");
    }

    public function addMember($commId) {
        throw new Exception("Method not supported");
    }

    public function leave() {
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        $arr = array();
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "DELETE FROM community_subscribers WHERE `user`=$this->uid AND community_id=$this->id";
            if ($mysql->query($sql)) {
                $arr['status'] = TRUE;
            } else {
                $arr['status'] = FALSE;
            }
        }
        $mysql->close();
        return $arr;
    }
    public function join() {
        $mysql = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE_NAME);
        $arr = array();
        if ($mysql->connect_errno > 0) {
            throw new Exception("Connection to server failed!");
        } else {
            $sql = "INSERT INTO community_subscribers(`user`,community_id) VALUES($this->uid,$this->id)";
            if ($mysql->query($sql)) {
                $arr['status'] = TRUE;
            } else {
                $arr['status'] = FALSE;
            }
        }
        $mysql->close();
        return $arr;
    }

}

?>
