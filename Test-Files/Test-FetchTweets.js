var http = require("http");
var fs = require("fs");
var request = require("request");
var path = require("path");

//Creating Server...
http.createServer(function(req, res){
	console.log(`${req.method} request for ${req.url}`);

	if(req.url == "/") {

		fs.readFile("./public/google.html", function(err, html){
		res.writeHead(200,{"Content-Type": "text/html"});
		res.end(html);
	});
}
	
	else {
		res.writeHead(404,{"Content-Type": "text/plain"});
		res.end("404: File not found");
	}

}).listen(3000);
//Start listening...
console.log("Fetching...")
var hashtags = 'music,food,trump,Will Smith,clinton,phone,usa,srk,life,live,gym,hello';

   		request({
  uri: 'http://search-tweets-jcssel7pllt7pu4epzpxhfo7ge.us-west-2.es.amazonaws.com/domain/tweets/_search?q=food&size=1000',
  method: "GET",
  
},function(error, response, body) {
	var jsonContent = JSON.parse(body);
	jsonContent = JSON.parse(JSON.stringify(jsonContent.hits));
	jsonContent = JSON.parse(JSON.stringify(jsonContent.hits));
	var count = 0;
	for(var key in jsonContent) {
  		console.log("Tweet :" + jsonContent[key]._source.text);
  		console.log("Location: " +(JSON.stringify(jsonContent[key]._source.location.coordinates)))
		console.log("\n");
		count++;
	}

	console.log("Tweet count: " + count)
}); 



  
