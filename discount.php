<?php
include('inc/dbconn.php');
include('init.inc.php');

$sql = "select categoryName2,categoryType2 from discount where Id<18 and categoryType2 !='10001'";
$result=$conn->query($sql);
if ($result->num_rows > 0){
    while($row=mysqli_fetch_assoc($result)){
        $data[]=$row;
    }
}
// print_r($data);
$smarty->assign('list',$data);
$smarty->display('discount.html');