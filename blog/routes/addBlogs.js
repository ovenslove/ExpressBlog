var express = require('express');
var router = express.Router();
var md5 = require('md5');
/*--------------------------------------------------------*/
var session = require('express-session');
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


/* GET books listing. */
var data={
   title:'新增博文',
    'webSiteName':'ExpressBlog'
};

/*router.get('/addBlogs', function(req, res, next) {
    if(req.isAuthenticated()){
        console.log(req.isAuthenticated());
        res.render('addBlogs', data);
    }
    else{
        res.redirect('/login');
    }
});*/


router.post('/addBlogs', function(req, res, next) {
    var mongoose=require('mongoose');
//创建一个数据库连接
    var db =mongoose.createConnection('localhost','blog');
    /*引入blogsSchema配置文件*/
    var blogsSchemaConf=require('../schema/blogsSchema.js');
    /*生成一个schema*/
    var blogSchema  = new mongoose.Schema(blogsSchemaConf);
    /*根据schema生成模型*/
    var blogModel = db.model('blog',blogSchema);

    var blogData={
        blogId:1,
        title:req.body.blogTitle,
        imgUrl:req.body.previewImageUrl,
        author:'ovenslove',
        intr:req.body.blogIntr,
        addTime:new Date(),
        updateTime:new Date(),
        mark:req.body.markGroup.split(','),
        content:req.body.blogContent
    };
    /*生成一个实体*/
    var blogEntity= new blogModel(blogData);
    if(blogEntity.save()){
            res.redirect('/home');
    }else {
        res.send("添加失败");
    }
    // res.render('addBlogs',data);
});

module.exports = router;