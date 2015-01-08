//document.write("<script language=\"javascript\" src=\"http://style.77zxw.com/js/jquery-1.4.2.min.js\"><\/script>"); 

var DomReady = window.ready = function(fn){
	if(document.addEventListener){//兼容非IE
		document.addEventListener("DOMContentLoaded",function(){
			//注销事件，避免反复触发
			document.removeEventListener("DOMContentLoaded",arguments.callee,false);
			fn();//调用参数函数
		},false);
	}else if(document.attachEvent){//兼容IE
		document.attachEvent("onreadystatechange",function(){
			if(document.readyState==="complete"){
				document.detachEvent("onreadystatechange",arguments.callee);
				fn();
			}
		}); 
	}
}

DomReady(function(){
    
    //$("#btnTJ1").click(function(){ publishZB(1);})
//    $("#btnTJ2").click(function(){ publishZB(2,9);})
//    $("#btnTJ3").click(function(){ publishZB(3,5);})
//    $("#btnTJ4").click(function(){ publishZB(4,1);})
//    $("#btnTJ5").click(function(){ publishZB(5,2);})
//    $("#btnTJ6").click(function(){ publishZB(6,10);})
//    $("#btnTJ7").click(function(){ publishZB(7,11);})
    
})
function publishGJ()
{
    var $=jQuery.noConflict(); 
    var LinkMan = $("#txtLinkManGJ").val();
    var Phone = $("#txtPhoneGJ").val();
    
    if(LinkMan=="" || LinkMan=="请输入您的姓名")
    {
        $("#txtLinkManGJ").focus();
        return;
    }
    if(Phone=="" || Phone=="请输入您的手机号码")
    {
        $("#txtPhoneGJ").focus();
        return;
    }
    if(Phone.length!=11 || isNaN(Phone))
    {
        $("#txtPhoneGJ").focus();
        alert("请输入有效的手机号码!");
        return;
    }

    $.post(
        "/control/liuyan.ashx", 
        { type:"3",linkman:LinkMan,phone:Phone},
        function(data)
        {
            if(data=="1")
            {
                $("#txtLinkMan").attr("value","请输入您的姓名");
                $("#txtPhone").attr("value","请输入您的姓名");
                 alert("申请成功，我们会尽快与您取得联系，请保持电话畅通！");
            }
            else
            {
                alert("网络繁忙，请稍后再试!");
            }
        }
    );
}
function publishZB(nType)
{
    var $=jQuery.noConflict(); 
    
    var LinkMan = $("#txtLinkMan"+nType).val();
    var Phone = $("#txtPhone"+nType).val();
    
    if(LinkMan=="" || LinkMan=="请输入您的姓名")
    {
        $("#txtLinkMan"+nType).focus();
        return;
    }
    if(Phone=="" || Phone=="请输入您的手机号码")
    {
        $("#txtPhone"+nType).focus();
        return;
    }
    if(Phone.length!=11 || isNaN(Phone))
    {
        $("#txtPhone"+nType).focus();
        alert("请输入有效的手机号码!");
        return;
    }
   
    jq.post(
        "/control/zb.ashx", 
        {   linkman:LinkMan
            ,Phone:Phone
            ,nType:nType
            ,FromType:5
        },
        function(data)
        {
            if(data=="1")
            {
                $("#txtLinkMan"+nType).attr("value","请输入您的姓名");
                $("#txtPhone"+nType).attr("value","请输入您的手机号码");

                alert("申请成功，我们会尽快与您取得联系，请保持电话畅通！");
            }
            else
            {
                alert("网络繁忙，请稍后再试!");
            }
        }
    );
}
//顶部搜索下拉菜单js
function showAndHide(obj,types){
var Layer=window.document.getElementById(obj);
switch(types){
case "show":
Layer.style.display="block";
break;
case "hide":
Layer.style.display="none";
}
}
function getValue(obj, str, strtype) {
    window.document.getElementById("sT").value = strtype;
var input=window.document.getElementById(obj);
window.document.getElementById("txtKeyWord").value = "请输入"+str+"的关键字";
input.value=str;
}
function kwonfocus(obj)
{
    var key = obj.value;
    if(key=="请输入公司的关键字" || key=="请输入案例的关键字" || key=="请输入问答的关键字" || key=="请输入资讯的关键字")
    {
        obj.value = "";
    }
}
function kwonblur(obj)
{
    if(obj.value=="")
    {
        var st = window.document.getElementById("sT").value;
        if(st=="2")
        {
            obj.value="请输入案例的关键字";
        }
        else if(st=="3")
        {
            obj.value="请输入问答的关键字";
        }
        else if(st=="4")
        {
            obj.value="请输入公司的关键字";
        }
        else if(st=="1")
        {
            obj.value="请输入资讯的关键字";
        }
    }
}
function topSearch()
{
    var key = document.getElementById("txtKeyWord").value;
    var st = window.document.getElementById("sT").value;
    
    if(key=="请输入公司的关键字" || key=="请输入案例的关键字" || key=="请输入问答的关键字" || key=="请输入资讯的关键字")
    {
        key = "";
    }
    if(key=="")
    {
        document.getElementById("txtKeyWord").focus();
        return;
    }

    if(st=="2")
    {
        window.location.href= "http://tu.77zxw.com/k"+encodeURI(key)+".html";
    }
    else if(st=="3")
    {
        window.location.href= "http://www.77zxw.com/ask/p1k"+encodeURI(key)+".html";
    }
    else if(st=="4")
    {
        window.location.href= document.getElementById("hidHost").value+"/gongsi/k"+encodeURI(key)+".html";
    }
    else if(st=="1")
    {
        window.location.href= document.getElementById("hidHost").value+"/news/p1k"+encodeURI(key)+".html";
    }
    

}








