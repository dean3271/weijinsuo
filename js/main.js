$(function () {

  function resize() {
    xScroll();

    //1.获取屏幕的宽度
    var windowWidth = $(window).width();
    //console.log(windowWidth);

    //2.判断屏幕属于大还是小的
    var isWindowW = windowWidth < 768;
    //3.遍历每个图片的盒子，根据屏幕大小，为界面上的每一张轮播图设置背景，
    //通过background-image属性添加到css样式中
    $("#main_ad > .carousel-inner > .item").each(function (i, item) {

      /* var smImg = $(item).data("img-sm");
      var lgImg = $(item).data("img-lg");
      if (isWindowW) {
          $(item).css("backgroundImage", "url(" + smImg + ")");
      } else {
          $(item).css("backgroundImage", "url(" + lgImg + ")");
      } */
      var $item = $(item);
      var imgSrc = $item.data(isWindowW ? "img-sm" : "img-lg");
      $item.css("backgroundImage", "url(" + imgSrc + ")");

      /* 上面的做法到windowWidth < 768 时，虽然切换到小图，但是不会
      缩放,我们用动态添加img的方式来覆盖上面的效果 */
      $item.html("<img src='" + imgSrc + "' alt='' />");
      if (!isWindowW) {
        $item.html("");
      }
    })
  }
  resize();
  $(window).on("resize", resize);

  //产品推荐模块--提示符
  $('[data-toggle="tooltip"]').tooltip();

  //产品推荐横向滚动条
  /* 思路：1.动态获取ul的长度
          2.用warp包裹，在移动端一旦超出视口，
            warp设置overflow-x = scroll横向滚动条
  */
  function xScroll() {
    var $ulEle = $("#products .warp ul");
/* ul本身有20的边距，另外它外面的容器container有左右各
    15的内边距，所以我们初始至少设置成50 */
    var $ulWidth = 50; 
    $ulEle.children().each(function (i,ele) {  
      $ulWidth += $(ele).width();
    });
    //console.log($(window).width())
    //console.log($ulWidth)
    //console.log($ulWidth > $(window).width());
    //判断当屏幕的宽度小于$ulWidth的时候，才能给ul设置宽度值，不然ul宽是固定值，有bug
    //反之我们不能给ul设置宽度，而且横向滚动条也是该条件下才添加css属性
    if($ulWidth > $(window).width()){
      $ulEle.css("width",$ulWidth);
      $ulEle.parent().css("overflow-x","scroll");
    }else {
      $ulEle.css("width","");
    }
  }

  /* 新闻版块切换
      方法：标签内自定义属性，值就是4个标题
      给a 绑定事件
  */
var $title = $(".news-title");
$("#news .nav-pills li a").on("click",function () {  
  var $this = $(this);
  var title = $this.data("title");
  $title.text(title);
});

/* 轮播图移动端滑动效果 */
//1.手指触摸开始时，得到触摸点的坐标
//2.移动时，得到实时x轴的坐标
//3.用2-1得到X方向移动移动了多少，正值则向右滑动，反之向左
//   规定只有移动距离的绝对值大于50px时，判断滑动成功
var startX;
var endX;
var moveX
//用carousel类绑定事件，让页面上其他相同功能的版块共享此方法
$(".carousel").on("touchstart",function (event) {  
    //console.log(event);
    //注意原生JS的方法没有originalEvent属性
    //event.touches[0].clientX; 原生JS方法
    startX = event.originalEvent.touches[0].clientX;
})
$("#main_ad").on("touchmove",function (event) {  
  endX = event.originalEvent.touches[0].clientX;
})
$("#main_ad").on("touchend",function (event) { 
  // 得到差值
  moveX = endX-startX;//Math.abs();
  if(moveX > 50){
    $(this).carousel('prev');
  }else if (moveX < -50) {
    $(this).carousel('next');

  }
})


});
