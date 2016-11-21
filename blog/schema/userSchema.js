var userSchema = {
    userType:Number, //用户类型
    nickname:String, //用户昵称，(可修改)
    username:String, //用户邮箱以及登录名(不可修改)
    password:String, //用户密码(可修改)
    registTime:Date, //注册时间
    loginLock:Number, //登录锁
    logoUrl:String, //用户头像地址
    age:Number, //年龄
    sex:String, //性别
    phoneNumber:String, //电话号码
    education:String, //教育程度
    occupation:String, //职业
    hobbit:String, //兴趣爱好
    introduce:String //自我简介
}
module.exports=userSchema;