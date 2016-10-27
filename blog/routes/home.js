var express = require('express');
var router = express.Router();
var session = require('express-session');
var md5 = require('md5');
var http = require('http');
var fetch = require('node-fetch');
var cheerio = require('cheerio')
/*/!*-------------------数据库相关----------------------------*!/
var mongoose=require('mongoose');
//创建一个数据库连接
var db =mongoose.createConnection('localhost','blog');
/!*引入Schema配置文件*!/
var userSchemaConf=require('../schema/userSchema.js');
/!*生成一个schema*!/
var userSchema  = new mongoose.Schema(userSchemaConf);
/!*根据schema生成模型*!/
var userModel = db.model('user',userSchema);

/!*blog*!/
/!*引入blogsSchema配置文件*!/
var blogsSchemaConf=require('../schema/blogsSchema.js');
/!*生成一个schema*!/
var blogSchema  = new mongoose.Schema(blogsSchemaConf);
/!*根据schema生成模型*!/
var blogModel = db.model('blog',blogSchema);
/!*-------------------数据库相关----------------------------*!/
/!*-------------------权限认证相关----------------------------*!/
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
    function(username, password, done) {
        userModel.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: '用户名不存在.' });
            }
            /!*  console.log('----------------------------------'+user.password);
             console.log('----------------------------------'+md5(password));*!/
            if (user.password != md5(password)) {
                return done(null, false, { message: '密码不匹配.' });
            }
            return done(null, user);
        });
    }
));
router.use(session({ secret: 'keyboard cat' , resave: false, saveUninitialized: false}));
router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});*/
/*-------------------权限认证相关----------------------------*/
/*--------------------------------------------------------*/

/*主首页*/
router.get('/home', function(req, res, next) {
    // var username=req.session.passport.user.username;
    var data={
        'title':'个人主页'
    };
    if(req.isAuthenticated()){
        console.log(req.isAuthenticated());
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


/*文章列表*/
router.get('/home/blogList',function (req, res, next) {
    var data={
        'title':'博客列表'
    };
    blogModel.find({}).sort({'addTime':-1}).limit(10).skip(0).exec(function(err,blogs){
        data.list=blogs;
        // res.send(data);
        res.render('blogList', data);
    });


    // res.render('blogList', data);
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
/*垃圾桶*/
router.get('/home/trush',function (req, res, next) {
    var data={
        'title':'回收站'
    };
    res.render('trush', data);
});



module.exports = router;