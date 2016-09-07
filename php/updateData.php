<?php
$mysql_server_name= $_REQUEST['mysql_server_name'];
$mysql_username= $_REQUEST['mysql_username'];
$mysql_password= $_REQUEST['mysql_password'];
$mysql_database= $_REQUEST['mysql_database'];
$sql= $_REQUEST['sql'];
$db=new mysqli($mysql_server_name,$mysql_username,$mysql_password,$mysql_database);
if(mysqli_connect_error()){
    echo "false";
    exit;
}
//echo $sql;
$db->query("SET NAMES utf8");
$num=$db->multi_query($sql);
echo json_encode($num);
$db->close();