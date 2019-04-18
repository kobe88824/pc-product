<?php
    include("../inc/dbconn.php");
    $user=$_GET["user"];
    $sql ="update user set name='',tel='',addr1='',addr2='',postal='' where user='{$user}'"; 
    $result = $conn->query($sql);
?>