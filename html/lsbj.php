<script type="text/javascript">
    $(function () {
        $("#floatmainlsbjcontent").keyup(function () {
            setSatrtIdLocalStorage(localStorageName.lsbj, $(this).val(), false);
        });
        $("#floatmainlsbjcontent").change(function () {
            setSatrtIdLocalStorage(localStorageName.lsbj, $(this).val(), false);
        });
        $("#openfloatmainlsbj").click(function () {
            var a = getSatrtIdLocalStorage(localStorageName.lsbj, false);
            if (a == null) {
                a = "临时笔记，可用于临时记录！\n不清空缓存下，永久保持！";
            }
            $("#floatmainlsbjcontent").val(a)
            openfloatmain("#floatmainlsbj");
        });
    });
</script>
<div id="openfloatmainlsbj"
     style="display: none; width: 20px;height: 20px;position: fixed;z-index: 700; right: 0px; top: 70px; text-align: center;line-height: 20px;background: #dd9822;color: white;border: 1px solid white">
    O
</div>
<div class="floatmain" id="floatmainlsbj" style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">临时笔记</span><a class="close iconfont" href="javascript:void(0)">&#xe60d;</a>
        </div>
        <div class="contentbox">
            <div class="content" style="overflow:hidden">
                    <textarea id="floatmainlsbjcontent"
                              contenteditable="true"
                              style="display:block;width:100%;height: 100%;box-sizing: border-box; -moz-box-sizing: border-box;-webkit-box-sizing: border-box; -webkit-user-select:text;"
                              rows="30"></textarea>
            </div>
        </div>
    </div>
</div>