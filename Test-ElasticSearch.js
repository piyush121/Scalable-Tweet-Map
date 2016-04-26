var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
	host: 'http://search-sentimentaltweets-khvuhu4cjhlwlfotpfoltz3syi.us-west-2.es.amazonaws.com/domain/sentimentaltweets/'
});
hits = '';
client.search({
	q: 'life',
	size: 100000
}).then(function (body) {
	var hits = body.hits.hits;
	//console.log("hits: "+(hits));
	for( i =0; i < hits.length; i++)
		console.log(i+": "+(hits[i]._source.location.coordinates)+"|| Sentiment: "+ (hits[i]._source.sentiment.type));

}, function (error) {
	console.trace(error.message);
});
