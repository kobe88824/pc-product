<?php
    include("../inc/dbconn.php");

    $user = $_POST["user"];
    $pw = $_POST["pwd"];
    $PM=$_POST["PM"];
    $n=$_POST["n"];

    if($n==1){
        $sql="select * from user where phone=$PM";
        $result = $conn->query($sql);
        if($result->num_rows!=0){
            $data["code"] = 2;
        }else{
            $data["code"] = 0;
        }
        echo json_encode($data);
    }elseif($n==2){
        $sql2 = "insert into user (user,password,phone) values('$user','$pw','$PM')";
        $result = $conn->query($sql2);
        if ($conn->affected_rows){
            $data["code"] = 0;
        }else{
            $data["code"] = 1;
        }
        echo json_encode($data);
    }
?>