$(function () {
/*浏览次数统计*/
    var _id=$("input[name=_id]").val();
    if(sessionStorage.getItem(_id) !=1){
        $.get('/home/blogAction/viewCount/'+_id,function (data) {

        })
        sessionStorage.setItem(_id,"1");
    }else {

    }

    $(".priseCount-btn").on('click',function () {
        $.get('/home/blogAction/priceCount/'+_id,function (data) {

        })
    });

});