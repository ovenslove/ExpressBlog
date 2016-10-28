var express = require('express');
var router = express.Router();
var session = require('express-session');
var md5 = require('md5');
var fs = require('fs');
var path=require('path');

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


router.use(session({ secret: 'keyboard cat' , resave: false, saveUninitialized: false}));



/*用户信息*/
router.get('/home/user',function (req, res, next) {
    /*获取session中的用户名*/
    var username=req.session.passport.user.username;
    /*查找用户信息*/
    userModel.findOne({username:username},function (err,user) {
        var data={
            'title':'个人信息',
            'userdata':user
        };
        res.render('user', data);
    });
});

/*修改密码*/
router.post('/home/user/excpsd',function (req, res, next) {
    var username=req.session.passport.user.username;
    var postdata={
        opsd:req.body.opsd,
        npsd1:req.body.npsd1,
        npsd2:req.body.npsd2
    };
    userModel.findOne({username:username},function (err,user) {
        if(md5(postdata.opsd)===user.password){
            if(postdata.npsd1 === postdata.npsd2){
                userModel.update({_id:user._id},{$set:{password:md5(postdata.npsd1)}},function(err){
                    res.json({
                        status:1,
                        type:1,
                        message:'修改成功'
                    });
                });

            }else {
                res.json({
                    status:1,
                    type:2,
                    message:'两次密码不一致'
                });
            }
        }else {
            res.json({
                status:1,
                type:3,
                message:'原密码错误'
            });
        }

    });

    // res.json(postdata);
    // res.render('user', data);
});

/*修改头像*/
router.post('/home/user/exclogo',function (req, res, next) {
    var username=req.session.passport.user.username;
    var paths=path.normalize('/images/userlogo/');

    var imgData=req.body.imgdata;
    var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    var name='image-'+new Date().getTime()+'.png';
    var logoUrl=paths+name;
    fs.writeFile('public'+logoUrl, dataBuffer, function(err) {
        if(err){
            res.send(err);
        }else{
            userModel.findOne({username:username},function (err,user) {
                userModel.update({_id: user._id}, {$set: {logoUrl: logoUrl}}, function (err) {
                    res.send({
                        status: 1,
                        type: 1,
                        message: '修改成功'
                    });
                });
            });
        }
    });

});

module.exports = router;
