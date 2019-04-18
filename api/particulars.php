<?php
    include("../inc/dbconn.php");
    $p=$_GET['p'];
    $statr=($p-1)*4;
    $sql="select * from particulars limit $statr,4";
    $result = $conn->query($sql);
 if ($result->num_rows > 0){
     while($row=$result->fetch_assoc()){
         $data[]=$row;
     }
 }
 echo json_encode($data);
?>