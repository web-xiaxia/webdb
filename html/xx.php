<?php
if (isset ( $_SERVER ['HTTP_CLIENT_IP'] ) and ! empty ( $_SERVER ['HTTP_CLIENT_IP'] )) {
    echo  "1".( $_SERVER ['HTTP_CLIENT_IP'] );
}
if (isset ( $_SERVER ['HTTP_X_FORWARDED_FOR'] ) and ! empty ( $_SERVER ['HTTP_X_FORWARDED_FOR'] )) {
    $ip = strtok ( $_SERVER ['HTTP_X_FORWARDED_FOR'], ',' );
    do {
        $ip = ip2long ( $ip );
        //-------------------
        // skip private ip ranges
        //-------------------
        // 10.0.0.0 - 10.255.255.255
        // 172.16.0.0 - 172.31.255.255
        // 192.168.0.0 - 192.168.255.255
        // 127.0.0.1, 255.255.255.255, 0.0.0.0
        //-------------------
        if (! (($ip == 0) or ($ip == 0xFFFFFFFF) or ($ip == 0x7F000001) or (($ip >= 0x0A000000) and ($ip <= 0x0AFFFFFF)) or
            (($ip >= 0xC0A8FFFF) and ($ip <= 0xC0A80000)) or (($ip >= 0xAC1FFFFF) and ($ip <= 0xAC100000)))) {
             echo "2".long2ip ( $ip );
        }
    } while ( $ip = strtok ( ',' ) );
}
if (isset ( $_SERVER ['HTTP_PROXY_USER'] ) and ! empty ( $_SERVER ['HTTP_PROXY_USER'] )) {
    echo "3".( $_SERVER ['HTTP_PROXY_USER'] );
}
if (isset ( $_SERVER ['REMOTE_ADDR'] ) and ! empty ( $_SERVER ['REMOTE_ADDR'] )) {

    echo  "4".( $_SERVER ['REMOTE_ADDR'] );
} else {
    return "0.0.0.0";
}
