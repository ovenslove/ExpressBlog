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
var blogModel = db.model('blog',blogSchema);

/*-------------------权限认证相关----------------------------*/
var passport = require('passport');
router.use(session({ secret: 'keyboard cat' , resave: false, saveUninitialized: false}));
router.use(passport.initialize());
router.use(passport.session());
/*-------------------权限认证相关----------------------------*/

/* GET home page. */

/*57ffb8c2328981299c302367*/
router.get('/search', function(req, res, next) {
    try {
        var username=req.session.passport.user || false;
    }catch(err){

    }
    var data={
        'title':'Search',
        'webSiteName':'ExpressBlog',
        'message':'',
        'data':[]
    }

    data.loginStatus=username?1:0;
    data.message='请输入查询条件';
    res.render('search', data);
    next();
});

router.get('/search/:search', function(req, res, next) {
    var str=req.params.search;
    // res.send(str);
    var searchData={
        $or:[
            {
                title:new RegExp(str,'igm')
            },
            {
                content:new RegExp(str,'igm')
            },
            {
                intr:  new RegExp(str,'igm')
            }
        ],
        $and:[
            {
                postStatus:true,
                lockStatus:false
            }
        ]
    };
    blogModel.find(searchData,function (err,blogs) {
        try {
            var username=req.session.passport.user || false;
        }catch(err){

        }
        var data={
            'title':'Search',
            'webSiteName':'ExpressBlog',
            'message':'',
            'data':[]
        }
        data.loginStatus=username?1:0;
        data.message='未查询到结果！';
        data.search=str;
        data.data=blogs;
        res.render('search', data);
    })
});
module.exports = router;
