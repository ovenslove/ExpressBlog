var router = require('koa-router')();
var mongoose = require("mongoose");

router.get('/', function (ctx, next) {
    var db=mongoose.connect('mongodb://localhost/mydb');
    var result=db.find();
  ctx.body = result;
});

module.exports = router;
