var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('api function')
});
router.post('/test', function(req, res, next) {
  res.send({
    value:"test_data"
  })
});

module.exports = router;
