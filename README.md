# Scalable-Tweet-Map
Enhanced version of the previous Tweet Map. It uses Amazon's SQS and SNS features for better reliability as well as better control over the tweets. Sentimental analysis is also done on those tweets using IBM's Alchemy API.

"# Scalable-Tweet-Map"

Technologies used : 

-Amazon AWS ElasticBeanstalk environment

-Aamazon SQS, SNS serivces.

-Alchemy API for sentiment Analysis.

-NodeJS for backend.

System Design :

![alt tag](http://i.imgur.com/ouIDUJT.png)

<b>Final version running on :

http://ec2-52-37-143-159.us-west-2.compute.amazonaws.com:3000/

Now it can fetch live tweets in runtime by authenticating user from Facebook.

Few minor issues remain but I hope for most parts it works fine.
