module.exports={
    crawlerConfig:{
        contentTypes : ["text/html"],
        interval : 300,
        maxConcurrency : 2,
        timeout : 20 * 1000, // 20 sec
        maxResourceSize : 1024 * 1024 * 1, // 1mb
        customHeaders : {}, // { "Authorization" : "secret" }
        acceptCookies : false,
        // discoverRegex = [
        // 	/(\shref\s?=\s?)([^\"\'\s>\)]+)/ig,
        // 	/(\shref\s?=\s?)['"]([^"']+)/ig
        // ],
        maxDepth : 3,
        allowedUrlPatterns : [
            "/[^./]*$" // extension less
            ,"\\.(html|htm|aspx|php)$" // .html + .htm
        ],
    }
    
}
