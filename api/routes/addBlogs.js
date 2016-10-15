var express = require('express');
var router = express.Router();



/* GET books listing. */
var data={
   title:'新增博文',
    'webSiteName':'ExpressBlog'
};
router.get('/addBlogs', function(req, res, next) {
    res.render('addBlogs',data);
});
router.post('/addBlogs', function(req, res, next) {
    var mongoose=require('mongoose');
//创建一个数据库连接
    var db =mongoose.createConnection('localhost','blog');
    /*引入blogsSchema配置文件*/
    var blogsSchemaConf=require('../schema/blogsSchema.js');
    /*生成一个schema*/
    var blogSchema  = new mongoose.Schema(blogsSchemaConf);
    /*根据schema生成模型*/
    var blogModel = db.model('blog',blogSchema);

    var blogData={
        blogId:1,
        title:req.body.blogTitle,
        imgUrl:req.body.previewImageUrl,
        author:'ovenslove',
        intr:req.body.blogIntr,
        addTime:new Date(),
        updateTime:new Date(),
        mark:req.body.markGroup.split(','),
        content:req.body.blogContent
    };
    /*生成一个实体*/
    var blogEntity= new blogModel(blogData);
    if(blogEntity.save()){
        res.send("添加成功");
    }else {
        res.send("添加失败");
    }
    // res.render('addBlogs',data);
});

module.exports = router;