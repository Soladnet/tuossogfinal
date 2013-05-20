<div class="post-box" id="post-box">
    <form method="POST" action="tuossog-api-json.php" id="timelineForm">
        <textarea required placeholder="Share your interest here" name="post" id="postText"></textarea>
        <div class="button"><span class="icon-globe" id="community-select-list"></span>	
            <select data-placeholder="Select Community" class="chzn-select" multiple name="comid[]"> 
                <option></option>
                <?php
                $comm = $userCommunity->userComm(0,10000);
                if($comm['status']){
                    foreach ($comm['community_list'] as $com){
                        echo "<option value='$com[id]'>$com[name]</option>";
                    }
                }
                ?>
                
            </select>
        </div>
        <input type="submit" class="submit button float-right" value="Post" id="postBtn">
        <input type="hidden" id="hiddenComm">
        <input type="file" name="photo[]" multiple style="position: absolute;left: -9999px;" id="uploadInput"/>
        <div class="button hint hint--left  float-right" data-hint="Upload image" id="uploadImagePost"><span class="icon-16-camera"></span></div>
        <div class="progress" style="display:none"><div class="bar"></div ><div class="percent">0%</div></div><div id="status"></div>
    </form>
    <div class="clear"></div>
</div>