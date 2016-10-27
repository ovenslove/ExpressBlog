$(".side-bar-close-btn ").on('click',function () {
   $(".side-bar-box").animate({marginLeft:'-150px'},200);
   $(".side-bar-ico-box").animate({width:'50px'},200);
});
$(".side-bar-open-btn ").on('click',function () {
    $(".side-bar-box").animate({marginLeft:'0px'},200);
    $(".side-bar-ico-box").animate({width:'0px'},200);
});

$(function(){
    init();

});

function init(){
    getOneWord();
}
function getOneWord(){
    $.get('/home/oneWord',function(data){
        if(data.status == 1){
            $("#OneWord").html(data.message);
        }
    });
}