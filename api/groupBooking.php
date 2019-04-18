<?php
    include("../inc/dbconn.php");
    // $user = $_POST[""];
    $sql = " select * from list order by rand() limit 12";
    $result = $conn->query($sql);
    if($result->num_rows > 0){
        while($row=$result->fetch_assoc()){
            $data[]=$row;
            // print_r($data);
        }
    }
    echo json_encode($data);
    
?>

