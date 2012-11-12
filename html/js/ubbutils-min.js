var UbbUtils={enableSmile:true,smilePath:"./smiles/",range:function(d,b,a,c){if(isNaN(d)){return !isNan(c)?c:b}d=parseInt(d,10);if(d<b){d=b}if(d>a){d=a}return d},parseColor:function(a){if(a[0]=="#"){return a}return a.replace(/[^\d]*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)[^\d]*/ig,function(e,d,j,h){var c=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];var b="#";for(var f=1;f<=3;++f){var g=parseInt(arguments[f]);b+=c[parseInt(g/16)]+c[g%16]}return b})},def:function(){if(arguments.length==0){return true}if(arguments.length==1){return(typeof(arguments[0])!="undefined")}for(var a=0;a<arguments.length;++a){if(!UbbUtils.def(arguments[a])){return false}}return true},isNumber:function(){if(arguments.length==0){return true}if(arguments.length==1){return UbbUtils.def(arguments[0])&&arguments[0]!=""&&!isNaN(arguments[0])}for(var a=0;a<arguments.length;++a){if(!UbbUtils.isNumber(arguments[a])){return false}}return true},resolveImg:function(a){var b=$(a);if(b.hasClass("smile")){return"[:"+b.attr("rel")+"]"}var c=b.attr("src");return"[img="+b.attr("src")+"]"},makeImg:function(a){var b=a;return'<img src="'+b+'" />'},makeSmile:function(a){return UbbUtils.enableSmile?('<img src="'+UbbUtils.smilePath+a+'.gif" class="smile" rel="'+a+'" />'):("[����]")},resolveLink:function(b){var c=$(b);return"[url="+c.attr("href")+"]"+c.html()+"[/url]"},makeLink:function(b){var a='<a href="'+(b.toLowerCase().substr(0,4)=="www."?"http://"+b:b)+'" target="_blank">';a+=b+"</a>";return a},strlen:function(a){return($.browser.msie&&a.indexOf("\n")!=-1)?a.replace(/\r?\n/g,"_").length:a.length},parseFont:function(b,a){var c=$(b),d=a;if(c.html()!=a){c=$(b+"</font>")}if(UbbUtils.isNumber(c.attr("size"))){d="[size="+c.attr("size")+"]"+d+"[/size]"}if(c.attr("style")!=""&&c.css("color")!=""){d="[color="+UbbUtils.parseColor(c.css("color"))+"]"+d+"[/color]"}else{if(c.attr("color")!=""){d="[color="+c.attr("color")+"]"+d+"[/color]"}}return d},parseSpan:function(b,a){var c=$(b),d=a;if(c.html()!=a){c=$(b+"</span>")}if(c.css("fontWeight").toLowerCase()=="bold"){d="[b]"+d+"[/b]"}if(c.css("fontStyle").toLowerCase()=="italic"){d="[i]"+d+"[/i]"}if(b.search(/color/igm)!=-1&&c.css("color")!=""){d="[color="+UbbUtils.parseColor(c.css("color"))+"]"+d+"[/color]"}return d},makeSize:function(b,a,d){var c=$(d);a=UbbUtils.range(a,1,7,4);if(d.substr(0,5).toLowerCase()=="<font"){return'<font size="'+a+'" style="'+c.attr("style")+'">'+c.html()+"</font>"}else{return'<font size="'+a+'">'+d+"</font>"}},makeColor:function(b,a,d){var c=$(d);if(d.substr(0,5).toLowerCase()=="<font"){return'<font style="color:'+a+';" size="'+parseInt(c.attr("size"))+'" >'+c.html()+"</font>"}else{return'<font style="color:'+a+';">'+d+"</font>"}},htmlReplace:[[/(\n|\r)+/ig,"",false],[/<style[^>]*>[\s\S]*?<\/style[^>]*>/igm,"",true],[/<script[^>]*>[\s\S]*?<\/script[^>]*>/igm,"",true],[/<noscript[^>]*>[\s\S]*?<\/noscript[^>]*>/igm,"",true],[/<select[^>]*>[\s\S]*?<\/select[^>]*>/igm,"",true],[/<object[^>]*?[\s\S]*?<\/object[^>]*>/igm,"",true],[/<marquee[^>]*>[\s\S]*?<\/marquee[^>]*>/igm,"",true],[/<!--[\s\S]*?-->/igm,"",true],[/on[a-zA-Z]{3,16}\s*?=\s*?(["'])[\s\S]*?\1/igm,"",true],[/<br[^>]*>/ig,"\n",true],[/<p[^>]*>([\s\S]*?)<\/p[^>]*>/igm,"[p]$1[/p]",true],[/<strong[^>]*?>([\s\S]*?)<\/strong[^>]*?>/igm,"[b]$1[/b]",true],[/<em[^>]*?>([\s\S]*?)<\/em[^>]*>/igm,"[i]$1[/i]",true],[/<span[^>]*?>([\s\S]*?)<\/span[^>]*?>/igm,function(b,a){return UbbUtils.parseSpan(b,a)},true],[/<font[^>]*?>([\s\S]*?)<\/font[^>]*?>/igm,function(b,a){return UbbUtils.parseFont(b,a)},true],[/<a[^>]*>([\s\S]*?)<\/a[^>]*>/igm,function(b,a){return UbbUtils.resolveLink(b)},true],[/<img[^>]*?.*?\/?>/ig,function(a){return UbbUtils.resolveImg(a)},true],[/&lt;/ig,"<",false],[/&gt;/ig,">",false],[/&quot;/ig,'"',false],[/&nbsp;&nbsp;&nbsp;&nbsp;/ig,"\t",false],[/&nbsp;/ig," "],[/&amp;/ig,"&",false]],ubbReplace:[[/&/ig,"&amp;",false],[/</ig,"&lt;",false],[/>/ig,"&gt;",false],[/\"/ig,"&quot;",false],[/\t/ig,"&nbsp;&nbsp;&nbsp;&nbsp;",false],[/ /ig,"&nbsp;",false],[/\r\n/ig,"<br />",false],[/[\r\n]/ig,"<br />",false],[/\[p[^\]]*\]([\s\S]*?)\[\/p[^\]]*\]/igm,"<p>$1</p>",true],[/\[b[^\]]*\]([\s\S]*?)\[\/b[^\]]*\]/igm,"<strong>$1</strong>",true],[/\[i[^\]mg]*\]([\s\S]*?)\[\/i[^\]mg]*\]/igm,"<em>$1</em>",true],[/\[size=(\d+?)[^\]\d]*?\]([\s\S]*?)\[\/size[^\]]*?\]/igm,function(b,a,c){return UbbUtils.makeSize(b,a,c)},true],[/\[color=(#[0-9a-fA-F]{6})\]([\s\S]*?)\[\/color\]/igm,function(b,a,c){return UbbUtils.makeColor(b,a,c)},true],[/\[url\]\s*(www.|https?:\/\/|ftp:\/\/){1}([^\[\"']+?)\s*\[\/url\]/ig,function(b,a,c){return UbbUtils.makeLink(a+c)},true],[/\[url=www.([^\[\"']+?)\](.+?)\[\/url\]/ig,'<a href="http://www.$1" target="_blank">$2</a>',true],[/\[url=(https?|ftp):\/\/([^\[\"']+?)\](.*?)\[\/url\]/ig,'<a href="$1://$2" target="_blank">$3</a>',true],[/\[:(\S+?)\]/ig,function(b,a){return UbbUtils.makeSmile(a)},true],[/\[img=(\S*?)\]/ig,function(b,a){return UbbUtils.makeImg(a)},true],[/\[img[^\]=]*\]([\s\S]*?)\[\/img[^\]]*\]/ig,function(b,a){return UbbUtils.makeImg(a)},true]],replace:function(d,c,b){d=d+"";for(var a=0;a<c.length;++a){if(c[a][2]){while(d.search(c[a][0])!=-1){d=d.replace(c[a][0],(b?"":c[a][1]))}}else{d=d.replace(c[a][0],(b?"":c[a][1]))}}return d},htmlIgnore:function(a){return UbbUtils.replace(a,UbbUtils.htmlReplace,true)},ubbIgnore:function(a){return UbbUtils.replace(a,UbbUtils.ubbReplace,true)},html2Ubb:function(a){return UbbUtils.replace(a,UbbUtils.htmlReplace)},ubb2Html:function(a){return UbbUtils.replace(a,UbbUtils.ubbReplace)}};