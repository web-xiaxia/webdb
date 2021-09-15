<div id="tabledata"
     style="display: none;padding: 80px 0 20px 0 ;box-sizing:border-box;-webkit-overflow-scrolling: touch;">
    <div style="height:70px ; margin: -80px 0 0;">
        <a href="javascript:btnHash('#tables')" class="btn">切换数据表</a>
        <a href="javascript:btnHash('#tabledata2')" class="btn">自定义sql</a>
    </div>
    <div id="tablediv"
         style="overflow: scroll;height: 100%;box-sizing:border-box; -webkit-overflow-scrolling: touch; width: 100%;margin-top: 5px">
        <table id="tabledatashow" border="1" style="position: relative">
            <thead id="tabledatashowthead">

            </thead>
            <tbody id="tabledatashowtbody">

            </tbody>
        </table>
    </div>
    <div style="position: fixed;bottom: 0; border-top:1px solid #e5e5e5; background:white;z-index: 1001;width: 100%; padding: 3px 0 3px 13px">
        <a id="pagesy" href="javascript:void(0)">首页</a>
        <a id="pageup" href="javascript:void(0)">上一页</a>
        <a id="pagedowm" href="javascript:void(0)">下一页</a>

        <select id="pagenum" style="height: 17px;font-size: 13px; line-height: 17px;">
            <option value="15">15</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="1000">1000</option>
        </select>

        <a id="pagerefresh" href="javascript:void(0)" style="margin-left: 15px">刷新</a>
    </div>
</div>

<div class="floatmain" id="updatecolumn" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">修改数据</span><a class="close" href="javascript:void(0)">X</a></div>
        <div class="content">
            <textarea id="updatevalue" style="width: 98%" rows="10"></textarea>
            <a id="unpdatebtn" class="btn" href="javascript:void(0)">修改</a>
        </div>
    </div>
</div>
<div class="floatmain" id="zdycolumnswindow" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">选择显示列</span><a class="close" href="javascript:void(0)">X</a></div>
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

<div class="floatmain" id="zshow_one_data_window" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">数据</span><a class="close" href="javascript:void(0)">X</a></div>

        <div class="content" style="background-color: #e7e7e7;">
            <div style="position: sticky; top:0px; background: white;padding:  5px 0 ">
                <input type="text" id="zshow_one_data_input" class="btn"
                       style=" background: white;  width: 80%; margin: 0px auto ;  color: black; text-align: left"/>
            </div>
            <div id="zshow_one_data_windowcontext">

            </div>
        </div>
    </div>
</div>
<div class="floatmain" id="columnswindow" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">列操作</span><a class="close" href="javascript:void(0)">X</a></div>
        <div class="content">
            列名：<span id="columnname">121212</span>
            <a class="btn" href="javascript:void(0)" id="delorder">删除排序</a>
            <a class="btn" href="javascript:void(0)" id="escorder">顺序</a>
            <a class="btn" href="javascript:void(0)" id="descorder">倒序</a>
            <hr color="#387EF5">
            <select id="columnsxt">
                <option value="=" sql-str="{column} = '{value}'">=</option>
                <option value="<>" sql-str="{column} <> '{value}'"><></option>
                <option value="<" sql-str="{column} < '{value}'"><</option>
                <option value=">" sql-str="{column} > '{value}'">></option>
                <option value="<=" sql-str="{column} <= '{value}'"><=</option>
                <option value=">=" sql-str="{column} >= '{value}'">>=</option>
                <option value="in" sql-str="{column} in ({value})" tips="1,2,3">IN</option>
                <option value="not_in" sql-str="{column} not in ({value})" tips="1,2,3">NOT IN</option>
                <option value="is_null" sql-str="{column} is null">IS NULL</option>
                <option value="is_not_null" sql-str="{column} is not null">IS NOT NULL</option>
                <option value="between" sql-str="{column} between {value} " tips="1 AND 3">BETWEEN</option>
                <option value="not_between" sql-str="{column} not between {value} " tips="1 AND 3">NOT BETWEEN</option>
                <option value="contains" sql-str="{column} like '%{value}%'">Contains</option>
                <option value="not_contains" sql-str="{column} not like '%{value}%'">Not contains</option>
                <option value="has_prefix" sql-str="{column} like '{value}%'">Has prefix</option>
                <option value="has_suffix" sql-str="{column} like '%{value}'">Has suffix</option>
                <option value="sql" sql-str="">SQL</option>
            </select>
            <a class="btn" style="width: auto;display: inline-block; min-width: 30px; height: 10px; line-height: 10px;"
               href="javascript:columnsx_set('=')">=</a>
            <a class="btn" style="width: auto;display: inline-block; min-width: 30px; height: 10px; line-height: 10px;"
               href="javascript:columnsx_set('in')">in</a>
            <a class="btn" style="width: auto;display: inline-block; min-width: 30px;  height: 10px;line-height: 10px;"
               href="javascript:columnsx_set('contains')">Contains</a>
            <input id="columnsx" style="width: 98%">
            <a class="btn" href="javascript:void(0)" id="datawhere">筛选</a>
            <a class="btn" href="javascript:void(0)" id="datawheredel">删除筛选</a>
            <ul class="kjlb3">
                <li data=" and">and</li>
                <li data=" or">or</li>
                <li data=" is">is</li>
                <li data=" not">not</li>
                <li data=" null">null</li>
                <li data=" in">in</li>
            </ul>
            <ul class="kjlb3">
                <li data=",">,</li>
                <li data=".">.</li>
                <li data="'">'</li>
                <li data="-">-</li>
                <li data="/">/</li>
                <li data=" (">(</li>
                <li data=") ">)</li>
                <li data=";">;</li>
            </ul>
            <ul class="kjlb3">
                <li data=" > ">></li>
                <li data=" < "><</li>
                <li data=" = ">=</li>
                <li data=" like ">like</li>
                <li data="%">%</li>
            </ul>
            <ul class="kjlb3">
                <li data=" DATE_FORMAT('','%Y-%m-%d %H:%s:%i') ">DATE_FORMAT</li>
                <li data=" NOW() ">NOW</li>
                <li data=" CONCAT(">CONCAT</li>
            </ul>
        </div>
    </div>

</div>
