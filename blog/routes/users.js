var express = require('express');
var router = express.Router();

/*用户信息*/
router.get('/home/user',function (req, res, next) {
  var data={
    'title':'个人信息'
  };
  res.render('user', data);
});

/*修改密码*/
router.post('/home/user',function (req, res, next) {
    var data={
        'title':'个人信息'
    };
    res.render('user', data);
});
module.exports = router;
