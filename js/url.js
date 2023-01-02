var nowmaodian = null;
var maodianlist = {
    "#url-back": {
        id: "#url-back",
        init: function () {
            window.history.forward()
        },
        name: 'back'
    },
    "#login": {
        id: "#login",
        init: logininit,
        name: '连接'
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
$(function () {
    nowurlfun(window.location.href);
})

function getmaodian(hash) {
    if (hash.indexOf("?") != -1) {
        hash = hash.substr(0, hash.indexOf("?"))
    }
    var maodian = maodianlist[hash];
    return maodian
}

function addUrlBack() {
    window.history.pushState({
        title: "title",
        url: "#url-back"
    }, "title", "#");
}

function nowurlfun(hashChangeEvent) {
    var hash = window.location.hash;
    if (hash == "") {
        hash = getLocalStorage(localStorageName.oldUrl, false)
        if (hash) {
            addUrlBack()
            addUrlBack()
            window.location.hash = hash
        }
    }
    if (hash == null || hash == "") {
        hash = "#login";
    }
    setLocalStorage(localStorageName.oldUrl, hash == "#login" ? "" : hash, false);

    var maodian = getmaodian(hash)
    txxxxx(maodian);

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

