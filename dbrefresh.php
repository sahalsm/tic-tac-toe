<?php 
include('dbcon.php');

if(isset($_POST['checking']))
{
    $server = $_SESSION['rval'];
    $nextplayer = mt_rand(0,1);
    $refreshquery = "UPDATE game_room SET nextplayer = $nextplayer,click = 0,refresh = 1, index0 = NULL, index1 =NULL, index2 = NULL , index3 = NULL , index4 =NULL , index5 = NULL ,
     index6 = NULL, index7 = NULL , index8 = NULL WHERE server = $server";
    $refreshquery_run = mysqli_query($dbcon,$refreshquery);

}
