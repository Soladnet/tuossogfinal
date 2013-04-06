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

}
function loadNavMessages(response, statusText, target) {
    var htmlstr = "";
    var converPhoto;
    if (target.cw !== undefined) {
        $("#messageTitle").html('<a href="#">' + response.cwn + ' <span class="icon-16-chat"></span></a><hr>');
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
        $.each(response.conversation, function(i, response) {
            if (target.uid === response.sender_id) {
                htmlstr += '<div class="individual-message-box"><p><span class="all-messages-time timeago" title="' + response.time + '"> ' + response.time + ' </span>' +
                        '</p><img class= "all-messages-image" src="' + (converPhoto.nophoto ? converPhoto.alt : (response.s_username === target.cw ? converPhoto[response.s_username].thumbnail : converPhoto[response.s_username].thumbnail)) + '"><div class="all-messages-text">' +
                        '<a href=""><h3>' + (response.s_username === target.cw ? response.s_firstname.concat(' ', response.s_lastname) : response.s_firstname.concat(' ', response.s_lastname)) + ' </h3></a>' +
                        '<div class="all-messages-message"><span class="icon-16-reply"></span> <p>' + response.message + '</p><!--<br><span class="post-meta-delete"><span class="icon-16-trash"></span><span>Delete</span></span>--></div></div></div>';
            } else {
                htmlstr += '<div class="individual-message-box"><p><span class="all-messages-time timeago" title="' + response.time + '"> ' + response.time + ' </span>' +
                        '</p><img class= "all-messages-image" src="' + (converPhoto.nophoto ? converPhoto.alt : (response.s_username === target.cw ? converPhoto[response.s_username].thumbnail : converPhoto[response.s_username].thumbnail)) + '"><div class="all-messages-text">' +
                        '<a href=""><h3>' + (response.s_username === target.cw ? response.s_firstname.concat(' ', response.s_lastname) : response.s_firstname.concat(' ', response.s_lastname)) + ' </h3></a>' +
                        '<div class="all-messages-message"><p>' + response.message + '</p></div></div></div>';
            }

        });
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
                            '<a class="all-messages-actions"><span class="icon-16-cross"></span>Delete</a>' +
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
    }, 30000);
}
function loadCommunity(response, statusText, target) {
    if (!response.error) {
        var htmlstr = "";
        var comid = "";
        var isAmember;
        if (target.loadAside) {
            $.each(response, function(i, response) {
                $("#commTitle").html(response.name);
                $("#commDesc").html(response.description);
                $("#comType").html((response.type === "Private" ? '<span class="icon-16-lock"></span>' : '') + response.type);
                $("#joinleave").html(response.isAmember === "true" ? '<span class="icon-16-star"></span> Leave' : '<span class="icon-16-star"></span> Join');
                $("#mem_count").html(response.mem_count);
                $("#post_count").html(response.post_count);
                document.getElementById("commPix").src = response.pix;
                document.getElementById("commPix").width = 150;
                if (response.isAmember === "true") {
                    isAmember = "true";
                    comid = response.id;
                    htmlstr += '<div class="posts"><h1>' + response.name + '</h1><div class="post-box">' +
                            '<form method="POST" action="tuossog-api-json.php" id="com-' + response.id + '"><textarea required placeholder="Post to a community" name="post" id="post' + response.id + '"></textarea><div class="group-1 button">' +
                            '</div><input type="submit" class="submit button float-right" value="Post">' +
                            '<input type="file" name="photo[]" multiple/>' +
                            '<div class="button hint hint--left  float-right" data-hint="Upload image"><span class="icon-16-camera"></span></div></form>' +
                            '<div class="clear"></div></div><span id="loadPost"></span></div><script>sendData("loadPost",{target:"#loadPost",uid:readCookie("user_auth"),comid:"' + response.id + '"})</script>';
                } else {
                    htmlstr += '<div class="posts"><h1>' + response.name + '</h1><hr/><span id="loadPost"></span></div><script>sendData("loadPost",{target:"#loadPost",uid:readCookie("user_auth"),comid:"' + response.id + '"})</script>';
                }

            });
            if (htmlstr !== "") {
                $(target.target).html(htmlstr);
                if (isAmember === "true") {
                    $("#com-" + comid).ajaxForm({
                        beforeSubmit: function(formData, jqForm, options) {
//                            var postIdPos = (jqForm.attr('id')).lastIndexOf("-") + 1;
//                            var postId = ((jqForm.attr('id')).substring(postIdPos));
//                            var msg = $('#post' + comid).val();
                        },
                        success: function(responseText, statusText, xhr, $form) {
                            if (responseText.id !== 0) {
                                var msg = $('#post' + comid).val();
                                var str = '<div class="post"><div class="post-content"><pre><p>' + (htmlencode(msg)) + '</p></pre><hr><h3 class="name">' + responseText.name +
                                        '<div class="float-right"><span class="post-time"><span class="icon-16-comment"></span>0 </span>' +
//                    '<span class="post-time"><span class="icon-16-share"></span>24</span>' +
                                        '<span class="post-time"><span class="icon-16-clock"></span><span class="timeago" title="' + responseText.time + '">' + responseText.time + '</span></span>' +
                                        '</div></h3></div><hr><div class="post-meta">' +
                                        '<span id="post-new-comment-show-' + responseText.id + '" class=""><span class="icon-16-comment"></span>Comment </span>' +
//                    '<span class="post-meta-gossout"><span class="icon-16-share"></span><a class="fancybox " id="inline" href="#share-123456">Share</a></span>' +
//                    '<span class="post-meta-delete"><span class="icon-16-trash"></span>Delete</span>'+
                                        '<div class="post-comments" id="post-comments-' + responseText.id + '">' +
                                        '</div><div class="post-new-comment" id="post-new-comment-' + responseText.id + '">' +
                                        '<form method="POST" action="tuossog-api-json.php?pid=' + responseText.id + '" id="post-new-comment-form-' + responseText.id + '"><img class="post-thumb" src="images/snip.jpg"><span><textarea type="text" class="comment-field" required placeholder="Add comment..." name="comment" id="input-' + responseText.id + '"></textarea></span>' +
                                        '<input type="submit" class="submit" value="Comment"><div class="clear"></div></form></div></div></div>';
                                $("#loadPost").html(str + $("#loadPost").html());
                                prepareDynamicDates();
                                $(".timeago").timeago();
                            }
                            $("#com-" + comid).clearForm();
                        },
                        complete: function(response, statusText, xhr, $form) {
                        },
                        data: {
                            param: "post",
                            uid: readCookie("user_auth"),
                            comid: comid
                        }
                    });
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
                            '<img src="' + response.pix + '">' +
                            '</div><div class="community-text"><div class="community-name">' +
                            '<a href="' + response.unique_name + '">' + response.name + '</a> </div><hr><div class="details">' + response.description +
                            '</div><div class="members">' + response.type + '</div><div class="members">200 Members</div><div class="members">200 Posts</div></div><div class="clear"></div></div>';
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
                $(target.target).html("No community found!");
            }
        } else {
            humane.log(response.error.message, {timeout: 20000, clickToClose: true, addnCls: 'humane-jackedup-error'});
        }
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
            $(target.target).html("<p>Opps! We cannot suggest community to you at the moment. <a href='communities'>Start your own community</a>.</p>");
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
            htmlstr += '<div class="post"><div class="post-content"><p>' + responseItem.post + '</p><hr><h3 class="name">' + responseItem.firstname.concat(' ', responseItem.lastname) +
                    '<div class="float-right"><span class="post-time"><span class="icon-16-comment"></span>' + responseItem.numComnt + ' </span>' +
//                    '<span class="post-time"><span class="icon-16-share"></span>24</span>' +
                    '<span class="post-time"><span class="icon-16-clock"></span><span class="timeago" title="' + responseItem.time + '">' + responseItem.time + '</span></span>' +
                    '</div></h3></div><hr><div class="post-meta">' +
                    '<span id="post-new-comment-show-' + responseItem.id + '" class=""><span class="icon-16-comment"></span>Comment </span>' +
//                    '<span class="post-meta-gossout"><span class="icon-16-share"></span><a class="fancybox " id="inline" href="#share-123456">Share</a></span>' +
//                    '<span class="post-meta-delete"><span class="icon-16-trash"></span>Delete</span>'+
                    '<div class="post-comments" id="post-comments-' + responseItem.id + '">' +
                    '</div><div class="post-new-comment" id="post-new-comment-' + responseItem.id + '">' +
                    '<form method="POST" action="tuossog-api-json.php?pid=' + responseItem.id + '" id="post-new-comment-form-' + responseItem.id + '"><!--<img class="post-thumb" src="images/snip.jpg">--><span><textarea type="text" class="comment-field" required placeholder="Add comment..." name="comment" id="input-' + responseItem.id + '"></textarea></span>' +
                    '<input type="submit" class="submit" value="Comment"><div class="clear"></div></form></div></div></div>';
            if (i > 0) {
                toggleId += ",";
                formBox += ",";
            }
            toggleId += "#post-new-comment-show-" + responseItem.id;
            formBox += "#post-new-comment-form-" + responseItem.id;
        });
        $(target.target).html(htmlstr);
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
        $(target.target).html('<div class="post "><div class="post-content"><p>No Post Found.</p></div></div>');
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
        var htmlstr = "";
        $.each(response, function(i, responseItem) {
            if (target.target === "#aside-friends-list") {
                htmlstr += '<a class= "fancybox " id="inline" href="#' + responseItem.username + '">' +
                        '<img class= "friends-thumbnails" src="' + (responseItem.photo.nophoto ? responseItem.photo.alt : responseItem.photo.thumbnail) + '">' +
                        '<div style="display:none"><div id="' + responseItem.username + '"><div class="aside-wrapper">' +
                        '<img class="profile-pic" src="' + (responseItem.photo.nophoto ? responseItem.photo.alt : responseItem.photo.thumbnail) + '"><table><tr><td></td><td>' +
                        '<h3>' + responseItem.firstname.concat(" ", responseItem.lastname) + '</h3></td></tr><tr><td><span class="icon-16-map"></span></td><td class="profile-meta">' + responseItem.location + '</td></tr>' +
                        '<tr><td><span class="icon-16-' + (responseItem.gender === "M" ? "male" : "female") + '"></span></td><td class="profile-meta">' + (responseItem.gender === "M" ? "Male" : "Female") + '</td></tr>' +
                        '<tr><td><span class="icon-16-dot"></span></td><td class="profile-meta"><a href="">See Profile</a> </td></tr></table>' +
                        '<div class="clear"></div><button class="profile-meta-functions button"><span class="icon-16-eye"></span> Wink</button>' +
                        '<button class="profile-meta-functions button"><span class="icon-16-mail"></span> Send Message</button>' +
                        '<button class="profile-meta-functions button"><span class="icon-16-checkmark"></span> Accept Friendship</button>' +
                        '<div class="clear"></div></div></div></div></a>';
            } else {
                if (target.target === "#toUserInput") {
                    htmlstr += '<option value="' + responseItem.id + '">' + responseItem.firstname.concat(' ', responseItem.lastname) + '</option>';
                }
            }
        });
        if (target.target === "#toUserInput") {
            var str = '<select data-placeholder="enter contact" class="chzn-select" multiple style="width:350px;" name="user[]" id="user_callup"><option value=""></option>' + htmlstr + '</select>';
            $(target.target).html(str);
            $(".chzn-select").chosen({max_selected_options: 1});
        } else {
            $(target.target).html(htmlstr);
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
    if (!response.error) {
        var htmlstr = "";
        $.each(response, function(i, response) {
            htmlstr += '<div class="individual-friend-box"><a class= "fancybox" id="inline" href="#' + response.username + '"><div class="friend-image">';
            if (response.photo.id) {
                htmlstr += '<img src = "' + (response.photo.thumbnail === "" ? response.photo.original : response.photo.thumbnail) + '" >';
            } else {
                htmlstr += '<img src = "' + response.photo.nophoto + '" >';
            }
            htmlstr += '</div><div class="friend-text"><div class="friend-name">' + response.firstname.concat(" ", response.lastname) + '</div>' +
                    '<div class="friend-location">' + response.location + '</div></div>';
            htmlstr += '<div style="display:none"><div id="' + response.username + '"><div class="aside-wrapper">';
            if (response.photo.id) {
                htmlstr += '<img class="profile-pic" src = "' + (response.photo.thumbnail === "" ? response.photo.original : response.photo.thumbnail) + '" >';
            } else {
                htmlstr += '<img class="profile-pic" src = "' + response.photo.nophoto + '" >';
            }
//
            htmlstr += '<div class="clear"></div><table><tr><td></td><td><h3>' + response.firstname.concat(" ", response.lastname) + '</h3></td></tr>' +
                    '<tr><td><span class="icon-16-map"></span></td><td class="profile-meta"> ' + (response.location !== "" ? response.location : "Location not set") + '</td></tr>' +
                    '<tr><td><span class="icon-16-' + (response.gender === "M" ? "male" : "female") + '"></span></td><td class="profile-meta"> ' + (response.gender === "M" ? "Male" : "Female") + '</td></tr>' +
//                    '<tr><td><span class="icon-16-dot"></span></td><td class="profile-meta"><a href="#">See Profile</a> </td></tr>' +
                    '</table><div class="profile-summary profile-summary-width"><div class="profile-summary-wrapper">' +
                    '<a href=""><p class="number">50 </p> <p class="type">Posts</p></a></div>' +
                    '<div class="profile-summary-wrapper"><a href="communities"><p class="number">30 </p> <p class="type">Communities</p></a></div>' +
                    '<div class="profile-summary-wrapper"><a href="friends"><p class="number">50 </p> <p class="type">Friends</p></a></div>' +
                    '<div class="clear"></div></div>' +
                    '<button class="profile-meta-functions button"><span class="icon-16-eye"></span> Wink</button>' +
                    '<div class="clear"></div></div></div></div>';
            htmlstr += '</a></div>';
        });
        $(target.target).html(htmlstr);
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
        msg = "Something unexpected just happened!... Our team are on it alreay!";
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
        $("#pop-up-gossbag").toggle();
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