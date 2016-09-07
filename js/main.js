
var gddhms=0;

function setSessionStorage(name,value,b)
{
    if(b==false)
    {
        sessionStorage[name]=value;
    }else
    {
        sessionStorage[name]=JSON.stringify(value);
    }

}
function getSessionStorage(name,b)
{
    var a=sessionStorage[name];
    if(a==null)
    {
        return null;
    }
    if(b==false)
    {
        return a;
    }
    return JSON.parse(a);
}
function setLocalStorage(name,value,b)
{
    if(b==false)
    {
        localStorage[name]=(value);
    }else
    {
        localStorage[name]=JSON.stringify(value);
    }

}
function getLocalStorage(name,b)
{
    var a=localStorage[name];
    if(a==null)
    {
        return null;
    }
    if(b==false)
    {
        return a;
    }
    return JSON.parse(a);
}



var localStorageName={
    dbCookie:"dbCookie",
    oldUrl:"oldUrl",
    lsbj:"lsbj",
    zdysql:"zdysql",

    nowconn:"nowconn",
    databasesList:"databasesList",
    tableList:"tableList",
    tableobj:"tableobj",
    querywhereobj:"querywhereobj",
    oderbyobj:"oderbyobj"
}
var sessionStorageName={

}

var htmlover=0;
function openLoding()
{
    htmlover++;
    $("html").css({overflow:"hidden"});
    $("#loding").css({display:""});
    var lodingcontent=$("#lodingcontent");
    lodingcontent.css({left:$(window).width()/2-lodingcontent.width()/2+"px",top:$(window).height()/2-lodingcontent.height()/2+"px"})
}
function closeLoding()
{
    htmlover--;
    if(htmlover<=0) {
        $("html").css({overflow: ""});
        htmlover=0;
    }
    $("#loding").css({display:"none"});
}
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]); return null;
}
$(function(){
    $(".float .content").css({height:($(window).height()-$(window).height()*0.3)+"px"});
    $(".floatmain .float").css({top:($(window).height()*0.1)+"px"});
    $(window).resize(function(){
        $(".float .content").css({height:($(window).height()-$(window).height()*0.3)+"px"});
        $(".floatmain .float").css({top:($(window).height()*0.1)+"px"});
    });
    $(".close").click(function(){
        $("html").css({overflow:""});
        $(this).parents(".floatmain").css("display","none");
    })
});
function openfloatmain(id)
{
    htmlover++;
    $("html").css({overflow:"hidden"});
    $(id).css("display","");
}function closefloatmain(id)
{
    htmlover--;
    if( htmlover<=0)
    {
        $("html").css({overflow:""});
        htmlover=0;
    }
    $(id).css("display","none");
}