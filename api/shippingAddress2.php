<?php
    include("../inc/dbconn.php");
    $user=$_GET["user"];
    $sql = " select * from user where user='{$user}'";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        while($row=$result->fetch_assoc()){
            $data[]=$row;
            // print_r($data);
        }
    }
    echo json_encode($data);
?>