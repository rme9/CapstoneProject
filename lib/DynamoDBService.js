// Load the SDK for JavaScript
var AWS = require('aws-sdk');
var Promise = require('promise');

AWS.config.loadFromPath('./lib/config.json');

// Create DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.GetLocationByBuildingNum = function(params) {

    var searchParams = {
      TableName: 'Room',
      ExpressionAttributeValues: {
        ':b': {S : params},
       },
     KeyConditionExpression: 'building_id = :b'
     
    };
    
    var promise = ddb.query(searchParams).promise();
    
    return promise.then(function(data){
        return data.Items;
    },
    function(err){
        console.log("Error", err);
        return '500';
    });
}

exports.GetLocationByRoomId = function(params) {

    var buildingNum = params.room.substring(0,3);
    var roomId = params.room.toString();

    var searchParams = {
      TableName: 'Room',
      ExpressionAttributeValues: {
        ':b': {S : buildingNum},
        ':r': {S : roomId}
       },
     KeyConditionExpression: 'building_id = :b and #id = :r',
     ExpressionAttributeNames: {
        "#id":"_id"
     },
    };
    
    var promise = ddb.query(searchParams).promise();
    
    return promise.then(function(data){
        return data.Items;
    },
    function(err){
        console.log("Error", err);
        return '500';
    });
}

exports.GetPersonById = function(id) {

    var searchParams = {
        TableName: 'Person',
        ExpressionAttributeValues: {
            ':p': {S : id}
        },
        KeyConditionExpression: 'personnel_id = :p'
    };

    var promise = ddb.query(searchParams).promise();

    return promise.then(function(data){
            return data.Items;
        },
        function(err){
            console.log("Error", err);
            return '500';
        });
}

exports.GetScheduleByRoom = function(roomId) {
    var searchParams = {
        TableName: 'Schedule',
        ExpressionAttributeValues: {
            ':rid': {S : roomId}
        },
        KeyConditionExpression: 'room_id = :rid'
    };

    var promise = ddb.scan(searchParams).promise();

    return promise.then(function(data){
            return data.Items;
        },
        function(err){
            console.log("Error", err);
            return {"Error" : err};
        });
}

exports.CreateNewPerson = function(body) {

}