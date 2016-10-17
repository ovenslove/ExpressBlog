var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');
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

router.get('/regist', function(req, res){
    res.render('regist',data);
});

router.post('/regist', function(req, res, next) {
    var ops={
        to:req.body.email,
        subject:'Thank you very much for registering this website',
        html:'<h2>Thinks My Friend</h2>' +
        '<p>My friend, your initial password is:</p><span style="font-size: 20px;color: blue; font-weight: 700;">'+passwordRound()+'</span><br/>' +
        'Please go to the personal home page to change the password after logging in. Thank you.<br/>' +
        '<a href="http://blog.jqstudy.cn" target="_blank">You can click on the link to blogwebsite!</a>'
    }
    semdEmail(ops);
    // res.send(passwordRound());
    res.redirect('/login');
 });

/*router.get('/regist', function(req, res, next) {
   res.render('regist',data);
});*/

module.exports = router;