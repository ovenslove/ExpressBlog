var express = require('express');
var router = express.Router();

/* GET books listing. */
var data={
    "book_name":'js权威指南第六版',
    "book_price":"￥123.00"
};
router.get('/', function(req, res, next) {
    var _callback = req.query.callback;
    if (_callback){
        res.type('text/javascript');
        res.send(_callback + '(' + JSON.stringify(data) + ')');
    }
    else{
        res.json(data);
    }
});

module.exports = router;