<?php
    include("../inc/dbconn.php");
    $sql = " select listId from list  where Id < 200 order by rand() limit 1";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        while($row=$result->fetch_assoc()){
            $data[]=$row;
        }
    }
    echo json_encode($data);
?>