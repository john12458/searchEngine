const string = '<!DOCTYPE html>\n' +
'<title></title><noscript>\n' +
'<meta content="0; URL=https://policies.google.com/terms?hl=zh-TW" http-equiv="refresh"></noscript>\n' +
'<a href="https://policies.google.com/terms?hl=zh-TW" id="link">https://policies.google.com/terms?hl=zh-TW</a>\n' +
'<script type="text/javascript">\n' +
'var url="https://policies.google.com/terms?hl=zh-TW";\n' +
'try{nent(hl);else if(gl)url+="?gl="+encodeURIComponent(gl);var link=document.getElementById("link");if(link){link.innerText=url;link.href=url}}catch(e){}if(window.location.hash)url+=window.location.hash;window.location.href=url;\n' +
'</script>'+
'<script type="text/javascript" nonce="8WYlem2V4xH9IRHQaW6Fyg">\n' +
'var url="https://policies.google.com/terms?hl=zh-TW";\n' +
'try{var match=window.location.href.match(/\\/intl\\/([^\\/]+)\\/policies/);var locale=match&&match[1];var hl;var gl;if(locale){if(locale.indexOf("_")>0){var parts=locale.split("_");hl=parts[0];gl=parts[1]}else hl=locale;if(hl=="ALL")hl=null;if(gl=="ALL")gl=null}url="https://policies.google.com/terms";if(!gl){var tld=location.hostname.split(".").pop().toLowerCase();if(tld&&tld.length==2)gl=tld;if(tld=="cn")url=url.replace(".com/",".cn/")}if(hl&&gl)url+="?hl="+encodeURIComponent(hl)+"&gl="+encodeURIComponent(gl);\n' +
'else if(hl)url+="?hl="+encodeURIComponent(hl);else if(gl)url+="?gl="+encodeURIComponent(gl);var link=document.getElementById("link");if(link){link.innerText=url;link.href=url}}catch(e){}if(window.location.hash)url+=window.location.hash;window.location.href=url;\n' +
'</script>';
function strip_html_tags(str){
    if ((str===null) || (str===''))
        return false;
   else
    str = str.toString();
   return str.replace(/<script[^>]+>(.*?)<\/script>/gs,'')
             .replace(/<[^>]*>/g,'')
             .replace(/\s+/g,' ');
 }
console.log(string)
console.log("..........")
console.log(strip_html_tags(string))