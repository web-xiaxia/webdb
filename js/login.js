function logininit(){
    closeLoding()
    $("#login").slideDown(gddhms);
    logincookieinit();

}
$(function(){
    $("#sub").click(function(){
        login($("#mysql_server_name").val(),$("#mysql_username").val(),$("#mysql_password").val());
    });
    $("#cookielogin").click(function(){
        var dbCookiejson=getLocalStorage(localStorageName.dbCookie);
        if(dbCookiejson!=null)
        {
            var oldcon=dbCookiejson[$("#oldconn").val()];
            login(oldcon.mysql_server_name,oldcon.mysql_username,oldcon.mysql_password);
        }else{
            alert("登陆出错，请刷新重试")
        }
    })
    $("#cookielogindel").click(function(){
        var dbCookiejson=getLocalStorage(localStorageName.dbCookie);
        if(dbCookiejson!=null)
        {
            delete dbCookiejson[$("#oldconn").val()];
            setLocalStorage(localStorageName.dbCookie,dbCookiejson);
            logincookieinit();
        }
    })
})


function login(mysql_server_name,mysql_username,mysql_password){
    openLoding()
    $.ajax({
        url:"/php/connMysql.php",
        type:"get",
        dataType:"json",
        data:{
            mysql_server_name:mysql_server_name,
            mysql_username:mysql_username,
            mysql_password:mysql_password
        },
        success:function(data){
            if(data==false)
            {

                alert("数据库连接失败！");
                closeLoding()
            }else{
                if($("#connsub").prop('checked'))
                {
                    var dbCookie=getLocalStorage(localStorageName.dbCookie);
                    if(dbCookie==null)
                    {
                        dbCookie={};
                    }
                    dbCookie[mysql_server_name+"["+mysql_username+"]"]={mysql_server_name:mysql_server_name,mysql_username:mysql_username,mysql_password:mysql_password}
                    setLocalStorage(localStorageName.dbCookie,dbCookie,360*24*60*60*1000);
                }
                var nowconnjson={mysql_server_name:mysql_server_name, mysql_username:mysql_username,mysql_password:mysql_password};
                setLocalStorage(localStorageName.nowconn,nowconnjson);
                setLocalStorage(localStorageName.databasesList,data);

                window.location.hash="#databases";
                closeLoding()
                /*  $("#login").slideUp(gddhms);
                 $("#databases").slideDown(gddhms);
                 $("#databasesList").empty();
                 closeLoding()
                 */
            }
        },error:function(){
            alert("出错了！")
            closeLoding();
        }
    });
}
function logincookieinit(){
    var dbCookiejson=getLocalStorage(localStorageName.dbCookie);
    $("#oldconn").empty();
    if(dbCookiejson!=null&&"{}"!=JSON.stringify(dbCookiejson))
    {
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
