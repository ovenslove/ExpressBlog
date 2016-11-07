$(function () {
   $("#submit-btn").on('click',function () {
        var val=$("#search-input").val();
        var postData={
            search:val
        }
        $.post('/search',postData,function (data) {
            console.log(data);
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