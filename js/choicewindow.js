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

    if (choice_window_list.length == 0 && !lastchoicewindow) {
        window.location.replace('#login')
    }
}


function addlistwindow(windowList, choice_window, last) {
    windowList.append($(`<li  class="choicewindowshowwindow" data-id="${choice_window.id}" data-url="${choice_window.url}" data-last="${last}" >
    <div>
        <div class="wtitle">
            ${choice_window.name}
            <div class="tbtn iconfont" onclick="listwindowclose(this,${last ? false : true})">&#xe60d;</div>
            <div class="tbtn iconfont" style="float: right;margin-right: 24px" onclick="choicewindowlinew(this)">&#xe65d;</div>
        </div>
        <div class="wcontext"  onclick="choicewindowli(this)">
            <div class="wcontext2">
            <img class="wimage" src="${choice_window.image}"></image>
        </div>
        </div>
    </div>
    </li>`))
}

var choicewindowing = false

function choicewindow() {
    if (choicewindowing) {
        return
    }
    choicewindowing = true


    var conn_name = GetMaoQueryString('conn_name')
    var database = GetMaoQueryString('database')
    var window_show_name1 = ""
    if (conn_name) {
        window_show_name1 += conn_name
    }
    if (database) {
        window_show_name1 += (' - ' + database)
    }

    var maodian = getmaodian(window.location.hash)
    var window_show_name2 = maodian ? maodian.name : ""
    if (maodian.id == '#tabledata') {
        window_show_name2 = `${window_show_name2}(${GetMaoQueryString('table')})`
    }

    var window_show_name_list = []
    if (window_show_name1) {
        window_show_name_list.push(window_show_name1)
    }
    window_show_name_list.push(window_show_name2)

    var window_show_name = window_show_name_list.join('<br/>')

    html2canvas(document.body).then(function (canvas) {
        var strDataURI = canvas.toDataURL('image/png', 0.5);
        setLocalStorage(localStorageName.choicewindowlast, {
            id: new Date().getTime() + '',
            name: window_show_name,
            url: window.location.hash,
            image: strDataURI
        });
        choicewindowing = false
        window.location.replace("choice-window")
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
    if (window.confirm("确认删除？")) {
        var parent = $($(that).parents('.choicewindowshowwindow')[0])
        if (candelete) {
            var dataId = parent.attr('data-id')
            listwindowsaveall(dataId)
        }
        parent.remove()
    }
}

function savelast() {
    var lastchoicewindow = getLocalStorage(localStorageName.choicewindowlast)
    if (lastchoicewindow) {
        var lastli = $('#choice-window-window-list').find('li:last-child')
        if (!lastli || lastli.attr('data-id') != lastchoicewindow.id) {
            return;
        }

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

function choicewindowlinew(that) {
    var parent = $($(that).parents('.choicewindowshowwindow')[0])
    window.open(parent.attr('data-url'), "_blank");
}

function choicewindowli(that) {
    var parent = $($(that).parents('.choicewindowshowwindow')[0])
    if (parent.attr('data-last') != 'true') {
        savelast()
    }
    listwindowsaveall(parent.attr('data-id'))
    window.location.replace(parent.attr('data-url'))
}

function choicewindownew() {
    savelast()
    window.location.replace("#login")
}