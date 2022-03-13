<?php 
include('dbcon.php');
$server = $_SESSION['server'];
$fetchquery = "SELECT nextplayer,click,refresh,index0,index1,index2,index3,index4,index5,index6,index7,index8 FROM game_room WHERE server = $server;";
$fetchquery_run = mysqli_query($dbcon,$fetchquery);
$resultarray = [];
if(mysqli_num_rows($fetchquery_run)>0)
{
    foreach($fetchquery_run as $row)
    {
        array_push($resultarray,$row);

    }
    header('content-type: application/json');
    echo json_encode($resultarray);
}
?>