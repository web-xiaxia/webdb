<div id="tables" style="display: none;" class="window-box">
    <div class="window">
        <div class="title">
            选择数据表

            <a href="javascript:choicewindow()" class="iconfont window-title-btn">&#xe69f;</a><!--选择窗口-->
            <a href="javascript:btnHash('#tabledata2')" class="iconfont window-title-btn">&#xe600;</a><!--sql-->
            <a href="javascript:btnHash('#databases')"  class="iconfont window-title-btn">&#xe603;</a><!--选择库-->

        </div>
        <div style="height: 100%;box-sizing:border-box;padding: 42px 0 0;">
            <div style="height:36px ; margin: -42px 0 0;">
                <!-- <table width="100%">
                    <tr>
                        <td><a href="javascript:btnHash('#databases')" class="btn">切换数据库</a></td>
                        <td><a href="javascript:btnHash('#tabledata2')" class="btn">自定义sql</a></td>
                    </tr>
                </table>-->
                <input type="text" id="tabledata_input" class="btn"
                       style="width: 80%; margin: 5px auto 0px; background: white; color: black;"/>
            </div>
            <ul id="tablesList" style="height: 100%;box-sizing:border-box;">

            </ul>
        </div>

    </div>
</div>
