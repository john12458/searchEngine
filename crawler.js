var rp = require('request-promise');
rp('https://www.pixnet.net')
    .then(function (htmlString) {
        console.log(htmlString)
    })
    .catch(function (err) {
        // Crawling failed...
    });