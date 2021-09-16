function inittabledata() {
    var conn_name = GetMaoQueryString('conn_name')
    var database = GetMaoQueryString('database')
    var table = GetMaoQueryString('table')
    var table_columns = getLocalStorage(localStorageName.tableColumns + conn_name + ":" + database + ":" + table);

    $('#zdycolumnsyablename').html(`表名：${table}`)

    var zdycolumnswindowcontext = $("#zdycolumnswindowcontext")
    zdycolumnswindowcontext.empty()
    for (var d in table_columns.mysql_table_columns) {
        var column_name = table_columns.mysql_table_columns[d]['Field']
        zdycolumnswindowcontext.append(`<div><input type="checkbox" class="zdycolumns" id="zdycolumns${column_name}" checked> <label for="zdycolumns${column_name}">${column_name}</label> </div>`)
    }
    getTableData();
    $("#tabledata").slideDown(gddhms);
}

function columnsx_set(val) {
    $('#columnsxt').val(val);
    columnsx_init($("#columnsxt"))

}

function columnsx_init(that) {
    var columnsx = $("#columnsx")
    columnsx.val('')
    columnsx.attr('placeholder', that.find("option:selected").attr('tips') || '')
    $('#columnsx')[0].focus()
}

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
        columnsx_init($(this))
    })

    $("#tabledatashowthead").delegate("td", "click", function () {

        var column = $(this).attr('data-column');
        if (column == null || column == undefined || column == "") {
            return;
        }
        var conn_name = GetMaoQueryString('conn_name')
        var database = GetMaoQueryString('database')
        var table = GetMaoQueryString('table')
        openfloatmain("#columnswindow");
        var oderbyobj = getLocalStorage(localStorageName.oderbyobj + conn_name + ":" + database + ":" + table)
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

        var querywhereobj = getLocalStorage(localStorageName.querywhereobj + conn_name + ":" + database + ":" + table)
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
        var conn_name = GetMaoQueryString('conn_name')
        var database = GetMaoQueryString('database')
        var table = GetMaoQueryString('table')
        closefloatmain("#columnswindow");
        var columnsxt = $("#columnsxt")
        var input_type = columnsxt.val()
        var where_val = columnsxt.find("option:selected").attr('sql-str').replace('{column}', columnname).replace('{value}', x)
        var querywhereobj = getLocalStorage(localStorageName.querywhereobj + conn_name + ":" + database + ":" + table);
        var table_data_page = getLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, true, {
            'data_num': 15,
            'data_page': 1,
        });
        querywhereobj[columnname] = {
            'input_val': x,
            'input_type': input_type,
            'where_val': where_val,
        };
        table_data_page.data_page = 1;
        setLocalStorage(localStorageName.querywhereobj + conn_name + ":" + database + ":" + table, querywhereobj)
        setLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, table_data_page)
        getTableData();
    });
    $("#datawheredel").click(function () {
        closefloatmain("#columnswindow");
        var conn_name = GetMaoQueryString('conn_name')
        var database = GetMaoQueryString('database')
        var table = GetMaoQueryString('table')
        var columnname = $("#columnname").html();
        var querywhereobj = getLocalStorage(localStorageName.querywhereobj + conn_name + ":" + database + ":" + table);
        var table_data_page = getLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, true, {
            'data_num': 15,
            'data_page': 1,
        });
        delete querywhereobj[columnname];
        table_data_page.data_page = 1;
        setLocalStorage(localStorageName.querywhereobj + conn_name + ":" + database + ":" + table, querywhereobj)
        setLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, table_data_page)
        getTableData();
    });

    $("#delorder").click(function () {
        closefloatmain("#columnswindow");
        var conn_name = GetMaoQueryString('conn_name')
        var database = GetMaoQueryString('database')
        var table = GetMaoQueryString('table')
        var columnname = $("#columnname").html();
        var oderbyobj = getLocalStorage(localStorageName.oderbyobj + conn_name + ":" + database + ":" + table);
        var table_data_page = getLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, true, {
            'data_num': 15,
            'data_page': 1,
        });
        delete oderbyobj[columnname];
        table_data_page.data_page = 1;
        setLocalStorage(localStorageName.oderbyobj + conn_name + ":" + database + ":" + table, oderbyobj)
        setLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, table_data_page)
        getTableData();
    });
    $("#escorder").click(function () {
        closefloatmain("#columnswindow");
        var conn_name = GetMaoQueryString('conn_name')
        var database = GetMaoQueryString('database')
        var table = GetMaoQueryString('table')
        var columnname = $("#columnname").html();
        var oderbyobj = getLocalStorage(localStorageName.oderbyobj + conn_name + ":" + database + ":" + table);
        var table_data_page = getLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, true, {
            'data_num': 15,
            'data_page': 1,
        });
        oderbyobj[columnname] = " " + columnname + " ";
        table_data_page.data_page = 1;
        setLocalStorage(localStorageName.oderbyobj + conn_name + ":" + database + ":" + table, oderbyobj)
        setLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, table_data_page)
        getTableData();
    });

    $("#descorder").click(function () {
        closefloatmain("#columnswindow");
        var conn_name = GetMaoQueryString('conn_name')
        var database = GetMaoQueryString('database')
        var table = GetMaoQueryString('table')
        var columnname = $("#columnname").html();
        var oderbyobj = getLocalStorage(localStorageName.oderbyobj + conn_name + ":" + database + ":" + table);
        var table_data_page = getLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, true, {
            'data_num': 15,
            'data_page': 1,
        });
        oderbyobj[columnname] = " " + columnname + " desc ";
        table_data_page.data_page = 1;
        setLocalStorage(localStorageName.oderbyobj + conn_name + ":" + database + ":" + table, oderbyobj)
        setLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, table_data_page)
        getTableData();
    });


    $("#pagenum").change(function () {
        var conn_name = GetMaoQueryString('conn_name')
        var database = GetMaoQueryString('database')
        var table = GetMaoQueryString('table')
        var table_data_page = getLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, true, {
            'data_num': 15,
            'data_page': 1,
        });
        table_data_page.data_page = 1;
        table_data_page.data_num = $(this).val();
        setLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, table_data_page)
        getTableData();
    });

    $("#pagesy").click(function () {
        var conn_name = GetMaoQueryString('conn_name')
        var database = GetMaoQueryString('database')
        var table = GetMaoQueryString('table')
        var table_data_page = getLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, true, {
            'data_num': 15,
            'data_page': 1,
        });
        table_data_page.data_page = 1;
        setLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, table_data_page)
        getTableData();
    })
    $("#pageup").click(function () {
        var conn_name = GetMaoQueryString('conn_name')
        var database = GetMaoQueryString('database')
        var table = GetMaoQueryString('table')
        var table_data_page = getLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, true, {
            'data_num': 15,
            'data_page': 1,
        });
        if (table_data_page.data_page <= 1) {
            table_data_page.data_page = 1;
        } else {
            table_data_page.data_page -= 1;
        }
        setLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, table_data_page)
        getTableData()
    })
    $("#pagedowm").click(function () {
        var conn_name = GetMaoQueryString('conn_name')
        var database = GetMaoQueryString('database')
        var table = GetMaoQueryString('table')
        var table_data_page = getLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, true, {
            'data_num': 15,
            'data_page': 1,
        });
        table_data_page.data_page += 1;
        setLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, table_data_page)
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

function show_one_data(conn_name, database, table, sqldata) {
    var table_columns = getLocalStorage(localStorageName.tableColumns + conn_name + ":" + database + ":" + table);
    var one_data_context = $("#zshow_one_data_windowcontext")
    one_data_context.empty()
    for (var d2 in table_columns.mysql_table_columns) {
        var field = table_columns.mysql_table_columns[d2]['Field'];
        if (!$(`#zdycolumns${field}`).is(':checked')) {
            continue
        }
        var showxxx_text = $(`<div class="show_one_data_field_context" onclick="show_one_data_update_data('${sqldata[table_columns.mysql_table_columns_id]}','${field}',this)"></div>`)
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

function xuhao_td(d, conn_name, database, table, sqldata) {
    var bttd = $(`<td class="table_left_sticky" data-index="${d}">${(parseInt(d) + 1)}</td>`)
    bttd.click(function () {
        show_one_data(conn_name, database, table, sqldata)
    })
    return bttd
}

function getTableData() {
    openLoding()
    var conn_name = GetMaoQueryString('conn_name')
    var database = GetMaoQueryString('database')
    var table = GetMaoQueryString('table')
    var table_columns = getLocalStorage(localStorageName.tableColumns + conn_name + ":" + database + ":" + table);
    if (table_columns == null) {
        window.location.hash = `#tables?conn_name=${conn_name}&database=${database}`;
        return;
    }
    var querywhereobj = getLocalStorage(localStorageName.querywhereobj + conn_name + ":" + database + ":" + table, true, {});
    var oderbyobj = getLocalStorage(localStorageName.oderbyobj + conn_name + ":" + database + ":" + table, true, {});
    var table_data_page = getLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, true, {
        'data_num': 15,
        'data_page': 1,
    });

    var mysql_column = []
    var query_where = [];
    var query_orderby = [];
    for (var d in table_columns.mysql_table_columns) {
        var column_name = table_columns.mysql_table_columns[d]['Field']
        if (!$(`#zdycolumns${column_name}`).is(':checked')) {
            continue
        }
        var column_type = table_columns.mysql_table_columns[d]['Type'];
        if (as_text_column(column_type)) {
            mysql_column.push(` AsText(\`${column_name}\`) as \`${column_name}\` `)
        } else {
            mysql_column.push(` \`${column_name}\` `)
        }

        var qwobj = querywhereobj[column_name]
        if (qwobj) {
            query_where.push(` and ${qwobj.where_val} `)
        }
        var qoby = oderbyobj[column_name]
        if (qoby) {
            query_orderby.push(` ${qoby} `)
        }
    }

    $("#tabledatashowthead").empty();
    $("#tabledatashowtbody").empty();
    $.ajax({
        url: "/webdb/php/getTableData.php",
        type: "post",
        dataType: "json",
        data: {
            'conn_str': getLocalStorage(localStorageName.connObj + conn_name),
            'mysql_database': database,
            'mysql_table': table,
            'mysql_column': mysql_column.join(","),
            'query_where': query_where.join(' '),
            'query_orderby': query_orderby.join(','),
            'data_num': table_data_page.data_num,
            'data_page': table_data_page.data_page,
        },
        success: function (data) {
            closeLoding()
            console.log(data);
            if (data == false) {
                alert("数据库连接失败")
            } else {
                var sqldataList = data["data"];

                $("#tabledatashowthead").empty();
                $("#tabledatashowtbody").empty();
                var ttr2 = $('<tr style="text-align: center;" class="table_title_sticky">');
                ttr2.append(`<td onclick="openfloatmain('#zdycolumnswindow');" class="table_left_sticky" style="background: #5a92ef">序号</td>`);
                for (var d in table_columns.mysql_table_columns) {
                    var mysql_table_column = table_columns.mysql_table_columns[d]['Field'];
                    if (!$(`#zdycolumns${mysql_table_column}`).is(':checked')) {
                        continue
                    }
                    var oderbyobj = getLocalStorage(localStorageName.oderbyobj + conn_name + ":" + database + ":" + table);
                    var querywhereobj = getLocalStorage(localStorageName.querywhereobj + conn_name + ":" + database + ":" + table);
                    var oderbyobjcolumnname = oderbyobj[mysql_table_column];
                    var querywhereobjcolumn = querywhereobj[mysql_table_column];
                    ttr2.append('<td data-column="' + mysql_table_column + '" >' + mysql_table_column + (querywhereobjcolumn == null ? "" : "<span style='color:red'> ->?</span>") + (oderbyobjcolumnname == null ? "" : "<span style='color: #feff08'> ->O</span>") + '</td>')
                }
                $("#tabledatashowthead").append(ttr2);
                var xxtabledatashowtbody = $("#tabledatashowtbody");
                for (var d in sqldataList) {
                    var sqldata = sqldataList[d]

                    var bttd = xuhao_td(d, conn_name, database, table, sqldata)
                    var btr = $('<tr>');
                    btr.append(bttd)

                    for (var d2 in table_columns.mysql_table_columns) {
                        var field = table_columns.mysql_table_columns[d2]['Field'];
                        if (!$(`#zdycolumns${field}`).is(':checked')) {
                            continue
                        }
                        var btd = $(`<td data-columns="\`${field}\`"></td>`)
                        btd.text(sqldata[field])
                        btr.append(btd)
                    }
                    if (table_columns.mysql_table_columns_id != null) {
                        btr.attr("data-id", sqldata[table_columns.mysql_table_columns_id]);
                    }
                    xxtabledatashowtbody.append(btr);
                }
            }
        }, error: function () {
            alert("出错了！")
            closeLoding();
        }
    });
};

