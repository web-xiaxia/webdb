<?php

function encrypt($string, $operation, $key = '')
{
    $key = md5($key);
    $key_length = strlen($key);
    $string = $operation == 'D' ? base64_decode($string) : substr(md5($string . $key), 0, 8) . $string;
    $string_length = strlen($string);
    $rndkey = $box = array();
    $result = '';
    for ($i = 0; $i <= 255; $i++) {
        $rndkey[$i] = ord($key[$i % $key_length]);
        $box[$i] = $i;
    }
    for ($j = $i = 0; $i < 256; $i++) {
        $j = ($j + $box[$i] + $rndkey[$i]) % 256;
        $tmp = $box[$i];
        $box[$i] = $box[$j];
        $box[$j] = $tmp;
    }
    for ($a = $j = $i = 0; $i < $string_length; $i++) {
        $a = ($a + 1) % 256;
        $j = ($j + $box[$a]) % 256;
        $tmp = $box[$a];
        $box[$a] = $box[$j];
        $box[$j] = $tmp;
        $result .= chr(ord($string[$i]) ^ ($box[($box[$a] + $box[$j]) % 256]));
    }
    if ($operation == 'D') {
        if (substr($result, 0, 8) == substr(md5(substr($result, 8) . $key), 0, 8)) {
            return substr($result, 8);
        } else {
            return '';
        }
    } else {
        return str_replace('=', '', base64_encode($result));
    }
}


class MysqlHelper
{
    private $encrypt_key = "xiaxia";
    private $mysql_server_name;
    private $mysql_username;
    private $mysql_password;

    function __construct($connStr = null, $mysql_server_name = null, $mysql_username = null, $mysql_password = null)
    {
        if ($connStr) {
            $conn_json = json_decode(encrypt($connStr, "D", $this->encrypt_key));
            $this->mysql_server_name = $conn_json->mysql_server_name;
            $this->mysql_username = $conn_json->mysql_username;
            $this->mysql_password = $conn_json->mysql_password;
        } else {
            $this->mysql_server_name = $mysql_server_name;
            $this->mysql_username = $mysql_username;
            $this->mysql_password = $mysql_password;
        }
    }

    private function getConnStr(): string
    {
        return encrypt(json_encode(array(
            'mysql_server_name' => $this->mysql_server_name,
            'mysql_username' => $this->mysql_username,
            'mysql_password' => $this->mysql_password
        )), "E", $this->encrypt_key);
    }

    public function getDatabases(): array
    {
        $db = $this->getDb();
        $result = $db->query("show databases");
        $db->close();
        $array = array();
        while ($row = $result->fetch_assoc())//循环读出数据
        {
            array_push($array, $row['Database']);
        }
        return array(
            'databases' => $array,
            'conn_str' => $this->getConnStr()
        );
    }

    public function getTables($mysql_database): array
    {
        $db = $this->getDb();
        $result = $db->query("select table_name from information_schema.tables where table_schema='" . $mysql_database . "' and  table_type='base table'");
        $db->close();
        $array = array();
        while ($row = $result->fetch_assoc())//循环读出数据
        {
            array_push($array, $row['table_name']);
        }
        return array(
            'tables' => $array
        );
    }

    public function getDb($mysql_table = null): mysqli
    {
        $db = new mysqli($this->mysql_server_name, $this->mysql_username, $this->mysql_password, $mysql_table);
        $db->query("SET NAMES utf8mb4");
        return $db;
    }
}