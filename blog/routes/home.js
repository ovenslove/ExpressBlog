var express = require('express');
var router = express.Router();
var session = require('express-session');
var md5 = require('md5');
var data={
    'title':'个人主页',
    'webSiteName':'ExpressBlog'
};
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
/*-------------------数据库相关----------------------------*/
/*-------------------权限认证相关----------------------------*/
var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
    function(username, password, done) {
        userModel.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: '用户名不存在.' });
            }
            /*  console.log('----------------------------------'+user.password);
             console.log('----------------------------------'+md5(password));*/
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
});
/*-------------------权限认证相关----------------------------*/
/*--------------------------------------------------------*/


router.get('/home', function(req, res, next) {
    // var sess = req.session.passport || null;
    if(req.isAuthenticated()){
        console.log(req.isAuthenticated());
        res.render('home', data);
    }
    else{
        res.redirect('/login');
    }
});

module.exports = router;