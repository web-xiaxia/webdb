<?php
class Datar2
{
    public $data;
    public $columns;
    public $isrun;
    public $isquery;
    public $updateok;
}

$mysql_server_name= $_REQUEST['mysql_server_name'];
$mysql_username= $_REQUEST['mysql_username'];
$mysql_password= $_REQUEST['mysql_password'];
$mysql_database= $_REQUEST['mysql_database'];
$sql=$_REQUEST['sql'];
$db=new mysqli($mysql_server_name,$mysql_username,$mysql_password,$mysql_database);
if(mysqli_connect_error()){
    echo "false";
    exit;
}
$db->query("SET NAMES utf8");
$datar=new Datar2();
//if((strpos(ltrim($sql),"select")==0&&strpos(ltrim($sql),"select")!="")||(strpos(ltrim($sql),"SELECT")==0&&strpos(ltrim($sql),"SELECT")!=""))
{
    $result=$db->query($sql);
    //echo  mysql_affected_rows();

    $array=array();
    $array2=array();
    $isrun=false;
    if($result=="1")
    {
        $datar->isquery=false;
        $datar->updateok= 1;
    }else
    {
        while ($row=$result->fetch_assoc())//循环读出数据
        {
            if($isrun==false)
            {
                foreach($row as $rowname=>$rowvalue)
                {
                    array_push($array2,$rowname);
                }
                $isrun=true;
            }
            array_push($array,$row);
        }
        $datar->data=$array;
        $datar->columns=$array2;
        $datar->isrun=$isrun;
        $datar->isquery=true;
    }


}/*else
{
    $datar->isquery=false;
    $datar->updateok= $db->multi_query($sql);
}*/

echo json_encode($datar);
$db->close();