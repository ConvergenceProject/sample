// import npm packages
import { Response, Request } from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";


// import file modules.
import User from '../models/userModel';
import { IUser } from '../interfaces/userInterface';
import staticData from "../constants/staticData";
import Logger from "../log management/loger";


/* -------------------------------------------------------------------------- */
/*                                    start => /user                          */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- postUser ---------------------------------------- */

/*
Method Name: postUser
Request Type: POST
Author: Salim
Description: This method is used for inserting data to user table with joi scheema validation.
 * @param => fistName, lastName, email, password.
 * @return => error | user Data and user Token.
*/


exports.postUser = async (req: Request<IUser>, res: Response) => {
Logger.info('hello')
  const schema = Joi.object({
    firstName: Joi.string().required().messages({
      'string.base': 'First name should be a string',
      'string.empty': 'First name is required',
      'any.required': `"a" is a required field`
    }),
    lastName: Joi.string().required().messages({
      'string.base': 'Last name should be a string',
      'string.empty': 'Last name is required',
      'any.required': `"a" is a required field`

    }),
    email: Joi.string().email().required().messages({
      'string.email': 'Email should be a valid email address',
      'string.empty': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password should be at least {#limit} characters long',
      'string.empty': 'Password cannot be empty',
      'any.required': 'Password is required',
    }),
  });

  try {

    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {

      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ status: 400, message: 'Invalid request', data: errors });

    }

    let users = new User(req.body);
    let userData = await users.save();

    const token = jwt.sign({ _id: userData._id?.toString(), firstName: userData.firstName, lastName: userData.lastName }, staticData.secretKey, {
      expiresIn: '2 days',
    });

    return res.status(200).json({
      status: 200, message: 'Success', data: {
        user: userData,
        token: token
      }
    });

  } catch (error: any) {

    console.error(error);
    return res.status(400).json({ status: 400, message: error.message, data: {} });

  }
};

/* ---------------------------------- getUser ---------------------------------------- */

/*
Method Name: getUser
Request Type: GET
Author: Salim
Description: This method is used for find user Details.
 * @param => User Id.
 * @return => error | user Details from database.
*/

exports.getUser = async (req: Request<IUser>, res: Response) => {

  try {

    console.log("res", res.user?._id)
    let user = await User.findById(res.user?._id)
    return res.status(200).json({ status: 200, message: "user details", data: { user } });

  } catch (error) {

    console.error(error);
    return res.status(400).json({ status: 402, message: error, data: {} })

  }


};

/* -------------------------------------------------------------------------- */
/*                                end => /user                                */
/* -------------------------------------------------------------------------- */


/* -------------------------------------------------------------------------- */
/*                                 start => /users                            */
/* -------------------------------------------------------------------------- */

/* ---------------------------------- getUsers ---------------------------------------- */

/*
Method Name: getUsers
Request Type: GET
Author: Salim
Description: This method is used for find all user Details.
 * @param => " ".
 * @return => error | all users Details from database.
*/

exports.getUsers = async (req: Request<IUser>, res: Response) => {

  try {

    let users = await User.find()
    return res.status(200).json({ status: 200, message: "user details", data: { users } });

  } catch (error) {

    console.error(error);
    return res.status(400).json({ status: 402, message: error, data: {} })

  }


};
/* -------------------------------------------------------------------------- */
/*                                   end => /users                            */
/* -------------------------------------------------------------------------- */