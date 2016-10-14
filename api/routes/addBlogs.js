var express = require('express');
var router = express.Router();

/* GET books listing. */
var data={
   title:'新增博文',
    'webSiteName':'ExpressBlog'
};
router.get('/addBlogs', function(req, res, next) {
    res.render('addBlogs',data);
});

module.exports = router;