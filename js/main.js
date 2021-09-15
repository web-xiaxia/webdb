
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
    dbCookie:"dbCookieV2",

    oldUrl:"oldUrl",
    lsbj:"lsbj",
    zdysql:"zdysql",

    connObj:"connObj:",
    databasesList:"databasesList:",

    nowconn:"nowconn",

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
    $("#loding").css({display:""});
    var lodingcontent=$("#lodingcontent");
}
function closeLoding()
{
    htmlover--;
    if(htmlover<=0) {
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
    $(".close").click(function(){
        $(this).parents(".floatmain").css("display","none");
    })
});
function openfloatmain(id)
{
    htmlover++;
    $(id).css("display","");
}function closefloatmain(id)
{
    htmlover--;
    if( htmlover<=0)
    {
        htmlover=0;
    }
    $(id).css("display","none");
}