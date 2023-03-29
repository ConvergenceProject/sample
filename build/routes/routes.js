'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const jwtAuth_1 = require("../helpers/jwtAuth");
exports.default = (app) => {
    // /***********************Oauth***********************/
    // const authController = require('../controllers/oauth/auth');
    // const oauth2Controller = require('../controllers/oauth/oauth2');
    // const clientController = require('../controllers/oauth/client');
    // // Create endpoint handlers for /clients
    // app.route('/clients')
    //   .post(authController.isAuthenticated, clientController.postClients)
    //   .get(authController.isAuthenticated, clientController.getClients);
    // // Create endpoint handlers for oauth2 authorize
    // app.route('/oauth2/authorize')
    //   .get(authController.isAuthenticated, oauth2Controller.authorization)
    //   .post(authController.isAuthenticated, oauth2Controller.decision);
    // // Create endpoint handlers for oauth2 token
    // app.route('/oauth2/token')
    //   .post(authController.isClientAuthenticated, oauth2Controller.token);
    // /***********************Oauth***********************/
    // /***********************User***********************/
    //   let userController = require('../controllers/userController');
    //   app.route('/users')
    //       .post(userController.postUser).all(methodNotAllowedHandler);
    //   app.route('/users/authenticate')
    //       .post(userController.postAuthenticate).all(methodNotAllowedHandler);
    //       /*
    //   app.route('/posts')
    //   .get(userController.gettUsers)
    //   .post(userController.postUser)
    //   .delete(userController.postUser).all(methodNotAllowedHandler);
    //   app.route('/post/:_id')
    //   .get(userController.getPost)
    //   .put(userController.putPost)
    //   .delete(userController.deleteUser).all(methodNotAllowedHandler);
    //   */
    //   /***********************User***********************/
    //   /***********************Test***********************/
    //   let testController = require('../controllers/testController');
    //   app.route('/test')
    //       .get(testController.testUrl).all(methodNotAllowedHandler);
    //   /***********************Test***********************/
    //   function methodNotAllowedHandler(req, res) {
    //   let response = {status : 405 ,message : "Method Not Allowed" , data : [] };
    //   res.status(405).json(response);
    // }
    /***********************User***********************/
    let userController = require('../controllers/userController');
    app.route('/users')
        .post(userController.postUser)
        .get(jwtAuth_1.Auth, userController.getUsers);
    app.get('/user', (req, res) => {
        res.send('hello');
    });
    app.route('/userr').get((req, res) => {
        res.send('heyyy');
    });
    function methodNotAllowedHandler(req, res) {
        let response = { status: 405, message: "Method Not Allowed", data: [] };
        res.status(405).json(response);
    }
};
