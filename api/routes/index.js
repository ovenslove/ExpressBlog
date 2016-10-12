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
  'list':[
    /*{'title':'我是第一个','intr':'这里是我的简介','info':'我就是正文啊。看我看我我就是正文啊。看我看我我就是正文啊。看我看我我就是正文啊。看我看我我就是正文啊。看我看我我就是正文啊。看我看我我就是正文啊。看我看我'},
    {'title':'我是第二个','intr':'这里是我的简介这里是我的简介这里是我的简介','info':'我就是正文啊。看我看我我就是正文啊。看我看我我就是正文啊。看我看我我就是正文啊。看我看我我就是正文啊。看我看我我就是正文啊。看我看我'},
    {'title':'我是第一个','intr':'这里是我的简介','info':'我就是正文啊。看我看我'},
    {'title':'我是第二个我是第二个我是第二个','intr':'这里是我的简介','info':'我就是正文啊。看我看我'},
    {'title':'我是第一个','intr':'这里是我的简介','info':'我就是正文啊。看我看我'},
    {'title':'我是第二个我是第二个我是第二个我是第二个','intr':'这里是我的简介','info':'我就是正文啊。看我看我'},
    {'title':'我是第一个','intr':'这里是我的简介','info':'我就是正文啊。看我看我'},
    {'title':'我是第二个我是第二个我是第二个','intr':'这里是我的简介','info':'我就是正文啊。看我看我'},
    {'title':'我是第一个','intr':'这里是我的简介','info':'我就是正文啊。看我看我'},
    {'title':'我是第二个我是第二个','intr':'这里是我的简介','info':'我就是正文啊。看我看我'},
    {'title':'我是第二个','intr':'这里是我的简介','info':'我就是正文啊。看我看我'},
    {'title':'我是第二个我是第二个我是第二个我是第二个我是第二个我是第二个','intr':'这里是我的简介','info':'我就是正文啊。看我看我'},
    {'title':'我是第三个','intr':'这里是我的简介','info':'我就是正文啊。看我看我'}*/
  ]
}

router.get('/', function(req, res, next) {
    var blogModel = db.model('blog',blogSchema);
     blogModel.find(function (err, blogs) {
        data.list.push(blogs);
     });
    res.render('index', data);
});

module.exports = router;
