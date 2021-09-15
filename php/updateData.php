<?php
include 'MysqlHelper.php';
$conn_str = $_REQUEST['conn_str'];
$mysql_database = $_REQUEST['mysql_database'];
$sql = $_REQUEST['sql'];

$mysqlHelper = new MysqlHelper(
    $conn_str
);
echo json_encode($mysqlHelper->multiQuery($mysql_database, $sql));