<div id="tabledata" style="display: none">
    <a href="#tables" class="btn">切换数据表</a>
    <a href="#tabledata2" class="btn">自定义sql</a>
    <!--<div class="btn"  id="opentables">切换数据表</div>-->
    <div id="tablediv" style="overflow: scroll;width:-webkit-overflow-scrolling: touch; 100%;margin-top: 5px">
        <table id="tabledatashow" border="1" style="position: relative">
            <thead id="tabledatashowthead">

            </thead>
            <tbody id="tabledatashowtbody">

            </tbody>
        </table>
    </div>
    <div>
        <div style="overflow: hidden; white-space: nowrap; scroll">
            <select id="pagenum">
                <option value="15">15</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="1000">1000</option>
            </select>
            <span id="page" style="margin-left: 10px">1</span>/<span id="pagesum">2</span> 共<span id="count">100</span>条
        </div>
        <a id="pagesy" href="javascript:void(0)">首页</a>
        <a id="pageup" href="javascript:void(0)">上一页</a>
        <a id="pagedowm" href="javascript:void(0)">下一页</a>
        <a id="pagewy" href="javascript:void(0)">尾页</a>
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
            <div id="zdycolumnswindowcontext">

            </div>
            <a class="btn" href="javascript:void(0)" onclick="zdycolumnsok()">确定</a>
        </div>
    </div>
</div>

<div class="floatmain" id="zshow_one_data_window" style="display: none;">
    <div class="floatbg" >
    </div>
    <div class="float">
        <div class="title"><span class="content">数据</span><a class="close" href="javascript:void(0)">X</a></div>
        <div class="content" style="background-color: #e7e7e7;">
            <input type="text" id="zshow_one_data_input" class="btn" style=" width: 80%; margin: 5px auto 5px; background: white; color: black; text-align: left"/>
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
                <li data=" exists">exists</li>
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
