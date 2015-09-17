# How to create login and registration API in node.js using MVC.

## Node.js modules used in this
       "bcrypt-nodejs": "0.0.3", //A native JS bcrypt library for NodeJS.used for encrypt and decry-pt password.
       "body-parser": "^1.13.3", //parse body from all incoming requests
       "cookie-parser": "^1.3.5", //Parse Cookie header and populate req.cookies with an object keyed by the    cookie names
       "express": "^4.13.3", //Fast, unopinionated, minimalist web framework
       "express-validation": "^0.4.4",  //express-validation is a middleware that validates the body, params, query, headers and cookies of a request and returns a response with errors; if any of the configured validation rules fail.
       "joi": "^6.6.1", //Object schema description language and validator for JavaScript objects.

       "jsonwebtoken": "^5.0.5", //An implementation of JSON Web Tokens.to provide a token based access for end points.
       "mongoose": "^4.1.5", //Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
       "morgan": "^1.6.1",  //HTTP request logger middleware for node.js
       "nodemon": "^1.5.1"  //very usefull module, auto restart node sever after file changes.

## Install
1. clone the branch
2. go to project directory
3. run command to install all required module npm install(make sure node is installed on your machine/server)
4. *run nodemon app.js will start your node server.*
5. *access http://localhost:8000*

## File Structure

1. app.js is main file when node starts, it do all checks here and load required module.
2. below are the code lines in app.js where redirect t route file
    var routes = require('./app/routes'); //under app folder routes the file where all routes are defined.
    app.use('/', routes); //all routes are defined under routes.
3. /app/routes.js is file where all routes/end points are define. and each route is calling corresponding /app/controllers.

4. /app/models has all required models and can be loaded through same as any modules loads in node.
5. /app/utils/validations.js is file which have defined all validations for incoming routes by using JOI. if they do not pass it a error message sent back as response by using middleware in app.js
//error handler, if request parameters do not fullfil validations a error message would be sent back as response.

      (`app.use(function (err, req, res, next) {
          // specific for validation errors
          if (err instanceof validate.ValidationError) {
               return res.json({status: err.status, errorMessage: err});
          }
        });
       `)

6. /app/config/index.js has all defined configuration parameters, you can also us them by encrypting. 
