
function initselectdatabase(){
    var databasesList=getLocalStorage(localStorageName.databasesList);
    if(databasesList==null)
    {
        window.location.hash="#login";
        return;
    }
    $("#databasesList").empty();
    for(var d in databasesList)
    {
        $("#databasesList").append('<li class="btn">'+databasesList[d]+'</li>');
    }
    closeLoding()
    $("#databases").slideDown(gddhms);

}
$(function(){
    $("#databasesList").css({height:($(window).height()-142)+"px"})
    $(window).resize(function(){
        $("#databasesList").css({height:($(window).height()-142)+"px"})
    });
    $("#databasesList").delegate("li","click",function(){
        var dbobj=getLocalStorage(localStorageName.nowconn);
        dbobj.mysql_database= $(this).html();
        openLoding();
        $.ajax({
            url:"/php/getTables.php",
            type:"get",
            dataType:"json",
            data:dbobj,
            success:function(data){
                if(data==false)
                {
                    alert("数据库连接失败！");
                    closeLoding()
                }else{

                    setLocalStorage(localStorageName.nowconn,dbobj);
                    setLocalStorage(localStorageName.tableList,data);

                    window.location.hash="#tables";
                    closeLoding()
                    /* for(var d in data)
                     {
                     $("#tablesList").append('<li class="btn">'+data[d]+'</li>');
                     $("#tablenamelistul").append('<li data="'+data[d]+'">'+data[d]+'</li>')
                     $("#tablenamelistul2").append('<li data="'+data[d]+'">'+data[d]+'</li>')
                     }
                     closeLoding()*/
                }
            },error:function(){
                alert("出错了！")
                closeLoding();
            }
        });
    });
})