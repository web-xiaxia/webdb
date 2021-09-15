<?php
include 'MysqlHelper.php';

$mysql_server_name = $_REQUEST['mysql_server_name'];
$mysql_username = $_REQUEST['mysql_username'];
$mysql_password = $_REQUEST['mysql_password'];
$conn_str = $_REQUEST['conn_str'];

$mysqlHelper = new MysqlHelper(
    $conn_str,
    $mysql_server_name,
    $mysql_username,
    $mysql_password
);
echo json_encode($mysqlHelper->getDatabases());
