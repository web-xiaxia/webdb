var nowmaodian = null;
var maodianlist = {
    "#url-back": {
        id: "#url-back",
        init: function () {
            window.history.forward()
        },
        name: 'back',
        skipSave: true,
    },
    "#login": {
        id: "#login",
        init: logininit,
        name: '连接',
    },
    "#databases": {
        id: "#databases",
        init: initselectdatabase,
        name: '选择库'
    },
    "#tables": {
        id: "#tables",
        init: inittables,
        name: '选择表'
    },
    "#tabledata": {
        id: "#tabledata",
        init: inittabledata,
        name: '查看表'
    },
    "#tabledata2": {
        id: "#tabledata2",
        init: inittabledata2,
        name: 'SQL'
    },
    "#choice-window": {
        id: "#choice-window",
        init: initchoicewindow,
        name: '选择窗口'
    }
}
window.onhashchange = nowurlfun;

function getQueryString(name) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = window.location.search.substring(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}

$(function () {
    const startId = getQueryString("startId")
    if (startId) {
        setSessionStorage(sessionStorageName.startId, startId, false)
    }
    nowurlfun(window.location.href);
})

function getmaodian(hash) {
    if (hash.indexOf("?") != -1) {
        hash = hash.substr(0, hash.indexOf("?"))
    }
    if (!hash) {
        hash = "#login"
    }
    var maodian = maodianlist[hash];
    return maodian
}

function addUrlBack2() {
    window.history.pushState({
        title: "title",
        url: "#url-back"
    }, "title", "#url-back");
}

function addUrlBack() {
    addUrlBack2()
    addUrlBack2()
}

function replaceUrlBack() {
    window.history.replaceState({
        title: "title",
        url: "#url-back"
    }, "title", "#url-back");
}

function nowurlfun(hashChangeEvent) {
    var hash = window.location.hash;
    if (hash == "") {
        hash = getSatrtIdLocalStorage(localStorageName.oldUrl, false)
        if (hash) {
            addUrlBack()
            window.location.href = hash
            return
        }
    }
    if (hash == null || hash == "") {
        hash = "#login";
    }
    var maodian = getmaodian(hash)
    if (maodian) {
        if (!maodian.skipSave) {
            setSatrtIdLocalStorage(localStorageName.oldUrl, hash, false);
        }
        txxxxx(maodian);
    } else {
        window.location.href = "#login"
    }

}

function txxxxx(maodian) {
    for (var omaodiankey in maodianlist) {
        var omaodian = maodianlist[omaodiankey]
        if (omaodian != maodian) {
            $(omaodian.id).slideUp(gddhms);
        }
    }
    nowmaodian = maodian.id;
    closeLoding()
    $(maodian.id).slideDown(gddhms);
    if (maodian.init != null) {
        maodian.init();
    }
    $(".floatmain").css({display: "none"});
}

