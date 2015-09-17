/**
 * Index controller for end point "/"
 * @param request and response object, request object would have all http input request parameters.
 * @returns response(object) a welcome message as response to API caller.
 */
exports.getWelcomeMessage = function(req, res) {
    console.log(req.url);

    res.json({statusCode: 200, success: true, message:"Welcome to Node API"});

};
