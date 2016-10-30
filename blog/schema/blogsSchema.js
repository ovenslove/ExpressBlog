var blogSchema = {
    blogId:String,  //用户ID
    title:String,   //定义一个属性name，类型为String
    imgUrl:String,  //列表预览照片(网络图或者本地图均可)
    author:String,   //定义一个属性name，类型为String
    intr:String,    //简介
    addTime:Date,       //生成时间
    updateTime:Date,    //更新时间
    mark:Array,         //标签组
    content:String,     //正文
    viewCount:Number,   //浏览次数
    priseCount:Number,  //点赞数
    postStatu:Boolean    //推送状态（发布、不发布）
}
module.exports=blogSchema;