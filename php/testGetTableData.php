<?php

class Datar
{
    public $data;
    public $count;
    public $e;
    public $e2;
    public $esms;
}
$mysql_server_name= "macmini:3306";
$mysql_username= "root";
$mysql_password= "my-secret-pw-iAstCRj";
$mysql_database= "easi_local";
$mysql_table="shop";
$data_num=20;
$data_page=1;
$query_where="";
$query_orderby="";
$db=new mysqli($mysql_server_name,$mysql_username,$mysql_password,$mysql_database);
if(mysqli_connect_error()){
    echo "false";
    exit;
}
$db->query("SET NAMES utf8");
$datar=new Datar();
$sql="select count(1) as count from  ".$mysql_table." where 1=1 ".$query_where;
$datar->e=$sql;
//echo $sql;
$result=$db->query($sql);

while ($row=$result->fetch_assoc())//循环读出数据
{
    $count=$row['count'];
}
$datar->count=$count;
$sql2="select * from  ".$mysql_table." where 1=1 ".$query_where.($query_orderby!=""?" order by ".$query_orderby:"")." limit ".(($data_page-1)*$data_num).",".($data_num);
//echo $sql2;
$datar->e2=$sql2;
try
{
    $result=$db->query($sql2);
    $array=array();
    while ($row=$result->fetch_assoc())//循环读出数据
    {
        array_push($array,$row);
    }
    $datar->data=$array;
}catch (Exception $e)
{
    $datar->esms=$e->getMessage();
}
echo json_encode($datar);
$db->close();