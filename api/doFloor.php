<?php
    include("../inc/dbconn.php");
    
    // $user = $_GET["user"];
    $floor = $_GET["floor"];

    $sql1 = "select * from list where indexAd='f{$floor}ad' limit 0,1";
    $sql2= "select * from list where floorList='f{$floor}' limit 0,8";

    $result = $conn->query($sql1);
    if ($result->num_rows > 0){
        while($row=mysqli_fetch_assoc($result)){
            $res=$row;
        }
        $data['ad']=$res;
    }

    $result = $conn->query($sql2);
    if ($result->num_rows > 0){
        while($row=mysqli_fetch_assoc($result)){
            $res2[]=$row;
        }
        $data['fr']=$res2;
    }


    echo json_encode($data);
?>