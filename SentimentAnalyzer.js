var http = require("http");
var AWS = require('aws-sdk');
AWS.config.update({region:'us-west-2'});
var AWSaccessKey = "AKIAJMVGB5NWRQIA4ZUA";
var secretAccessKey = "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";

var creds = new AWS.Credentials({
	accessKeyId: AWSaccessKey, secretAccessKey: secretAccessKey
});

var sqs = new AWS.SQS({apiVersion: '2012-11-05', credentials : creds});

var watson = require('watson-developer-cloud');

var alchemy_language = watson.alchemy_language({
	api_key: '52f23ae613160664ff04062533c510fd6fd304ee'
});

var recParams = {
	QueueUrl: 'https://sqs.us-west-2.amazonaws.com/733784221245/TweetQueue', /* required */
	MaxNumberOfMessages: 1,
	AttributeNames: [
	"All"
	],
	/* more items */
	VisibilityTimeout: 120,
	WaitTimeSeconds: 0
};


(function loop() {
sqs.receiveMessage(recParams, function(err, data) {
			if (err) console.log(err, err.stack); // an error occurred
			else    { 
				fetchedText = JSON.parse(data.Messages[0].Body).text;
				console.log("Fetched: ",fetchedText)

				var alchemyParams = {
					text: fetchedText,
					outputMode: 'json',
					showSourceText: 1   };

					alchemy_language.sentiment(alchemyParams, function (err, response) {
						if (err)
							console.log('Alchemy Error:', err);
						else
							console.log(JSON.stringify(response, null, 2));
						process.nextTick(loop);
					}); 
				}
			});

	}());
	


	

