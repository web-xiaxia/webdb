var table_filter_box_open = false
var filter_condition_sql_str = {
    "=": "{column} = '{value}'",
    "<>": "{column} <> '{value}'",
    "<": "{column} < '{value}'",
    ">": "{column} > '{value}'",
    "<=": "{column} <= '{value}'",
    ">=": "{column} >= '{value}'",
    "in": "{column} in ({value})",
    "not_in": "{column} not in ({value})",
    "is_null": "{column} is null",
    "is_not_null": "{column} is not null",
    "between": "{column} between {value} ",
    "not_between": "{column} not between {value} ",
    "contains": "{column} like '%{value}%'",
    "not_contains": "{column} not like '%{value}%'",
    "has_prefix": "{column} like '{value}%'",
    "has_suffix": "{column} like '%{value}'",
    "sql": "{value}",
}
var filter_condition_option_list = [
    `<option value="=" sql-str="{column} = '{value}'">=</option>`,
    `<option value="<>" sql-str="{column} <> '{value}'"><></option>`,
    `<option value="<" sql-str="{column} < '{value}'"><</option>`,
    `<option value=">" sql-str="{column} > '{value}'">></option>`,
    `<option value="<=" sql-str="{column} <= '{value}'"><=</option>`,
    `<option value=">=" sql-str="{column} >= '{value}'">>=</option>`,
    `<option value="in" sql-str="{column} in ({value})" tips="1,2,3">IN</option>`,
    `<option value="not_in" sql-str="{column} not in ({value})" tips="1,2,3">NOT IN</option>`,
    `<option value="is_null" sql-str="{column} is null">IS NULL</option>`,
    `<option value="is_not_null" sql-str="{column} is not null">IS NOT NULL</option>`,
    `<option value="between" sql-str="{column} between {value} " tips="1 AND 3">BETWEEN</option>`,
    `<option value="not_between" sql-str="{column} not between {value} " tips="1 AND 3">NOT BETWEEN</option>`,
    `<option value="contains" sql-str="{column} like '%{value}%'">Contains</option>`,
    `<option value="not_contains" sql-str="{column} not like '%{value}%'">Not contains</option>`,
    `<option value="has_prefix" sql-str="{column} like '{value}%'">Has prefix</option>`,
    `<option value="has_suffix" sql-str="{column} like '%{value}'">Has suffix</option>`,
    `<option value="sql" >SQL</option>`,
]
var filter_columns_option_list = []

function inittabledata() {
    close_table_filter()

    var columnsxt = $('#columnsxt')
    columnsxt.empty()
    for (var index in filter_condition_option_list) {
        var filter_option = $(filter_condition_option_list[index])
        columnsxt.append(filter_option)
    }

    var conn_name = GetMaoQueryString('conn_name')
    var database = GetMaoQueryString('database')
    var table = GetMaoQueryString('table')
    var table_columns = getLocalStorage(localStorageName.tableColumns + conn_name + ":" + database + ":" + table);
    if (table_columns == null) {
        window.location.hash = `#tables?conn_name=${conn_name}&database=${database}`;
    }

    $('#zdycolumnsyablename').html(`表名：${table}`)

    var zdycolumnswindowcontext = $("#zdycolumnswindowcontext")
    zdycolumnswindowcontext.empty()
    filter_columns_option_list = []
    for (var d in table_columns.mysql_table_columns) {
        var column_name = table_columns.mysql_table_columns[d]['Field']
        zdycolumnswindowcontext.append(`<div><input type="checkbox" class="zdycolumns" id="zdycolumns${column_name}" checked> <label for="zdycolumns${column_name}">${column_name}</label> </div>`)
        filter_columns_option_list.push(`<option value="${column_name}">${column_name}</option>`)
    }
    getTableData();
    $("#tabledata").slideDown(gddhms);
}

function close_table_filter(source) {
    table_filter_box_open = false
    $('#tablefiltertipbox').css({'color': 'black'})
    if (source == 'btn') {
        closefloatmain("#tablefilterbox")
        getTableData();
    }
}

function open_table_filter(source) {
    table_filter_box_open = true
    $('#tablefiltertipbox').css({'color': '#0062ff'})
    if (source == 'btn') {
        closefloatmain("#tablefilterbox")
        getTableData();
    }
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

function get_init_table_filter() {

    return {
        'checked': true,
        'name': new Date().getTime() + "|" + Math.random(),
        'condition': 'contains',
        'column': $(filter_columns_option_list[0]).val(),
        'value': '',
    }
}

function tablefiltercontextboxaddbtn(filter_data_name) {
    var table_filter = get_init_table_filter()
    var conn_name = GetMaoQueryString('conn_name')
    var database = GetMaoQueryString('database')
    var table = GetMaoQueryString('table')
    setLocalStorage(localStorageName.tablefilterinfo + conn_name + ":" + database + ":" + table + ':' + table_filter.name, table_filter);
    $('#tablefiltercontextbox').find(`.filter_box[data-name='${filter_data_name}']`).after(tablefiltercontextboxadd(table_filter))
    var table_filters = getLocalStorage(localStorageName.tablefilter + conn_name + ":" + database + ":" + table, true, []);
    var new_table_filters = []
    for (var index in table_filters) {
        var xx = table_filters[index]
        new_table_filters.push(xx)
        console.log(xx, filter_data_name)
        if (xx == filter_data_name) {
            new_table_filters.push(table_filter.name)
        }
    }
    setLocalStorage(localStorageName.tablefilter + conn_name + ":" + database + ":" + table, new_table_filters);
}

function tablefiltercontextboxdeletebtn(filter_data_name) {
    var filter_box = $('#tablefiltercontextbox').find('.filter_box')
    if (filter_box.length > 1) {
        var conn_name = GetMaoQueryString('conn_name')
        var database = GetMaoQueryString('database')
        var table = GetMaoQueryString('table')
        delLocalStorage(localStorageName.tablefilterinfo + conn_name + ":" + database + ":" + table + ':' + filter_data_name);
        var table_filters = getLocalStorage(localStorageName.tablefilter + conn_name + ":" + database + ":" + table, true, []);
        var new_table_filters = []
        for (var index in table_filters) {
            var xx = table_filters[index]

            if (xx != filter_data_name) {
                new_table_filters.push(xx)
            }
        }
        setLocalStorage(localStorageName.tablefilter + conn_name + ":" + database + ":" + table, new_table_filters);
        $('#tablefiltercontextbox').find(`[data-name='${filter_data_name}']`).remove()
    }
}

function tablefiltercontextboxadd(table_filter) {
    var checkbox = $(`<input type="checkbox" data-name="${table_filter.name}" class="filter_checkbox" ${table_filter.checked ? 'checked' : ''}>`)

    var filter_column_select = $(`<select data-name="${table_filter.name}" class="filter_column"></select>`)
    for (var index in filter_columns_option_list) {
        var filter_columns_option = $(filter_columns_option_list[index])
        filter_column_select.append(filter_columns_option)
    }

    if (table_filter.column) {
        filter_column_select.val(table_filter.column)
    }

    var filter_condition_select = $(`<select data-name="${table_filter.name}" class="filter_condition"></select>`)
    for (var index2 in filter_condition_option_list) {
        var filter_option = $(filter_condition_option_list[index2])
        filter_condition_select.append(filter_option)
    }
    filter_condition_select.val(table_filter.condition)


    var input = $(`<input type="text" class="filter_value"  data-name="${table_filter.name}" value="${table_filter.value || ''}"/>`)

    var bpxl1 = $(`<div class="filter_line1"></div>`)
    bpxl1.append(checkbox)
    bpxl1.append(filter_column_select)
    bpxl1.append(filter_condition_select)
    bpxl1.append($(`<div class="filter_add"  onclick="tablefiltercontextboxaddbtn('${table_filter.name}')">+</div>`))
    bpxl1.append($(`<div class="filter_delete"   onclick="tablefiltercontextboxdeletebtn('${table_filter.name}')">-</div>`))

    var bpxl2 = $(`<div  class="filter_line2"></div>`)
    bpxl2.append(input)
    var bpx = $(`<div class="filter_box" data-name="${table_filter.name}"></div>`)
    bpx.append(bpxl1)
    bpx.append(bpxl2)
    return bpx
}

function change_table_filter_info(that, v) {
    var data_name = $(that).attr('data-name')
    console.log(data_name)
    if (data_name) {
        var conn_name = GetMaoQueryString('conn_name')
        var database = GetMaoQueryString('database')
        var table = GetMaoQueryString('table')
        var table_filter = getLocalStorage(localStorageName.tablefilterinfo + conn_name + ":" + database + ":" + table + ':' + data_name);
        if (table_filter) {
            for (var iii in v) {
                table_filter[iii] = v[iii]
            }
            setLocalStorage(localStorageName.tablefilterinfo + conn_name + ":" + database + ":" + table + ':' + data_name, table_filter);
        }
    }
}

$(function () {
    var tablefiltertipboxtouchtimeout=null
    $("#tableffff").on('touchstart',function (){
        tablefiltertipboxtouchtimeout=setTimeout(function (){
            $("#tableffff").css({'display':"none"})
            setTimeout(function (){
                window.getSelection().removeAllRanges()
                $("#tableffff").css({'display':""})
            },3000)
        },1000)
    })
    $("#tableffff").on('touchend',function (){
        clearTimeout(tablefiltertipboxtouchtimeout)
    })
    $("#tablefiltertipbox").click(function () {
        var tablefiltercontextbox = $('#tablefiltercontextbox')
        tablefiltercontextbox.empty()
        var conn_name = GetMaoQueryString('conn_name')
        var database = GetMaoQueryString('database')
        var table = GetMaoQueryString('table')
        var table_filters = getLocalStorage(localStorageName.tablefilter + conn_name + ":" + database + ":" + table, true, []);
        if (table_filters.length == 0) {
            var table_filter = get_init_table_filter()
            setLocalStorage(localStorageName.tablefilterinfo + conn_name + ":" + database + ":" + table + ':' + table_filter.name, table_filter);
            table_filters.push(table_filter.name)
            setLocalStorage(localStorageName.tablefilter + conn_name + ":" + database + ":" + table, table_filters);
        }
        for (var index in table_filters) {
            var table_filter_name = table_filters[index]
            var table_filter = getLocalStorage(localStorageName.tablefilterinfo + conn_name + ":" + database + ":" + table + ':' + table_filter_name, table_filters);
            if (table_filter) {
                tablefiltercontextbox.append(tablefiltercontextboxadd(table_filter))
            }
        }

        openfloatmain("#tablefilterbox")

    })
    $("#tablefiltercontextbox").delegate(".filter_checkbox", "click", function () {
        change_table_filter_info(this, {
            'checked': $(this).is(':checked'),
        })
    })
    $("#tablefiltercontextbox").delegate(".filter_column", "change", function () {
        change_table_filter_info(this, {
            'column': $(this).val(),
        })
    })
    $("#tablefiltercontextbox").delegate(".filter_condition", "change", function () {
        change_table_filter_info(this, {
            'condition': $(this).val(),
        })
    })
    $("#tablefiltercontextbox").delegate(".filter_value", "input propertychange", function () {
        change_table_filter_info(this, {
            'value': $(this).val()
        })
    })
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
        var querywhereobj = getLocalStorage(localStorageName.querywhereobj + conn_name + ":" + database + ":" + table);
        var table_data_page = getLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, true, {
            'data_num': 15,
            'data_page': 1,
        });
        querywhereobj[columnname] = {
            'input_val': x,
            'input_type': input_type,
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

function getTableQueryData(){
    var conn_name = GetMaoQueryString('conn_name')
    var database = GetMaoQueryString('database')
    var table = GetMaoQueryString('table')
    var table_columns = getLocalStorage(localStorageName.tableColumns + conn_name + ":" + database + ":" + table);
    if (table_columns == null) {
        window.location.hash = `#tables?conn_name=${conn_name}&database=${database}`;
        return;
    }
    var oderbyobjdef={}
    if (table_columns.mysql_table_columns_id != null) {
        oderbyobjdef[table_columns.mysql_table_columns_id]=` \`${table_columns.mysql_table_columns_id}\` desc `
    }
    var querywhereobj = getLocalStorage(localStorageName.querywhereobj + conn_name + ":" + database + ":" + table, true, {});
    var oderbyobj = getLocalStorage(localStorageName.oderbyobj + conn_name + ":" + database + ":" + table, true, oderbyobjdef);
    var table_data_page = getLocalStorage(localStorageName.tablePage + conn_name + ":" + database + ":" + table, true, {
        'data_num': 15,
        'data_page': 1,
    });
    var table_filter_group = {}
    if (table_filter_box_open) {
        var table_filters = getLocalStorage(localStorageName.tablefilter + conn_name + ":" + database + ":" + table, true, []);
        for (var iiii in table_filters) {
            var table_filter_name = table_filters[iiii]
            var table_filter = getLocalStorage(localStorageName.tablefilterinfo + conn_name + ":" + database + ":" + table + ':' + table_filter_name);
            if (table_filter.checked) {
                var table_filter_sql_list = table_filter_group[table_filter.column]
                if (table_filter_sql_list == null) {
                    table_filter_sql_list = []
                    table_filter_group[table_filter.column] = table_filter_sql_list
                }
                table_filter_sql_list.push(table_filter)
            }
        }
    }
    $("#pagenum").val(table_data_page.data_num)

    var mysql_column = []
    var query_where = [];
    var query_orderby = [];
    for (var d in table_columns.mysql_table_columns) {
        var column_name = table_columns.mysql_table_columns[d]['Field']

        var tqwobj = table_filter_group[column_name]
        if (tqwobj) {
            for (var xxx in tqwobj) {
                var table_filter = tqwobj[xxx]
                var where_val = filter_condition_sql_str[table_filter.condition].replace('{column}', `\`${table_filter.column}\``).replace('{value}', table_filter.value)
                query_where.push(` and ${where_val} `)
            }
        }

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
            var where_val = filter_condition_sql_str[qwobj.input_type].replace('{column}', `\`${column_name}\``).replace('{value}', qwobj.input_val)
            query_where.push(` and ${where_val} `)
        }

        var qoby = oderbyobj[column_name]
        if (qoby) {
            query_orderby.push(` ${qoby} `)
        }
    }
    return {
        "query_data":{
            'conn_str': getLocalStorage(localStorageName.connObj + conn_name),
            'mysql_database': database,
            'mysql_table': table,
            'mysql_column': mysql_column.join(","),
            'query_where': query_where.join(' '),
            'query_orderby': query_orderby.join(','),
            'data_num': table_data_page.data_num,
            'data_page': table_data_page.data_page,
        },
        'conn_name':conn_name,
        'database':database,
        'table':table,
        'table_columns':table_columns,
        'oderbyobj':oderbyobj,
        'querywhereobj':querywhereobj,
    }
}
function getTableDataCount() {
    var queryDataFull =getTableQueryData()
    var query_data = queryDataFull.query_data
    openLoding()
    $('#page-other-count').text('无')
    $.ajax({
        url: "/webdb/php/getTableDataCount.php",
        type: "post",
        dataType: "json",
        data: query_data,
        success: function (data) {
            closeLoding()
            if (data == false) {
                alert("数据库连接失败")
            }else{
                $('#page-other-count').text(data['count'])
            }
        }
    })
}
function getTableData() {
    openLoding()

    var queryDataFull =getTableQueryData()
    var query_data = queryDataFull.query_data
    var conn_name = queryDataFull.conn_name
    var database = queryDataFull.database
    var table = queryDataFull.table
    var table_columns = queryDataFull.table_columns
    var oderbyobj = queryDataFull.oderbyobj
    var querywhereobj = queryDataFull.querywhereobj

    $("#tabledatashowthead").empty();
    $("#tabledatashowtbody").empty();
    $("#page-other-sql").text('无')
    $.ajax({
        url: "/webdb/php/getTableData.php",
        type: "post",
        dataType: "json",
        data: query_data,
        success: function (data) {
            closeLoding()
            console.log(data);
            if (data == false) {
                alert("数据库连接失败")
            } else {
                $("#page-other-sql").text(data["e2"])
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
                    var oderbyobjcolumnname = oderbyobj[mysql_table_column];
                    var querywhereobjcolumn = querywhereobj[mysql_table_column];
                    var oderbytip = "&#xe879;"
                    if (oderbyobjcolumnname){
                        var oderbyobjcolumnnamesplit = oderbyobjcolumnname.trim().split(" ")
                        if (oderbyobjcolumnnamesplit.length>1&&oderbyobjcolumnnamesplit[oderbyobjcolumnnamesplit.length-1].toLowerCase()=='desc'){
                            oderbytip = '&#xe878;'
                        }
                    }

                    ttr2.append('<td data-column="' + mysql_table_column + '" >' + mysql_table_column + (querywhereobjcolumn == null ? "" : "<span class='iconfont' style='color:red'> &#xe612;</span>") + (oderbyobjcolumnname == null ? "" : "<span class='iconfont' style='color: #feff08'> "+oderbytip+"</span>") + '</td>')
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

