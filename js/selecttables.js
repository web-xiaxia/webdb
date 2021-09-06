

function inittables(){

    var tableList= getLocalStorage(localStorageName.tableList);
    if(tableList==null)
    {
        window.location.hash="#databases";
    }
    $("#tablesList").empty();
    for(var d in tableList)
    {
        $("#tablesList").append('<li class="btn">'+tableList[d]+'</li>');
    }
    closeLoding()
    $("#tables").slideDown(gddhms);


}
$(function(){

    $("#tablesList").css({height:($(window).height()-175)+"px"})
    $(window).resize(function(){
        $("#tablesList").css({height:($(window).height()-175)+"px"})
    });
    $("#tablesList").delegate("li","click",function(){
        openLoding()
        var dbobj=getLocalStorage(localStorageName.nowconn);
        dbobj.mysql_table= "`" + $(this).html() + "`";
        $.ajax({
            url:"/webdb/php/getColumns.php",
            type:"get",
            dataType:"json",
            data:dbobj,
            success:function(data){
                if(data==false)
                {
                    alert("数据库连接失败！");
                    closeLoding()
                }else{
                    var tableobj={};
                    tableobj.mysql_table=dbobj.mysql_table;
                    tableobj.mysql_table_columns=data;
                    tableobj. mysql_table_columns_id=null;
                    tableobj.data_num=15;
                    tableobj. data_page=1;
                    tableobj.orderby=[];
                    tableobj.columnswhere=[];
                    for(var d in tableobj.mysql_table_columns)
                    {
                        var v=tableobj.mysql_table_columns[d]['Key'];
                        if(v=='PRI')
                        {
                            tableobj.mysql_table_columns_id=tableobj.mysql_table_columns[d]['Field']
                        }
                    }
                    setLocalStorage(localStorageName.tableobj,tableobj);
                    var nullobj={};
                    setLocalStorage(localStorageName.querywhereobj,nullobj);
                    setLocalStorage(localStorageName.oderbyobj,nullobj);

                    window.location.hash="#tabledata";
                    closeLoding()
                }
            },error:function(){
                alert("出错了！")
                closeLoding();
            }
        });
    });
    
    //$("#tabledata_input").on("input propertychange",  function () {
    //    var aaa=$(this).val()
    //    var tablesList = $("#tablesList").find("li")
    //    for(var index in tablesList){
    //        var table = $(tablesList[index])
    //        var displayValue = ""
    //        if(aaa){
    //            if (table.html().indexOf(aaa) ==-1){
    //               displayValue="none"
    //            }
    //        }  
    //
    //
    //        table.css({"display": displayValue}) 
    //    }
    //});
})
