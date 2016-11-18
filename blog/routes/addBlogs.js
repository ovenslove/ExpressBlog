var express = require('express');
var router = express.Router();
var md5 = require('md5');
var fs = require('fs');
var path=require('path');
/*--------------------------------------------------------*/
var session = require('express-session');
/*-------------------数据库相关----------------------------*/
var mongoose = require('mongoose');
//创建一个数据库连接
var db = mongoose.createConnection('localhost', 'blog');
/*引入Schema配置文件*/
var userSchemaConf = require('../schema/userSchema.js');
/*生成一个schema*/
var userSchema = new mongoose.Schema(userSchemaConf);
/*根据schema生成模型*/
var userModel = db.model('user', userSchema);

/*引入blogsSchema配置文件*/
var blogsSchemaConf = require('../schema/blogsSchema.js');
/*生成一个schema*/
var blogSchema = new mongoose.Schema(blogsSchemaConf);
/*根据schema生成模型*/
var blogModel = db.model('blog', blogSchema);


/*-------------------数据库相关----------------------------*/
/*-------------------权限认证相关----------------------------*/
var passport = require('passport');
router.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: false}));
router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
/*-------------------权限认证相关----------------------------*/
/*--------------------------------------------------------*/
/*--------------------------------------------------------*/

/*文章列表*/
router.get('/home/addBlogs', function (req, res, next) {
    var data = {
        'title': '新建博客',
        'blog':{}
    };

    // console.log('------------------------------------' + req.isAuthenticated() + '------------------------------------------');
    if (req.isAuthenticated()) {

        res.render('addBlogs', data);
    } else {
        res.redirect('/login');

    }
});

router.post('/home/addBlogs', function (req, res, next) {
    // var username="1905997838@qq.com";
    var  username=req.session.passport.user.username;
    var  userId=req.session.passport.user._id;
    userModel.findOne({username:username},function (err,user) {
        /*user*/
        var timeid=new Date().getTime();
        var actionType=req.body.actionType;
        var _id=req.body._id;
        var blogData = {
            blogId: userId,
            blogType:0,
            title: req.body.blogTitle,
            postStatus:req.body.postStatus,
            author: user.nickname,
            intr: req.body.blogIntr,
/*            addTime: new Date(),
            updateTime: new Date(),*/
            mark: req.body.markGroup.split(','),
            content: req.body.blogContent,
            viewCount:0,
            priseCount:0,
            lockStatus:false
        };
        console.log(blogData);
        console.log(actionType)
        console.log(_id)

      if(req.body.imageType==1){
            var paths=path.normalize('/images/blogPreviewImages/');

            var imgData=req.body.previewImageUrl;
            var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
            var dataBuffer = new Buffer(base64Data, 'base64');
            var name='image-'+timeid+'.png';
            var logoUrl=paths+name;
            fs.writeFile('public'+logoUrl, dataBuffer, function(err) {
                if(err){
                    res.send(err);
                }else{
                    blogData['imgUrl']=logoUrl;
                    var mongoStatus;
                    if(actionType == 1){
                        console.log("000000000000000------")
                        /*更新数据*/
                        blogData.updateTime=new Date();
                        mongoStatus=blogModel.update({_id:_id},{$set:blogData},function (err) {
                            console.log("1111111------")
                            res.json({
                                status:1,
                                message:'Update Success!'
                            });
                        });
                    }else {
                        blogData.addTime=new Date();
                        blogData.updateTime=new Date();
                        var blogEntity = new blogModel(blogData);
                        if (blogEntity.save()) {
                            res.json({
                                status:1,
                                message:'Add Success!'
                            });
                        } else {
                            res.json({
                                status:0,
                                message:'Add Error'
                            });
                        }
                    }
                    console.log(mongoStatus);

                    // res.json(blogData);
                }
            });

        }else {
            blogData.imgUrl=req.body.previewImageUrl;
            blogData.addTime=new Date();
            blogData.updateTime=new Date();
            var blogEntity = new blogModel(blogData);
            if (blogEntity.save()) {
                res.json({
                    status:1,
                    message:'ok'
                });
            } else {
                res.json({
                    status:0,
                    message:'error'
                });
            }
        }
    });


});

/*文章修改列表*/
router.get('/home/addBlogs/edit/:id', function (req, res, next) {
    var data = {
        'title': '修改博客'
    };
    if (req.isAuthenticated()) {
        var _id=req.params.id;
        blogModel.findOne({
            _id:_id
        },function (err, blog) {
            data.blog=blog;
            res.render('addBlogs', data);
        });
    } else {
        res.redirect('/login');

    }
});


module.exports = router;