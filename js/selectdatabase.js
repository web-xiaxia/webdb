function initselectdatabase() {
    var conn_name = GetMaoQueryString('conn_name')
    var databasesList = getLocalStorage(localStorageName.databasesList + conn_name);
    if (databasesList == null) {
        window.location.hash = "#login";
        return;
    }
    $("#databasesList").empty();
    for (var d in databasesList) {
        $("#databasesList").append('<li class="btn">' + databasesList[d] + '</li>');
    }
    closeLoding()
    $("#databases").slideDown(gddhms);

}

$(function () {
    $("#databasesList").delegate("li", "click", function () {
        openLoding();
        var conn_name = GetMaoQueryString('conn_name')
        var mysql_database = $(this).html()
        $.ajax({
            url: "/webdb/php/getTables.php",
            type: "post",
            dataType: "json",
            data: {
                'conn_str': getLocalStorage(localStorageName.connObj + conn_name),
                'mysql_database': mysql_database
            },
            success: function (data) {
                if (data == false) {
                    alert("数据库连接失败！");
                    closeLoding()
                } else {
                    setLocalStorage(localStorageName.tableList+conn_name, data.tables);

                    window.location.hash = `#tables?conn_name=${conn_name}&database=${mysql_database}`;
                    closeLoding()
                }
            }, error: function () {
                alert("出错了！")
                closeLoding();
            }
        });
    });
})