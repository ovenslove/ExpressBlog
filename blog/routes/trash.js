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
/*文章列表*/

router.get('/home/trash',function (req, res, next) {
    var data={
        'title':'Trash-BlogList'
    };
    var limitNum=4;
    if(req.isAuthenticated()){
        if(req.session.passport){
            userType=req.session.passport.user.userType;
            data.userType=userType;
        }
        if(userType===999){
            blogModel.count({lockStatus:true},function (err ,count) {
                blogModel.find({lockStatus:true}).sort({'addTime':-1}).limit(limitNum).skip(0).exec(function(err,blogs){
                    var pages=Math.ceil(count / limitNum);
                    data.list=blogs;
                    data.pages=pages;
                    data.curPage=0;
                    res.render('trash', data);
                });
            });

        }else {
            var  userId=req.session.passport.user._id;
            blogModel.count({blogId:userId,lockStatus:true},function (err ,count) {
                blogModel.find({blogId:userId,lockStatus:true}).sort({'addTime':-1}).limit(limitNum).skip(0).exec(function(err,blogs){
                    var pages=Math.ceil(count / limitNum);
                    data.list=blogs;
                    data.pages=pages;
                    data.curPage=0;
                    res.render('trash', data);
                });
            });
        }
    }else {
        res.redirect('/login');
    }

});

/*文章列表*/

router.get('/home/trash/:id',function (req, res, next) {
    var data={
        'title':'Trash-BlogList'
    };

    var page=req.params.id-1;
    var limitNum=4;
    if(req.isAuthenticated()){
        if(req.session.passport){
            userType=req.session.passport.user.userType;
            data.userType=userType;
        }
        if(userType===999){
            blogModel.count({lockStatus:true},function (err ,count) {
                blogModel.find({lockStatus:true}).sort({'addTime':-1}).limit(limitNum).skip(page*limitNum).exec(function(err,blogs){
                    var pages=Math.ceil(count / limitNum);
                    data.list=blogs;
                    data.pages=pages;
                    data.curPage=page;
                    // res.send(data);
                    res.render('trash', data);
                });
            });
        }else {
            var  userId=req.session.passport.user._id;
            blogModel.count({blogId:userId,lockStatus:true},function (err ,count) {
                blogModel.find({blogId:userId,lockStatus:true}).sort({'addTime':-1}).limit(limitNum).skip(page*limitNum).exec(function(err,blogs){
                    var pages=Math.ceil(count / limitNum);
                    data.list=blogs;
                    data.pages=pages;
                    data.curPage=page;
                    // res.send(data);
                    res.render('trash', data);
                });
            });
        }
    }else {
        res.redirect('/login');
    }

});




module.exports = router;