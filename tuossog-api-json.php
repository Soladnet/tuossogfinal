<?php

//echo strtolower($_SERVER['REQUEST_METHOD']);  
if (isset($_POST['param'])) {
    if ($_POST['param'] == "user") {
        include_once './GossoutUser.php';
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);

            if (is_numeric($id)) {
                $user = new GossoutUser($id);
                $profile = $user->getProfile();
                if ($profile['status']) {
                    header('Content-type: application/json');
                    echo json_encode($profile['user']);
                } else {
                    displayError(404, "Not Found");
                }
            } else {
                displayError(400, "The request cannot be fulfilled due to bad syntax");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "friends") {
        include_once './GossoutUser.php';
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);
            if (is_numeric($id)) {
                $user = new GossoutUser($id);
                $start = 0;
                $limit = 10;
                $status = "Y";
                if (isset($_POST['start']) && is_numeric($_POST['start'])) {
                    $start = $_POST['start'];
                }
                if (isset($_POST['limit']) && is_numeric($_POST['limit'])) {
                    $limit = $_POST['limit'];
                }
                if (isset($_POST['status'])) {
                    $status = $_POST['status'] == "N" ? "N" : "Y";
                }

                $friends = $user->getFriends($start, $limit, $status);
                if ($friends['status']) {
                    header('Content-type: application/json');
                    echo json_encode($friends['friends']);
                } else {
                    displayError(404, "Not Found");
                }
            } else {
                displayError(400, "The request cannot be fulfilled due to bad syntax");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "community") {
        include_once './Community.php';
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);
            if (is_numeric($id)) {
                $comm = new Community();
                $comm->setUser($id);
                $start = 0;
                $limit = 10;

                if (isset($_POST['start']) && is_numeric($_POST['start'])) {
                    $start = $_POST['start'];
                }
                if (isset($_POST['limit']) && is_numeric($_POST['limit'])) {
                    $limit = $_POST['limit'];
                }

                $user_comm = $comm->userComm($start, $limit, $_POST['max'], $_POST['comname'] == "" ? FALSE : $_POST['comname']);
                if ($user_comm['status']) {
                    header('Content-type: application/json');
                    echo json_encode($user_comm['community_list']);
                } else {
                    displayError(404, "Not Found");
                }
            } else {
                displayError(400, "The request cannot be fulfilled due to bad syntax");
            }
        } else if (isset($_POST['m'])) {
            $comm = new Community();

            $start = 0;
            $limit = 12;

            if (isset($_POST['start']) && is_numeric($_POST['start'])) {
                $start = $_POST['start'];
            }
            if (isset($_POST['limit']) && is_numeric($_POST['limit'])) {
                $limit = $_POST['limit'];
            }

            $com_mem = $comm->getMembers(clean($_POST['m']),$start, $limit);
            if ($com_mem['status']) {
                header('Content-type: application/json');
                echo json_encode($com_mem['com_mem']);
            } else {
                displayError(404, "Not Found");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "messages") {
        include_once './GossoutUser.php';
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);
            if (is_numeric($id)) {
                $msg = new GossoutUser($id);
                $msg->getProfile();
                $start = 0;
                $limit = 10;
                $timestamp = "";
                $status = "";
                if (isset($_POST['start']) && is_numeric($_POST['start'])) {
                    $start = $_POST['start'];
                }
                if (isset($_POST['limit']) && is_numeric($_POST['limit'])) {
                    $limit = $_POST['limit'];
                }
                if (isset($_POST['status'])) {
                    $status = $_POST['status'] == "" ? "" : "AND status='" . clean($_POST['status']) . "'";
                }
                if (isset($_POST['timestamp'])) {
                    if (trim($_POST['timestamp']) != "") {
                        $timestamp = clean(decodeText($_POST['timestamp']));
                        $status .= $status == "" ? "AND `time`>$timestamp" : " AND `time`>'$timestamp'";
                    }
                }
                $print_status = trim(clean($_POST['cw'])) == "" ? TRUE : FALSE;
                $user_msg = trim(clean($_POST['cw'])) == "" ? $msg->getMessages($start, $limit, $status) : $msg->getConversation($msg->getScreenName(), trim(clean($_POST['cw'])));
                setcookie("m_t", encodeText($user_msg['m_t']));
                if ($user_msg['status']) {
                    include_once("./sortArray_$.php");
                    if ($print_status) {
                        $SMA = new SortMultiArray($user_msg['message'], "time", 1);
                        $SortedArray = $SMA->GetSortedArray($start, $limit);
                        header('Content-type: application/json');
                        echo json_encode($SortedArray);
                    } else {
                        $SMA = new SortMultiArray($user_msg['message']['conversation'], "time", 1);
                        $user_msg['message']['conversation'] = $SMA->GetSortedArray($start, $limit);
                        header('Content-type: application/json');
                        echo json_encode($user_msg['message']);
                    }
                } else {
                    displayError(404, "Not Found");
                }
            } else {
                displayError(400, "The request cannot be fulfilled due to bad syntax");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "gossbag") {
        include_once './GossoutUser.php';
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);
            if (is_numeric($id)) {
                $bag = new GossoutUser($id);
                $start = 0;
                $limit = 10;
                if (isset($_POST['start']) && is_numeric($_POST['start'])) {
                    $start = $_POST['start'];
                }
                if (isset($_POST['limit']) && is_numeric($_POST['limit'])) {
                    $limit = $_POST['limit'];
                }

                $user_bag = $bag->getGossbag();
                if ($user_bag['status']) {
                    include_once("./sortArray_$.php");
                    $SMA = new SortMultiArray($user_bag['bag'], "time", 1);
                    $SortedArray = $SMA->GetSortedArray($start, $limit);
                    header('Content-type: application/json');
                    echo json_encode($SortedArray);
                } else {
                    displayError(404, "Not Found");
                }
            } else {
                displayError(400, "The request cannot be fulfilled due to bad syntax");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "notifSum") {
        include_once './GossoutUser.php';
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);
            if (is_numeric($id)) {
                $bag = new GossoutUser($id);

                $user_notif = $bag->getNotificationSummary();
                header('Content-type: application/json');
                echo json_encode($user_notif);
            } else {
                displayError(400, "The request cannot be fulfilled due to bad syntax");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "search") {
        include_once './Search.php';
        $search = new Search();
        if (isset($_POST['a'])) {
            $start = 0;
            $limit = 10;
            $opt = "both";
            $term = clean($_POST['a']);
            if (isset($_POST['start']) && is_numeric($_POST['start'])) {
                $start = $_POST['start'];
            }
            if (isset($_POST['limit']) && is_numeric($_POST['limit'])) {
                $limit = $_POST['limit'];
            }
            if (isset($_POST['opt'])) {
                $opt = $_POST['opt'];
            }

            $response = $search->search($term, $start, $limit, $opt);
            if ($response['status']) {
                header('Content-type: application/json');
                echo json_encode($response);
            } else {
                displayError(404, "Not Found");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "sugfriend") {
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);
            include_once './GossoutUser.php';
            $limit = 3;
            if (is_numeric($id)) {
                $user = new GossoutUser($id);
                $sug = $user->suggestFriend();
                if (isset($_POST['limit']) && is_numeric($_POST['limit'])) {
                    $limit = $_POST['limit'];
                }
                if ($sug['status']) {
                    header('Content-type: application/json');
                    echo json_encode(array_slice($sug['suggest'], (count($sug['suggest']) - $limit)));
                } else {
                    displayError(404, "Not Found");
                }
            } else {
                displayError(400, "The request cannot be fulfilled due to bad syntax");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "sugcomm") {
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);
            include_once './Community.php';
            $limit = 5;
            if (is_numeric($id)) {
                $com = new Community();
                $com->setUser($id);
                $sug = $com->suggest();
                if (isset($_POST['limit']) && is_numeric($_POST['limit'])) {
                    $limit = $_POST['limit'];
                }
                if ($sug['status']) {
                    header('Content-type: application/json');
                    echo json_encode(array_slice($sug['suggest'], (count($sug['suggest']) - $limit)));
                } else {
                    displayError(404, "Not Found");
                }
            } else {
                displayError(400, "The request cannot be fulfilled due to bad syntax");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "logError") {
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);
            if (is_numeric($id)) {
                $data = $_POST;
                $htmlHead = "<html><body>";
                $htmlHead .= "User id: $data[uid]<br/>";
                $htmlHead .= "errorThrown: $data[errorThrown]<br/>";
                $htmlHead .= "readyState: $data[readyState]<br/>";
                $htmlHead .= "statusCode: $data[statusCode]<br/>";
                $htmlHead .= "statusText: $data[statusText]<br/>";
                $htmlHead .= "textStatus: $data[textStatus]<br/>";
                $htmlHead .= "Message <br/>";
                $htmlHead .= "$data[responseText]";
                $htmlHead .= "</body></html>";

                @mail("Soladnet Team<soladnet@gmail.com>,Soladnet Team<ola@gossout.com>", "Error log: $data[errorThrown]", $htmlHead);
                header('Content-type: application/json');
                echo json_encode($data);
            } else {
                displayError(400, "The request cannot be fulfilled due to bad syntax");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "loadPost") {
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);
            if (is_numeric($id) && is_numeric($_POST['cid'])) {
                include_once './Post.php';
                $post = new Post();
                $post->setCommunity(clean($_POST['cid']));
                $load = $post->loadPost();
                if ($load['status']) {
                    header('Content-type: application/json');
                    echo json_encode($load['post']);
                } else {
                    displayError(404, "Not Found");
                }
            } else {
                displayError(400, "The request cannot be fulfilled due to bad syntax");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "loadComment") {
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);
            if (is_numeric($id) && is_numeric($_POST['pid'])) {
                include_once './Post.php';
                $post = new Post();
                $load = $post->loadComment(clean($_POST['pid']));
                if ($load['status']) {
                    header('Content-type: application/json');
                    echo json_encode($load['comment']);
                } else {
                    displayError(404, "Not Found");
                }
            } else {
                displayError(400, "The request cannot be fulfilled due to bad syntax");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "comment") {
        if (isset($_POST['uid']) && isset($_GET['pid'])) {
            $id = decodeText($_POST['uid']);
            if (is_numeric($id) && is_numeric($_GET['pid']) && trim($_POST['comment']) != "") {
                include_once './Post.php';
                $post = new Post();
                $load = $post->comment($_GET['pid'], $id, clean($_POST['comment']));
                if ($load['status']) {
                    header('Content-type: application/json');
                    echo json_encode($load['comment']);
                } else {
                    displayError(404, "Not Found");
                }
            } else {
                displayError(400, "The request cannot be fulfilled due to bad syntax");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "post") {
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);
            if (is_numeric($id) && trim($_POST['post']) != "") {
                include_once './Post.php';
                $post = new Post();
                if (isset($_FILES['photo'])) {
                    $allowedExts = array("jpeg", "jpg", "png", "JPEG", "JPG", "PNG");
                    $status = FALSE;
                    $err = "";
                    foreach ($_FILES as $file) {
                        foreach ($file['name'] as $name) {
                            $arr = explode(".", $name);
                            $ext = end($arr);
                            if (in_array($ext, $allowedExts)) {
                                $status = TRUE;
                            } else {
                                $err = "Image must be of either the following extention .jpg, .jpeg, or .png";
                                $status = FALSE;
                                break;
                            }
                        }
                        if ($status) {
                            foreach ($file['type'] as $type) {
                                if ((($type == "image/jpeg") || ($type == "image/jpg") || ($type == "image/png"))) {
                                    $status = TRUE;
                                } else {
                                    $status = FALSE;
                                    $err = "Image must be of either the following type .jpg, .jpeg, and .png";
                                    break;
                                }
                            }
                        } else {
                            break;
                        }

                        if ($status) {
                            foreach ($file['size'] as $size) {
                                if ($size <= 2048000) {
                                    $status = TRUE;
                                } else {
                                    $status = FALSE;
                                    $err = "Image must be less than or equals 2MB";
                                    break;
                                }
                            }
                        } else {
                            break;
                        }
                    }
                    if ($status) {
                        $load = $post->post($_POST['comid'], $id, clean($_POST['post']));
                        if ($load['status']) {
                            include_once './SimpleImage.php';
                            foreach ($_FILES as $file) {
                                $i = 0;
                                foreach ($file['tmp_name'] as $temp) {
                                    $arr = explode(".", $file['name'][$i]);
                                    $ext = end($arr);
                                    $original = "upload/images/community/" . time() . "-" . $_POST['comid'] . "-" . $i . ".$ext";
                                    $thumbnail100 = "upload/images/community/" . time() . "-" . $_POST['comid'] . "-" . $i . "_thumb.$ext";
                                    $load['post']['post_photo'][] = array("original" => $original, "thumbnail" => $thumbnail100);
                                    $image = new SimpleImage();
                                    $image->load($temp);
                                    $image->resizeToHeight(100);
                                    $image->save($thumbnail100);
                                    move_uploaded_file($temp, $original);
                                    $imagePost = $post->postImage($load['post']['id'], $_POST['comid'], $id, $original, $thumbnail100);
                                    $i++;
                                }
                            }
                        }
                    } else {
                        displayError(400, $err);
                        exit;
                    }
                } else {
                    $load = $post->post($_POST['comid'], $id, clean($_POST['post']));
                }
                if ($load['status']) {
                    header('Content-type: application/json');
                    echo json_encode($load['post']);
                } else {
                    displayError(404, "Not Found");
                }
            } else {
                displayError(400, "The request cannot be fulfilled due to bad syntax");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "Send Message") {
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);
            if (is_numeric($id)) {
                $msg = $_POST['message'];
                $user = $_POST['user'];
                include_once './GossoutUser.php';
                $gUser = new GossoutUser(0);
                $response = array();
                if (is_array($user)) {
                    foreach ($user as $receiverId) {
                        if (is_numeric($receiverId)) {
                            $gUser->setUserId($receiverId);
                            $res = $gUser->sendMessage($id, clean(htmlentities($msg)));
                            if ($res['status']) {
                                header('Content-type: application/json');
                                echo json_encode($res['response']);
                            } else {
                                $response['status'] = FALSE;
                            }
                        } else {
                            $response['status'] = FALSE;
                        }
                    }
                    header('Content-type: application/json');
                    echo json_encode($response);
                } else {
                    $gUser->setScreenName($user);
                    $rid = $gUser->getId();
                    if ($rid != "") {
                        $gUser->setUserId($rid);
                        $res = $gUser->sendMessage($id, clean(htmlentities($msg)));
                        if ($res['status']) {
                            header('Content-type: application/json');
                            echo json_encode($res['response']);
                        } else {
                            $response['status'] = FALSE;
                        }
                    } else {
                        displayError(400, "Sorry you are not logged in");
                    }
                }
            } else {
                displayError(400, "Sorry you are not logged in");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "Leave" || $_POST['param'] == "Join") {
        if (isset($_POST['uid']) && isset($_POST['comid'])) {
            $id = decodeText($_POST['uid']);
            if (is_numeric($id) && is_numeric($_POST['comid'])) {
                include_once './Community.php';
                $com = new Community();
                $com->setCommunityId($_POST['comid']);
                $com->setUser($id);
                if ($_POST['param'] == "Leave") {
                    $response = $com->leave();
                } else if ($_POST['param'] == "Join") {
                    $response = $com->join();
                } else {
                    displayError(400, "The request cannot be fulfilled due to bad syntax");
                    exit;
                }

                header('Content-type: application/json');
                if ($response['status']) {
                    echo json_encode(array(TRUE));
                } else {
                    echo json_encode(array(FALSE));
                }
            } else {
                displayError(400, "The request cannot be fulfilled due to bad syntax");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else {
        displayError(400, "The request cannot be fulfilled due to bad syntax");
    }
} else {
    displayError(400, "The request cannot be fulfilled due to bad syntax");
}

function displayError($code, $meesage) {
    $response_arr = array();
    $response_arr['error']['code'] = $code;
    $response_arr['error']['message'] = $meesage;
    header('Content-type: application/json');
    echo json_encode($response_arr);
}

function decodeText($param) {
    include_once './encryptionClass.php';
    $encrypt = new Encryption();
    return $encrypt->safe_b64decode($param);
}

function encodeText($param) {
    include_once './encryptionClass.php';
    $encrypt = new Encryption();
    return $encrypt->safe_b64decode($param);
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