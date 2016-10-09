var router = require('koa-router')();
var mongoose = require ( 'mongoose' );


router.get('/', function (ctx, next) {

    var db=mongoose.connect('mongodb://localhost/my_database');
    var result=db.book.find();
    ctx.body=result;

});

module.exports = router;
