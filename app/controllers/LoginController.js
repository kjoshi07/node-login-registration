/**
 *User Controller for endpoint '/api/login' POST request
 */
//=======================Load all the required module.==============================================
var jwt = require('jsonwebtoken');  //generate a access token so all other end points can be secure.
var User = require('../models/user'); //User model so
var config = require('../config/index');  //load configuration parameters.

/**
 * Register a user with application on end point '/api/users'
 *
 * @param  {req as json} user name and password.
 * @return {res as json} success as false(failure) or true(success), status code and access token to geet access of all other end points..
 */

exports.login = function (req, res) {
    // find the user in database
    User.findOne({
        username: req.body.email
    }, function (err, user) {

//If there is any error is finding or doing operation in database
        if (err) {
            res.json({success: false, statusCode: 500, errorMessage: err});
        }

//if does not find username in database then return error
        if (!user) {
            res.json({success: false, statusCode: 403, errorMessage: 'Authentication failed. User not found.'});
        } else if (user) {

            // check if password matches
            if (!user.comparePassword(req.body.password)) {
                res.json({success: false, statusCode: 403, errorMessage: 'Authentication failed. Wrong password.'});
            } else {

                // if user is found and password is right
                // create a token
                var token = jwt.sign(user, config.secret, {
                    expiresInMinutes: 1440 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    statusCode: 200,
                    message: 'You are logged in successfully!',
                    token: token
                });
            }

        }

    });
};