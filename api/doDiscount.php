<?php
    include("../inc/dbconn.php");

    $style = $_GET["style"];
    if($style==1){
        $user = $_GET["user"];
        $sql = "select categoryName2,categoryType2 from discount where Id<18";
        $result = $conn->query($sql);
        if ($result->num_rows > 0){
            while($row=mysqli_fetch_assoc($result)){
                $res[]=$row;
            }
            $data['data']=$res;
            $data["code"] = 0;
        }else{
            $data["code"] = 1;
        }
        echo json_encode($data);
    }elseif($style==2){
        $user = $_GET["user"];
        $categoryType2 = $_GET["categoryType2"];
        $type = $_GET["type"];
        $page=$_GET["page"]*30;
        if( $categoryType2=='all'){
            if($type==0){
                $sql = "select * from discount where Id>=18";
            }else{
                $sql = "select * from discount where type='$type' and Id>=18";
            }
            $n=$conn->query($sql)->num_rows;
            if($type==0){
                $sql2 = "select * from discount where Id>=18 limit $page,30";
            }else{
                $sql2 = "select * from discount where type='$type' and Id>=18 limit $page,30";
            }
        }else{
            if($type==0){
                $sql = "select * from discount where categoryType like '%{$categoryType2}%' and Id>=18";
            }else{
                $sql = "select * from discount where type='$type' and categoryType like '%{$categoryType2}%' and Id>=18";
            }
            $n=$conn->query($sql)->num_rows;
            if($type==0){
                $sql2 = "select * from discount where categoryType like '%$categoryType2%' and Id>=18 limit $page,30";
            }else{
                $sql2 = "select * from discount where type='$type' and categoryType like '%{$categoryType2}%' and Id>=18 limit $page,30";
            }
        }
        
        $result2 = $conn->query($sql2);
        if ($result2->num_rows > 0){
            while($row=mysqli_fetch_assoc($result2)){
                $res[]=$row;
            }
            $data["code"] = 0;
            $data['data']=$res;
            $data['len']=$n;
        }else{
            $data["code"] = 1;
            $data['len']=$n;
        }
        
        echo json_encode($data);
    }
    
?>