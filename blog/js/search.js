$(function () {

    $(".search-input").keyup(function(event){
        var val=$(".search-input").val();

        if (event.keyCode === 13){
            if(val!='' || val != undefined){
                window.location.href='/search/'+val;
            }else {
                alert('请输入搜索关键词');
            }
        }
    });

    $("#submit-btn").on('click',function () {
        var val=$(".search-input").val();
        if(val!='' || val != undefined){
            window.location.href='/search/'+val;
        }else {
            alert('请输入搜索关键词');
        }
        // window.location.href='/search/'+val;

   }) ;




});