var tablecolumnsobj = {};
var nowSqlName = ''
var sql_conn_name = ''
var sql_database = ''

function inittabledata2() {
    $("#tabledata2").slideDown(gddhms);
    var conn_name = GetMaoQueryString('conn_name')
    var database = GetMaoQueryString('database')
    var tableList = getLocalStorage(localStorageName.tableList + conn_name + ':' + database);
    if (tableList == null) {
        window.location.hash = "#databases?conn_name" + conn_name;
        return;
    }
    sql_conn_name = conn_name
    sql_database = database
    $("#tablenamelistul").empty();
    $("#tablenamelistul2").empty();
    for (var d in tableList) {
        $("#tablenamelistul").append('<li data=" `' + tableList[d] + '` ">' + tableList[d] + '</li>')
        $("#tablenamelistul2").append('<li data=" `' + tableList[d] + '` ">' + tableList[d] + '</li>')
    }

    nowSqlName = getLocalStorage(localStorageName.zdysqlnow + sql_conn_name + ':' + sql_database, false)
    if (!nowSqlName) {
        addSqlList()
    }else {
        sqlListBoxInit()
    }
}


var sqlTips = [
    {
        "search_text": "select",
        "show_text": "SELECT",
        "insert_text": "SELECT ",
    }, {
        "search_text": "from",
        "show_text": "FROM",
        "insert_text": "FROM ",
    }, {
        "search_text": "update",
        "show_text": "UPDATE",
        "insert_text": "UPDATE ",
    }, {
        "search_text": "set",
        "show_text": "SET",
        "insert_text": "SET ",
    }, {
        "search_text": "insert",
        "show_text": "INSERT INTO",
        "insert_text": "INSERT INTO ",
    }, {
        "search_text": "values",
        "show_text": "VALUES",
        "insert_text": "VALUES ",
    }, {
        "search_text": "delete",
        "show_text": "DELETE",
        "insert_text": "DELETE ",
    }, {
        "search_text": "left",
        "show_text": "LEFT JOIN",
        "insert_text": "LEFT JOIN ",
    }, {
        "search_text": "right",
        "show_text": "RIGHT JOIN",
        "insert_text": "RIGHT JOIN ",
    }, {
        "search_text": "inner",
        "show_text": "INNER JOIN",
        "insert_text": "INNER JOIN ",
    }, {
        "search_text": "where",
        "show_text": "WHERE",
        "insert_text": "WHERE ",
    }, {
        "search_text": "is",
        "show_text": "IS NULL",
        "insert_text": "IS NULL ",
    }, {
        "search_text": "is",
        "show_text": "IS NOT NULL",
        "insert_text": "IS NOT NULL ",
    }, {
        "search_text": "exists",
        "show_text": "EXISTS",
        "insert_text": "EXISTS ",
    }, {
        "search_text": "group",
        "show_text": "GROUP BY",
        "insert_text": "GROUP BY ",
    }, {
        "search_text": "order",
        "show_text": "ORDER BY",
        "insert_text": "ORDER BY ",
    }, {
        "search_text": "limit",
        "show_text": "LIMIT 0,1",
        "insert_text": "LIMIT 0,1 ",
    }, {
        "search_text": "limit",
        "show_text": "LIMIT 0,20",
        "insert_text": "LIMIT 0,20 ",
    }, {
        "search_text": "limit",
        "show_text": "LIMIT 0,100",
        "insert_text": "LIMIT 0,100 ",
    }, {
        "search_text": "limit",
        "show_text": "LIMIT 0,500",
        "insert_text": "LIMIT 0,500 ",
    }, {
        "search_text": "abs",
        "show_text": "ABS",
        "insert_text": "ABS( ",
    }, {
        "search_text": "count",
        "show_text": "COUNT ID",
        "insert_text": "COUNT(id) ",
    }, {
        "search_text": "count",
        "show_text": "COUNT *",
        "insert_text": "COUNT(*) ",
    }, {
        "search_text": "sum",
        "show_text": "SUM",
        "insert_text": "SUM( ",
    }, {
        "search_text": "avg",
        "show_text": "AVG",
        "insert_text": "AVG( ",
    }, {
        "search_text": "round",
        "show_text": "ROUND",
        "insert_text": "ROUND( ",
    }, {
        "search_text": "group",
        "show_text": "GROUP_CONCAT",
        "insert_text": "GROUP_CONCAT( ",
    }, {
        "search_text": "concat",
        "show_text": "CONCAT",
        "insert_text": "CONCAT( ",
    }, {
        "search_text": "date",
        "show_text": "DATE_FORMAT",
        "insert_text": "DATE_FORMAT( ,'%Y-%m-%d %H:%s:%i')",
    }, {
        "search_text": "left",
        "show_text": "LEFT",
        "insert_text": "LEFT( ",
    }, {
        "search_text": "length",
        "show_text": "LENGTH",
        "insert_text": "LENGTH( ",
    }, {
        "search_text": "ltrim",
        "show_text": "LTRIM",
        "insert_text": "LTRIM( ",
    }, {
        "search_text": "right",
        "show_text": "RIGHT",
        "insert_text": "RIGHT( ",
    }, {
        "search_text": "rtrim",
        "show_text": "RTRIM",
        "insert_text": "RTRIM( ",
    }, {
        "search_text": "trim",
        "show_text": "TRIM",
        "insert_text": "TRIM( ",
    }, {
        "search_text": "ucase",
        "show_text": "UCASE",
        "insert_text": "UCASE( ",
    }, {
        "search_text": "upper",
        "show_text": "UPPER",
        "insert_text": "UPPER( ",
    }
]

var tipColumnsIndex = 0;

function tipColumns(tablexxx, tableMatchNowSearchColumnsText, tipdom, nowTipColumnsIndex, startIndex, endIndex) {
    var conn_name = GetMaoQueryString('conn_name')
    var database = GetMaoQueryString('database')
    $.ajax({
        url: "/webdb/php/getColumns.php",
        type: "get",
        dataType: "json",
        data: {
            'conn_str': getLocalStorage(localStorageName.connObj + conn_name),
            'mysql_database': database,
            'mysql_table': tablexxx
        },
        success: function (data) {
            if (data == false) {
                //
            } else {
                var columns = data.columns
                for (var index in columns) {
                    var field_name = columns[index]['Field']
                    console.log(field_name, tableMatchNowSearchColumnsText)
                    if (tableMatchNowSearchColumnsText && !test_start(tableMatchNowSearchColumnsText, [field_name])) {
                        continue
                    }
                    if (nowTipColumnsIndex == tipColumnsIndex) {
                        tipLabelAdd(tipdom, field_name, `\`${field_name}\``, startIndex, endIndex)
                    }
                }
            }
        }, error: function () {
            //
        }
    });
}

function changeSqlTextOld(insertText) {
    var startIndex = $('#zdysql')[0].selectionStart
    var endIndex = $('#zdysql')[0].selectionEnd
    changeSqlText(startIndex, endIndex, insertText)
}

function changeSqlText(startIndex, endIndex, insertText) {
    var sqlDom = $('#zdysql')
    //var sql = sqlDom.val()
    //sqlDom.val(`${sql.substring(0, startIndex)}${insertText}${sql.substring(endIndex, sql.length)}`)
    sqlDom[0].setRangeText(insertText, startIndex, endIndex, "end")
    sqlDom.focus()
    setLocalStorage(localStorageName.zdysql + sql_conn_name + ':' + sql_database + ':' + nowSqlName, sqlDom.val(), false);
    tipsSql(sqlDom[0])
}

function tipLabelAdd(dom, showText, insertText, startIndex, endIndex) {
    var lll = $(`<label>${showText}</label>`)
    lll.click(function () {
        changeSqlText(startIndex, endIndex, insertText)
    })
    dom.append(lll)
}

function tipsSearchList(nowText, nowSearchText, nowIndex) {
    var matchNowSearchText = nowSearchText.toLowerCase()
    tipColumnsIndex = tipColumnsIndex + 1
    console.log(nowSearchText)
    var tips1_box = $("#sqltip")
    var tips2_box = $("#sqltip2")
    tips1_box.empty()
    tips2_box.empty()
    //if (!matchNowSearchText) {
    //    return
    //}

    for (var index in sqlTips) {
        var sqlTip = sqlTips[index]
        if (sqlTip.search_text.indexOf(matchNowSearchText) != -1) {
            tipLabelAdd(tips1_box, sqlTip.show_text, sqlTip.insert_text, nowIndex - matchNowSearchText.length, nowIndex)
        }
    }

    var tableMatchNowSearchText = matchNowSearchText
    var tableMatchNowSearchColumnsText = ''
    var isColumnsMatch = false
    if (nowSearchText.indexOf('.') != -1) {
        var nowSearchTextSplit = nowSearchText.split('.')
        tableMatchNowSearchText = nowSearchTextSplit[0]
        if (nowSearchTextSplit.length > 1) {
            tableMatchNowSearchColumnsText = nowSearchTextSplit[1]
        }
        isColumnsMatch = true
    }

    if (isColumnsMatch) {
        var asMapping = {}
        var fromSplit = nowText.toLowerCase().split('from')
        if (fromSplit.length > 1) {
            for (var z = 1; z < fromSplit.length; z++) {
                var whereStr = fromSplit[z].split('where')[0]
                var asSplit = whereStr.split('as')
                for (var y = 1; y < asSplit.length; y++) {
                    var asTableStrSplit = asSplit[y - 1].trim().split(' ')
                    var asTableStr = asTableStrSplit[asTableStrSplit.length - 1]
                    var asStr = asSplit[y].trim().split(' ')[0]
                    asMapping[asStr] = asTableStr
                }
            }
        }
        if (asMapping[tableMatchNowSearchText]) {
            tableMatchNowSearchText = asMapping[tableMatchNowSearchText]
        }
    }

    var tableList = getLocalStorage(localStorageName.tableList + sql_conn_name + ':' + sql_database);
    for (var index in tableList) {
        var tableName = tableList[index]
        var table = tableName.toLowerCase()

        if (isColumnsMatch) {
            if (table == tableMatchNowSearchText || `\`${table}\`` == tableMatchNowSearchText) {
                tipColumns(`\`${tableName}\``, tableMatchNowSearchColumnsText, tips2_box, tipColumnsIndex, nowIndex - tableMatchNowSearchColumnsText.length, nowIndex)
            }
        } else {
            if (table.indexOf(tableMatchNowSearchText) != -1 || `\`${table}\``.indexOf(tableMatchNowSearchText) != -1) {
                tipLabelAdd(tips2_box, tableName, `\`${tableName}\``, nowIndex - tableMatchNowSearchText.length, nowIndex)

            }
        }
    }
}

function tipsSql(that) {
    var nowText = $(that).val()
    var nowIndex = that.selectionEnd
    var nowIndexStr = nowText.substr(0, nowIndex)
    var nowIndexStrSplit = nowIndexStr.split(' ')
    var nowSearchText = nowIndexStrSplit[nowIndexStrSplit.length - 1]

    var nowIndexEndStr = nowText.substr(nowIndex, nowText.length)
    if (nowIndexEndStr && nowIndexEndStr.substr(0, 1) != ' ') {
        var nowIndexEndText = nowIndexEndStr.split(' ')[0]
        nowIndex = nowIndex + nowIndexEndText.length
        nowSearchText = nowSearchText + nowIndexEndText
    }

    console.log(nowIndex, nowIndexStr, nowIndexStrSplit, nowSearchText)
    tipsSearchList(nowText, nowSearchText, nowIndex)
}


function sql_show_one_data(that,columns, sqldatalist) {
    console.log(columns, sqldatalist)
    var sqldata = sqldatalist[parseInt($(that).attr('data-index'))]
    var one_data_context = $("#sqlzshow_one_data_windowcontext")
    one_data_context.empty()
    for (var d2 in columns) {
        var field = columns[d2];

        var showxxx_text = $(`<div class="show_one_data_field_context""></div>`)
        showxxx_text.text(sqldata[field])

        var showxxx_text_box = $(`<div class="show_one_data_field"></div>`)
        showxxx_text_box.append(`<div class="show_one_data_field_title">${field}</div>`)
        showxxx_text_box.append(showxxx_text)
        var showxxx_text_main_box = $(`<div class="sqlshow_one_data_field_box"  data-field="${field}"></div>`)
        showxxx_text_main_box.append(showxxx_text_box)
        one_data_context.append(showxxx_text_main_box)
    }
    openfloatmain("#sqlzshow_one_data_window");
}

function addSqlList(){
    nowSqlName = new Date().getTime() + ""
    setLocalStorage(localStorageName.zdysqlnow + sql_conn_name + ':' + sql_database, nowSqlName, false)
    var zdysqllist = getLocalStorage(localStorageName.zdysqllist + sql_conn_name + ':' + sql_database, true, [])
    zdysqllist.push(nowSqlName)
    setLocalStorage(localStorageName.zdysqllist + sql_conn_name + ':' + sql_database, zdysqllist)
    sqlListBoxInit()
}
function deleteSqlList(){
    var zdysqllist = getLocalStorage(localStorageName.zdysqllist + sql_conn_name + ':' + sql_database, true, [])
    var newZdysqllist =[]
    for (var index in zdysqllist) {
        if (zdysqllist[index] !=nowSqlName){
            newZdysqllist.push(zdysqllist[index])
        }else{

        }
    }
    setLocalStorage(localStorageName.zdysqllist + sql_conn_name + ':' + sql_database, newZdysqllist)
    delLocalStorage(localStorageName.zdysql + sql_conn_name + ':' + sql_database + ':' + nowSqlName)
    setLocalStorage(localStorageName.zdysqlnow + sql_conn_name + ':' + sql_database, nowSqlName, false)
    nowSqlName = newZdysqllist[0]
    sqlListBoxInit()
}
function sqlListBoxInit() {
    var sqllistbox = $("#sqllistitembox")
    sqllistbox.empty()
    var zdysqllist = getLocalStorage(localStorageName.zdysqllist + sql_conn_name + ':' + sql_database, true, [])
    for (var index in zdysqllist) {
        sqllistbox.append(`<div class="sqllistitem ${zdysqllist[index] == nowSqlName ? 'sqllistitemact' : ''}" sql-name="${zdysqllist[index]}">${(parseInt(index) + 1)}</div>`)
    }
    $("#sqllistdelete").css({'display': zdysqllist.length > 1 ? '' : 'none'})
    $("#zdysql").val(getLocalStorage(localStorageName.zdysql + sql_conn_name + ':' + sql_database + ':' + nowSqlName, false, ''));
}

$(function () {
    $("#zdysql").keyup(function () {
        setLocalStorage(localStorageName.zdysql + sql_conn_name + ':' + sql_database + ':' + nowSqlName, $(this).val(), false);
    });
    $("#zdysql").change(function () {
        setLocalStorage(localStorageName.zdysql + sql_conn_name + ':' + sql_database + ':' + nowSqlName, $(this).val(), false);
    });

    $("#zdysql").on("input propertychange", function () {
        setLocalStorage(localStorageName.zdysql + sql_conn_name + ':' + sql_database + ':' + nowSqlName, $(this).val(), false);
        tipsSql(this)
    });
    $("#zdysql").click(function () {
        tipsSql(this)
    });
    $("#zdysql").focus(function () {
        tipsSql(this)
    });
    $("#zdysql").on("touchend", function () {
        tipsSql(this)
    });
    $("#zdysql").on("touchmove", function () {
        tipsSql(this)
    });


    $("#tablenamelistul_input").on("input propertychange", function () {
        search_ul_text(this, "#tablenamelistul")
    });
    $("#tablenamelistul2_input").on("input propertychange", function () {
        search_ul_text(this, "#tablenamelistul2")
    });
    $("#tablencoumnsul_input").on("input propertychange", function () {
        search_ul_text(this, "#tablencoumnsul")
    });

    $("#tabledatashowtbody2").delegate("td", "click", function () {
        var _this = $(this);
        if (_this.hasClass("xuhao")) {
            return
        }
        $("#sqlshowcolumn").slideDown(gddhms);
        $("#sqlshowcolumnvalue").text(_this.html());
    });

    $("#sqllistitembox").delegate(".sqllistitem", "click", function () {
        $("#sqllistitembox").find('.sqllistitem').removeClass("sqllistitemact");
        var that = $(this)
        that.addClass("sqllistitemact");
        nowSqlName = that.attr('sql-name')
        setLocalStorage(localStorageName.zdysqlnow + sql_conn_name + ':' + sql_database, nowSqlName, false)
        $("#zdysql").val(getLocalStorage(localStorageName.zdysql + sql_conn_name + ':' + sql_database + ':' + nowSqlName, false, ''));
    })

    $("#tablediv2").scroll(function () {
        var tablediv2offsettop = $("#tablediv2").offset().top
        if (tablediv2offsettop > 1) {
            $("html,body").animate({scrollTop: $("body").scrollTop() + $("#tablediv2").offset().top}, 0);
        }
    })

    $("#sqlzshow_one_data_input").on("input propertychange", function () {
        var aaa = $(this).val()
        var tablesList = $('.sqlshow_one_data_field_box')
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

    $("#zdysqlup").click(function () {
        var num = parseInt($("#zdysql").attr("rows"));
        if (num <= 3) {
            $("#zdysql").attr("rows", 2);
        } else {
            $("#zdysql").attr("rows", num - 2);
        }
    })
    $("#zdysqldown").click(function () {
        var num = parseInt($("#zdysql").attr("rows"));
        $("#zdysql").attr("rows", num + 2);
    })
    $(".kjlb2").delegate("li", "click", function () {
        closefloatmain("#tablenamelist2");
        openfloatmain("#tablencoumns");
        $("#tablencoumnsul").empty();
        var tablexxx = "`" + $(this).html() + "`";
        var tablecolumns = tablecolumnsobj[tablexxx];
        if (tablecolumns == null) {
            openLoding();
            var conn_name = GetMaoQueryString('conn_name')
            var database = GetMaoQueryString('database')
            $.ajax({
                url: "/webdb/php/getColumns.php",
                type: "get",
                dataType: "json",
                data: {
                    'conn_str': getLocalStorage(localStorageName.connObj + conn_name),
                    'mysql_database': database,
                    'mysql_table': tablexxx
                },
                success: function (data) {
                    if (data == false) {
                        alert("数据库连接失败！");
                        openfloatmain("#tablenamelist2");
                        closefloatmain("#tablencoumns");
                        ;
                        closeLoding()
                    } else {

                        tablecolumnsobj[tablexxx] = data.columns;
                        closeLoding();
                        tablecolumnsobjfun(tablecolumnsobj, tablexxx);

                    }
                }, error: function () {
                    alert("出错了！")
                    openfloatmain("#tablenamelist2");
                    closefloatmain("#tablencoumns");
                    closeLoding();
                }
            });
        } else {
            tablecolumnsobjfun(tablecolumnsobj, tablexxx);
        }
    });

    function tablecolumnsobjfun(tablecolumnsobj, tablexxx) {
        $("#tablencoumnsul").empty();
        var all_column_name = []
        for (var d in tablecolumnsobj[tablexxx]) {
            var tablecolumnsobjtablexxx = tablecolumnsobj[tablexxx][d];
            var v = tablecolumnsobjtablexxx['Field'];
            var vpk = tablecolumnsobjtablexxx['Key'];
            var pk = "";
            if (vpk == 'PRI') {
                pk = "<span style='color: #ffc300'>PK-> </span>"
            }
            var column_type = tablecolumnsobjtablexxx['Type'];
            var column_name = `\`${v}\``
            if (as_text_column(column_type)) {
                column_name = ` AsText(\`${v}\`) as \`${v}\``
            }
            all_column_name.push(column_name)
            $("#tablencoumnsul").append(`<li data=" ${column_name} ">${pk}${v}</li>`)
        }
        $("#tablencoumnsul").prepend(`<li data=" ${all_column_name.join(', ')} ">全部</li>`)
        $("#tablencoumnsul").prepend(`<li data="SELECT \n  ${all_column_name.join(', ')} \nFROM \n  ${tablexxx} \nWHERE \n  ">查询</li>`)
    }

    $(".kjlb").delegate("li", "click", function () {
        var a = $(this).attr("data");
        if (a == null || a == "") {
            return;
        }
        changeSqlTextOld(a)
        setLocalStorage(localStorageName.zdysql + sql_conn_name + ':' + sql_database + ':' + nowSqlName, $("#zdysql").val(), false);
        // $("html,body").animate({scrollTop: $("#zdysql").offset().top}, gddhms);
        // $("#zdysql").focus();
        closefloatmain('#tablenamelist');
        closefloatmain('#sqlfunlist');
        closefloatmain('#tablencoumns');
    })

    var isloadhanshu = false;
    $("#queryhanshu").click(function () {
        openfloatmain('#sqlfunlist');
        if (isloadhanshu == false) {
            isloadhanshu = true;
            openLoding()
            $.ajax({
                url: "/webdb/html/hanshu.html",
                type: "get",
                dataType: "html",
                success: function (data) {
                    $("#hanshufunlist").html(data);
                    closeLoding()
                },
                error: function () {
                    closeLoding();
                    alert("加载出错请重试！")
                    isloadhanshu = false;
                }
            });
        }
    });
});

function getTableData2() {
    openLoding()
    $("#tabledatashowthead2").empty();
    $("#tabledatashowtbody2").empty();
    var sql = $("#zdysql").val()
    if (sql.indexOf('limit') == -1 && sql.indexOf('LIMIT') == -1) {
        closeLoding()
        alert("请加入limit")
        return
    }
    var conn_name = GetMaoQueryString('conn_name')
    var database = GetMaoQueryString('database')
    $.ajax({
        url: "/webdb/php/getTableDataZdy.php",
        type: "get",
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
                alert("数据库连接失败")
            } else {
                if (data.isquery == false) {
                    if (data.updateok == 1) {
                        alert("执行非查询成功")
                    } else {
                        alert("执行非查询失败")
                    }
                } else {
                    if (data.isrun == false) {
                        alert("未查找到数据");
                    } else {

                        $("#tabledatashowthead2").empty();
                        $("#tabledatashowtbody2").empty();
                        $("#tablediv2").css({display: "block"})
                        var ttr2 = $('<tr style="text-align: center;" class="table_title_sticky">');
                        ttr2.append('<td class="xuhao table_left_sticky" style="background: #5a92ef">序号</td>');

                        for (var d in data.columns) {
                            var mysql_table_column = data.columns[d];
                            ttr2.append('<td>' + mysql_table_column + '</td>');
                        }
                        $("#tabledatashowthead2").append(ttr2);
                        var xxtabledatashowtbody2 = $("#tabledatashowtbody2");
                        for (var d in data.data) {
                            var btr = $('<tr>');
                            var xxtd = $(`<td class="xuhao table_left_sticky" data-index="${d}">${(parseInt(d) + 1)}</td>`)
                            xxtd.click(function () {
                                sql_show_one_data(this,data.columns, data.data)
                            })
                            btr.append(xxtd)
                            for (var d2 in data.columns) {
                                var field = data.columns[d2];
                                var btd = $(`<td data-columns="' + field + '"></td>`)
                                btd.text(data.data[d][field])
                                btr.append(btd)
                            }
                            xxtabledatashowtbody2.append(btr);
                        }
                        $("html,body").animate({scrollTop: $("body").scrollTop() + $("#tablediv2").offset().top}, 0);
                    }
                }
            }
        }, error: function () {
            alert("出错了！")
            closeLoding();
        }
    });
};