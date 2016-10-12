var mongoose=require('mongoose');

var db =mongoose.createConnection('localhost','blog'); //创建一个数据库连接
var blogSchema  = new mongoose.Schema({
    title:String,   //定义一个属性name，类型为String
    author:String,   //定义一个属性name，类型为String
    intr:String,    //简介
    info:String     //摘要
});

var blogModel = db.model('blog',blogSchema);

// var blogEntity = new blogModel({title:'我就是标题','author':'ovenslove','intr':'我就是简介，看我看我','info':'别动，我是从mongodb出来的摘要'});

for(var i=1;i<20;i++){
    var blogEntity= new blogModel({title:'我就是标题'+i,'author':'ovenslove','intr':'我就是简介'+i+'，看我看我','info':'别动，我是从mongodb出来的第'+i+'摘要'}).save();
    console.log(blogEntity.title);

}
// blogEntity.save();
/*
blogModel.find(function (err, blogs) {
    console.log(blogs);
});*/
