# ib.pager
一个独立于table的简单分页组件，解耦table。除了用于表格，还能更加灵活地用于图片、文件等分页，使用简单。你只需要引入资源，一行代码集成。
A simple paging component independent of table, decoupling table. In addition to tables, it is more flexible for pagination of pictures, files, etc., 
and is easy to use. You just need to bring in resources, one line of code integration.

单页面可同时使用多个分页组件，每个组件初始化一次，只须元素id不同即可。例如：

======================================================================================================================================

1、引用：
<div id="ibPager" class="ibPager_"></div>

2、任意位置一行代码初始化：
//请求返回数据处初始化分页组件。参数：当前页码，返回或处理后的总页数，回调函数名称(可用于外部联动此组件), 选择器id(多个分页器时此参数不同)
ibPager.init(1,pageCount,"reloadList","#ibPager");

3、回调函数(点击分页器触发)：
function reloadList(a,b,c){
        alert("回调：当前页："+a+" 总页数："+b+"  触发的元素:"+c.attr("id"));
        //做你想做的事
}

========================================================================================================================================
