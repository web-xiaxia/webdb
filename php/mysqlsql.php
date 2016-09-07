<?php
    $sql= $_REQUEST['sql'];
    $mysql_server_name="localhost"; //数据库服务器名称
    $mysql_username="root"; // 连接数据库用户名
    $mysql_password=""; // 连接数据库密码
    $mysql_database="rap_db"; // 数据库的名字
    $db=new mysqli($mysql_server_name,$mysql_username,$mysql_password,$mysql_database);

    if(mysqli_connect_error()){
        $resultObj.setMessage("数据库连接失败");
    exit;
    }
    $db->query("SET NAMES utf8");
    $result=$db->query($sql);
    $array=array();
    while ($row=$result->fetch_assoc())//循环读出数据
    {
        array_push($array,$row);
    }
    echo json_encode($array);
$db->close();


