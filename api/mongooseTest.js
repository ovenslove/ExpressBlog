var mongoose=require('mongoose');

var db =mongoose.createConnection('localhost','blog'); //创建一个数据库连接
var blogSchema  = new mongoose.Schema({
    title:String,   //定义一个属性name，类型为String
    author:String   //定义一个属性name，类型为String
});

var blogModel = db.model('blog',blogSchema);

var blogEntity = new blogModel({title:'我的名字就是oven','author':'ssss'});

console.log(blogEntity.title);
blogEntity.save();
blogModel.find(function (err, blogs) {
    console.log(blogs);
});