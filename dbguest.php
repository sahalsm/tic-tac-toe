<?php 
include('dbcon.php');
if(isset($_POST['checking']))
{
    $id =  $_POST['id'];
    $user =  $_POST['user'];
    $nextplayer = 1;
    $server = $_SESSION['server'];
    $clickquery = "SELECT click FROM game_room WHERE server = $server;";
    $clickquery_run = mysqli_query($dbcon,$clickquery);
    if(mysqli_num_rows($clickquery_run)>0)
    {
        foreach($clickquery_run as $row)
        {
            $click = $row['click'];
    
        }
        header('content-type: application/json');
        echo json_encode($resultarray);
    }
    $click += 1;




    if($id == 0)
    {
        $query ="UPDATE game_room SET index0 = $user, nextplayer = $nextplayer,click = $click, refresh = 0  WHERE server = $server;";
        $query_run = mysqli_query($dbcon,$query);
    }
    if($id == 1)
    {
        $query ="UPDATE game_room SET index1 = $user, nextplayer = $nextplayer,click = $click, refresh = 0  WHERE server = $server;";
        $query_run = mysqli_query($dbcon,$query);
    }
    if($id == 2)
    {
        $query ="UPDATE game_room SET index2 = $user, nextplayer = $nextplayer,click = $click, refresh = 0  WHERE server = $server;";
        $query_run = mysqli_query($dbcon,$query);
    }
    if($id == 3)
    {
        $query ="UPDATE game_room SET index3 = $user, nextplayer = $nextplayer,click = $click, refresh = 0  WHERE server = $server;";
        $query_run = mysqli_query($dbcon,$query);
    }
    if($id == 4)
    {
        $query ="UPDATE game_room SET index4 = $user, nextplayer = $nextplayer,click = $click, refresh = 0  WHERE server = $server;";
        $query_run = mysqli_query($dbcon,$query);
    }
    if($id == 5)
    {
        $query ="UPDATE game_room SET index5 = $user, nextplayer = $nextplayer,click = $click, refresh = 0  WHERE server = $server;";
        $query_run = mysqli_query($dbcon,$query);
    }
    if($id == 6)
    {
        $query ="UPDATE game_room SET index6 = $user, nextplayer = $nextplayer,click = $click, refresh = 0  WHERE server = $server;";
        $query_run = mysqli_query($dbcon,$query);
    }
    if($id == 7)
    {
        $query ="UPDATE game_room SET index7 = $user, nextplayer = $nextplayer,click = $click, refresh = 0  WHERE server = $server;";
        $query_run = mysqli_query($dbcon,$query);
    }
    if($id == 8)
    {
        $query ="UPDATE game_room SET index8 = $user, nextplayer = $nextplayer,click = $click, refresh = 0  WHERE server = $server;";
        $query_run = mysqli_query($dbcon,$query);
    }

}
