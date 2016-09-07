<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width">
    <meta name="format-detection" content="telephone=no">
    <meta http-equiv="pragma" content="no-cache">
    <meta http-equiv="Cache-Control" content="no-cache, must-revalidate">
    <meta http-equiv="expires" content="-1">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta property="qc:admins" content="2450036450146316110063757" />
    <title>mysql</title>
    <style type="text/css">
        <?php
            include 'css/main.css';
            include 'css/login.css';
            include 'css/selectdatabases.css';
            include 'css/selecttable.css';
            include 'css/selecttabledata.css';
        ?>
    </style>
    <script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/1.9.1/jquery.js"></script>
    <script type="text/javascript" src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" data-appid="APPID" data-redirecturi="REDIRECTURI" charset="utf-8"></script>
    <script type="text/javascript">
        <?php
            include 'js/url.js';
            include 'js/main.js';
            include 'js/login.js';
            include 'js/selectdatabase.js';
            include 'js/selecttables.js';
            include 'js/selecttabledata.js';
            include 'js/updatetable.js';
            include 'js/selectbysql.js';
        ?>
    </script>
</head>
<body >
<span id="qqLoginBtn"></span>
<script type="text/javascript">
    QC.Login({
       btnId:"qqLoginBtn"    //插入按钮的节点id
});
</script>
<?php
    include 'html/main.php';
    include 'html/lsbj.php';

    include 'html/login.php';
    include 'html/selectdatabase.php';
    include 'html/selecttable.php';
    include 'html/selecttabledata.php';
    include 'html/selectbysql.php';
?>
</body>
</html>