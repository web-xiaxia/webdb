<?php
$mysql_server_name= $_REQUEST['mysql_server_name'];
$mysql_username= $_REQUEST['mysql_username'];
$mysql_password= $_REQUEST['mysql_password'];
$mysql_database= $_REQUEST['mysql_database'];
$mysql_table=$_REQUEST['mysql_table'];
$db=new mysqli($mysql_server_name,$mysql_username,$mysql_password,$mysql_database);
if(mysqli_connect_error()){
    echo "false";
    exit;
}
$db->query("SET NAMES utf8");
$sql=" show columns from   ".$mysql_table;
$result=$db->query($sql);
$array=array();
while ($row=$result->fetch_assoc())//循环读出数据
{
    array_push($array,$row);
}
echo json_encode($array);
$db->close();