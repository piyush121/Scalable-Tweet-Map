var AWS = require('aws-sdk');
var options = require('./config.js'); // very important to keep the keys safe and secure.
AWS.config.update({region:'us-west-2'});
var AWSaccessKey = options.storageConfig.AWSAccessKey;
var secretAccessKey = options.storageConfig.AWSSecretAccessKey;

var creds = new AWS.Credentials({
	accessKeyId: AWSaccessKey, secretAccessKey: secretAccessKey
});

var sns = new AWS.SNS({apiVersion: '2010-03-31',credentials : creds});

var topicArn = "arn:aws:sns:us-west-2:733784221245:PrcessedTweet";

var message = {
				"default":`{"piyush":"cool"}`, 
				"http":`{ "name": "piyush", "text": "hello world", "location": "NYC"}`
};
var params = {
  Message: JSON.stringify(message), /* required */
  MessageStructure: 'json',
  Subject: 'Processed Tweet',
  TopicArn: 'arn:aws:sns:us-west-2:733784221245:PrcessedTweet'
};

sns.publish(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});