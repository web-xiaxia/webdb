function inittabledata() {
    var tableobj = getLocalStorage(localStorageName.tableobj);
    $('#zdycolumnsyablename').html(`表名：${tableobj.mysql_table}`)
    var zdycolumnswindowcontext = $("#zdycolumnswindowcontext")
    zdycolumnswindowcontext.empty()
    for (var d in tableobj.mysql_table_columns) {
        var column_name = tableobj.mysql_table_columns[d]['Field']
        zdycolumnswindowcontext.append(`<div><input type="checkbox" class="zdycolumns" id="zdycolumns${column_name}" checked> <label for="zdycolumns${column_name}">${column_name}</label> </div>`)
    }
    getTableData();
    $("#tabledata").slideDown(gddhms);
}

var lastSqldataList = null

$(function () {


    $("#zshow_one_data_input").on("input propertychange", function () {
        var aaa = $(this).val()
        var tablesList = $('.show_one_data_field_box')
        for (var index in tablesList) {
            var table = tablesList[index]
            var displayValue = "block"
            if (aaa) {
                var litext = table.getAttribute('data-field')
                if (litext && litext.indexOf(aaa) == -1) {
                    displayValue = "none"
                }
            }
            table.style.display = displayValue
        }
    });

    $("#columnsxt").change(function () {
        var columnsx = $("#columnsx")
        columnsx.val('')
        columnsx.attr('placeholder', $(this).find("option:selected").attr('tips'))
    })

    $("#tabledatashowthead").delegate("td", "click", function () {

        var column = $(this).attr('data-column');
        if (column == null || column == undefined || column == "") {
            return;
        }
        openfloatmain("#columnswindow");
        var oderbyobj = getLocalStorage(localStorageName.oderbyobj)
        var orderbycolumn = oderbyobj[column];
        if (orderbycolumn == null) {
            $("#delorder").css({"display": "none"});
            $("#escorder").css({"display": ""});
            $("#descorder").css({"display": ""});
        } else if (column == orderbycolumn.trim()) {
            $("#delorder").css({"display": ""});
            $("#escorder").css({"display": "none"});
            $("#descorder").css({"display": ""});
        } else {
            $("#delorder").css({"display": ""});
            $("#escorder").css({"display": ""});
            $("#descorder").css({"display": "none"});
        }
        $("#columnname").html(column);
        var querywhereobj = getLocalStorage(localStorageName.querywhereobj)
        var querywherecolumn = querywhereobj[column];
        if (querywherecolumn == null) {
            $("#columnsx").val("");
            $("#columnsxt").val("contains");
            $("#datawheredel").css({"display": "none"});
        } else {
            $("#columnsxt").val(querywherecolumn.input_type);
            $("#columnsx").val(querywherecolumn.input_val);
            $("#datawheredel").css({"display": ""});
        }
    });

    $("#datawhere").click(function () {
        var columnname = $("#columnname").html();
        var x = $("#columnsx").val();
        // alert((" and "+columnname+" = ").trim().length);
        // alert( x.trim().length)
        closefloatmain("#columnswindow");
        var columnsxt = $("#columnsxt")
        var input_type = columnsxt.val()
        var where_val = columnsxt.find("option:selected").attr('sql-str').replace('{column}', columnname).replace('{value}', x)
        var querywhereobj = getLocalStorage(localStorageName.querywhereobj);
        var tableobj = getLocalStorage(localStorageName.tableobj);
        querywhereobj[columnname] = {
            'input_val': x,
            'input_type': input_type,
            'where_val': where_val,
        };
        tableobj.data_page = 1;
        setLocalStorage(localStorageName.querywhereobj, querywhereobj)
        setLocalStorage(localStorageName.tableobj, tableobj)
        getTableData();
    });
    $("#datawheredel").click(function () {
        closefloatmain("#columnswindow");
        var columnname = $("#columnname").html();
        var querywhereobj = getLocalStorage(localStorageName.querywhereobj);
        var tableobj = getLocalStorage(localStorageName.tableobj);
        delete querywhereobj[columnname];
        tableobj.data_page = 1;
        setLocalStorage(localStorageName.querywhereobj, querywhereobj)
        setLocalStorage(localStorageName.tableobj, tableobj)
        getTableData();
    });

    $("#delorder").click(function () {
        closefloatmain("#columnswindow");
        var columnname = $("#columnname").html();
        var oderbyobj = getLocalStorage(localStorageName.oderbyobj);
        var tableobj = getLocalStorage(localStorageName.tableobj);
        delete oderbyobj[columnname];
        tableobj.data_page = 1;
        setLocalStorage(localStorageName.oderbyobj, oderbyobj)
        setLocalStorage(localStorageName.tableobj, tableobj)
        getTableData();
    });
    $("#escorder").click(function () {
        closefloatmain("#columnswindow");
        var columnname = $("#columnname").html();
        var oderbyobj = getLocalStorage(localStorageName.oderbyobj);
        var tableobj = getLocalStorage(localStorageName.tableobj);
        oderbyobj[columnname] = " " + columnname + " ";
        tableobj.data_page = 1;
        setLocalStorage(localStorageName.oderbyobj, oderbyobj)
        setLocalStorage(localStorageName.tableobj, tableobj)
        getTableData();
    });

    $("#descorder").click(function () {
        closefloatmain("#columnswindow");
        var columnname = $("#columnname").html();
        var oderbyobj = getLocalStorage(localStorageName.oderbyobj);
        var tableobj = getLocalStorage(localStorageName.tableobj);
        oderbyobj[columnname] = " " + columnname + " desc ";
        tableobj.data_page = 1;
        setLocalStorage(localStorageName.oderbyobj, oderbyobj)
        setLocalStorage(localStorageName.tableobj, tableobj)
        getTableData();
    });


    $("#pagenum").change(function () {
        var tableobj = getLocalStorage(localStorageName.tableobj);
        tableobj.data_page = 1;
        tableobj.data_num = $(this).val();
        setLocalStorage(localStorageName.tableobj, tableobj);
        getTableData();
    });

    $("#pagesy").click(function () {
        var tableobj = getLocalStorage(localStorageName.tableobj);
        tableobj.data_page = 1;
        setLocalStorage(localStorageName.tableobj, tableobj);
        getTableData();
    })
    $("#pageup").click(function () {
        var tableobj = getLocalStorage(localStorageName.tableobj);
        if (tableobj.data_page <= 1) {
            tableobj.data_page = 1;
        } else {
            tableobj.data_page -= 1;
        }
        setLocalStorage(localStorageName.tableobj, tableobj);
        getTableData()
    })
    $("#pagedowm").click(function () {
        var tableobj = getLocalStorage(localStorageName.tableobj);
        tableobj.data_page += 1;
        setLocalStorage(localStorageName.tableobj, tableobj);
        getTableData()
    })
    $("#pagerefresh").click(function () {
        getTableData()
    })

    $(".kjlb3").delegate("li", "click", function () {
        var a = $(this).attr("data");
        if (a == null || a == "") {
            return;
        }
        var columnsx = $("#columnsx")
        var columnsxdom = columnsx[0]
        var startIndex = columnsxdom.selectionStart
        var endIndex = columnsxdom.selectionEnd
        columnsxdom.setRangeText(a, startIndex, endIndex, "end")
        columnsxdom.focus()
    });


});

function zdycolumnsok() {
    closefloatmain("#zdycolumnswindow");
    getTableData()
}

function show_one_data_update_data(id, columns, that) {
    data_cli_update_data(id, columns, $(that).html())
    closefloatmain("#zshow_one_data_window");
}

function show_one_data(idx, sqldataList) {
    var tableobj = getLocalStorage(localStorageName.tableobj);
    var sqldata = sqldataList[idx]
    console.log(sqldata)
    var one_data_context = $("#zshow_one_data_windowcontext")
    one_data_context.empty()
    for (var d2 in tableobj.mysql_table_columns) {
        var field = tableobj.mysql_table_columns[d2]['Field'];
        if (!$(`#zdycolumns${field}`).is(':checked')) {
            continue
        }
        var showxxx_text = $(`<div class="show_one_data_field_context" onclick="show_one_data_update_data('${sqldata[tableobj.mysql_table_columns_id]}','${field}',this)"></div>`)
        showxxx_text.text(sqldata[field])

        var showxxx_text_box = $(`<div class="show_one_data_field"></div>`)
        showxxx_text_box.append(`<div class="show_one_data_field_title">${field}</div>`)
        showxxx_text_box.append(showxxx_text)
        var showxxx_text_main_box = $(`<div id="show_one_data${field}" class="show_one_data_field_box" data-field="${field}"></div>`)
        showxxx_text_main_box.append(showxxx_text_box)
        one_data_context.append(showxxx_text_main_box)
    }
    openfloatmain("#zshow_one_data_window");
}

function getTableData() {
    openLoding()

    $("#tabledatashowthead").empty();
    $("#tabledatashowtbody").empty();
    var querywhereobj = getLocalStorage(localStorageName.querywhereobj);
    var query_where = "";
    for (var ddd in querywhereobj) {
        query_where += " and " + querywhereobj[ddd].where_val + " ";
    }
    var oderbyobj = getLocalStorage(localStorageName.oderbyobj);
    var query_orderby = "";
    var rrrrr = false;
    for (var ddd in oderbyobj) {
        query_orderby += " " + (rrrrr == false ? "" : ",") + oderbyobj[ddd] + " ";
        rrrrr = true;
    }
    var dbobj = getLocalStorage(localStorageName.nowconn);
    var tableobj = getLocalStorage(localStorageName.tableobj);
    if (tableobj == null) {
        window.location.hash = "#tables";
        return;
    }

    var mysql_column = []
    for (var d in tableobj.mysql_table_columns) {
        var column_name = tableobj.mysql_table_columns[d]['Field']
        if (!$(`#zdycolumns${column_name}`).is(':checked')) {
            continue
        }
        var column_type = tableobj.mysql_table_columns[d]['Type'];
        if (as_text_column(column_type)) {
            mysql_column.push(` AsText(\`${column_name}\`) as \`${column_name}\` `)
        } else {
            mysql_column.push(` \`${column_name}\` `)
        }

    }

    $.ajax({
        url: "/webdb/php/getTableData.php",
        type: "get",
        dataType: "json",
        data: {
            mysql_server_name: dbobj.mysql_server_name,
            mysql_username: dbobj.mysql_username,
            mysql_password: dbobj.mysql_password,
            mysql_database: dbobj.mysql_database,
            mysql_table: tableobj.mysql_table,
            mysql_column: mysql_column.join(","),
            data_num: tableobj.data_num,
            data_page: tableobj.data_page,
            query_where: query_where,
            query_orderby: query_orderby
        },
        success: function (data) {
            closeLoding()
            console.log(data);
            if (data == false) {
                alert("数据库连接失败")
            } else {
                var sqldataList = data["data"];
                lastSqldataList = sqldataList

                $("#tabledatashowthead").empty();
                $("#tabledatashowtbody").empty();
                var ttr2 = $('<tr style="text-align: center;" class="table_title_sticky">');
                ttr2.append(`<td onclick="openfloatmain('#zdycolumnswindow');" class="table_left_sticky" style="background: #5a92ef">序号</td>`);
                for (var d in tableobj.mysql_table_columns) {
                    var mysql_table_column = tableobj.mysql_table_columns[d]['Field'];
                    if (!$(`#zdycolumns${mysql_table_column}`).is(':checked')) {
                        continue
                    }
                    var oderbyobj = getLocalStorage(localStorageName.oderbyobj);
                    var querywhereobj = getLocalStorage(localStorageName.querywhereobj);
                    var oderbyobjcolumnname = oderbyobj[mysql_table_column];
                    var querywhereobjcolumn = querywhereobj[mysql_table_column];
                    ttr2.append('<td data-column="' + mysql_table_column + '" >' + mysql_table_column + (querywhereobjcolumn == null ? "" : "<span style='color:red'> ->?</span>") + (oderbyobjcolumnname == null ? "" : "<span style='color: #feff08'> ->O</span>") + '</td>')
                }
                $("#tabledatashowthead").append(ttr2);
                var xxtabledatashowtbody = $("#tabledatashowtbody");
                for (var d in sqldataList) {
                    var sqldata = sqldataList[d]
                    var btr = $('<tr>');
                    btr.append(`<td onclick="show_one_data(${parseInt(d)},lastSqldataList)"  class="table_left_sticky">${(parseInt(d) + 1)}</td>`)

                    for (var d2 in tableobj.mysql_table_columns) {
                        var field = tableobj.mysql_table_columns[d2]['Field'];
                        if (!$(`#zdycolumns${field}`).is(':checked')) {
                            continue
                        }
                        var btd = $(`<td data-columns="\`field\`"></td>`)
                        btd.text(sqldata[field])
                        btr.append(btd)
                    }
                    if (tableobj.mysql_table_columns_id != null) {
                        btr.attr("data-id", sqldata[tableobj.mysql_table_columns_id]);
                    }
                    xxtabledatashowtbody.append(btr);
                }
                setLocalStorage(localStorageName.tableobj, tableobj);
            }
        }, error: function () {
            alert("出错了！")
            closeLoding();
        }
    });
};

