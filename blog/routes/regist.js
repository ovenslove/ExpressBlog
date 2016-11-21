var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');
var md5 = require('md5');
/* GET books listing. */
var data={
    title:'注册',
    'webSiteName':'ExpressBlog'
};
function semdEmail(ops){
    var options={
        to:ops.to || '1911998965@qq.com',
        subject:ops.subject || '测试邮件',
        html:ops.html
    }
    var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: '1905997838@qq.com',
            pass: 'sxbniskylrkvcieh' //授权码,通过QQ获取

        }
    });
    var mailOptions = {
        from: '1905997838@qq.com', // 发送者
        to: options.to, // 接受者,可以同时发送多个,以逗号隔开
        subject: options.subject, // 标题
        //text: 'Hello world', // 文本
        html: options.html
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            return false;
        }
        return;
    });
}

function passwordRound() {
    var num='';
    for(var i=1;i<=6;i++){
        var randnum=Math.floor(Math.random()*10);
        randnum==10?randnum=9:randnum;
        num+=randnum;
    }
    return num;
}

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

function registSave(ops) {
    var userData={
        username:ops.username,
        password:ops.password,
        registTime:new Date(),
        loginLock:0,
        userType:0
    };
    /*生成一个实体*/
    var userEntity= new userModel(userData);
    if(userEntity.save()){
        console.log('successful');
        return true;
    }else {
        console.log('error');
        return false;
    }

}

router.get('/regist', function(req, res){
    res.render('regist',data);
});



/*
*
*
*
* */
router.post('/regist', function(req, res, next) {
    // console.log(req.body.username)
    var password=passwordRound();
    var users={
        username:req.body.username,
        password:md5(password)
    }
    var ops={
        to:users.username,
        subject:'Thank you very much for registering this website',
        html:'<h2>Thinks My Friend</h2>' +
        '<p>My friend, your initial password is:</p><span style="font-size: 20px;color: blue; font-weight: 700;">'+password+'</span><br/>' +
        'Please go to the personal home page to change the password after logging in. Thank you.<br/>' +
        '<a href="http://blog.jqstudy.cn" target="_blank">You can click on the link to blogwebsite!</a>'
    }
    userModel.findOne({username:users.username},function (err,user) {
        if (err) { return done(err); }
        if(!user){
            if(registSave(users)){
                    semdEmail(ops);
                    res.json({
                        status:1, /*注册成功*/
                        message:'注册成功'
                    });
                 }else {
                     res.json({
                         status:2, /*保存失败*/
                         message:'注册失败'
                     });
                 }
        }else {
            res.json({
                status:3, /*保存失败*/
                message:'用户名已存在'
            });
        }

        console.log(data);
    });
 });

module.exports = router;