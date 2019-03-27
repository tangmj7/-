var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/vote', function(req, res) {
  console.log("成功");
  var result = "成功";
  res.send(result);
});
module.exports = router;
