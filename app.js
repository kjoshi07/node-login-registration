/**
 * It would be our main entry js file and server will start from it
 */
//===========LOAD ALL REQUIRED MODULE=====================================
var express = require('express');  //load express module to crate instance of app
var logger = require('morgan');     //HTTP request logger middleware for node.js
var cookieParser = require('cookie-parser');  //Parse Cookie header and populate req.cookies.
//body parsing middleware, does not support multi-part, you have to use other module for multi-part parsing.
var bodyParser = require('body-parser');
//express-validation is a middleware that validates the body, params, query,
// headers and cookies of a request and returns a response with errors;
//we have used it for contact request parameters validation with JOI.
var validate = require('express-validation');
//Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
var mongoose = require('mongoose');

//Create a instance of express application.
var app = express();
//load config module to get configuration parameters about database.
var config = require('./app/config');
var db_url = 'mongodb://' + config.host + ':' + config.db_port + '/' + config.db_name;
//connect with mongo db.
mongoose.connect(db_url);
//Get route index so request can be redirect according to route.
var routes = require('./app/routes');
//==============USE MIDDLEWARE===========================================================================
//log all the request
app.use(logger('dev'));
//parse body in json format.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//Log all the incoming request body part so what is received can be check in console.
app.use(function (req, res, next) {
    console.log(req.body);
    next();
});
//Call route's index /app/routes.js
app.use('/', routes);

//error handler, if request parameters do not fullfil validations a error message would be sent back as response.
app.use(function (err, req, res, next) {
    // specific for validation errors
    if (err instanceof validate.ValidationError) {

        return res.json({status: err.status, errorMessage: err});

    }
});

//Start listing application on defined port in configuration file.

app.listen(config.app_port);
console.log('Express server listening on port ' + config.app_port);

