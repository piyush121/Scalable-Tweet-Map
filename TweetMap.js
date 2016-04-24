var http = require("http");
var fs = require("fs");
var request = require("request");
var path = require("path");

var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'uiEauWJk6N2Hzkx5lBjS5X8JV',
  consumer_secret: 'UhO7GTiqWeHrlVI1KUzrRjYAcMEfzxKJBcqaBDj5mOqbKWZLEt',
  access_token_key: '39964732-gXHxcM6jtHNWDRxZUJqknAlDlAfqYwpie4CzWLDzx',
  access_token_secret: 'snrqfR6sNEr6pG6FWqcqEsOpdrPtBH8zlkKhYV41Ke3Az'
});
 //Pushing tweets into elastic search.
console.log("Pushing tweets to elastic search now...")
var hashtags = 'music,food,trump,ipl,clinton,phone,usa,srk,life,body,live,gym,hello';

client.stream('statuses/filter', {track: hashtags}, function(stream) {
  stream.on('data', function(tweet) {
  	
  	if(tweet.geo != null) { // Insert into elastic search when tweet with location is found
   		console.log("Tweet: "+tweet.text);
   		request({
  uri: 'http://search-tweets-jcssel7pllt7pu4epzpxhfo7ge.us-west-2.es.amazonaws.com/domain/tweets',
  method: "POST",
  json: {
    'username': tweet.user.name,
    'text': tweet.text,
    'location': tweet.geo
  }
}).on('response', function(response) {
    console.log("Row "+response.statusMessage+" with location: "+JSON.stringify(tweet.geo.coordinates));
   });  
}
});
   stream.on('error', function(error) {
    throw error;
  });
});
  
