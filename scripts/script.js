function sendData(callback, target) {
    var option;
    if (callback === "loadCommunity") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
            },
            success: function(response, statusText, xhr) {
                loadCommunity(response, statusText, target);
            },
            data: {
                param: "community",
                uid: target.uid,
                max: target.max,
                comname: target.comname ? target.comname : ""
            }
        };
    } else if (callback === "loadSuggestCommunity") {
        option = {
            beforeSend: function() {
                showuidfeedback({target: target});
            },
            success: function(response, statusText, xhr) {
                loadSuggestCommunity(response, statusText, target);
            },
            data: {
                param: "sugcomm",
                uid: target.uid
            }
        };
    } else if (callback === "loadCommunityMembers") {
        option = {
            beforeSend: function() {
                showuidfeedback({target: target});
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
                uid: target.uid
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
                uid: target.uid,
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
                uid: target.uid
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
                uid: target.uid
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
                uid: target.uid,
                cw: target.cw ? target.cw : "",
                timestamp: target.timestamp
            }
        };
    } else if (callback === "loadFriends") {
        option = {
            beforeSend: function() {
                showuidfeedback(target);
            },
            success: function(response, statusText, xhr) {
                loadFriends(response, statusText, target);
            },
            data: {
                param: "friends",
                uid: target.uid
            }
        };
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
                uid: target.uid,
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
                uid: target.uid,
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
                uid: target.uid,
                cid: target.comid
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
                uid: target.uid,
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
                uid: target.uid,
                comid: target.comid
            }
        };
    } else if (callback === "logError") {
        option = {
            data: {
//                    target.jqXHR
                param: target.param,
                uid: target.uid,
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
    if (target.loadImage)
        $(target.target).html("<center><img src='images/loading.gif' /></center>");
    return true;
}
function loadGossbag(response, statusText, target) {
    if (!response.error) {
        var htmlstr = "", accept_frq_text = "", winkback = "", ignorewink = "";
        $.each(response, function(i, response) {
            if (response.type === "frq") {
                if (target.target === "#individual-notification-box") {
                    htmlstr += '<div class="individual-notification-box"><p><span class="icon-16-user-add"></span><span class="all-notifications-time timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                            '<img class= "all-notification-image" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '"><div class="all-notification-text">' +
                            '<a href=""><h3>' + response.firstname.concat(' ', response.lastname) + ' </h3></a>' +
                            '<div class="all-notifications-message">Wants To Add You</div></div><hr><p>' +
                            '<a class="all-notifications-actions" id="frqIgnore-text-n-' + response.username1 + '"><span class="icon-16-cross"></span>Ignore</a>' +
                            '<a class="all-notifications-actions" id="accept-frq-text-n-' + response.username1 + '"><span class="icon-16-checkmark"></span>Accept</a>' +
                            '</p></div>';
                    accept_frq_text += "#accept-frq-text-n-" + response.username1;
                    accept_frq_text += ",#frqIgnore-text-n-" + response.username1;
                } else {
                    htmlstr += '<div class="individual-notification"><p><span class="icon-16-user-add"></span>' +
                            '<span class="float-right timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                            '<img class= "notification-icon" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '">' +
                            '<div class="notification-text"> <p class="name">' + response.firstname.concat(' ', response.lastname) + '</p>' +
                            '<p>wants to add you as friend</p></div><div class="clear"></div><hr>' +
                            '<span id="frqOption-' + response.id + '"><a class="notification-actions" id="frqIgnore-text-' + response.username1 + '">Ignore</a>' +
                            '<a class="notification-actions" id="accept-frq-text-' + response.username1 + '">Accept</a></span>' +
                            '<div class="clear"></div></div>';
                    accept_frq_text += "#accept-frq-text-" + response.username1;
                    accept_frq_text += ",#frqIgnore-text-" + response.username1;
                }

            } else if (response.type === "TW") {
                if (target.target === "#individual-notification-box") {
                    htmlstr += '<div class="individual-notification-box"><p><span class="icon-16-eye"></span><span class="all-notifications-time timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                            '<img class= "all-notification-image" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '"><div class="all-notification-text">' +
                            '<h3>' + response.firstname.concat(' ', response.lastname) + ' </h3>' +
                            '<div class="all-notifications-message">Winked you</div></div><hr><p>' +
                            '<a class="all-notifications-actions" id="winkIgnore-text-n-' + response.sender_id + '"><span class="icon-16-cross"></span>Ignore</a>' +
                            '<a class="all-notifications-actions" id="wink-text-n-' + response.sender_id + '"><span class="icon-16-eye"></span>Wink back</a>' +
                            '</p></div>';
                    accept_frq_text += accept_frq_text === "" ? "#winkIgnore-text-n-" + response.sender_id + ",#wink-text-n-" + response.sender_id : ",#winkIgnore-text-n-" + response.sender_id + ",#wink-text-n-" + response.sender_id;
                } else {
                    htmlstr += '<div class="individual-notification"><p><span class="icon-16-eye"></span>' +
                            '<span class="float-right timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                            '<img class= "notification-icon" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '">' +
                            '<div class="notification-text"> <p class="name">' + response.firstname.concat(' ', response.lastname) + '</p>' +
                            '<p>winked you</p></div><div class="clear"></div><hr>' +
                            '<span id="winkOption-' + response.id + '"><a class="notification-actions" id="winkIgnore-text-' + response.sender_id + '"><span class="icon-16-cross"></span>Ignore</a>' +
                            '<a class="notification-actions" id="wink-text-' + response.sender_id + '"><span class="icon-16-eye"></span>Wink back</a></span>' +
                            '<div class="clear"></div></div>';
                    accept_frq_text += accept_frq_text === "" ? "#winkIgnore-text-" + response.sender_id + ",#wink-text-" + response.sender_id : ",#winkIgnore-text-" + response.sender_id + ",#wink-text-" + response.sender_id;
                }
            } else if (response.type === "comment") {
                if (target.target === "#individual-notification-box") {
                    htmlstr += '<div class="individual-notification-box">' +
                            '<p><span class="icon-16-user-add"></span><span class="all-notifications-time timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                            '<img class= "all-notification-image" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '">' +
                            '<div class="all-notification-text"><h3>' + response.firstname.concat(' ', response.lastname) + '</h3>' +
                            '<div class="all-notifications-message">Commented on ' + (response.isMyPost ? "on your post" : "a post") + '</div>' +
                            '<div class="all-notifications-comment">"' + (response.comment.length > 50 ? response.comment.substring(0, 50) + "..." : response.comment) + '"</div></div><hr><p>' +
                            '<a class="all-notifications-actions"><span class="icon-16-dot"></span>View</a></p></div>';
                } else {
                    htmlstr += '<div class="individual-notification"><p><span class="icon-16-comment"></span><span class="float-right timeago" title="' + response.time + '">' + response.time + '</span></p>' +
                            '<img class= "notification-icon" src="images/1.jpg"><div class="notification-text">' +
                            '<p class="name">' + response.firstname.concat(' ', response.lastname) + '</p><p>commented on ' + (response.isMyPost ? "on your post" : "a post") + '</p>' +
                            '<p>"' + (response.comment.length > 31 ? response.comment.substring(0, 31) + "..." : response.comment) + '"</p></div><div class="clear"></div><hr>' +
                            '<a class="notification-actions" title="' + response.name + '">View</a><div class="clear"></div></div>';
                }
            } else if (response.type === "post") {
                if (target.target === "#individual-notification-box") {
                    htmlstr += '<div class="individual-notification-box">' +
                            '<p><span class="icon-16-pencil"></span><span class="all-notifications-time timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                            '<img class= "all-notification-image" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '">' +
                            '<div class="all-notification-text"><h3>' + response.firstname.concat(' ', response.lastname) + '</h3>' +
                            '<div class="all-notifications-comment">posts "' + (response.post.length > 50 ? response.post.substring(0, 50) + "..." : response.post) + '" in <a href="communities/' + response.unique_name + '">' + response.name + '</a></div></div><hr><p>' +
                            '<a class="all-notifications-actions"><span class="icon-16-dot"></span>View</a></p></div>';
                } else {
                    htmlstr += '<div class="individual-notification viewed-notification"><p><span class="icon-16-pencil"></span>' +
                            '<span class="float-right timeago" title="' + response.time + '"> ' + response.time + ' </span></p><img class= "notification-icon" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '">' +
                            '<div class="notification-text"> <p class="name">' + response.firstname.concat(' ', response.lastname) + ' </p>' +
                            '<p>posts "' + (response.post.length > 50 ? response.post.substring(0, 50) + "..." : response.post) + '"</p><p>in <a href="communities/' + response.unique_name + '">' + response.name + '</a></p></div><div class="clear"></div><hr><a class="notification-actions">View</a>' +
                            '<div class="clear"></div></div>';
                }
            } else if (response.type === "IV") {
                if (target.target === "#individual-notification-box") {
                    htmlstr += '<div class="individual-notification-box"><p><span class="icon-16-earth"></span><span class="all-notifications-time timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                            '<img class= "all-notification-image" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '"><div class="all-notification-text">' +
                            '<h3>' + response.firstname.concat(' ', response.lastname) + ' </h3>' +
                            '<div class="all-notifications-message">invites you to join <a href="communities/' + response.unique_name + '">' + response.name + '</a></div></div><hr><p id="invitationtarget">' +
                            '<a class="all-notifications-actions" id="invitationIgnore-text-' + response.comid + '"><span class="icon-16-cross"></span>Ignore</a>' +
                            '<a class="all-notifications-actions" id="invitation-text-' + response.comid + '"><span class="icon-16-earth"></span>Join</a>' +
                            '</p></div>';
                    accept_frq_text += accept_frq_text === "" ? "#invitationIgnore-text-" + response.comid + ",#invitation-text-" + response.comid : ",#invitationIgnore-text-" + response.comid + ",#invitation-text-" + response.comid;
                } else {
                    htmlstr += '<div class="individual-notification viewed-notification"><p><span class="icon-16-earth"></span>' +
                            '<span class="float-right timeago" title="' + response.time + '"> ' + response.time + ' </span></p><img class= "notification-icon" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '">' +
                            '<div class="notification-text"> <p class="name">' + response.firstname.concat(' ', response.lastname) + '</p><p>invites you to join</p>' +
                            '<p><a href="communities/' + response.unique_name + '">' + response.name + '</a></p></div><div class="clear"></div><hr><span id="invitationtarget"><a class="notification-actions" id="invitationIgnore-text-n-' + response.comid + '">Ignore</a>' +
                            '<a class="notification-actions">Join</a></span><div class="clear"></div></div>';
                    accept_frq_text += accept_frq_text === "" ? "#invitationIgnore-text-n-" + response.comid + ",#invitation-text-n-" + response.comid : ",#invitationIgnore-text-n-" + response.comid + ",#invitation-text-n-" + response.comid;
                }
            }
        });
        $(target.target).html(htmlstr);
        $(accept_frq_text).click(function() {
            showOption(this);
        });
        prepareDynamicDates();
        $(".timeago").timeago();
    } else {
        if (response.error.code === 404) {
            $(target.target).html('<div class="individual-notification">' +
                    '<div class="notification-text"><p class="name">Gossbag empty</p>');
        }
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
    }
}
function acceptDeclineComInvitation(response, statusText, target) {
    if(!response.error){
        var str = "";
        if(response.status===true){
            str = "Your request was successfull!";
            humane.log(str, {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
        }else{
            if(target.response===true){
                str = "Your accept request was not successfull!";
                humane.log(str, {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-error'});
            }else{
                str = "Your ignore request was not successfull!";
                humane.log(str, {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-error'});
            }
        }
        $(target.target).html(str);
    }else{
        humane.log(response.error.message, {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-error'});
    }
}
function sendFriendRequest(response, statusText, target) {
    if (!response.error) {
        if (target.param === "Unfriend") {
            $("#aside-friend-" + target.user).hide();
            humane.log("Unfriend action successfull!", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
        } else if (target.param === "Send Friend Request") {
            $("#aside-sugfriend-" + target.user).hide();
            $("#unfriend-" + target.user).removeClass("loaded");
            $("#unfriend-" + target.user + "-text").html("Cancel Request");
            humane.log("Friend request action successfull!", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
        } else if (target.param === "Cancel Request") {
            $("#unfriend-" + target.user).removeClass("loaded");
            $("#unfriend-" + target.user + "-text").html("Send Friend Request");
            humane.log("Friend request canceled successfull!", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
        } else if (target.param === "Accept Request") {
            $(target.target).removeClass("clicked");
            $(target.target).html("Unfriend");
            humane.log("Friend request accepted successfull!", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
        } else if (target.param === "wink") {
            $(target.target).removeClass("loaded");
            humane.log("Wink successfull", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
        } else if (target.param === "ignoreWink") {
            $(target.target).removeClass("loaded");
            humane.log("Wink ignored successfull", {timeout: 3000, clickToClose: true, addnCls: 'humane-jackedup-success'});
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
                '$(\'' + target.target + '\').html(\'<div class="individual-message-box"><p><span class="all-messages-time timeago" title="\' + responseText.m_t + \'"> \' + responseText.m_t + \' </span></p><img class= "all-messages-image" src="\' + (responseText.photo.nophoto ? responseText.photo.alt : responseText.photo.thumbnail)+\'"><div class="all-messages-text"><a href=""><h3>\' + responseText.sender_name + \' </h3></a><div class="all-messages-message"><span class="icon-16-reply"></span> <p><pre>\' + htmlencode($("#msg").val()) + \'</pre></p><!--<br><span class="post-meta-delete"><span class="icon-16-trash"></span><span>Delete</span></span>--></div></div></div>\'+$(\'' + target.target + '\').html());$("#msg").val("");prepareDynamicDates();$(".timeago").timeago();},' +
                'complete: function(response, statusText, xhr, $form) {if (response.error) {$("#messageStatus").html(response.error.message);} else {$("#messageStatus").html("");}},data: {uid: "' + readCookie("user_auth") + '",user:"' + target.cw + '"}});</script>' +
                '</form><div class="clear"></div></div><div class="float-right"><span class="icon-16-arrow-left"></span><a href="messages" class="back">Back to messages</a></div>');
        if (response.conversation) {
            $.each(response.conversation, function(i, response) {
//               alert(converPhoto?converPhoto.nophoto:"B");
//                if (target.uid === response.sender_id) {
                htmlstr += '<div class="individual-message-box"><p><span class="all-messages-time timeago" title="' + response.time + '"> ' + response.time + ' </span>' +
                        '</p><img class= "all-messages-image" src="' + (converPhoto.nophoto ? converPhoto.alt : (response.s_username === target.cw ? converPhoto[response.s_username].thumbnail : converPhoto[response.s_username].thumbnail)) + '"><div class="all-messages-text">' +
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
                            '</p><img class= "notification-icon" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail) + '"><div class="notification-text">' +
                            '<p class="name">' + response.firstname.concat(' ', response.lastname) + '</p><p><!--<span class="icon-16-reply">--></span>' + response.message.substring(0, 30) + (response.message.lenght > 29 ? "..." : "") + '</p>' +
                            '</div><div class="clear"></div><hr><a class="notification-actions" href="messages/' + response.username + '">View</a><div class="clear"></div></div>';
                } else {
                    htmlstr += '<div class="individual-notification"><p><span class="float-right"></span></p><div class="notification-text"><p>No messages found!.</p></div><div class="clear"></div><hr></div>';
                }
            } else {
                if (!response.code) {
                    htmlstr += '<div class="individual-message-box"><p><span class="all-messages-time timeago" title="' + response.time + '"> ' + response.time + ' </span></p>' +
                            '<img class= "all-messages-image" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail) + '"><div class="all-messages-text">' +
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
        $("#gb-number").html(response.gb);
    } else {
        $("#gb-number").html("&nbsp;");
    }
    if (response.msg > 0) {
        $("#msg-number").html(response.msg);
    } else {
        $("#msg-number").html("&nbsp;");
    }
    if ((response.gb + response.msg) > 0) {
        document.title = target.title + " (" + (response.gb + response.msg) + ")";
    } else {
        document.title = target.title;
    }
    setTimeout(function() {
        sendData("loadNotificationCount", target);
    }, 10000);
}
function loadCommunityMembers(response, statusText, target) {
    var htmlstr = "", wink = "";
    if (!response.error) {
        $.each(response, function(i, response) {
            htmlstr += '<a class= "fancybox " id="inline" href="#' + response.username + '">' +
                    '<img class= "friends-thumbnails" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail50) + '">' +
                    '<div style="display:none"><div id="' + response.username + '"><div class="aside-wrapper">' +
                    '<img class="profile-pic" src="' + (response.photo.nophoto ? response.photo.alt : response.photo.thumbnail150) + '"><table><tr><td></td><td>' +
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
        $(wink).click(function() {
            showOption(this);
        });
    }
}
function loadCommunity(response, statusText, target) {
    if (!response.error) {
        var comid = "", htmlstr = "", isAmember;
        if (target.loadAside) {
            $.each(response, function(i, response) {
                $("#commTitle").html("<a href='communities/" + target.comname + "'>" + response.name + "</a>");
                $("#commDesc").html(response.description);
                $("#comType").html((response.type === "Private" ? '<span class="icon-16-lock"></span>' : '') + response.type);
                $("#joinleave").html(response.isAmember === "true" ? '<span class="icon-16-star-empty"></span> <span id="joinleave-text">Leave</span><input type="hidden" id="joinleave-comid" value="' + response.id + '"/>' : '<span class="icon-16-star"></span> <span id="joinleave-text">Join</span><input type="hidden" id="joinleave-comid" value="' + response.id + '"/>');
                $("#mem_count").html(response.mem_count);
                $("#post_count").html(response.post_count);
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
                    //$("#setting_cancel").href = "google.com";
                    if (response.type === "Private") {
                        $("#privacy").prop("checked", true);
                    }
                }
                document.getElementById("commPix").src = response.thumbnail150;
                if (response.isAmember === "true") {
                    isAmember = "true";
                    comid = response.id;
                    htmlstr += '<div class="posts"><h1>' + response.name + '</h1><div class="post-box">' +
                            '<form method="POST" action="tuossog-api-json.php" id="com-' + response.id + '" enctype="multipart/form-data">' +
                            '<textarea required placeholder="Post to a community" name="post" id="post' + response.id + '"></textarea>' +
                            '<input type="submit" class="submit button float-right" value="Post" id="postBtn">' +
                            '<input type="file" name="photo[]" multiple style="position: absolute;left: -9999px;" id="uploadInput"/>' +
                            '<div class="button hint hint--left  float-right" data-hint="Upload image" id="uploadImagePost"><span class="icon-16-camera"></span></div>' +
                            '<div class="progress" style="display:none"><div class="bar"></div ><div class="percent">0%</div></div><div id="status"></div>' +
                            '</form>' +
                            '<div class="clear"></div></div><span id="loadPost"></span></div><script>sendData("loadPost",{target:"#loadPost",uid:readCookie("user_auth"),comid:"' + response.id + '"});</script>';
                } else {
                    htmlstr += '<div class="posts"><h1>' + response.name + '</h1><hr/><span id="loadPost"></span></div><script>sendData("loadPost",{target:"#loadPost",uid:readCookie("user_auth"),comid:"' + response.id + '"})</script>';
                }
            });
            if (htmlstr !== "") {
                $(target.target).html(htmlstr);
                if (isAmember === "true") {
                    $("#uploadImagePost,#loadCommore,#inviteMemBtn").click(function() {
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
                                    var str = '<div class="post"><div class="post-content"><pre><p>' + (htmlencode(msg)) + '</p></pre>';
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
                                                $("#post-comments-" + postId).html($("#post-comments-" + postId).html() + '<div class="post-comment"><img class="post-thumb" src="' + (responseText.photo.nophoto ? responseText.photo.alt : responseText.photo.thumbnail) + '"><h4 class="name">' + responseText.name + '</h4><span class="post-time timeago" title="' + responseText.time + '">' + responseText.time + '</span><pre><p>' + (htmlencode(msg)) + '</p></pre><div class="clear"></div></div>');
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
                                uid: readCookie("user_auth"),
                                comid: comid
                            }
                        });
                    }
                } else {
                    $("#otherCommOption").hide();
                }
            } else {
                $(target.target).html('<div class="posts"></div>');
            }
        } else {
            $.each(response, function(i, response) {
                if (target.target === "#aside-community-list") {
                    htmlstr += '<div class="community-listing"><span><a href="' + response.unique_name + '">' + response.name + '</a></span></div><hr>';
                } else if (target.target === ".community-box") {
                    htmlstr += '<div class="community-box-wrapper"><div class="community-image">' +
                            '<img src="' + response.thumbnail100 + '">' +
                            '</div><div class="community-text"><div class="community-name">' +
                            '<a href="' + response.unique_name + '">' + response.name + '</a> </div><hr><div class="details">' + br2nl(response.description) +
                            '</div><div class="members">' + response.type + '</div><div class="members">' + response.mem_count + ' ' + (response.mem_count > 1 ? "Members" : "Member") + '</div><div class="members">' + response.post_count + ' ' + (response.post_count > 1 ? "Posts" : "Post") + '</div></div><div class="clear"></div></div>';
                }
            });
            $(target.target).html(htmlstr);
        }

    } else {
        if (response.error.code === 404) {
            if (target.target !== "#aside-community-list") {
                $("#pageTitle").html("Sugested Community");
                if (target.loadAside) {
                    $("#commTitle").html(response.error.message);
                    $("#commDesc").html(response.error.message);
                    $("#comType").html("N/A");
                    $("#joinleave").hide();
                    $("#loadCommore").hide();
                    $(target.target).html('<div class="communities-list"><h1 id="pageTitle">Communities</h1><hr/><div id="creatComDiv"><h3>Would you like to create one? It\'s very easy!<br><button class="button-big"><a href="create-community.php">New Community</a></button></h3><div class="community-box"></div></div></div>');
                    sendData("loadSuggestCommunity", {target: ".community-box", uid: target.uid, loadImage: true, max: true});
                } else {
                    sendData("loadSuggestCommunity", target);
                }
            } else {
                $(target.target).html("<span id='noCom'>No community found!</span>");
            }
        } else {
            humane.log(response.error.message, {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-error'});
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
            if (target.loadImage && !response.error) {
                htmlstr += '<div class="community-box-wrapper">';
                htmlstr += '<div class="community-image"><img src="' + response.pix + '"></div>';
                htmlstr += '<div class="community-text"><div class="community-name">' +
                        '<a href="communities/' + response.unique_name + '">' + response.name + '</a> </div><hr><p class="community-privacy"><div class="details">' + response.description +
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
            if (target.loadImage) {
                $("#pageTitle").html("Sugested Community");
            }
            $(target.target).html("<p>Opps! We cannot suggest community to you at the moment. <a href='create-community'>Start your own community</a>.</p>");
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
            htmlstr += '<div class="post"><div class="post-content"><p>' + responseItem.post + '</p>';
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
                    '<span id="post-new-comment-show-' + responseItem.id + '" class=""><span class="icon-16-comment"></span>Comment </span>' +
//                    '<span class="post-meta-gossout"><span class="icon-16-share"></span><a class="fancybox " id="inline" href="#share-123456">Share</a></span>' +
//                    '<span class="post-meta-delete"><span class="icon-16-trash"></span>Delete</span>'+
                    '<div class="post-comments" id="post-comments-' + responseItem.id + '">' +
                    '</div><div class="post-new-comment" id="post-new-comment-' + responseItem.id + '">' +
                    '<form method="POST" autocomplete="off" action="tuossog-api-json.php?pid=' + responseItem.id + '" id="post-new-comment-form-' + responseItem.id + '"><!--<img class="post-thumb" src="images/snip.jpg">--><span><input type="text" class="comment-field" required placeholder="Add comment..." name="comment" id="input-' + responseItem.id + '"/></span>' +
                    '<input type="submit" class="submit" value="Comment"><div class="clear"></div></form></div></div></div>';
            if (i > 0) {
                toggleId += ",";
                formBox += ",";
            }
            toggleId += "#post-new-comment-show-" + responseItem.id;
            formBox += "#post-new-comment-form-" + responseItem.id;
        });
        $(target.target).html(htmlstr + '<script>$(document).ready(function() {$(".fancybox").fancybox({openEffect: "none",closeEffect: "none"});});</script>');
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
                    $("#post-comments-" + postId).html($("#post-comments-" + postId).html() + '<div class="post-comment"><img class="post-thumb" src="' + (responseText.photo.nophoto ? responseText.photo.alt : responseText.photo.thumbnail) + '"><h4 class="name">' + responseText.name + '</h4><span class="post-time timeago" title="' + responseText.time + '">' + responseText.time + '</span><pre><p>' + (htmlencode(msg)) + '</p></pre><div class="clear"></div></div>');
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
        $(toggleId).click(function() {
            showOption(this);
        });
    } else {
        $(target.target).html('<div class="post" id="noPost-text"><div class="post-content"><p>No Post Found.</p></div></div>');
    }
}
function loadComment(response, statusText, target) {
    if (!response.error) {
        var htmlstr = "";
        $.each(response, function(i, responseItem) {
            htmlstr += '<div class="post-comment"><img class="post-thumb" src="' + (responseItem.photo.nophoto ? responseItem.photo.alt : responseItem.photo.thumbnail) + '"><h4 class="name">' + responseItem.firstname.concat(' ', responseItem.lastname) + '</h4><span class="post-time timeago" title="' + responseItem.time + '">' + responseItem.time + '</span><p>' + responseItem.comment + '</p><div class="clear"></div></div>';
        });
        $(target.target).html(htmlstr);
        prepareDynamicDates();
        $(".timeago").timeago();
    } else {
        $(target.target).html("");
    }
}
function loadFriends(response, statusText, target) {
    if (!response.error) {
        var htmlstr = "", unfriend = "", friendsPage = "";
        $.each(response, function(i, responseItem) {
            if (target.target === "#aside-friends-list") {
                if (target.friendPage) {
                    friendsPage += '<div class="individual-friend-box"><a class= "fancybox " id="inline" href="#' + responseItem.username + '">' +
                            '<div class="friend-image"><img src="' + (responseItem.photo.nophoto ? responseItem.photo.alt : responseItem.photo.thumbnail50) + '"></div><div class="friend-text">' +
                            '<div class="friend-name">' + responseItem.firstname.concat(" ", responseItem.lastname) + '</div>' +
                            '<div class="friend-location">' + responseItem.location + '</div></div>' +
                            '<div style="display:none"><div id="' + responseItem.username + '"><div class="aside-wrapper"><img class="profile-pic" src="' + (responseItem.photo.nophoto ? responseItem.photo.alt : responseItem.photo.thumbnail150) + '">' +
                            '<table><tr><td></td><td><h3>' + responseItem.firstname.concat(" ", responseItem.lastname) + '</h3></td></tr>' +
                            '<tr><td><span class="icon-16-map"></span></td><td class="profile-meta"> ' + responseItem.location + '</td></tr>' +
                            '<tr><td><span class="icon-16-' + (responseItem.gender === "M" ? "male" : "female") + '"></span></td><td class="profile-meta">' + (responseItem.gender === "M" ? "Male" : "Female") + '</td></tr>' +
                            '</table><div class="clear"></div>' +
                            '<div class="profile-meta-functions button" id="wink-f-' + responseItem.id + '"><span class="icon-16-eye"></span> Wink</div>' +
                            '<div class="profile-meta-functions button"><a href="messages/' + responseItem.username + '"><span class="icon-16-mail"></span> Send Message</a></div>' +
                            '<div class="profile-meta-functions button" id="unfriend-f-' + responseItem.id + '"><span class="icon-16-checkmark"></span> <span id="unfriend-f-' + responseItem.id + '-text">Unfriend</a></div><span id="friend-action-loading"></span>' +
                            '<div class="clear"></div></div></div></div></a></div>';
                    unfriend += "#unfriend-f-" + responseItem.id;
                    unfriend += ",#wink-f-" + responseItem.id;
                }
                htmlstr += '<a class= "fancybox " id="aside-friend-' + responseItem.id + '" href="#' + responseItem.username + '">' +
                        '<img class= "friends-thumbnails" src="' + (responseItem.photo.nophoto ? responseItem.photo.alt : responseItem.photo.thumbnail50) + '">' +
                        '<div style="display:none"><div id="' + responseItem.username + '"><div class="aside-wrapper">' +
                        '<img class="profile-pic" src="' + (responseItem.photo.nophoto ? responseItem.photo.alt : responseItem.photo.thumbnail150) + '"><table><tr><td></td><td>' +
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
                        '<div class="profile-meta-functions button" id="unfriend-' + responseItem.id + '"><span class="icon-16-cross"></span> <span id="unfriend-' + responseItem.id + '-text">Unfriend</span></div><span id="friend-action-loading"></span>' +
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
        if (target.target === "#toUserInput") {
            var str = '<select data-placeholder="enter contact" class="chzn-select" multiple style="width:350px;" name="user[]" id="user_callup"><option value=""></option>' + htmlstr + '</select>';
            $(target.target).html(str);
            if (target.inviteMemBtn) {
                $(".chzn-select").chosen();
            } else {
                $(".chzn-select").chosen({max_selected_options: 1});
            }
        } else {
            $(target.target).html(htmlstr);
            if (target.friendPage) {
                if (friendsPage !== "") {
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
                $(target.target).html("No Friends found!");
            }
        } else {
            $("#pageTitle").html("Communities");
            humane.log(response.error.message, {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-error'});
        }
    }
}
function loadSuggestFriends(response, statusText, target) {
    var unfriend = "";
    if (!response.error) {
        var htmlstr = "";
        $.each(response, function(i, response) {
            htmlstr += '<div class="individual-friend-box" id="aside-sugfriend-' + response.id + '"><a class= "fancybox" href="#' + response.username + '"><div class="friend-image">';
            if (response.photo.id) {
                htmlstr += '<img src = "' + (response.photo.thumbnail50 === "" ? response.photo.original : response.photo.thumbnail50) + '" >';
            } else {
                htmlstr += '<img src = "' + response.photo.nophoto + '" >';
            }
            htmlstr += '</div><div class="friend-text"><div class="friend-name">' + response.firstname.concat(" ", response.lastname) + '</div>' +
                    '<div class="friend-location">' + response.location + '</div></div>';
            htmlstr += '<div style="display:none"><div id="' + response.username + '"><div class="aside-wrapper">';
            if (response.photo.id) {
                htmlstr += '<img class="profile-pic" src = "' + (response.photo.thumbnail150 === "" ? response.photo.original : response.photo.thumbnail150) + '"></center>';
            } else {
                htmlstr += '<img class="profile-pic" src = "' + response.photo.nophoto + '" >';
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
                    '<button class="profile-meta-functions button" id="unfriend-' + response.id + '"><span class="icon-16-user-add"></span> <span id="unfriend-' + response.id + '-text">Send Friend Request</span></button>' +
                    '<div class="clear"></div></div></div></div>';
            htmlstr += '</a></div>';
            if (i > 0) {
                unfriend += ",";
            }
            unfriend += "#unfriend-" + response.id;
        });
        $(target.target).html(htmlstr);
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
function manageError(jqXHR, textStatus, errorThrown, option) {
    var msg;
    if (textStatus === "timeout") {
        msg = "Network timeout. Check your internet connetivity";
    } else {
        msg = "Something unexpected just happened!... Our team are on it alreay! " + textStatus;
    }
    humane.log(msg, {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-error'});
    option = {
        uid: option.uid,
        param: "logError",
        jqXHR: jqXHR,
        textStatus: textStatus,
        errorThrown: errorThrown
    };
    if (textStatus !== "timeout")
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
                    sendData("loadSuggestFriends", {uid: readCookie("user_auth"), target: "#aside-suggest-friends", loadImage: true});
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
                    sendData("loadSuggestCommunity", {uid: readCookie("user_auth"), target: "#aside-suggest-community", loadImage: false});
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
                        sendData("loadGossbag", {uid: readCookie("user_auth"), target: "#gossbag-individual-notification", loadImage: true});
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
                        sendData("loadNavMessages", {uid: readCookie("user_auth"), target: "#message-individual-notification", loadImage: true});
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
                sendData("loadFriends", {uid: readCookie("user_auth"), target: "#toUserInput", loadImage: true});
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
                        sendData("loadComment", {uid: readCookie("user_auth"), target: "#post-comments-" + postId, post_id: postId});
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
    } else if (obj.id === "joinleave") {
        sendData("leaveJoinCommunity", {target: "", uid: readCookie("user_auth"), comid: $("#joinleave-comid").val(), param: $("#joinleave-text").html()})
    } else if ((obj.id).indexOf("unfriend") >= 0) {
        var userIdPos = (obj.id).lastIndexOf("-") + 1;
        var userId = ((obj.id).substring(userIdPos));
        if (!$("#" + obj.id).hasClass("loaded")) {
            $("#" + obj.id).addClass("loaded");
            sendData("sendFriendRequest", {target: "#friend-action-loading", uid: readCookie("user_auth"), user: userId, param: $("#" + obj.id + "-text").html()});
        }
    } else if ((obj.id).indexOf("wink-") >= 0) {
        var userIdPos = (obj.id).lastIndexOf("-") + 1;
        var userId = ((obj.id).substring(userIdPos));
        if (!$("#" + obj.id).hasClass("loaded")) {
            $("#" + obj.id).addClass("loaded");
            if ((obj.id).indexOf("wink-text-") >= 0 || (obj.id).indexOf("wink-text-n-") >= 0) {
                sendData("sendFriendRequest", {target: "#friend-action-loading", uid: readCookie("user_auth"), user: userId, param: "wink", resp: true});
            } else {
                sendData("sendFriendRequest", {target: "#friend-action-loading", uid: readCookie("user_auth"), user: userId, param: "wink"});
            }
        }
    } else if ((obj.id).indexOf("winkIgnore-text") >= 0) {
        var userIdPos = (obj.id).lastIndexOf("-") + 1;
        var userId = ((obj.id).substring(userIdPos));
        if (!$("#" + obj.id).hasClass("loaded")) {
            $("#" + obj.id).addClass("loaded");
            sendData("sendFriendRequest", {target: "#winkOption-" + userId, uid: readCookie("user_auth"), user: userId, param: "ignoreWink"});
        }
    } else if ((obj.id).indexOf("accept-frq-text") >= 0) {
        var text = $("#" + obj.id).html();
        if (text === "Accept" || text === '<span class="icon-16-checkmark"></span>Accept') {
            if (!$("#" + obj.id).hasClass("clicked")) {
                $("#" + obj.id).addClass("clicked");
                var userIdPos = (obj.id).lastIndexOf("-") + 1;
                var userId = ((obj.id).substring(userIdPos));
                sendData("sendFriendRequest", {target: "#" + obj.id, uid: readCookie('user_auth'), user: userId, param: "Accept Request"});
            }
        } else if (text === "Unfriend") {
            if (!$("#" + obj.id).hasClass("clicked")) {
                $("#" + obj.id).addClass("clicked");
                var userIdPos = (obj.id).lastIndexOf("-") + 1;
                var userId = ((obj.id).substring(userIdPos));
                sendData("sendFriendRequest", {target: "#" + obj.id, uid: readCookie('user_auth'), user: userId, param: "Unfriend"});
            }
        }
    } else if ((obj.id).indexOf("frqIgnore-text-") >= 0) {
        var text = $("#" + obj.id).html();
        if (!$("#" + obj.id).hasClass("clicked")) {
            $("#" + obj.id).addClass("clicked");
            var userIdPos = (obj.id).lastIndexOf("-") + 1;
            var userId = ((obj.id).substring(userIdPos));
            sendData("sendFriendRequest", {target: "#" + obj.id, uid: readCookie('user_auth'), user: userId, param: "Ignore"});
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
                sendData("inviteFriends", {uid: readCookie("user_auth"), target: "#toUserInput", loadImage: true, comId: comId});
            }
        }
    } else if ((obj.id).indexOf("invitationIgnore-text") >= 0 || (obj.id).indexOf("invitation-text-") >= 0) {
        alert(obj.id);
        var userIdPos = (obj.id).lastIndexOf("-") + 1;
        var comid = ((obj.id).substring(userIdPos));
        if((obj.id).indexOf("invitationIgnore-text") >= 0){
            sendData("acceptDeclineComInvitation", {uid: readCookie("user_auth"), target: "#invitationtarget", loadImage: true, comId: comid, response: false});
        }else{
            sendData("acceptDeclineComInvitation", {uid: readCookie("user_auth"), target: "#invitationtarget", loadImage: true, comId: comid, response: true});
        }
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
function br2nl(str) {
    return str.replace(/<br\s\/?>/g, "\r");
}