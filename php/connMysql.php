<?php
$mysql_server_name= $_REQUEST['mysql_server_name'];
$mysql_username= $_REQUEST['mysql_username'];
$mysql_password= $_REQUEST['mysql_password'];
$db=new mysqli($mysql_server_name,$mysql_username,$mysql_password);
if(mysqli_connect_error()){
    echo "false";
    exit;
}
$db->query("SET NAMES utf8");
$result=$db->query("show databases");
$array=array();
while ($row=$result->fetch_assoc())//循环读出数据
{
    array_push($array,$row['Database']);
}
echo json_encode($array);
$db->close();
