var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

var db =mongoose.createConnection('localhost','blog'); //创建一个数据库连接
var blogSchema  = new mongoose.Schema({
    blogId:Number,  //文章ID
    title:String,   //定义一个属性name，类型为String
    imgUrl:String,  //列表预览照片
    author:String,   //定义一个属性name，类型为String
    intr:String,    //简介
    addTime:Date,       //生成时间
    updateTime:Date,    //更新时间
    mark:Array,         //标签组
    content:String,     //正文
});

/* GET home page. */
var data={
  'title':'API首页',
  'webSiteName':'ExpressBlog',
  'list':[]
}

router.get('/', function(req, res, next) {
    var blogModel = db.model('blog',blogSchema);
     blogModel.find(function (err, blogs) {
        data.list=blogs;
         // res.send(data);
         res.render('index', data);
     });


});

module.exports = router;
