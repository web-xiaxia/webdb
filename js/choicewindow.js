function initchoicewindow() {
    var windowList = $('#choice-window-window-list')
    windowList.empty()

    var choice_window_list = getLocalStorage(localStorageName.choicewindow, true, [])
    for (var index in choice_window_list) {
        addlistwindow(windowList, choice_window_list[index], false)
    }
    var lastchoicewindow = getLocalStorage(localStorageName.choicewindowlast)
    if (lastchoicewindow) {
        addlistwindow(windowList, lastchoicewindow, true)
    }

    if (choice_window_list.length == 0 && !lastchoicewindow ){
        window.location.hash='#login'
    }
}


function addlistwindow(windowList, choice_window, last) {
    windowList.append($(`<li  class="choicewindowshowwindow" data-id="${choice_window.id}" data-url="${choice_window.url}" data-last="${last}" >
    <div>
        <div class="wtitle">${choice_window.name}<div class="close iconfont" onclick="listwindowclose(this,${last?false:true})">&#xe60d;</div></div>
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
            id: new Date().getTime() + '',
            name: maodian_name,
            url: window.location.hash,
            image: strDataURI
        });
        window.location.hash = "choice-window"
    });
}

function listwindowsaveall(dataId) {
    var choice_window_list = getLocalStorage(localStorageName.choicewindow, true, [])
    var new_choice_window_list = []
    for (var index in choice_window_list) {
        var choice_window = choice_window_list[index]
        if (choice_window.id != dataId) {
            new_choice_window_list.push(choice_window)
        }
    }
    setLocalStorage(localStorageName.choicewindow, new_choice_window_list)
}

function listwindowclose(that, candelete) {
    var parent = $($(that).parents('.choicewindowshowwindow')[0])
    if (candelete) {
        var dataId = parent.attr('data-id')
        listwindowsaveall(dataId)
    }
    parent.remove()
}

function savelast() {
    var lastchoicewindow = getLocalStorage(localStorageName.choicewindowlast)
    if (lastchoicewindow) {
        var choice_window_list = getLocalStorage(localStorageName.choicewindow, true, [])
        for (var index in choice_window_list) {
            if (choice_window_list[index].id == lastchoicewindow.id) {
                return
            }
        }
        choice_window_list.push(lastchoicewindow)
        setLocalStorage(localStorageName.choicewindow, choice_window_list)
    }
}

function choicewindowli(that) {
    var parent = $($(that).parents('.choicewindowshowwindow')[0])
    if(parent.attr('data-last')!='true'){
        savelast()
    }
    listwindowsaveall(parent.attr('data-id'))
    window.location.hash = parent.attr('data-url')
}

function choicewindownew() {
    savelast()
    window.location.hash = "#login"
}