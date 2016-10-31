var express = require('express');
var router = express.Router();
var session = require('express-session');

var mongoose=require('mongoose');
//创建一个数据库连接
var db =mongoose.createConnection('localhost','blog');
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

/*文章删除功能*/
/*
* 将lockStatu属性设置为true,即锁住文章
* 删除后可在垃圾桶内找回
* 垃圾桶删除则为删除真实数据*/
router.get('/home/blogAction/delete/:id',function (req, res, next) {
    var data={
    };
    var _id=req.params.id;
    if(req.isAuthenticated()){
        blogModel.update({_id:_id},{$set:{lockStatus:true}},function (err) {
            res.redirect('/home/blogList');
        })

    }else {
        res.redirect('/login');
    }

});

/*文章发布功能*/
/*
* 文章发布状态为postStatu
* 发布则为true,不发布则为false，随时可以修改其状态值*/
/*文章发布：*/
router.get('/home/blogAction/publish/:id',function (req, res, next) {
    var data={
    };
    var _id=req.params.id;
    if(req.isAuthenticated()){

        blogModel.update({_id:_id},{$set:{postStatus:true}},function (err) {
            res.redirect('/home/blogList');
        })

    }else {
        res.redirect('/login');
    }

});
/*文章取消发布*/
router.get('/home/blogAction/unPublish/:id',function (req, res, next) {
    var data={
    };
    var _id=req.params.id;
    if(req.isAuthenticated()){

        blogModel.update({_id:_id},{$set:{postStatus:false}},function (err) {
            res.redirect('/home/blogList');
        })

    }else {
        res.redirect('/login');
    }

});

/*浏览次数统计*/

router.get('/home/blogAction/viewCount/:id',function (req, res, next) {
    var data={
    };
    var _id=req.params.id;

    blogModel.update({_id:_id},{$inc:{viewCount:1}},function (err) {
        res.json({
            status:1
        })
    })

});
/*浏览次数统计*/

router.get('/home/blogAction/priceCount/:id',function (req, res, next) {
    var data={
    };
    var _id=req.params.id;

    blogModel.update({_id:_id},{$inc:{priseCount:1}},function (err) {
        res.json({
            status:1
        })
    })

});


module.exports = router;