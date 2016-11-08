$(function () {
   $("#submit-btn").on('click',function () {
        var val=$("#search-input").val();
        var postData={
            search:val
        }
        $.post('/search',postData,function (data) {
            console.log(data);
            $.each(data.data,function (key,val) {
               console.log(val);
                var tpls='' +
                    '<div class="ui items sim-blog"> ' +
                    '<div class="item"> ' +
                    '<div class="image image-box"> ' +
                    '<img src="'+val.imgUrl+'"> ' +
                    '</div> ' +
                    '<div class="content">' +
                    '<a href=" /blogs/'+val._id+'" class="header">'+val.title+'</a> ' +
                    '<div class="meta">' +
                    '<span><b>Author:</b>'+val.author+'<b style="margin-left:10px;">Time:</b>'+val.addTime+'</span> ' +
                    '</div> ' +
                    '<div style="height: calc(100% - 85px);" class="description"> ' +
                    '<p>'+val.intr+'</p> ' +
                    '</div>' +
                    ' <div class="extra">' +
                    '<i class="unhide icon"></i>2  <i class="icon thumbs up"></i>0' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div>';
                $(".search-listContainer").append(tpls);

            });

            // $(".search-listContainer").append(tpls);
            /*
            将数据列表显示出来
            * {
             "status": 1,
             "message": "ok",
             "data": [
             {
             "_id": "58177a52c6ae582318273917",
             "blogId": "5804ef79e59d8b2c34a4a357",
             "title": "杀神风爱疯",
             "postStatus": true,
             "author": "我是大帅哥",
             "intr": "我的第一片文章我的第一片文章",
             "content": "<p>我的第一片文章<span style=\"font-size: 1rem;\">我的第一片文章</span><span style=\"font-size: 1rem;\">我的第一片文章</span></p><p>我的第一片文章<span style=\"font-size: 1rem;\">我的第一片文章</span><span style=\"font-size: 1rem;\">我的第一片文章</span></p><p><span style=\"font-size: 1rem;\"><br></span></p><p><span style=\"font-size: 1rem;\"><br></span></p><p>我的第一片文章<span style=\"font-size: 1rem;\">我的第一片文章</span><span style=\"font-size: 1rem;\">我的第一片文章</span></p><p><span style=\"font-size: 1rem;\"><br></span></p><p>我的第一片文章<span style=\"font-size: 1rem;\">我的第一片文章</span></p><p><span style=\"font-size: 1rem;\"><br></span></p><p><span style=\"font-size: 1rem;\"><br></span></p><p>我的第一片文章</p><p><br></p>",
             "viewCount": 1,
             "priseCount": 0,
             "lockStatus": false,
             "imgUrl": "\\images\\blogPreviewImages\\image-1478529532295.png",
             "addTime": "2016-10-31T17:07:30.047Z",
             "__v": 0,
             "updateTime": "2016-11-07T14:38:52.303Z",
             "mark": [
             "别样的风景"
             ]
             }
             ]
             }
            * */
        });
   }) ;
});