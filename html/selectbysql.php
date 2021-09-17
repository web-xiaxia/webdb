<div id="tabledata2" style="display: none">
    <div id="sqllistbox">
        <div id="sqllistbtnbox">
            <div id="sqllistadd" class="sqllistitem sqllistitembtn" onclick="addSqlList()" >+</div>
            <div id="sqllistdelete" style="display: none" class="sqllistitem sqllistitembtn" onclick="deleteSqlList()" >-</div>
        </div>
        <div id="sqllistitembox"></div>
    </div>
    <a href="javascript:btnHash('#tables')" class="btn">切换数据表</a>
    <!--<div class="btn"  id="opentables2">切换数据表</div>-->
    <div class="btn" id="zdysqldown">增加编辑框行</div>
    <div class="btn" id="zdysqlup">减少编辑框行</div>
    <div id="sqltip" class="sqltip">
    </div>
    <div id="sqltip2" class="sqltip">
    </div>
    <div id="zdysqlmain" style="text-align: center;">
        <div style="padding: 0 5px;">
            <textarea id="zdysql" rows="10"
                      style="width: 100%; border: 1px solid #387EF5; border-radius: 2px;"></textarea>
        </div>
        <a class="btn" href="javascript:getTableData2()" id="getTableDatazdy">执行sql</a>
        <div style="text-align: left">
            <ul class="kjlb">
                <li data=",">,</li>
                <li data=".">.</li>
                <li data="'">'</li>
                <li data='"'>"</li>
                <li data="`">`</li>
                <li data="-">-</li>
                <li data="/">/</li>
                <li data=";">;</li>
            </ul>
            <ul class="kjlb">
                <li data=" > ">></li>
                <li data=" < "><</li>
                <li data=" = ">=</li>
                <li data=" like ">like</li>
                <li data="%">%</li>
                <li data=" (">(</li>
                <li data=") ">)</li>
            </ul>
            <ul class="kjlb">
                <li data=" select ">select</li>
                <li data=" * ">*</li>
                <li data=" from ">from</li>
                <li data=" update ">update</li>
                <li data=" set ">set</li>
                <li data=" insert into ">insert into</li>
                <li data=" values ">values</li>
                <li data=" delete ">delete</li>
            </ul>
            <ul class="kjlb">
                <li data=" left join ">left</li>
                <li data=" right join ">right</li>
                <li data=" inner join ">inner</li>
                <li data=" on ">on</li>
            </ul>
            <ul class="kjlb">
                <li data=" where ">where</li>
                <li data=" and ">and</li>
                <li data=" or ">or</li>
                <li data=" is ">is</li>
                <li data=" not ">not</li>
                <li data=" null ">null</li>
                <li data=" in ">in</li>
                <li data=" exists ">exists</li>
                <li data=" group by ">group</li>
                <li data=" order by ">order</li>
                <li data=" limit 0,100 ">limit 100</li>

            </ul>

        </div>
        <a class="btn" href="javascript:void(0)" id="queryhanshu">插入函数</a>
        <a class="btn" href="javascript: openfloatmain('#tablenamelist');">插入表名</a>
        <a class="btn" href="javascript:openfloatmain('#tablenamelist2');">插入列名</a>
    </div>

    <div id="tablediv2" style="overflow: scroll;width: 100%;margin-top: 5px;display: none; height: 100%;">
        <table id="tabledatashow2" border="1" style="position: relative">
            <thead id="tabledatashowthead2">

            </thead>
            <tbody id="tabledatashowtbody2">

            </tbody>
        </table>
    </div>
</div>
<div class="floatmain" id="sqlfunlist" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">插入函数</span><a class="close" href="javascript:void(0)">X</a></div>
        <div class="content">
            <ul class="kjlb" id="hanshufunlist">

            </ul>
        </div>
    </div>
</div>
<div class="floatmain" id="tablenamelist" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">插入表名</span><a class="close" href="javascript:void(0)">X</a></div>

        <div class="content">
            <div style="position: sticky; top:0px; background: white;padding:  5px 0 ">
                <input type="text" id="tablenamelistul_input" class="btn"
                       style="width: 80%; margin: 0 auto; background: white; color: black;"/>
            </div>
            <ul class="kjlb" id="tablenamelistul">

            </ul>
        </div>
    </div>
</div>
<div class="floatmain" id="tablenamelist2" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">选择表</span><a class="close" href="javascript:void(0)">X</a></div>
        <div class="content">
            <div style="position: sticky; top:0px; background: white;padding:  5px 0 ">
                <input type="text" id="tablenamelistul2_input" class="btn"
                       style=" width: 80%; margin: 0 auto; background: white; color: black;"/>
            </div>
            <ul class="kjlb2" id="tablenamelistul2">

            </ul>
        </div>
    </div>
</div>
<div class="floatmain" id="tablencoumns" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">插入列名</span><a class="close" href="javascript:void(0)">X</a></div>

        <div class="content">
            <div style="position: sticky; top:0px; background: white;padding:  5px 0 ">
                <input type="text" id="tablencoumnsul_input" class="btn"
                       style="width: 80%; margin: 0 auto; background: white; color: black;"/>
            </div>
            <ul class="kjlb" id="tablencoumnsul">

            </ul>
        </div>
    </div>
</div>
<div class="floatmain" id="sqlshowcolumn" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">查询数据</span><a class="close" href="javascript:void(0)">X</a></div>
        <div class="content">
            <div id="sqlshowcolumnvalue" style="width: 98%"></div>
        </div>
    </div>
</div>
<div class="floatmain" id="sqlzshow_one_data_window" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">数据</span><a class="close" href="javascript:void(0)">X</a></div>

        <div class="content" style="background-color: #e7e7e7;">
            <div style="position: sticky; top:0px; background: white;padding:  5px 0 ">
                <input type="text" id="sqlzshow_one_data_input" class="btn"
                       style=" width: 80%; margin: 0 auto; background: white; color: black; text-align: left"/>
            </div>
            <div id="sqlzshow_one_data_windowcontext">

            </div>
        </div>
    </div>
</div>