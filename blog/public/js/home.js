$(".side-bar-close-btn ").on('click',function () {
   $(".side-bar-box").animate({marginLeft:'-150px'},200);
   $(".side-bar-ico-box").animate({width:'50px'},200);
});
$(".side-bar-open-btn ").on('click',function () {
    $(".side-bar-box").animate({marginLeft:'0px'},200);
    $(".side-bar-ico-box").animate({width:'0px'},200);
});