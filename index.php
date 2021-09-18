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
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Mysql">
    <link rel="icon" href="/webdb/favicon.ico">
    <link rel="shortcut icon" sizes="192x192" href="/webdb/favicon.ico">
    <link rel="shortcut icon" sizes="128x128" href="/webdb/favicon.ico">
    <link rel="apple-touch-icon" sizes="128x128" href="/webdb/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="128x128" href="/webdb/favicon.ico">
    <link rel="manifest" href="/webdb/manifest.json">
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
    <script type="text/javascript">

        function test_start(str, start_array) {
            str = str.toLowerCase()
            var str_length = str.length
            for (var i in start_array) {
                var test_str = start_array[i].toLowerCase()
                if (test_str.length >= str_length && (str == test_str || test_str.substr(0, str_length) == str)) {
                    return true
                }
            }
            return false
        }

        function as_text_column(column_type){
            return test_start(column_type, ['point', 'geometry', 'geometrycollection','json', 'multipoint', 'multipolygon', 'polygon', 'blob'])
        }

        function search_ul(that, ul_id) {
            var aaa = $(that).val().toLowerCase()
            var tablesList = $(ul_id).find("li")
            for (var index in tablesList) {
                var table = tablesList[index]
                var displayValue = "block"
                if (aaa) {
                    var litext = table.innerHTML.toLowerCase()
                    if (litext && litext.indexOf(aaa) == -1) {
                        displayValue = "none"
                    }
                }
                table.style.display = displayValue
            }
        }

        function search_ul_text(that, ul_id) {
            var aaa = $(that).val()
            var tablesList = $(ul_id).find("li")
            for (var index in tablesList) {
                var table = tablesList[index]
                var displayValue = "block"
                if (aaa) {
                    var litext = table.innerHTML
                    if (litext && litext.indexOf(aaa) == -1) {
                        displayValue = "none"
                    }
                }
                table.style.display = displayValue
            }
        }

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