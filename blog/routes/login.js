var express = require('express');
var router = express.Router();
var session = require('express-session');
var data={
    title:'Login',
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
            if (user.password != password) {
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


/*正常get请求*/
/*router.get('/login', function(req, res, next) {
    res.render('login',data);
});*/

/*对需要验证后进入的页面t添加这个*/
router.get('/login', function(req, res, next) {
    if(req.isAuthenticated()){
        console.log(req.isAuthenticated());
        console.log('----------------------验证-----------------------------')
        res.redirect('/');
    }
    else{
        res.render('login', data);
    }
});


/*表单提交请求*/
router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

module.exports = router;