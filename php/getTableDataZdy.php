<?php
include 'MysqlHelper.php';

class Datar2
{
    public $data;
    public $columns;
    public $isrun;
    public $isquery;
    public $updateok;
}

$conn_str = $_REQUEST['conn_str'];
$mysql_database = $_REQUEST['mysql_database'];
$sql = $_REQUEST['sql'];

$mysqlHelper = new MysqlHelper(
    $conn_str
);


$datar = new Datar2();
//if((strpos(ltrim($sql),"select")==0&&strpos(ltrim($sql),"select")!="")||(strpos(ltrim($sql),"SELECT")==0&&strpos(ltrim($sql),"SELECT")!=""))
{
    $result = $mysqlHelper->query($mysql_database, $sql);
    //echo  mysql_affected_rows();

    $array = array();
    $array2 = array();
    $isrun = false;
    if ($result == "1") {
        $datar->isquery = false;
        $datar->updateok = 1;
    } else {
        while ($row = $result->fetch_assoc())//循环读出数据
        {
            if ($isrun == false) {
                foreach ($row as $rowname => $rowvalue) {
                    array_push($array2, $rowname);
                }
                $isrun = true;
            }
            array_push($array, $row);
        }
        $datar->data = $array;
        $datar->columns = $array2;
        $datar->isrun = $isrun;
        $datar->isquery = true;
    }


}/*else
{
    $datar->isquery=false;
    $datar->updateok= $db->multi_query($sql);
}*/

echo json_encode($datar);