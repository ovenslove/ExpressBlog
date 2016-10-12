var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
var data={
  'title':'API首页',
  'list':[
    {'title':'我是第一个','intr':'这里是我的简介','info':'我就是正文啊。看我看我我就是正文啊。看我看我我就是正文啊。看我看我我就是正文啊。看我看我我就是正文啊。看我看我我就是正文啊。看我看我我就是正文啊。看我看我'},
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
    {'title':'我是第三个','intr':'这里是我的简介','info':'我就是正文啊。看我看我'}
  ]
}
router.get('/', function(req, res, next) {
  var db = mongoose.createConnection('localhost','blog'); //创建一个数据库连接
  db.on('error',console.error.bind(console,'连接错误:'));
  db.once('open',function(){
    //一次打开记录
  });
  res.render('index', data);
});

module.exports = router;
