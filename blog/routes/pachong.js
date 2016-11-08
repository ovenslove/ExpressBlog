var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var cheerio = require('cheerio')


router.get('/pachong', function(req, res, next) {
    var url = "http://qianduan.guru/";
    fetch(url)
        .then(function (res) {
            return res.text();
        }).then(function (body) {
        var $ = cheerio.load(body);
        /*    res.send(body);
         return;*/
        var postData = $(".post-preview");
        var datas = [];
        for (var i=0 ; i< $(".post-preview").length ; i++) {
            var title = $(".post-preview").eq(i).find('h2.post-title').text();
            var blogUrl = url + $(".post-preview").eq(i).find('a').attr('href');
            var imgUrl= $(".post-preview").eq(i).find('div.post-header-img').css('background-image');
            imgUrl=imgUrl.substr(5,imgUrl.length-7)
            var author=$(".post-preview").eq(i).find('span.post-author').text() || '前端外刊评论';
            var intr=$(".post-preview").eq(i).find('div.post-content-preview').text();
            var data = {
                title: title,
                blogUrl:blogUrl,
                imgUrl:imgUrl,
                postStatus:true,
                lockStatus:false,
                viewCount:0,
                priseCount:0,
                mark:'',
                content:'',
                author:author,
                intr:intr,
                addTime:new Date()

            }
            datas.push(data);

        }
        res.json(datas);

    });
});

module.exports = router;