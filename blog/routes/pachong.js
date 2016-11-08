var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var cheerio = require('cheerio')
var mongoose = require('mongoose');

//创建一个数据库连接
var db = mongoose.createConnection('localhost', 'blog');
/*引入blogsSchema配置文件*/
var blogsSchemaConf = require('../schema/blogsSchema.js');
/*生成一个schema*/
var blogSchema = new mongoose.Schema(blogsSchemaConf);
/*根据schema生成模型*/
var blogModel = db.model('blog', blogSchema);

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
                blogType:1,
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
        var tempNum=0;
        for (var i in datas){
            var blogEntity = new blogModel(datas[i]);
            if(blogEntity.save()){
                tempNum++;
            }
        }
        if (tempNum == 10) {
            res.json({
                status:1,
                message:'ok'
            });
        } else {
            res.json({
                status:0,
                message:'error'
            });
        }
        // res.json(datas);

    });
});

module.exports = router;