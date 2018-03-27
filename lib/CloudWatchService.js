var AWS = require('aws-sdk');
var Promise = require('promise');

AWS.config.loadFromPath('./lib/config.json');

var logging = new AWS.CloudWatch();