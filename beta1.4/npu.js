var isIe=(document.all)?true:false;
//取cookie
function getCookie(c_skin)
{
 if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_skin + "=")
  if (c_start!=-1)
    { 
    c_start=c_start + c_skin.length+1 
    c_end=document.cookie.indexOf(";",c_start)
    if (c_end==-1) c_end=document.cookie.length
    return unescape(document.cookie.substring(c_start,c_end))
    } 
  }
return ""
}
//设置cookie
function setCookie(c_skin,value,expiredays)
{
 var exdate=new Date()
 exdate.setDate(exdate.getDate()+expiredays)
 document.cookie=c_skin+ "=" +escape(value)+
 ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
//检查cookie
function checkCookie()
{
 skincss=getCookie('skincss')
 if (skincss!=null && skincss!="")
  {document.body.style.background=skincss}
}
//设置背景
function setBackground(num,color)
{
 skincss="#"+color+" url(images/skin_"+num+".jpg) no-repeat scroll top center"
 document.body.style.background=skincss
 setCookie('skincss',skincss,365)
}
//搜索
function s_1()
{window.open("http://www.baidu.com/baidu?tn=gg5g&word="+encodeURI(f_g.key.value));return false;};
function s_2()
{window.open("http://www.google.com/search?hl=zh-CN&q="+encodeURI(f_g.key.value));return false;};
function s_3()
{window.open("http://www.sogou.com/web?query="+encodeURI(f_g.key.value));return false;};
//设置主页
function SetHome(obj,url)
{     
    try{obj.style.behavior='url(#default#homepage)';obj.setHomePage(url);}
	catch(e)
	{     
        if(window.netscape)
		{    
            try{netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");}
			catch(e){ alert("T﹏T帮主人自动设置主页失败了\n\n只能麻烦主人手动将"+url+"设置为主页了⊙﹏⊙");}
		}
        else
		{alert("T﹏T帮主人自动设置主页失败了\n\n只能麻烦主人手动将"+url+"设置为主页了⊙﹏⊙");}
	}
}
//载入学院显示方式
function schoolCookie()
{
 school=getCookie('school')
 if (school!=null && school!="" && school=='old')
  {
	  document.getElementById("schoolold").style.display='inline'
	  document.getElementById("schoolnew").style.display='none'
	  document.getElementById("institution").style.lineHeight='28px'
  }
 else
 {
	document.getElementById("schoolold").style.display='none'
 }
}
//更改学院显示方式
function schoolchange()
{
	if(document.getElementById("schoolold").style.display!='none')
	{
		document.getElementById("schoolnew").style.display='inline'
		document.getElementById("schoolold").style.display='none'
		document.getElementById("institution").style.lineHeight='30px'
		setCookie('school','new',365)
	}
	else
	{
		setCookie('school','old',365)
		document.getElementById("schoolold").style.display='inline'
		document.getElementById("schoolnew").style.display='none'
		document.getElementById("institution").style.lineHeight='28px'
	}
}
//七夕
lh=0
lw=0
ltop=530
lleft=483
i=0
qixidid=0
function qixi()
{
	if(!qixidid)
	{
		document.getElementById('luckybg').style.display='inline'
		setBackground('5','ffb5e0')		
		qixidid=1
		qixistart()
	}
}
function qixistart()
{
	document.getElementById('luckybg').style.display='inline'
	i++
	lh+=i
	lw+=i
	ltop-=i/2
	lleft-=i/2
	document.getElementById('luckybg').style.height=lh+'px'
	document.getElementById('luckybg').style.width=lw+'px'
	document.getElementById('luckybg').style.top=ltop+'px'
	document.getElementById('luckybg').style.marginLeft=lleft+'px'
	t=setTimeout("qixistart()",20)
	if(lh>880)
	{
		clearTimeout(t)
    	document.getElementById('luckybg').style.height='881px'
	    document.getElementById('luckybg').style.width='966px'
		document.getElementById('luckybg').style.top='81px'
		document.getElementById('luckybg').style.marginLeft='22px'
		lh=0
		lw=0
		ltop=530
		lleft=483
		i=0
		znmove()
		document.getElementById('zn').style.display='inline'
	}
}
function znmove()
{
	i++
	mtop=300+Math.sin(i/25)*20
	document.getElementById('zn').style.left=(i-100)+'px'
	document.getElementById('zn').style.top=mtop+'px'
	t=setTimeout("znmove()",8)
	if(i>(window.screen.width/2+480))
	{
		clearTimeout(t)
		i=0
		bgmove()
	}
}
function bgmove()
{
	i++
	if(isIe)
	{
		document.getElementById('luckybg').filters.alpha.opacity=100-i
	}
	else{document.getElementById('luckybg').style.opacity=1-i/100}
	t=setTimeout("bgmove()",100/i)
	if(i>100)
	{
		clearTimeout(t)
		i=0
		document.getElementById('luckybg').style.display='none'
		document.getElementById('luckybg').style.opacity=1
	}
	
}
