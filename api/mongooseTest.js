var mongoose=require('mongoose');

var db =mongoose.createConnection('localhost','blog'); //创建一个数据库连接
var blogSchema  = new mongoose.Schema({
    blogId:Number,  //文章ID
    title:String,   //定义一个属性name，类型为String
    imgUrl:String,  //列表预览照片
    author:String,   //定义一个属性name，类型为String
    intr:String,    //简介
    addTime:Date,       //生成时间
    updateTime:Date,    //更新时间
    mark:Array,         //标签组
    content:String,     //正文
});

var blogModel = db.model('blog',blogSchema);

// var blogEntity = new blogModel({title:'我就是标题','author':'ovenslove','intr':'我就是简介，看我看我','info':'别动，我是从mongodb出来的摘要'});

for(var i=10;i<30;i++){
    var blogEntity= new blogModel({
        blogId:1,
        title:'我就是标题'+i,
        imgUrl:'/images/preimg.jpeg',
        author:'ovenslove',
        intr:'我就是简介'+i+'，看我看我',
        addTime:new Date(),
        updateTime:new Date(),
        mark:['标签一','标签二','标签三','标签四',],
        content:'大家好，我就是正文内容，别看我少，我还是很有价值的！大家好，我就是正文内容，' +
        '别看我少，我还是很有价值的！大家好，我就是正文内容，别看我少，我还是很有价值的！大家好，' +
        '我就是正文内容，别看我少，我还是很有价值的我还是很有价值的我还是很有价值的我还是很有' +
        '价值的我还是很有价值的我还是很有价值的我还是很有价值的！'
    });
    console.log(blogEntity.title);
    blogEntity.save()
}



// blogEntity.save();
/*
blogModel.find(function (err, blogs) {
    console.log(blogs);
});*/
