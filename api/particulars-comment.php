<?php
    include("../inc/dbconn.php");
    $p=$_GET['page'];
    $statr=($p-1)*20;
    $sql="select * from review limit $statr,20";
    $sql2="select * from review";
    $result = $conn->query($sql);
    $result2 = $conn->query($sql2);
    $n = $result2->num_rows;
 if ($result->num_rows > 0){
     while($row=$result->fetch_assoc()){
         $list[]=$row;
     }
     $data = array("list"=>$list,"num"=>$n);
 }
 echo json_encode($data);
?>
