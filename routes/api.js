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
          query:req.query.query,
          fields: [ 'content','head','url' ]
        }
      }
    }
  }, (err, result) => {
    console.log("object")
    if (err) {
      console.log(err);
      const response={
        list : [],
        total : 0,
      }
      res.send(response);
    }
    else {
        console.log(result.body)
        const {hits} = result.body;
        const response={
          list : hits.hits.map(value=>value._source),
          total : hits.total.value
        }
        console.log(response)
        res.send(response);
    }
  })
});
module.exports = router;


