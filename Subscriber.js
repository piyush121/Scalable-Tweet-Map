var http = require("http");
var elasticsearch = require('elasticsearch');

var requestVar = require("request");

http.createServer(function(request, response){
	if(request.method == 'POST') {
		request.on('data',function(chunk){
			chunk = JSON.parse(chunk);
			console.log("Received Message: "+chunk.Message+"\n");
                        //Posting to elastic Search
                        try
                        {

                        	chunk = JSON.parse(chunk.Message);
                        	requestVar({
                        		uri: 'http://search-sentimentaltweets-khvuhu4cjhlwlfotpfoltz3syi.us-west-2.es.amazonaws.com/domain/sentimentaltweets',
                        		method: "POST",
                        		json: chunk
                        	}).on('response', function(response) {
                        		console.log("Row "+response.statusMessage+" with location: "+JSON.stringify(chunk.location));
                        	});
                        }
                        catch(e) {
                        	console.log ("Syntax error occurred due to: "+ chunk.Message)
                        }
            // Use request.post here
        });
        response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end('OK');
	}

	else if (request.method == 'GET') {
			response.writeHead(200, {"Content-Type": "application/json"});

			var client = new elasticsearch.Client({
				host: 'http://search-sentimentaltweets-khvuhu4cjhlwlfotpfoltz3syi.us-west-2.es.amazonaws.com/domain/sentimentaltweets/'
			});
			hits = '';
			client.search({
				q: request.url[1:],
				size: 2
			}).then(function (body) {
				var hits = body.hits.hits;
				console.log(request.url)
				console.log("hits: "+(hits));
				response.send(JSON.stringify(hits),null,3);
				for( i =0; i < hits.length; i++)

					console.log(i+": "+(hits[i]._source.location.coordinates)+"|| Sentiment: "+ (hits[i]._source.sentiment.type));

			}, function (error) {
				console.trace(error.message);
			});

		}


	}).listen(3000);

console.log("Listening...")

