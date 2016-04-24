var AWS = require('aws-sdk');
AWS.config.update({region:'us-west-2'});
var AWSaccessKey = "AKIAJMVGB5NWRQIA4ZUA";
var secretAccessKey = "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";
var Twitter = require('twitter');

var creds = new AWS.Credentials({
	accessKeyId: AWSaccessKey, secretAccessKey: secretAccessKey
});

var sqs = new AWS.SQS({apiVersion: '2012-11-05', credentials : creds});



var recParams = {
	QueueUrl: 'https://sqs.us-west-2.amazonaws.com/733784221245/TweetQueue', /* required */
	MaxNumberOfMessages: 1,
	AttributeNames: [
	"All"
	],
	/* more items */
	VisibilityTimeout: 10,
	WaitTimeSeconds: 0
};

var client = new Twitter({
	consumer_key: 'uiEauWJk6N2Hzkx5lBjS5X8JV',
	consumer_secret: 'UhO7GTiqWeHrlVI1KUzrRjYAcMEfzxKJBcqaBDj5mOqbKWZLEt',
	access_token_key: '39964732-gXHxcM6jtHNWDRxZUJqknAlDlAfqYwpie4CzWLDzx',
	access_token_secret: 'snrqfR6sNEr6pG6FWqcqEsOpdrPtBH8zlkKhYV41Ke3Az'
});
 //Pushing tweets into Amazon SQS.
 console.log("Pushing tweets to Amazon SQS now...")
 var hashtags = 'music,food,trump,ipl,clinton,phone,usa,srk,life,body,live,gym,hello';

 client.stream('statuses/filter', {track: hashtags}, function(stream) {
 	stream.on('data', function(tweet) {
 		
  	if(tweet.geo != null) { // Insert into SQS when tweet with location is found
  		console.log("Tweet: "+tweet.text);
  		var obj = {
  			'username': tweet.user.name,
  			'text': tweet.text,
  			'location': tweet.geo
  		}  

  		var sendParams = {
  			MessageBody: JSON.stringify(obj),
  			/* required */
  			QueueUrl: 'https://sqs.us-west-2.amazonaws.com/733784221245/TweetQueue', /* required */
  			DelaySeconds: 0,
  			MessageAttributes: {

  			}
  		};

  		sqs.sendMessage(sendParams, function(err, data) {
			if (err) console.log(err, err.stack); // an error occurred
			else    { console.log("Pushed to SQS\n");  

  }
});

  	}
  });
 	stream.on('error', function(error) {
 		throw error;
 	});
 });

 


