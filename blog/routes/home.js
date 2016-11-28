var express = require('express');
var router = express.Router();
var session = require('express-session');
var md5 = require('md5');
var http = require('http');
var fetch = require('node-fetch');
var cheerio = require('cheerio')
/*-------------------数据库相关----------------------------*/
var mongoose=require('mongoose');
//创建一个数据库连接
var db =mongoose.createConnection('localhost','blog');
/*引入Schema配置文件*/
var userSchemaConf=require('../schema/userSchema.js');
/*生成一个schema*/
var userSchema  = new mongoose.Schema(userSchemaConf);
/*根据schema生成模型*/
var userModel = db.model('user',userSchema);

/*blog*/
/*引入blogsSchema配置文件*/
var blogsSchemaConf=require('../schema/blogsSchema.js');
/*生成一个schema*/
var blogSchema  = new mongoose.Schema(blogsSchemaConf);
/*根据schema生成模型*/
var blogModel = db.model('blog',blogSchema);
/*-------------------数据库相关----------------------------*/
/*-------------------权限认证相关----------------------------*/
var passport = require('passport')
router.use(session({ secret: 'keyboard cat' , resave: false, saveUninitialized: false}));
router.use(passport.initialize());
router.use(passport.session());
/*-------------------权限认证相关----------------------------*/
/*--------------------------------------------------------*/


/*主首页*/
router.get('/home', function(req, res, next) {
    // var username=req.session.passport.user.username;
    // res.send(req.session);
    var data={
        'title':'个人主页'
    };
    if(req.isAuthenticated()){
        if(req.session.passport){
            userType=req.session.passport.user.userType;
        }
        data.userType=userType;
        res.render('home', data);
    }else{
        res.redirect('/login');
    }
});

router.get('/home/oneWord', function(req, res, next) {
    // var url = "http://wufazhuce.com/";
    var url = "http://www.dailyenglishquote.com/";
    fetch(url)
        .then(function(res) {
            return res.text();
        }).then(function(body) {
        var $ = cheerio.load(body);
    /*    res.send(body);
        return;*/
        var s1=$(".entry.cf").eq(0).find('p').eq(0).find('strong').html();
        var s2=$(".entry.cf").eq(0).find('div').eq(3).html();
        var s3=$(".entry.cf").eq(0).find('p').eq(1).html();
        s1==null ?s1=' ':s1;
        s2==null ?s2=' ':s2;
        s3==null ?s3=' ':s3;
        // https://www.npmjs.com/package/cheerio
        // https://github.com/jschr/textillate
        res.json({
            status:1,
            message:{
                en:s1+s2,
                zh:s3
            }
        });
    });

});


/*文章分类*/
router.get('/home/category',function (req, res, next) {
    var data={
        'title':'分类列表'
    };
    res.render('category', data);
});
/*图表信息*/
router.get('/home/chars',function (req, res, next) {
    var data={
        'title':'图表信息'
    };
    res.render('chars', data);
});
module.exports = router;