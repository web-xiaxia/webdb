
var updateobj={
    idcolumns:null,
    id:null,
    columns:null,
    oldvalue:null
}
$(function(){
    $("#tabledatashowtbody").delegate("td","click",function(){

        var _this=$(this);
        var columns=_this.attr("data-columns");
        if(columns==null||columns==undefined||columns=="")
        {
            return;
        }
        var id=_this.parent().attr("data-id");
        if(id==null||id=='')
        {
            alert("暂不支持无主键表修改");
            return;
        }
        var tableobj=getLocalStorage(localStorageName.tableobj);
        //var sql="update "+mysql_table+" set "+columns+"="+"'"+ +"'"
        updateobj.idcolumns=tableobj.mysql_table_columns_id
        updateobj.id=id;
        updateobj.columns=columns;
        updateobj.oldvalue=_this.html();
        $("#updatecolumn").slideDown(gddhms);
        $("#updatevalue").val(updateobj.oldvalue);

    });
    $("#unpdatebtn").click(function(){
        openLoding()
        var tableobj=getLocalStorage(localStorageName.tableobj);
        var sql="update `"+tableobj.mysql_table +"` set `"+updateobj.columns+"` ='"+ $("#updatevalue").val()+"' where `"+updateobj.idcolumns+"`= '"+updateobj.id+"'";
        var dbobj=getLocalStorage(localStorageName.nowconn);
        $.ajax({
            url:"/webdb/php/updateData.php",
            type:"get",
            dataType:"json",
            data:{
                mysql_server_name:dbobj.mysql_server_name,
                mysql_username:dbobj.mysql_username,
                mysql_password:dbobj.mysql_password,
                mysql_database:dbobj.mysql_database,
                sql: sql
            },
            success:function(data){
                closeLoding()
                console.log(data);
                if(data==false)
                {
                    alert("修改失败");
                }else{
                    closefloatmain("#updatecolumn");
                    getTableData();
                }
            },error:function(){
                alert("出错了！")
                closeLoding();
            }
        });
    });
});
