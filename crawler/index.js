var Simplecrawler = require('simplecrawler');
var {parser,saveToElastic,md5Sign} = require('./helper');
var {crawlerConfig} = require('./config');
var cheerio = require('cheerio');

var queue=[];
var fetchcount = 0;
var url = "https://www.npmjs.com"; 
function checkReapeat(hashRes){
	let repeated = false;
	for (let index = 0; index < queue.length; index++) {
		const element = queue[index];
		if(element===hashRes){
			repeated=true;
			break;
		}
	}
	return repeated;
}
var crawler = Simplecrawler(url);
crawler = Object.assign(crawler,crawlerConfig) // set Config into crawler
// event emit
crawler.on("crawlstart",()=>
			console.log("Crawl starting..."));
crawler.on("complete",()=>
			console.log("Crawl finished!"));
crawler.on("fetcherror",(queueItem, response)=>
			console.warn("Error processing " + queueItem.url));
crawler.on("fetch404",(queueItem, response)=>
			console.warn("Error 404 processing " + queueItem.url));
crawler.on("fetchclienterror",(queueItem, errorData)=>
			console.warn("Error processing " + queueItem.url));

crawler.on("fetchcomplete", async function(queueItem, responseBuffer, response) {
    console.log("I just received %s (%d bytes)", queueItem.url, responseBuffer.length);
    console.log("It was a resource of type %s", response.headers['content-type']);

	if(response.headers['content-type']=="text/html"){
		const originContent = responseBuffer.toString();
		let $ = cheerio.load(originContent);
		let hashRes = md5Sign(responseBuffer);
		if(!checkReapeat(hashRes))queue.push(hashRes)
		const json = {
			url:queueItem.url,
			...parser(originContent),
			hash:hashRes
		}
		console.log(json);
		fetchcount = fetchcount + 1;
		console.log('fetchcount:'+fetchcount);
		// console.log(JSON.stringify(json)+',')
		
		// saveToElastic(json);
	}
});

crawler.start();
