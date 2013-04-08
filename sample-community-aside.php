<div class="aside">
    <div class="aside-wrapper">
        <img class="profile-pic" src="images/no-pic.png" id="commPix">
        <table>
            <tr><td colspan="2"><h3 id="commTitle">Loading...</h3></td></tr>
            <tr><td id="comType"><span class="icon-16-lock"></span>Loading...</td></tr>
            <tr><td class="profile-meta" id="commDesc">Loading...</td></tr>
        </table>					
        <div class="clear"></div>
        <div class="profile-summary">
            <div class="profile-summary-wrapper"><a href=""><p class="number" id="post_count">0 </p> <p class="type">Posts</p></a></div>
            <div class="profile-summary-wrapper"><a href="communities"><p class="number" id="mem_count">0 </p> <p class="type">Members</p></a></div>
            <div class="clear"></div>
        </div>
        <div class="clear"></div>

        <button class=" button profile-button" id="joinleave"><span class="icon-16-star"></span> <span id="joinleave-text">Join</span><input type="hidden" id="joinleave-comid" value="0"/></button>
        <button class=" button profile-button" id="loadCommore">More<span class="icon-16-arrow-down"></span>
            <div class="more-container" id="pop-up-community-more">
                <div class="more">
                    <ul>
                        <li><a href=""><span class="icon-16-user-add"></span> Invite Members</a></li>
                        <li><a href=""><span class="icon-16-star"></span> Favourite</a></li>
                        <li><a href=""><span class="icon-16-star-empty"></span> Un-Favourite</a></li>
                        <hr>
                        <li><a href=""><span class="icon-16-sound-off"></span> Mute</a></li>
                        <li><a href=""><span class="icon-16-trash"></span> Leave</a></li>
                    </ul>
                </div>
            </div>

        </button>

        <div class="clear"></div>
    </div>


    <div class="aside-wrapper">
        <h3>Members</h3>
        <span id="commember-aside">
        </span>
        <script>
            $(document).ready(function() {
                sendData("loadCommunityMembers", {target: "#commember-aside", comname: '<?php echo $_GET['param'] ?>'});
            });
        </script>
        <p class="community-listing">
            <span>
                <span><span class="icon-16-dot"></span><a href="friends">Show all</a></span>
            </span>
        </p>
    </div>
    <?php
    include("suggested-friends.php");
    ?>
    <div class="aside-wrapper">
        <h3>Trends</h3>
        <p><a>#newGossout</a></p>
        <p><a>#newGossout</a></p>
        <p><a>#newGossout</a></p>
        <p><a>#newGossout</a></p>
        <p><a>#newGossout</a></p>
        <p class="community-listing">
            <span>
                <span><span class="icon-16-dot"></span><a href="">Show all</a></span>
            </span>
        </p>
    </div>

    <div class="clear"></div>
</div>	
<div class="clear"></div>
