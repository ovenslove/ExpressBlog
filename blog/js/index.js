/*回到顶部*/
$(".back2top").on('click',function () {
    $('body').animate({ scrollTop: 0 }, 1000);
    setTimeout(function () {
        $(".side-box").slideUp(200);
    },1000);
});
$(function () {
    $("body").scrollTop(0);
    sessionStorage.clear();
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


    var documentHeight=$(document).height();
    var windowHeight=$(window).height();
    var distinctHeight=documentHeight-windowHeight;
    // console.log(distinctHeight);
    if(_top > distinctHeight-100){
        console.log(sessionStorage.getItem('getBlosStatus'));
        if(sessionStorage.getItem('getBlosStatus') == null){
            sessionStorage.setItem('getBlosStatus','lock');
            var curPage=sessionStorage.getItem('blogCurPage')==null?1:sessionStorage.getItem('blogCurPage')+1;
            if(sessionStorage.getItem('blogCurPage')==null){
                var curPage=1;
            }else {
                var curPage=parseInt(sessionStorage.getItem('blogCurPage'))+1;
            }
            console.log("加载");
            $.get('/pages/'+curPage,function (data) {
                if(data.status==1){
                    sessionStorage.setItem('blogCurPage',curPage);
                    if(data.blogs != ''){
                        $.each(data.blogs,function (key, val) {
                            console.log(val);
                            if(val.blogUrl =='' || val.blogUrl==undefined){
                                var link="/blogs/"+val._id;
                            }else {
                                var link=val.blogUrl;
                            }
                            var blogTpls='' +
                                '<div class="ui items sim-blog">'+
                                '<div class="item">'+
                                '<div class="image image-box">'+
                                '<img src="'+val.imgUrl+'">'+
                                '</div>'+
                                '<div class="content">' +
                                '<a href="'+link+'" class="header">'+val.title+'</a>'+
                                '<div class="meta">' +
                                '<span><b>Author:</b> '+val.author+'<b style="margin-left:10px;">Time:</b>'+ new Date(val.addTime).toLocaleDateString() +'</span>'+
                                '</div>'+
                                '<div style="height: calc(100% - 85px);" class="description">'+
                                '<p>'+val.intr+'</p>'+
                                '</div>'+
                                '<div class="extra">' +
                                '<i class="unhide icon"></i>'+val.viewCount+
                                '<i class="icon thumbs up"></i>' +val.priseCount+
                                '<a href="'+link+'" class="header">' +
                                '   <span class="viewMoreBtn">More</span>' +
                                '</a>'+
                                '</div>'+
                                '</div>'+
                                '</div>'+
                                '</div>';
                            $(".main-box").append(blogTpls);
                        })
                        sessionStorage.removeItem('getBlosStatus');

                    }else {
                        var noMoreTpls='<p class="noMoreBlogs">no more blogs...</p>';
                        $(".main-box").append(noMoreTpls);
                    }


                }

            });

        }else {

        }
    }

});
