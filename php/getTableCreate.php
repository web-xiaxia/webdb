<?php
include 'MysqlHelper.php';

class Datar
{
    public $data;
    public $count;
    public $e;
    public $e2; //sql
    public $esms;
}

$conn_str = $_REQUEST['conn_str'];
$mysql_database = $_REQUEST['mysql_database'];
$mysql_table = $_REQUEST['mysql_table'];
$mysql_column = $_REQUEST['mysql_column'];
$query_where = $_REQUEST['query_where'];


$mysqlHelper = new MysqlHelper(
    $conn_str
);

$datar = new Datar();
//$sql = "select count(1) as count from  " . $mysql_table . " where 1=1 " . $query_where;
//$datar->e = $sql;
////echo $sql;
//$result = $db->query($sql);
//
//while ($row = $result->fetch_assoc())//循环读出数据
//{
//    $count = $row['count'];
//}
//$datar->count = $count;
$sql2 = "SHOW CREATE TABLE ". $mysql_table;
//echo $sql2;
$datar->e2 = $sql2;
try {
    $result = $mysqlHelper->query($mysql_database, $sql2);
    $array = array();
    $count = 0;
    while ($row = $result->fetch_assoc())//循环读出数据
    {
        $count = $row['Create Table'];
    }
    $datar->count = $count;
} catch (Exception $e) {
    $datar->esms = $e->getMessage();
}
echo json_encode($datar);