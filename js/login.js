function logininit() {
    closeLoding()
    $("#login").slideDown(gddhms);
    logincookieinit();

}


function config_load(input) {
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function () {
        var dbCookie = getLocalStorage(localStorageName.dbCookie);
        if (dbCookie == null) {
            dbCookie = [];
        }

        var config = JSON.parse(this.result)
        for (var index in config) {
            var conn = config[index]
            if (conn.conn_str) {
                var canSave = true
                for (var d in dbCookie) {
                    if (dbCookie[d] == conn.conn_name) {
                        canSave = false
                    }
                }
                if (canSave) {
                    setLocalStorage(localStorageName.connObj + conn.conn_name, conn.conn_str);
                    dbCookie.push(conn.conn_name)
                }
            }
        }
        setLocalStorage(localStorageName.dbCookie, dbCookie, 360 * 24 * 60 * 60 * 1000);
        logincookieinit();
    }
    reader.readAsText(file);
}

$(function () {
    $("#sub").click(function () {
        login($("#mysql_server_name").val(), $("#mysql_username").val(), $("#mysql_password").val(), false, '');
    });
    $("#connsub").click(function () {
        $('#conn_name_box').css({'display': $(this).prop('checked') ? '' : 'none'})
    })
    $("#cookielogin").click(function () {
        login('', '', '', true, $("#oldconn").val());
    })
    $("#cookielogindel").click(function () {
        var dbCookiejson = getLocalStorage(localStorageName.dbCookie);
        if (dbCookiejson != null) {
            var del_conn=$("#oldconn").val()
            var newDbCookiejson =[]
            for (var d in dbCookiejson) {
                if (dbCookiejson[d] != del_conn) {
                    newDbCookiejson.push(dbCookiejson[d] )
                }
            }
            setLocalStorage(localStorageName.dbCookie, newDbCookiejson);
            logincookieinit();
        }
    })
    $("#json-dumps").click(function () {
        var config = []
        var dbCookiejson = getLocalStorage(localStorageName.dbCookie);
        for (var d in dbCookiejson) {
            var conn_name = dbCookiejson[d]
            config.push({
                'conn_name': conn_name,
                'conn_str': getLocalStorage(localStorageName.connObj + conn_name),
            })
        }
        download('web-db-config.json', JSON.stringify(config))
    })
})


function login(mysql_server_name, mysql_username, mysql_password, cookie_login, conn_name) {
    var conn_str = ''
    if (cookie_login) {
        conn_str = getLocalStorage(localStorageName.connObj + conn_name);
    } else {
        conn_name = new Date().getTime() + ""
        if ($("#connsub").prop('checked')) {
            conn_name = $('#conn_name').val()
        }
        if (conn_name == '') {
            alert('请输入连接名称')
            return
        }
    }

    openLoding()
    $.ajax({
        url: "/webdb/php/connMysql.php",
        type: "post",
        dataType: "json",
        data: {
            mysql_server_name: mysql_server_name,
            mysql_username: mysql_username,
            mysql_password: mysql_password,
            conn_str: conn_str
        },
        success: function (data) {
            if (data == false) {

                alert("数据库连接失败！");
                closeLoding()
            } else {
                setLocalStorage(localStorageName.connObj + conn_name, data.conn_str);
                setLocalStorage(localStorageName.databasesList + conn_name, data.databases);

                if (!cookie_login && $("#connsub").prop('checked')) {
                    var dbCookie = getLocalStorage(localStorageName.dbCookie);
                    if (dbCookie == null) {
                        dbCookie = [];
                    }

                    var canSave = true
                    for (var d in dbCookie) {
                        if (dbCookie[d] == conn_name) {
                            canSave = false
                        }
                    }
                    if (canSave) {
                        dbCookie.push(conn_name)
                        setLocalStorage(localStorageName.dbCookie, dbCookie, 360 * 24 * 60 * 60 * 1000);
                    }
                }

                window.location.hash = "#databases?conn_name=" + conn_name;
                closeLoding()
            }
        }, error: function () {
            alert("出错了！")
            closeLoding();
        }
    });
}

function logincookieinit() {
    var dbCookiejson = getLocalStorage(localStorageName.dbCookie);
    $("#oldconn").empty();
    if (dbCookiejson != null && dbCookiejson.length>0) {
        $("#oldconntr").css({display: ""});
        $("#json-dumps").css({display: ""});
        for (var d in dbCookiejson) {
            $("#oldconn").append(`<option value="${dbCookiejson[d]}"> ${dbCookiejson[d]}</option>`)
        }
    } else {
        $("#oldconntr").css({display: "none"});
        $("#json-dumps").css({display: "none"});
    }
}
