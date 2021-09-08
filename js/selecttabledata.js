function inittabledata() {
    var tableobj = getLocalStorage(localStorageName.tableobj);
    var zdycolumnswindowcontext = $("#zdycolumnswindowcontext")
    zdycolumnswindowcontext.empty()
    zdycolumnswindowcontext.append(`<a class="btn" href="javascript:$('.zdycolumns').prop('checked',true)" >全选</a>`)
    zdycolumnswindowcontext.append(`<a class="btn" href="javascript:$('.zdycolumns').prop('checked',false)">全部取消</a>`)
    zdycolumnswindowcontext.append(`表名：${tableobj.mysql_table}`)
    for (var d in tableobj.mysql_table_columns) {
        var column_name = tableobj.mysql_table_columns[d]['Field']
        zdycolumnswindowcontext.append(`<div><input type="checkbox" class="zdycolumns" id="zdycolumns${column_name}" checked> <label for="zdycolumns${column_name}">${column_name}</label> </div>`)
    }
    getTableData();
    $("#tabledata").slideDown(gddhms);
}

var lastSqldataList = null

$(function () {

    /*setInterval(function(event){
    //console.log(event)
    //console.log(event.target.scrollLeft)
    $("#tabledatashowthead tr").eq(0).css({left:(- event.target.scrollLeft)+"px"})


},1000)*/

    function tabledivscrollTimeOut(event) {

        return setTimeout(function () {
            //console.log(event)
            //console.log(event.target.scrollLeft)

            if ((-event.target.scrollLeft) != $("#tabledatashowthead tr").eq(0).css('left')) {
                $("#tabledatashowthead tr").eq(0).css({left: (-event.target.scrollLeft) + "px"})
            }

        }, 0)
    }

    var lasttabledivscrollTimeOut = null;
    $("#tablediv").scroll(function (event) {
        if (lasttabledivscrollTimeOut != null) {
            clearTimeout(lasttabledivscrollTimeOut)
        }
        lasttabledivscrollTimeOut = tabledivscrollTimeOut(event);
    });


    /*var tabledivscrolllastTime=0;
$("#tablediv").scroll(function(event){
    var nowTime=new Date().getTime();
        if((nowTime-tabledivscrolllastTime)>=1000){
            tabledivscrolllastTime=nowTime;
    //console.log(event)
    //console.log(event.target.scrollLeft)
    $("#tabledatashowthead tr").eq(0).css({left:(- event.target.scrollLeft)+"px"})
  }

});*/

    function tabledatascrollTimeOut(event) {
        return setTimeout(function () {
            if (nowmaodian == "#tabledata") {

                var top = $(window).scrollTop()
                var tabledivtop = $("#tablediv").offset().top;
                top = tabledivtop - top
                if (top < 0) {
                    top = 0;
                }
                $("#tabledatashowthead tr").eq(0).css({top: top + "px"});

            }
        }, 50)
    }

    var lasttabledatascrolllastTime = 0;
    $(window).scroll(function (event) {
        if (lasttabledatascrolllastTime != null) {
            clearTimeout(lasttabledatascrolllastTime)
        }
        lasttabledatascrolllastTime = tabledatascrollTimeOut(event);
    });


    /*var tabledatascrolllastTime=0;
    $(window).scroll(function(event) {
        if(nowmaodian=="#tabledata")
        {
        	var nowTime=new Date().getTime();
        	if((nowTime-tabledata2scrolllastTime)>=30){
        		tabledata2scrolllastTime=nowTime;
            var top=$(window).scrollTop()
           var tabledivtop=$("#tablediv").offset().top;
            top=tabledivtop-top
           if(top<0)
           {
               top=0;
           }
            $("#tabledatashowthead tr").eq(0).css({top:top+"px"});
          }
        }
    })*/

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
            $("#columnsx").val(" and " + column + " = ");
            $("#datawheredel").css({"display": "none"});
        } else {
            $("#columnsx").val(querywherecolumn);
            $("#datawheredel").css({"display": ""});
        }


    });

    $("#datawhere").click(function () {
        closefloatmain("#columnswindow");
        var columnname = $("#columnname").html();
        var x = $("#columnsx").val();
        // alert((" and "+columnname+" = ").trim().length);
        // alert( x.trim().length)
        if ((" and " + columnname + " = ").trim().length >= x.trim().length) {
            alert("筛选失败，你没输条件吧！")
            return;
        }
        var querywhereobj = getLocalStorage(localStorageName.querywhereobj);
        var tableobj = getLocalStorage(localStorageName.tableobj);
        querywhereobj[columnname] = x;
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
        if (tableobj.data_page >= tableobj.data_page_sum) {
            tableobj.data_page = tableobj.data_page_sum;
        } else {
            tableobj.data_page += 1;
        }
        setLocalStorage(localStorageName.tableobj, tableobj);
        getTableData()
    })
    $("#pagerefresh").click(function () {
        getTableData()
    })

    $("#pagewy").click(function () {
        var tableobj = getLocalStorage(localStorageName.tableobj);
        tableobj.data_page = tableobj.data_page_sum;
        setLocalStorage(localStorageName.tableobj, tableobj);
        getTableData()
    })

    $(".kjlb3").delegate("li", "click", function () {
        var a = $(this).attr("data");
        if (a == null || a == "") {
            return;
        }
        $("#columnsx").val($("#columnsx").val() + a + "");

    });


});

function zdycolumnsok() {
    closefloatmain("#zdycolumnswindow");
    getTableData()
}

function show_one_data_update_data(id, columns,that) {
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
        one_data_context.append(`<div id="show_one_data${field}" > 
            <div class="show_one_data_field">
                <div class="show_one_data_field_title">${field}</div>
                <div class="show_one_data_field_context" onclick="show_one_data_update_data('${sqldata[tableobj.mysql_table_columns_id]}','${field}',this)">${sqldata[field]}</div>
            </div>
           
        </div>`)
    }
    openfloatmain("#zshow_one_data_window");
}

function getTableData() {
    openLoding()

    $("#page").html(0);
    $("#pagesum").html(0);
    $("#count").html(0);
    $("#tabledatashowthead").empty();
    $("#tabledatashowtbody").empty();
    var querywhereobj = getLocalStorage(localStorageName.querywhereobj);
    var query_where = "";
    for (var ddd in querywhereobj) {
        query_where += " " + querywhereobj[ddd] + " ";
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
                tableobj.data_count = data["count"];
                $("#page").html(tableobj.data_page);
                tableobj.data_page_sum = parseInt((parseInt(tableobj.data_count) + parseInt(tableobj.data_num) - 1) / parseInt(tableobj.data_num));
                $("#pagesum").html(tableobj.data_page_sum);
                $("#count").html(tableobj.data_count);
                $("#pagenum").val(tableobj.data_num);


                $("#tablediv").css({height: ($(window).height() - 130) + "px"})
                var sqldataList = data["data"];
                lastSqldataList = sqldataList

                $("#tabledatashowthead").empty();
                $("#tabledatashowtbody").empty();
                var ttr = $('<tr style="text-align: center;position: fixed;z-index: 2;">');
                var ttr2 = $('<tr style="text-align: center;">');
                ttr.append(`<td onclick="openfloatmain('#zdycolumnswindow');">序号</td>`);
                ttr2.append(`<td onclick="openfloatmain('#zdycolumnswindow');">序号</td>`);
                for (var d in tableobj.mysql_table_columns) {
                    var mysql_table_column = tableobj.mysql_table_columns[d]['Field'];
                    if (!$(`#zdycolumns${mysql_table_column}`).is(':checked')) {
                        continue
                    }
                    var oderbyobj = getLocalStorage(localStorageName.oderbyobj);
                    var querywhereobj = getLocalStorage(localStorageName.querywhereobj);
                    var oderbyobjcolumnname = oderbyobj[mysql_table_column];
                    var querywhereobjcolumn = querywhereobj[mysql_table_column];
                    ttr.append('<td data-column="' + mysql_table_column + '" >' + mysql_table_column + (querywhereobjcolumn == null ? "" : "<span style='color:red'> ->?</span>") + (oderbyobjcolumnname == null ? "" : "<span style='color: #feff08'> ->O</span>") + '</td>')
                    ttr2.append('<td data-column="' + mysql_table_column + '" >' + mysql_table_column + (querywhereobjcolumn == null ? "" : "<span style='color:red'> ->?</span>") + (oderbyobjcolumnname == null ? "" : "<span style='color: #feff08'> ->O</span>") + '</td>')
                }
                $("#tabledatashowthead").append(ttr);
                $("#tabledatashowthead").append(ttr2);
                var xxtabledatashowtbody = $("#tabledatashowtbody");
                for (var d in sqldataList) {
                    var sqldata = sqldataList[d]
                    var btr = $('<tr>');
                    btr.append(`<td onclick="show_one_data(${parseInt(d)},lastSqldataList)">${(parseInt(d) + 1)}</td>`)

                    for (var d2 in tableobj.mysql_table_columns) {
                        var field = tableobj.mysql_table_columns[d2]['Field'];
                        if (!$(`#zdycolumns${field}`).is(':checked')) {
                            continue
                        }
                        btr.append('<td data-columns="' + field + '">' + sqldata[field] + '</td>')
                    }
                    if (tableobj.mysql_table_columns_id != null) {
                        btr.attr("data-id", sqldata[tableobj.mysql_table_columns_id]);
                    }
                    xxtabledatashowtbody.append(btr);
                }
                setLocalStorage(localStorageName.tableobj, tableobj);

                var tabledatashowtheadtd = $("#tabledatashowthead tr").eq(0).find("td");
                var tabledatashowtheadtd1 = $("#tabledatashowthead tr").eq(1).find("td");
                var tabledatashowtbodytd = $("#tabledatashowtbody tr").eq(0).find("td");
                if (tabledatashowtbodytd.length > 0) {
                    for (var i = 0; i < tabledatashowtheadtd.length; i++) {
                        var tabledatashowtheadtdwidth = tabledatashowtheadtd.eq(i).width();
                        var tabledatashowtbodytdwidth = tabledatashowtbodytd.eq(i).width();
                        var setwidth = tabledatashowtheadtdwidth > tabledatashowtbodytdwidth ? tabledatashowtheadtdwidth : tabledatashowtbodytdwidth;
                        tabledatashowtheadtd.eq(i).width(setwidth + 1 + "px");
                        tabledatashowtheadtd1.eq(i).width(setwidth + "px");

                    }
                    $("#tabledatashowthead tr").eq(0).width($("#tabledatashowthead tr").eq(1).width() + 1 + "px");

                }
            }
        }, error: function () {
            alert("出错了！")
            closeLoding();
        }
    });
};

