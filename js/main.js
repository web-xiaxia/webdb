var gddhms = 0;

function setSessionStorage(name, value, b) {
    if (b == false) {
        sessionStorage[name] = value;
    } else {
        sessionStorage[name] = JSON.stringify(value);
    }

}

function getSessionStorage(name, b) {
    var a = sessionStorage[name];
    if (a == null) {
        return null;
    }
    if (b == false) {
        return a;
    }
    return JSON.parse(a);
}

function setLocalStorage(name, value, b) {
    if (b == false) {
        localStorage[name] = (value);
    } else {
        localStorage[name] = JSON.stringify(value);
    }

}
function delLocalStorage(name){
    delete localStorage[name]
}

function getLocalStorage(name, b, def = null) {
    var a = localStorage[name];
    if (a == null) {
        if (def) {
            setLocalStorage(name, def, b)
        }
        return def;
    }
    if (b == false) {
        return a;
    }
    return JSON.parse(a);
}


var localStorageName = {
    oldUrl: "oldUrl",
    lsbj: "lsbj",

    dbCookie: "dbCookieV2",

    connObj: "connObj:",
    databasesList: "databasesList:",
    tableList: "tableList:",
    tableColumns: "tableColumns:",
    tablePage: "tablePage:",
    querywhereobj: "querywhereobj:",
    oderbyobj: "oderbyobj:",
    tablefilter: "tablefilter:",
    tablefilterinfo: "tablefilterinfo:",

    zdysqllist: "zdysqllist:",
    zdysql: "zdysql:",
    zdysqlnow: "zdysqlnow:",
}
var sessionStorageName = {}

var htmlover = 0;

function openLoding() {
    htmlover++;
    $("#loding").css({display: ""});
    var lodingcontent = $("#lodingcontent");
}

function closeLoding() {
    htmlover--;
    if (htmlover <= 0) {
        htmlover = 0;
    }
    $("#loding").css({display: "none"});
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function GetMaoQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var hash = window.location.hash
    if (hash.indexOf('?') == -1) {
        hash = ''
    } else {
        hash = hash.substr(hash.indexOf('?'), hash.length)
    }
    var r = hash.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

$(function () {
    $(".close").click(function () {
        $(this).parents(".floatmain").css("display", "none");
    })
});

function openfloatmain(id) {
    htmlover++;
    $(id).css("display", "");
}

function closefloatmain(id) {
    htmlover--;
    if (htmlover <= 0) {
        htmlover = 0;
    }
    $(id).css("display", "none");
}

function btnHash(h) {
    if (window.location.hash.indexOf('?') != -1) {
        window.location.hash = h + window.location.hash.substr(window.location.hash.indexOf('?'), window.location.hash.length
        )
    } else {
        window.location.hash = h
    }

}