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
    <title>mysql</title>
   <!-- <link rel="stylesheet" type="text/css"  href="css/main.css"/>
    <link rel="stylesheet" type="text/css"  href="css/login.css"/>
    <link rel="stylesheet" type="text/css"  href="css/databases.css"/>
    <link rel="stylesheet" type="text/css"  href="css/table.css"/>
    <link rel="stylesheet" type="text/css"  href="css/tabledata.css"/>-->
    <style type="text/css">
        <?php
            include 'css/main.css';
            include 'css/login.css';
            include 'css/databases.css';
            include 'css/table.css';
            include 'css/tabledata.css';
        ?>
        .kjlb,.kjlb2,.kjlb3{
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .kjlb li,.kjlb2 li,.kjlb3 li{
            display: inline-block;
            display: inline-block;
            margin: 3px;
            padding: 5px 7px;
            background-color: #387ef5;
            color: white;
            text-align: left;
            min-width:15px ;
        }
        .kjlb li.t{
            background-color: #FF7C13;
            width: 90%;
        }

    </style>
    <script type="text/javascript" src="http://apps.bdimg.com/libs/jquery/1.9.1/jquery.js"></script>
  <!--  <script type="text/javascript" src="js/login.js"></script>
    <script type="text/javascript" src="js/querydatabase.js"></script>
    <script type="text/javascript" src="js/querytables.js"></script>
    <script type="text/javascript" src="js/updatetable.js"></script>
    <script type="text/javascript" src="js/querytabledata.js"></script>-->

    <script type="text/javascript">
        <?php
            include 'js/login.js';
            include 'js/querydatabase.js';
            include 'js/querytables.js';
            include 'js/updatetable.js';
            include 'js/querytabledata.js';
        ?>

        function setCookie(name,value)
        {
            var Days = 360;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days*24*60*60*1000);
            document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
        }

        //读取cookies
        function getCookie(name)
        {
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

            if(arr=document.cookie.match(reg))

                return unescape(arr[2]);
            else
                return null;
        }

        //删除cookies
        function delCookie(name)
        {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval=getCookie(name);
            if(cval!=null)
                document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        }
        var gddhms=500;
        var dbobj={
            mysql_server_name:null,
            mysql_username:null,
            mysql_password:null,
            mysql_database:null

        }
        var tableobj={
            mysql_table:null,
            mysql_table_columns:null,
            mysql_table_columns_id:null,
            data_num:15,
            data_page:1,
            data_page_sum:0,
            data_count:0,
            orderby:[],
            columnswhere:[]
        }
        var querywhereobj={};
        var oderbyobj={};
        var tablecolumnsobj={};

        function openLoding()
        {
            $("#loding").css({display:""});
            var lodingcontent=$("#lodingcontent");
            lodingcontent.css({left:$(window).width()/2-lodingcontent.width()/2+"px",top:$(window).height()/2-lodingcontent.height()/2+"px"})
        }
        function closeLoding()
        {
            $("#loding").css({display:"none"});
        }
        function getTableData(){
            openLoding()

            $("#page").html(0);
            $("#pagesum").html(0);
            $("#count").html(0);
            $("#tabledatashowthead").empty();
            $("#tabledatashowtbody").empty();
            var query_where="";
            for(var ddd in querywhereobj)
            {
                query_where+=" "+querywhereobj[ddd]+" ";
            }
            var query_orderby="";
            var  rrrrr=false;
            for(var ddd in oderbyobj){
                query_orderby+=" "+(rrrrr==false?"":",")+oderbyobj[ddd]+" ";
                rrrrr=true;
            }

            $.ajax({
                url:"getTableData.php",
                type:"get",
                dataType:"json",
                data:{
                    mysql_server_name:dbobj.mysql_server_name,
                    mysql_username:dbobj.mysql_username,
                    mysql_password:dbobj.mysql_password,
                    mysql_database:dbobj.mysql_database,
                    mysql_table:tableobj.mysql_table,
                    data_num:tableobj.data_num,
                    data_page:tableobj.data_page,
                    query_where:query_where,
                    query_orderby:query_orderby
                },
                success:function(data){
                    closeLoding()
                    console.log(data);
                    if(data==false)
                    {
                        alert("数据库连接失败")
                    }else{
                        tableobj.data_count=data["count"];
                        $("#page").html(tableobj.data_page);
                        tableobj.data_page_sum=parseInt((parseInt(tableobj.data_count)+parseInt(tableobj.data_num)-1)/parseInt(tableobj.data_num));
                        $("#pagesum").html(tableobj.data_page_sum);
                        $("#count").html(tableobj.data_count);
                        $("#pagenum").val(tableobj.data_num);



                        $("#tablediv").css({height:($(window).height()-100)+"px"})
                        var sqldataList=data["data"];
                        $("#tabledatashowthead").empty();
                        $("#tabledatashowtbody").empty();
                        var ttr=$('<tr style="text-align: center;">');
                        for(var d in tableobj.mysql_table_columns)
                        {
                            var mysql_table_column=tableobj.mysql_table_columns[d]['Field'];
                            var oderbyobjcolumnname= oderbyobj[mysql_table_column];
                            var querywhereobjcolumn= querywhereobj[mysql_table_column];
                            ttr.append('<td data-column="'+mysql_table_column+'">'+mysql_table_column+(querywhereobjcolumn==null?"":"<span style='color:red'> ->?</span>")+(oderbyobjcolumnname==null?"":"<span style='color: #feff08'> ->O</span>")+'</td>')
                        }
                        $("#tabledatashowthead").append(ttr);
                        for(var d in sqldataList)
                        {
                            var btr=$('<tr>');
                            for(var d2 in tableobj.mysql_table_columns)
                            {
                                var field=tableobj.mysql_table_columns[d2]['Field'];
                                btr.append('<td data-columns="'+field+'">'+sqldataList[d][field]+'</td>')
                            }
                            if(tableobj.mysql_table_columns_id!=null)
                            {
                                btr.attr("data-id",sqldataList[d][tableobj.mysql_table_columns_id]);
                            }
                            $("#tabledatashowtbody").append(btr);
                        }
                    }
                },error:function(){
                    alert("出错了！")
                    closeLoding();
                }
            });
        }

        function getTableData2(){
            openLoding()
            $("#tabledatashowthead2").empty();
            $("#tabledatashowtbody2").empty();
            $.ajax({
                url:"getTableDataZdy.php",
                type:"get",
                dataType:"json",
                data:{
                    mysql_server_name:dbobj.mysql_server_name,
                    mysql_username:dbobj.mysql_username,
                    mysql_password:dbobj.mysql_password,
                    mysql_database:dbobj.mysql_database,
                    mysql_table:tableobj.mysql_table,
                    sql:$("#zdysql").val()
                },
                success:function(data){
                    closeLoding()
                    console.log(data);
                    if(data==false)
                    {
                        alert("数据库连接失败")
                    }else{
                        if(data.isquery==false)
                        {
                            if(data.updateok==1)
                            {
                                alert("执行非查询成功")
                            }else{
                                alert("执行非查询失败")
                            }
                        }else
                        {
                            if(data.isrun==false)
                            {
                                alert("未查找到数据");
                            }else
                            {

                                $("#tabledatashowthead2").empty();
                                $("#tabledatashowtbody2").empty();
                                //$("#tablediv2").css({height:($(window).height()-10)+"px",display:"block"})
                                $("#tablediv2").css({display:"block"})
                                var ttr=$('<tr style="text-align: center;">');
                                for(var d in data.columns)
                                {
                                    var mysql_table_column=data.columns[d];
                                    ttr.append('<td>'+mysql_table_column+'</td>');
                                }
                                $("#tabledatashowthead2").append(ttr);

                                for(var d in data.data)
                                {
                                    var btr=$('<tr>');
                                    for(var d2 in data.columns)
                                    {
                                        var field=data.columns[d2];
                                        btr.append('<td data-columns="'+field+'">'+data.data[d][field]+'</td>')
                                    }
                                    $("#tabledatashowtbody2").append(btr);
                                }
                                $("html,body").animate({scrollTop:$("#tablediv2").offset().top},gddhms);

                            }
                        }
                    }
                },error:function(){
                    alert("出错了！")
                    closeLoding();
                }
            });
        }
        function logincookieinit(){
            var dbCookie=getCookie("dbCookie");
            $("#oldconn").empty();
            if(dbCookie!=null&&dbCookie!="{}")
            {
                dbCookiejson=JSON.parse(dbCookie);
                $("#oldconntr").css({display:""});
                for(var d in dbCookiejson)
                {
                    $("#oldconn").append('<option value="'+d+'">'+d+'</option>')
                }
            }else
            {
                $("#oldconntr").css({display:"none"});
            }
        }
        $(function(){

            logincookieinit();
            var isloadhanshu=false;
            $("#queryhanshu").click(function(){
                $('#sqlfunlist').css({display:''});
                if(isloadhanshu==false)
                {
                    isloadhanshu=true;
                    openLoding()
                    $.ajax({
                        url: "hanshu.html",
                        type: "get",
                        dataType: "html",
                        success: function (data) {
                            $("#hanshufunlist").html(data);
                            closeLoding()
                        },
                        error:function(){
                            closeLoding();
                            alert("加载出错请重试！")
                            isloadhanshu=false;
                        }
                    });
                }
            });

            $(".float .content").css({height:($(window).height()-$(window).height()*0.3)+"px"});
            $(".floatmain .float").css({top:($(window).height()*0.1)+"px"});
            $("#databasesList").css({height:($(window).height()-142)+"px",overflow:"scroll"})
            $("#tablesList").css({height:($(window).height()-175)+"px",overflow:"scroll"})
            $(window).resize(function(){
                $(".float .content").css({height:($(window).height()-$(window).height()*0.3)+"px"});
                $(".floatmain .float").css({top:($(window).height()*0.1)+"px"});
                $("#databasesList").css({height:($(window).height()-142)+"px"})
                $("#tablesList").css({height:($(window).height()-175)+"px"})
            });
            $(".kjlb3").delegate("li","click",function(){
                var a= $(this).attr("data");
                if(a==null||a=="")
                {
                    return;
                }
                $("#columnsx").val(  $("#columnsx").val()+ a+" ");

            });
            $(".kjlb2").delegate("li","click",function(){
                $("#tablenamelist2").css({display:"none"});
                $("#tablencoumns").css({display:""});
                $("#tablencoumnsul").empty();
                var tablexxx=$(this).html();
                var tablecolumns=tablecolumnsobj[tablexxx];
                if(tablecolumns==null)
                {
                    openLoding();
                    $.ajax({
                        url:"getColumns.php",
                        type:"get",
                        dataType:"json",
                        data:{
                            mysql_server_name:dbobj.mysql_server_name,
                            mysql_username:dbobj.mysql_username,
                            mysql_password:dbobj.mysql_password,
                            mysql_database:dbobj.mysql_database,
                            mysql_table: tablexxx
                        },
                        success:function(data){
                            if(data==false)
                            {
                                alert("数据库连接失败！");
                                $("#tablenamelist2").css({display:""});
                                $("#tablencoumns").css({display:"none"});
                                closeLoding()
                            }else{
                                $("#tablencoumnsul").empty();
                                tablecolumnsobj[tablexxx]=data;
                                closeLoding()
                                for(var d in tablecolumnsobj[tablexxx])
                                {
                                    var v=tablecolumnsobj[tablexxx][d]['Field'];
                                    $("#tablencoumnsul").append('<li data="'+v+'">'+v+'</li>')

                                }
                            }
                        },error:function(){
                            alert("出错了！")
                            $("#tablenamelist2").css({display:""});
                            $("#tablencoumns").css({display:"none"});
                            closeLoding();
                        }
                    });
                }else
                {
                    for(var d in tablecolumnsobj[tablexxx])
                    {
                        var v=tablecolumnsobj[tablexxx][d]['Field'];
                        $("#tablencoumnsul").append('<li data="'+v+'">'+v+'</li>')
                    }
                }
            });
            $(".kjlb").delegate("li","click",function (){
                var a= $(this).attr("data");
                if(a==null||a=="")
                {
                    return;
                }
                $("#zdysql").val( $("#zdysql").val()+ a+" ");
                $('#tablenamelist').css({display:'none'});
                $('#sqlfunlist').css({display:'none'});
                $('#tablencoumns').css({display:'none'});
            })
            $("#opentablenamelist").click(function(){
                $('#tablenamelist').css({display:''});
            })

            $("#getTableDatazdy").click(function(){
                getTableData2()
            })

            $("#openlogin").click(function(){
                $("#connsub").prop('checked',false)
                logincookieinit();
                $("#databases").slideUp(gddhms);
                $("#login").slideDown(gddhms);
            });
            $("#opendatabases").click(function(){
                $("#tables").slideUp(gddhms);
                $("#databases").slideDown(gddhms);
            })
            $("#opentables").click(function(){
                $("#tabledata").slideUp(gddhms);
                $("#tables").slideDown(gddhms);
            })
            $("#opentables2").click(function(){
                $("#tabledata2").slideUp(gddhms);
                $("#tables").slideDown(gddhms);
            });
            $("#zdysqlsssss").click(function(){
                $("#tabledata2").slideDown(gddhms);
                $("#tables").slideUp(gddhms);
                $("#zdysql").attr("rows",10);
                $("#tablediv2").css({display:"none"});
                $("#zdysql").val("");

            })
            $(".close").click(function(){
                $(this).parents(".floatmain").css("display","none");
            })
            /* <a id="pagesy" href="javascript:void(0)">首页</a>
             <a id="pageup" href="javascript:void(0)">上一页</a>
             <a id="pagedowm" href="javascript:void(0)">下一页</a>
             <a id="pagewy" href="javascript:void(0)">尾页</a>*/

            $("#pagenum").change(function(){
                tableobj.data_page=1;
                tableobj.data_num=$(this).val();
                getTableData();
            });

            $("#pagesy").click(function(){
                tableobj.data_page=1;
                getTableData();
            })
            $("#pageup").click(function(){
                if(tableobj.data_page<=1)
                {
                    tableobj.data_page=1;
                }else
                {
                    tableobj.data_page-=1;
                }

                getTableData()
            })
            $("#pagedowm").click(function(){
                if(tableobj.data_page>=tableobj.data_page_sum)
                {
                    tableobj.data_page=tableobj.data_page_sum;
                }else
                {
                    tableobj.data_page+=1;
                }

                getTableData()
            })

            $("#pagewy").click(function(){
                tableobj.data_page=tableobj.data_page_sum;
                getTableData()
            })

            $("#zdysqlup").click(function(){
               var num=parseInt( $("#zdysql").attr("rows"));
                if(num<=3)
                {
                    $("#zdysql").attr("rows",2);
                }else
                {
                    $("#zdysql").attr("rows",num-2);
                }
            })
            $("#zdysqldown").click(function(){
               var num= parseInt($("#zdysql").attr("rows"));
                $("#zdysql").attr("rows",num+2);
            })

        })

    </script>
</head>
<body >
<div id="loding" style="display: none;position: absolute">
    <div id="lodingbg" style="    background: black;    width: 100%;    height: 100%;    position: fixed;    top: 0px;    left: 0px;    opacity: 0.7;    z-index: 9998;"></div>
    <div id="lodingcontent" style="position: fixed;z-index: 9999;margin-top:-20px; "><img src="img/loding.jpg"></div>
</div>
<div  id="login" class="window">
    <div class="title">数据库连接</div>
    <table>
        <tr id="oldconntr" style="display: none">
            <td>历史连接:</td>
            <td>
                <select id="oldconn" style="height: 20px;line-height: 20px;">
                </select>
                <a href="javascript:void(0)" id="cookielogin">连接</a>
                <a href="javascript:void(0)" id="cookielogindel">删除</a>
            </td>
        </tr>
        <tr>
            <td style="width: 20%;min-width:80px;text-align:  center">地址:</td>
            <td><input style="width: 100%" id="mysql_server_name" value=""></td>
        </tr>
        <tr>
            <td style="width: 20%;text-align:  center">用户名:</td>
            <td><input style="width: 100%" id="mysql_username" value=""></td>
        </tr>
        <tr>
            <td style="width: 20%;text-align:  center"> 密码:</td>
            <td><input style="width: 100%" type="password" id="mysql_password" value=""></td>
        </tr>
        <tr>
            <td><input type="checkbox" id="connsub"></td>
            <td><a href="javascript:void(0)" class="btn" id="sub">连接</a></td>
        </tr>
    </table>
</div>
<div id="databases" style="display: none;"  class="window">
    <div class="title" >选择数据库</div>
    <div>
        <a href="javascript:void(0)" style="background: #005EFF" class="btn" id="openlogin">切换数据库连接</a>
        <ul id="databasesList" >

        </ul>
    </div>

</div>
<div id="tables" style="display: none"  class="window">
    <div class="title" >选择数据表</div>
    <div >
        <a href="javascript:void(0)" class="btn" id="opendatabases">切换数据库</a>
        <a href="javascript:void(0)" class="btn" id="zdysqlsssss">自定义sql</a>
        <ul id="tablesList" >

        </ul>
    </div>

</div>
<div id="tabledata" style="display: none">
    <div class="btn"  id="opentables">切换数据表</div>
    <div id="tablediv" style="overflow: scroll;width: 100%;margin-top: 5px" >
        <table id="tabledatashow" border="1" >
            <thead id="tabledatashowthead">

            </thead>
            <tbody id="tabledatashowtbody">

            </tbody>
        </table>
    </div>
    <div>
        <span id="page">1</span>/<span id="pagesum">2</span> 共<span id="count">100</span>条
        <select id="pagenum">
            <option value="15">15</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="1000">1000</option>
        </select>
        <br/>
        <a id="pagesy" href="javascript:void(0)">首页</a>
        <a id="pageup" href="javascript:void(0)">上一页</a>
        <a id="pagedowm" href="javascript:void(0)">下一页</a>
        <a id="pagewy" href="javascript:void(0)">尾页</a>
    </div>
</div>

<div class="floatmain" id="updatecolumn"  style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">修改数据</span><a class="close" href="javascript:void(0)">X</a></div>
        <div class="content">
            <textarea id="updatevalue" style="width: 98%" rows="10"></textarea>
            <a id="unpdatebtn" class="btn" href="javascript:void(0)">修改</a>
        </div>
    </div>
</div>
<div class="floatmain" id="columnswindow"  style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">列操作</span><a class="close" href="javascript:void(0)">X</a></div>
        <div class="content">
            列名：<span id="columnname">121212</span>
            <a class="btn" href="javascript:void(0)" id="delorder">删除排序</a>
            <a class="btn" href="javascript:void(0)" id="escorder">顺序</a>
            <a class="btn" href="javascript:void(0)" id="descorder">倒序</a>
            <hr color="#387EF5">
            <input id="columnsx" style="width: 98%">
            <a class="btn" href="javascript:void(0)" id="datawhere">筛选</a>
            <a class="btn" href="javascript:void(0)" id="datawheredel">删除筛选</a>
            <ul class="kjlb3">
                <li data="and">and</li>
                <li data="or">or</li>
                <li data="is">is</li>
                <li data="not">not</li>
                <li data="null">null</li>
                <li data="in">in</li>
                <li data="exists">exists</li>
            </ul>
            <ul class="kjlb3">
                <li data=",">,</li>
                <li data=".">.</li>
                <li data="'">'</li>
                <li data="-">-</li>
                <li data="/">/</li>
                <li data="(">(</li>
                <li data=")">)</li>
                <li data=";">;</li>
            </ul>
            <ul class="kjlb3">
                <li data=">">></li>
                <li data="<"><</li>
                <li data="=">=</li>
                <li data="like">like</li>
                <li data="%">%</li>
            </ul>
            <ul class="kjlb3">
                <li data="DATE_FORMAT('','%Y-%m-%d %H:%s:%i')">DATE_FORMAT</li>
                <li data="NOW()">NOW</li>
                <li data="CONCAT(">CONCAT</li>
            </ul>
        </div>
    </div>
</div>

<div id="tabledata2" style="display: none">
    <div class="btn"  id="opentables2">切换数据表</div>
    <div class="btn"  id="zdysqldown">增加编辑框行</div>
    <div class="btn"  id="zdysqlup">减少编辑框行</div>
    <div id="zdysqlmain">
        <textarea id="zdysql" rows="12" style="width: 100%"></textarea>
        <a class="btn" href="javascript:void(0)" id="getTableDatazdy" >执行sql</a>
        <div>
            <ul class="kjlb">
                <li data="select">select</li>
                <li data="*">*</li>
                <li data="from">from</li>
                <li data="update">update</li>
                <li data="set">set</li>
                <li data="insert into">insert into</li>
                <li data="values">values</li>
                <li data="delete">delete</li>
            </ul>
            <ul class="kjlb">
                <li data="left">left</li>
                <li data="right">right</li>
                <li data="inner">inner</li>
                <li data="jion">jion</li>
                <li data="on">on</li>
            </ul>
            <ul class="kjlb">
                <li data="where">where</li>
                <li data="and">and</li>
                <li data="or">or</li>
                <li data="is">is</li>
                <li data="not">not</li>
                <li data="null">null</li>
                <li data="in">in</li>
                <li data="exists">exists</li>
                <li data="group">group</li>
                <li data="order">order</li>
                <li data="by">by</li>
                <li data="limit">limit</li>

            </ul>
            <ul class="kjlb">
                <li data=",">,</li>
                <li data=".">.</li>
                <li data="'">'</li>
                <li data="-">-</li>
                <li data="/">/</li>
                <li data="(">(</li>
                <li data=")">)</li>
                <li data=";">;</li>
            </ul>
            <ul class="kjlb">
                <li data=">">></li>
                <li data="<"><</li>
                <li data="=">=</li>
                <li data="like">like</li>
                <li data="%">%</li>
            </ul>
        </div>
        <a class="btn" href="javascript:void(0)" id="queryhanshu" >插入函数</a>
        <a class="btn" href="javascript: $('#tablenamelist').css({display:''});" >插入表名</a>
        <a class="btn" href="javascript:$('#tablenamelist2').css({display:''});"  >插入列名</a>
    </div>

    <div id="tablediv2"  style="overflow: scroll;width: 100%;margin-top: 5px;display: none" >
        <table id="tabledatashow2" border="1" >
            <thead id="tabledatashowthead2">

            </thead>
            <tbody id="tabledatashowtbody2">

            </tbody>
        </table>
    </div>
</div>
<div class="floatmain" id="sqlfunlist"  style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">插入函数</span><a class="close" href="javascript:void(0)">X</a></div>
        <div class="content" >
            <ul class="kjlb" id="hanshufunlist" >

            </ul>
        </div>
    </div>
</div>
<div class="floatmain" id="tablenamelist"  style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">插入表名</span><a class="close" href="javascript:void(0)">X</a></div>
        <div class="content" >
            <ul class="kjlb" id="tablenamelistul">

            </ul>
        </div>
    </div>
</div>
<div class="floatmain" id="tablenamelist2"  style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">选择表</span><a class="close" href="javascript:void(0)">X</a></div>
        <div class="content" >
            <ul class="kjlb2" id="tablenamelistul2">

            </ul>
        </div>
    </div>
</div>
<div class="floatmain" id="tablencoumns"  style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">插入列名</span><a class="close" href="javascript:void(0)">X</a></div>
        <div class="content" >
            <ul class="kjlb" id="tablencoumnsul">

            </ul>
        </div>
    </div>
</div>



</body>
</html>