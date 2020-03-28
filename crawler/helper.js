var Simplecrawler = require('simplecrawler');
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
var cheerio = require('cheerio');
var crypto = require('crypto');
function strim_tag(str){
	if ((str===null) || (str===''))
		return false;
   else
	str = str.toString();
   return str.replace(/<script[^>]+>(.*?)<\/script>/gs,'') //去除JS
			 .replace(/<[^>]*>/g,'') // 去除tag
			 .replace(/\s+/g,' '); // 去除空白
}
module.exports ={
	md5Sign:(responseBuffer)=>crypto
						.createHash('md5').update(responseBuffer).digest("hex"),
	parser:(htmlContent)=>{
		let $ = cheerio.load(htmlContent);
		return {
			title : $("head title").text() || "no-title",
			description : $("head meta[name='description']").attr("content") || "no-description",
			content : strim_tag($("body").text()),
			seedUrl : $("a").attr("href"),
		}
	},
	saveToElastic:async function(json){
		await client.index({
			index: 'search-index',
			body: { ...json}
		}, (err, { body }) => {
			if (err) console.log(err)
			else console.log(body)
			}
		);
	}
} 
