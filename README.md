# node-login-registration
A MVC framework for REST API using node/express framework for login and registration.

Install

clone the branch
go to project directory
run command to install all required module npm install(make sure node is installed on your machine/server)
run nodemon app.js will start your node server.
access http://localhost:8000
File Structure

app.js is main file when node starts, it do all checks here and load required module.
below are the code lines in app.js where redirect t route file var routes = require('./app/routes'); //under app folder routes the file where all routes are defined. app.use('/', routes); //all routes are defined under routes.
/app/routes.js is file where all routes/end points are define. and each route is calling corresponding /app/controllers.

/app/models has all required models and can be loaded through same as any modules loads in node.

/app/utils/validations.js is file which have defined all validations for incoming routes by using JOI. if they do not pass it a error message sent back as response by using middleware in app.js //error handler, if request parameters do not fullfil validations a error message would be sent back as response.

(app.use(function (err, req, res, next) { // specific for validation errors if (err instanceof validate.ValidationError) { return res.json({status: err.status, errorMessage: err}); } }); )

/app/config/index.js has all defined configuration parameters, you can also us them by encrypting.
