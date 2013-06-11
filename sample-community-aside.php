<div class="aside">
    <div class="aside-wrapper">
        <div class="profile-pic"><img onload="OnImageLoad(event);" class="holdam" src="images/no-pic.png" id="commPix"></div>
        <table>
            <tr><td colspan="2"><h3 id="commTitle">Loading...</h3></td></tr>
            <tr><td id="comType"><span class="icon-16-lock"></span>Loading...</td></tr>
            <tr><td class="profile-meta" id="commUrl">Loading...</td></tr>
            <tr><td class="profile-meta" id="commDesc">Loading...</td></tr>
        </table>					
        <div class="clear"></div>
        <div class="profile-summary">
            <div class="profile-summary-wrapper"><a><p class="number" id="post_count">0 </p> <p class="type">Posts</p></a></div>
            <div class="profile-summary-wrapper"><a><p class="number" id="mem_count">0 </p> <p class="type">Members</p></a></div>
            <div class="clear"></div>
        </div>
        <div class="clear"></div>
        <button class=" button profile-button" id="joinleave"><span class="icon-16-star"></span> <span id="joinleave-text">Join</span><input type="hidden" id="joinleave-comid" value="0"/></button>
        <span id="otherCommOption"></span>
        <div class="clear"></div>
        
    </div>


    <div class="aside-wrapper">
        <h3>Members</h3>
        <span id="commember-aside">
        </span>
        <script>
            $(document).ready(function() {
                sendData("loadCommunityMembers", {target: "#commember-aside", loadImage: true, comname: '<?php echo $_GET['param'] ?>',start:0, limit:12});
            });
        </script>
        <p class="community-listing">
        <div class="clear"></div>
        <span>
            <span id="showAllCommem"><span class="icon-16-dot"></span><a href="friends">Show all</a></span>
        </span>
        </p>
        <div class="clear"></div>
    </div>
    <?php
    include("suggested-friends.php");
    ?>

    <div class="clear"></div>

</div>	
<div class="clear"></div>
<!--<hr>-->

