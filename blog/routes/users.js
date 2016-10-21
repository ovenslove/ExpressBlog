var express = require('express');
var router = express.Router();
var session = require('express-session');
var md5 = require('md5');


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
    // var ss=session;
  var data={
    'title':'个人信息'
  };
  // res.send();

  res.render('user', data);
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

module.exports = router;
