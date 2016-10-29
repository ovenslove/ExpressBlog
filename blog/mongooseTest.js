var mongoose=require('mongoose');
//创建一个数据库连接
var db =mongoose.createConnection('localhost','blog');
/*引入blogsSchema配置文件*/
var blogsSchemaConf=require('./schema/blogsSchema.js');
/*生成一个schema*/
var blogSchema  = new mongoose.Schema(blogsSchemaConf);
/*根据schema生成模型*/
var blogModel = db.model('blog',blogSchema);
/*生成一个实体*/
// var blogEntity = new blogModel({title:'我就是标题','author':'ovenslove','intr':'我就是简介，看我看我','info':'别动，我是从mongodb出来的摘要'});

for(var i=50;i<60;i++){
    var blogEntity= new blogModel({
        blogId:1,
        title:'我就是标题'+i,
        imgUrl:'/images/preimg.jpeg',
        author:'ovenslove',
        intr:'我就是简介'+i+'，看我看我',
        addTime:new Date(),
        updateTime:new Date(),
        mark:['标签一','标签二','标签三','标签四',],
        content:'我们都知道mongodb是一种面向文档的数据库，但是它的灵活性并不意味着你不需要对其进行结构设计，在代码实施之前进行结构设计是十分必要的。' +
        '一个在nodejs中使用的对mongodb进行建模的工具，可以定义一些Schema（定义每个doc里的字段名、类型、初始值、验证条件等），增删改查等，功能比较贴心'
    });
    console.log(blogEntity.title);
    blogEntity.save();
}
