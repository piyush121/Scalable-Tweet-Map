var requestVar = require("request");
var chunk = '{ "_id" : { "user" : "rupanta07@gmail.com", "id" : "kinara-ii-indian-restaurant-brooklyn" }, "place" : { "id" : "kinara-ii-indian-restaurant-brooklyn", "name" : "Kinara II Indian Restaurant", "rating" : 3.5, "review_count" : 76, "image_url" : "https://s3-media4.fl.yelpcdn.com/bphoto/nh0HAeAwLIeT1eAf3rUH1A/ms.jpg", "categories" : [ [ "Indian", "indpak" ] ], "location" : { "cross_streets" : "Adelphi St &amp; Clermont Ave", "city" : "Brooklyn", "display_address" : [ "368 Myrtle Ave", "Fort Greene", "Brooklyn, NY 11205" ], "geo_accuracy" : 8, "neighborhoods" : [ "Fort Greene" ], "postal_code" : "11205", "country_code" : "US", "address" : [ "368 Myrtle Ave" ], "coordinate" : { "latitude" : 40.6930084228516, "longitude" : -73.971435546875 }, "state_code" : "NY" }, "url" : "http://www.yelp.com/biz/kinara-ii-indian-restaurant-brooklyn?utm_campaign=yelp_api&amp;utm_medium=api_v2_search&amp;utm_source=i53gWgSo8cCLszPc8KTP0g" }, "favorite" : false }';

requestVar({
                        		uri: 'http://search-restro-yn74pg2dqldrxje6hkvslhdd2m.us-west-2.es.amazonaws.com/domain/sentimentaltweets',
                        		method: "POST",
                        		json: JSON.parse(chunk)
                        	}).on('response', function(response) {
                        		console.log("Row "+response.statusMessage);
                        	});
                        
                        