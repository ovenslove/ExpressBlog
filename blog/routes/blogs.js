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
    'title':'博客页',
    'webSiteName':'ExpressBlog',
    'blog':{}
}
/*57ffb8c2328981299c302367*/
router.get('/blogs/:id', function(req, res, next) {

    var _id=req.params.id;
    try {
        var username=req.session.passport.user || false;
    }catch(err){}
    var blogModel = db.model('blog',blogSchema);
    blogModel.find({'_id':_id},function (err, blogs) {
    data.blog=blogs[0];
    data.loginStatus=username?1:0;
    // res.send(data);
    res.render('showBlogs', data);
    });

});

module.exports = router;
