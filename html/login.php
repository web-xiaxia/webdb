<div id="login"  style="display: none" class="window-box">
    <div  class="window" style="height: auto;">
        <div class="title">数据库连接</div>
        <table>
            <tr id="oldconntr" style="display: none">
                <td>历史连接:</td>
                <td>
                    <select id="oldconn" style="height: 20px;width:70%;line-height: 20px;">
                    </select>
                    <a href="javascript:void(0)" id="cookielogin">连接</a>
                    <a href="javascript:void(0)" id="cookielogindel">删除</a>
                </td>
            </tr>
            <tr>
                <td style="width: 20%;min-width:80px;text-align:  center">地址:</td>
                <td><input style="width: 95%" id="mysql_server_name" value=""></td>
            </tr>
            <tr>
                <td style="width: 20%;text-align:  center">用户名:</td>
                <td><input style="width: 95%" id="mysql_username" value=""></td>
            </tr>
            <tr>
                <td style="width: 20%;text-align:  center"> 密码:</td>
                <td><input style="width: 95%" type="password" id="mysql_password" value=""></td>
            </tr>
            <tr id="conn_name_box" style="display: none">
                <td style="width: 20%;text-align:  center"> 名称:</td>
                <td><input style="width: 95%" id="conn_name" value=""></td>
            </tr>
            <tr>
                <td><input type="checkbox" id="connsub"></td>
                <td><a href="javascript:void(0)" class="btn" id="sub">连接</a></td>
            </tr>
            <tr>
                <td></td>
                <td style="text-align: right">
                    <input type="file" id="json-dumps-file" onchange="config_load(this)" style="display: none">
                    <label for="json-dumps-file">导入</label>
                    <label style="display: none;" id="json-dumps">导出</label>
                </td>
            </tr>
        </table>
    </div>
</div>