<?php
$url= $_REQUEST['url'];
$type= $_REQUEST['type'];
$data= $_REQUEST['data'];

$callback= $_REQUEST['callback'];
$postdata = http_build_query($data);    
$options =null;
if($type=='get'){
    $options = array(    
        'http' => array(    
            'method' => 'get',    
            
            'content' => $postdata,    
            'timeout' => 15 * 60 // 超时时间（单位:s）    
        )    
    ); 
}else{
     $options = array(    
        'http' => array(    
            'method' => 'post',    
             'header' => 'Content-Type: application/json; charset=utf-8',    
            'content' => $data,    
            'timeout' => 15 * 60 // 超时时间（单位:s）    
        )    
    ); 
}

$context = stream_context_create($options);    
$result = file_get_contents($url, false, $context);  
if($callback!=""){
	echo $callback."(";
}
echo $result;
if($callback!=null){
	echo ")";
}
?>