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
var data={
    'title':'Search',
    'webSiteName':'ExpressBlog',
    'list':[]
}
/*57ffb8c2328981299c302367*/
router.get('/search', function(req, res, next) {
    try {
        var username=req.session.passport.user || false;
    }catch(err){

    }
    data.loginStatus=username?1:0;
    // res.send("qqq");
    res.render('search', data);
    next();
});

router.post('/search', function(req, res, next) {
    // res.Charset = "utf-8";
    var str=req.body.search;
    var searchData={
        $or:[
            {
                title:new RegExp(str,'g')
            },
            {
                content:new RegExp(str,'g')
            },
            {
                intr:  new RegExp(str,'g')
            }
        ]
    };
    // console.log(str);

    // res.send(searchData);
    blogModel.find(searchData,function (err,blogs) {
        var data={
            status:1,
            message:'ok',
            data:blogs
        }
        res.json(data);
    })

});

module.exports = router;
