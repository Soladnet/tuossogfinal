<?php
session_start();
//print_r($_SESSION);
?>
<!doctype html>
<html>
    <head>
        <?php
        include_once './webbase.php';
        ?>
        <title>Gossout - Login</title>
        <?php
        include ("head.php");
        if (isset($_SESSION['login_error']) && isset($_GET['login_error'])) {
//            exit;
            ?>
            <link rel="stylesheet" href="css/bigbox.css">
            <script type="text/javascript" src="scripts/humane.min.js"></script>
            <script>
                humane.log("Login failed", {timeout: 10000, clickToClose: true, addnCls: 'humane-bigbox-error'});
            </script>
            <?php
        }
        ?>
    </head>
    <body>
        <div class="index-page-wrapper">	
            <div class="index-nav">
                <span class="index-login">No account? <a href="signup-personal">Signup Here!</a></span>
                <div class="clear"></div>
            </div>
            <div class="index-banner">
                <div class="index-logo">
                    <img src="images/gossout-logo-text-and-image-svg.svg" alt="logo" >
                </div>
            </div>
            <div class="index-intro">


                <div class="index-intro-2">
                    <div class="registration">
                        <div class="index-intro-1">
                            <h1>
                                We knew you'd come back ;) How've you been?
                            </h1>
                            <hr>
                        </div>
                        <form action="login_exec" method="post">
                            <ul>
                                <li>
                                    <label for="email">e-mail Address</label>
                                    <input class="input-fields" name="email" placeholder="email@awesome.com" type="text" value="" spellcheck="false" required/>
                                </li>
                                <li>
                                    <label for="password">Password</label>
                                    <input class="input-fields" name="password" placeholder="******" type="password" value="" spellcheck="false" required/>
                                </li>
                                <li><input type="checkbox" name="remember" value="TRUE"> Remember me</li>
                            </ul>
                            <button class="button-big">Login</button>
                            <p class="float-right"><a href="password-recovery">Forgot Password?...</a></p>
                            <div class="clear"></div>						
                        </form>
                        <div class="clear"></div>
                    </div>
                </div>
            </div>
            <div class="index-content-wrapper">
                <?php
                include("footer.php");
                ?>
            </div>

        </div>
    </body>
</html>
<?php
unset($_SESSION['login_error']);
?>