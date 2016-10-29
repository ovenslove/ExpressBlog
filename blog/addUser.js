var mongoose=require('mongoose');
//创建一个数据库连接
var db =mongoose.createConnection('localhost','blog');
/*引入blogsSchema配置文件*/
var userSchemaConf=require('./schema/userSchema.js');
/*生成一个schema*/
var userSchema  = new mongoose.Schema(userSchemaConf);
/*根据schema生成模型*/
var userModel = db.model('user',userSchema);
/*生成一个实体*/
// var blogEntity = new blogModel({title:'我就是标题','author':'ovenslove','intr':'我就是简介，看我看我','info':'别动，我是从mongodb出来的摘要'});



    var userEntity= new userModel({
        username:'222222',
        password:'222222'
    });
    console.log(userEntity.username);
    userEntity.save()

