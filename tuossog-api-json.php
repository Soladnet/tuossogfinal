<?php

session_start();
header('Content-type: text/html');
if (isset($_POST['param'])) {
    if ($_POST['param'] == "user") {
        include_once './GossoutUser.php';
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);

            if (is_numeric($id)) {
                $user = new GossoutUser($id);
                if (isset($_COOKIE['tz'])) {
                    $tz = decodeText($_COOKIE['tz']);
                } else if (isset($_SESSION['auth']['tz'])) {
                    $tz = decodeText($_SESSION['auth']['tz']);
                } else {
                    $tz = "Africa/Lagos";
                }
                $user->setTimezone($tz);
                $profile = $user->getProfile();
                if ($profile['status']) {
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
                if (isset($_COOKIE['tz'])) {
                    $tz = decodeText($_COOKIE['tz']);
                } else if (isset($_SESSION['auth']['tz'])) {
                    $tz = decodeText($_SESSION['auth']['tz']);
                } else {
                    $tz = "Africa/Lagos";
                }
                $user->setTimezone($tz);
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
                    echo json_encode($user_comm['community_list']);
                } else {
                    displayError(404, "Not Found");
                }
            } else {
                displayError(400, "The request cannot be fulfilled due to bad syntax");
            }
        } else if (isset($_POST['m']) && isset($_POST['user'])) {
            $comm = new Community();
            $start = 0;
            $limit = 12;

            if (isset($_POST['start']) && is_numeric($_POST['start'])) {
                $start = $_POST['start'];
            }
            if (isset($_POST['limit']) && is_numeric($_POST['limit'])) {
                $limit = $_POST['limit'];
            }
            $id = decodeText($_POST['user']);
            if (is_numeric($id)) {
                $com_mem = $comm->getMembers(clean($_POST['m']), $id, $start, $limit);
            } else {
                $com_mem = $comm->getMembers(clean($_POST['m']), "", $start, $limit);
            }
            if ($com_mem['status']) {
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
                if (isset($_COOKIE['tz'])) {
                    $tz = decodeText($_COOKIE['tz']);
                } else if (isset($_SESSION['auth']['tz'])) {
                    $tz = decodeText($_SESSION['auth']['tz']);
                } else {
                    $tz = "Africa/Lagos";
                }
                $msg->setTimezone($tz);
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
                        echo json_encode($SortedArray);
                    } else {
                        if (isset($user_msg['message']['conversation'])) {
                            $SMA = new SortMultiArray($user_msg['message']['conversation'], "time", 1);
                            $user_msg['message']['conversation'] = $SMA->GetSortedArray($start, $limit);
                        }
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
                if (isset($_COOKIE['tz'])) {
                    $tz = decodeText($_COOKIE['tz']);
                } else if (isset($_SESSION['auth']['tz'])) {
                    $tz = decodeText($_SESSION['auth']['tz']);
                } else {
                    $tz = "Africa/Lagos";
                }
                $bag->setTimezone($tz);
                $start = 0;
                $limit = 3;
                if (isset($_POST['start']) && is_numeric($_POST['start'])) {
                    $start = $_POST['start'];
                }
                if (isset($_POST['limit']) && is_numeric($_POST['limit'])) {
                    $limit = $_POST['limit'];
                }
                $user_bag = $bag->getGossbag(TRUE);
                if ($user_bag['status']) {
                    include_once("./sortArray_$.php");
                    $SMA = new SortMultiArray($user_bag['bag'], "time", 1);
                    $SortedArray = $SMA->GetSortedArray($start, $limit);
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
    } else if ($_POST['param'] == "timeline") {
        include_once './GossoutUser.php';
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);
            if (is_numeric($id)) {
                $timeline = new GossoutUser($id);
                if (isset($_COOKIE['tz'])) {
                    $tz = decodeText($_COOKIE['tz']);
                } else if (isset($_SESSION['auth']['tz'])) {
                    $tz = decodeText($_SESSION['auth']['tz']);
                } else {
                    $tz = "Africa/Lagos";
                }
                $timeline->setTimezone($tz);
                $start = 0;
                $limit = 10;
                if (isset($_POST['start']) && is_numeric($_POST['start'])) {
                    $start = $_POST['start'];
                }
                if (isset($_POST['limit']) && is_numeric($_POST['limit'])) {
                    $limit = $_POST['limit'];
                }
                $user_timeline = $timeline->getTimeline();
                if ($user_timeline['status']) {
                    include_once("./sortArray_$.php");
                    $SMA = new SortMultiArray($user_timeline['timeline'], "time", 1);
                    $SortedArray = $SMA->GetSortedArray($start, $limit);
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
    } else if ($_POST['param'] == "inviteFriends" || $_POST['param'] == "Send Invitation") {
        include_once './Community.php';
        if (isset($_POST['uid']) && isset($_POST['comid'])) {
            $id = decodeText($_POST['uid']);
            if (is_numeric($id) && is_numeric($_POST['comid'])) {
                $com = new Community();
                $com->setUser($id);
                $com->setCommunityId($_POST['comid']);
                if ($_POST['param'] == "Send Invitation") {
                    if (is_array($_POST['user'])) {
                        $valTex = "";
                        foreach ($_POST['user'] as $uid) {
                            if (is_numeric(decodeText($uid))) {
                                if ($valTex != "") {
                                    $valTex .=",";
                                }
                                $valTex .= "($id," . decodeText($uid) . ",$_POST[comid])";
                            }
                        }
                        $response = $com->sendInvitation($valTex);
                    } else {
                        displayError(404, "Not Found");
                    }
                } else {
                    if (isset($_POST['response'])) {
                        $response = $com->respondToInvitation();
                        if ($_POST['response'] == "true") {
                            $response = $com->join();
                        }
                    } else {
                        $response = $com->inviteFriends();
                    }
                }
                if ($response['status']) {
                    if ($_POST['param'] == "Send Invitation" || isset($_POST['response'])) {
                        echo json_encode($response);
                    } else {
                        echo json_encode($response['friends']);
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
    } else if ($_POST['param'] == "notifSum") {
        include_once './GossoutUser.php';
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);
            if (is_numeric($id)) {
                $bag = new GossoutUser($id);
                if (isset($_COOKIE['tz'])) {
                    $tz = decodeText($_COOKIE['tz']);
                } else if (isset($_SESSION['auth']['tz'])) {
                    $tz = decodeText($_SESSION['auth']['tz']);
                } else {
                    $tz = "Africa/Lagos";
                }
                $bag->setTimezone($tz);
                $user_notif = $bag->getNotificationSummary();
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
            if (isset($_POST['uid'])) {
                $id = decodeText($_POST['uid']);
                if (is_numeric($id)) {
                    $search->setUid($id);
                } else {
                    displayError(400, "The request cannot be fulfilled due to bad syntax");
                    exit;
                }
            }
            if ($term == "*") {
                include_once './Community.php';
                $comm = new Community();
                $id = decodeText($_POST['uid']);
                if (is_numeric($id)) {
                    if ($opt == "mc") {
                        $comm->setUser($id);
                        $response = $comm->userComm($start, $limit, TRUE);
                    } else if ($opt == "mf") {
                        include_once './GossoutUser.php';
                        $user = new GossoutUser($id);
                        if (isset($_COOKIE['tz'])) {
                            $tz = decodeText($_COOKIE['tz']);
                        } else if (isset($_SESSION['auth']['tz'])) {
                            $tz = decodeText($_SESSION['auth']['tz']);
                        } else {
                            $tz = "Africa/Lagos";
                        }
                        $user->setTimezone($tz);
                        $response = $user->getFriends(0, 20);
                    } else {
                        $response = $search->search($term, $start, $limit, $opt);
                    }
                } else {
                    displayError(400, "The request cannot be fulfilled due to bad syntax");
                    exit;
                }
            } else {
                $response = $search->search($term, $start, $limit, $opt);
            }
            if ($response['status']) {
                if ($term == "*") {
                    if ($opt == "mc") {
                        $resp['community'] = $response['community_list'];
                        $resp['status'] = $response['status'];
                    } else if ($opt == "mf") {
                        $resp['people'] = $response['friends'];
                        $resp['status'] = $response['status'];
                    } else {
                        $resp = $response;
                    }
                    echo json_encode($resp);
                } else {
                    echo json_encode($response);
                }
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
                if (isset($_COOKIE['tz'])) {
                    $tz = decodeText($_COOKIE['tz']);
                } else if (isset($_SESSION['auth']['tz'])) {
                    $tz = decodeText($_SESSION['auth']['tz']);
                } else {
                    $tz = "Africa/Lagos";
                }
                $user->setTimezone($tz);
                $sug = $user->suggestFriend();
                if (isset($_POST['limit']) && is_numeric($_POST['limit'])) {
                    $limit = $_POST['limit'];
                }
                if ($sug['status']) {
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

                @mail("Soladnet Team<rabiu@gossout.com>,Soladnet Team<ola@gossout.com>", "Error log: $data[errorThrown]", $htmlHead);
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
                if (isset($_COOKIE['tz'])) {
                    $tz = decodeText($_COOKIE['tz']);
                } else if (isset($_SESSION['auth']['tz'])) {
                    $tz = decodeText($_SESSION['auth']['tz']);
                } else {
                    $tz = "Africa/Lagos";
                }
                $post->setTimezone($tz);
                $load = $post->loadPost();
                if ($load['status']) {
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
    } else if ($_POST['param'] == "deletePost") {
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);
            if (is_numeric($id) && is_numeric($_POST['postId'])) {
                include_once './Post.php';
                $post = new Post();
                $post->setPostId(clean($_POST['postId']));
                $post->setUserId($id);
                $load = $post->deletePost();
                echo json_encode($load);
                exit;
                if ($load['status']) {
                    echo json_encode($load);
                } else {
                    displayError(404, "Not Found");
                }
            } else {
                displayError(400, "The request cannot be fulfilled due to bad syntax");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "deleteComment") {
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);
            if (is_numeric($id) && is_numeric($_POST['cid'])) {
                include_once './Post.php';
                $post = new Post();
                $post->setUserId($id);
                $load = $post->deleteComment($_POST['cid']);
                if ($load['status']) {
                    echo json_encode($load);
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
                if (isset($_COOKIE['tz'])) {
                    $tz = decodeText($_COOKIE['tz']);
                } else if (isset($_SESSION['auth']['tz'])) {
                    $tz = decodeText($_SESSION['auth']['tz']);
                } else {
                    $tz = "Africa/Lagos";
                }
                $post->setTimezone($tz);
                $load = $post->loadComment(clean($_POST['pid']));
                if ($load['status']) {
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
                if (isset($_COOKIE['tz'])) {
                    $tz = decodeText($_COOKIE['tz']);
                } else if (isset($_SESSION['auth']['tz'])) {
                    $tz = decodeText($_SESSION['auth']['tz']);
                } else {
                    $tz = "Africa/Lagos";
                }
                $post->setTimezone($tz);
                $load = $post->comment($_GET['pid'], $id, clean($_POST['comment']));
                if ($load['status']) {
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
            if (is_numeric($id) && trim($_POST['post']) != "" && isset($_POST['comid'])) {
                include_once './Post.php';
                $post = new Post();
                if (isset($_COOKIE['tz'])) {
                    $tz = decodeText($_COOKIE['tz']);
                } else if (isset($_SESSION['auth']['tz'])) {
                    $tz = decodeText($_SESSION['auth']['tz']);
                } else {
                    $tz = "Africa/Lagos";
                }
                $post->setTimezone($tz);
                if (isset($_FILES['photo'])) {
                    if (!($_FILES['photo']['error'][0] > 0)) {
                        $allowedExts = array("jpeg", "jpg", "png", "gif", "JPEG", "JPG", "PNG");
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
                                    if ((($type == "image/jpeg") || ($type == "image/jpg") || ($type == "image/png") || ($type == "image/gif"))) {
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
                            $values = "";
                            foreach ($_POST['comid'] as $comid) {
                                if (is_numeric($comid)) {
                                    if ($values != "") {
                                        $values .=",";
                                    }
                                    $values .= "('" . clean($_POST['post']) . "','$comid','$id')";
                                }
                            }
                            if ($values != "") {
                                $load = $post->post($values);
                                $i = 0;
                                if ($load['status']) {
                                    foreach ($_POST['comid'] as $comid) {
                                        if (is_numeric($comid)) {
                                            if ($i != 0) {
                                                $load['post']['id'][] = $load['post']['id'][0] + $i;
                                            }
                                            $i++;
                                        }
                                    }
                                    $load['post']['name'] = $_SESSION['auth']['firstname'] . " " . $_SESSION['auth']['lastname'];
                                    $load['post']['photo'] = $_SESSION['auth']['photo']['thumbnail45'] ? $_SESSION['auth']['photo']['thumbnail45'] : "images/no-pic.png";
                                }
                            } else {
                                $load['status'] = FALSE;
                            }
                            if ($load['status']) {
                                include_once './SimpleImage.php';
                                foreach ($_FILES as $file) {
                                    $i = 0;
                                    foreach ($file['tmp_name'] as $temp) {
                                        $arr = explode(".", $file['name'][$i]);
                                        $ext = end($arr);
                                        $original = "upload/images/community/" . time() . "-gossout-" . $i . ".$ext";
                                        $thumbnail100 = "upload/images/community/" . time() . "-gossout-" . $i . "_thumb.$ext";
                                        $load['post']['post_photo'][] = array("original" => $original, "thumbnail" => $thumbnail100);
                                        $image = new SimpleImage();
                                        $image->load($temp);
                                        $image->resizeToHeight(100);
                                        $image->save($thumbnail100);
                                        move_uploaded_file($temp, $original);
                                        $post_id = 0;
                                        $values = "";
                                        foreach ($_POST['comid'] as $comid) {
                                            if (is_numeric($comid)) {
                                                if ($values != "") {
                                                    $values .=",";
                                                }
                                                $values .= "('" . $load['post']['id'][$post_id] . "','$comid','$id','$original','$thumbnail100')";
                                                $post_id++;
                                            }
                                        }
                                        if ($values != "")
                                            $post->postImage($values);
                                        $i++;
                                    }
                                }
                            }
                        } else {
                            displayError(400, $err);
                            exit;
                        }
                    } else {
                        $values = "";
                        foreach ($_POST['comid'] as $comid) {
                            if (is_numeric($comid)) {
                                if ($values != "") {
                                    $values .=",";
                                }
                                $values .= "('" . clean($_POST['post']) . "','$comid','$id')";
                            }
                        }
                        if ($values != "") {
                            $load = $post->post($values);
                            $i = 0;
                            if ($load['status']) {
                                foreach ($_POST['comid'] as $comid) {
                                    if (is_numeric($comid)) {
                                        if ($i != 0) {
                                            $load['post']['id'][] = $load['post']['id'][0] + $i;
                                        }
                                        $i++;
                                    }
                                }
                                $load['post']['name'] = $_SESSION['auth']['firstname'] . " " . $_SESSION['auth']['lastname'];
                                $load['post']['photo'] = $_SESSION['auth']['photo']['thumbnail45'] ? $_SESSION['auth']['photo']['thumbnail45'] : "images/no-pic.png";
                            }
                        } else {
                            $load['status'] = FALSE;
                        }
                    }
                } else {
                    $values = "";
                    foreach ($_POST['comid'] as $comid) {
                        if (is_numeric($comid)) {
                            if ($values != "") {
                                $values .=",";
                            }
                            $values .= "('" . clean($_POST['post']) . "','$comid','$id')";
                        }
                    }
                    if ($values != "") {
                        $load = $post->post($values);
                        $i = 0;
                        if ($load['status']) {
                            foreach ($_POST['comid'] as $comid) {
                                if (is_numeric($comid)) {
                                    if ($i != 0) {
                                        $load['post']['id'][] = $load['post']['id'][0] + $i;
                                    }
                                    $i++;
                                }
                            }
                            $load['post']['name'] = $_SESSION['auth']['firstname'] . " " . $_SESSION['auth']['lastname'];
                            $load['post']['photo'] = $_SESSION['auth']['photo']['thumbnail45'] ? $_SESSION['auth']['photo']['thumbnail45'] : "images/no-pic.png";
                        }
                    } else {
                        $load['status'] = FALSE;
                    }
                }
                if ($load['status']) {
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
        if (isset($_POST['uid']) && isset($_POST['user'])) {
            $id = decodeText($_POST['uid']);
            if (is_numeric($id)) {
                $msg = $_POST['message'];
                $user = $_POST['user'];
                include_once './GossoutUser.php';
                $gUser = new GossoutUser(0);
                if (isset($_COOKIE['tz'])) {
                    $tz = decodeText($_COOKIE['tz']);
                } else if (isset($_SESSION['auth']['tz'])) {
                    $tz = decodeText($_SESSION['auth']['tz']);
                } else {
                    $tz = "Africa/Lagos";
                }
                $gUser->setTimezone($tz);
                $response = array();
                if (is_array($user)) {
                    foreach ($user as $receiverId) {
                        $rid = decodeText($receiverId);
                        if (is_numeric($rid)) {
                            $gUser->setUserId($rid);
                            $res = $gUser->sendMessage($id, clean(htmlentities($msg)));
                            if ($res['status']) {
                                $response['status'] = TRUE;
                                //echo json_encode($res['response']);
                            } else {
                                $response['status'] = FALSE;
                            }
                        } else {
                            $response['status'] = FALSE;
                        }
                    }
                    echo json_encode($response);
                } else {
                    $gUser->setScreenName($user);
                    $rid = $gUser->getId();
                    if ($rid != "") {
                        $gUser->setUserId($rid);
                        $res = $gUser->sendMessage($id, clean(htmlentities($msg)));
                        if ($res['status']) {

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
    } else if ($_POST['param'] == "settings") {
        if (isset($_POST['uid'])) {
            $id = decodeText($_POST['uid']);
            include_once './LoginClass.php';
            $login = new Login();
            include_once './GossoutUser.php';
            $user = new GossoutUser($id);
            if (isset($_COOKIE['tz'])) {
                $tz = decodeText($_COOKIE['tz']);
            } else if (isset($_SESSION['auth']['tz'])) {
                $tz = decodeText($_SESSION['auth']['tz']);
            } else {
                $tz = "Africa/Lagos";
            }
            $user->setTimezone($tz);
            if (is_numeric($id) && isset($_POST['email'])) {
                if (isset($_POST['email']) && isset($_POST['fname']) && isset($_POST['lname']) && isset($_POST['pass']) && isset($_POST['uid'])) {
                    $login->setUsername($_POST['email']);
                    $login->setPassword($_POST['pass']);
                    $isValidUser = $login->isValidCredential();
                    if ($isValidUser['status']) {
                        $x = $user->updateFirstname(clean($_POST['fname']));
                        $y = $user->updateLastname(clean($_POST['lname']));
                        if ($x['status'] || $y['status']) {
                            $status['status'] = TRUE;
                        } else {
                            $status['status'] = FALSE;
                            $status['message'] = "No changes was made";
                        }
                    } else {
                        $status['status'] = FALSE;
                        $status['message'] = "Wrong password";
                    }
                } else {
                    displayError(400, "The request cannot be fulfilled due to bad syntax");
                    exit;
                }
                echo json_encode($status);
            } else {
                if (is_numeric($id)) {
                    $login->setUid($id);
                    if (isset($_POST['opass']) || isset($_POST['npass']) || isset($_POST['cnpass'])) {
                        $login->setPassword($_POST['opass']);
                        $status = $login->isValidPassword();
                        if ($status['status']) {
                            if ($_POST['npass'] == $_POST['cnpass']) {
                                $status = $user->updatePassword(md5($_POST['npass']));
                                if ($status['status']) {
                                    $status['message'] = "Password changed successfully!";
                                } else {
                                    $status['message'] = "No changes made!";
                                }
                            } else {
                                $status['status'] = FALSE;
                                $status['message'] = "Password mismatch";
                            }
                        } else {
                            $status['message'] = "Wrong password";
                        }
                        echo json_encode($status);
                    } else {
                        displayError(400, "The request cannot be fulfilled due to bad syntax");
                    }
                } else {
                    displayError(400, "The request cannot be fulfilled due to bad syntax");
                }
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "Unfriend" || $_POST['param'] == "Send Friend Request" || $_POST['param'] == "Cancel Request" || $_POST['param'] == "Accept Request" || $_POST['param'] == "Ignore" || $_POST['param'] == "wink" || $_POST['param'] == "ignoreWink") {
        if (isset($_POST['uid']) && isset($_POST['user'])) {
            $id = decodeText($_POST['uid']);
            $userId = decodeText($_POST['user']);
            if (is_numeric($id) && is_numeric($userId)) {
                include_once './GossoutUser.php';
                $user = new GossoutUser($id);
                if (isset($_COOKIE['tz'])) {
                    $tz = decodeText($_COOKIE['tz']);
                } else if (isset($_SESSION['auth']['tz'])) {
                    $tz = decodeText($_SESSION['auth']['tz']);
                } else {
                    $tz = "Africa/Lagos";
                }
                $user->setTimezone($tz);
                if ($_POST['param'] == "Unfriend" || $_POST['param'] == "Cancel Request" || $_POST['param'] == "Ignore") {
                    $response = $user->unfriend($userId);
                } else if ($_POST['param'] == "Send Friend Request") {
                    $response = $user->sendFriendRequest($userId);
                } else if ($_POST['param'] == "Accept Request") {
                    $response = $user->acceptFriendRequest($userId);
                } else if ($_POST['param'] == "wink" || $_POST['param'] == "ignoreWink") {
                    if ($_POST['param'] == "wink") {
                        $response = $user->wink($userId, $_POST['resp'] != "" ? TRUE : FALSE);
                    } else {
                        $response = $user->responseToWink($userId, "I");
                    }
                } else {
                    displayError(400, "The request cannot be fulfilled due to bad syntax");
                    exit;
                }


                if ($response['status']) {
                    echo json_encode(array(TRUE));
                } else {
                    echo json_encode(array(FALSE));
                }
            } else {
                displayError(400, "The request cannot be fulfilled due to bad syntax - $userId $id");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "creatCommunity") {
        if (isset($_POST['helve']) && isset($_POST['name']) && isset($_POST['uid'])) {
            $creatorId = decodeText($_POST['uid']);
            if (is_numeric($creatorId)) {
                include_once 'Community.php';
                $com = new Community();
                if (isset($_FILES)) {
                    if (isset($_FILES['img']['tmp_name'])) {
                        include_once './SimpleImage.php';
                        $allowedExts = array("jpeg", "jpg", "png", "gif", "JPEG", "JPG", "PNG", "GIF");
                        $arr = explode(".", $_FILES['img']['name']);
                        $ext = end($arr);
                        if ((($_FILES['img']['type'] == "image/jpeg") || ($_FILES['img']['type'] == "image/gif") || ($_FILES['img']['type'] == "image/jpg") || ($_FILES['img']['type'] == "image/png")) && in_array($ext, $allowedExts) && $_FILES['img']['size'] < 2048000) {
                            $original = "upload/images/community_photo/" . time() . "-" . $_POST['uid'] . "-" . 0 . ".$ext";
                            $thumbnail100 = "upload/images/community_photo/" . time() . "-" . $_POST['uid'] . "-" . 1 . "_thumb.$ext";
                            $thumbnail150 = "upload/images/community_photo/" . time() . "-" . $_POST['uid'] . "-" . 2 . "_thumb.$ext";
//                            $status['com_photo'] = array("original" => $original, "thumbnail150" => $thumbnail150, "thumbnail100" => $thumbnail100);
                            $image = new SimpleImage();
                            $image->load($_FILES['img']['tmp_name']);
                            $image->resizeToWidth(100);
                            $image->save($thumbnail100);
                            $image->resizeToWidth(150);
                            $image->save($thumbnail150);
                            move_uploaded_file($_FILES['img']['tmp_name'], $original);
                            $status = $com->create(clean($_POST['helve']), clean($_POST['name']), clean($_POST['desc']), $creatorId, $original, $thumbnail150, $thumbnail100);
                            if (isset($_POST['privacy'])) {
                                $status = $com->updatePrivacy("Private", clean($_POST['helve']));
                            }
                            if ($status['status']) {
                                echo json_encode(array("status" => "success", "name" => $_POST['name'], "unique_name" => $_POST['helve']));
                            } else {
                                echo json_encode(array("status" => "failed"));
                            }
                        } else {
                            displayError(404, "The request cannot be fulfilled due wrong image format");
                        }
                    } else {
                        if (isset($_POST['privacy'])) {
                            $status = $com->create(clean($_POST['helve']), clean($_POST['name']), clean($_POST['desc']), $creatorId, "images/no-pic.png", "images/no-pic.png", "images/no-pic.png", "Private");
                        } else {
                            $status = $com->create(clean($_POST['helve']), clean($_POST['name']), clean($_POST['desc']), $creatorId);
                        }

                        if ($status['status']) {
                            echo json_encode(array("status" => "success", "name" => $_POST['name'], "unique_name" => $_POST['helve']));
                        } else {
                            echo json_encode(array("status" => "failed"));
                        }
                    }
                } else {
                    if (isset($_POST['privacy'])) {
                        $status = $com->create(clean($_POST['helve']), clean($_POST['name']), clean($_POST['desc']), $creatorId, "images/no-pic.png", "images/no-pic.png", "images/no-pic.png", "Private");
                    } else {
                        $status = $com->create(clean($_POST['helve']), clean($_POST['name']), clean($_POST['desc']), $creatorId);
                    }

                    if ($status['status']) {
                        echo json_encode(array("status" => "success", "name" => $_POST['name'], "unique_name" => $_POST['helve']));
                    } else {
                        echo json_encode(array("status" => "failed"));
                    }
                }
            } else {
                displayError(400, "The request cannot be fulfilled due to bad syntax");
            }
        } else {
            displayError(400, "The request cannot be fulfilled due to bad syntax");
        }
    } else if ($_POST['param'] == "Update Community") {
        if (isset($_POST['helve']) && isset($_POST['name']) && isset($_POST['creator'])) {
            $creatorId = decodeText($_POST['creator']);
            if (is_numeric($creatorId)) {
                include_once 'Community.php';
                $com = new Community();
                if (isset($_FILES)) {
                    if (isset($_FILES['img']['tmp_name'])) {
                        include_once './SimpleImage.php';
                        $allowedExts = array("jpeg", "jpg", "png", "gif", "JPEG", "JPG", "PNG", "GIF");
                        $arr = explode(".", $_FILES['img']['name']);
                        $ext = end($arr);
                        if ((($_FILES['img']['type'] == "image/jpeg") || ($_FILES['img']['type'] == "image/gif") || ($_FILES['img']['type'] == "image/jpg") || ($_FILES['img']['type'] == "image/png")) && in_array($ext, $allowedExts) && $_FILES['img']['size'] < 2048000) {
                            $original = "upload/images/community_photo/" . time() . "-" . $_POST['creator'] . "-" . 0 . ".$ext";
                            $thumbnail100 = "upload/images/community_photo/" . time() . "-" . $_POST['creator'] . "-" . 1 . "_thumb.$ext";
                            $thumbnail150 = "upload/images/community_photo/" . time() . "-" . $_POST['creator'] . "-" . 2 . "_thumb.$ext";
                            $image = new SimpleImage();
                            $image->load($_FILES['img']['tmp_name']);
                            $image->resizeToWidth(150);
                            $image->save($thumbnail150);
                            $image->resizeToWidth(100);
                            $image->save($thumbnail100);
                            move_uploaded_file($_FILES['img']['tmp_name'], $original);
                            $status = $com->updatePix($original, $thumbnail100, $thumbnail150, clean($_POST['helve']));

                            if ($status['status']) {
                                if ($status['com_pix']['pix'] != "images/no-pic.png") {
                                    unlink($status['com_pix']['pix']);
                                    unlink($status['com_pix']['thumbnail100']);
                                    unlink($status['com_pix']['thumbnail150']);
                                }
                                echo json_encode(array("status" => TRUE, "message" => "Community image was changed successfully", "thumb" => $thumbnail150));
                            } else {
                                echo json_encode(array("status" => FALSE, "message" => "Image change was not successfull..try again some other time"));
                            }
                        } else {
                            displayError(404, "The request cannot be fulfilled due wrong image format");
                        }
                    } else {
                        $resp['status'] = FALSE;
                        if (isset($_POST['desc']) && $_POST['helve'] && $_POST['name']) {
                            $resp = $com->updateDescription(clean($_POST['desc']), clean($_POST['helve']));
                            $resp = $com->updateName(clean($_POST['name']), clean($_POST['helve']));
                            if (isset($_POST['privacy'])) {
                                $resp = $com->updatePrivacy(clean($_POST['privacy']), clean($_POST['helve']));
                            } else {
                                $resp = $com->updatePrivacy("Public", clean($_POST['helve']));
                            }
                            echo json_encode(array("status" => $resp['status'], "message" => $resp['status'] ? "Community Updated successfully" : "Community info not updated successfully", "name" => $_POST['name'], "desc" => nl2br($_POST['desc']), "privacy" => isset($_POST['privacy']) ? "Private" : "Public"));
                        } else {
                            echo json_encode(array("status" => $resp['status'], "message" => $resp['status'] ? "Community Updated successfully" : "Community info not updated successfully"));
                        }
                    }
                } else {
                    $resp = $com->updateDescription(clean($_POST['desc']), clean($_POST['helve']));
                    $resp = $com->updateName(clean($_POST['name']), clean($_POST['helve']));
                    if (isset($_POST['privacy'])) {
                        $resp = $com->updatePrivacy(clean($_POST['privacy']), clean($_POST['helve']));
                    } else {
                        $resp = $com->updatePrivacy("Public", clean($_POST['helve']));
                    }

                    echo json_encode(array("status" => $resp['status'], "message" => $resp['status'] ? "Community Updated successfully" : "Community info not updated successfully", "name" => $_POST['name'], "desc" => nl2br($_POST['desc']), "privacy" => isset($_POST['privacy']) ? "Private" : "Public"));
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