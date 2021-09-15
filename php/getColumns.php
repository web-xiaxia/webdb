<?php
include 'MysqlHelper.php';

$conn_str = $_REQUEST['conn_str'];
$mysql_database = $_REQUEST['mysql_database'];
$mysql_table = $_REQUEST['mysql_table'];

$mysqlHelper = new MysqlHelper(
    $conn_str
);

echo json_encode($mysqlHelper->getColumns($mysql_database, $mysql_table));
