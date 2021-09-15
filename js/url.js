var nowmaodian=null;
var maodianlist={
    "#login":{
        id:"#login",
        init:logininit
    },
    "#databases":{
        id:"#databases",
        init:initselectdatabase
    },
    "#tables":{
        id:"#tables",
        init:inittables
    },
    "#tabledata":{
        id:"#tabledata",
        init:inittabledata
    },
    "#tabledata2":{
        id:"#tabledata2",
        init:inittabledata2
    }
}
window.onhashchange=nowurlfun;
$(function(){
    nowurlfun(window.location.href);
})
function nowurlfun(hashChangeEvent){
    var hash= window.location.hash;
    if (hash.indexOf("?")!=-1){
        hash=hash.substr(0,hash.indexOf("?"))
    }
    if(hash=="#oldurl")
    {
        hash=getLocalStorage(localStorageName.oldUrl)
    }
    if(hash==null||hash=="")
    {
        hash="#login";
    }
    setLocalStorage(localStorageName.oldUrl,hash);
    var maodian=maodianlist[hash];
    txxxxx(maodian);

}
function txxxxx(maodian){
    for(var omaodiankey in maodianlist)
    {
        var  omaodian=maodianlist[omaodiankey]
        if(omaodian!=maodian)
        {
            $(omaodian.id).slideUp(gddhms);
        }
    }
    nowmaodian=maodian.id;
    if( maodian.init!=null)
    {
        maodian.init();
    }
    $(".floatmain").css({display:"none"});
}

