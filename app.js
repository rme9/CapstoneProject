var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Converter = require("aws-sdk").DynamoDB.Converter;

var index = require('./routes/index');

var dynamoDBServ = require('./lib/DynamoDBService.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.get('/building/:building', function(req, res) {
    var prom = dynamoDBServ.GetLocationByBuildingNum(req.params.building.toString());
    prom.then(function(data){
        console.log("Original Data: " + data[0].toString());
        var d = [];
        data.forEach(function(item) {
            d.add(Converter.unmarshall(item));
        });

        console.log("Converted Data: " + d[0].toString());
        res.json(d ? d : {});
    });
});

app.get('/room/:room', function(req, res) {
    var prom = dynamoDBServ.GetLocationByRoomId(req.params);
    prom.then(function(data){
        res.json(data)}
    );
});

app.get('/person/:id', function(req, res) {
    var prom = dynamoDBServ.GetPersonById(req.params.id.toString());
    prom.then(function(data){
        res.json(data)}
    );
});

app.get('/schedule/room/:id', function(req, res) {
    var prom = dynamoDBServ.GetScheduleByRoom(req.params.id.toString());
    prom.then(function(data){
        res.json(data)}
    );
});

app.get('/schedule/person/:id', function(req, res) {
    var prom = dynamoDBServ.GetScheduleByPerson(req.params.id.toString());
    prom.then(function(data){
        res.json(data)}
    );
});

app.get('/metadata/:id', function(req, res){
   var prom = dynamoDBServ.GetMetadata(req.params.id.toString());
   prom.then(function(data){
      res.json(data)
   });
});

app.post('/person', function(req, res){
    var didInsert = dynamoDBServ.InsertPerson(req.body);
    if(didInsert) {
        res.json({"status" : "200"});
    }
    else {
        res.json({"status" : "500"});
    }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
