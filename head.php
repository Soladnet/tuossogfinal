<link rel="shortcut icon" href="favicon.ico">

<script type="text/javascript" src="scripts/jquery.fancybox.pack.js?v=2.1.4"></script>
<link rel="stylesheet" media="screen" href="css/style.css">
<link rel="stylesheet" href="css/hint.min.css">

<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" > 
<script>
    $(function() {
        $("#show-suggested-friends,#show-suggested-community,#gossbag-text,#messages-text,#gossbag-close,#messages-close,#user-actions,#user-more-option,#show-full-profile,#search,#search-close,#new-message-btn,#loadCommore,#joinleave").click(function() {
            showOption(this);
        });
        $.ajaxSetup({
            url: 'tuossog-api-json.php',
            dataType: "json",
            timeout: 30000,
            type: "post",
            error: function(jqXHR, textStatus, errorThrown) {
                manageError(jqXHR, textStatus, errorThrown, {uid: readCookie("user_auth")});
            }
        });
    });
</script>
<script type="text/javascript" src="scripts/script.js?v=1.1"></script>