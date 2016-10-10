var express = require('express');
var router = express.Router();

/* GET users listing. */
var data={
    "code":100000,
    "text":"你好，我是聪明可爱的机器人"
};
router.get('/', function(req, res, next) {
    res.json(data);
});

module.exports = router;