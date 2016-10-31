var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var session = require('express-session');


//创建一个数据库连接
var db =mongoose.createConnection('localhost','blog');
/*引入blogsSchema配置文件*/
var blogsSchemaConf=require('../schema/blogsSchema.js');
/*生成一个schema*/
var blogSchema  = new mongoose.Schema(blogsSchemaConf);


/*-------------------权限认证相关----------------------------*/
var passport = require('passport');
router.use(session({ secret: 'keyboard cat' , resave: false, saveUninitialized: false}));
router.use(passport.initialize());
router.use(passport.session());
/*-------------------权限认证相关----------------------------*/



/* GET home page. */
var data={
  'title':'首页',
  'webSiteName':'ExpressBlog',
  'list':[]
}

router.get('/', function(req, res, next) {

    /*根据schema生成模型*/
    var blogModel = db.model('blog',blogSchema);

    try {
        var username=req.session.passport.user || false;
    }catch(err){

    }
    /*带limit()*/
    blogModel.find({postStatus:true}).sort({'addTime':-1}).limit(20).skip(0).exec(function(err,blogs){
        data.list=blogs;
        data.loginStatus=username?1:0;
        res.render('index', data);
    });

});

module.exports = router;
