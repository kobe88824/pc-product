<?php
    include('../inc/dbconn.php');
    $page = $_GET['page'];
    $start = ($page-1)*5;
    $sql = "select * from newpro order by Id limit $start,5";
    $result = $conn->query($sql);
    if ($result->num_rows>0) {
        while ($row =mysqli_fetch_assoc($result)) {
           $list[]=$row;
        }
        $date['list']=$list;
        $date['success']=1;
    }else{
        $date['success']=0;
    }
    echo json_encode($date);
?>