<?php
$mysql_server_name= $_REQUEST['mysql_server_name'];
$mysql_username= $_REQUEST['mysql_username'];
$mysql_password= $_REQUEST['mysql_password'];
$mysql_database= $_REQUEST['mysql_database'];
$db=new mysqli($mysql_server_name,$mysql_username,$mysql_password,$mysql_database);
if(mysqli_connect_error()){
    echo "false";
    exit;
}
$db->query("SET NAMES utf8");
$result=$db->query("select table_name from information_schema.tables where table_schema='".$mysql_database."' and  table_type='base table'");
$array=array();
while ($row=$result->fetch_assoc())//循环读出数据
{
    array_push($array,$row['table_name']);
}
echo json_encode($array);
$db->close();