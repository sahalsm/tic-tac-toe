<?php include('include/header.php');
      include('dbcon.php');

?>

<div class="container">
    <h2 id="statusText">Let's Play</h2>

    <?php if (!isset($_GET['id'])) { ?>
        <button class="btn btn-primary " id="restartbutton">Restart</button>
        <?php

        $rval = mt_rand(1000, 9999);
        $host = 2;
        $_SESSION['rval'] = $rval;
        $_SESSION['user'] = $host;
        $query = "INSERT into game_room (server,status) VALUES('$rval','0');";
        $query_run = mysqli_query($dbcon, $query);
        if ($query_run) {  ?>
            <label for="">Share this link and ask your friend to join.</label>
            <input type="text" id="link" value="<?php echo 'http://localhost/project/tic-tac-toe/onlinegame.php?id='; ?>">
            <button class="btn btn-primary " onclick="share()" id="sharebutton">Copy link</button>
            <script>
                function share() {
                    var copyText = document.getElementById("link");
                    copyText.select();
                    copyText.setSelectionRange(0, 99999)
                    document.execCommand("copy");
                    alert("Copied the text: " + copyText.value);
                }
            </script>
    <?php }
    } ?>

    <?php if (isset($_GET['id'])) {
        $serverid = $_GET['id'];
        $guest = 3;
        $_SESSION['server'] = $serverid;
        $servercheck = "SELECT status FROM game_room WHERE server = '$serverid';";
        $servercheck_run = mysqli_query($dbcon, $servercheck);
        while ($data = mysqli_fetch_array($servercheck_run)) {
            $statuscheck = $data['status'];
        }
        if ($statuscheck == 1) {
            header('Location: serverbusy.php');
            echo "serverbusy";
        } else {
            $upquery = "UPDATE game_room SET status = '1' WHERE server ='$serverid';";
            $upquery_run = mysqli_query($dbcon, $upquery);
        }
    }



    ?>
    <div class="row">
        <div class="col-md-12 ">
            <div id="gameboard">
                <div class="box" id="0"></div>
                <div class="box" id="1"></div>
                <div class="box" id="2"></div>
                <div class="box" id="3"></div>
                <div class="box" id="4"></div>
                <div class="box" id="5"></div>
                <div class="box" id="6"></div>
                <div class="box" id="7"></div>
                <div class="box" id="8"></div>
            </div>
        </div>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>

<?php if (!isset($_GET['id'])) { ?>

    <script src="./public/js/onlinejavascript.js"></script>

<?php  } ?>
<?php if (isset($_GET['id'])) { ?>

    <script src="./public/js/onlinejavascriptguest.js"></script>

<?php  } ?>




<?php include('include/footer.php'); ?>