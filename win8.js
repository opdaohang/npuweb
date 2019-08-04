var tg_left=new Array();
var tg_name=new Array();		
var tg_n=0;
$(document).ready(function(){	
	var link_data="";
	scroll_switch=1;
	checkCookie();
	place();	
	$(window).resize(function() {
 		place();
	});	
	$("#search_text").keydown(function(event){
		if(event.which==13)
			window.open("http://www.baidu.com/baidu?tn=gg5g&word="+wordtran($("#search_text").val()));
	});
	$("#baidu").click(function(){
		window.open("http://www.baidu.com/baidu?tn=gg5g&word="+wordtran($("#search_text").val()));
	});
	$("#google").click(function(){
		window.open("http://www.google.com/search?hl=zh-CN&q="+wordtran($("#search_text").val()));
	});
	$(document).scroll(function() {
		fw_name();
	});
	$("#school_list a").click(function(){$("#school").css("right","-345px");});
	$(document).mousewheel(function(event, delta, deltaX, deltaY){
		if(scroll_switch){
			scroll_switch=0;
			set_scroll(delta*80);
		}
	});
	$('#change_skin').click(function(e) {
		$.Dialog({
			'title'      : '换肤',
			'content'    : '<div id="sbg1" class="image-collection"><div class="selected"><img src="images/sbg1.jpg" /></div></div><div id="sbg2" onclick="set_bg(2)"  class="image-collection"><div class="noselected"><img src="images/sbg2.jpg" /></div></div><div id="sbg3" onclick="set_bg(3)"  class="image-collection"><div class="noselected"><img src="images/sbg3.jpg" /></div></div>',
			'buttons'    : {
				'确定'    : {
					'action':function(){$("body").css("background-image","url(images/bg"+skinn+".jpg)");
					$("body").css("background-color","#"+bgc);
					setCookie('metro_skincss',skinn+" "+bgc,365);
					switch(skinn){
						case 1:
						case 2:
							$(".group_name").css("color","#b4d3f2");
							break;
						case 3:
							$(".group_name").css("color","#92c382");
							break;
						case 4:
							$(".group_name").css("color","#FFF");
							break;
					}
					}
				},
				 '取消'     : {
					 'action': function(){}
				}
			}
		});
		 $('#dialogBox').css("top",($(window).height()-$('#dialogBox').height())/2+"px" );
		 $('#dialogBox').css("left",($(window).width()-$('#dialogBox').width())/2+"px" );
		 set_bg(skinn);
	});
	$("#search_text").focus();	
});
function wordtran(s)
{
	s=encodeURI(s);
	s=s.replace(/\+/g,"%2B");
	s=s.replace(/\&/g,"%26");
	s=s.replace(/\#/g,"%23");
	return s;
}
//对tile进行布局
function place(){
	w=$(window).width();
	h=$(window).height();
	d_w=120;
	px=(h-305)%120;
	if(px)
		max_l=(h-px-305)/120+1;
	else 
		max_l=(h-px-305)/120;
	$(".tile-group").map(function(){
		tg_n++;
		tg_left[tg_n]=d_w;
		tg_name[tg_n]=$(this).find(".group_name").html();
		$(this).css("left",d_w+"px");
		l=0;
		rb=0;
		r=0;
		rn=0;
		$(this).find(".tile").map(function(){
		  if(max_l>1){
			if($(this).width()==250)
				if(r){
					l++;
					r=0;
					if(l>=max_l){
						l=0;
						rb++;
					}
				}
				else{
					$(this).css("top",l*130+"px");
				}
			$(this).css("top",l*130+"px");
			if(!l){
				d_w+=130;
				rn++;			
			}
			$(this).css("left",((r+rb*2)*130)+"px");
			if(r==1){
				l++;
				r--;
			}
			else{
				r++;
			}
			if($(this).width()==250){
				l++;
				r=0;	
				if(rn%2){
					d_w+=130;
					rn++;
				}
			}
			if(l>=max_l&&r==0){
				l=0;
				rb++;
			}
		  }
		  else{
			  $(this).css("left",rn*130+"px");			  
			  $(this).css("top",0);
			  if($(this).width()==250){
				d_w+=130;
				rn++;
			  }
			  d_w+=130;
			  rn++;
		  }		  
		});	
		d_w+=55;
		$(this).width(rn*130+"px");
		$(this).height(max_l*130+"px");
	});
	$(".page-region").width((d_w)+"px");	
	$("body").height($(window).height()+"px");
	$("#menu_bg").height($(window).height()+"px");	
	$("#menu_bg").width($(window).width()+"px");
	t=($(window).height()-max_l*130)/5+85;
	$(".page-region").css("padding-top",t+"px");
	$(".page-region-content").height(($(window).height()-t-30)+"px");
	$("#button-group").css("margin-top",(($(window).height()-400)/2)+"px");
	fw_name();
}

function backhome(){
	document.documentElement.scrollLeft=0;
	$("body").scrollLeft(0);
}

function goto_link(){
	document.documentElement.scrollLeft=d_w;
	$("body").scrollLeft(d_w);
}

function school(){
	$("#school").animate({right:0},400);
}
function hide_school(){
	$("#school").animate({right:-345},400);
}

bar_switch=1;
function show_bar(){
	if(bar_switch){
			$("#bt1").animate({left:0},600);
			$("#bt2").animate({left:0},400);
			$("#bt3").animate({left:0},400);
			$("#bt4").animate({left:0},600);	
			bar_switch=0;
	}
}

function hide_bar(){
	if(!bar_switch){
			$("#bt1").css("left","100px");
			$("#bt2").css("left","100px");
			$("#bt3").css("left","100px");
			$("#bt4").css("left","100px");
			bar_switch=1;
	}
}

skinn=1;
bgc="4390e0";
function set_bg(n){
	skinhtml="";
	skinn=n;
	for(i=1;i<=4;i++){
		skinhtml+='<div id="sbg'+i+'" onclick="set_bg('+i+')"  class="image-collection"><div class="';
		if(i!=n)
			skinhtml+='no';
		skinhtml+='selected"><img src="images/sbg'+i+'.jpg" /></div></div>';
	}
	$("#dialogBox .content").html(skinhtml);
	switch(n) {
		case 1:
			bgc="4390e0";			
			break;
		case 2:
			bgc="4390e0";
			break;
		case 3:
			bgc="128023";
			break;
		case 4:
			bgc="78aa1c";
			break;
		default:
			break;
	}
}

//取cookie
function getCookie(metro_skin)
{
 if (document.cookie.length>0)
  {
  metro_start=document.cookie.indexOf(metro_skin + "=")
  if (metro_start!=-1)
    { 
    metro_start=metro_start + metro_skin.length+1 
    metro_end=document.cookie.indexOf(";",metro_start)
    if (metro_end==-1) metro_end=document.cookie.length
    return unescape(document.cookie.substring(metro_start,metro_end))
    } 
  }
return ""
}
//设置cookie
function setCookie(metro_skin,value,expiredays)
{
 var exdate=new Date()
 exdate.setDate(exdate.getDate()+expiredays)
 document.cookie=metro_skin+ "=" +escape(value)+
 ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
//检查cookie
function checkCookie()
{
 metro_skincss=getCookie('metro_skincss')
 if (metro_skincss!=null && metro_skincss!="")
  {
		skinn=parseInt(metro_skincss.charAt(0));
		bgc=metro_skincss.substring(2);
		$("body").css("background-image","url(images/bg"+skinn+".jpg)");
		$("body").css("background-color","#"+bgc);
		switch(skinn){
						case 1:
						case 2:
							$(".group_name").css("color","#b4d3f2");
							break;
						case 3:
							$(".group_name").css("color","#92c382");
							break;
						case 4:
							$(".group_name").css("color","#FFF");
							break;
		}
  }
 link_data=getCookie('link_url');
 if (link_data!=null && link_data!="")
{
		link_data=link_data.replace(/<url>/g,'<a href="');
		link_data=link_data.replace(/<name>/g,'"><div class="tile"><div class="self_c"><div class="self_name">');
		link_data=link_data.replace(/<end>/g,'</div></div></div></a>');
	$("#self_link").html('<div class="group_name">自定义</div><a href="link_set.html" target="_self"><div class="tile" style="background-color:#F60;"><div class="icon" style="background-image:url(images/link_set.png);"></div><div class="icon_name">链接设置</div></div></a>'+link_data);
  }
}

function old_version(){
	setCookie('web_version',"old",365)
}

scroll_switch=1;
scroll_n=9;
function set_scroll(sc){
	if(scroll_n--){
		var timer_=setTimeout("set_scroll("+sc+")",30);
		$('body').scrollLeft($('body').scrollLeft()-sc);
		document.documentElement.scrollLeft-=sc;
	}
	else{
		scroll_n=9;
		clearTimeout(timer_);
		scroll_switch=1;
		
	}		
}

function show_set(){
	$("#menu_bg").css("display","block");
}
function hide_set(){
	$("#menu_bg").css("display","none");
}

function fw_name(){
		max_n=1;
		for(i=1;i<=tg_n;i++){
			if(document.documentElement.scrollLeft>tg_left[i]-180)
				max_n=i;
			if($('body').scrollLeft()>tg_left[i]-180)
				max_n=i;
		}
		$(".fw-normal").html(tg_name[max_n]);
}
