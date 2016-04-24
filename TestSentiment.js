var request = require('request');

request.post({
    uri: '',
    method: "POST",
    'txt': 'Hello world yo'
    
}).on('response', function(response) {
    console.log(JSON.stringify(response));
   });  