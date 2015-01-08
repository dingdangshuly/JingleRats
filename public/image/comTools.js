function getUserName(){
    return Rname("UserStateBy77ZXW","UName");
}
function getUserID(){
    return Rname("UserStateBy77ZXW","Uid");
}
function getRank(){
    return Rname("UserStateBy77ZXW","URank");
}
function getUType(){
    return Rname("UserStateBy77ZXW","UType");
}

function getYZM(){
    return Rname("chCodeYzm","vcode");
}
function Rname(sMainName, sSubName){ 
var re = new RegExp((sSubName ? sMainName + "=(.*?&)*?" + sSubName + "=(.*?)(&|;)" : sMainName + "=(.*?);"), "i"); 
return re.test(decodeURI(document.cookie).replace("%40","@")) ? (sSubName ? RegExp["$2"] : RegExp["$1"]) : ""; 
}

function jsLoader()
{this.load=function(f)
{var oTags=document.getElementsByTagName('script');for(i=oTags.length-1;i>=0;i--)
{var src=oTags[i].src;if(src&&src.indexOf(f)>-1)
{this.onsuccess();return;}}
var s=document.createElement('script');var header=document.getElementsByTagName('head').item(0);s.setAttribute('src',f);s.setAttribute('type','text/javascript');s.setAttribute('language','javascript');header.appendChild(s);var _self=this;s.onload=s.onreadystatechange=function()
{if(this.readyState&&this.readyState=="loading")
return;_self.onsuccess();}
s.onerror=function()
{header.removeChild(s);_self.onfailure();}};this.onfailure=function(){};this.onsuccess=function(){};}

function showSingleLogin(n)
{
var goUrl='/login_Win.aspx'
if(n&&parseInt(n))goUrl='/login_Win.aspx?id='+parseInt(n);
var oJsLoader=new jsLoader();
oJsLoader.onsuccess=function(){editPhotoCat(goUrl,'登陆',320,250);}
oJsLoader.load('/js/popup.js');
return false;

}

function autoSize(obj,w,h)
{var oIMG=new Image()
oIMG.onload=function()
{var oW=this.width;var oH=this.height;var tax=1;if(oW>w||oH>h)
tax=(oW/oH)>(w/h)?(w/oW):(h/oH);obj.style.marginLeft=(w-Math.floor(oW*tax))/2+"px";obj.style.marginTop=(h-Math.floor(oH*tax))/2+"px";obj.width=oW*tax;obj.height=oH*tax;}
oIMG.src=obj.src;}

String.prototype.trim=function()
{var res=/^\s*/;var value=this;value=value.replace(res,'')
res=/\s*$/;return value.replace(res,'');}

function BindHeadLogin()
{
    var obj = document.getElementById("divHeadLogin");
    if(getUserID()!="")
    {
        obj.innerHTML = "<a href=\"http://user.77zxw.com/\" target=\"_blank\">"+getUserName()+"</a>&nbsp;&nbsp;<a href=\"/exit.aspx?outid=1\">退出</a>";
    }
}
function BindHeadLoginCom()
{
    var obj = document.getElementById("divHeadLogin");
    if(getUserID()!="")
    {
        document.getElementById("liZhuCe").style.display = "none";
        document.getElementById("liDengLu").style.display = "none";
        
        document.getElementById("liLoginUName").innerHTML = "<a href=\"http://user.77zxw.com/\" target=\"_blank\">"+getUserName()+"</a>";
        document.getElementById("liLoginExit").innerHTML = "<a href=\"/exit.aspx?outid=1\">退出</a>";
        
        document.getElementById("liLoginUName").style.display = "";
        document.getElementById("liLoginExit").style.display = "";
    }
}