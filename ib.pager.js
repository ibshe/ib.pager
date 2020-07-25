(function($){
	ibPager = {
		initAble : true,
		callBack:"",
		initRender : function(callback){
			var dom = "<div class='pageFirst' style='visibility:hidden'>首页</div>"+
	        "<div class='pageUp' style='visibility:hidden'>« 上一页</div>"+
	       	"<div class='pageList'><ul class='pageUl'></ul></div>"+
	        "<div class='pageDown'  style='visibility:hidden'>下一页 »</div>"+
	        "<div class='pageLast' style='visibility:hidden'>末页</div>";
			$("#ibPager").html(dom);			
			ibPager.initAble=false;
		},	
		init : function(curPage,pageCount,func){
			ibPager.reload(curPage,pageCount,func);
		},
		reload : function(curPage,totalPage,callback,tag){
			if(callback!=""){
				ibPager.callBack=callback;
			}			
			if(tag=="1"){
				var fn = eval(ibPager.callBack);				
				new fn(curPage,totalPage);
			}
			if(totalPage>=5){
				switch(curPage){
					case 1:
						ibPager.page_render(1,5,1);
					break;
					case 2:
						ibPager.page_render(1,5,2);
					break;
					case 3:
						ibPager.page_render(1,5,3);
					break;
					case totalPage-2:
						ibPager.page_render(totalPage-4,totalPage,3);
					break;
					case totalPage-1:
						ibPager.page_render(totalPage-4,totalPage,4);
					break;
					case totalPage:
						ibPager.page_render(totalPage-4,totalPage,5);				
					break;
					default:
						ibPager.page_render(curPage-2,curPage+2,3);
					break;
				}
			}else{
				ibPager.page_render(1,totalPage,curPage);
			}
		},
		page_render : function(page,count,curPage){
			var ul_html = "";
			var tatal1 ;
			var pageSize = count-page+1;
			if(count>5){
				tatal1=page+4;
			}else{
				tatal1=count;
			}
			if(curPage>pageSize){
				alert("页码过大");
				return;
			}
			if(curPage<1){
				alert("页码过小");
				return;
			}
			if(page-1>count){
				alert("页码不正确");
				return;
			}else{				
				if(count==1){
					$(".pageUp").css('visibility', 'hidden');
					$(".pageFirst").css('visibility', 'hidden');					
					$(".pageDown").css('visibility', 'hidden');
					$(".pageLast").css('visibility', 'hidden');
				}else{
				if(curPage<=1){
					$(".pageUp").css('visibility', 'hidden');
					$(".pageFirst").css('visibility', 'hidden');					
					$(".pageDown").css('visibility', 'visible');
					$(".pageLast").css('visibility', 'visible');
				}else if(curPage>=pageSize){
					$(".pageUp").css('visibility', 'visible');
					$(".pageDown").css('visibility', 'hidden');
					$(".pageFirst").css('visibility', 'visible');
					$(".pageLast").css('visibility', 'hidden');
				}else{
					$(".pageUp").css('visibility', 'visible');
					$(".pageDown").css('visibility', 'visible');
					$(".pageFirst").css('visibility', 'visible');
					$(".pageLast").css('visibility', 'visible');
				}
			 }
			}
			for(var i=page; i<=tatal1; i++){
				ul_html += "<li>"+i+"</li>";
			}
			$("#ibPager ul").html(ul_html);
			$("#ibPager ul li").eq(curPage-1).addClass("on");
		}
	}
	
	$(document).on("click","#ibPager li",function(){
		var pageNum = parseInt($(this).html());	
		ibPager.reload(pageNum,pageCount,"","1");
	});
	$(document).on("click","#ibPager .pageUp",function(){
		var pageNum = parseInt($("#ibPager li.on").html());
		ibPager.reload(pageNum-1,pageCount,"","1");	
	});
	$(document).on("click","#ibPager .pageDown",function(){
		var pageNum = parseInt($("#ibPager li.on").html());
		ibPager.reload(pageNum+1,pageCount,"","1");	
	});
	$(document).on("click","#ibPager .pageFirst",function(){
		ibPager.reload(1,pageCount,"","1");	
	});
	$(document).on("click","#ibPager .pageLast",function(){
		ibPager.reload(pageCount,pageCount,"","1");	
	});
	ibPager.initRender();
})(jQuery);
