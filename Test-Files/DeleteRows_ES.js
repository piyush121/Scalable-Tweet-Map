var request = require("request");


request({
      uri: 'http://search-sentimentaltweets-khvuhu4cjhlwlfotpfoltz3syi.us-west-2.es.amazonaws.com/domain/sentimentaltweets',
      method: 'DELETE',
      query : { 
        "match_all" : {}
    }

    }).on('response', function(response) {
      console.log(response.statusMessage);
    });