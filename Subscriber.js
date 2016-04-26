var http = require("http");
var requestVar = require("request");

http.createServer(function(request, response){
	if(request.method == 'POST') {
		request.on('data',function(chunk){
			console.log("Received data: "+chunk+"\n");

                        //Posting to elastic Search
                        requestVar({
                        	uri: 'http://search-sentimentaltweets-khvuhu4cjhlwlfotpfoltz3syi.us-west-2.es.amazonaws.com/domain/sentimentaltweets',
                        	method: "POST",
                        	json: chunk
                        }).on('response', function(response) {
                        	console.log("Row "+response.statusMessage+" with location: "+JSON.stringify(JSON.parse(chunk).location));
                        });

            // Use request.post here
        });
		response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
		response.end();

	} else {
		response.writeHead(200, "OK", {'Content-Type': 'text/plain'});
		response.end();
	}

}).listen(3000);

console.log("Listening...")
