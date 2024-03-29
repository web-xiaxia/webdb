<?php
include 'MysqlHelper.php';

class Datar
{
    public $data;
    public $fields;
    public $count;
    public $e;
    public $e2; //sql
    public $esms;
}

$conn_str = $_REQUEST['conn_str'];
$mysql_database = $_REQUEST['mysql_database'];
$mysql_table = $_REQUEST['mysql_table'];
$mysql_column = $_REQUEST['mysql_column'];
$data_num = $_REQUEST['data_num'];
$data_page = $_REQUEST['data_page'];
$query_where = $_REQUEST['query_where'];
$query_orderby = $_REQUEST['query_orderby'];


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
$sql2 = "select " . $mysql_column . " from  " . $mysql_table . " where 1=1 " . $query_where . ($query_orderby != "" ? " order by " . $query_orderby : "") . " limit " . (($data_page - 1) * $data_num) . "," . ($data_num);
//echo $sql2;
$datar->e2 = $sql2;
try {
    $result = $mysqlHelper->query($mysql_database, $sql2);
    $datar->fields = $result->fetch_fields();
    $array = array();
    while ($row = $result->fetch_assoc())//循环读出数据
    {
        array_push($array, $row);
    }
    $datar->data = $array;
} catch (Exception $e) {
    $datar->esms = $e->getMessage();
}
echo json_encode($datar);