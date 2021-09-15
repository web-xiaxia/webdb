<?php
include 'MysqlHelper.php';

$conn_str = $_REQUEST['conn_str'];
$mysql_database = $_REQUEST['mysql_database'];

$mysqlHelper = new MysqlHelper(
    $conn_str
);

echo json_encode($mysqlHelper->getTables($mysql_database));