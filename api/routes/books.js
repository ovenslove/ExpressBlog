var express = require('express');
var router = express.Router();

/* GET users listing. */
var data={
    'name':'js权威指南',
    'price':'￥111.00'
}
router.get('/', function(req, res, next) {
    res.json(data);
});

module.exports = router;