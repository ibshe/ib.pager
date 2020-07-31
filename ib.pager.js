(function($){
	ibPager = {
		initAble : true,
		callBack:"",
		selector:null,
		initRender : function(selector){
			var dom = "<div class='pageFirst' style='visibility:hidden'>首页</div>"+
	        "<div class='pageUp' style='visibility:hidden'>« 上一页</div>"+
	       	"<div ><ul class='pageUl'></ul></div>"+
	        "<div class='pageDown'  style='visibility:hidden'>下一页 »</div>"+
	        "<div class='pageLast' style='visibility:hidden'>末页</div>";
			$(selector).html(dom);
			ibPager.selector=selector;
		},	
		init : function(curPage,pageCount,func,selector){
			if($(selector).children().length==0){
				ibPager.initRender(selector);
			}
			ibPager.reload(curPage,pageCount,func,"",$(selector));
		},
		reload : function(curPage,totalPage,callback,tag,selector){
			if(callback!=""){
				ibPager.callBack=callback;
			}	
			if(totalPage>=5){
				switch(curPage){
					case 1:
						ibPager.page_render(1,5,1,selector);
					break;
					case 2:
						ibPager.page_render(1,5,2,selector);
					break;
					case 3:
						ibPager.page_render(1,5,3,selector);
					break;
					case totalPage-2:
						ibPager.page_render(totalPage-4,totalPage,3,selector);
					break;
					case totalPage-1:
						ibPager.page_render(totalPage-4,totalPage,4,selector);
					break;
					case totalPage:
						ibPager.page_render(totalPage-4,totalPage,5,selector);				
					break;
					default:
						ibPager.page_render(curPage-2,curPage+2,3,selector);
					break;
				}
			}else{
				ibPager.page_render(1,totalPage,curPage,selector);
			}
			if(tag=="1"){
				var fn = eval(ibPager.callBack);				
				new fn(curPage,totalPage,selector);
			}
		},
		page_render : function(page,count,curPage,selector){
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
					selector.find(".pageUp").css('visibility', 'hidden');
					selector.find(".pageFirst").css('visibility', 'hidden');					
					selector.find(".pageDown").css('visibility', 'hidden');
					selector.find(".pageLast").css('visibility', 'hidden');
				}else{
				if(curPage<=1){
					selector.find(".pageUp").css('visibility', 'hidden');
					selector.find(".pageFirst").css('visibility', 'hidden');					
					selector.find(".pageDown").css('visibility', 'visible');
					selector.find(".pageLast").css('visibility', 'visible');
				}else if(curPage>=pageSize){
					selector.find(".pageUp").css('visibility', 'visible');
					selector.find(".pageDown").css('visibility', 'hidden');
					selector.find(".pageFirst").css('visibility', 'visible');
					selector.find(".pageLast").css('visibility', 'hidden');
				}else{
					selector.find(".pageUp").css('visibility', 'visible');
					selector.find(".pageDown").css('visibility', 'visible');
					selector.find(".pageFirst").css('visibility', 'visible');
					selector.find(".pageLast").css('visibility', 'visible');
				}
			 }
			}
			for(var i=page; i<=tatal1; i++){
				ul_html += "<li style='border:1px solid #999;'>"+i+"</li>";
			}
			/*$(selector+" ul").html(ul_html);
			$(selector+" ul li").eq(curPage-1).addClass("on");*/

			selector.find(" ul").html(ul_html);
			selector.find(" ul li").eq(curPage-1).addClass("on");
		}
	}
	
	$(document).on("click",".ibPager_ li",function(){
		var pageNum = parseInt($(this).html());	
		ibPager.reload(pageNum,pageCount,"","1",$("#"+$(this).parent().parent().parent().attr("id")));
	});
	$(document).on("click",".ibPager_ .pageUp",function(){
		var pageNum = parseInt($(this).parent().find("li.on").html());
		ibPager.reload(pageNum-1,pageCount,"","1",$("#"+$(this).parent().attr("id")));	
	});
	$(document).on("click",".ibPager_ .pageDown",function(){
		var pageNum = parseInt($(this).parent().find("li.on").html());
		ibPager.reload(pageNum+1,pageCount,"","1",$("#"+$(this).parent().attr("id")));	
	});
	$(document).on("click",".ibPager_ .pageFirst",function(){
		ibPager.reload(1,pageCount,"","1",$("#"+$(this).parent().attr("id")));	
	});
	$(document).on("click",".ibPager_ .pageLast",function(){
		ibPager.reload(pageCount,pageCount,"","1",$("#"+$(this).parent().attr("id")));	
	});
	//ibPager.initRender();
})(jQuery);
