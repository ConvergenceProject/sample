'use strict';
// import npm packages.
import { Application, Request, Response } from 'express';

// import datas form exported file.
import { Auth } from '../helpers/jwtAuth';

// export all routes 
export default (app: Application) => {

    // userController file module assign to userController.
    let userController = require('../controllers/userController');

    // The below code is use to check http Methods.
    const methodNotAllowedHandler = (req: Request, res: Response) => {
        let response = { status: 405, message: "Method Not Allowed", data: [] };
        res.status(405).json(response);
    }

    // This route for user login and user signup
    app.route('/user')
        .post(userController.postUser).all(methodNotAllowedHandler)
        .get(Auth,userController.getUser).all(methodNotAllowedHandler)

    // This route for user login and user signup
    app.route('/users')
        .get(userController.getUsers).all(methodNotAllowedHandler)

};

