var tablecolumnsobj = {};

function inittabledata2() {
    $("#tabledata2").slideDown(gddhms);
    var tableList = getLocalStorage(localStorageName.tableList);
    if (tableList == null) {
        window.location.hash = "#databases";
        return;
    }
    $("#tablenamelistul").empty();
    $("#tablenamelistul2").empty();
    for (var d in tableList) {
        $("#tablenamelistul").append('<li data=" `' + tableList[d] + '` ">' + tableList[d] + '</li>')
        $("#tablenamelistul2").append('<li data=" `' + tableList[d] + '` ">' + tableList[d] + '</li>')
    }
    $("#zdysql").val(getLocalStorage(localStorageName.zdysql, false));
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
    var dbobj = getLocalStorage(localStorageName.nowconn);
    $.ajax({
        url: "/webdb/php/getColumns.php",
        type: "get",
        dataType: "json",
        data: {
            mysql_server_name: dbobj.mysql_server_name,
            mysql_username: dbobj.mysql_username,
            mysql_password: dbobj.mysql_password,
            mysql_database: dbobj.mysql_database,
            mysql_table: tablexxx
        },
        success: function (data) {
            if (data == false) {
                //
            } else {
                for (var index in data) {
                    var field_name = data[index]['Field']
                    console.log(field_name, tableMatchNowSearchColumnsText)
                    if (tableMatchNowSearchColumnsText && !test_start(tableMatchNowSearchColumnsText, [field_name])) {
                        continue
                    }
                    if (nowTipColumnsIndex == tipColumnsIndex) {
                        tipLabelAdd(tipdom, field_name, `\`field_name\``, startIndex, endIndex)
                    }
                }
            }
        }, error: function () {
            //
        }
    });
}

function changeSqlTextOld(insertText) {
    var startIndex = $('#zdysql')[0].selectionEnd
    changeSqlText(startIndex, startIndex, insertText)
}

function changeSqlText(startIndex, endIndex, insertText) {
    var sqlDom = $('#zdysql')
    //var sql = sqlDom.val()
    //sqlDom.val(`${sql.substring(0, startIndex)}${insertText}${sql.substring(endIndex, sql.length)}`)
    sqlDom[0].setRangeText(insertText, startIndex, endIndex, "end")
    sqlDom.focus()
    tipsSql(sqlDom[0])
}

function tipLabelAdd(dom, showText, insertText, startIndex, endIndex) {
    var lll = $(`<label>${showText}</label>`)
    lll.click(function () {
        changeSqlText(startIndex, endIndex, insertText)
    })
    dom.append(lll)
}

function tipsSearchList(nowSearchText, nowIndex) {
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

    var tableList = getLocalStorage(localStorageName.tableList);
    for (var index in tableList) {
        var tableName = tableList[index]
        var table = tableName.toLowerCase()

        if (isColumnsMatch) {
            if (table == tableMatchNowSearchText || `\`${table}\`` == tableMatchNowSearchText) {
                tipColumns(`\`${tableName}\``, tableMatchNowSearchColumnsText, tips2_box, tipColumnsIndex, nowIndex - tableMatchNowSearchColumnsText.length, nowIndex)
            }
        } else {
            if (table.indexOf(tableMatchNowSearchText) != -1) {
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
    console.log(nowIndex, nowIndexStr, nowIndexStrSplit, nowSearchText)
    tipsSearchList(nowSearchText, nowIndex)
}

$(function () {
    $("#zdysql").keyup(function () {
        setLocalStorage(localStorageName.zdysql, $(this).val(), false);
    });
    $("#zdysql").change(function () {
        setLocalStorage(localStorageName.zdysql, $(this).val(), false);
    });

    $("#zdysql").on("input propertychange", function () {
        tipsSql(this)
    });
    $("#zdysql").focus(function () {
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

    function tablediv2scrollTimeOut(event) {
        return setTimeout(function () {
            //console.log(event)
            //console.log(event.target.scrollLeft)
            if ((-event.target.scrollLeft) != $("#tabledatashowthead2 tr").eq(0).css('left')) {
                $("#tabledatashowthead2 tr").eq(0).css({left: (-event.target.scrollLeft) + "px"})
            }


        }, 0)
    }

    var lasttablediv2scrollTimeOut = null;
    $("#tablediv2").scroll(function (event) {
        if (lasttablediv2scrollTimeOut != null) {
            clearTimeout(lasttablediv2scrollTimeOut)
        }
        lasttablediv2scrollTimeOut = tablediv2scrollTimeOut(event);
    });

    /*var tablediv2scrolllastTime=0;
    $("#tablediv2").scroll(function(event){
    	var nowTime=new Date().getTime();
        	if((nowTime-tablediv2scrolllastTime)>=1000){
        		tablediv2scrolllastTime=nowTime;
        //console.log(event)
        //console.log(event.target.scrollLeft)
        $("#tabledatashowthead2 tr").eq(0).css({left:(- event.target.scrollLeft)+"px"})
      }
    });*/

    function tabledata2scrollTimeOut(event) {
        return setTimeout(function () {
            if (nowmaodian == "#tabledata2") {
                var top = $(window).scrollTop();
                if (top > $("#tablediv2").offset().top) {
                    $("#tabledatashowthead2 tr").eq(0).css({display: ""});
                } else {
                    $("#tabledatashowthead2 tr").eq(0).css({display: "none"});
                }

            }
        }, 50)
    }

    var lasttabledata2scrolllastTime = 0;
    $(window).scroll(function (event) {
        if (lasttabledata2scrolllastTime != null) {
            clearTimeout(lasttabledata2scrolllastTime)
        }
        lasttabledata2scrolllastTime = tabledata2scrollTimeOut(event);
    })
    /*var tabledata2scrolllastTime=0;
    $(window).scroll(function(event) {
    		
        if(nowmaodian=="#tabledata2")
        {
        	var nowTime=new Date().getTime();
        	if((nowTime-tabledata2scrolllastTime)>=30){
        		tabledata2scrolllastTime=nowTime;
            var top=$(window).scrollTop();
            if(top>$("#tablediv2").offset().top)
            {
                $("#tabledatashowthead2 tr").eq(0).css({display:""});
            }else
            {
                $("#tabledatashowthead2 tr").eq(0).css({display:"none"});
            }
          }
        }
        //console.log(event)
        //console.log(event.target.scrollLeft)
				*/
    /* $("#tabledatashowthead2 tr").eq(0).css({left: (-event.target.scrollLeft) + 8 + "px"})
     animate({scrollTop:$("#tablediv2").offset().top},gddhms);*/
    /*})*/
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
            var dbobj = getLocalStorage(localStorageName.nowconn);
            $.ajax({
                url: "/webdb/php/getColumns.php",
                type: "get",
                dataType: "json",
                data: {
                    mysql_server_name: dbobj.mysql_server_name,
                    mysql_username: dbobj.mysql_username,
                    mysql_password: dbobj.mysql_password,
                    mysql_database: dbobj.mysql_database,
                    mysql_table: tablexxx
                },
                success: function (data) {
                    if (data == false) {
                        alert("数据库连接失败！");
                        openfloatmain("#tablenamelist2");
                        closefloatmain("#tablencoumns");
                        ;
                        closeLoding()
                    } else {

                        tablecolumnsobj[tablexxx] = data;
                        closeLoding();
                        tablecolumnsobjfun(tablecolumnsobj, tablexxx);

                    }
                }, error: function () {
                    alert("出错了！")
                    openfloatmain("#tablenamelist2");
                    closefloatmain("#tablencoumns");
                    ;
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
            var column_name = v
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
        setLocalStorage(localStorageName.zdysql, $("#zdysql").val(), false);
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
    var dbobj = getLocalStorage(localStorageName.nowconn);
    var tableobj = getLocalStorage(localStorageName.tableobj);
    var sql = $("#zdysql").val()
    if (sql.indexOf('limit') == -1) {
        closeLoding()
        alert("请加入limit")
        return
    }

    $.ajax({
        url: "/webdb/php/getTableDataZdy.php",
        type: "get",
        dataType: "json",
        data: {
            mysql_server_name: dbobj.mysql_server_name,
            mysql_username: dbobj.mysql_username,
            mysql_password: dbobj.mysql_password,
            mysql_database: dbobj.mysql_database,
            mysql_table: tableobj.mysql_table,
            sql: sql
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
                        //$("#tablediv2").css({height:($(window).height()-10)+"px",display:"block"})
                        $("#tablediv2").css({display: "block"})
                        var ttr = $('<tr style="text-align: center;position: fixed;z-index: 2;display: none;top:0px">');
                        var ttr2 = $('<tr style="text-align: center;">');
                        ttr.append('<td>序号</td>');
                        ttr2.append('<td>序号</td>');
                        for (var d in data.columns) {
                            var mysql_table_column = data.columns[d];
                            ttr.append('<td>' + mysql_table_column + '</td>');
                            ttr2.append('<td>' + mysql_table_column + '</td>');
                        }
                        $("#tabledatashowthead2").append(ttr);
                        $("#tabledatashowthead2").append(ttr2);
                        var xxtabledatashowtbody2 = $("#tabledatashowtbody2");
                        for (var d in data.data) {
                            var btr = $('<tr>');
                            btr.append('<td>' + (parseInt(d) + 1) + '</td>')
                            for (var d2 in data.columns) {
                                var field = data.columns[d2];
                                var btd = $(`<td data-columns="' + field + '"></td>`)
                                btd.text(data.data[d][field])
                                btr.append(btd)
                            }
                            xxtabledatashowtbody2.append(btr);
                        }
                        $("html,body").animate({scrollTop: $("#tablediv2").offset().top - 20}, gddhms);
                        var tabledatashowtheadtd = $("#tabledatashowthead2 tr").eq(0).find("td");
                        var tabledatashowtheadtd1 = $("#tabledatashowthead2 tr").eq(1).find("td");
                        var tabledatashowtbodytd = $("#tabledatashowtbody2 tr").eq(0).find("td");
                        if (tabledatashowtbodytd.length > 0) {
                            for (var i = 0; i < tabledatashowtheadtd.length; i++) {
                                var tabledatashowtheadtdwidth = tabledatashowtheadtd.eq(i).width();
                                var tabledatashowtbodytdwidth = tabledatashowtbodytd.eq(i).width();
                                var setwidth = tabledatashowtheadtdwidth > tabledatashowtbodytdwidth ? tabledatashowtheadtdwidth : tabledatashowtbodytdwidth;
                                tabledatashowtheadtd.eq(i).width((setwidth + 1) + "px");
                                tabledatashowtheadtd1.eq(i).width(setwidth + "px");

                            }
                            $("#tabledatashowthead2 tr").eq(0).width($("#tabledatashowthead2 tr").eq(1).width() + 1 + "px");

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