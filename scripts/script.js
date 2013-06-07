function sendData(callback, target) {
    var option;
    if (callback === "loadCommunity") {
        if (target.more)
            option = {
                beforeSend: function() {
//                showuidfeedback(target);
                },
                success: function(response, statusText, xhr) {
                    loadCommunity(response, statusText, target);
                },
                data: {
                    param: "community",
                    max: target.max,
                    comname: target.comname,
                    start: target.start,
                    limit: target.limit
                }
            };
        else
            option = {
                beforeSend: function() {
                    showuidfeedback(target);
                },
                success: function(response, statusText, xhr) {
                    loadCommunity(response, statusText, target);
                },
                data: {
                    param: "community",
                    max: target.max,
                    comname: target.comname,
                    start: target.start,
                    limit: target.limit
                }
            };
    } else if (callback === "loadSuggestCommunity") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
            },
            success: function(response, statusText, xhr) {
                loadSuggestCommunity(response, statusText, target);
            },
            data: {
                param: "sugcomm",
            }
        };
    } else if (callback === "loadTimeline") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
            },
            success: function(response, statusText, xhr) {
                loadTimeline(response, statusText, target);
            },
            data: {
                param: "timeline"
            }
        };
    } else if (callback === "loadCommunityMembers") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
            },
            success: function(response, statusText, xhr) {
                loadCommunityMembers(response, statusText, target);
            },
            data: {
                param: "community",
                m: target.comname,
                user: target.uid
            }
        };
    } else if (callback === "loadSuggestFriends") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
            },
            success: function(response, statusText, xhr) {
                loadSuggestFriends(response, statusText, target);
            },
            data: {
                param: "sugfriend",
            }
        };
    } else if (callback === "sendFriendRequest") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
            },
            success: function(response, statusText, xhr) {
                sendFriendRequest(response, statusText, target);
            },
            complete: function(jqXHR, textStatus) {
                if (target.param !== "Accept Request")
                    $(target.target).html("");
            },
            data: {
                param: target.param,
                user: target.user,
                resp: target.resp ? target.resp : ""
            }
        };
    } else if (callback === "loadGossbag") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
            },
            success: function(response, statusText, xhr) {
                loadGossbag(response, statusText, target);
            },
            data: {
                param: "gossbag",
                start: target.start,
                limit: target.limit,
                update: true
            }
        };
    } else if (callback === "loadWink") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
            },
            success: function(response, statusText, xhr) {
                loadWink(response, statusText, target);
            },
            data: {
                param: "loadWink",
                start: target.start,
                limit: target.limit,
            }
        };
    } else if (callback === "loadGossComment") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
//                alert('loadWink');
            },
            success: function(response, statusText, xhr) {
                loadGossComment(response, statusText, target);
            },
            data: {
                param: "loadGossComment",
                start: target.start,
                limit: target.limit,
//                update: true
            }
        };
    }
    else if (callback === "loadGossFrq") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
//                alert('loadWink');
            },
            success: function(response, statusText, xhr) {
                loadGossFrq(response, statusText, target);
            },
            data: {
                param: "loadGossFrq",
                start: target.start,
                limit: target.limit,
//                update: true
            }
        };
    } else if (callback === "loadGossFrq") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
//                alert('loadWink');
            },
            success: function(response, statusText, xhr) {
                loadGossFrq(response, statusText, target);
            },
            data: {
                param: "loadGossFrq",
                start: target.start,
                limit: target.limit,
//                update: true
            }
        };
    } else if (callback === "loadGossPost") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
//                alert('loadWink');
            },
            success: function(response, statusText, xhr) {
                loadGossPost(response, statusText, target);
            },
            data: {
                param: "loadGossPost",
                start: target.start,
                limit: target.limit,
//                update: true
            }
        };
    } else if (callback === "loadNotificationCount") {
        option = {
            beforeSend: function() {
            },
            success: function(response, statusText, xhr) {
                loadNotificationCount(response, statusText, target);
            },
            data: {
                param: "notifSum",
                update: false
            }
        };
    } else if (callback === "loadNavMessages") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
            },
            success: function(response, statusText, xhr) {
                loadNavMessages(response, statusText, target);
            },
            data: {
                param: "messages",
                cw: target.cw ? target.cw : "",
                timestamp: target.timestamp
            }
        };
    } else if (callback === "loadNewMessage") {
        option = {
            beforeSend: function() {
                return false;
            },
            success: function(response, statusText, xhr) {
                loadNewMessage(response, statusText, target);
            },
            data: {
                param: "messages",
                cw: target.cw ? target.cw : "",
                timestamp: target.timestamp
            }
        };
    } else if (callback === "loadNewGossbag") {
        return;
        option = {
            beforeSend: function() {
                showuidfeedback(target);
            },
            success: function(response, statusText, xhr) {
                loadNewGossbag(response, statusText, target);
            },
            data: {
                param: "gossbag",
                min: true,
                update: true
            }
        };
    } else if (callback === "loadFriends") {
        if (target.individualFriend) {
            option = {
                beforeSend: function() {
                    showuidfeedback(target.targetLoader);
                },
                success: function(response, statusText, xhr) {
                    loadFriends(response, statusText, target);
                },
                data: {
                    param: "friends",
                    start: (target.start) ? target.start : 0,
                    limit: (target.limit) ? target.limit : 10
                }
            };
        } else {
            option = {
                beforeSend: function() {
                    showuidfeedback(target);
                },
                success: function(response, statusText, xhr) {
                    loadFriends(response, statusText, target);
                },
                data: {
                    param: "friends",
                    start: (target.start) ? target.start : 0,
                    limit: (target.limit) ? target.limit : 10
                }
            };
        }

    } else if (callback === "inviteFriends") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
            },
            success: function(response, statusText, xhr) {
                inviteFriends(response, statusText, target);
            },
            data: {
                param: "inviteFriends",
                comid: target.comId
            }
        };
    } else if (callback === "acceptDeclineComInvitation") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
            },
            success: function(response, statusText, xhr) {
                acceptDeclineComInvitation(response, statusText, target);
            },
            data: {
                param: "inviteFriends",
                comid: target.comId,
                response: target.response
            }
        };
    } else if (callback === "loadPost") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
            },
            success: function(response, statusText, xhr) {
                loadPost(response, statusText, target);
            },
            data: {
                param: "loadPost",
                cid: target.comid,
                start: target.start,
                limit: target.limit
            }
        };
    } else if (callback === "deletePost") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
            },
            success: function(response, statusText, xhr) {
                deletePost(response, statusText, target);
            },
            data: {
                param: "deletePost",
                postId: target.post_id
            }
        };
    } else if (callback === "deleteComment") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
            },
            success: function(response, statusText, xhr) {
                deleteComment(response, statusText, target);
            },
            data: {
                param: "deleteComment",
                cid: target.cid
            }
        };
    } else if (callback === "loadComment") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
            },
            success: function(response, statusText, xhr) {
                loadComment(response, statusText, target);
            },
            data: {
                param: "loadComment",
                pid: target.post_id
            }
        };
    } else if (callback === "leaveJoinCommunity") {
        option = {
            beforeSend: function() {
//                showuidfeedback(target);
            },
            success: function(response, statusText, xhr) {
                leaveJoinCommunity(response, statusText, target);
            },
            data: {
                param: target.param,
                comid: target.comid
            }
        };
    } else if (callback === "logError") {
        option = {
            data: {
//                    target.jqXHR
                param: target.param,
                statusCode: target.jqXHR.status,
                statusText: target.jqXHR.statusText,
                readyState: target.jqXHR.readyState,
                responseText: target.jqXHR.responseText,
                textStatus: target.textStatus,
                errorThrown: target.errorThrown
            }
        };
    }

    $.ajax(option);
}
function showuidfeedback(target) {
    if (target.loadImage) {
        $(target.target).html("<center><img src='images/loading.gif' style='border:none' /></center>");
    }
    return true;
}
function loadTimeline(response, statusText, target) {
    if (!response.error) {
        var htmlstr = "", toggleId = "";
        $.each(response, function(i, response) {
            if (response.type === "post") {
                htmlstr += '<div class="timeline-news-single"><div class="timeline-news-profile-pic">' +
                        '<img onload="OnImageLoad(event);" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '">' +
                        '</div><p><a>' + response.firstname.concat(' ', response.lastname) + '</a> posted to <a href="' + response.unique_name + '">' + response.name + '</a></p>' +
                        '<p class="timeline-time timeago" title="' + response.time + '">' + response.time + '</p>';
                if (response.post_photo) {
                    htmlstr += '<p class="timeline-photo-upload">';
                    $.each(response.post_photo, function(k, photo) {
                        htmlstr += '<a class="fancybox" rel="gallery' + response.id + '"  href="' + photo.original + '" rel="group"><img src="' + photo.thumbnail + '"></a>';
                    });
                    htmlstr += '</p><div class="clear"></div>';
                }
                htmlstr += '<p>' + (response.post.length > 200 ? response.post.substring(0, 200) + '<span style="display:none" id="continuereading-' + response.id + '">' + response.post.substring(200) + '</span> <a id="continue-' + response.id + '">continue reading...</a>' : response.post) + '</p>' +
                        '<!--<p class="post-meta"><span id="post-new-comment-show-' + response.id + '" class=""><span class="icon-16-comment"></span>Comment(20)</span>' +
                        '<span class="post-meta-gossout"><span class="icon-16-share"></span><a class="fancybox " id="inline" href="#share-123456">Share(20)</a></span></p>--><div class="clear"></div></div>';
                if (response.post.length > 200) {
                    if (toggleId !== "") {
                        toggleId += ",";
                    }
                    toggleId += "#continue-" + response.id;
                }
            } else if (response.type === "comcrea") {
                htmlstr += '<div class="timeline-news-single"><div class="timeline-news-profile-pic">' +
                        '<img src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '"></div>' +
                        '<p><a>' + response.firstname.concat(' ', response.lastname) + '</a> created a new <a href="' + response.unique_name + '">Community</a></p>' +
                        '<p class="timeline-time timeago" title="' + response.time + '">' + response.time + '</p><div class="community-meta">' +
                        '<img src="' + response.thumbnail100 + '">' +
                        '<h3><a href="' + response.unique_name + '">' + response.name + '</a></h3>' +
                        '<p>' + response.description + '</p>' +
                        (response.isAmember ? "" : '<p><a class="joinCom" id="joinCom-' + response.id + '">Join</a></p>') +
                        '</div><div class="clear"></div></div>';
                if (!response.isAmember) {
                    if (toggleId !== "") {
                        toggleId += ",";
                    }
                    toggleId += ".joinCom";
                }
            } /*else if (response.type === "comcrea") {
             htmlstr += '<div class="timeline-news-single"><div class="timeline-news-profile-pic">' +
             '<img src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail45) + '"></div>' +
             '<p><a>' + response.firstname.concat(' ', response.lastname) + '</a> created a new <a href="' + response.unique_name + '">Community</a></p>' +
             '<p class="timeline-time timeago" title="' + response.time + '">' + response.time + '</p><div class="community-meta">' +
             '<img src="' + response.thumbnail100 + '">' +
             '<h3><a href="' + response.unique_name + '">' + response.name + '</a></h3>' +
             '<p>' + response.description + '</p>' +
             '<p><a href="">Join</a></p></div><div class="clear"></div></div>';
             }*/
        });
        $(target.target).html(htmlstr);
        prepareDynamicDates();
        $(".timeago").timeago();
        if (toggleId !== "") {
            $(toggleId).click(function() {
                showOption(this);
            });
        }
    } else {
        $(target.target).html("");
    }
}

function loadWink(response, statusText, target) {
    var htmlstr = "", htmlFirst = "", accept_frq_text = "";
    if (!response.error) {
        $.each(response.bag, function(i, response) {
            htmlstr += '<div class="individual-notification-box"><p><span class="icon-16-eye"></span><span class="all-notifications-time timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                    '<img class= "all-notification-image" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '"><div class="all-notification-text">' +
                    '<h3>' + response.firstname.concat(' ', response.lastname) + ' </h3>' +
                    '<div class="all-notifications-message">Winked you</div></div><hr><p>' +
                    '<a class="all-notifications-actions winkIgnore" id="winkIgnore-text-n-' + response.id + '-' + response.sender_id + '"><span class="icon-16-cross"></span>Ignore</a>' +
                    '<a class="all-notifications-actions wink-text" id="wink-text-n-' + response.id + '-' + response.sender_id + '"><span class="icon-16-eye"></span>Wink back</a>' +
                    '</p></div>';
            accept_frq_text += accept_frq_text === "" ? ".winkIgnore,.wink-text" : ",.winkIgnore,.wink-text";
        });
        if (target.status === "append") {
            $(target.target).append(htmlstr);
            $("#loadMoreImg").hide();
            $('.loadMoreGossContent').attr("wink", parseInt($('.loadMoreGossContent').attr("wink")) + limit);
        } else {
            $(target.target).html(htmlstr);
        }
        $(accept_frq_text).click(function() {
            showOption(this);
        });
        prepareDynamicDates();
        $(".timeago").timeago();
    } else {
        if (target.status === "append") {
            humane.log("Opps! you've got it all!", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
            $("#loadMoreImg").hide();
            $('#loadMoreNotifDiv').hide();
            $('#wink-notification-icon').addClass('noResult');
        } else {
            htmlstr = "Hoops! You have no unviewed winks.";
            $(target.target).html(htmlstr);
            $('#loadMoreNotifDiv').hide();
            $('#wink-notification-icon').addClass('noResult');

        }
    }
}
function loadGossPost(response, statusText, target) {
//     $.each(response.bag, function(i, response){alert(response.firstname)});
    var htmlstr = "", htmlFirst = "", accept_frq_text = "";
//      alert('htmlstr');
    if (!response.error) {
        $.each(response.bag, function(i, response) {
            htmlstr += '<div class="individual-notification-box">' +
                    '<p><span class="icon-16-pencil"></span><span class="all-notifications-time timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                    '<img class= "all-notification-image" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '">' +
                    '<div class="all-notification-text"><h3>' + response.firstname.concat(' ', response.lastname) + '</h3>' +
                    '<div class="all-notifications-comment">posts "' + (response.post.length > 50 ? response.post.substring(0, 50) + "..." : response.post) + '" in <a href="communities/' + response.unique_name + '">' + response.name + '</a></div></div><hr><p>' +
                    '<!--<a class="all-notifications-actions"><span class="icon-16-dot"></span>View</a>--></p></div>';
        });
        if (target.status === "append") {
            $(target.target).append(htmlstr);
            $("#loadMoreImg").hide();
            $('.loadMoreGossContent').attr("posts", parseInt($('.loadMoreGossContent').attr("posts")) + limit);
        } else {
            $(target.target).html(htmlstr);
        }
        prepareDynamicDates();
        $(".timeago").timeago();
    } else {
        if (target.status === "append") {
            humane.log("Opps! you've got it all!", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
            $("#loadMoreImg").hide();
            $('#loadMoreNotifDiv').hide();
            $('#post-notification-icon').addClass('noResult');
        } else {
            htmlstr = "Hoops! You have no post notification.";
            $(target.target).html(htmlstr);
            $('#loadMoreNotifDiv').hide();
        }
    }
}

function loadGossComment(response, statusText, target) {
//     $.each(response.bag, function(i, response){alert(response.firstname)});
    var htmlstr = "", htmlFirst = "", accept_frq_text = "";
//      alert('htmlstr');
    if (!response.error) {
        $.each(response.bag, function(i, response) {
            htmlstr += '<div class="individual-notification-box">' +
                    '<p><span class="icon-16-comment"></span><span class="all-notifications-time timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                    '<img class= "all-notification-image" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '">' +
                    '<div class="all-notification-text"><h3>' + response.firstname.concat(' ', response.lastname) + '</h3>' +
                    '<div class="all-notifications-message">Commented on ' + (response.isMyPost ? "on your post" : "a post") + ' in ' + response.name + '</div>' +
                    '<div class="all-notifications-comment">"' + (response.comment.length > 50 ? response.comment.substring(0, 50) + "..." : response.comment) + '"</div></div><hr><p>' +
                    '<!--<a class="all-notifications-actions"><span class="icon-16-dot"></span>View</a>--></p></div>';
        });
        if (target.status === "append") {
            $(target.target).append(htmlstr);
            $("#loadMoreImg").hide();
            $('.loadMoreGossContent').attr("comment", parseInt($('.loadMoreGossContent').attr("comment")) + limit);
        } else {
            $(target.target).html(htmlstr);
        }
        prepareDynamicDates();
        $(".timeago").timeago();
    } else {
        if (target.status === "append") {
            humane.log("Opps! you've got it all!", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
            $("#loadMoreImg").hide();
            $('#loadMoreNotifDiv').hide();
            $('#comment-notification-icon').addClass('noResult');
        } else {
            htmlstr = "Hoops! You have no comment notification.";
            $(target.target).html(htmlstr);
            $('#loadMoreNotifDiv').hide();
        }
    }
}

function loadGossFrq(response, statusText, target) {
//     $.each(response.bag, function(i, response){alert(response.firstname)});
    var htmlstr = "", htmlFirst = "", accept_frq_text = "";
//      alert('htmlstr');
    if (!response.error) {
        $.each(response.bag, function(i, response) {
            htmlstr += '<div class="individual-notification-box"><p><span class="icon-16-user-add"></span><span class="all-notifications-time timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                    '<img class= "all-notification-image" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '"><div class="all-notification-text">' +
                    '<a href=""><h3>' + response.firstname.concat(' ', response.lastname) + ' </h3></a>' +
                    '<div class="all-notifications-message">Wants To Add You</div></div><hr><p>' +
                    '<a class="all-notifications-actions frqIgnore" id="frqIgnore-text-n-' + response.username1 + '"><span class="icon-16-cross"></span>Ignore</a>' +
                    '<a class="all-notifications-actions accept-frq" id="accept-frq-text-n-' + response.username1 + '"><span class="icon-16-checkmark"></span>Accept</a>' +
                    '</p></div>';
            accept_frq_text += ".accept-frq";
            accept_frq_text += ",.frqIgnore";
        });
        if (target.status === "append") {
            $(target.target).append(htmlstr);
            $("#loadMoreImg").hide();
            $('.loadMoreGossContent').attr("frq", parseInt($('.loadMoreGossContent').attr("frq")) + limit);
        } else {
            $(target.target).html(htmlstr);
        }
        $(accept_frq_text).click(function() {
            showOption(this);
        });
        prepareDynamicDates();
        $(".timeago").timeago();
    } else {
        if (target.status === "append") {
            humane.log("Opps! you've got it all!", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
            $("#loadMoreImg").hide();
            $('#loadMoreNotifDiv').hide();
            $('#frq-notification-icon').addClass('noResult');
        } else {
            htmlstr = "Oops! You have no pending friend request.";

            $(target.target).html(htmlstr);
            $('#frq-notification-icon').addClass('noResult');
            $('#loadMoreNotifDiv').hide();
        }
    }
}

function loadGossbag(response, statusText, target) {
    if (!response.error) {
        var htmlstr = "", accept_frq_text = "", winkback = "", ignorewink = "";
        $.each(response, function(i, response) {
            if (response.type === "frq") {
                if (target.target === "#individual-notification-box-a") {
                    htmlstr += '<div class="individual-notification-box"><p><span class="icon-16-user-add"></span><span class="all-notifications-time timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                            '<img class= "all-notification-image" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '"><div class="all-notification-text">' +
                            '<a href=""><h3>' + response.firstname.concat(' ', response.lastname) + ' </h3></a>' +
                            '<div class="all-notifications-message">Wants To Add You</div></div><hr><p>' +
                            '<a class="all-notifications-actions frqIgnore" id="frqIgnore-text-n-' + response.username1 + '"><span class="icon-16-cross"></span>Ignore</a>' +
                            '<a class="all-notifications-actions accept-frq" id="accept-frq-text-n-' + response.username1 + '"><span class="icon-16-checkmark"></span>Accept</a>' +
                            '</p></div>';
                    accept_frq_text += ".accept-frq";
                    accept_frq_text += ",.frqIgnore";
                } else {
                    htmlstr += '<div class="individual-notification"><p><span class="icon-16-user-add"></span>' +
                            '<span class="float-right timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                            '<img class= "notification-icon" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '">' +
                            '<div class="notification-text"> <p class="name">' + response.firstname.concat(' ', response.lastname) + '</p>' +
                            '<p>wants to add you as friend</p></div><div class="clear"></div><hr>' +
                            '<span id="frqOption-' + response.id + '"><a class="notification-actions frqIgnore" id="frqIgnore-text-' + response.username1 + '">Ignore</a>' +
                            '<a class="notification-actions accept-frq" id="accept-frq-text-' + response.username1 + '">Accept</a></span>' +
                            '<div class="clear"></div></div>';
                    accept_frq_text += ".accept-frq";
                    accept_frq_text += ",.frqIgnore";
                }

            } else if (response.type === "TW") {
                if (target.target === "#individual-notification-box-a") {
                    htmlstr += '<div class="individual-notification-box"><p><span class="icon-16-eye"></span><span class="all-notifications-time timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                            '<img class= "all-notification-image" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '"><div class="all-notification-text">' +
                            '<h3>' + response.firstname.concat(' ', response.lastname) + ' </h3>' +
                            '<div class="all-notifications-message">Winked you</div></div><hr><p>' +
                            '<a class="all-notifications-actions winkIgnore" id="winkIgnore-text-n-' + response.id + '-' + response.sender_id + '"><span class="icon-16-cross"></span>Ignore</a>' +
                            '<a class="all-notifications-actions wink-text" id="wink-text-n-' + response.id + '-' + response.sender_id + '"><span class="icon-16-eye"></span>Wink back</a>' +
                            '</p></div>';
                    accept_frq_text += accept_frq_text === "" ? ".winkIgnore,.wink-text" : ",.winkIgnore,.wink-text";
                } else {
                    htmlstr += '<div class="individual-notification"><p><span class="icon-16-eye"></span>' +
                            '<span class="float-right timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                            '<img class= "notification-icon" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '">' +
                            '<div class="notification-text"> <p class="name">' + response.firstname.concat(' ', response.lastname) + '</p>' +
                            '<p>winked you</p></div><div class="clear"></div><hr>' +
                            '<span id="winkOption-' + response.id + '"><a class="notification-actions winkIgnore" id="winkIgnore-text-' + response.id + '-' + response.sender_id + '"><span class="icon-16-cross"></span>Ignore</a>' +
                            '<a class="notification-actions wink-text" id="wink-text-' + response.id + '-' + response.sender_id + '"><span class="icon-16-eye"></span>Wink back</a></span>' +
                            '<div class="clear"></div></div>';
                    accept_frq_text += accept_frq_text === "" ? ".winkIgnore,.wink-text" : ",.winkIgnore,.wink-text";
                }
            } else if (response.type === "comment") {
                if (target.target === "#individual-notification-box-a") {
                    htmlstr += '<div class="individual-notification-box">' +
                            '<p><span class="icon-16-comment"></span><span class="all-notifications-time timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                            '<img class= "all-notification-image" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '">' +
                            '<div class="all-notification-text"><h3>' + response.firstname.concat(' ', response.lastname) + '</h3>' +
                            '<div class="all-notifications-message">Commented on ' + (response.isMyPost ? "on your post" : "a post") + ' in ' + response.name + '</div>' +
                            '<div class="all-notifications-comment">"' + (response.comment.length > 50 ? response.comment.substring(0, 50) + "..." : response.comment) + '"</div></div><hr><p>' +
                            '<!--<a class="all-notifications-actions"><span class="icon-16-dot"></span>View</a>--></p></div>';
                } else {
                    htmlstr += '<div class="individual-notification"><p><span class="icon-16-comment"></span><span class="float-right timeago" title="' + response.time + '">' + response.time + '</span></p>' +
                            '<img class= "notification-icon" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '"><div class="notification-text">' +
                            '<p class="name">' + response.firstname.concat(' ', response.lastname) + '</p><p>commented on ' + (response.isMyPost ? "on your post" : "a post") + ' in ' + response.name + '</p>' +
                            '<p>"' + (response.comment.length > 31 ? response.comment.substring(0, 31) + "..." : response.comment) + '"</p></div><div class="clear"></div><hr>' +
                            '<!--<a class="notification-actions" title="' + response.name + '">View</a>--><div class="clear"></div></div>';
                }
            } else if (response.type === "post") {
                if (target.target === "#individual-notification-box-a") {
                    htmlstr += '<div class="individual-notification-box">' +
                            '<p><span class="icon-16-pencil"></span><span class="all-notifications-time timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                            '<img class= "all-notification-image" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '">' +
                            '<div class="all-notification-text"><h3>' + response.firstname.concat(' ', response.lastname) + '</h3>' +
                            '<div class="all-notifications-comment">posts "' + (response.post.length > 50 ? response.post.substring(0, 50) + "..." : response.post) + '" in <a href="communities/' + response.unique_name + '">' + response.name + '</a></div></div><hr><p>' +
                            '<!--<a class="all-notifications-actions"><span class="icon-16-dot"></span>View</a>--></p></div>';
                } else {
                    htmlstr += '<div class="individual-notification viewed-notification"><p><span class="icon-16-pencil"></span>' +
                            '<span class="float-right timeago" title="' + response.time + '"> ' + response.time + ' </span></p><img class= "notification-icon" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '">' +
                            '<div class="notification-text"> <p class="name">' + response.firstname.concat(' ', response.lastname) + ' </p>' +
                            '<p>posts "' + (response.post.length > 50 ? response.post.substring(0, 50) + "..." : response.post) + '"</p><p>in <a href="communities/' + response.unique_name + '">' + response.name + '</a></p></div><div class="clear"></div><hr><!--<a class="notification-actions">View</a>-->' +
                            '<div class="clear"></div></div>';
                }
            } else if (response.type === "IV") {
                if (target.target === "#individual-notification-box-a") {
                    htmlstr += '<div class="individual-notification-box"><p><span class="icon-16-earth"></span><span class="all-notifications-time timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                            '<img class= "all-notification-image" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '"><div class="all-notification-text">' +
                            '<h3>' + response.firstname.concat(' ', response.lastname) + ' </h3>' +
                            '<div class="all-notifications-message">invites you to join <a href="communities/' + response.unique_name + '">' + response.name + '</a></div></div><hr><p id="invitationtarget">' +
                            '<a class="all-notifications-actions invitationIgnore" id="invitationIgnore-text-' + response.comid + '"><span class="icon-16-cross"></span>Ignore</a>' +
                            '<a class="all-notifications-actions invitation-text" id="invitation-text-' + response.comid + '"><span class="icon-16-earth"></span>Join</a>' +
                            '</p></div>';
                    accept_frq_text += accept_frq_text === "" ? ".invitationIgnore,.invitation-text" : ",.invitationIgnore,.invitation-text";
                } else {
                    htmlstr += '<div class="individual-notification viewed-notification"><p><span class="icon-16-earth"></span>' +
                            '<span class="float-right timeago" title="' + response.time + '"> ' + response.time + ' </span></p><img class= "notification-icon" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '">' +
                            '<div class="notification-text"> <p class="name">' + response.firstname.concat(' ', response.lastname) + '</p><p>invites you to join</p>' +
                            '<p><a href="communities/' + response.unique_name + '">' + response.name + '</a></p></div><div class="clear"></div><hr><span id="invitationtarget"><a class="notification-actions invitationIgnore" id="invitationIgnore-text-n-' + response.comid + '">Ignore</a>' +
                            '<a class="notification-actions invitation-text" id="invitation-text-n-' + response.comid + '">Join</a></span><div class="clear"></div></div>';
                    accept_frq_text += accept_frq_text === "" ? ".invitationIgnore,.invitation-text" : ",.invitationIgnore,.invitation-text";
                }
            }
        });
        if (target.status === "append") {
            $(target.target).append(htmlstr);
            $("#loadMoreImg").hide();
            $('.loadMoreGossContent').attr("all", parseInt($('.loadMoreGossContent').attr("all")) + limit);
        } else {
            $(target.target).html(htmlstr);
        }
        $(accept_frq_text).click(function() {
            showOption(this);
        });
//        alert(accept_frq_text);
        prepareDynamicDates();
        $(".timeago").timeago();
    } else {
        if (response.error) {
            if (target.status === "append") {
                humane.log("Opps! you've got it all!", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
                $("#loadMoreImg").hide();
                $('#all-notification-icon').addClass('noResult');
                $('#loadMoreNotifDiv').hide();
            } else {
                $(target.target).html('<div class="individual-notification"><div class="notification-text"><p>Gossbag Empty</p></div><div class="clear"></div><hr><div class="clear"></div></div>');
            }
        }
    }
}
function loadNewMessage(response, statusText, target) {
//    alert(response);
}
function loadNewGossbag(response, statusText, target) {
    if (!response.error) {
        var url = document.URL.split("/"), accept_frq_text = "", toggleId = "";
        var isHome = $.inArray("home", url);
//        alert(url);
        response.reverse();
//        $.each(response, function(i, response) {
//            if (response.type === "TW") {
//                var html = '<div class="individual-notification"><p><span class="icon-16-eye"></span>' +
//                        '<span class="float-right timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
//                        '<img class= "notification-icon" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '">' +
//                        '<div class="notification-text"> <p class="name">' + response.firstname.concat(' ', response.lastname) + '</p>' +
//                        '<p>winked you</p></div><div class="clear"></div><hr>' +
//                        '<span id="winkOption-' + response.id + '"><a class="notification-actions" id="winkIgnore-text-' + response.id + '-' + response.sender_id + '"><span class="icon-16-cross"></span>Ignore</a>' +
//                        '<a class="notification-actions" id="wink-text-' + response.id + '-' + response.sender_id + '"><span class="icon-16-eye"></span>Wink back</a></span>' +
//                        '<div class="clear"></div></div>';
//                if (target.status === "prepend") {
//                    $(target.target).prepend(html).fadeIn("slow");
//                } else {
//                    $(target.target).html(html).fadeIn("slow");;
//                }
//
//                accept_frq_text += accept_frq_text === "" ? "#winkIgnore-text-" + response.id + '-' + response.sender_id + ",#wink-text-" + response.id + '-' + response.sender_id : ",#winkIgnore-text-" + response.id + '-' + response.sender_id + ",#wink-text-" + response.id + '-' + response.sender_id;
//            } else if (response.type === "post") {
//                var html = '<div class="individual-notification viewed-notification"><p><span class="icon-16-pencil"></span>' +
//                        '<span class="float-right timeago" title="' + response.time + '"> ' + response.time + ' </span></p><img class= "notification-icon" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '">' +
//                        '<div class="notification-text"> <p class="name">' + response.firstname.concat(' ', response.lastname) + ' </p>' +
//                        '<p>posts "' + (response.post.length > 50 ? response.post.substring(0, 50) + "..." : response.post) + '"</p><p>in <a href="communities/' + response.unique_name + '">' + response.name + '</a></p></div><div class="clear"></div><hr><!--<a class="notification-actions'+response.id+'">View</a>-->' +
//                        '<div class="clear"></div></div>';
//                if (target.status === "prepend") {
//                    $(target.target).prepend(html).fadeIn("slow");
//                } else {
//                    $(target.target).html(html).fadeIn("slow");
//                }
//                if (isHome > 0) {
//                    var htmlstr = '<div class="timeline-news-single"><div class="timeline-news-profile-pic">' +
//                            '<img src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail45) + '">' +
//                            '</div><p><a>' + response.firstname.concat(' ', response.lastname) + '</a> posted to <a href="' + response.unique_name + '">' + response.name + '</a></p>' +
//                            '<p class="timeline-time timeago" title="' + response.time + '">' + response.time + '</p>';
//                    if (response.post_photo) {
//                        htmlstr += '<p class="timeline-photo-upload">';
//                        $.each(response.post_photo, function(k, photo) {
//                            htmlstr += '<a class="fancybox" rel="gallery' + response.id + '"  href="' + photo.original + '" rel="group"><img src="' + photo.thumbnail + '"></a>';
//                        });
//                        htmlstr += '</p><div class="clear"></div>';
//                    }
//                    htmlstr += '<p>' + (response.post.length > 200 ? response.post.substring(0, 200) + '<span style="display:none" id="continuereading-' + response.id + '">' + response.post.substring(200) + '</span> <a id="continue-' + response.id + '">continue reading...</a>' : response.post) + '</p>' +
//                            '<!--<p class="post-meta"><span id="post-new-comment-show-' + response.id + '" class=""><span class="icon-16-comment"></span>Comment(20)</span>' +
//                            '<span class="post-meta-gossout"><span class="icon-16-share"></span><a class="fancybox " id="inline" href="#share-123456">Share(20)</a></span></p>--><div class="clear"></div></div>';
//                    if (response.post.length > 200) {
//                        if (toggleId !== "") {
//                            toggleId += ",";
//                        }
//                        toggleId += "#continue-" + response.id;
//                    }
//                    $(".timeline-container").prepend(htmlstr).fadeIn("slow");
//                }
//            }
//        });
        if (accept_frq_text !== "") {
            $(accept_frq_text).click(function() {
                showOption(this);
            });
        }
        prepareDynamicDates();
        $(".timeago").timeago();
    }
}
function inviteFriends(response, statusText, target) {
    var htmlstr = "";
    if (!response.error) {
        $.each(response, function(i, response) {
            htmlstr += '<option value="' + response.id + '">' + response.firstname.concat(' ', response.lastname) + '</option>';
        });
        if (htmlstr !== "") {
            var str = '<select data-placeholder="enter contact" class="chzn-select" multiple style="width:350px;" name="user[]" id="user_callup"><option value=""></option>' + htmlstr + '</select><li><input id="sendBtn" type="submit" class="button submit" name="param" value="Send Invitation" /><span id="messageStatus"></span></li>';
            $(target.target).html(str);
            $(".chzn-select").chosen();
        } else {
            $(target.target).html("You do not have any friend to send invitation to");
        }
    } else if (response.error) {
        $(target.target).html("You do not have any friend to send invitation to");
    }
}
function acceptDeclineComInvitation(response, statusText, target) {
    if (!response.error) {
        var str = "";
        if (response.status === true) {
            str = "Your request was successful!";
            humane.log(str, {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
        } else {
            if (target.response === true) {
                str = "Your accept request was not successful!";
                humane.log(str, {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-error'});
            } else {
                str = "Your ignore request was not successful!";
                humane.log(str, {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-error'});
            }
        }
        $(target.target).html(str);
    } else {
        humane.log(response.error.message, {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-error'});
    }
}
function sendFriendRequest(response, statusText, target) {
    if (!response.error) {
        if (target.param === "Unfriend") {
            $("#aside-friend-" + target.user).hide();
            humane.log("Unfriend action successful!", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
        } else if (target.param === "Send Friend Request") {
            $("#aside-sugfriend-" + target.user).hide();
            $("#unfriend-" + target.user).removeClass("loaded");
            $("#unfriend-" + target.user + "-text").html("Cancel Request");
            humane.log("Friend request action successful!", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
        } else if (target.param === "Cancel Request") {
            $("#unfriend-" + target.user).removeClass("loaded");
            $("#unfriend-" + target.user + "-text").html("Send Friend Request");
            humane.log("Friend request canceled successful!", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
        } else if (target.param === "Accept Request") {
            $(target.target).removeClass("clicked");
            $(target.target).html("Unfriend");
            humane.log("Friend request accepted successful!", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
        } else if (target.param === "wink") {
            $(target.target).removeClass("loaded");
            humane.log("Wink successful", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
        } else if (target.param === "ignoreWink") {
            $(target.target).removeClass("loaded");
            humane.log("Wink ignored successful", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
        }
    }
}
function loadNavMessages(response, statusText, target) {
    var htmlstr = "";
    var converPhoto;
    if (target.cw !== undefined) {
        $("#messageTitle").html('<a href="messages/' + target.cw + '">' + response.cwn + ' <span class="icon-16-chat"></span></a><hr>');
        var element = document.getElementById("new-message-btn");
        element.parentNode.removeChild(element);
        converPhoto = response.photo;
        $("#msgHeader").html('<div class="compose-box"><form method="POST" action="tuossog-api-json.php" id="conForm"><textarea required placeholder="Compose a message" name="message" id="msg"></textarea>' +
                '<input type="submit" class="submit button float-right" name="param" value="Send Message">' +
                '<!--<button class="button float-right hint hint--left" data-hint ="Upload Image"><span class="icon-16-camera"></span></button>-->' +
                '<script>$("#conForm").ajaxForm({beforeSubmit: function() {},success: function(responseText, statusText, xhr, $form) {' +
                '$(\'' + target.target + '\').html(\'<div class="individual-message-box"><p><span class="all-messages-time timeago" title="\' + responseText.m_t + \'"> \' + responseText.m_t + \' </span></p><img class= "all-messages-image" src="\' + (responseText.photo.nophoto ? responseText.photo.alt : responseText.photo.thumbnail50)+\'"><div class="all-messages-text"><a href=""><h3>\' + responseText.sender_name + \' </h3></a><div class="all-messages-message"><span class="icon-16-reply"></span> <p>\' + nl2br(htmlencode($("#msg").val())) + \'</p><!--<br><span class="post-meta-delete"><span class="icon-16-trash"></span><span>Delete</span></span>--></div></div></div>\'+$(\'' + target.target + '\').html());$("#msg").val("");prepareDynamicDates();$(".timeago").timeago();},' +
                'complete: function(response, statusText, xhr, $form) {if (response.error) {$("#messageStatus").html(response.error.message);} else {$("#messageStatus").html("");}},data: {uid: "' + readCookie("user_auth") + '",user:"' + target.cw + '"}});</script>' +
                '</form><div class="clear"></div></div><div class="float-right"><span class="icon-16-arrow-left"></span><a href="messages" class="back">Back to messages</a></div>');
        if (response.conversation) {
            $.each(response.conversation, function(i, response) {
//               alert(converPhoto?converPhoto.nophoto:"B");
//                if (target.uid === response.sender_id) {
                htmlstr += '<div class="individual-message-box"><p><span class="all-messages-time timeago" title="' + response.time + '"> ' + response.time + ' </span>' +
                        '</p><img class= "all-messages-image" src="' + (converPhoto.nophoto ? converPhoto.alt : (response.s_username === target.cw ? converPhoto[response.s_username].thumbnail50 : converPhoto[response.s_username].thumbnail50)) + '"><div class="all-messages-text">' +
                        '<a href=""><h3>' + (response.s_username === target.cw ? response.s_firstname.concat(' ', response.s_lastname) : response.s_firstname.concat(' ', response.s_lastname)) + ' </h3></a>' +
                        '<div class="all-messages-message">' + (target.uid === response.sender_id ? '<span class="icon-16-reply"></span>' : '') + ' <p>' + response.message + '</p><!--<br><span class="post-meta-delete"><span class="icon-16-trash"></span><span>Delete</span></span>--></div></div></div>';
//                } else {
//                    htmlstr += '<div class="individual-message-box"><p><span class="all-messages-time timeago" title="' + response.time + '"> ' + response.time + ' </span>' +
//                            '</p><img class= "all-messages-image" src="' + (converPhoto.nophoto ? converPhoto.alt : (response.s_username === target.cw ? converPhoto[response.s_username].thumbnail : converPhoto[response.s_username].thumbnail)) + '"><div class="all-messages-text">' +
//                            '<a href=""><h3>' + (response.s_username === target.cw ? response.s_firstname.concat(' ', response.s_lastname) : response.s_firstname.concat(' ', response.s_lastname)) + ' </h3></a>' +
//                            '<div class="all-messages-message"><p>' + response.message + '</p></div></div></div>';
//                }

            });
        }
    } else {
        $.each(response, function(i, response) {
            if (target.target === "#message-individual-notification") {
                if (!response.code) {
                    htmlstr += '<div class="individual-notification' + ((response.status === "R") ? " viewed-notification" : "") + '"><p><span class="float-right timeago" title="' + response.time + '"> ' + response.time + ' </span><div class="clear"></div>' +
                            '</p><img class= "notification-icon" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '"><div class="notification-text">' +
                            '<p class="name">' + response.firstname.concat(' ', response.lastname) + '</p><p><!--<span class="icon-16-reply">--></span>' + response.message.substring(0, 30) + (response.message.lenght > 29 ? "..." : "") + '</p>' +
                            '</div><div class="clear"></div><hr><a class="notification-actions" href="messages/' + response.username + '">View</a><div class="clear"></div></div>';
                } else {
                    htmlstr += '<div class="individual-notification"><p><span class="float-right"></span></p><div class="notification-text"><p>No messages found!.</p></div><div class="clear"></div><hr></div>';
                }
            } else {
                if (!response.code) {
                    htmlstr += '<div class="individual-message-box"><p><span class="all-messages-time timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                            '<img class= "all-messages-image" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '"><div class="all-messages-text">' +
                            '<a href=""><h3>' + response.firstname.concat(' ', response.lastname) + '</h3></a>' +
                            '<div class="all-messages-message">' + response.message.substring(0, 250) + (response.message.lenght > 249 ? "..." : "") + '</div></div><hr><p>' +
                            '<!--<a class="all-messages-actions"><span class="icon-16-cross"></span>Delete</a>-->' +
                            '<a href="messages/' + response.username + '" class="all-messages-actions"><span class="icon-16-reply"></span>Reply</a></p></div>';
                } else {
                    htmlstr += '<div class="individual-message-box"><div class="all-messages-text"><h3>No messages</h3></div></div>';
                }

            }
        });
    }
//alert(htmlstr);
    $(target.target).html(htmlstr);
    prepareDynamicDates();
    $(".timeago").timeago();
}
function htmlencode(str) {
    return str.replace(/[&<>"']/g, function($0) {
        return "&" + {"&": "amp", "<": "lt", ">": "gt", '"': "quot", "'": "#39"}[$0] + ";";
    });
}
function loadNotificationCount(response, statusText, target) {
    if (response.gb > 0) {
        var content = $("#gossbag-individual-notification").html();
        if (content !== "") {
            if (content === '<div class="individual-notification"><div class="notification-text"><p>Gossbag Empty</p></div><div class="clear"></div><hr><div class="clear"></div></div>') {
                sendData("loadNewGossbag", {target: "#gossbag-individual-notification", status: "replace"});
            } else if (content !== "<center><img src='images/loading.gif' style='border:none' /></center>") {
                sendData("loadNewGossbag", {target: "#gossbag-individual-notification", status: "prepend"});
            }
        }
        $("#gb-number").html(response.gb);
    } else {
        $("#gb-number").html("&nbsp;");
    }
    if (response.msg > 0) {
        var content = $("#message-individual-notification").html();
        if (content !== "") {
            if (content === '<div class="individual-message-box"><div class="all-messages-text"><h3>No messages</h3></div></div>') {
                sendData("loadNewMessage", {target: "#message-individual-notification", status: "replace", mt: readCookie("m_t")});
            } else if (content !== "<center><img src='images/loading.gif' style='border:none' /></center>") {
                sendData("loadNewMessage", {target: "#message-individual-notification", status: "prepend", mt: readCookie("m_t")});
            }
        }
        $("#msg-number").html(response.msg);
    } else {
        $("#msg-number").html("&nbsp;");
    }
    if ((response.gb + response.msg) > 0) {
        document.title = "(" + (response.gb + response.msg) + ") " + target.title;
    } else {
        document.title = target.title;
    }
    setTimeout(function() {
        sendData("loadNotificationCount", target);
    }, 30000);
}
function loadCommunityMembers(response, statusText, target) {
    var htmlstr = "", wink = "";
    if (!response.error) {
        $.each(response, function(i, response) {
            htmlstr += '<a class= "fancyboxMem" id="inline" href="#' + response.username + '">' +
                    '<div class= "friends-thumbnails"><img onload="OnImageLoad(event);" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail150) + '"></div>' +
                    '<div style="display:none"><div id="' + response.username + '"><div class="aside-wrapper">' +
                    '<div class="profile-pic"><img class="holdam" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail150) + '"></div><table><tr><td></td><td>' +
                    '<h3>' + response.firstname.concat(" ", response.lastname) + '</h3></td></tr><tr><td><span class="icon-16-map"></span></td><td class="profile-meta">' + (response.location === "" ? "Not Set" : response.location) + '</td></tr>' +
                    '<tr><td><span class="icon-16-' + (response.gender === "M" ? "male" : "female") + '"></span></td><td class="profile-meta">' + (response.gender === "M" ? "Male" : "Female") + '</td></tr>' +
//                    '<tr><td><span class="icon-16-dot"></span></td><td class="profile-meta"><a href="">See Profile</a> </td></tr>' +
                    '</table><div class="clear"></div>';
            if (response.isAfriend === true) {
                htmlstr += '<div class="profile-meta-functions button"><a href="messages/' + response.username + '"><span class="icon-16-mail"></span> Send Message</a></div>';
            }
            if (response.isAfriend !== "me") {
                htmlstr += '<div class="profile-meta-functions button" id="unfriend-' + response.id + '"><span class="icon-16-checkmark"></span><span id="unfriend-' + response.id + '-text">Send Friend Request</span></div>' +
                        '<div class="profile-meta-functions button" id="wink-' + response.id + '"><span class="icon-16-eye"></span> Wink</div>';
                if (wink !== "")
                    wink += ",";
                wink += "#wink-" + response.id;
                wink += ",#unfriend-" + response.id;
            }
            htmlstr += '<div class="clear"></div></div></div></div></a>';

        });
        if (response.length > 20) {
            $("#showAllCommem").html('<span class="icon-16-dot"></span><a href="friends">Show all</a>');
        } else {
            $("#showAllCommem").html('');
        }
        $(target.target).html(htmlstr);
        $(".fancyboxMem").fancybox({
            openEffect: 'none',
            closeEffect: 'none',
            minWidth: 400
        });
        $(wink).click(function() {
            showOption(this);
        });
    }
}
function loadCommunity(response, statusText, target) {
    if (!response.error) {
        var comid = "", htmlstr = "", isAmember;
        if (target.loadAside) {
            if (target.uid === 0) {
                $("#joinleave").remove();
            }
            $.each(response, function(i, response) {
                $("#commTitle").html("<a href='communities/" + target.comname + "'>" + response.name + "</a>");
                $("#commDesc").html(response.description.length > 250 ? (nl2br(linkify(response.description.substring(0, 250)))) + "<span style='display:none' id='comdisplayMoreDesc'>" + (nl2br(linkify(response.description.substring(250)))) + "</span>" + " <a id='commViewMoreDesc'>view more...</a>" : (nl2br(linkify(response.description))));
                $("#commUrl").html("<a href='" + target.comname + "'>www.gossout.com/" + target.comname + "</a>");
                $("#comType").html((response.type === "Private" ? '<span class="icon-16-lock"></span>' : '') + response.type);
                $("#joinleave").html(response.isAmember === "true" ? '<span class="icon-16-star-empty"></span> <span id="joinleave-text">Leave</span><input type="hidden" id="joinleave-comid" value="' + response.id + '"/>' : '<span class="icon-16-star"></span> <span id="joinleave-text">Join</span><input type="hidden" id="joinleave-comid" value="' + response.id + '"/>');
                $("#mem_count").html(response.mem_count);
                $("#post_count").html(response.post_count);
                if (readCookie('user_auth') === 0) {
                    $("#joinleave").remove();
                }
                if (response.isAmember === "true" && !target.settings) {
                    if (response.creator_id === readCookie('user_auth')) {
                        $("#otherCommOption").html('<div class=" button profile-button" id="loadCommore">More<span class="icon-16-arrow-down"></span>' +
                                '<div class="more-container" id="pop-up-community-more"><div class="more"><ul>' +
                                '<li id="inviteMemBtn"><a class="displayX" href="#inviteDisplay"><span class="icon-16-user-add"></span> Invite Members<div style="display:none">' +
                                '<div id="inviteDisplay" class="registration" style="width: 800"><h3>Invite Friends</h3><hr/>' +
                                '<form id="inviteForm" method="POST" action="tuossog-api-json.php"><ul>' +
                                '<li><span id="toUserInput"></span></li>' +
                                '</ul></form></div></div></a></li>' +
//                                '<li><a href=""><span class="icon-16-star"></span> Favourite</a></li>' +
//                                '<li><a href=""><span class="icon-16-star-empty"></span> Un-Favourite</a></li>' +
                                '<hr>' +
//                                '<li><a href=""><span class="icon-16-sound-off"></span> Mute</a></li>' +
                                '<li><a href="community-settings/' + target.comname + '"><span class="icon-16-cog"></span> Settings</a></li>' +
                                '</ul></div></div></div>');
                    } else {
                        $("#otherCommOption").html('<a class=" button profile-button displayX" id="inviteMemBtn"  href="#inviteDisplay"><span class="icon-16-user-add"></span> Invite Friends</a>' +
                                '<div style="display:none"><div id="inviteDisplay" class="registration" style="width: 800"><h3>Invite Friends</h3><hr/>' +
                                '<form id="inviteForm" method="POST" action="tuossog-api-json.php"><ul>' +
                                '<li><span id="toUserInput"></span></li>' +
                                '</ul></form></div></div>');
                    }
                    $(".displayX").fancybox({
                        openEffect: 'none',
                        closeEffect: 'none',
                        minWidth: 500,
                        afterClose: function() {
                            $("#inviteMemBtn").removeClass("Open");
                        }
                    });
                    $("#inviteForm").ajaxForm({
                        beforeSubmit: function() {
                            var value = $("#user_callup").val();
                            if (value === null) {
                                humane.log("Select at least a friend first", {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-error'});
                                return false;
                            } else {
                                return true;
                            }
                        },
                        success: function(responseText, statusText, xhr, $form) {
                            if (!responseText.error) {
                                if (responseText.status === true) {
                                    $.fancybox.close();
                                    humane.log("Your invitation was sent successfully", {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-success'});
                                } else {
                                    humane.log("Your invitation was not sent successfully due to invalid friend", {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-error'});
                                }
                            } else {
                                humane.log(responseText.error.message, {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-error'});
                            }
                        },
                        complete: function(response, statusText, xhr, $form) {

                        },
                        data: {
                            uid: readCookie("user_auth"),
                            comid: $("#joinleave-comid").val()
                        }
                    });
                } else if (target.settings) {
                    document.getElementById("com-img").src = response.thumbnail150;
                    $(".helve").val(target.comname);
                    $("#commName").val(response.name);
                    $("#commDescription").val(br2nl(response.description));
                    $(".creator_field").val(response.creator_id);
                    if (response.type === "Private") {
                        $("#privacy").prop("checked", true);
                    }
                }
                document.getElementById("commPix").src = response.thumbnail150;
                comid = response.id;
                if (response.isAmember === "true") {
                    isAmember = "true";
                    htmlstr += '<div class="posts"><h1>' + response.name + '</h1><div class="post-box">' +
                            '<form method="POST" action="tuossog-api-json.php" id="com-' + response.id + '" enctype="multipart/form-data">' +
                            '<textarea required placeholder="Post to ' + response.name + '" name="post" id="post' + response.id + '"></textarea>' +
                            '<input type="submit" class="submit button float-right" value="Post" id="postBtn">' +
                            '<input type="file" name="photo[]" multiple style="position: absolute;left: -9999px;" id="uploadInput"/>' +
                            '<input type="hidden" name="comid[]" value="' + comid + '"/>' +
                            '<div class="button hint hint--left  float-right" data-hint="Upload image" id="uploadImagePost"><span class="icon-16-camera"></span></div>' +
                            '<div class="progress" style="display:none"><div class="bar"></div ><div class="percent">0%</div></div><div id="status"></div>' +
                            '</form>' +
                            '<div class="clear"></div></div><span id="loadPost"></span></div>';
                } else {
                    htmlstr += '<div class="posts"><h1>' + response.name + '</h1><hr/><span id="loadPost"></span></div>';
                }
            });
            if (htmlstr !== "") {
                $(target.target).html(htmlstr);
                sendData("loadPost", {target: "#loadPost", uid: readCookie("user_auth"), comid: comid, start: 0, limit: 10, loadImage: true});
                if (isAmember === "true") {
                    $("#uploadImagePost,#loadCommore,#inviteMemBtn,#commViewMoreDesc").click(function() {
                        if (this.id === "uploadImagePost") {
                            $("#uploadInput").focus().trigger('click');
                        } else {
                            showOption(this);
                        }
                    });
                    var bar = $('.bar');
                    var percent = $('.percent');
                    if (!target.settings) {
                        $("#com-" + comid).ajaxForm({
                            beforeSubmit: function(formData, jqForm, options) {
                                if ($("#uploadInput").val() !== "") {
                                    $(".progress").show();
                                    var percentVal = '0%';
                                    bar.width(percentVal)
                                    percent.html(percentVal);
                                }
                                $("#postBtn").prop('disabled', true);
//                            var postIdPos = (jqForm.attr('id')).lastIndexOf("-") + 1;
//                            var postId = ((jqForm.attr('id')).substring(postIdPos));
//                            var msg = $('#post' + comid).val();
                            },
                            uploadProgress: function(event, position, total, percentComplete) {
                                var percentVal = percentComplete + '%';
                                bar.width(percentVal)
                                percent.html(percentVal);
                            },
                            success: function(responseText, statusText, xhr, $form) {
                                var percentVal = '100%';
                                bar.width(percentVal)
                                percent.html(percentVal);
                                if (responseText.id !== 0) {
                                    var msg = $('#post' + comid).val();
                                    var str = '<div class="post"><div class="post-content"><p>' + linkify(nl2br(htmlencode(msg))) + '</p>';
                                    if (responseText.post_photo) {
                                        $.each(responseText.post_photo, function(k, photo) {
                                            str += '<a class="fancybox" rel="gallery' + responseText.id + '"  href="' + photo.original + '" rel="group"><img src="' + photo.thumbnail + '"></a>';
                                        });
                                    }
                                    str += '<hr><h3 class="name">' + responseText.name +
                                            '<div class="float-right"><span class="post-time"><span class="icon-16-comment"></span><span id="numComnt-' + responseText.id + '">0</span> </span>' +
//                    '<span class="post-time"><span class="icon-16-share"></span>24</span>' +
                                            '<span class="post-time"><span class="icon-16-clock"></span><span class="timeago" title="' + responseText.time + '">' + responseText.time + '</span></span>' +
                                            '</div></h3></div><hr><div class="post-meta">' +
                                            '<span id="post-new-comment-show-' + responseText.id + '" class=""><span class="icon-16-comment"></span>Comment </span>' +
//                    '<span class="post-meta-gossout"><span class="icon-16-share"></span><a class="fancybox " id="inline" href="#share-123456">Share</a></span>' +
//                    '<span class="post-meta-delete"><span class="icon-16-trash"></span>Delete</span>'+
                                            '<div class="post-comments" id="post-comments-' + responseText.id + '">' +
                                            '</div><div class="post-new-comment" id="post-new-comment-' + responseText.id + '">' +
                                            '<form method="POST" autocomplete="off" action="tuossog-api-json.php?pid=' + responseText.id + '" id="post-new-comment-form-' + responseText.id + '"><!--<img class="post-thumb" src="images/snip.jpg">--><span><input type="text" class="comment-field" required placeholder="Add comment..." name="comment" id="input-' + responseText.id + '"/></span>' +
                                            '<input type="submit" class="submit" value="Comment"><div class="clear"></div></form></div></div></div>';
                                    $("#loadPost").prepend(str);
                                    $("#post_count").html(parseInt($("#post_count").html()) + 1);
                                    $("#noPost-text").hide();
                                    $("#post-new-comment-show-" + responseText.id).click(function() {
                                        showOption(this);
                                    });
                                    $("#post-new-comment-form-" + responseText.id).ajaxForm({
                                        beforeSubmit: function(formData, jqForm, options) {
                                            var postIdPos = (jqForm.attr('id')).lastIndexOf("-") + 1;
                                            var postId = ((jqForm.attr('id')).substring(postIdPos));
                                        },
                                        success: function(responseText, statusText, xhr, $form) {
                                            var postIdPos = ($form.attr('id')).lastIndexOf("-") + 1;
                                            var postId = (($form.attr('id')).substring(postIdPos));
                                            if (responseText.id !== 0) {
                                                var msg = $("#input-" + postId).val();
//                    $("#post-comments-" + postId).html($("#post-comments-" + postId).html() + '<div class="post-comment"><img class = "post-thumb" src = "' + (responseText.photo.nophoto ? responseText.photo.alt : responseText.photo.thumbnail) + '"><h4 class = "name"> ' + responseText.name + ' </h4><span class = "post-time timeago" title="' + responseText.time + '"> ' + responseText.time + ' </span><p><pre>' + (htmlencode(msg)) + '</pre></p><div class = "clear"></div></div>');
                                                $("#post-comments-" + postId).html($("#post-comments-" + postId).html() + '<div class="post-comment"><img class="post-thumb" src="' + (responseText.photo.nophoto ? responseText.photo.alt : responseText.photo.thumbnail50) + '"><h4 class="name">' + responseText.name + '</h4><span class="post-time timeago" title="' + responseText.time + '">' + responseText.time + '</span><p>' + nl2br(htmlencode(msg)) + '</p><div class="clear"></div></div>');
                                                prepareDynamicDates();
                                                $(".timeago").timeago();
                                                $("#numComnt-" + postId).html(parseInt($("#numComnt-" + postId).html()) + 1);
                                            }
                                            $("#post-new-comment-form-" + postId).clearForm();
                                        },
                                        complete: function(response, statusText, xhr, $form) {
                                        },
                                        data: {
                                            param: "comment",
                                            uid: readCookie("user_auth")
                                        }
                                    });
                                    prepareDynamicDates();
                                    $(".timeago").timeago();
                                }
                                $("#com-" + comid).clearForm();
                            },
                            complete: function(response, statusText, xhr, $form) {
                                $(".progress").hide(500);
                                $("#postBtn").prop('disabled', false);
                            },
                            data: {
                                param: "post",
                                uid: readCookie("user_auth")
                            }
                        });
                    }
                } else {
                    $("#commViewMoreDesc").click(function() {
                        showOption(this);
                    });
                    $("#otherCommOption").hide();
                }
            } else {
                $(target.target).html('<div class="posts"></div>');
            }
        } else {
            var countResponse = response.length;
            $.each(response, function(i, response) {
                if (target.target === "#aside-community-list") {
                    htmlstr += '<div class="community-listing"><span><a href="' + response.unique_name + '">' + response.name + '</a></span></div><hr>';
                } else if (target.target === ".community-box") {
                    htmlstr += '<div class="community-box-wrapper"><div class="community-image">' +
                            '<img src="' + response.thumbnail100 + '">' +
                            '</div><div class="community-text"><div class="community-name">' +
                            '<a href="' + response.unique_name + '">' + response.name + '</a> </div><hr><div class="details">' + (response.description.length > 100 ? br2nl(response.description).substring(0, 100) + "..." : br2nl(response.description)) +
                            '</div><div class="members">' + response.type + '</div><div class="members">' + response.mem_count + ' ' + (response.mem_count > 1 ? "Members" : "Member") + '</div><div class="members">' + response.post_count + ' ' + (response.post_count > 1 ? "Posts" : "Post") + '</div></div><div class="clear"></div></div>';
                }
            });
//             htmlstr +='<p><a href="" frnd="10" class="loadMoreFrnd" id="loadMoreFrnd">Load more > ></a>';
            if (countResponse < 10 && target.more)
                $('#loadMoreComm').hide();

            if (target.more) {
                if (htmlstr !== "")
                    $('.community-box').append(htmlstr);
                $('#loadMoreComm').attr('comm', parseInt($('#loadMoreComm').attr('comm')) + 10);
                $('#loader1').hide();
            }
            else
            if (htmlstr !== "")
                $(target.target).html(htmlstr);

        }

    } else {
        if (response.error.code) {
            if (target.target !== "#aside-community-list") {
                $("#pageTitle").html("Suggested Community");
                if (target.loadAside) {
                    $("#commTitle").html(response.error.message);
                    $("#commDesc").html(response.error.message);
                    $("#comType").html("N/A");
                    $("#joinleave").hide();
                    $("#loadCommore").hide();
                    $(target.target).html('<div class="communities-list"><h1 id="pageTitle">Communities</h1><hr/><div id="creatComDiv"><h3>Would you like to create one? It\'s very easy!<br><div class="button"><a href="create-community">New Community</a></div></h3><div class="community-box"></div></div></div>');
                    sendData("loadSuggestCommunity", {target: ".community-box", uid: target.uid, loadImage: true, max: true});
                } else {
                    if (!target.more)
                        sendData("loadSuggestCommunity", target);
                    else {
                        humane.log("Oops! You've got it all!", {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-success'});
                        $('#loadMoreComm').hide();
                    }
                }
            } else {
                $(target.target).html("<span id='noCom'>No community found!</span>");
            }
        }
    }
}
function leaveJoinCommunity(response, statusText, target) {
    if (!response.error) {
        if (target.param === "Join") {
            humane.log("You have successfully joined this community", {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-success'});
            location.reload();
        } else {
            humane.log("You have successfully left this community", {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-success'});
            location.reload();
        }
    } else {
        humane.log(response.error.message, {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-error'});
    }
}
function loadSuggestCommunity(response, statusText, target) {
    if (!response.error) {
        var htmlstr = "";
        $.each(response, function(i, response) {
            if (!target.aside) {
                htmlstr += '<div class="community-box-wrapper">';
                htmlstr += '<div class="community-image"><img src="' + response.pix + '"></div>';
                htmlstr += '<div class="community-text"><div class="community-name">' +
                        '<a href="communities/' + response.unique_name + '">' + response.name + '</a> </div><hr><p class="community-privacy"><div class="details">' + (response.description.length > 100 ? br2nl(response.description).substring(0, 100) + "..." : br2nl(response.description)) +
                        '</div><div class="members">' + response.type + '</div><div class="members">' + response.mem_count + ' ' + (response.mem_count > 1 ? "Members" : "Member") + '</div><div class="members">' + response.post_count + ' ' + (response.post_count > 1 ? "Posts" : "Post") + '</div></div><div class="clear"></div></div>';
            } else {
                if (i > 0) {
                    htmlstr += '<hr>';
                }
                htmlstr += '<div class="community-listing"><span><a href="communities/' + response.unique_name + '">' + response.name + '</a></span></div>';
            }
        });
        $(target.target).html(htmlstr);
    } else {
        if (response.error.code === 404) {
            if (!target.aside) {
                $("#pageTitle").html("Suggested Community");
            }
            if (!target.more)
                $(target.target).html("<p>Opps! We cannot suggest community to you at the moment. <a href='create-community'>Start your own community</a>.</p>");
            else {
                humane.log("Oops! You've got it all!", {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-success'});
            }
        } else {
            $("#pageTitle").html("Communities");
            humane.log(response.error.message, {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-error'});
        }
    }
}
function loadPost(response, statusText, target) {
    if (!response.error) {
        var htmlstr = "";
        var toggleId = "", formBox = "";
        $.each(response, function(i, responseItem) {
            htmlstr += '<div class="post" id="post-' + responseItem.id + '"><div class="post-content"><p>' + (responseItem.post.length > 200 ? nl2br(linkify(responseItem.post.substring(0, 200))) + '<span style="display:none" id="continuereading-' + responseItem.id + '">' + nl2br(linkify(responseItem.post.substring(200))) + '</span> <a id="continue-' + responseItem.id + '">continue reading...</a>' : nl2br(linkify(responseItem.post))) + '</p>';
            if (responseItem.post_photo) {
                $.each(responseItem.post_photo, function(k, photo) {
                    htmlstr += '<a class="fancybox" rel="gallery' + responseItem.id + '"  href="' + photo.original + '" rel="group"><img src="' + photo.thumbnail + '"></a>';
                });
            }
            htmlstr += '<hr><h3 class="name">' + responseItem.firstname.concat(' ', responseItem.lastname) +
                    '<div class="float-right"><span class="post-time"><span class="icon-16-comment"></span><span id="numComnt-' + responseItem.id + '">' + responseItem.numComnt + '</span> </span>' +
//                    '<span class="post-time"><span class="icon-16-share"></span>24</span>' +
                    '<span class="post-time"><span class="icon-16-clock"></span><span class="timeago" title="' + responseItem.time + '">' + responseItem.time + '</span></span>' +
                    '</div></h3></div><hr><div class="post-meta">' +
                    '<span id="post-new-comment-show-' + responseItem.id + '" class=""><span class="icon-16-comment"></span>Comment </span>';
//                    '<span class="post-meta-gossout"><span class="icon-16-share"></span><a class="fancybox " id="inline" href="#share-123456">Share</a></span>' +
            if (target.uid === 0) {
                htmlstr += '<span class="post-meta-gossout"><span class="icon-16-dot"></span><a href="login">Login</a> or <a href="signup-personal">sign-up</a> to add posts or comments</span>';
            }
            if (target.uid === responseItem.sender_id) {
                htmlstr += '<span class="post-meta-delete" id="deletePost-' + responseItem.id + '"><span class="icon-16-trash"></span>Delete</span>';
            }
            htmlstr += '<div class="post-comments" id="post-comments-' + responseItem.id + '">' +
                    '</div><div class="post-new-comment" id="post-new-comment-' + responseItem.id + '">';
            if (target.uid !== 0) {
                htmlstr += '<form method="POST" autocomplete="off" action="tuossog-api-json.php?pid=' + responseItem.id + '" id="post-new-comment-form-' + responseItem.id + '"><!--<img class="post-thumb" src="images/snip.jpg">--><span><input type="text" class="comment-field" required placeholder="Add comment..." name="comment" id="input-' + responseItem.id + '"/></span>' +
                        '<input type="submit" class="submit" value="Comment"><div class="clear"></div></form>';
            }

            htmlstr += '</div></div></div>';
            if (i > 0) {
                toggleId += ",";
                formBox += ",";
            }
            toggleId += "#post-new-comment-show-" + responseItem.id;
            formBox += "#post-new-comment-form-" + responseItem.id;
            if (responseItem.post.length > 200) {
                toggleId += ",#continue-" + responseItem.id;
            }
            if (target.uid === responseItem.sender_id) {
                toggleId += ",#deletePost-" + responseItem.id
            }
        });
        $(target.target).html(htmlstr);
        $(".fancybox").fancybox({openEffect: "none", closeEffect: "none"});
        prepareDynamicDates();
        $(".timeago").timeago();
        $(formBox).ajaxForm({
            beforeSubmit: function(formData, jqForm, options) {
                var postIdPos = (jqForm.attr('id')).lastIndexOf("-") + 1;
                var postId = ((jqForm.attr('id')).substring(postIdPos));
            },
            success: function(responseText, statusText, xhr, $form) {
                var postIdPos = ($form.attr('id')).lastIndexOf("-") + 1;
                var postId = (($form.attr('id')).substring(postIdPos));
                if (responseText.id !== 0) {
                    var msg = $("#input-" + postId).val();
//                    $("#post-comments-" + postId).html($("#post-comments-" + postId).html() + '<div class="post-comment"><img class = "post-thumb" src = "' + (responseText.photo.nophoto ? responseText.photo.alt : responseText.photo.thumbnail) + '"><h4 class = "name"> ' + responseText.name + ' </h4><span class = "post-time timeago" title="' + responseText.time + '"> ' + responseText.time + ' </span><p><pre>' + (htmlencode(msg)) + '</pre></p><div class = "clear"></div></div>');
                    $("#post-comments-" + postId).html($("#post-comments-" + postId).html() + '<div class="post-comment"><img class="post-thumb" src="' + (responseText.photo.nophoto ? responseText.photo.alt : responseText.photo.thumbnail50) + '"><h4 class="name">' + responseText.name + '</h4><span class="post-time timeago" title="' + responseText.time + '">' + responseText.time + '</span><p>' + linkify(nl2br(htmlencode(msg))) + '<hr><span class="post-meta-delete" id="deleteComment-' + responseText.id + "_" + postId + '"><span class="icon-16-trash"></span>Delete</span></p><div class="clear"></div></div>');
                    toggleId += "#deleteComment-" + responseText.id + "_" + postId;
                    prepareDynamicDates();
                    $(".timeago").timeago();
                    $("#numComnt-" + postId).html(parseInt($("#numComnt-" + postId).html()) + 1);
                    $(toggleId).click(function() {
                        showOption(this);
                    });
                }
                $("#post-new-comment-form-" + postId).clearForm();
            },
            complete: function(response, statusText, xhr, $form) {

            },
            data: {
                param: "comment",
                uid: readCookie("user_auth")
            }
        });
        $(toggleId).click(function() {
            showOption(this);
        });
    } else {
        $(target.target).html('<div class="post" id="noPost-text"><div class="post-content"><p>No Post Found.</p></div></div>');
    }
}
function deletePost(response, statusText, target) {
    if (!response.error) {
        if (response.status) {
            $(target.target).hide();
            humane.log("Post deleted!", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
            if (parseInt($.trim($("#post_count").html()))) {
                if (parseInt($.trim($("#post_count").html())) > 0) {
                    $("#post_count").html(parseInt($.trim($("#post_count").html())) - 1)
                }
            }
        } else {
            $("#deletePost-" + target.post_id).removeClass("clicked");
            humane.log("Post was not deleted...try again later", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-error'});
        }
    } else {
        humane.log(response.error.message, {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-error'});
        $("#deletePost-" + target.post_id).removeClass("clicked");
    }
}
function deleteComment(response, statusText, target) {
    if (!response.error) {
        if (response.status) {
            $(target.target).hide();
            humane.log("Comment deleted!", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
            if (parseInt($.trim($("#numComnt-" + target.postId).html()))) {
                if (parseInt($.trim($("#numComnt-" + target.postId).html())) > 0) {
                    $("#numComnt-" + target.postId).html(parseInt($.trim($("#numComnt-" + target.postId).html())) - 1)
                }
            }
        } else {
            $("#deleteComment-" + target.post_id).removeClass("clicked");
            humane.log("Comment was not deleted...try again later", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-error'});
        }
    } else {
        humane.log(response.error.message, {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-error'});
        $("#deleteComment-" + target.post_id).removeClass("clicked");
    }
}
function loadComment(response, statusText, target) {
    if (!response.error) {
        var htmlstr = "", toggleId = "";
        $.each(response, function(i, responseItem) {
            htmlstr += '<div class="post-comment" id="comment-' + responseItem.id + '"><div class="post-thumb"><img onload="OnImageLoad(event);" src="' + (responseItem.photo.nophoto ? responseItem.photo.alt : responseItem.photo.thumbnail50) + '"> </div><h4 class="name">' + responseItem.firstname.concat(' ', responseItem.lastname) + '</h4><span class="post-time timeago" title="' + responseItem.time + '">' + responseItem.time + '</span><p>' + linkify(responseItem.comment);
            if (target.uid === responseItem.sender_id) {
                htmlstr += '<hr><span class="post-meta-delete" id="deleteComment-' + responseItem.id + "_" + target.post_id + '"><span class="icon-16-trash"></span>Delete</span>';
                if (i > 0 && toggleId !== "") {
                    toggleId += ",";
                }
                if (target.uid === responseItem.sender_id) {
                    toggleId += "#deleteComment-" + responseItem.id + "_" + target.post_id;
                }
            }
            htmlstr += '</p><div class="clear"></div></div>';
        });
        $(target.target).html(htmlstr);
        prepareDynamicDates();
        $(".timeago").timeago();
        if (toggleId !== "") {
            $(toggleId).click(function() {
                showOption(this);
            });
        }
    } else {
        $(target.target).html("");
    }
}
function loadFriends(response, statusText, target) {
    if (!response.error) {
        var htmlstr = "", unfriend = "", friendsPage = "", responseCount;
        responseCount = response.length;
        $.each(response, function(i, responseItem) {
            if (target.target === "#aside-friends-list") {
                if (target.friendPage) {
                    friendsPage += '<div class="individual-friend-box"><a class= "fancyboxAlert" id="inline" href="#' + responseItem.username + '">' +
                            '<div class="friend-image"><img src="' + (responseItem.photo.nophoto ? responseItem.photo.alt : responseItem.photo.thumbnail50) + '"></div><div class="friend-text">' +
                            '<div class="friend-name">' + responseItem.firstname.concat(" ", responseItem.lastname) + '</div>' +
                            '<div class="friend-location">' + responseItem.location + '</div></div>' +
                            '<div style="display:none"><div id="' + responseItem.username + '"><div class="aside-wrapper"><div class="profile-pic"><img class="holdam" src="' + (responseItem.photo.nophoto ? responseItem.photo.alt : responseItem.photo.thumbnail150) + '"></div>' +
                            '<table><tr><td></td><td><h3>' + responseItem.firstname.concat(" ", responseItem.lastname) + '</h3></td></tr>' +
                            '<tr><td><span class="icon-16-map"></span></td><td class="profile-meta"> ' + responseItem.location + '</td></tr>' +
                            '<tr><td><span class="icon-16-' + (responseItem.gender === "M" ? "male" : "female") + '"></span></td><td class="profile-meta">' + (responseItem.gender === "M" ? "Male" : "Female") + '</td></tr>' +
                            '</table><div class="clear"></div>' +
                            '<div class="profile-meta-functions button" id="wink-f-' + responseItem.id + '"><span class="icon-16-eye"></span> Wink</div>' +
                            '<div class="profile-meta-functions button"><a href="messages/' + responseItem.username + '"><span class="icon-16-mail"></span> Send Message</a></div>' +
                            '<div class="profile-meta-functions button" id="unfriend-f-' + responseItem.id + '"><span class="icon-16-checkmark"></span> <span id="unfriend-f-' + responseItem.id + '-text">Unfriend</a></div><span id="loadImage-' + response.id + '"></span>' +
                            '<div class="clear"></div></div></div></div></a></div>';
                    unfriend += "#unfriend-f-" + responseItem.id;
                    unfriend += ",#wink-f-" + responseItem.id;

                }
//            if(!target.individualFriend)
                htmlstr += '<a class= "fancyboxAlert" id="aside-friend-' + responseItem.id + '" href="#' + responseItem.username + '">' +
                        '<div class= "friends-thumbnails"><img onload="OnImageLoad(event);" src="' + (responseItem.photo.nophoto ? responseItem.photo.alt : responseItem.photo.thumbnail150) + '"></div>' +
                        '<div style="display:none"><div id="' + responseItem.username + '"><div class="aside-wrapper">' +
                        '<div class="profile-pic"><img  src="' + (responseItem.photo.nophoto ? responseItem.photo.alt : responseItem.photo.thumbnail150) + '"></div><table><tr><td></td><td>' +
                        '<h3>' + responseItem.firstname.concat(" ", responseItem.lastname) + '</h3></td></tr><tr><td><span class="icon-16-map"></span></td><td class="profile-meta">' + responseItem.location + '</td></tr>' +
                        '<tr><td><span class="icon-16-' + (responseItem.gender === "M" ? "male" : "female") + '"></span></td><td class="profile-meta">' + (responseItem.gender === "M" ? "Male" : "Female") + '</td></tr>' +
                        '<tr><td><span class="icon-16-dot"></span></td><td class="profile-meta"><a href="">See Profile</a> </td></tr></table>' +
                        '<div class="clear"></div><div class="profile-summary profile-summary-width"><div class="profile-summary-wrapper">' +
                        '<a href=""><p class="number">' + responseItem.ministat.pc + ' </p> <p class="type">Posts</p></a></div>' +
                        '<div class="profile-summary-wrapper"><a href="communities"><p class="number">' + responseItem.ministat.cc + ' </p> <p class="type">Communities</p></a></div>' +
                        '<div class="profile-summary-wrapper"><a href="friends"><p class="number">' + responseItem.ministat.fc + ' </p> <p class="type">Friends</p></a></div>' +
                        '<div class="clear"></div></div>' +
                        '<div class="clear"></div><div class="profile-meta-functions button" id="wink-' + responseItem.id + '"><span class="icon-16-eye"></span> Wink</div>' +
                        '<div class="profile-meta-functions button"><a href="messages/' + responseItem.username + '"><span class="icon-16-mail"></span> Send Message</a></div>' +
                        '<div class="profile-meta-functions button" id="unfriend-' + responseItem.id + '"><span class="icon-16-cross"></span> <span id="unfriend-' + responseItem.id + '-text">Unfriend</span></div><span id="loadImage-' + response.id + '"></span>' +
                        '<div class="clear"></div></div></div></div></a>';
                if (i > 0 || unfriend !== "") {
                    unfriend += ",";
                }
                unfriend += "#unfriend-" + responseItem.id;
                unfriend += ",#wink-" + responseItem.id;
            } else {
                if (target.target === "#toUserInput") {
                    htmlstr += '<option value="' + responseItem.id + '">' + responseItem.firstname.concat(' ', responseItem.lastname) + '</option>';
                }
            }
        });
//        if(target.friendPage)
//            alert(target.friendPage);
        if (target.target === "#toUserInput") {
            var str = '<select data-placeholder="enter contact" class="chzn-select" multiple style="width:350px;" name="user[]" id="user_callup"><option value=""></option>' + htmlstr + '</select>';
            $(target.target).html(str);
            if (target.inviteMemBtn) {
                $(".chzn-select").chosen();
            } else {
                $(".chzn-select").chosen({max_selected_options: 1});
            }
        } else {
            if (!target.individualFriend)
                $(target.target).html(htmlstr);
            $(".fancyboxAlert").fancybox({
                openEffect: 'none',
                closeEffect: 'none',
                minWidth: 400
            });

            if (target.friendPage) {
                if (friendsPage !== "") {
                    if (target.individualFriend) {
                        $(target.friendPage).append(friendsPage);
                        $('#loadMoreFrnd').attr('frnd', parseInt($('#loadMoreFrnd').attr('frnd')) + 10);
                    }
                    else
                        $(target.friendPage).html(friendsPage);
                } else {

                }
            }
            $(unfriend).click(function() {
                showOption(this);
            });
        }

    } else {
        if (response.error.code === 404) {
            if (target.target !== "#aside-friends-list") {
                if (target.target === "#toUserInput") {
                    $(target.target).html("You cannot send any message now since you do not have any friend");
                    $("#msg,#sendBtn,#msgLabel,#toLabel").hide();
                } else {
                    $(target.target).html("<p>Opps! We cannot suggest friends to you at the moment. <a href='communities'>Join a community</a> to increase your chances.</p>");
                }
            } else {
                if (!target.individualFriend) {
                    $(target.target).html("No Friends found!");
                } else {
                    humane.log("Opps! you've got it all!", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
                    $('#loadMoreFrndDiv').hide();
                }
            }
        } else {
            $("#pageTitle").html("Communities");
            humane.log(response.error.message, {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-error'});

        }
    }
    if (responseCount < 10)
        $('#loadMoreFrndDiv').hide();
}

function loadSuggestFriends(response, statusText, target) {
    var unfriend = "";
    if (!response.error) {
        var htmlstr = "";
        $.each(response, function(i, response) {
            htmlstr += '<div class="individual-friend-box" id="aside-sugfriend-' + response.id + '"><a class= "fancyboxAlert" href="#' + response.username + '"><div class="friend-image">';
            if (response.photo.id) {
                htmlstr += '<img src = "' + (response.photo.thumbnail50 === "" ? response.photo.original : response.photo.thumbnail50) + '" >';
            } else {
                htmlstr += '<img src = "' + response.photo.alt + '" >';
            }
            htmlstr += '</div><div class="friend-text"><div class="friend-name">' + response.firstname.concat(" ", response.lastname) + '</div>' +
                    '<div class="friend-location">' + response.location + '</div></div>';
            htmlstr += '<div style="display:none"><div id="' + response.username + '"><div class="aside-wrapper">';
            if (response.photo.id) {
                htmlstr += '<div class="profile-pic"><img class="holdam" src = "' + (response.photo.thumbnail150 === "" ? response.photo.original : response.photo.thumbnail150) + '"></div>';
            } else {
                htmlstr += '<div class="profile-pic"><img class="holdam" src = "' + response.photo.alt + '" ></div>';
            }
//
            htmlstr += '<div class="clear"></div><table><tr><td></td><td><h3>' + response.firstname.concat(" ", response.lastname) + '</h3></td></tr>' +
                    '<tr><td><span class="icon-16-map"></span></td><td class="profile-meta"> ' + (response.location !== "" ? response.location : "Location not set") + '</td></tr>' +
                    '<tr><td><span class="icon-16-' + (response.gender === "M" ? "male" : "female") + '"></span></td><td class="profile-meta"> ' + (response.gender === "M" ? "Male" : "Female") + '</td></tr>' +
//                    '<tr><td><span class="icon-16-dot"></span></td><td class="profile-meta"><a href="#">See Profile</a> </td></tr>' +
                    '</table><div class="profile-summary profile-summary-width"><div class="profile-summary-wrapper">' +
                    '<a href=""><p class="number">' + response.ministat.pc + ' </p> <p class="type">Posts</p></a></div>' +
                    '<div class="profile-summary-wrapper"><a href="communities"><p class="number">' + response.ministat.cc + ' </p> <p class="type">Communities</p></a></div>' +
                    '<div class="profile-summary-wrapper"><a href="friends"><p class="number">' + response.ministat.fc + ' </p> <p class="type">Friends</p></a></div>' +
                    '<div class="clear"></div></div>' +
                    '<button class="profile-meta-functions button" id="unfriend-' + response.id + '"><span class="icon-16-user-add"></span> <span id="unfriend-' + response.id + '-text">Send Friend Request</span></button><span id="loadImage-' + response.id + '"></span>' +
                    '<div class="clear"></div></div></div></div>';
            htmlstr += '</a></div>';
            if (i > 0) {
                unfriend += ",";
            }
            unfriend += "#unfriend-" + response.id;
        });
        $(target.target).html(htmlstr);
        $(".fancyboxAlert").fancybox({
            openEffect: 'none',
            closeEffect: 'none',
            minWidth: 250
        });
        $(unfriend).click(function() {
            showOption(this);
        });
    } else {
        if (response.error.code === 404) {
            $(target.target).html("<p>Opps! We cannot suggest friends to you at the moment. <a href='communities'>Join a community</a> to increase your chances.</p>");
        } else {
            $("#pageTitle").html("Communities");
            humane.log(response.error.message, {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-error'});
        }
    }
}
function manageError(jqXHR, textStatus, errorThrown) {
    var msg = "";
    if (textStatus === "timeout") {
        msg = "Network timeout.";
    } else if (textStatus === "parsererror") {
        msg = "Opps! something critical just happened...Our team will fix this soon ";
    } else if (jqXHR.statusCode === 502) {
//        msg = "Proxy server received an invalid response...try again reload this page to fix this";
    }
    if (msg !== "")
        humane.log(msg, {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-error'});
    option = {
        param: "logError",
        jqXHR: jqXHR,
        textStatus: textStatus,
        errorThrown: errorThrown
    };
    if (textStatus !== "timeout" && textStatus !== "" && jqXHR.readyState !== 0)
        sendData("logError", option);
}
function showOption(obj) {
    var option;
    if (obj.id === "show-suggested-friends") {
        $("#pop-up-gossbag").toggle(false);
        $("#pop-up-message").toggle(false);
        $("#pop-up-user-actions").toggle(false);
        $("#pop-up-more").toggle(false);
        if ($("#" + obj.id).hasClass("Open")) {
            $("#" + obj.id).removeClass("Open");
            $("#" + obj.id).html("Suggest Friends");
        } else {
            $("#" + obj.id).addClass("Open");
            $("#" + obj.id).html("Hide Suggested Friends");
        }
        option = {
            complete: function() {
                if (!$(this).hasClass("loadedContent")) {
                    sendData("loadSuggestFriends", {target: "#aside-suggest-friends", loadImage: true});
                    $(this).addClass("loadedContent");
                }
            }
        };
        $("#suggested-friends").toggle(option);
    } else if (obj.id === "show-suggested-community") {
        if ($("#" + obj.id).hasClass("Open")) {
            $("#" + obj.id).removeClass("Open");
            $("#" + obj.id).html("Suggest Community");
        } else {
            $("#" + obj.id).addClass("Open");
            $("#" + obj.id).html("Hide Suggested Community");
        }
        option = {
            complete: function() {
                if (!$(this).hasClass("loadedContent")) {
                    sendData("loadSuggestCommunity", {target: "#aside-suggest-community", loadImage: true, aside: true});
                    $(this).addClass("loadedContent");
                }
            }
        };
        $("#suggested-community").toggle(option);
    } else if (obj.id === "gossbag-text" || obj.id === "gossbag-close") {
        $("#pop-up-message").toggle(false);
        $("#pop-up-user-actions").toggle(false);
        $("#pop-up-more").toggle(false);
        option = {
            complete: function() {
                if ($("#" + obj.id).hasClass("Open")) {
                    if (!$("#" + obj.id).hasClass("loaded")) {
                        $("#" + obj.id).addClass("loaded");
                        sendData("loadGossbag", {target: "#gossbag-individual-notification", loadImage: true});
                    }
                }
            },
            duration: 0
        };
        if ($("#" + obj.id).hasClass("Open")) {
            $("#" + obj.id).removeClass("Open");
        } else {
            $("#" + obj.id).addClass("Open");
        }
        $("#pop-up-gossbag").toggle(option);
    } else if (obj.id === "messages-text" || obj.id === "messages-close") {
        $("#pop-up-gossbag").toggle(false);
        $("#pop-up-user-actions").toggle(false);
        $("#pop-up-more").toggle(false);
        option = {
            complete: function() {
                if ($("#" + obj.id).hasClass("Open")) {
                    if (!$("#" + obj.id).hasClass("loaded")) {
                        $("#" + obj.id).addClass("loaded");
                        sendData("loadNavMessages", {target: "#message-individual-notification", loadImage: true});
                    }
                }
            },
            duration: 0
        };
        if ($("#" + obj.id).hasClass("Open")) {
            $("#" + obj.id).removeClass("Open");
        } else {
            $("#" + obj.id).addClass("Open");
        }
        $("#pop-up-message").toggle(option);
    } else if (obj.id === "user-actions") {
        $("#pop-up-gossbag").toggle(false);
        $("#pop-up-message").toggle(false);
        $("#pop-up-more").toggle(false);
        $("#pop-up-user-actions").toggle();
    } else if (obj.id === "user-more-option") {
        $("#pop-up-gossbag").toggle(false);
        $("#pop-up-message").toggle(false);
        $("#pop-up-user-actions").toggle(false);
        $("#pop-up-more").toggle();
    } else if (obj.id === "show-full-profile") {
        $("#pop-up-gossbag").toggle(false);
        $("#pop-up-message").toggle(false);
        $("#pop-up-user-actions").toggle(false);
        $("#pop-up-more").toggle(false);
        if ($("#" + obj.id).hasClass("Open")) {
            $("#" + obj.id).removeClass("Open");
            $("#" + obj.id).html("View Full Profile");
        } else {
            $("#" + obj.id).addClass("Open");
            $("#" + obj.id).html("Hide Full Profile");
        }
        $("#full-profile-data").toggle();
    } else if (obj.id === "search" || obj.id === "search-close") {
        $("#pop-up-gossbag").toggle(false);
        $("#pop-up-message").toggle(false);
        $("#pop-up-user-actions").toggle(false);
        $("#pop-up-more").toggle(false);
        $("#full-profile-data").toggle(false);
        $("#pop-up-search").toggle();
    } else if (obj.id === "new-message-btn") {
        if ($("#" + obj.id).hasClass("Open")) {
            $("#" + obj.id).removeClass("Open");
        } else {
            $("#" + obj.id).addClass("Open");
        }
        if ($("#" + obj.id).hasClass("Open")) {
            if (!$("#" + obj.id).hasClass("loaded")) {
                $("#" + obj.id).addClass("loaded");
                sendData("loadFriends", {target: "#toUserInput", loadImage: true});
            }
        }
    } else if (obj.id === "loadCommore") {
        $("#pop-up-gossbag").toggle(false);
        $("#pop-up-message").toggle(false);
        $("#pop-up-user-actions").toggle(false);
        $("#pop-up-more").toggle(false);
        $("#full-profile-data").toggle(false);
        $("#pop-up-search").toggle(false);
        $("#pop-up-community-more").toggle();
    } else if (obj.id === "changePassAnchor") {
        $("#pop-up-gossbag").toggle(false);
        $("#pop-up-message").toggle(false);
        $("#pop-up-user-actions").toggle(false);
        $("#pop-up-more").toggle(false);
        $("#full-profile-data").toggle(false);
        $("#pop-up-search").toggle(false);
        $("#changePassSpan").toggle();
    } else if (obj.id === "commViewMoreDesc") {
        $("#pop-up-gossbag").toggle(false);
        $("#pop-up-message").toggle(false);
        $("#pop-up-user-actions").toggle(false);
        $("#pop-up-more").toggle(false);
        $("#full-profile-data").toggle(false);
        $("#pop-up-search").toggle(false);
        if ($("#commViewMoreDesc").html() === "view more...") {
            $("#commViewMoreDesc").html("Hide details");
        } else {
            $("#commViewMoreDesc").html("view more...");
        }
        $("#comdisplayMoreDesc").toggle();
    } else if ((obj.id).indexOf("post-new-comment-show") >= 0) {
        $("#pop-up-gossbag").toggle(false);
        $("#pop-up-message").toggle(false);
        $("#pop-up-user-actions").toggle(false);
        $("#pop-up-more").toggle(false);
        $("#full-profile-data").toggle(false);
        $("#pop-up-search").toggle(false);
        $("#pop-up-community-more").toggle(false);
        var postIdPos = (obj.id).lastIndexOf("-") + 1;
        var postId = ((obj.id).substring(postIdPos));
        option = {
            complete: function() {
                if ($("#" + obj.id).hasClass("Open")) {
                    if (!$("#" + obj.id).hasClass("loaded")) {
                        $("#" + obj.id).addClass("loaded");
                        sendData("loadComment", {target: "#post-comments-" + postId, post_id: postId, loadImage: true});
                    }
                }
            },
            duration: 0
        };
        if ($("#" + obj.id).hasClass("Open")) {
            $("#" + obj.id).removeClass("Open");
        } else {
            $("#" + obj.id).addClass("Open");
        }
        $("#post-comments-" + postId).toggle(option);
        $("#post-new-comment-" + postId).toggle();
    } else if ((obj.id).indexOf("deletePost-") >= 0 || (obj.id).indexOf("deleteComment-") >= 0) {
        var postIdPos = (obj.id).lastIndexOf("-") + 1;
        var postId = ((obj.id).substring(postIdPos));
        if (!$("#" + obj.id).hasClass("clicked")) {
            $("#" + obj.id).addClass("clicked");
            if ((obj.id).indexOf("deleteComment-") >= 0) {
                postId = ((obj.id).substring(postIdPos)).split("_");
                sendData("deleteComment", {target: "#comment-" + postId[0], cid: postId[0], postId: postId[1]});
            } else if ((obj.id).indexOf("deletePost-") >= 0) {
                sendData("deletePost", {target: "#post-" + postId, post_id: postId});
            }
        } else {
            humane.log("Request sent already", {timeout: 3000, clickToClose: true, addnCls: 'humane-error'});
        }
    } else if ((obj.id).indexOf("continue-") >= 0) {
        var postIdPos = (obj.id).lastIndexOf("-") + 1;
        var postId = ((obj.id).substring(postIdPos));
        if ($("#" + obj.id).html() === "continue reading...") {
            $("#" + obj.id).html("show less");
        } else {
            $("#" + obj.id).html("continue reading...");
        }
        $("#continuereading-" + postId).toggle();
    } else if (obj.id === "joinleave" || (obj.id).indexOf("joinCom-") >= 0) {
        if ((obj.id).indexOf("joinCom-") >= 0) {
            var comIdPos = (obj.id).lastIndexOf("-") + 1;
            var comId = ((obj.id).substring(comIdPos));
            if (!$("#" + obj.id).hasClass("loaded")) {
                $("#" + obj.id).addClass("loaded");
                sendData("leaveJoinCommunity", {target: "", comid: comId, param: "Join"})
            } else {
                humane.log("Request sent already", {timeout: 3000, clickToClose: true, addnCls: 'humane-error'});
            }
        } else {
            sendData("leaveJoinCommunity", {target: "", comid: $("#joinleave-comid").val(), param: $("#joinleave-text").html()})
        }
    } else if ((obj.id).indexOf("unfriend") >= 0) {
        var userIdPos = (obj.id).lastIndexOf("-") + 1;
        var userId = ((obj.id).substring(userIdPos));
        if (!$("#" + obj.id).hasClass("loaded")) {
            $("#" + obj.id).addClass("loaded");//<span id="loadImage-' + response.id + '"></span>
            sendData("sendFriendRequest", {target: "#loadImage-" + userId, user: userId, param: $("#" + obj.id + "-text").html(), loadImage: true});
        } else {
            humane.log("Request sent already", {timeout: 3000, clickToClose: true, addnCls: 'humane-error'});
        }
    } else if ((obj.id).indexOf("wink-") >= 0) {
        var userIdPos = (obj.id).lastIndexOf("-") + 1;
        var userId = ((obj.id).substring(userIdPos));
        if (!$("#" + obj.id).hasClass("loaded")) {
            $("#" + obj.id).addClass("loaded");
            if ((obj.id).indexOf("wink-text-") >= 0 || (obj.id).indexOf("wink-text-n-") >= 0) {
                sendData("sendFriendRequest", {target: "#loadImage-" + userId, user: userId, param: "wink", resp: true, loadImage: true});
            } else {
                sendData("sendFriendRequest", {target: "#loadImage-" + userId, user: userId, param: "wink", loadImage: true});
            }
        } else {
            humane.log("Request sent already", {timeout: 3000, clickToClose: true, addnCls: 'humane-error'});
        }
    } else if ((obj.id).indexOf("winkIgnore-text") >= 0) {
        var userIdPos = (obj.id).lastIndexOf("-") + 1;
        var userId = ((obj.id).substring(userIdPos));
        if (!$("#" + obj.id).hasClass("loaded")) {
            $("#" + obj.id).addClass("loaded");
            sendData("sendFriendRequest", {target: "#winkOption-" + userId, user: userId, param: "ignoreWink"});
        } else {
            humane.log("Request sent already", {timeout: 3000, clickToClose: true, addnCls: 'humane-error'});
        }
    } else if ((obj.id).indexOf("accept-frq-text") >= 0) {
        var text = $("#" + obj.id).html();
        if (text === "Accept" || text === '<span class="icon-16-checkmark"></span>Accept') {
            if (!$("#" + obj.id).hasClass("clicked")) {
                $("#" + obj.id).addClass("clicked");
                var userIdPos = (obj.id).lastIndexOf("-") + 1;
                var userId = ((obj.id).substring(userIdPos));
                sendData("sendFriendRequest", {target: "#" + obj.id, user: userId, param: "Accept Request", loadImage: true});
            } else {
                humane.log("Request sent already", {timeout: 3000, clickToClose: true, addnCls: 'humane-error'});
            }
        } else if (text === "Unfriend") {
            if (!$("#" + obj.id).hasClass("clicked")) {
                $("#" + obj.id).addClass("clicked");
                var userIdPos = (obj.id).lastIndexOf("-") + 1;
                var userId = ((obj.id).substring(userIdPos));
                sendData("sendFriendRequest", {target: "#" + obj.id, user: userId, param: "Unfriend", loadImage: true});
            } else {
                humane.log("Request sent already", {timeout: 3000, clickToClose: true, addnCls: 'humane-error'});
            }
        }
    } else if ((obj.id).indexOf("frqIgnore-text-") >= 0) {
        var text = $("#" + obj.id).html();
        if (!$("#" + obj.id).hasClass("clicked")) {
            $("#" + obj.id).addClass("clicked");
            var userIdPos = (obj.id).lastIndexOf("-") + 1;
            var userId = ((obj.id).substring(userIdPos));
            sendData("sendFriendRequest", {target: "#" + obj.id, user: userId, param: "Ignore", loadImage: true});
        } else {
            humane.log("Request sent already", {timeout: 3000, clickToClose: true, addnCls: 'humane-error'});
        }

    } else if (obj.id === "inviteMemBtn") {
        if ($("#" + obj.id).hasClass("Open")) {
            $("#" + obj.id).removeClass("Open");
        } else {
            $("#" + obj.id).addClass("Open");
        }
        if ($("#" + obj.id).hasClass("Open")) {
            if (!$("#" + obj.id).hasClass("loaded")) {
                $("#" + obj.id).addClass("loaded");
                var comId = $("#joinleave-comid").val();
                sendData("inviteFriends", {target: "#toUserInput", loadImage: true, comId: comId});
            }
        }
    } else if ((obj.id).indexOf("invitationIgnore-text") >= 0 || (obj.id).indexOf("invitation-text-") >= 0) {
        var userIdPos = (obj.id).lastIndexOf("-") + 1;
        var comid = ((obj.id).substring(userIdPos));
        if ((obj.id).indexOf("invitationIgnore-text") >= 0) {
            sendData("acceptDeclineComInvitation", {target: "#invitationtarget", loadImage: true, comId: comid, response: false});
        } else {
            sendData("acceptDeclineComInvitation", {target: "#invitationtarget", loadImage: true, comId: comid, response: true});
        }
    } else {
        alert("Not implemented");
    }
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return 0;
}
function ScaleImage(srcwidth, srcheight, targetwidth, targetheight, fLetterBox) {

    var result = {width: 0, height: 0, fScaleToTargetWidth: true};

    if ((srcwidth <= 0) || (srcheight <= 0) || (targetwidth <= 0) || (targetheight <= 0)) {
        return result;
    }

    // scale to the target width
    var scaleX1 = targetwidth;
    var scaleY1 = (srcheight * targetwidth) / srcwidth;

    // scale to the target height
    var scaleX2 = (srcwidth * targetheight) / srcheight;
    var scaleY2 = targetheight;

    // now figure out which one we should use
    var fScaleOnWidth = (scaleX2 > targetwidth);
    if (fScaleOnWidth) {
        fScaleOnWidth = fLetterBox;
    }
    else {
        fScaleOnWidth = !fLetterBox;
    }

    if (fScaleOnWidth) {
        result.width = Math.floor(scaleX1);
        result.height = Math.floor(scaleY1);
        result.fScaleToTargetWidth = true;
    }
    else {
        result.width = Math.floor(scaleX2);
        result.height = Math.floor(scaleY2);
        result.fScaleToTargetWidth = false;
    }
    result.targetleft = Math.floor((targetwidth - result.width) / 2);
    result.targettop = Math.floor((targetheight - result.height) / 2);

    return result;
}
function OnImageLoad(evt) {
    var img = evt.currentTarget;
    // what's the size of this image and it's parent
    var w = $(img).width();
    var h = $(img).height();
    var tw = $(img).parent().width();
    var th = $(img).parent().height();

    // compute the new size and offsets
    var result = ScaleImage(w, h, tw, th, false);

    // adjust the image coordinates and size
    img.width = result.width;
    img.height = result.height;
    $(img).css("left", result.targetleft);
    $(img).css("top", result.targettop);
}
function br2nl(str) {
    return str.replace(/<br\s\/?>/g, "\r");
}
function br2nl(str) {
    return str.replace(/<br\s\/?>/g, "\r");
}
function nl2br(str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    return replacedText;
}