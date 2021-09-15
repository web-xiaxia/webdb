//
function inittables() {
    var conn_name = GetMaoQueryString('conn_name')
    var database = GetMaoQueryString('database')
    var tableList = getLocalStorage(localStorageName.tableList + conn_name + ':' + database);
    if (tableList == null) {
        window.location.hash = "#databases?conn_name=" + conn_name;
    }
    $("#tablesList").empty();
    for (var d in tableList) {
        $("#tablesList").append('<li class="btn">' + tableList[d] + '</li>');
    }
    closeLoding()
    $("#tables").slideDown(gddhms);


}

$(function () {
    $("#tablesList").delegate("li", "click", function () {
        openLoding()
        var conn_name = GetMaoQueryString('conn_name')
        var database = GetMaoQueryString('database')
        var mysql_table = "`" + $(this).html() + "`"
        $.ajax({
            url: "/webdb/php/getColumns.php",
            type: "post",
            dataType: "json",
            data: {
                'conn_str': getLocalStorage(localStorageName.connObj + conn_name),
                'mysql_database': database,
                'mysql_table': mysql_table
            },
            success: function (data) {
                if (data == false) {
                    alert("数据库连接失败！");
                    closeLoding()
                } else {
                    var tableobj = {};
                    tableobj.mysql_table_columns = data;
                    tableobj.mysql_table_columns_id = null;
                    for (var d in tableobj.mysql_table_columns) {
                        var v = tableobj.mysql_table_columns[d]['Key'];
                        if (v == 'PRI') {
                            tableobj.mysql_table_columns_id = tableobj.mysql_table_columns[d]['Field']
                        }
                    }
                    setLocalStorage(localStorageName.tableobj+conn_name+":"+database+":"+mysql_table, tableobj);

                    window.location.hash = `#tabledata?conn_name=${conn_name}&database=${database}&table=${mysql_table}`;
                    closeLoding()
                }
            }, error: function () {
                alert("出错了！")
                closeLoding();
            }
        });
    });

    $("#tabledata_input").on("input propertychange", function () {
        search_ul_text(this, "#tablesList")
    });
})
