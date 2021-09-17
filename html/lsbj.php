<script type="text/javascript">
    $(function(){
        $("#floatmainlsbjcontent").keyup(function(){
            setLocalStorage(localStorageName.lsbj,$(this).val(),false);
        });
        $("#floatmainlsbjcontent").change(function(){
            setLocalStorage(localStorageName.lsbj,$(this).val(),false);
        });
        $("#openfloatmainlsbj").click(function(){
            var a=getLocalStorage(localStorageName.lsbj,false);
            if(a==null)
            {
                a="临时笔记，可用于临时记录！\n不清空缓存下，永久保持！";
            }
            $("#floatmainlsbjcontent").val(a)
            openfloatmain("#floatmainlsbj");
        });
    });
</script>
<div id="openfloatmainlsbj" style="width: 20px;height: 20px;position: fixed;z-index: 10; right: 0px; top: 20px; text-align: center;line-height: 20px;background: #dd9822;color: white;border: 1px solid white">
    O
</div>
<div class="floatmain" id="floatmainlsbj"  style="display: none;">
    <div class="floatbg">
    </div>
    <div class="float">
        <div class="title"><span class="content">临时笔记</span><a class="close" href="javascript:void(0)">X</a></div>
        <div class="content" style="overflow:hidden">
            <textarea id="floatmainlsbjcontent" style="display:block;width: 99%;height: 99%" rows="30"></textarea>
        </div>
    </div>
</div>