<?php
    include("../inc/dbconn.php");
    $user=$_GET["user"];
    $name=$_GET["name"];
    $tel=$_GET["tel"];
    $addr1=$_GET["addr1"];
    $addr2=$_GET["addr2"];
    $postal=$_GET["postal"];
    // echo $user;
    // echo $name;
    // echo $tel;
    // echo $addr1;
    // echo $addr2;
    // echo $postal;
    $sql ="update user set name='{$name}',tel='{$tel}',addr1='{$addr1}',addr2='{$addr2}',postal='{$postal}' where user='{$user}'"; 
    $result = $conn->query($sql);

?>