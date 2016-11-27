var express = require('express');
var router = express.Router();

var data={
  "status":1,
  "msg":"ok",
  "data":{
    "name":"peter",
    "age":"17"
  }
};

/* GET home page. */
router.get('/testjson', function(req, res, next) {

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
