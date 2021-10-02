function initchoicewindow() {
    var windowList = $('#choice-window-window-list')
    var lasttr = null

    var choice_window_list = getLocalStorage(localStorageName.choicewindow, true, [])
    for (var index in choice_window_list) {
        addlistwindow(windowList, choice_window_list[index])
    }
    var lastchoicewindow = getLocalStorage(localStorageName.choicewindowlast)
    if (lastchoicewindow) {
        for (var i = 0; i < 10; i++) {
            addlistwindow(windowList, lastchoicewindow)
        }
    }
}


function addlistwindow(windowList, choice_window) {
    windowList.append($(`<li  class="choicewindowshowwindow" data-id="${choice_window.id}" data-url="${choice_window.url}" >
    <div>
        <div class="wtitle">${choice_window.name}<div class="close iconfont" onclick="listwindowclose(this)">&#xe60d;</div></div>
        <div class="wcontext"  onclick="choicewindowli(this)">
            <div class="wcontext2">
            <img class="wimage" src="${choice_window.image}"></image>
        </div>
        </div>
    </div>
    </li>`))
}

function choicewindow() {
    var maodian = getmaodian(window.location.hash)
    var maodian_name = maodian ? maodian.name : ""
    if (maodian.id == '#tabledata') {
        maodian_name = `${maodian_name}(${GetMaoQueryString('table')})`
    }
    html2canvas(document.body).then(function (canvas) {
        var strDataURI = canvas.toDataURL();
        setLocalStorage(localStorageName.choicewindowlast, {
            id: new Date().getTime(),
            name: maodian_name,
            url: window.location.hash,
            image: strDataURI
        });
        window.location.hash = "choice-window"
    });
}

function listwindowclose(that){
    $(that).parents('.choicewindowshowwindow').remove()
}


function choicewindowli(that) {

}