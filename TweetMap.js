var http = require("http");
var fs = require("fs");
var request = require("request");
var path = require("path");
var options = require('./config.js');
var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: options.storageConfig.TwitterConsumer_key,
  consumer_secret: options.storageConfig.TwitterConsumer_secret,
  access_token_key: options.storageConfig.TwitterAccess_token_key,
  access_token_secret: options.storageConfigTwitterAccess_token_secret.
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
  
