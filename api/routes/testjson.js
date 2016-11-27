var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/testjson', function(req, res, next) {
  var data={
    "status":1,
    "msg":"ok",
    "data":{
      "name":"peter",
      "age":"17"
    }
  };
  res.json(data);
});

module.exports = router;
