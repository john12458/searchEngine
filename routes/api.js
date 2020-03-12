var express = require('express');
var router = express.Router();
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('api function')
});
router.post('/test', function(req, res, next) {
  res.send({
    value:"test_data"
  })
});
router.get('/search',function(req,res,next){
  client.search({
    index: 'search-index',
    body: {
      query: {
        multi_match: { 
          head:req.query.query,
        }
      }
    }
  }, (err, result) => {
    if (err) console.log(err)
    else res.send(result.body.hits);
  })
});
module.exports = router;


