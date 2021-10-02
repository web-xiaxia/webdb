function initchoicewindow() {
    var windowList = $('#choice-window-window-list')
    var lasttr = null

    var choice_window_list = getLocalStorage(localStorageName.choicewindow, true, [])
    for (var index in choice_window_list) {
        lasttr = windowListTr(windowList, lasttr, index)
        addlistwindow(lasttr, choice_window_list[index])
    }
    var lastchoicewindow = getLocalStorage(localStorageName.choicewindowlast)
    if (lastchoicewindow) {
        for (var i = 0; i < 10; i++) {
            lasttr = windowListTr(windowList, lasttr, choice_window_list.length + i)
            addlistwindow(lasttr, lastchoicewindow)
        }
    }
}

function windowListTr(windowList, lasttr, index) {
    if (index % 2 == 0) {
        lasttr = $(`<tr></tr>`)
        windowList.append(lasttr)
    }
    return lasttr
}

function addlistwindow(lasttr, choice_window) {
    lasttr.append($(`<td><div data-id="${choice_window.id}" data-url="${choice_window.url}" onclick="choicewindowli(this)">
        <div class="wtitle">${choice_window.name}<a class="close iconfont" href="javascript:void(0)">&#xe60d;</a></div>
        <div class="wcontext">
        <div class="wcontext2">
        <img class="wimage" src="${choice_window.image}"></image>
        </div>
        </div>
    </div></td>`))
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


function choicewindowli(that) {

}