var router = require('koa-router')();
var mongoose = require("mongoose");

router.get('/', function (ctx, next) {
  ctx.body = 'nihao ';
});

module.exports = router;
