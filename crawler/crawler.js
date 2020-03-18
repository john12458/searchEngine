
var Crawler = require("crawler");
 
var c = new Crawler({
    maxConnections : 10,
    // This will be called for each crawled page
    callback : function (error, res, done) {
        if(error){
            console.log(error);
        }else{
            var $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($("title").text());
            console.log(res.body)
        }
        done();
    }
});
 // Queue a list of URLs
c.queue(['https://www.ptt.cc/bbs/index.html']);