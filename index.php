<?php
include('inc/dbconn.php');
include('init.inc.php');

$sql1="select * from list where indexBanner='banner2-1'";
$result=$conn->query($sql1);
if($result->num_rows>0){
    while($row=mysqli_fetch_assoc($result)){
        $res1[]=$row;
    }
}
$data['banner21']=$res1;

$sql2="select * from list where indexBanner='banner2-2'";
$result=$conn->query($sql2);
if($result->num_rows>0){
    while($row=mysqli_fetch_assoc($result)){
        $res2[]=$row;
    }
}
$data['banner22']=$res2;

$sql3="select * from list where indexBanner='banner2-3'";
$result=$conn->query($sql3);
if($result->num_rows>0){
    while($row=mysqli_fetch_assoc($result)){
        $res3[]=$row;
    }
}
$data['banner23']=$res3;    

$sql4="select * from list where indexAd='ad1'limit 0,3";
$result=$conn->query($sql4);
if($result->num_rows>0){
    while($row=mysqli_fetch_assoc($result)){
        $res4[]=$row;
    }
}
$data['Ad']=$res4;


$smarty->assign('data',$data);
$smarty->display('index.html');