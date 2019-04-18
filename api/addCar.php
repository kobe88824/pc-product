<?php
    include("../inc/dbconn.php");
    $listId=$_GET['listId'];
    $user = $_GET["user"];
    $listNum = $_GET["listNum"];
    $listSize = $_GET["listSize"];
    $listColor = $_GET["listColor"];
    $sql = " insert into car (listId,user,listNum,listSize,listColor) values ('$listId','$user','$listNum','$listSize','$listColor')";
    $result = $conn->query($sql);
?>