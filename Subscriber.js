var http = require("http");


http.createServer(function(request, response){
	if(request.method == 'POST') {
		request.on('data',function(chunk){
			console.log("Received data: "+chunk+"\n");

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
