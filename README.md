# Scalable-Tweet-Map
Enhanced version of the previous Tweet Map. It uses Amazon's SQS and SNS features for better reliability as well as better control over the tweets. Sentimental analysis is also done on those tweets using IBM's Alchemy API.

"# Scalable-Tweet-Map"

Technologies used : 

-Amazon AWS ElasticBeanstalk environment

-Aamazon SQS, SNS serivces.

-ElasticSearch to store tweets

-Alchemy API for sentiment Analysis.

-NodeJS for backend.

System Design :

![alt tag](http://i.imgur.com/ouIDUJT.png)

ScreenShot:

![alt tag](http://i.imgur.com/s4rSXvi.gif)

<b>Final version was running on :

http://ec2-54-146-194-73.compute-1.amazonaws.com:3000/

I'll update the URL as soon as I get time or someone notifies me.

It can fetch live tweets in runtime by authenticating user from Facebook.

Few minor issues remain but I hope for most parts it works fine.
