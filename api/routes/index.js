var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');

var db =mongoose.createConnection('localhost','blog'); //创建一个数据库连接
var blogSchema  = new mongoose.Schema({
    title:String,   //定义一个属性name，类型为String
    author:String,   //定义一个属性name，类型为String
    intr:String,    //简介
    info:String     //摘要
});

/* GET home page. */
var data={
  'title':'API首页',
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
