<div  id="login" style="display: none" class="window">
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
            <td class="logintitle">地址:</td>
            <td><input  class="logincontent" id="mysql_server_name" value=""></td>
        </tr>
        <tr>
            <td class="logintitle">用户名:</td>
            <td><input class="logincontent"  id="mysql_username" value=""></td>
        </tr>
        <tr>
            <td class="logintitle"> 密码:</td>
            <td><input class="logincontent" type="password" id="mysql_password" value=""></td>
        </tr>
        <tr>
            <td class="logintitle">ssh隧道</td>
            <td  class="logincontent"><input type="checkbox" id="connssh"></td>
        </tr>
        <tr>
            <td class="logintitle">地址：</td>
            <td  class="logincontent"><input type="text" id=""></td>
        </tr>
        <tr>
            <td class="logintitle">端口：</td>
            <td  class="logincontent"><input type="text" id=""></td>
        </tr>
        <tr>
            <td class="logintitle">用户名：</td>
            <td  class="logincontent"><input type="text" id=""></td>
        </tr>
        <tr>
            <td class="logintitle">加密方式：</td>
            <td  class="logincontent"><input type="checkbox" id="">普通<input type="checkbox" id="">密钥</td>
        </tr>
        <tr>
            <td class="logintitle">密钥：</td>
            <td  class="logincontent"><input type="text" id=""></td>
        </tr>
        <tr>
            <td class="logintitle">密码：</td>
            <td  class="logincontent"><input type="password" id=""></td>
        </tr>
        <tr>
            <td><input type="checkbox" id="connsub"></td>
            <td><a href="javascript:void(0)" class="btn" id="sub">连接</a></td>
        </tr>
    </table>
</div>