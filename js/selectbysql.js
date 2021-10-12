var tablecolumnsobj = {};
var nowSqlName = ''
var sql_conn_name = ''
var sql_database = ''
var tempTipTablecolumns = {}

function inittabledata2() {
    var conn_name = GetMaoQueryString('conn_name')
    var database = GetMaoQueryString('database')
    var tableList = getLocalStorage(localStorageName.tableList + conn_name + ':' + database);
    if (tableList == null) {
        window.location.hash = "#databases?conn_name" + conn_name;
        return;
    }
    $("#tablediv2").empty();
    tempTipTablecolumns = {}
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
    } else {
        sqlListBoxInit()
    }
}


var sqlTips = [
    {
        "search_text": "select",
        "show_text": "SELECT",
        "insert_text": "SELECT ",
    }, {
        "search_text": "*",
        "show_text": "*",
        "insert_text": " * ",
    }, {
        "search_text": "from",
        "show_text": "FROM",
        "insert_text": "FROM ",
    }, {
        "search_text": "where",
        "show_text": "WHERE",
        "insert_text": "WHERE ",
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
        "search_text": "on",
        "show_text": "ON",
        "insert_text": "ON ",
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
        "search_text": "and",
        "show_text": "AND",
        "insert_text": "AND ",
    }, {
        "search_text": "or",
        "show_text": "OR",
        "insert_text": "OR ",
    }, {
        "search_text": ">=",
        "show_text": ">=",
        "insert_text": ">= ",
    }, {
        "search_text": "<=",
        "show_text": "<=",
        "insert_text": "<= ",
    }, {
        "search_text": "like",
        "show_text": "LIKE",
        "insert_text": "LIKE '%%' ",
    }, {
        "search_text": "between",
        "show_text": "BETWEEN",
        "insert_text": "BETWEEN ",
    }, {
        "search_text": "between",
        "show_text": "BETWEEN AND",
        "insert_text": "BETWEEN  AND",
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
        "insert_text": "ABS(",
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
        "insert_text": "SUM(",
    }, {
        "search_text": "avg",
        "show_text": "AVG",
        "insert_text": "AVG(",
    }, {
        "search_text": "round",
        "show_text": "ROUND",
        "insert_text": "ROUND(",
    }, {
        "search_text": "group",
        "show_text": "GROUP_CONCAT",
        "insert_text": "GROUP_CONCAT(",
    }, {
        "search_text": "concat",
        "show_text": "CONCAT",
        "insert_text": "CONCAT(",
    }, {
        "search_text": "date",
        "show_text": "DATE_FORMAT",
        "insert_text": "DATE_FORMAT( ,'%Y-%m-%d %H:%s:%i')",
    }, {
        "search_text": "left",
        "show_text": "LEFT",
        "insert_text": "LEFT(",
    }, {
        "search_text": "length",
        "show_text": "LENGTH",
        "insert_text": "LENGTH(",
    }, {
        "search_text": "ltrim",
        "show_text": "LTRIM",
        "insert_text": "LTRIM(",
    }, {
        "search_text": "right",
        "show_text": "RIGHT",
        "insert_text": "RIGHT(",
    }, {
        "search_text": "rtrim",
        "show_text": "RTRIM",
        "insert_text": "RTRIM(",
    }, {
        "search_text": "trim",
        "show_text": "TRIM",
        "insert_text": "TRIM(",
    }, {
        "search_text": "ucase",
        "show_text": "UCASE",
        "insert_text": "UCASE(",
    }, {
        "search_text": "upper",
        "show_text": "UPPER",
        "insert_text": "UPPER(",
    }
]
var sqlColumnsTips = [
    {
        "show_text": "=",
        "insert_text": " = ",
    }, {
        "show_text": ">",
        "insert_text": " > ",
    }, {
        "show_text": ">=",
        "insert_text": " >= ",
    }, {
        "show_text": "<",
        "insert_text": " < ",
    }, {
        "show_text": "<=",
        "insert_text": " <= ",
    }, {
        "show_text": "IN",
        "insert_text": " IN () ",
    }, {
        "show_text": "LIKE",
        "insert_text": " LIKE '%%' ",
    }, {
        "show_text": "BETWEEN",
        "insert_text": " BETWEEN ",
    }, {
        "show_text": "BETWEEN AND",
        "insert_text": " BETWEEN  AND ",
    }
]

var tipColumnsIndex = 0;


function sortTipText(arr, tableMatchNowSearchColumnsText, fun) {
    var bRegular = null
    if (tableMatchNowSearchColumnsText) {
        tableMatchNowSearchColumnsText = tableMatchNowSearchColumnsText.toLowerCase()
        bRegular = tipStrToRegular(tableMatchNowSearchColumnsText)
    }
    var rarr = []

    for (var x in arr) {
        var x2 = fun(arr[x], bRegular)
        if (x2) {
            rarr.push(x2)
        }
    }

    rarr.sort(function (a, b) {
        var asum = 0
        var bsum = 0
        if (a == tableMatchNowSearchColumnsText) {
            asum += 1000000000
        }
        if (b == tableMatchNowSearchColumnsText) {
            bsum += 1000000000
        }
        var axindex = a.indexOf(tableMatchNowSearchColumnsText)
        var bxindex = b.indexOf(tableMatchNowSearchColumnsText)
        asum += (10000 - (axindex == -1 ? 10000 : axindex)) * 1000000
        bsum += (10000 - (bxindex == -1 ? 10000 : bxindex)) * 1000000
        asum += (10000 - a.length)
        bsum += (10000 - b.length)
        return bsum - asum
    })

    return rarr
}

function tipColumnsFun(columns, tableMatchNowSearchColumnsText, tipdom, nowTipColumnsIndex, startIndex, endIndex) {
    var tipsarr = sortTipText(columns, tableMatchNowSearchColumnsText, function (a, bRegular) {
        var field_name = a['Field'].toLowerCase()
        if (bRegular && !bRegular.test(`\`${field_name}\``)) {
            return
        }
        return field_name;
    });

    var haseq = false
    for (var index in tipsarr) {
        var field_name = tipsarr[index]
        if (nowTipColumnsIndex == tipColumnsIndex) {
            if (!haseq) {
                haseq = tableMatchNowSearchColumnsText == field_name || tableMatchNowSearchColumnsText == `\`${field_name}\``
            }
            tipLabelAdd(tipdom, field_name, `\`${field_name}\``, startIndex, endIndex)
        }
    }
    if (haseq) {
        var tipdom2 = $("#sqltip")
        for (var xx in sqlColumnsTips) {
            var sqlColumnsTip = sqlColumnsTips[xx]
            tipLabelAdd(tipdom2, sqlColumnsTip.show_text, sqlColumnsTip.insert_text, endIndex, endIndex)
        }
    }
}

function tipColumns(tablexxx, tableMatchNowSearchColumnsText, tipdom, nowTipColumnsIndex, startIndex, endIndex) {
    var conn_name = GetMaoQueryString('conn_name')
    var database = GetMaoQueryString('database')

    if (tempTipTablecolumns[tablexxx]) {
        tipColumnsFun(tempTipTablecolumns[tablexxx], tableMatchNowSearchColumnsText, tipdom, nowTipColumnsIndex, startIndex, endIndex)
        return
    }
    $.ajax({
        url: "/webdb/php/getColumns.php",
        type: "post",
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
                tempTipTablecolumns[tablexxx] = data.columns
                tipColumnsFun(data.columns, tableMatchNowSearchColumnsText, tipdom, nowTipColumnsIndex, startIndex, endIndex)
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

function sqlTextSplitFen(nowText, sqlSplitSep = ';', replaceN = true) {
    var nowTextArr = nowText.split('\n')
    for (var xxx in nowTextArr) {
        if (/^--.*/.test(nowTextArr[xxx])) {
            nowTextArr[xxx] = nowTextArr[xxx].replace(/;/g, ' ')
        }
    }
    var fenSqlTextSplit = nowTextArr.join('\n').split(sqlSplitSep)
    if (fenSqlTextSplit.length <= 1) {
        if (replaceN) {
            return [fenSqlTextSplit[0].replace(/\n/g, ' ')]
        }
        return [fenSqlTextSplit[0]]
    }
    var fenSqlTextArrayArray = []
    var fenSqlTextArrayAdd = true
    for (var xxx in fenSqlTextSplit) {
        var fenSqlText = fenSqlTextSplit[xxx]
        if (replaceN) {
            fenSqlText = fenSqlText.replace(/\n/g, ' ')
        }
        if (fenSqlTextArrayAdd) {
            fenSqlTextArrayArray.push([fenSqlText])
        } else {
            fenSqlTextArrayArray[fenSqlTextArrayArray.length - 1].push(fenSqlText)
        }
        var nowFenSqlText = fenSqlTextArrayArray[fenSqlTextArrayArray.length - 1].join(';')
        fenSqlTextArrayAdd = nowFenSqlText.replace(/\\'/g, '').split('\'').length % 2 !== 0;
    }
    var fenSqlTextArray = []
    for (var xxxx in fenSqlTextArrayArray) {
        fenSqlTextArray.push(fenSqlTextArrayArray[xxxx].join(';'))
    }

    return fenSqlTextArray
}

function tipsSearchList(orgSql, nowText, nowSearchText, nowIndex) {
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

    var matchNowSearchTextRegular = tipStrToRegular(matchNowSearchText)

    for (var index in sqlTips) {
        var sqlTip = sqlTips[index]
        if (!matchNowSearchTextRegular || matchNowSearchTextRegular.test(sqlTip.search_text)) {
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

    var tableList = getLocalStorage(localStorageName.tableList + sql_conn_name + ':' + sql_database);
    var tableMap = {}
    for (var xx in tableList) {
        tableMap[tableList[xx]] = 1
        tableMap[`\`${tableList[xx]}\``] = 1
    }

    if (isColumnsMatch) {
        var fenSqlTextArrayArray = sqlTextSplitFen(orgSql)
        var ffffenSqlText = null
        if (fenSqlTextArrayArray.length == 1) {
            ffffenSqlText = fenSqlTextArrayArray[0]
        } else if (fenSqlTextArrayArray.length > 1) {
            var fenSqlTextLength = 0
            for (var xxxii in fenSqlTextArrayArray) {
                var nowFenSqlText = fenSqlTextArrayArray[xxxii]
                if (ffffenSqlText == null && fenSqlTextLength < nowIndex && (fenSqlTextLength + nowFenSqlText.length) > nowIndex) {
                    ffffenSqlText = nowFenSqlText
                }
                fenSqlTextLength += nowFenSqlText.length
            }
            if (ffffenSqlText == null) {
                ffffenSqlText = fenSqlTextArrayArray[fenSqlTextArrayArray.length]
            }
        } else {
            ffffenSqlText = ''
        }
        var fromSplit = ffffenSqlText.toLowerCase().split('from')
        var asMapping = {}
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
                var spanSplit = whereStr.split(' ')
                var qspan = 0
                for (var y = 1; y < spanSplit.length; y++) {
                    if (spanSplit[y] == "") {
                        qspan += 1

                    } else {
                        if (tableMap[spanSplit[y - (1 + qspan)]]) {
                            asMapping[spanSplit[y]] = spanSplit[y - (1 + qspan)]
                        }
                        qspan = 0
                    }
                }
            }
        }
        if (asMapping[tableMatchNowSearchText]) {
            tableMatchNowSearchText = asMapping[tableMatchNowSearchText]
        }
    }
    if (isColumnsMatch && tableMap[tableMatchNowSearchText]) {
        if (tableMap[`\`${tableMatchNowSearchText}\``]) {
            tableMatchNowSearchText = `\`${tableMatchNowSearchText}\``
        }
        tipColumns(tableMatchNowSearchText, tableMatchNowSearchColumnsText, tips2_box, tipColumnsIndex, nowIndex - tableMatchNowSearchColumnsText.length, nowIndex)
    } else {
        var tipsarr = sortTipText(tableList, tableMatchNowSearchText, function (a, bRegular) {
            var table = a.toLowerCase()
            if (bRegular && !bRegular.test(`\`${table}\``)) {
                return null;
            }
            return a;
        });
        for (var index in tipsarr) {
            var tableName = tipsarr[index]
            tipLabelAdd(tips2_box, tableName, `\`${tableName}\``, nowIndex - tableMatchNowSearchText.length, nowIndex)
        }

    }

}

var sqlR = /[\t()=><,]/g

function tipsSql(that) {
    var orgSql = $(that).val().replace(sqlR, ' ')
    var nowText = orgSql.replace(/[\n]/g, ' ')
    var nowIndex = that.selectionEnd
    var fromIndex = 0;
    var nowIndexStr = nowText.substr(fromIndex, nowIndex)
    var nowIndexStrSplit = nowIndexStr.split(' ')
    var nowSearchText = nowIndexStrSplit[nowIndexStrSplit.length - 1]
    nowIndexStrSplit = nowSearchText.split('\n')
    nowSearchText = nowIndexStrSplit[nowIndexStrSplit.length - 1]

    var nowIndexEndStr = nowText.substr(nowIndex, nowText.length)
    if (nowIndexEndStr && nowIndexEndStr.substr(0, 1) != ' ') {
        var nowIndexEndText = nowIndexEndStr.split(' ')[0]
        nowIndex = nowIndex + nowIndexEndText.length
        nowSearchText = nowSearchText + nowIndexEndText
    }

    console.log(nowIndex, nowIndexStr, nowIndexStrSplit, nowSearchText)
    tipsSearchList(orgSql, nowText, nowSearchText, nowIndex)
}


function sql_show_one_data(columns, sqldata) {
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

function sql_xuhao_td(d, columns, data) {
    var xxtd = $(`<td class="xuhao table_left_sticky" data-index="${d}">${(parseInt(d) + 1)}</td>`)
    xxtd.click(function () {
        sql_show_one_data(columns, data)
    })
    return xxtd
}

function opensqllistboxwindow() {
    var sqllistcontextboxlist = $("#sqllistcontextboxlist")
    sqllistcontextboxlist.empty()

    var zdysqlsavelist = getLocalStorage(localStorageName.zdysqlsavelist + sql_conn_name + ':' + sql_database, true, [])
    for (var index in zdysqlsavelist) {
        var zdysqlsave = zdysqlsavelist[index]

        var sqllistcontexttitle = $(`<label class="sqllistcontexttitle"></label>`)
        sqllistcontexttitle.text(getLocalStorage(localStorageName.zdysqlsavename + sql_conn_name + ':' + sql_database + ':' + zdysqlsave, false, ''))
        var sqllistcontextbtnbox = $(`<div class="sqllistcontextbtnbox">
                    <div class="sqllistcontextbtn" onclick="changesavesqlname('${zdysqlsave}')">重命名</div>
                    <div class="sqllistcontextbtn" onclick="deletesavesql('${zdysqlsave}')">删除</div>
        </div>`)
        var sqllistcontexttitlebox = $(`<div class="sqllistcontexttitlebox"></div>`)
        sqllistcontexttitlebox.append(sqllistcontexttitle)
        sqllistcontexttitlebox.append(sqllistcontextbtnbox)


        var sqllistcontextsql = $(`<div class="sqllistcontextsql"></div>`)
        sqllistcontextsql.text(getLocalStorage(localStorageName.zdysql + sql_conn_name + ':' + sql_database + ':' + zdysqlsave, false, ''))

        var sqllistcontextbox = $(`<div class="sqllistcontextbox" onclick="selectlistsql('${zdysqlsave}',true)"></div>`)
        sqllistcontextbox.append(sqllistcontexttitlebox)
        sqllistcontextbox.append(sqllistcontextsql)
        sqllistcontextboxlist.append(sqllistcontextbox)
    }

    openfloatmain('#sqllistbox_window')
}

function changesavesqlname(clickzdysqlsave) {
    event.stopPropagation();
    var oldzdysqlsavename = getLocalStorage(localStorageName.zdysqlsavename + sql_conn_name + ':' + sql_database + ':' + clickzdysqlsave, false)
    var zdysqlsavename = prompt("请输入名称", oldzdysqlsavename)
    if (zdysqlsavename) {
        setLocalStorage(localStorageName.zdysqlsavename + sql_conn_name + ':' + sql_database + ':' + clickzdysqlsave, zdysqlsavename, false)
        opensqllistboxwindow()
    }
}

function deletesavesql(clickzdysqlsave) {
    event.stopPropagation();
    if (!window.confirm('确认删除?')) {
        return
    }

    var zdysqlsavelist = getLocalStorage(localStorageName.zdysqlsavelist + sql_conn_name + ':' + sql_database, true, [])
    var newzdysqlsavelist = []
    for (var index in zdysqlsavelist) {
        var zdysqlsave = zdysqlsavelist[index]
        if (zdysqlsave != clickzdysqlsave) {
            newzdysqlsavelist.push(zdysqlsave)
        }
    }
    delLocalStorage(localStorageName.zdysqlsavename + sql_conn_name + ':' + sql_database + ':' + clickzdysqlsave)
    setLocalStorage(localStorageName.zdysqlsavelist + sql_conn_name + ':' + sql_database, newzdysqlsavelist)


    var candelete = true
    var zdysqllist = getLocalStorage(localStorageName.zdysqllist + sql_conn_name + ':' + sql_database, true, [])
    for (var index in zdysqllist) {
        var zdysql = zdysqllist[index]
        if (zdysql == clickzdysqlsave) {
            candelete = false
        }
    }
    if (candelete) {
        delLocalStorage(localStorageName.zdysql + sql_conn_name + ':' + sql_database + ':' + clickzdysqlsave)
    }
    opensqllistboxwindow()
    changeSaveBtnText()
}

function saveZdySql() {
    if (!$("#zdysql").val().trim()) {
        alert("Sql无内容，保存失败")
        return;
    }
    var zdysqlsavelist = getLocalStorage(localStorageName.zdysqlsavelist + sql_conn_name + ':' + sql_database, true, [])
    for (var index in zdysqlsavelist) {
        var zdysqlsave = zdysqlsavelist[index]
        if (zdysqlsave == nowSqlName) {
            var zdysqlsavename = getLocalStorage(localStorageName.zdysqlsavename + sql_conn_name + ':' + sql_database + ':' + nowSqlName, false)
            alert(`已保存名称：${zdysqlsavename}`)
            return
        }
    }
    var zdysqlsavename = prompt("请输入名称")
    if (!zdysqlsavename) {
        alert("无效的名称，保存失败")
        return;
    }
    setLocalStorage(localStorageName.zdysqlsavename + sql_conn_name + ':' + sql_database + ':' + nowSqlName, zdysqlsavename, false)
    zdysqlsavelist.push(nowSqlName)
    setLocalStorage(localStorageName.zdysqlsavelist + sql_conn_name + ':' + sql_database, zdysqlsavelist)
    $("#zdysqltipnametext").text(zdysqlsavename)
    $("#saveZdySqlBtn").text(`已保存`)
}

function sqllistexport() {
    var sqls = []
    var zdysqlsavelist = getLocalStorage(localStorageName.zdysqlsavelist + sql_conn_name + ':' + sql_database, true, [])
    for (var index in zdysqlsavelist) {
        var zdysqlsave = zdysqlsavelist[index]

        sqls.push({
            'sql_name': zdysqlsave,
            'save_name': getLocalStorage(localStorageName.zdysqlsavename + sql_conn_name + ':' + sql_database + ':' + zdysqlsave, false, ''),
            'sql': getLocalStorage(localStorageName.zdysql + sql_conn_name + ':' + sql_database + ':' + zdysqlsave, false, ''),
        })
    }
    download('web-db-sql.json', JSON.stringify(sqls))
}

function sqllistimport(input) {
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function () {
        var zdysqlsavelist = getLocalStorage(localStorageName.zdysqlsavelist + sql_conn_name + ':' + sql_database, true, [])
        var config = JSON.parse(this.result)
        for (var index in config) {
            var conn = config[index]
            if (conn.sql_name) {
                var cansave = true
                for (var xxx in zdysqlsavelist) {
                    if (zdysqlsavelist[xxx] == conn.sql_name) {
                        cansave = false
                    }
                }
                if (cansave) {
                    zdysqlsavelist.push(conn.sql_name)
                }

                setLocalStorage(localStorageName.zdysqlsavename + sql_conn_name + ':' + sql_database + ':' + conn.sql_name, conn.save_name, false)
                setLocalStorage(localStorageName.zdysql + sql_conn_name + ':' + sql_database + ':' + conn.sql_name, conn.sql, false)
            }
        }
        setLocalStorage(localStorageName.zdysqlsavelist + sql_conn_name + ':' + sql_database, zdysqlsavelist)
        opensqllistboxwindow()
    }
    reader.readAsText(file);
}

function addSqlListbySqlName(sqlName) {
    nowSqlName = sqlName
    setLocalStorage(localStorageName.zdysqlnow + sql_conn_name + ':' + sql_database, nowSqlName, false)
    var canupdate = true
    var zdysqllist = getLocalStorage(localStorageName.zdysqllist + sql_conn_name + ':' + sql_database, true, [])
    for (var iii in zdysqllist) {
        if (zdysqllist[iii] == sqlName) {
            canupdate = false
        }
    }
    if (canupdate) {
        zdysqllist.push(nowSqlName)
        setLocalStorage(localStorageName.zdysqllist + sql_conn_name + ':' + sql_database, zdysqllist)
    }
}

function addSqlList() {
    addSqlListbySqlName(new Date().getTime() + "")
    sqlListBoxInit()
}

function deleteSqlList() {
    var zdysqllist = getLocalStorage(localStorageName.zdysqllist + sql_conn_name + ':' + sql_database, true, [])
    var newZdysqllist = []
    for (var index in zdysqllist) {
        if (zdysqllist[index] != nowSqlName) {
            newZdysqllist.push(zdysqllist[index])
        } else {

        }
    }
    setLocalStorage(localStorageName.zdysqllist + sql_conn_name + ':' + sql_database, newZdysqllist)

    var zdysqlsavelist = getLocalStorage(localStorageName.zdysqlsavelist + sql_conn_name + ':' + sql_database, true, [])
    var candelete = true
    for (var index in zdysqlsavelist) {
        var zdysqlsave = zdysqlsavelist[index]
        if (zdysqlsave == nowSqlName) {
            candelete = false
        }
    }
    if (candelete) {
        delLocalStorage(localStorageName.zdysql + sql_conn_name + ':' + sql_database + ':' + nowSqlName)
    }
    nowSqlName = newZdysqllist[0]
    setLocalStorage(localStorageName.zdysqlnow + sql_conn_name + ':' + sql_database, nowSqlName, false)
    sqlListBoxInit()
}

function changeSaveBtnText() {
    $('#zdysqltipname').css({'display': 'none'})
    $("#saveZdySqlBtn").text('保存')
    var zdysqlsavelist = getLocalStorage(localStorageName.zdysqlsavelist + sql_conn_name + ':' + sql_database, true, [])
    for (var index in zdysqlsavelist) {
        var zdysqlsave = zdysqlsavelist[index]
        if (zdysqlsave == nowSqlName) {
            var xxxname = getLocalStorage(localStorageName.zdysqlsavename + sql_conn_name + ':' + sql_database + ':' + nowSqlName, false)
            if (xxxname != null) {
                $("#zdysqltipnametext").text(xxxname)
                $('#zdysqltipname').css({'display': ''})
            }
            $("#saveZdySqlBtn").text(`已保存`)
            break
        }
    }
}

function selectlistsql(nowInSqlName, save) {
    if (save) {
        addSqlListbySqlName(nowInSqlName)
        sqlListBoxInit()
    }
    nowSqlName = nowInSqlName
    setLocalStorage(localStorageName.zdysqlnow + sql_conn_name + ':' + sql_database, nowSqlName, false)
    $("#zdysql").val(getLocalStorage(localStorageName.zdysql + sql_conn_name + ':' + sql_database + ':' + nowSqlName, false, ''));
    changeSaveBtnText()

    $("#sqllistitembox").find('.sqllistitem').removeClass("sqllistitemact");
    $("#sqllistitembox").find(`.sqllistitem[sql-name="${nowInSqlName}"]`).addClass("sqllistitemact");

    closefloatmain("#sqllistbox_window")
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

    changeSaveBtnText()
}

function sqlFormat() {
    var zdysql = $("#zdysql")
    zdysql.val(sqlFormatter.format(zdysql.val(), {
        language: 'mysql',
        uppercase: true,
    }));
    setLocalStorage(localStorageName.zdysql + sql_conn_name + ':' + sql_database + ':' + nowSqlName, zdysql.val(), false);
}

var zdysql_input_propertychange_timeout = null
$(function () {
    $("#zdysql").keyup(function () {
        setLocalStorage(localStorageName.zdysql + sql_conn_name + ':' + sql_database + ':' + nowSqlName, $(this).val(), false);
    });
    $("#zdysql").change(function () {
        setLocalStorage(localStorageName.zdysql + sql_conn_name + ':' + sql_database + ':' + nowSqlName, $(this).val(), false);
    });

    $("#zdysql").on("input propertychange", function () {
        setLocalStorage(localStorageName.zdysql + sql_conn_name + ':' + sql_database + ':' + nowSqlName, $(this).val(), false);
        if (zdysql_input_propertychange_timeout) {
            clearTimeout(zdysql_input_propertychange_timeout)
        }
        var that = this
        zdysql_input_propertychange_timeout = setTimeout(function () {
            tipsSql(that)
        }, 50)
    });
    $("#zdysql").click(function () {
        tipsSql(this)
    });
    $("#zdysql").focus(function () {
        tipsSql(this)
        $('#zdysqltipname').css({'display': 'none'})
        $('#sqllistbox').css({'display': 'none'})
    });
    $("#zdysql").blur(function () {
        $('#sqllistbox').css({'display': ''})
        $('#zdysqltipname').css({'display': ''})
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

    $("#tablediv2").delegate(".tabledatashowtbody2 td", "click", function () {
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
        var xnowSqlName = that.attr('sql-name')
        selectlistsql(xnowSqlName, false)
    })
    $("html,body").scroll(function () {
        var tablediv2offsettop = $("#tablediv2").offset().top
        if ($("#tablediv2").css('display') == 'block') {
            if (tablediv2offsettop > 10) {
                $("#sqllistbox").css({'display': ''})
            } else {
                $("#sqllistbox").css({'display': 'none'})
            }
        }

    })

    $("#tablediv2").scroll(function () {
        var tablediv2offsettop = $("#tablediv2").offset().top
        if (tablediv2offsettop > 10) {
            $("html,body").animate({scrollTop: $("body").scrollTop() + $("#tablediv2").offset().top}, 0);
        }
    })

    $("#sqlzshow_one_data_input").on("input propertychange", function () {
        var aaa = $(this).val()
        var tablesList = $('.sqlshow_one_data_field_box')
        for (var index in tablesList) {
            var table = tablesList[index]
            if (table.getAttribute) {
                var displayValue = "block"
                if (aaa) {
                    var litext = table.getAttribute('data-field')
                    if (litext && litext.indexOf(aaa) == -1) {
                        displayValue = "none"
                    }
                }
                if (table.style) {
                    table.style.display = displayValue
                }
            }
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
    $("#tablenamelistul2").delegate("li", "click", function () {
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
                type: "post",
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

    $(".llsqlinstall").delegate("li", "click", function () {
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
                type: "post",
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
    $("#tablediv2").empty();
    var sql = $("#zdysql").val()
    var xxxxxsqlarr = sql.toLowerCase().split('\n')
    var xxsqlarray = []
    for (var xxx in xxxxxsqlarr) {
        var xac = xxxxxsqlarr[xxx]
        if (xac.indexOf('--') == 0) {
            continue
        }
        xxsqlarray.push(xac)
    }

    var xxsql = xxsqlarray.join('\n')
    var updateIndex = xxsql.indexOf('select')
    if (!(updateIndex < 5 && updateIndex >= 0)) {
        if (!window.confirm("非查询语句 是否继续执行？")) {
            closeLoding()
            return
        }
    } else {
        if (sql.toLowerCase().indexOf('limit') == -1) {
            if (!window.confirm("未添加 limit 是否继续执行？")) {
                closeLoding()
                return
            }
        }
    }

    var fenSqlTextArray = sqlTextSplitFen(sqlFormatter.format(sql.replace(/^--[ ]{0,2}limit[ ]*\n/g,'\n').replace(/\n--[ ]{0,2}limit[ ]*\n/g,'\n'), {
        language: 'mysql',
        uppercase: true,
    }), sqlSplitSep = ';\n', replaceN = false)

    var fenSqlTitleArray = []
    for (var xxx in fenSqlTextArray) {
        fenSqlTitleArray[xxx] = []
        var canTitleAdd = true
        var fenSqlTextX = fenSqlTextArray[xxx].split('\n')
        for (var xxxxx in fenSqlTextX) {
            if (canTitleAdd && fenSqlTextX[xxxxx].startsWith('--')) {
                fenSqlTitleArray[xxx].push(fenSqlTextX[xxxxx].substr(2, fenSqlTextX[xxxxx].length))
            } else {
                canTitleAdd = false
            }
        }
    }

    var conn_name = GetMaoQueryString('conn_name')
    var database = GetMaoQueryString('database')
    $.ajax({
        url: "/webdb/php/getTableDataZdy.php",
        type: "post",
        dataType: "json",
        data: {
            'conn_str': getLocalStorage(localStorageName.connObj + conn_name),
            'mysql_database': database,
            'sql': sql
        },
        success: function (dataInfo) {
            closeLoding()
            console.log(dataInfo);
            if (dataInfo.esms) {
                alert(dataInfo.esms)
            }
            var datas = dataInfo.data
            if (datas) {
                for (var xxxxxi in datas) {
                    var data = datas[xxxxxi]
                    var sqlIndexTitle = `SQL${parseInt(xxxxxi) + 1}`
                    var xxxfenSqlTitleArray = fenSqlTitleArray[xxxxxi]
                    if (!data.title  && xxxfenSqlTitleArray.length>0){
                        data.title = xxxfenSqlTitleArray[xxxfenSqlTitleArray.length-1]
                    }
                    if (data.title) {
                        sqlIndexTitle = data.title
                    }

                    if (data.isquery == false) {
                        $("#tablediv2").append(`<div class="tablediv2sqltip">${sqlIndexTitle} 执行非查询 结果：${data.info}</div>`);
                    } else {
                        if (data.isrun == false) {
                            $("#tablediv2").append(`<div class="tablediv2sqltip">${sqlIndexTitle} 未查找到数据</div>`);
                        } else {
                            if (data.title) {
                                $("#tablediv2").append(`<div class="tablediv2sqltiptitlebox"><div class="tablediv2sqltip tablediv2sqltiptitlemain tablediv2sqltiptitleleft ">1</div><div class="tablediv2sqltip tablediv2sqltiptitlemain tablediv2sqltiptitle">${data.title}</div></div>`);
                            }
                            var tabledatashowthead2 = $(`<thead class="tabledatashowthead2"></thead>`).empty();
                            $("#tablediv2").css({display: "block"})
                            var ttr2 = $('<tr style="text-align: center;" class="table_title_sticky">');
                            ttr2.append('<td class="xuhao table_left_sticky" style="background: #5a92ef">序号</td>');

                            for (var d in data.columns) {
                                var mysql_table_column = data.columns[d];
                                ttr2.append('<td>' + mysql_table_column + '</td>');
                            }
                            tabledatashowthead2.append(ttr2);
                            var xxtabledatashowtbody2 = $(`<tbody class="tabledatashowtbody2"></tbody>`);
                            for (var d in data.data) {

                                var xxtd = sql_xuhao_td(d, data.columns, data.data[d])
                                var btr = $('<tr>');
                                btr.append(xxtd)
                                for (var d2 in data.columns) {
                                    var field = data.columns[d2];
                                    var btd = $(`<td data-columns="' + field + '"></td>`)
                                    btd.text(data.data[d][field])
                                    btr.append(btd)
                                }
                                xxtabledatashowtbody2.append(btr);
                            }

                            var xxxtableshow2 = $(`<table class="tabledatashow2" border="1" style="position: relative"></table>`)
                            xxxtableshow2.append(tabledatashowthead2)
                            xxxtableshow2.append(xxtabledatashowtbody2)

                            $("#tablediv2").append(xxxtableshow2)
                            $("html,body").animate({scrollTop: $("body").scrollTop() + $("#tablediv2").offset().top}, 0);
                        }
                    }
                }
            }
        }, error: function () {
            alert("出错了！")
            closeLoding();
        }
    });
};