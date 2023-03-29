'use strict';
exports.__esModule = true;
// import datas form exported file.
var jwtAuth_1 = require("../helpers/jwtAuth");
// export all routes 
exports["default"] = (function (app) {
    // userController file module assign to userController.
    var userController = require('../controllers/userController');
    // The below code is use to check http Methods.
    var methodNotAllowedHandler = function (req, res) {
        var response = { status: 405, message: "Method Not Allowed", data: [] };
        res.status(405).json(response);
    };
    // This route for user login and user signup
    app.route('/user')
        .post(userController.postUser).all(methodNotAllowedHandler)
        .get(jwtAuth_1.Auth, userController.getUser).all(methodNotAllowedHandler);
    // This route for user login and user signup
    app.route('/users')
        .get(userController.getUsers).all(methodNotAllowedHandler);
});
