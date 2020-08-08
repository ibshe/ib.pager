(function($){
	ibPager = {
		initRender : function(selector){
			var dom = "<div class='pageFirst' style='display:none'>首页</div>"+
	        "<div class='pageUp' style='display:none'>« 上一页</div>"+
	       	"<div ><ul class='pageUl'></ul></div>"+
	        "<div class='pageDown'  style='display:none'>下一页 »</div>"+
	        "<div class='pageLast' style='display:none'>末页</div>"+
	        "<div class='pageC_' style='display:none'></div>"+
	        "<div class='callbackFn_' style='display:none'></div>";
			$(selector).html(dom);			
			$(".pageUp").click(function(){
				var pageNum__ = parseInt($(this).parent().find("li.on").html());
				var pageCount__ = $(this).parent().find(".pageC_").html();
				ibPager.reload(pageNum__-1,pageCount__,"","1",$(this).parent());	
			});
			$(".pageDown").click(function(){
				var pageNum__ = parseInt($(this).parent().find("li.on").html());
				var pageCount__ = $(this).parent().find(".pageC_").html();
				ibPager.reload(pageNum__+1,pageCount__,"","1",$(this).parent());	
			});
			$(".pageFirst").click(function(){
				var pageCount__ = $(this).parent().find(".pageC_").html();
				ibPager.reload(1,pageCount__,"","1",$(this).parent());	
			});
			$(".pageLast").click(function(){
				var pageCount__ = $(this).parent().find(".pageC_").html();
				ibPager.reload(pageCount__,pageCount__,"","1",$(this).parent());	
			});
		},	
		init : function(curPage,pageCount_,func,selector){
			if($(selector).children().length==0){
				ibPager.initRender(selector);
			}
			$(selector).find(".pageC_").html(pageCount_);
			$(selector).find(".callbackFn_").html(func);
			ibPager.reload(curPage,pageCount_,func,"",$(selector));
		},
		reload : function(curPage,totalPage,callback,tag,selector){
			console.log("应用超市:"+curPage+"====="+totalPage+"====="+callback+"====="+tag+"====="+selector);
			if(callback!=""&&callback!=null){
				ibPager.callBack=callback;				
			}	
			if(tag=="1"){
				var ca = $(selector).find(".callbackFn_").html();
					if(ca){
						var fn = eval(ca);				
						new fn(curPage,totalPage,selector);
					}
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
			if(curPage>count){
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
				/*if(count==1){
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
				}*/
				if(count==1){
					selector.find(".pageUp").css('display', 'none');
					selector.find(".pageFirst").css('display', 'none');					
					selector.find(".pageDown").css('display', 'none');
					selector.find(".pageLast").css('display', 'none');
				}else{
				if(curPage<=1){
					selector.find(".pageUp").css('display', 'none');
					selector.find(".pageFirst").css('display', 'none');					
					selector.find(".pageDown").css('display', 'block');
					selector.find(".pageLast").css('display', 'block');
				}else if(curPage>=pageSize){
					selector.find(".pageUp").css('display', 'block');
					selector.find(".pageDown").css('display', 'none');
					selector.find(".pageFirst").css('display', 'block');
					selector.find(".pageLast").css('display', 'none');
				}else{
					selector.find(".pageUp").css('display', 'block');
					selector.find(".pageDown").css('display', 'block');
					selector.find(".pageFirst").css('display', 'block');
					selector.find(".pageLast").css('display', 'block');
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
			$(".ibPager_ li").click(function(){
				var pageNum__ = parseInt($(this).html());	
				var pageCount__ = $(this).parent().parent().parent().find(".pageC_").html();
				ibPager.reload(pageNum__,pageCount__,"","1",$(this).parent().parent().parent());
			});
		}
		
	}
	
	
})(jQuery);