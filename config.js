var fs = require('fs'),
configPath = 'E:/keys/config.json'; // private local directory
var parsed = JSON.parse(fs.readFileSync(configPath, 'UTF-8'));
exports.storageConfig=  parsed;