var Simplecrawler = require('simplecrawler');
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
var cheerio = require('cheerio');
var crypto = require('crypto');

var queue=[];
function parser(str){
    if ((str===null) || (str===''))
        return false;
   else
    str = str.toString();
   return str.replace(/<script[^>]+>(.*?)<\/script>/gs,'')
             .replace(/<[^>]*>/g,'')
             .replace(/\s+/g,' ');
 }

var crawler = Simplecrawler("http://www.google.com/").on("fetchcomplete", async function(queueItem, responseBuffer, response) {
    console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
    console.log("It was a resource of type %s", response.headers['content-type']);

	if(response.headers['content-type']=="text/html"){
		const $ = cheerio.load(responseBuffer.toString())
		let hashRes = crypto
						.createHash('md5')
						.update(responseBuffer)
						.digest("hex");
		console.log(hashRes)
		let repeated = false;
		for (let index = 0; index < queue.length; index++) {
			const element = queue[index];
			if(element===hashRes){
				repeated=true;
				break;
			}
		}
		if(repeated==false)queue.push(hashRes)
		$('script').text('');
		const json = {
			url:queueItem.url,
			head:$('title').text(),
			content:parser(responseBuffer.toString()),
			hash:hashRes
		}
		console.log(json)
		await client.index({
			index: 'search-index',
			body: { ...json}
		}, (err, { body }) => {
			if (err) console.log(err)
			else console.log(body)
		  }
		);
	}
});

crawler.start();
