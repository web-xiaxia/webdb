var tablecolumnsobj={};
function inittabledata2(){
    $("#tabledata2").slideDown(gddhms);
    var tableList= getLocalStorage(localStorageName.tableList);
    if(tableList==null){
        window.location.hash="#databases";
        return;
    }
    $("#tablenamelistul").empty();
    $("#tablenamelistul2").empty();
    for(var d in tableList)
    {
        $("#tablenamelistul").append('<li data=" '+tableList[d]+' ">'+tableList[d]+'</li>')
        $("#tablenamelistul2").append('<li data=" '+tableList[d]+' ">'+tableList[d]+'</li>')
    }
    $("#zdysql").val(getLocalStorage(localStorageName.zdysql,false));
}
$(function(){
    $("#zdysql").keyup(function(){
        setLocalStorage(localStorageName.zdysql,$(this).val(),false);
    });
    $("#zdysql").change(function(){
        setLocalStorage(localStorageName.zdysql,$(this).val(),false);
    });
    $("#tablediv2").scroll(function(event){
        //console.log(event)
        //console.log(event.target.scrollLeft)
        $("#tabledatashowthead2 tr").eq(0).css({left:(- event.target.scrollLeft)+8+"px"})
    });
    $(window).scroll(function(event) {
        if(nowmaodian=="#tabledata2")
        {
            var top=$(window).scrollTop();
            if(top>$("#tablediv2").offset().top)
            {
                $("#tabledatashowthead2 tr").eq(0).css({display:""});
            }else
            {
                $("#tabledatashowthead2 tr").eq(0).css({display:"none"});
            }
        }
        //console.log(event)
        //console.log(event.target.scrollLeft)

       /* $("#tabledatashowthead2 tr").eq(0).css({left: (-event.target.scrollLeft) + 8 + "px"})
        animate({scrollTop:$("#tablediv2").offset().top},gddhms);*/
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
    $(".kjlb2").delegate("li","click",function(){
        closefloatmain("#tablenamelist2");
        openfloatmain("#tablencoumns");
        $("#tablencoumnsul").empty();
        var tablexxx=$(this).html();
        var tablecolumns=tablecolumnsobj[tablexxx];
        if(tablecolumns==null)
        {
            openLoding();
            var dbobj=getLocalStorage(localStorageName.nowconn);
            $.ajax({
                url:"/php/getColumns.php",
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
                       openfloatmain("#tablenamelist2");
                        closefloatmain("#tablencoumns");;
                        closeLoding()
                    }else{

                        tablecolumnsobj[tablexxx]=data;
                        closeLoding();
                        tablecolumnsobjfun(tablecolumnsobj,tablexxx);

                    }
                },error:function(){
                    alert("出错了！")
                    openfloatmain("#tablenamelist2");
                    closefloatmain("#tablencoumns");;
                    closeLoding();
                }
            });
        }else
        {
            tablecolumnsobjfun(tablecolumnsobj,tablexxx);
        }
    });
    function tablecolumnsobjfun(tablecolumnsobj,tablexxx){
        $("#tablencoumnsul").empty();
        for(var d in tablecolumnsobj[tablexxx])
        {
            var tablecolumnsobjtablexxx =tablecolumnsobj[tablexxx][d];
            var v=tablecolumnsobjtablexxx['Field'];
            var vpk=tablecolumnsobjtablexxx['Key'];
            var pk="";
            if(vpk=='PRI')
            {
                pk="<span style='color: #ffc300'>PK-> </span>"
            }
            $("#tablencoumnsul").append('<li data="'+v+' ">'+pk+v+'</li>')

        }
    }
    $(".kjlb").delegate("li","click",function (){
        var a= $(this).attr("data");
        if(a==null||a=="")
        {
            return;
        }
        $("#zdysql").val( $("#zdysql").val()+ a+"");
        setLocalStorage(localStorageName.zdysql,$("#zdysql").val(),false);
        $("html,body").animate({scrollTop:$("#zdysql").offset().top},gddhms);
       // $("#zdysql").focus();
        closefloatmain('#tablenamelist');
        closefloatmain('#sqlfunlist');
        closefloatmain('#tablencoumns');
    })

    var isloadhanshu=false;
    $("#queryhanshu").click(function(){
        openfloatmain('#sqlfunlist');
        if(isloadhanshu==false)
        {
            isloadhanshu=true;
            openLoding()
            $.ajax({
                url: "/html/hanshu.html",
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
});
function getTableData2(){
    openLoding()
    $("#tabledatashowthead2").empty();
    $("#tabledatashowtbody2").empty();
    var dbobj=getLocalStorage(localStorageName.nowconn);
    var tableobj=getLocalStorage(localStorageName.tableobj);
    $.ajax({
        url:"/php/getTableDataZdy.php",
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
                        var ttr=$('<tr style="text-align: center;position: fixed;z-index: 2;display: none;top:0px">');
                        var ttr2=$('<tr style="text-align: center;">');
                        ttr.append('<td>序号</td>');
                        ttr2.append('<td>序号</td>');
                        for(var d in data.columns)
                        {
                            var mysql_table_column=data.columns[d];
                            ttr.append('<td>'+mysql_table_column+'</td>');
                            ttr2.append('<td>'+mysql_table_column+'</td>');
                        }
                        $("#tabledatashowthead2").append(ttr);
                        $("#tabledatashowthead2").append(ttr2);

                        for(var d in data.data)
                        {
                            var btr=$('<tr>');
                            btr.append('<td>'+(parseInt(d)+1)+'</td>')
                            for(var d2 in data.columns)
                            {
                                var field=data.columns[d2];
                                btr.append('<td data-columns="'+field+'">'+data.data[d][field]+'</td>')
                            }
                            $("#tabledatashowtbody2").append(btr);
                        }
                        $("html,body").animate({scrollTop:$("#tablediv2").offset().top-20},gddhms);
                        var tabledatashowtheadtd= $("#tabledatashowthead2 tr").eq(0).find("td");
                        var tabledatashowtheadtd1= $("#tabledatashowthead2 tr").eq(1).find("td");
                        var tabledatashowtbodytd=$("#tabledatashowtbody2 tr").eq(0).find("td");
                        if(tabledatashowtbodytd.length>0)
                        {
                            for(var i=0;i<tabledatashowtheadtd.length;i++)
                            {
                                var tabledatashowtheadtdwidth= tabledatashowtheadtd.eq(i).width();
                                var tabledatashowtbodytdwidth= tabledatashowtbodytd.eq(i).width();
                                var setwidth=tabledatashowtheadtdwidth>tabledatashowtbodytdwidth?tabledatashowtheadtdwidth:tabledatashowtbodytdwidth;
                                tabledatashowtheadtd.eq(i).width((setwidth+1)+"px");
                                tabledatashowtheadtd1.eq(i).width(setwidth+"px");

                            }
                            $("#tabledatashowthead2 tr").eq(0).width( $("#tabledatashowthead2 tr").eq(1).width()+1+"px");

                        }
                    }
                }
            }
        },error:function(){
            alert("出错了！")
            closeLoding();
        }
    });
};