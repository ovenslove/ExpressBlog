var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
//创建一个数据库连接
var db =mongoose.createConnection('localhost','blog');
/*引入blogsSchema配置文件*/
var blogsSchemaConf=require('../schema/blogsSchema.js');
/*生成一个schema*/
var blogSchema  = new mongoose.Schema(blogsSchemaConf);

/* GET home page. */
var data={
  'title':'API首页',
  'webSiteName':'ExpressBlog',
  'list':[]
}

router.get('/', function(req, res, next) {
    /*根据schema生成模型*/
    var blogModel = db.model('blog',blogSchema);
     blogModel.find(function (err, blogs) {
        data.list=blogs;
         // res.send(data);
         res.render('index', data);
     });


});

module.exports = router;
