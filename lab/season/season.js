/*
author:linwest
mail:linwset@vip.qq.com
*/
h=$(window).height();
w=$(window).width();
var pic_h=438;
var pic_w=350;
var snow_n;
var snow_x=new Array();
var snow_y=new Array();
var busy=0;
if(navigator.userAgent.indexOf("MSIE")>0)
	alert("作者比较懒，只写了webkit内核的代码，所以请用webkit内核浏览器查看吧");
$(document).ready(function(){
	$('.season').css('-webkit-transform','translateX('+(w-pic_w)/2+'px)');
	initialise();	
	$('.leaf').css('top',h/8+'px');
	
	$('.sp1').css('display','inline');
	$('.sp2').css('display','inline');
	$('.su1').css('display','inline');
	$('.su2').css('display','inline');
	$('.au1').css('display','inline');
	$('.au2').css('display','inline');
	$('.wi1').css('display','inline');
	$('.wi2').css('display','inline');
	$('#plane').css('display','inline');
	snow_n=w/10;
	$('.cloud1').css('right',w/4-148+'px');
	for(i=0;i<snow_n;i++){
		snow_x[i]=Math.random()*2*w;
		snow_y[i]=Math.random()*h-1.5*h;
		$('body').append('<div id="snow'+i+'" class="snow" style="-webkit-transform:translateX('+snow_x[i]+'px)\
				 translateY('+snow_y[i]+'px) scale('+Math.sqrt(Math.random())+');"></div>');
	}
	step=0;
	$('#tip').css('display','inline');
	setTimeout("$('#tip').css('top','-50px')",1000);
	$(document).mousewheel(function(event, delta){
		if(!busy){
			busy=1;
			setTimeout("busy=0",300);
		step+=delta;
		if(step<0){
			step+=13;
			$('.spbg').css('z-index','10');
			$('.cloud1').css('z-index','11');
			bw=2*(w+h)/4;
			$('.wibg').css('-webkit-transition-property','none');
			$('.winter').css('-webkit-transition-property','none');
			$('#plane').css('display','none');
			$('.wi1 .winter').css('left',w*1.5+(pic_h-pic_w)/2-bw+'px');
			$('.wi1').css('left',bw-w-h/2+'px')
			$('.wi2 .winter').css('right',w*1.5+h-(pic_w+pic_h)/2-bw+'px');
			$('.wi2').css('right',bw-w-h/2+1+'px');
		}else if(step>12){
			step-=13;
			$('.wi1').css('left',-w-h/2+'px');
			$('.wi1 .winter').css('left',w*1.5+(pic_h-pic_w)/2+'px');
			$('.wi2').css('-webkit-transform','skewX(45deg)');
			$('.wi2').css('right',-w-h/2+'px');
			$('.wi2 .winter').css('right',w*1.5+h-(pic_w+pic_h)/2+'px');
			$('.spbg').css('z-index','0');
			$('.cloud1').css('z-index','0');
			$('.subg').css('-webkit-transition-property','all');
			$('.summer').css('-webkit-transition-property','all');	
			$('.aubg').css('-webkit-transition-property','all');
			$('.autumn').css('-webkit-transition-property','all');
			$('#plane').css('display','inline');
			for(i=0;i<snow_n;i++){
				$('#snow'+i).css('opacity',1)
					.css('-webkit-transform','translateX('+snow_x[i]+'px) translateY('+snow_y[i]+'px) scale('+Math.sqrt(Math.random())+')');
			}
		}
		
		if(step<4){
			sui=step;
			bw=sui*w/3;
			//背景运动
			$('.su1 .summer').css('left',w-bw+'px');
			$('.su1').css('left',(bw-w)+'px');
			$('.su2 .summer').css('right',w*2-pic_w-bw+'px');
			$('.su2').css('right',bw-w+'px');
			
			//云运动
			$('.cloud1').css('right',(Math.sqrt(sui+1)*w/4-148)+'px');
			
			//纸飞机运动
			rx=68+sui*5;
			ry=170+sui;
			ty=-sui*w*1300/1366;
			tz=-300-Math.sqrt(sui/2)*h/2;
			$('#plane').css('-webkit-transform','scale(0.3, 0.3) rotateX('+rx+'deg) rotateY('+ry+'deg) \
							rotateZ(-92deg) translateX(-500px) translateY('+ty+'px) translateZ('+tz+'px)');
			if(sui==3){
				$('.au2').css('-webkit-transform','translateY(-'+h+'px)');
				$('.au2 .autumn').css('-webkit-transform','translateX('+(w-pic_w)/2+'px) translateY('+(h*2-pic_h)+'px)');
				$('.spbg').css('-webkit-transition-property','none');
				$('.spring').css('-webkit-transition-property','none');
				$('.sp1').css('left',-w/2+'px');
				$('.sp1 .spring').css('left',w+h/2+(-pic_h-pic_w)/2+'px');
				$('.sp2').css('right',-w/2+1+'px');
				$('.sp2 .spring').css('right',w-h/2-1+(+pic_h-pic_w)/2+'px');
				$('.spbg').css('z-index','0');
				$('.cloud1').css('z-index','0');
				$('.leaf').css('display','inline');
				$('.spbg h2').css('margin','50px 0 0 150%');
				$('.subg h2').css('margin','50px 0 0 0')
					.css('text-indent','0');
				$('.leaf').css('top',h/8+'px')
					.css('right','-30px')
					.css('-webkit-transform','');

			}else if(sui==1){
				$('.subg h2').css('margin','50px 0 0 60%');
				$('.spbg h2').css('margin','50px 0 0 150%');
				$('.spbg').css('-webkit-transition-property','left,right');
				$('.spring').css('-webkit-transition-property','all');
			}else if(sui==0){
				$('.spbg h2').css('margin','50px 0 0 0');
				$('.subg h2').css('margin','50px 0 0 100%')
					.css('text-indent','-64px');
			}else {
				$('.subg h2').css('margin','50px 0 0 30%');
			}
		}else if(step<6){
			aui=step-4;
			if(aui==0){				
				//纸飞机运动
				$('#plane').css('-webkit-transform','scale(0.3, 0.3) rotateX(88deg) rotateY(174deg) \
								rotateZ(-92deg) translateX(-500px) translateY('+(-4*w*1300/1366)+'px) translateZ('+(-300-0.707*h)+'px)');	
				$('.subg').css('-webkit-transition-property','all');
				$('.summer').css('-webkit-transition-property','all');
				$('.wibg').css('-webkit-transition-property','all');
				$('.winter').css('-webkit-transition-property','all');			
				$('.snow').css('-webkit-transition-property','all');	
			}else if(aui==1){
				$('.wibg h2').css('margin','30px 100% 0 0')
					.css('text-indent','-64px');
				$('.subg h2').css('margin','50px 0 0 0')
					.css('text-indent','0');					
				$('.aubg h2').css('margin','40% 100% 0 0')
					.css('text-indent','-64px');
				bw=w;
				$('.subg').css('-webkit-transition-property','none');
				$('.summer').css('-webkit-transition-property','none');
				$('.cloud1').css('z-index','0');
				
				//背景运动
				$('.su1 .summer').css('left',w-bw+'px');
				$('.su1').css('left',(bw-w)+'px');
				$('.su2 .summer').css('right',w*2-pic_w-bw+'px');
				$('.su2').css('right',bw-w+'px');
				
				//云运动
				$('.cloud1').css('right',(Math.sqrt(4)*w/4-148)+'px');	
				
				//纸飞机运动
				$('#plane').css('-webkit-transform','scale(0.3, 0.3) rotateX(88deg) rotateY(174deg) \
								rotateZ(-92deg) translateX(-500px) translateY('+(-4*w*1300/1366)+'px) translateZ('+(-300-0.707*h)+'px)');	
			}
			$('#plane').css('display','inline');
			bh=(aui-1)*h/2;
			$('.leaf').css('top',(aui+1)*h/5+h/8+'px')
				.css('right',Math.log(aui+1)*w/3+w/4+'px')
				.css('-webkit-transform','rotateY('+(aui+1)*180+'deg) rotateZ('+(aui+1)*30+'deg) rotateX('+(aui+1)*60+'deg)');
			if(aui<2){
				$('.au2').css('-webkit-transform','translateY('+bh+'px)');
				$('.au2 .autumn').css('-webkit-transform','translateX('+(w-pic_w)/2+'px) translateY('+(h-pic_h-bh)+'px)');
			}
			bh-=h/2;
			$('.au1').css('-webkit-transform','translateY('+bh+'px)');
			$('.au1 .autumn').css('-webkit-transform','translateX('+(w-pic_w)/2+'px) translateY('+(h-pic_h-bh)+'px)');
		}else if(step<10){
			wii=step-6;			
			for(i=0;i<snow_n;i++){
				$('#snow'+i).css('opacity',Math.sqrt(1-wii*0.2))
					.css('-webkit-transform','translateX('+(snow_x[i]-Math.abs(Math.sin(i))*wii*w*.25)+'px) \
						translateY('+(snow_y[i]+Math.abs(Math.sqrt(i))*wii*h/20)+'px) scale('+Math.sqrt(Math.random())+')');
			}
			if(wii<3){
				$('.wibg h2').css('margin','30px '+3*(3-wii)+'0% 0 0');
				if(wii<2){
					$('.leaf').css('display','inline');
					$('.leaf').css('top',(wii+3)*h/5+h/8+'px')
						.css('right',Math.log(wii+3)*w/3+w/4+'px')
						.css('-webkit-transform','rotateY('+(wii+4)*180+'deg) rotateZ('+(wii+4)*30+'deg) rotateX('+(wii+4)*60+'deg)');
				}
				if(wii==0){
					$('.aubg h2').css('margin','40% 0 0 0')
						.css('text-indent','0');
					$('.au1').css('-webkit-transform','translateY(0px)');
					$('.au1 .autumn').css('-webkit-transform','translateX('+(w-pic_w)/2+'px) translateY('+(h-pic_h)+'px)');
					$('.aubg').css('-webkit-transition-property','all');
					$('.autumn').css('-webkit-transition-property','all');
				}else if(wii==1){
					$('.snow').css('box-shadow','0 0 5px 5px #FFF');
				}else if(wii==2){
					$('.leaf').css('display','none');
					$('.spbg').css('z-index','10');
					$('#cloud1').css('z-index','10');
					$('.spbg').css('-webkit-transition-property','none');
					$('.spring').css('-webkit-transition-property','none');
					$('.sp1 .spring').css('left',w*1.5+h+(-pic_h-pic_w)/2+'px');
					$('.sp1').css('left',-w-h/2+'px');
					$('.sp2 .spring').css('right',w*1.5-1+(+pic_h-pic_w)/2+'px');
					$('.sp2').css('right',-w-h/2+1+'px');
					$('.snow').css('box-shadow','0 0 5px 5px #76ACFF');
				}
				bw=wii*(w+h)/4;
				$('#plane').css('display','none');
				$('.wi1 .winter').css('left',w*1.5+(pic_h-pic_w)/2-bw+'px');
				$('.wi1').css('left',bw-w-h/2+'px')
				$('.wi2 .winter').css('right',w*1.5+h-(pic_w+pic_h)/2-bw+'px');
				$('.wi2').css('right',bw-w-h/2+1+'px');
			}else if(wii==3){
				$('.wibg h2').css('margin','30px 0 0 0')
					.css('text-indent','64px');
				$('.aubg h2').css('margin','40% 0 0 0')
					.css('text-indent','0');
				$('.spbg').css('-webkit-transition-property','left,right');
				$('.spring').css('-webkit-transition-property','all');
				$('.leaf').css('display','none');
				$('.snow').css('box-shadow','0 0 5px 5px #76ACFF');
			}
		}else if(step<13){
			spi=step-10;
			$('.leaf').css('display','none');
			if(spi==0){
				$('.snow').css('-webkit-transition-property','all');
				for(i=0;i<snow_n;i++){
					$('#snow'+i).css('opacity',0)
						.css('-webkit-transform','translateX('+(snow_x[i]-Math.abs(Math.sin(i))*w)+'px) \
							translateY('+(snow_y[i]+Math.abs(Math.sqrt(i))*h/5)+'px) scale('+Math.sqrt(Math.random())+')');
				}
				$('.aubg').css('-webkit-transition-property','none');
				$('.autumn').css('-webkit-transition-property','none');
				$('.aubg').css('-webkit-transform','translateY(0px)');
				$('.autumn').css('-webkit-transform','translateX('+(w-pic_w)/2+'px) translateY('+(h-pic_h)+'px)');
				$('.wibg').css('-webkit-transition-property','all');
				$('.winter').css('-webkit-transition-property','all');
			}else if(spi==2){
				$('.wibg h2').css('margin','30px 0 0 0')
					.css('text-indent','64px');
				$('.snow').css('-webkit-transition-property','none');
				for(i=0;i<snow_n;i++){
					$('#snow'+i).css('opacity',0)
						.css('-webkit-transform','translateX('+(snow_x[i]-Math.abs(Math.sin(i))*w)+'px) \
							translateY('+(snow_y[i]+Math.abs(Math.sqrt(i))*h/5)+'px) scale('+Math.sqrt(Math.random())+')');
				}
				$('#plane').css('-webkit-transform','-webkit-transform: scale(0.3, 0.3) rotateX(68deg) rotateY(170deg) rotateZ(-92deg) translateZ(-300px)'); 
				$('.cloud1').css('right',w/4-148+'px');
				//夏初始化
				$('.su1 .summer').css('top',h-pic_h+'px');
				$('.su1').css('left',-w+'px');
				$('.su1 .summer').css('left',w+'px');
				$('.su2').css('right',-w+'px');
				$('.su2 .summer').css('right',w*2-pic_w+'px');
					
				//秋初始化	
				$('.aubg').css('-webkit-transform','translateY(-'+h+'px)');
				$('.autumn').css('-webkit-transform','translateX('+(w-pic_w)/2+'px) translateY('+(h*2-pic_h)+'px)');
				$('.au2 .autumn').css('left',-w/2+'px');
				$('.cloud1').css('right','-148px');
				$('.wibg').css('-webkit-transition-property','none');
				$('.winter').css('-webkit-transition-property','none');
			}
			bw=spi*(w+h)/4;
			//背景运动
			$('.sp1 .spring').css('left',w*1.5+h+(-pic_h-pic_w)/2-bw+'px');
			$('.sp1').css('left',bw-w-h/2+'px');
			$('.sp2 .spring').css('right',w*1.5-1+(+pic_h-pic_w)/2-bw+'px');
			$('.sp2').css('right',bw-w-h/2+1+'px');
		}
		}
	});
});
function initialise(){
	//春初始化
	$('.spring').css('-webkit-transform','skewX(45deg)');
	$('.spbg h1').css('-webkit-transform','skewX(45deg)');
	$('.spbg').css('-webkit-transform',' skewX(-45deg)');
	$('.sp1').css('left',-w/2+'px');
	$('.sp1 .spring').css('left',w+h/2+(-pic_h-pic_w)/2+'px');
	$('.sp2').css('right',-w/2+1+'px');
	$('.sp2 .spring').css('right',w-h/2-1+(+pic_h-pic_w)/2+'px');
	$('.spbg h2').css('margin','50px 0 0 0');
	
	//夏初始化
	$('.su1 .summer').css('top',h-pic_h+'px');
	$('.su1').css('left',-w+'px');
	$('.su1 .summer').css('left',w+'px');
	$('.su2').css('right',-w+'px');
	$('.su2 .summer').css('right',w*2-pic_w+'px');
		
	//秋初始化	
	$('.aubg').css('-webkit-transform','translateY(-'+h+'px)');
	$('.autumn').css('-webkit-transform','translateX('+(w-pic_w)/2+'px) translateY('+(h*2-pic_h)+'px)');
	$('.au2 .autumn').css('left',-w/2+'px');
	
	//冬初始化
	$('.wibg h1').css('-webkit-transform','skewX(-45deg)');
	$('.winter').css('-webkit-transform','skewX(-45deg)');
	$('.wi1').css('-webkit-transform','skewX(45deg)');
	$('.wi1').css('left',-w-h/2+'px');
	$('.wi1 .winter').css('left',w*1.5+(pic_h-pic_w)/2+'px');
	$('.wi2').css('-webkit-transform','skewX(45deg)');
	$('.wi2').css('right',-w-h/2+'px');
	$('.wi2 .winter').css('right',w*1.5+h-(pic_w+pic_h)/2+'px');
}