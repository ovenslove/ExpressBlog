var express = require('express');
var router = express.Router();

/* GET books listing. */
var data={
    title:'注册',
    'webSiteName':'ExpressBlog'
};
router.get('/regist', function(req, res, next) {
   res.render('regist',data);
});

module.exports = router;