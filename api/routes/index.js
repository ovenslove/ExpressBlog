var express = require('express');
var router = express.Router();

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
  res.render('index', data);
});

module.exports = router;
