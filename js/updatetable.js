var updateobj = {
    idcolumns: null,
    id: null,
    columns: null,
    oldvalue: null
}

function data_cli_update_data(id, columns, oldvalue) {
    if (columns == null || columns == undefined || columns == "") {
        return;
    }
    if (id == null || id == '') {
        alert("暂不支持无主键表修改");
        return;
    }
    var conn_name = GetMaoQueryString('conn_name')
    var database = GetMaoQueryString('database')
    var table = GetMaoQueryString('table')
    var table_columns = getLocalStorage(localStorageName.tableColumns + conn_name + ":" + database + ":" + table);
    //var sql="update "+mysql_table+" set "+columns+"="+"'"+ +"'"
    updateobj.idcolumns = table_columns.mysql_table_columns_id
    updateobj.id = id;
    updateobj.columns = columns;
    updateobj.oldvalue = oldvalue;
    $("#updatecolumn").slideDown(gddhms);
    $("#updatecolumnname").text(columns);
    $("#updatevalue").val(updateobj.oldvalue);
}

$(function () {
    $("#tabledatashowtbody").delegate("td", "click", function () {

        var _this = $(this);
        var columns = _this.attr("data-columns");
        var id = _this.parent().attr("data-id");

        data_cli_update_data(id, columns, _this.html())

    });
    $("#unpdatebtn").click(function () {
        openLoding()
        var conn_name = GetMaoQueryString('conn_name')
        var database = GetMaoQueryString('database')
        var table = GetMaoQueryString('table')
        var sql = `update ${table} set ${updateobj.columns} ='${$("#updatevalue").val()}' where \`${updateobj.idcolumns}\`= '${updateobj.id}'`;
        $.ajax({
            url: "/webdb/php/updateData.php",
            type: "post",
            dataType: "json",
            data: {
                'conn_str': getLocalStorage(localStorageName.connObj + conn_name),
                'mysql_database': database,
                'sql': sql
            },
            success: function (data) {
                closeLoding()
                console.log(data);
                if (data == false) {
                    alert("修改失败");
                } else {
                    closefloatmain("#updatecolumn");
                    getTableData();
                }
            }, error: function () {
                alert("出错了！")
                closeLoding();
            }
        });
    });
});


function titleDing(that){
    event.stopPropagation()
    $(that).parents("table").toggleClass("tabledatashowleft")
}