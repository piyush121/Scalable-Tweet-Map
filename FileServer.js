var http = require("http");
var fs = require("fs");

var path = require("path");

http.createServer(function(req, res){
	console.log(`${req.method} request for ${req.url}`);

	if(req.url == "/") {

		fs.readFile("./public/index.html", function(err, html){
		res.writeHead(200,{"Content-Type": "text/html"});
		res.end(html);
	});

	} else if(req.url.match(/.css$/)){

		var cssPath = path.join(__dirname, 'public', req.url);
		var fileStream = fs.createReadStream(cssPath, "UTF-8");

		res.writeHead(200,{"content-type": "text/css"});

		fileStream.pipe(res);
	}
	else if(req.url.match(/.png$/) || req.url.match(/.ico$/)){

		var imgPath = path.join(__dirname, 'public', req.url);
		var imgStream = fs.createReadStream(imgPath);

		res.writeHead(200,{"content-type": "image/png"});

		imgStream.pipe(res);
	}
	else if(req.url.match(/.js$/)){

		var jsPath = path.join(__dirname, 'public', req.url);
		var jsStream = fs.createReadStream(jsPath);

		res.writeHead(200,{"content-type": "text/javascript"});

		jsStream.pipe(res);
	}

	else {
		res.writeHead(404,{"Content-Type": "text/plain"});
		res.end("404: File not found");
	}

}).listen(3000);

console.log("Listening...")