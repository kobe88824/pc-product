<?php
    include("../inc/dbconn.php");

    $user = $_POST["user"];
    $attribute = $_POST["attribute"];
    $reviewDay=$_POST["reviewDay"];
    $reviewContent=$_POST["reviewContent"];
    $prdId=$_POST["prdId"];
   

    $sql = "insert into review (user,attribute,reviewDay,reviewContent,prdId) values('$user','$attribute','$reviewDay','$reviewContent','$prdId')";
    // $sql="select * from admin";
    $result = $conn->query($sql);

    if ($conn->affected_rows){
            $data["code"] = 0;
        }else{
            $data["code"] = 1;
        }
    echo json_encode($data);
?>