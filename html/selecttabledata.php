<div id="tabledata"
     style="display: none;padding: 0px 0 28px 0 ;box-sizing:border-box;-webkit-overflow-scrolling: touch;">
    <div id="tableffff">
        <!--<div id="tablefiltertipbox">
            F
            <div id="tablefiltertipboxtip">
                .
            </div>
        </div>-->

    </div>
    <!--<div style="height:46px ; margin: -54px 0 0;">
        <table width="100%">
            <tr>
                <td><a href="javascript:btnHash('#tables')" class="btn">切换数据表</a></td>
                <td><a href="javascript:btnHash('#tabledata2')" class="btn">自定义sql</a></td>
            </tr>
        </table>
    </div>-->
    <div id="tablediv"
         style="overflow: scroll;height: 100%;box-sizing:border-box; -webkit-overflow-scrolling: touch; width: 100%;">
        <table id="tabledatashow" border="1" style="position: relative">
            <thead id="tabledatashowthead">

            </thead>
            <tbody id="tabledatashowtbody">

            </tbody>
        </table>
    </div>
    <div style="position: fixed;bottom: 0; border-top:1px solid #e5e5e5; background:white;z-index: 1001;width: 100%; padding: 3px 0 3px 0px">
        <a id="pagesy" href="javascript:void(0)" style="margin-left: 25px;" class="iconfont">&#xe60e;</a><!--第一页-->
        <a id="pageup" href="javascript:void(0)" class="iconfont">&#xe746;</a><!--上一页-->
        <a id="pagedowm" href="javascript:void(0)" class="iconfont">&#xe642;</a><!--下一页-->
        <a id="pagerefresh" class="iconfont" href="javascript:void(0)">&#xe601;</a><!--刷新-->
        <select id="pagenum" style="height: 17px;font-size: 13px; line-height: 17px;">
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="1000">1000</option>
        </select>
        <a id="page—other" class="iconfont" href="javascript:openfloatmain('#page-other-window')">&#xe635;</a><!--更多-->
        <a id="tablefiltertipbox" href="javascript:void(0)" class="iconfont" style="margin-left: 3px">&#xe612;</a><!--过滤-->


        <a href="javascript:choicewindow()" class="iconfont" style="margin-right: 25px; float: right;">&#xe69f;</a><!--选择窗口-->
        <a href="javascript:btnHash('#tabledata2')" class="iconfont" style="margin-right: 3px; float: right;" >&#xe600;</a><!--sql-->
        <a href="javascript:btnHash('#tables')" class="iconfont" style="margin-right: 3px; float: right;">&#xe708;</a><!--选择表-->
    </div>
</div>

<div class="floatmain" id="updatecolumn" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">修改数据</span><a class="close iconfont" href="javascript:void(0)">&#xe60d;</a></div>
        <div class="contentbox">
            <div class="content">
                <div style="padding: 5px">列名：<label id="updatecolumnname"></label></div>
                <textarea id="updatevalue" style="width: 98%" rows="10"></textarea>
                <a id="unpdatebtn" class="btn" href="javascript:void(0)">修改</a>
            </div>
        </div>
    </div>
</div>
<div class="floatmain" id="zdycolumnswindow" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">选择显示列</span><a class="close iconfont" href="javascript:void(0)">&#xe60d;</a></div>
        <div class="contentbox">
            <div class="content">
                <div style="position: sticky; top:0px; background: white;">
                    <div id="zdycolumnsyablename"></div>
                    <a class="btn" href="javascript:$('.zdycolumns').prop('checked',true)">全选</a>
                    <a class="btn" href="javascript:$('.zdycolumns').prop('checked',false)">全部取消</a>
                </div>
                <div id="zdycolumnswindowcontext">

                </div>
                <div style="position: sticky;bottom: 0px; background: white;">
                    <a class="btn" href="javascript:void(0)" onclick="zdycolumnsok()">刷新数据</a>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="floatmain" id="zshow_one_data_window" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">数据</span><a class="close iconfont" href="javascript:void(0)">&#xe60d;</a></div>
        <div class="contentbox" style="background-color: #e7e7e7;padding: 0;">
            <div class="content" >
                <div style="position: sticky; top:0px; background: white;padding:  5px 0;border-radius: 7px 7px 0 0;">
                    <input type="text" id="zshow_one_data_input" class="btn"
                           style=" background: white;  width: 80%; margin: 0px auto ;  color: black; text-align: left"/>
                </div>
                <div id="zshow_one_data_windowcontext">

                </div>
            </div>
        </div>
    </div>
</div>

<div class="floatmain" id="page-other-window" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">更多信息</span><a class="close iconfont" href="javascript:void(0)">&#xe60d;</a></div>
        <div class="contentbox" style="background-color: #e7e7e7;">
            <div class="content" style="padding:0 5px;">
                <div class="page-other-item-box">
                    <div class="page-other-item-title">
                        总条数：<a id="page-other-count-btn" class="iconfont" href="javascript:getTableDataCount()">&#xe601;</a>
                    </div>
                    <div id="page-other-count" class="page-other-item-context">无</div>
                </div>
                <div class="page-other-item-box">
                    <div class="page-other-item-title">sql：</div>
                    <div id="page-other-sql" class="page-other-item-context">
                        无
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="floatmain" id="columnswindow" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">列操作</span><a class="close iconfont" href="javascript:void(0)">&#xe60d;</a></div>
        <div class="contentbox">
            <div class="content">
                列名：<span id="columnname">121212</span>
                <a class="btn" href="javascript:void(0)" id="delorder">删除排序</a>
                <a class="btn" href="javascript:void(0)" id="escorder">顺序</a>
                <a class="btn" href="javascript:void(0)" id="descorder">倒序</a>
                <hr color="#387EF5">
                <select id="columnsxt">

                </select>
                <a class="btn"
                   style="width: auto;display: inline-block; min-width: 30px; height: 10px; line-height: 10px;"
                   href="javascript:columnsx_set('=')">=</a>
                <a class="btn"
                   style="width: auto;display: inline-block; min-width: 30px; height: 10px; line-height: 10px;"
                   href="javascript:columnsx_set('in')">in</a>
                <a class="btn"
                   style="width: auto;display: inline-block; min-width: 30px;  height: 10px;line-height: 10px;"
                   href="javascript:columnsx_set('contains')">Contains</a>
                <input id="columnsx" style="width: 100%;height:30px; box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-sizing: border-box;">
                <a class="btn" href="javascript:void(0)" id="datawhere">筛选</a>
                <a class="btn" href="javascript:void(0)" id="datawheredel">删除筛选</a>
                <ul class="kjlb3">
                    <li data=" AND ">AND</li>
                    <li data=" OR ">OR</li>
                    <li data=" IS ">IS</li>
                    <li data=" NOT ">NOT</li>
                    <li data=" NULL">NULL</li>
                    <li data=" IN ">IN</li>
                </ul>
                <ul class="kjlb3">
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
                <ul class="kjlb3">
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
                <ul class="kjlb3">
                    <li data=" DATE_FORMAT('','%Y-%m-%d %H:%s:%i') ">DATE_FORMAT</li>
                    <li data=" NOW() ">NOW</li>
                    <li data=" CONCAT(">CONCAT</li>
                </ul>
            </div>
        </div>
    </div>

</div>

<div class="floatmain" id="tablefilterbox" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">过滤</span><a class="close iconfont" href="javascript:void(0)">&#xe60d;</a></div>
        <div class="contentbox">
            <div class="content">
                <div id="tablefiltercontextbox">

                </div>
                <div style="position: sticky;bottom: 0px; background: white; text-align: center">

                    <a class="btn" style="display: inline-block;padding: 5px 15px;"
                       href="javascript:open_table_filter('btn')">开启过滤</a>
                    <a class="btn" style="display: inline-block;padding: 5px 15px;"
                       href="javascript:close_table_filter('btn')">关闭过滤</a>
                </div>
            </div>
        </div>
    </div>
</div>