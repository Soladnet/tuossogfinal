
<link rel="shortcut icon" href="favicon.ico">

<script type="text/javascript" src="scripts/jquery.fancybox.pack.js?v=2.1.4"></script>
<script src="scripts/jquery.sticky.js"></script>
<link rel="stylesheet" media="screen" href="css/style.css?v=1.4.1">
<link rel="stylesheet" href="css/hint.min.css">
<script type="text/javascript" src="scripts/modernizr.custom.77319.js"></script>
<meta name="description" content="Start or join existing communities/interests on Gossout and start sharing pictures and videos. People use Gossout search, Discover and connect with communities">
<meta name="keywords" content="Community,Communities,Interest,Interests,Friend,Friends,Connect,Search,Discover,Discoveries,Gossout,Gossout.com,Zuma Communication Nigeria Limited,Soladnet Software,Soladoye Ola Abdulrasheed, Muhammad Kori,Ali Sani Mohammad,Lagos,Nigeria,Nigerian,Africa,Surulere,Pictures,Picture,Video,Videos,Blog,Blogs">
<meta name="author" content="Soladnet Sofwares, Zuma Communication Nigeria Limited">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" > 
<script>
    $(function() {
        $("#show-suggested-friends,#show-suggested-community,#gossbag-text,#messages-text,#gossbag-close,#messages-close,#user-actions,#user-more-option,#show-full-profile,#search,#search-close,#new-message-btn,#loadCommore,#joinleave").click(function() {
            showOption(this);
        });
        $.ajaxSetup({
            url: 'tuossog-api-json.php',
            dataType: "json",
            type: "POST",
            error: function(jqXHR, textStatus, errorThrown) {
                manageError(jqXHR, textStatus, errorThrown);
            },
            data: {
                uid: readCookie("user_auth")
            },
            timeout: 1000 * 60 * 10
        });
        if (Modernizr.inlinesvg) {
            $('#logo').html('<img src="images/gossout-logo-text-svg.svg" alt="Gossout" />');
        } else {
            $('#logo').html('<img src="images/gossout-logo-text-svg.png" alt="Gossout" />');
        }
        $("#nav-user").sticky({topSpacing:-4});
    });
</script>
<script type="text/javascript" src="scripts/script.js?v=1.7.6"></script>