$(function () {
    var verifiCodeNum;
    function getNum() {
        var str='';
        var wayarr=['+','-','*','/']
        var rand1=Math.floor((Math.random()*30)+2);
        var rand2=Math.floor((Math.random()*30)+2);
        var randway=wayarr[Math.floor((Math.random()*4))];
        if(randway=='+'){
             str=rand1 +'+'+rand2+'=?';
            verifiCodeNum=rand1+rand2;
        }
        if(randway=='-'){
            if(rand1>=rand2){
                 str=rand1 +'-'+rand2+'=?';
                verifiCodeNum=rand1-rand2;
            }else {
                 str=rand2 +'-'+rand1+'=?';
                verifiCodeNum=rand2-rand1;
            }
        }
        if(randway=='*'){
             str=rand1 +'*'+rand2+'=?';
            verifiCodeNum=rand1*rand2;
        }
        if(randway=='/'){
             str=(rand1*rand2) +'/'+rand2+'=?';
            verifiCodeNum=rand1;
        }
        return str;
    }
    $(".exchangePassword").on('click',function () {
        $(".exchangePassword-box").slideDown(200);
    }) ;
    $("#verifiCode").on('click',function () {
        $("#verifiCode").text(getNum());
    });
   $(".exchangePassword-box .close-btn").on('click',function () {
       $(".exchangePassword-box").slideUp(200);
   }) ;

    $("#userLogoPreview-input").on('blur',function () {
       var val=$(this).val();
        $("#userLogoPreview>img").attr('src',val);
        $("#userlogo-img")[0].onload = function() {
            $("#userLogoPreview").slideDown(200);
        }
    });

});