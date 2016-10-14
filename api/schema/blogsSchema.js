var blogSchema = {
    blogId:Number,  //文章ID
    title:String,   //定义一个属性name，类型为String
    imgUrl:String,  //列表预览照片
    author:String,   //定义一个属性name，类型为String
    intr:String,    //简介
    addTime:Date,       //生成时间
    updateTime:Date,    //更新时间
    mark:Array,         //标签组
    content:String,     //正文
}
module.exports=blogSchema;