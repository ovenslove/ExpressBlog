/*回到顶部*/
$(".back2top").on('click',function () {
    alert("11");
});
$(function () {
    $("body").scrollTop(0);
});

$("body").on('mousewheel', function(event) {
    var _top=$("body").scrollTop();
    if(_top>1000){
        $(".side-box").slideDown(200);
    }else {
        $(".side-box").slideUp(200);
    }
    if(_top>2000){
        $(".back2top").slideDown(200);
    }else {
        $(".back2top").slideUp(200);
    }
    // console.log();
});
