<div id="tabledata2" style="display: none">
    <div id="sqllistbox">
        <div id="sqllistbtnbox">
            <div class="sqllistitem sqllistitembtn iconfont" onclick="btnHash('#tables')">&#xe708;</div><!--选择表-->
            <div  class="sqllistitem sqllistitembtn iconfont"  style="margin-top: 10px" onclick="choicewindow()">&#xe69f;</div><!--选择窗口-->
            <div class="sqllistitem sqllistitembtn iconfont" style="margin-top: 10px" onclick="opensqllistboxwindow()">&#xe63a;</div><!--保存sql列表-->
            <div id="sqllistadd" class="sqllistitem sqllistitembtn" onclick="addSqlList()">+</div> <!--增加查询窗口-->
            <div id="sqllistdelete" style="display: none" class="sqllistitem sqllistitembtn" onclick="deleteSqlList()"><!--关闭查询窗口-->
                -
            </div>
        </div>
        <div id="sqllistitembox"></div>
    </div>

    <!--<div class="btn"  id="opentables2">切换数据表</div>-->
    <!--<table width="100%">
        <tr>
            <td>
                <a href="javascript:btnHash('#tables')" class="btn">切换数据表</a>
            </td>
            <td>
                <div class="btn" id="zdysqldown">增加编辑框行</div>
            </td>
            <td>
                <div class="btn" id="zdysqlup">减少编辑框行</div>
            </td>
        </tr>
    </table>-->
    <div style="height: 3px">

    </div>
    <div id="sqltip" class="sqltip">
    </div>
    <div id="sqltip2" class="sqltip">
    </div>
    <div id="zdysqlmain"
         style="text-align: center;padding-bottom: 10px; box-sizing: border-box;    -moz-box-sizing: border-box;    -webkit-box-sizing: border-box;">
        <div style="padding: 0 5px; position:relative; box-sizing: border-box;    -moz-box-sizing: border-box;    -webkit-box-sizing: border-box; ">
            <textarea id="zdysql" rows="10"
                      contenteditable="true"
                      style="width: 100%;box-sizing: border-box;    -moz-box-sizing: border-box;    -webkit-box-sizing: border-box;  border: 1px solid #387EF5; border-radius: 2px;-webkit-user-select:text !important;"></textarea>
            <div id="zdysqltipname"><span id="zdysqltipnametext"></span></div>
        </div>
        <table width="100%">
            <tr>
                <td><a class="btn" href="javascript:getTableData2()" id="getTableDatazdy">执行SQL</a></td>
                <td width="35">
                    <a class="btn iconfont" href="javascript:sqlFormat()">&#xe679;</a>
                </td>
                <td width="35">
                    <a class="btn iconfont" href="javascript:void(0)" id="queryhanshu">&#xeaef;</a>
                </td>
                <td width="35">
                    <a class="btn iconfont" style="font-weight: bold;" href="javascript: openfloatmain('#tablenamelist');">&#xe6b6;</a>
                </td>
                <td width="35">
                    <a class="btn iconfont" style="font-weight: bold;" href="javascript:openfloatmain('#tablenamelist2');">&#xe648;</a>
                </td>
                <td width="70">
                    <a class="btn" style="overflow: hidden" href="javascript:saveZdySql()" id="saveZdySqlBtn">保存</a>
                </td>
            </tr>
        </table>

        <div style="text-align: left;padding: 0 5px;" class="llsqlinstall">
            <ul class="kjlb">
                <li data=",">,</li>
                <li data=".">.</li>
                <li data="'">'</li>
                <li data='"'>"</li>
                <li data="`">`</li>
                <li data="-">-</li>
                <li data="/">/</li>
                <li data=":">:</li>
                <li data=";">;</li>
            </ul>
            <ul class="kjlb">
                <li data=" = ">=</li>
                <li data=" > ">></li>
                <li data=" >= ">>=</li>
                <li data=" < "><</li>
                <li data=" <= "><=</li>
                <li data=" LIKE '%%'">LIKE</li>
                <li data="%">%</li>
                <li data=" in ()">in</li>
                <li data="(">(</li>
                <li data=")">)</li>
            </ul>
            <!--<ul class="kjlb">
                <li data=" SELECT ">SELECT</li>
                <li data=" * ">*</li>
                <li data=" FROM ">FROM</li>
                <li data=" UPDATE ">UPDATE</li>
                <li data=" SET ">SET</li>
                <li data=" INSERT INTO ">INSERT INTO</li>
                <li data=" VALUES ">VALUES</li>
                <li data=" DELETE ">DELETE</li>
            </ul>-->
            <!--<ul class="kjlb">
                <li data=" LEFT JOIN ">LEFT</li>
                <li data=" RIGHT JOIN ">RIGHT</li>
                <li data=" INNER JOIN ">INNER</li>
                <li data=" ON ">on</li>
            </ul>-->
            <ul class="kjlb">
                <li data=" AND ">AND</li>
                <li data=" OR ">OR</li>
                <li data=" IS ">IS</li>
                <li data=" NOT ">NOT</li>
                <li data=" NULL ">NULL</li>
                <li data=" IN ">IN</li>
                <li data=" EXISTS ">EXISTS</li>
                <li data=" LIMIT 0,100 ">LIMIT 100</li>
            </ul>

        </div>
    </div>

    <div id="tablediv2"
         style="display: none;padding-bottom: calc(constant(safe-area-inset-bottom)/2); padding-bottom: calc(env(safe-area-inset-bottom)/2); ">
        <!--<table class="tabledatashow2" border="1" style="position: relative">
            <thead class="tabledatashowthead2">

            </thead>
            <tbody class="tabledatashowtbody2">

            </tbody>
        </table>-->
    </div>
</div>
<div class="floatmain" id="sqlfunlist" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">插入函数</span><a class="close iconfont" href="javascript:void(0)">&#xe60d;</a></div>
        <div class="contentbox">
            <div class="content">
                <ul class="kjlb2 llsqlinstall" id="hanshufunlist">

                </ul>
            </div>
        </div>

    </div>
</div>
<div class="floatmain" id="tablenamelist" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">插入表名</span><a class="close iconfont" href="javascript:void(0)">&#xe60d;</a></div>
        <div class="contentbox">
            <div class="content">
                <div style="position: sticky; top:0px; background: white;padding:  5px 0; ">
                    <input type="text" id="tablenamelistul_input" class="btn"
                           style="width: 80%; margin: 0 auto; background: white; color: black;"/>
                </div>
                <ul class="kjlb2 llsqlinstall" id="tablenamelistul">

                </ul>
            </div>
        </div>
    </div>
</div>
<div class="floatmain" id="tablenamelist2" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">选择表</span><a class="close iconfont" href="javascript:void(0)">&#xe60d;</a></div>
        <div class="contentbox">
            <div class="content">
                <div style="position: sticky; top:0px; background: white;padding:  5px 0;">
                    <input type="text" id="tablenamelistul2_input" class="btn"
                           style=" width: 80%; margin: 0 auto; background: white; color: black;"/>
                </div>
                <ul class="kjlb2" id="tablenamelistul2">

                </ul>
            </div>
        </div>
    </div>
</div>
<div class="floatmain" id="tablencoumns" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">插入列名</span><a class="close iconfont" href="javascript:void(0)">&#xe60d;</a></div>
        <div class="contentbox">
            <div class="content">
                <div style="position: sticky; top:0px; background: white;padding:  5px 0;">
                    <input type="text" id="tablencoumnsul_input" class="btn"
                           style="width: 80%; margin: 0 auto; background: white; color: black;"/>
                </div>
                <ul class="kjlb2 llsqlinstall" id="tablencoumnsul">

                </ul>
            </div>
        </div>
    </div>
</div>
<div class="floatmain" id="sqlshowcolumn" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">查询数据</span><a class="close iconfont" href="javascript:void(0)">&#xe60d;</a>
        </div>
        <div class="contentbox">
            <div class="content">
                <div id="sqlshowcolumnvaluejsonbox" style="padding-bottom: 10px;">
                    <div class="json-window-tools">
                        <button onClick="$('#sqlshowcolumnvaluejson').JSONView('toggle');">toggle</button>
                        <button onClick="$('#sqlshowcolumnvaluejson').JSONView('toggle',1);">toggle1</button>
                        <button onClick="$('#sqlshowcolumnvaluejson').JSONView('toggle',2);">toggle2</button>
                        <button onClick="$('#sqlshowcolumnvaluejson').JSONView('toggle',3);">toggle3</button>
                    </div>
                    <div id="sqlshowcolumnvaluejson" class="json-window-context-nowrap">
                    </div>
                </div>
                <div id="sqlshowcolumnvalue" style="width: 100%"></div>
            </div>
        </div>
    </div>
</div>
<div class="floatmain" id="sqlzshow_one_data_window" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">数据</span><a class="close iconfont"
                                                               href="javascript:void(0)">&#xe60d;</a></div>
        <div class="contentbox" style="background-color: #e7e7e7;padding: 0;">
            <div class="content">
                <div style="position: sticky; top:0px; background: white;padding:  5px 0;">
                    <input type="text" id="sqlzshow_one_data_input" class="btn"
                           style=" width: 80%; margin: 0 auto; background: white; color: black; text-align: left"/>
                </div>
                <div id="sqlzshow_one_data_windowcontext">

                </div>
            </div>
        </div>
    </div>
</div>

<div class="floatmain" id="sqllistbox_window" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">SQL</span><a class="close iconfont" href="javascript:void(0)">&#xe60d;</a></div>
        <div class="contentbox" style="padding: 0px;background:#dcdcdc;">
            <div class="content">
                <div id="sqllistcontextboxlist">

                </div>

                <div style="position: sticky;bottom: 0px;background:#dcdcdc;">
                    <table width="100%">
                        <tr>
                            <td>
                                <input type="file" id="sqllistimport" onchange="sqllistimport(this)"
                                       style="display: none">
                                <label class="btn" for="sqllistimport">
                                    导入
                                </label>
                            </td>
                            <td><a class="btn" href="javascript:sqllistexport()">导出</a></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
